"use client";

import { useEffect, useState } from "react";

const SERVICE_WORKER_URL = "/sw.js";
const OFFLINE_NOTICE =
  "You are offline. Everything on this screen still works — nothing here needs the internet.";

/** Register the offline service worker once, and show a quiet notice while the network is down. */
export function OfflineReady() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Registering in dev would fight Next's own dev-server caching and
    // hot reload; a phone that has never been online for a real deploy has
    // nothing worth precaching yet anyway.
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register(SERVICE_WORKER_URL).catch(() => {
        // An old phone or locked-down browser may refuse registration
        // entirely — the app must keep working online, just without the
        // offline cache, so this is deliberately swallowed rather than
        // surfaced to the citizen.
      });
    }

    // Read the real network state after mount rather than trusting a
    // server-rendered guess, since the server has no way to know it.
    setIsOffline(!navigator.onLine);

    function handleOnline() {
      setIsOffline(false);
    }

    function handleOffline() {
      setIsOffline(true);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) {
    return null;
  }

  return (
    <p
      aria-live="polite"
      className="print-hidden m-0 bg-success px-5 py-2.5 text-center text-base font-bold leading-6 text-paper sm:px-8"
      role="status"
    >
      {OFFLINE_NOTICE}
    </p>
  );
}
