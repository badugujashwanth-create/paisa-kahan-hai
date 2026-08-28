import { describe, expect, it } from "vitest";

import { generateComplaintLetter } from "./complaint-letter";
import { ESCALATION_LADDER } from "./escalation";
import { SCENARIOS } from "./scenarios";
import type { FailureCode } from "./types";

const ALL_FAILURE_CODES = Object.keys(SCENARIOS) as FailureCode[];
const PLACEHOLDER_PATTERNS = [/undefined/i, /\bTODO\b/i, /\[object Object\]/i, /\bNaN\b/i];
const BANK_RUNG = ESCALATION_LADDER.find((rung) => rung.order === 1)!;
const RBI_OMBUDSMAN_RUNG = ESCALATION_LADDER.find((rung) => rung.order === 3)!;
const CPGRAMS_RUNG = ESCALATION_LADDER.find((rung) => rung.order === 4)!;

function flattenLetterText(letter: ReturnType<typeof generateComplaintLetter>): string {
  return [
    letter.recipientLine,
    letter.dateLine,
    letter.subjectLine,
    ...letter.bodyParagraphs,
    letter.specificRequest,
    letter.acknowledgementRequest,
    letter.timelineStatement,
    letter.escalationNotice,
    ...letter.signatureBlock,
  ].join("\n");
}

describe("generateComplaintLetter", () => {
  it.each(ALL_FAILURE_CODES)("produces a complete letter for %s with no details supplied", (code) => {
    const letter = generateComplaintLetter(SCENARIOS[code]);

    expect(letter.recipientLine.trim().length).toBeGreaterThan(0);
    expect(letter.dateLine.trim().length).toBeGreaterThan(0);
    expect(letter.subjectLine.trim().length).toBeGreaterThan(0);
    expect(letter.bodyParagraphs.length).toBeGreaterThan(0);
    letter.bodyParagraphs.forEach((paragraph) => expect(paragraph.trim().length).toBeGreaterThan(0));
    expect(letter.specificRequest.trim().length).toBeGreaterThan(0);
    expect(letter.acknowledgementRequest.trim().length).toBeGreaterThan(0);
    expect(letter.timelineStatement.trim().length).toBeGreaterThan(0);
    expect(letter.escalationNotice.trim().length).toBeGreaterThan(0);
    expect(letter.signatureBlock.length).toBeGreaterThan(0);
  });

  it.each(ALL_FAILURE_CODES)("produces a complete letter for %s with full citizen details supplied", (code) => {
    const letter = generateComplaintLetter(SCENARIOS[code], {
      citizenName: "Test Citizen",
      accountNumber: "1234567890",
      branchOrOfficeName: "Test Branch",
      firstVisitDate: "1 August 2026",
    });

    expect(flattenLetterText(letter)).toContain("Test Citizen");
  });

  it.each(ALL_FAILURE_CODES)("never contains placeholder text for %s", (code) => {
    const text = flattenLetterText(generateComplaintLetter(SCENARIOS[code]));

    for (const pattern of PLACEHOLDER_PATTERNS) {
      expect(text).not.toMatch(pattern);
    }
  });

  it("cites the bank grievance rung's real timeline for the bank-actionable codes", () => {
    for (const code of ["F1", "F2", "F3", "F4", "F5"] as FailureCode[]) {
      const letter = generateComplaintLetter(SCENARIOS[code]);

      expect(letter.timelineStatement).toContain(BANK_RUNG.waitBeforeEscalating);
      expect(letter.escalationNotice).toContain(RBI_OMBUDSMAN_RUNG.contactDetails[0]);
    }
  });

  it("cites the CPGRAMS rung's real timeline for the beneficiary-verification code (F6)", () => {
    const letter = generateComplaintLetter(SCENARIOS.F6);

    expect(letter.timelineStatement).toContain(CPGRAMS_RUNG.waitBeforeEscalating);
  });

  it("cites the CPGRAMS rung as the fallback channel for the wait-only codes (F7, F8)", () => {
    for (const code of ["F7", "F8"] as FailureCode[]) {
      const letter = generateComplaintLetter(SCENARIOS[code]);

      expect(letter.escalationNotice).toContain(CPGRAMS_RUNG.waitBeforeEscalating);
    }
  });

  it("leaves a visible underscore blank when no citizen name is supplied", () => {
    const letter = generateComplaintLetter(SCENARIOS.F1);

    expect(letter.signatureBlock.some((line) => line.includes("___"))).toBe(true);
  });
});
