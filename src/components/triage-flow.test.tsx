import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { diagnose } from "../lib/engine";
import { TRIAGE_QUESTIONS, triage } from "../lib/triage";
import type { FailureCode } from "../lib/types";

const COMPONENT_SOURCE = readFileSync(
  new URL("./triage-flow.tsx", import.meta.url),
  "utf8",
);

const EXPECTED_TRACE_IDS: Readonly<Record<FailureCode, string>> = {
  F1: "100000000002",
  F2: "100000000001",
  F3: "100000000003",
  F4: "100000000005",
  F5: "100000000004",
  F6: "100000000010",
  F7: "100000000006",
  F8: "100000000009",
};

describe("guided triage flow", () => {
  it("has renderable copy and answer choices for every question", () => {
    expect(TRIAGE_QUESTIONS).toHaveLength(5);
    expect(COMPONENT_SOURCE).toContain("{question.prompt}");
    expect(COMPONENT_SOURCE).toContain("question.options.map");

    for (const question of TRIAGE_QUESTIONS) {
      expect(question.prompt.trim().length).toBeGreaterThan(0);
      expect(question.options.length).toBeGreaterThan(0);
      expect(question.options.every((option) => option.label.trim().length > 0)).toBe(true);
    }
  });

  it("skips every question and still produces a visible reasoning result", () => {
    const result = triage({});

    expect(result.reasoning.trim().length).toBeGreaterThan(0);
    expect(result.confidence).toBe("LOW");
    expect(result.reasoning.toLowerCase()).toContain("guess");
    expect(COMPONENT_SOURCE).toContain("I don&apos;t know — skip this question");
    expect(COMPONENT_SOURCE).toContain("{result.reasoning}");
  });

  it("wires Back to the previous question while retaining existing answers", () => {
    expect(COMPONENT_SOURCE).toContain('action.type === "BACK"');
    expect(COMPONENT_SOURCE).toContain("questionIndex: state.questionIndex - 1");
    expect(COMPONENT_SOURCE).toContain("{ ...state, questionIndex:");
    expect(COMPONENT_SOURCE).toContain("onClick={onBack}");
  });

  it("links every estimate to an ID that diagnose resolves to the same scenario", () => {
    for (const [failureCode, traceId] of Object.entries(EXPECTED_TRACE_IDS)) {
      expect(COMPONENT_SOURCE).toContain(`${failureCode}: "${traceId}"`);
      const diagnosisResult = diagnose(traceId);

      expect(diagnosisResult.ok).toBe(true);
      if (!diagnosisResult.ok) continue;
      expect(diagnosisResult.diagnosis.failureCode).toBe(failureCode);
    }

    expect(COMPONENT_SOURCE).toContain("href={`/trace?id=${traceId}`}");
  });
});
