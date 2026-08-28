# Codex Build Log

## Task 1 — Scaffold and first deployment
**Asked:** Create a lean Next.js 15 and Tailwind CSS v4 scaffold, provenance chips, a persistent synthetic-data notice, route stubs, and a public production deployment.

**Codex did:** Used frontend-skill for the paper-like government-service direction, Playwright for 360px-first and desktop checks, lean-code for scope review, and vercel-deploy for the release workflow. Built the requested scaffold, deployed it to Vercel, and created the single requested Git commit.

**Codex caught:** Fixed a PostCSS advisory with a scoped npm override; removed a Tailwind config module-format build warning; used the lean-code audit to remove a hardcoded header-height calculation and arbitrary chip colour values; diagnosed a Windows TLS failure in Git's bundled curl and routed deployment through authenticated Vercel CLI.

**Verified by:** Passed ESLint, strict TypeScript checking, npm audit, and the Next.js production build at 103 kB First Load JS. Playwright verified the final 360px and desktop layouts, every route stub, sticky notice behaviour, and public access without login.

## Task 2 — Five-stage diagnosis engine
**Asked:** Add types, eight complete payment-chain scenarios, four fixed synthetic cases, a deterministic diagnosis engine, Vitest coverage, and no user interface.

**Codex did:** Made the GitHub repository public, added the session and audit records, checked NPCI and DBT Mission primary documentation for mapper and consent facts, implemented the five-stage engine and typed empty-input result, and used lean-code to remove one-call wrappers and repeated action constants.

**Codex caught:** Reconciled the requested non-throwing empty-input behaviour with the original Diagnosis-only signature through the approved discriminated union. Preserved punctuation-only input as valid because whitespace-only input is the sole error case, and removed an unused destructured field caught by strict linting.

**Verified by:** Vitest passed all 35 tests, including fixed mappings, determinism, eight-scenario coverage, action completeness, stage ordering, Roman-only Hindi, and the non-empty-input invariant. ESLint, strict TypeScript, npm audit, and the Next.js production build also passed; First Load JS remained 103 kB.

## Task 3 — Citizen trace journey
**Asked:** Correct two Roman-Hindi strings and build the mobile-first `/trace` journey through the diagnosis headline, without implementing the detailed action card.

**Codex did:** Used frontend-skill for a cardless printed-notice composition, built the owner choice and demo entry flow, split the five-stage timeline into its own component, added accessible inline SVG status indicators and a reduced-motion-safe CSS reveal, and used lean-code to consolidate one-purpose button handlers. Used Playwright for functional, keyboard, overflow, console, motion, and visual checks at 360px first, then 768px and 1280px; used vercel-deploy for the production release.

**Codex caught:** The first visual capture occurred while the CSS timeline was still revealing, so Codex separated in-transition and settled-state inspection before judging the failed-stage hierarchy. The lean audit removed redundant state-setter wrappers, a demo-button closure, and the temporary browser harness from the repository.

**Verified by:** All 35 Vitest tests, ESLint, strict TypeScript, npm audit, and the production build passed. `/trace` measured 110 kB First Load JS. Fresh Playwright contexts confirmed all four demo cases and an arbitrary F8 input produced complete five-stage traces locally and on the public production URL, with no login, horizontal overflow, or console errors.

## Task 4 — Citizen action, print output, home entry, and provenance corrections
**Asked:** Correct unsupported provenance claims and ambiguous form naming, add before-travel guidance, turn the home page into a working entry point, and deliver complete counter-ready action and print instructions.

**Codex did:** Used frontend-skill to keep the journey mobile-first, cardless, and legible like a humane printed notice. Added all numbered action steps, the function-named NPCI seeding form with its narrowly scoped annexure hint, spoken Roman Hindi, clerk pushback replies, wait-only F7/F8 treatment, and black-and-white A4 output. Used lean-code to keep the action split and native print path direct, Playwright for functional and visual checks, and vercel-deploy for production.

**Codex caught:** The first print layout ran to three pages, so Codex compacted secondary trace detail while preserving the failed stage and complete counter instructions, bringing it to two A4 pages. Final local QA also exposed a collision between a running development server and the production build's shared `.next` cache; Codex stopped only the owned process, rebuilt in isolation, and reran the browser suite against the clean production server.

**Verified by:** All 38 Vitest tests, ESLint, strict TypeScript, npm audit, and the production build passed; `/trace` measured 112 kB First Load JS. Fresh Playwright runs at 360px, 768px, and 1280px verified the home entry, four fixed cases, arbitrary F8 path, complete traces and actions, no overflow or console errors, and a two-page print layout locally and on the public production URL without login.

## Task 5 — Sources and About pages with full disclosure
**Asked:** Replace the Sources and About stubs with complete, plainly written disclosure pages; add a persistent project footer and a direct provenance explanation link from trace results.

**Codex did:** Used frontend-skill to build two cardless, server-rendered paper-notice pages with a proof-led source ledger and a deliberately dominant real-world implementation section. Added the global footer and trace disclosure link without client JavaScript or dependencies. Used lean-code to retain direct editorial markup, Playwright for functional and visual QA, and vercel-deploy for release.

**Codex caught:** A final content comparison found that source authority names were implicit in prose and link labels, so Codex exposed all five as scannable `Source:` lines. The initial Vercel preview was also protected by a Vercel login screen, so it could not meet the requested public-access check; Codex preserved the project security setting, deployed to the existing production target, and reran the complete suite there.

**Verified by:** All 38 Vitest tests, ESLint, strict TypeScript, and the production build passed. `/sources` and `/about` each measured 103 kB First Load JS. Fresh Playwright processes at 360px, 768px, and 1280px confirmed both pages, the global footer on every route, trace-to-sources navigation, keyboard access, no overflow or console errors, and HTTP 200 responses from every external source and audit link. The public production alias opened without login.

## Task 6 — Deep-linked results and repository freeze
**Asked:** Remove the unfinished language route, add initial-load result deep links to `/trace`, write the public reviewer README, and otherwise leave the frozen product unchanged.

**Codex did:** Deleted the confirmed-unlinked route, used the App Router search-parameter hook inside the required local Suspense boundary, and initialized the existing trace state once without URL synchronization. Wrote the plain-English README with demo links, disclosure, Codex contribution record, stack, size, and local commands. Used lean-code on only this diff, Playwright for the query-state and 404 matrix, and vercel-deploy for the production release.

**Codex caught:** Deleting the route left a stale generated `.next` route type that made the first standalone typecheck fail; the normal production build regenerated route types, after which strict TypeScript passed without editing generated files. The first Vercel command also omitted the linked team scope and was rejected before upload, so Codex retried against the existing project scope and deployed successfully.

**Verified by:** All 38 Vitest tests, ESLint, strict TypeScript, and the production build passed. The local build measured 106 kB First Load JS on `/`, 103 kB on `/about` and `/sources`, and 116 kB on `/trace`. Fresh Playwright processes at 360px, 768px, and 1280px verified fixed, empty, whitespace, arbitrary, and absent query states; reset without URL rewriting; `/language` returning 404; no overflow or application errors; and public production access without login.
