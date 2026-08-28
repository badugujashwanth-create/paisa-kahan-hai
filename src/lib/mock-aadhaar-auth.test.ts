import { describe, expect, it } from "vitest";

import {
  INITIAL_MOCK_AUTH_STATE,
  MOCK_OTP,
  mockAadhaarAuthReducer,
} from "./mock-aadhaar-auth";

const DEMO_AADHAAR = "100000000001";
const ARBITRARY_AADHAAR = "987654321012";

describe("mock Aadhaar authentication", () => {
  it("accepts the correct OTP and proceeds through consent", () => {
    let state = INITIAL_MOCK_AUTH_STATE;

    state = mockAadhaarAuthReducer(state, {
      type: "CHANGE_AADHAAR",
      value: DEMO_AADHAAR,
    });
    state = mockAadhaarAuthReducer(state, { type: "SEND_OTP" });
    state = mockAadhaarAuthReducer(state, {
      type: "CHANGE_OTP",
      value: MOCK_OTP,
    });
    state = mockAadhaarAuthReducer(state, { type: "VERIFY_OTP" });

    expect(state.step).toBe("CONSENT");
    expect(mockAadhaarAuthReducer(state, { type: "AGREE" }).step).toBe(
      "SIGNED_IN",
    );
  });

  it("shows a retryable error for a wrong OTP without leaving the OTP step", () => {
    let state = INITIAL_MOCK_AUTH_STATE;

    state = mockAadhaarAuthReducer(state, {
      type: "CHANGE_AADHAAR",
      value: DEMO_AADHAAR,
    });
    state = mockAadhaarAuthReducer(state, { type: "SEND_OTP" });
    state = mockAadhaarAuthReducer(state, {
      type: "CHANGE_OTP",
      value: "654321",
    });
    state = mockAadhaarAuthReducer(state, { type: "VERIFY_OTP" });

    expect(state.step).toBe("OTP");
    expect(state.otpError).toMatch(/not correct/i);

    state = mockAadhaarAuthReducer(state, {
      type: "CHANGE_OTP",
      value: MOCK_OTP,
    });
    state = mockAadhaarAuthReducer(state, { type: "VERIFY_OTP" });
    expect(state.step).toBe("CONSENT");
  });

  it("accepts any complete 12-digit synthetic example", () => {
    let state = INITIAL_MOCK_AUTH_STATE;

    state = mockAadhaarAuthReducer(state, {
      type: "CHANGE_AADHAAR",
      value: ARBITRARY_AADHAAR,
    });
    state = mockAadhaarAuthReducer(state, { type: "SEND_OTP" });

    expect(state.step).toBe("OTP");
    expect(state.aadhaarError).toBe("");
  });

  it("returns to a clean entry state on sign-out or cancellation", () => {
    const changedState = mockAadhaarAuthReducer(INITIAL_MOCK_AUTH_STATE, {
      type: "CHANGE_AADHAAR",
      value: DEMO_AADHAAR,
    });

    expect(mockAadhaarAuthReducer(changedState, { type: "RESET" })).toEqual(
      INITIAL_MOCK_AUTH_STATE,
    );
  });

  it("keeps an incomplete Aadhaar entry on screen with a clear error", () => {
    let state = INITIAL_MOCK_AUTH_STATE;

    state = mockAadhaarAuthReducer(state, {
      type: "CHANGE_AADHAAR",
      value: "1000 0000",
    });
    state = mockAadhaarAuthReducer(state, { type: "SEND_OTP" });

    expect(state.step).toBe("AADHAAR");
    expect(state.aadhaarError).toMatch(/12 digits/i);
  });
});
