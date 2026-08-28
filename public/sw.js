// Vanilla service worker — no Workbox, no build step. It runs in its own
// worker global scope (self, caches, clients, etc.), separate from the
// app's own React/TypeScript code.

// Bump this string on every deploy that should invalidate old caches. A
// stale worker serving a stale cache forever is worse than no offline
// support at all, so the activate handler below deletes every cache that
// does not match this exact name.
const CACHE_VERSION = "v1";
const CACHE_NAME = `paisa-kahan-hai-${CACHE_VERSION}`;
const CACHE_NAME_PREFIX = "paisa-kahan-hai-";

// The complete route list, confirmed against src/app/*/page.tsx rather than
// guessed — precaching a route that does not exist would just waste storage
// and quietly hide a typo.
const APP_SHELL_ROUTES = ["/", "/trace", "/check-yourself", "/sources", "/about"];

const SAME_ORIGIN_ASSET_TAG_PATTERN =
  /<(?:script[^>]+src|link[^>]+href)="([^"]+)"[^>]*>/gi;

/**
 * Next.js content-hashes every JS/CSS filename per build, and this file has
 * no build step to read that manifest from — so instead of hardcoding names
 * that would go stale on the very next deploy, the install step fetches each
 * shell route's real HTML and pulls the asset URLs it actually references.
 */
function extractSameOriginAssetUrls(html, pageUrl) {
  const found = new Set();
  let match;

  while ((match = SAME_ORIGIN_ASSET_TAG_PATTERN.exec(html)) !== null) {
    try {
      const resolved = new URL(match[1], pageUrl);

      if (resolved.origin === self.location.origin) {
        found.add(resolved.href);
      }
    } catch {
      // An unparsable attribute value is not a URL we could have cached
      // anyway — skip it rather than fail the whole precache pass.
    }
  }

  return [...found];
}

async function precacheAppShell() {
  const cache = await caches.open(CACHE_NAME);

  await Promise.all(
    APP_SHELL_ROUTES.map(async (route) => {
      try {
        // no-store: installing from a stale cached copy of the page would
        // defeat the point of discovering *this build's* asset filenames.
        const response = await fetch(route, { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const html = await response.clone().text();

        await cache.put(route, response);

        const assetUrls = extractSameOriginAssetUrls(html, self.location.href + route);

        await Promise.all(
          assetUrls.map(async (assetUrl) => {
            try {
              const assetResponse = await fetch(assetUrl, { cache: "no-store" });

              if (assetResponse.ok) {
                await cache.put(assetUrl, assetResponse);
              }
            } catch {
              // One missing asset should not fail the whole install — the
              // page itself is still cached and mostly usable offline.
            }
          }),
        );
      } catch {
        // Installing while already offline (e.g. a repeat install attempt)
        // — leave whatever an earlier successful install already cached.
      }
    }),
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    precacheAppShell().then(() => self.skipWaiting()),
    // skipWaiting: a citizen who reopens the app after an update should get
    // the new worker immediately, not after closing every open tab first.
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const existingCacheNames = await caches.keys();

      await Promise.all(
        existingCacheNames
          .filter((name) => name.startsWith(CACHE_NAME_PREFIX) && name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      );

      await self.clients.claim();
    })(),
  );
});

/** Network-first: a returning citizen with a connection should see today's content, not a stale cache. */
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);

      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    // ignoreSearch: /trace?id=... and /trace are the same cached document —
    // the id only drives client-side rendering, so the query string must
    // not stop the offline fallback from matching it.
    const cached = await caches.match(request, { ignoreSearch: true });

    if (cached) {
      return cached;
    }

    // A completely unknown, uncached route with no network is still better
    // served by the app shell than by the browser's own offline error page
    // — the app itself has no server routes to actually 404 against.
    const shellFallback = await caches.match("/");

    return shellFallback ?? Response.error();
  }
}

/** Cache-first: hashed build assets never change content for a given filename, so there is nothing to revalidate. */
async function cacheFirst(request) {
  const cached = await caches.match(request);

  if (cached) {
    return cached;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);

      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    return Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only GET is cacheable/replayable; this app has no forms or mutations
  // for a POST to matter, so anything else is left to the network as-is.
  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);

  // Never cache another origin — a third-party asset going down or
  // changing is not this app's cache to serve stale, and it is explicitly
  // out of scope for this feature.
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));

    return;
  }

  event.respondWith(cacheFirst(request));
});
