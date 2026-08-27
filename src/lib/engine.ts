import { DEMO_CASE_BY_ID } from "./cases";
import { buildStageResults, SCENARIOS } from "./scenarios";
import type {
  Diagnosis,
  DiagnosisResult,
  FailureCode,
  TraceCase,
} from "./types";

const FAILURE_CODES: readonly FailureCode[] = [
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
];
const INPUT_SEPARATORS = /[\s-]+/g;
const HASH_OFFSET_BASIS = 2_166_136_261;
const HASH_PRIME = 16_777_619;
const SYNTHETIC_ID_PREFIX = "synthetic";
const EMPTY_INPUT_MESSAGE = "Please type the payment ID shown in this demo.";

/** Create a stable unsigned hash without adding a runtime dependency. */
function hashInput(input: string): number {
  let hash = HASH_OFFSET_BASIS;

  for (const character of input) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, HASH_PRIME);
  }

  return hash >>> 0;
}

/** Return a complete diagnosis for every non-empty input and a citizen-facing result for empty input. */
export function diagnose(input: string): DiagnosisResult {
  if (typeof input !== "string" || input.trim().length === 0) {
    return {
      ok: false,
      error: {
        code: "EMPTY_INPUT",
        message: EMPTY_INPUT_MESSAGE,
      },
    };
  }

  const normalizedInput = input.trim().replace(INPUT_SEPARATORS, "");
  const stableInput = normalizedInput || input.trim();
  const inputHash = hashInput(stableInput);
  const demoCase = DEMO_CASE_BY_ID.get(normalizedInput);
  const failureCode =
    demoCase?.failureCode ?? FAILURE_CODES[inputHash % FAILURE_CODES.length];

  // Reviewers will try arbitrary values, so every non-empty input must resolve to a full scenario instead of a dead end.
  const baseDiagnosis = structuredClone(SCENARIOS[failureCode]);
  let traceCase: TraceCase = {
    id: `${SYNTHETIC_ID_PREFIX}-${inputHash.toString(16)}`,
    displayName: "Demo Citizen",
    age: null,
    schemeName: "Government Benefit",
    lastExpectedPaymentDate: "August 2026",
    portalClaim: "Payment Processed",
    provenance: "MOCK",
  };

  if (demoCase) {
    traceCase = {
      id: demoCase.id,
      displayName: demoCase.displayName,
      age: demoCase.age,
      schemeName: demoCase.schemeName,
      lastExpectedPaymentDate: demoCase.lastExpectedPaymentDate,
      portalClaim: demoCase.portalClaim,
      provenance: demoCase.provenance,
    };
  }

  const diagnosis: Diagnosis = {
    ...baseDiagnosis,
    traceCase,
  };

  return { ok: true, diagnosis };
}

export { buildStageResults };
