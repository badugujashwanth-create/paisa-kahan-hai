import { describe, expect, it } from "vitest";

import { DEMO_CASES } from "./cases";
import { diagnose } from "./engine";
import { SCENARIOS } from "./scenarios";
import type { Diagnosis, FailureCode } from "./types";

const DETERMINISM_RUNS = 100;
const COVERAGE_INPUT_COUNT = 4_096;
const NON_EMPTY_INPUT_COUNT = 100;
const EXPECTED_STAGE_COUNT = 5;
const FIXED_CASE_EXPECTATIONS: Readonly<Record<string, FailureCode>> = {
  "100000000001": "F2",
  "100000000002": "F1",
  "100000000003": "F3",
  "100000000004": "F5",
};
const DEVANAGARI_CHARACTERS = /[\u0900-\u097f]/u;
const GENDERED_ROMAN_HINDI_VERB_ENDINGS = /a?u?ng[ai]/iu;

/** Unwrap a successful result for assertions that use known non-empty input. */
function getDiagnosis(input: string): Diagnosis {
  const result = diagnose(input);

  if (!result.ok) {
    throw new Error(`Expected a diagnosis for non-empty input: ${input}`);
  }

  return result.diagnosis;
}

describe("diagnose", () => {
  it.each(Object.entries(FIXED_CASE_EXPECTATIONS))(
    "maps fixed demo ID %s to %s",
    (demoId, expectedFailureCode) => {
      expect(getDiagnosis(demoId).failureCode).toBe(expectedFailureCode);
    },
  );

  it("accepts spaces and hyphens in fixed demo IDs", () => {
    expect(getDiagnosis("1000-0000 0001").failureCode).toBe("F2");
  });

  it("returns the same diagnosis for the same arbitrary input 100 times", () => {
    const arbitraryInput = "reviewer input 42-A";
    const firstDiagnosis = getDiagnosis(arbitraryInput);

    for (let run = 0; run < DETERMINISM_RUNS; run += 1) {
      expect(getDiagnosis(arbitraryInput)).toEqual(firstDiagnosis);
    }
  });

  it("reaches all eight scenarios across many deterministic arbitrary inputs", () => {
    const observedFailureCodes = new Set<FailureCode>();

    for (let index = 0; index < COVERAGE_INPUT_COUNT; index += 1) {
      observedFailureCodes.add(getDiagnosis(`random-review-${index}`).failureCode);
    }

    expect(observedFailureCodes).toEqual(new Set(Object.keys(SCENARIOS)));
  });

  it("returns ok true for every non-empty string", () => {
    const nonEmptyInputs = [
      "-",
      "---",
      "0",
      "not a number",
      "@#$%",
      "payment-id",
      ...Array.from(
        { length: NON_EMPTY_INPUT_COUNT },
        (_, index) => `citizen-entry-${index}`,
      ),
    ];

    for (const input of nonEmptyInputs) {
      expect(diagnose(input).ok).toBe(true);
    }
  });

  it("returns the only typed error for empty or whitespace-only input without throwing", () => {
    expect(() => diagnose("   \t\n")).not.toThrow();
    expect(diagnose("   \t\n")).toEqual({
      ok: false,
      error: {
        code: "EMPTY_INPUT",
        message: "Please type the payment ID shown in this demo.",
      },
    });
  });
});

describe("scenario completeness", () => {
  it("keeps all fixed case data synthetic", () => {
    expect(DEMO_CASES).toHaveLength(Object.keys(FIXED_CASE_EXPECTATIONS).length);
    expect(DEMO_CASES.every((demoCase) => demoCase.provenance === "MOCK")).toBe(
      true,
    );
  });

  it.each(Object.values(SCENARIOS))(
    "$failureCode has complete spoken actions",
    (scenario) => {
      const action = scenario.citizenAction;

      expect(action.exactFormName.trim()).not.toBe("");
      expect(action.whatToSay.trim()).not.toBe("");
      expect(action.whatToSayHindiRoman.trim()).not.toBe("");
      expect(action.clerkPushback.trim()).not.toBe("");
      expect(action.yourReply.trim()).not.toBe("");
      expect(action.fieldProvenance.whatToSayHindiRoman).toBe("VERIFIED");
      expect(action.whatToSayHindiRoman).not.toMatch(DEVANAGARI_CHARACTERS);
      expect(action.whatToSayHindiRoman).not.toMatch(
        GENDERED_ROMAN_HINDI_VERB_ENDINGS,
      );
    },
  );

  it.each(Object.values(SCENARIOS))(
    "$failureCode always contains exactly five ordered stages",
    (scenario) => {
      expect(scenario.stages).toHaveLength(EXPECTED_STAGE_COUNT);
      expect(scenario.stages.map((stage) => stage.stageId)).toEqual([
        "SCHEME",
        "PFMS",
        "APBS",
        "MAPPER",
        "BANK",
      ]);
    },
  );

  it.each(Object.values(SCENARIOS))(
    "$failureCode marks every stage after its failed or pending stage as not reached",
    (scenario) => {
      const terminalStageIndex = scenario.stages.findIndex(
        (stage) => stage.status === "FAILED" || stage.status === "PENDING",
      );

      expect(terminalStageIndex).toBeGreaterThanOrEqual(0);
      expect(
        scenario.stages
          .slice(terminalStageIndex + 1)
          .every((stage) => stage.status === "NOT_REACHED"),
      ).toBe(true);
    },
  );

  it("uses no failed stage for the normal in-flight scenario", () => {
    expect(SCENARIOS.F8.failedStage).toBeNull();
    expect(SCENARIOS.F8.humanHeadline).toMatch(/normally/i);
  });
});
