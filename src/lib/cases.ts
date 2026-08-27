import type { FailureCode, TraceCase } from "./types";

export type DemoCase = TraceCase & Readonly<{ failureCode: FailureCode }>;

// Demo identifiers start with 0 or 1 because real Aadhaar numbers never do, preventing an invented case from matching a real identity.
export const DEMO_CASES: readonly DemoCase[] = [
  {
    id: "100000000001",
    displayName: "Kamala Devi",
    age: 62,
    schemeName: "Widow Pension",
    lastExpectedPaymentDate: "31 March 2026",
    portalClaim: "Payment Processed",
    provenance: "MOCK",
    failureCode: "F2",
  },
  {
    id: "100000000002",
    displayName: "Ravi Kumar",
    age: 19,
    schemeName: "Post-Matric Scholarship",
    lastExpectedPaymentDate: "30 June 2026",
    portalClaim: "Payment Processed",
    provenance: "MOCK",
    failureCode: "F1",
  },
  {
    id: "100000000003",
    displayName: "Sunita Bai",
    age: 45,
    schemeName: "PM-Kisan instalment",
    lastExpectedPaymentDate: "15 August 2026",
    portalClaim: "Payment Processed",
    provenance: "MOCK",
    failureCode: "F3",
  },
  {
    id: "100000000004",
    displayName: "Mohammed Iqbal",
    age: 71,
    schemeName: "Old Age Pension",
    lastExpectedPaymentDate: "31 July 2026",
    portalClaim: "Payment Processed",
    provenance: "MOCK",
    failureCode: "F5",
  },
];

export const DEMO_CASE_BY_ID: ReadonlyMap<string, DemoCase> = new Map(
  DEMO_CASES.map((demoCase) => [demoCase.id, demoCase]),
);

