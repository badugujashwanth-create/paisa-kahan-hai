import { describe, expect, it } from "vitest";

import { TRIAGE_QUESTIONS, triage, type TriageAnswers } from "./triage";

const VALID_FAILURE_CODES = new Set(["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"]);

/** Every question's answer ids, plus `undefined` for "skipped this question". */
const ANSWER_SPACE_BY_QUESTION = TRIAGE_QUESTIONS.map((question) => ({
  id: question.id,
  choices: [...question.options.map((option) => option.id), undefined],
}));

/** Cartesian product of every question's possible answers (including skipped). */
function everyPossibleAnswerCombination(): TriageAnswers[] {
  return ANSWER_SPACE_BY_QUESTION.reduce<TriageAnswers[]>(
    (combinations, question) =>
      combinations.flatMap((combination) =>
        question.choices.map((choice) => ({ ...combination, [question.id]: choice })),
      ),
    [{}],
  );
}

describe("triage", () => {
  it("returns a valid failure code and non-empty reasoning for every possible answer combination", () => {
    for (const answers of everyPossibleAnswerCombination()) {
      const result = triage(answers);

      expect(VALID_FAILURE_CODES.has(result.failureCode)).toBe(true);
      expect(["HIGH", "MEDIUM", "LOW"]).toContain(result.confidence);
      expect(result.reasoning.trim().length).toBeGreaterThan(0);
    }
  });

  it("never throws, even with no answers at all", () => {
    expect(() => triage({})).not.toThrow();
  });

  it("routes a recent bank/Aadhaar change, on a payment that used to arrive, to F2", () => {
    const result = triage({
      everReceivedBefore: "USED_TO_BUT_STOPPED",
      recentBankOrAadhaarChange: "YES",
    });

    expect(result.failureCode).toBe("F2");
  });

  it("never routes a never-received payment to F2, and always to F1 or F6", () => {
    for (const portalOrSmsMessage of [
      "SAYS_SUCCESSFUL",
      "SAYS_PENDING",
      "SAYS_REJECTED_FAILED",
      "DONT_KNOW",
      undefined,
    ] as const) {
      for (const recentBankOrAadhaarChange of ["YES", "NO", "NOT_SURE", undefined] as const) {
        const result = triage({
          everReceivedBefore: "NEVER",
          portalOrSmsMessage,
          recentBankOrAadhaarChange,
        });

        expect(result.failureCode).not.toBe("F2");
        expect(["F1", "F6"]).toContain(result.failureCode);
      }
    }
  });

  it("marks genuinely ambiguous answers with LOW confidence and says so in the reasoning", () => {
    const result = triage({});

    expect(result.confidence).toBe("LOW");
    expect(result.reasoning.toLowerCase()).toContain("guess");
  });
});
