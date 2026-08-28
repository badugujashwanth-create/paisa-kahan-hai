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

## Task 7 — NPCI contact correction, self-check tools, and escalation ladder
**Asked:** Correct a wrongly cited NPCI helpline, audit every remaining CITED scenario claim, make the existing real self-check tools reachable, and add the existing sourced escalation ladder to actionable diagnoses.

**Codex did:** Checked the contact and mapper claims against NPCI and DBT Mission primary documents, replaced the unrelated BHIM/UPI number with the cited DigiSaathi numbers and mapper-specific APBS email, and added a regression test for all bank-travel scenarios. Used frontend-skill to wire the static self-check page from the home page, footer, and before-travel block, and rendered the untouched escalation data as a black-and-white-safe numbered ledger for F1–F6 only. Used lean-code for the diff audit, Playwright for viewport, state, navigation, console, and print QA, and vercel-deploy for the scoped production release.

**Codex caught:** Chromium initially produced a fifth, completely blank A4 sheet when every escalation rung used automatic break avoidance. Codex removed forced pagination and compacted only the print ledger until the result fit four pages, with the RBI rung and its provenance chip together before the CPGRAMS rung begins. The full CITED-claim audit found no further unsupported scenario claims; B08, 207, timelines, and non-NPCI form names were already MODELLED.

**Verified by:** All 75 Vitest tests, ESLint, strict TypeScript, and the production build passed. `/trace` measured 118 kB First Load JS. Playwright at 360px first, then 768px and 1280px, confirmed all three paths to `/check-yourself`, escalation for F1–F6 and none for F7/F8, four-page black-and-white print output, no horizontal overflow, and no console errors. A fresh unauthenticated browser context received HTTP 200 from the production home, self-check, and Kamala deep-link routes with no login wall.

## Task 8 — Mock Aadhaar consent, offline wiring, and compact print
**Asked:** Register the existing offline assets, reduce the expanded print output to at most three legible pages, and add an optional simulated Aadhaar/OTP journey that visibly demonstrates informed, read-only consent without gating existing entry paths.

**Codex did:** Used frontend-skill to make the optional sign-in visually secondary while giving the consent notice a strong paper-document hierarchy: the equally structured, higher-contrast “This will never happen” list makes clear that no mapping changes, money movement, storage, or real-system access occurs. Mounted the existing service-worker registrar, declared manifest/theme/icon metadata through Next.js APIs, and added reducer-level tests for correct OTP, retry, arbitrary synthetic identifiers, cancellation, reset, and validation. Compacted only low-priority trace and escalation print detail, preserving the form name, spoken Hindi, clerk pushback and reply, and documents checklist. Used lean-code to remove a zero-argument state factory and duplicate digit-normalization wrappers, Playwright for browser and print QA, and vercel-deploy for the scoped production release.

**Codex caught:** Keyboard focus on the newly revealed consent heading could leave it beneath the sticky synthetic-data notice; Codex reset scroll before focusing it. Print compaction initially risked orphaning the escalation heading, so the final stylesheet starts the compact escalation ledger on its own third page rather than shrinking citizen-critical instructions.

**Verified by:** All 80 Vitest tests, ESLint, strict TypeScript, and the production build passed. `/trace` measured 120 kB First Load JS. Playwright at 360px first, then 768px and 1280px, verified wrong- and correct-OTP paths, consent and cancellation, sign-out reset, direct payment ID, demo button, deep link, no horizontal overflow or console errors, and a three-page A4 printout. A fresh unauthenticated production context received HTTP 200 and observed the deployed `/sw.js` reach the `activated` state.

## Task 9 — Retraction of unsourced codes and harmful USSD advice
**Asked:** Remove the invented APBS error codes and the *99*99# instruction, add the over-seeding mechanism to F2, rebuild `/sources` with a public retraction and CAG citations, restructure `/check-yourself` to lead with BASE, and verify before shipping.

**Codex did:** Fetched and read every source in full rather than trusting the brief: NPCI's BASE process flow, the DBT Mission Aadhaar seeding process, PFMS's rejection-remedies list, the CAG Karnataka DBT performance audit (88 pages), the DBT Bharat Citizen Corner, and three PIB parliamentary replies. Replaced the USSD guidance with the BASE click path verified verbatim against NPCI's own flow, and replaced both fake codes with descriptions that appear in primary sources. Added the buried-consent over-seeding mechanism to F2 as MODELLED. Rebuilt `/sources` with a "What we removed, and why" retraction placed above the evidence ledger, four new cited entries, and a "Numbers that argue against us" section. Restructured `/check-yourself` to BASE, myAadhaar, PFMS, UMANG, with the dialling code demoted to last and labelled unreliable.

**Codex caught:** Two of the four counter-statistics in the brief could not be sourced — the "under 1%" SC scholarship failure rate and the 0.32%/2.56% APB comparison — so both were dropped and the failure to source them was disclosed on the page; the sourced MoRD figures (99.55% vs 98%) were substituted for the latter. The brief's wording for F4, "Demographic details do not match Aadhaar", is in neither PFMS's list nor the CAG audit, so it was labelled MODELLED rather than CITED as instructed. Because the before-you-travel paragraph and F2's explanation each now mix a cited claim with a modelled one, and a single chip governs the whole paragraph, both were downgraded to MODELLED so the weaker label wins. Lengthening F2 pushed the printout to four pages; space was reclaimed from whitespace and oversized display headings rather than from body text, which stays at 8.5pt/1.25 for readers without their glasses. The F3 Hindi line had to be rewritten to remove the fake code and has not yet been read aloud by a Hindi speaker, which is now stated on `/sources`.

**Verified by:** All 82 Vitest tests, ESLint, strict TypeScript, and the production build passed. `/trace` measured 121 kB First Load JS, within the 130 kB budget. A 232-check Playwright suite at 360px first, then 768px and 1280px, confirmed all five routes render without horizontal overflow, all four demo cases produce a five-stage trace and action card, deep links and arbitrary and empty input behave, the mock sign-in rejects a wrong OTP and completes through consent to a full trace, printing stays within three A4 pages, and no console or page errors occur. A repository grep confirmed "B08", "207", "48 hour", "any phone" and "99*99" appear nowhere outside the retraction, explanatory comments, and regression guards.

## Task 10 — Guided triage for citizens without a payment ID
**Asked:** Make the existing triage engine reachable through a one-question-at-a-time flow for citizens without a payment ID, then link it from the home page and footer.

**Codex did:** Used frontend-skill for a mobile-first paper-notice flow where the reasoning is visually stronger than the diagnosis, and LOW confidence is stated plainly as a guess. Added Back, Skip, answer retention, provenance disclosure, and trace handoffs for all eight outcomes. Used lean-code to remove unnecessary public exports and wrapper markup, and Playwright for 360px-first functional and visual QA.

**Codex caught:** The fixed demo cases covered only F1, F2, F3 and F5, so Codex found stable synthetic IDs for F4, F6, F7 and F8 and asserted every mapping against the real diagnose() function. It also removed a nested main landmark and corrected an inherited amber focus outline that made a non-warning heading look like a warning.

**Verified by:** All 86 Vitest tests, ESLint, strict TypeScript, and the Next.js production build passed. Playwright at 360px, 768px and 1280px verified answer-all, skip-all, Back retention, reasoning visibility, LOW-confidence wording, working trace destinations, no console errors, and no horizontal overflow. `/` measured 106 kB and `/help` 115 kB First Load JS.
