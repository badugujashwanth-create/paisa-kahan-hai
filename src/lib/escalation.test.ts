import { describe, expect, it } from "vitest";

import { ESCALATION_LADDER } from "./escalation";

describe("ESCALATION_LADDER", () => {
  it("is ordered 1..N with no gaps", () => {
    ESCALATION_LADDER.forEach((rung, index) => {
      expect(rung.order).toBe(index + 1);
    });
  });

  it("gives every CITED rung a source URL, and every non-CITED rung a verification note", () => {
    for (const rung of ESCALATION_LADDER) {
      if (rung.provenance === "CITED") {
        expect(rung.sourceUrl, `${rung.title} is CITED but has no sourceUrl`).toBeTruthy();
      } else {
        expect(
          rung.verificationNote,
          `${rung.title} is ${rung.provenance} but has no verificationNote`,
        ).toBeTruthy();
      }
    }
  });

  it("never leaves cost, wait or contact details blank", () => {
    for (const rung of ESCALATION_LADDER) {
      expect(rung.cost.length).toBeGreaterThan(0);
      expect(rung.waitBeforeEscalating.length).toBeGreaterThan(0);
      expect(rung.contactDetails.length).toBeGreaterThan(0);
    }
  });
});
