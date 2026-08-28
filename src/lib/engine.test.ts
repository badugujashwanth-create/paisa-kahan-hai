import { describe, expect, it } from "vitest";

import { DEMO_CASES } from "./cases";
import { diagnose } from "./engine";
import {
  AADHAAR_SEEDING_FORM_NAME,
  FORM_ANNEXURE_HINT,
  SCENARIOS,
} from "./scenarios";
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
const INCORRECT_BHIM_HELPLINE = ["1800", "120", "1740"].join("-");

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

      expect(action.beforeYouTravel.trim()).not.toBe("");
      expect(["CITED", "MODELLED"]).toContain(
        action.beforeYouTravelProvenance,
      );
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

  // Regression guard. We shipped "B08" and "207" as APBS response codes; no primary NPCI,
  // PFMS or UIDAI source contains either. They must never reappear anywhere a citizen
  // could read them and repeat them at a bank counter.
  it("shows no unsourced numeric failure codes anywhere in any scenario", () => {
    const retractedCodes = [/\bB0?8\b/i, /\b207\b/];

    for (const failureCode of Object.keys(SCENARIOS) as FailureCode[]) {
      const scenario = SCENARIOS[failureCode];
      const citizenFacingText = [
        scenario.humanHeadline,
        scenario.explanation,
        ...scenario.stages.flatMap((stage) => [
          stage.explanation,
          stage.technicalDetail ?? "",
        ]),
        ...Object.values(scenario.citizenAction).flatMap((value) =>
          typeof value === "string" ? [value] : Array.isArray(value) ? value : [],
        ),
      ].join(" ");

      for (const pattern of retractedCodes) {
        expect(
          citizenFacingText,
          `${failureCode} still exposes a retracted code matching ${pattern}`,
        ).not.toMatch(pattern);
      }
    }
  });

  it("describes each rail failure in words rather than a numeric code", () => {
    expect(SCENARIOS.F1.stages.find((s) => s.stageId === "MAPPER")?.technicalDetail).toBe(
      "Aadhaar number not mapped to account number",
    );
    expect(SCENARIOS.F3.stages.find((s) => s.stageId === "MAPPER")?.technicalDetail).toBe(
      "Aadhaar de-seeded from NPCI mapper by the bank",
    );
    expect(SCENARIOS.F4.stages.find((s) => s.stageId === "APBS")?.technicalDetail).toBe(
      "Demographic details do not match Aadhaar",
    );
    // Not sourced in PFMS's rejection list or the CAG audit, so it must stay MODELLED.
    expect(SCENARIOS.F4.stages.find((s) => s.stageId === "APBS")?.provenance).toBe(
      "MODELLED",
    );
  });

  it("uses the unambiguous NPCI form name and keeps annexure wording as a hint", () => {
    for (const failureCode of ["F1", "F2", "F3"] as const) {
      expect(SCENARIOS[failureCode].citizenAction.exactFormName).toBe(
        AADHAAR_SEEDING_FORM_NAME,
      );
    }

    expect(FORM_ANNEXURE_HINT).toMatch(/Annexure-I/);
    expect(FORM_ANNEXURE_HINT).toMatch(/varies between banks/i);
  });

  it("makes the one-bank mapper rule and previous bank explicit", () => {
    expect(SCENARIOS.F1.explanation).toMatch(/one bank per Aadhaar/i);
    expect(SCENARIOS.F1.explanation).toMatch(/overwrites the previous mapping/i);
    expect(SCENARIOS.F2.explanation).toMatch(/one bank per Aadhaar/i);
    expect(SCENARIOS.F2.explanation).toMatch(/overwrites the previous mapping/i);
    expect(SCENARIOS.F2.citizenAction.whatToSay).toMatch(/another bank/i);
    expect(SCENARIOS.F2.citizenAction.whatToSay).toMatch(/if I know it/i);
  });

  // Regression guard for the most harmful thing we shipped. The USSD mapper query
  // authenticates against the Aadhaar-REGISTERED mobile, so a citizen who borrows a
  // phone gets an error and concludes their Aadhaar has been deleted. It must never
  // come back, and we must never again tell anyone this works from "any phone".
  it("never tells a citizen to dial a USSD code before travelling", () => {
    for (const failureCode of Object.keys(SCENARIOS) as FailureCode[]) {
      const guidance = SCENARIOS[failureCode].citizenAction.beforeYouTravel;

      expect(guidance).not.toMatch(/\*99/);
      expect(guidance).not.toMatch(/USSD/i);
      expect(guidance).not.toMatch(/any phone/i);
      expect(guidance).not.toContain(INCORRECT_BHIM_HELPLINE);
    }
  });

  it("points a citizen at the verified BASE route and an assisted fallback", () => {
    for (const failureCode of ["F1", "F2", "F3", "F5"] as const) {
      const guidance = SCENARIOS[failureCode].citizenAction.beforeYouTravel;

      // The click path verified against NPCI's own BASE process flow.
      expect(guidance).toContain("npci.org.in");
      expect(guidance).toContain("Bharat Aadhaar Seeding Enabler");
      expect(guidance).toContain("Get Aadhaar Mapped Status");
      // Every online route needs the Aadhaar-registered mobile, so the citizen must be
      // told that up front and given a route that works without it.
      expect(guidance).toMatch(/registered with your Aadhaar/i);
      expect(guidance).toMatch(/Common Service Centre|bank branch/i);
      // Mixed sourcing: the click path is cited, the OTP and CSC claims are not.
      expect(
        SCENARIOS[failureCode].citizenAction.beforeYouTravelProvenance,
      ).toBe("MODELLED");
    }
  });
});
