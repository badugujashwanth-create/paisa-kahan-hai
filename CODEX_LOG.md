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
