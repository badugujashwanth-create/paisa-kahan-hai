# Paisa Kahan Hai

Helps an Indian citizen find out why a government benefit payment never arrived, and exactly what to do about it.

**Live:** https://paisa-kahan-hai-hazel.vercel.app
**Demo case:** https://paisa-kahan-hai-hazel.vercel.app/trace?id=100000000001

## The problem

A government portal can say "Payment Processed" even when the money never reaches the citizen's account, without explaining why. A common source of confusion is that Aadhaar-linked for bank KYC is not the same as Aadhaar-seeded in the NPCI mapper for DBT. The mapper holds one bank account per Aadhaar number, so a newer seeding silently overwrites the older mapping. The payment may therefore go to a different bank from the one the citizen expects.

## What it does

The app traces a payment through five stages: scheme, treasury (PFMS), Aadhaar Payment Bridge (APBS), NPCI mapper, and bank. It identifies the first stage that failed and returns a physical action: where to go, the form to ask for by name, what to say in English and spoken Hindi, and what to say back when the clerk pushes back. The result is printable.

## Try it

- `100000000001` — Kamala Devi — demonstrates an NPCI mapper overwritten by a later bank seeding.
- `100000000002` — Ravi Kumar — demonstrates an Aadhaar number that was never seeded in the NPCI mapper.
- `100000000003` — Sunita Bai — demonstrates a bank that did not upload the Aadhaar mandate to the central mapper.
- `100000000004` — Mohammed Iqbal — demonstrates a dormant account or expired KYC.

Any other input also returns a complete example diagnosis.

## Honesty

All data is synthetic. `MOCK` means invented for the demo; `MODELLED` means behaviour based on documented systems but not quoted; `CITED` means checked against a primary source; and `VERIFIED` means a team member personally checked the exact text. The full evidence record is on the [Sources page](https://paisa-kahan-hai-hazel.vercel.app/sources).

All demo IDs begin with 0 or 1. Real Aadhaar numbers never begin with 0 or 1, so the synthetic identifiers cannot collide with a real identity.

## How Codex built this

OpenAI Codex did all product coding across five feature tasks, following the initial scaffold. It used `frontend-skill` for art direction, `lean-code` for anti-bloat audits, Playwright for visual and functional QA, and `vercel-deploy` for releases. The full per-task record is in [CODEX_LOG.md](CODEX_LOG.md).

Codex also caught issues that were not part of the original requests: it compacted a three-page print layout to two pages, found that Vercel preview deployments were protected by a login screen, and diagnosed a collision between the development server and the production build's shared cache.

## Stack and size

- Next.js 15 with the App Router
- TypeScript in strict mode
- Tailwind CSS v4
- No component library, icon library, i18n library, or animation library
- No backend
- No language model runs inside the product

First Load JS from the production build:

- `/`: 106 kB
- `/about`: 103 kB
- `/sources`: 103 kB
- `/trace`: 116 kB

## Not a government service

This is an independent hackathon prototype for Build What Moves India. It is not affiliated with or endorsed by NPCI, PFMS, UIDAI or any government body. No government logos are used. It does not connect to any live government system.

## Run locally

```sh
npm install
npm run dev
npm test
npm run build
```
