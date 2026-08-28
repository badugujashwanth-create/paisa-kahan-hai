export const MOCK_AADHAAR_DISPLAY = "1000 0000 0001";
export const MOCK_OTP = "123456";
export const MOCK_MOBILE_ENDING = "3210";
export const MOCK_AADHAAR_DIGIT_COUNT = 12;
export const MOCK_OTP_DIGIT_COUNT = 6;

const NON_DIGIT_PATTERN = /\D/g;

export type MockAuthStep = "AADHAAR" | "OTP" | "CONSENT" | "SIGNED_IN";

export type MockAuthState = Readonly<{
  step: MockAuthStep;
  aadhaarInput: string;
  otpInput: string;
  aadhaarError: string;
  otpError: string;
}>;

export type MockAuthAction =
  | Readonly<{ type: "CHANGE_AADHAAR"; value: string }>
  | Readonly<{ type: "SEND_OTP" }>
  | Readonly<{ type: "CHANGE_OTP"; value: string }>
  | Readonly<{ type: "VERIFY_OTP" }>
  | Readonly<{ type: "AGREE" }>
  | Readonly<{ type: "RESET" }>;

export const INITIAL_MOCK_AUTH_STATE: MockAuthState = {
  step: "AADHAAR",
  aadhaarInput: "",
  otpInput: "",
  aadhaarError: "",
  otpError: "",
};

/** Keep only the allowed number of digits for one mock credential field. */
function normalizeMockDigits(input: string, maximumLength: number): string {
  return input.replace(NON_DIGIT_PATTERN, "").slice(0, maximumLength);
}

/** Apply one validated transition in the client-only mock authentication flow. */
export function mockAadhaarAuthReducer(
  state: MockAuthState,
  action: MockAuthAction,
): MockAuthState {
  if (action.type === "CHANGE_AADHAAR") {
    return {
      ...state,
      aadhaarInput: normalizeMockDigits(
        action.value,
        MOCK_AADHAAR_DIGIT_COUNT,
      ),
      aadhaarError: "",
    };
  }

  if (action.type === "SEND_OTP") {
    if (state.aadhaarInput.length !== MOCK_AADHAAR_DIGIT_COUNT) {
      return {
        ...state,
        aadhaarError: "Please enter all 12 digits. Use the demo number shown above or any 12-digit example.",
      };
    }

    return {
      ...state,
      step: "OTP",
      aadhaarError: "",
      otpInput: "",
      otpError: "",
    };
  }

  if (action.type === "CHANGE_OTP") {
    return {
      ...state,
      otpInput: normalizeMockDigits(action.value, MOCK_OTP_DIGIT_COUNT),
      otpError: "",
    };
  }

  if (action.type === "VERIFY_OTP") {
    if (state.step !== "OTP" || state.otpInput !== MOCK_OTP) {
      return {
        ...state,
        otpError: "That OTP is not correct for this demo. Enter 123456 and try again.",
      };
    }

    return {
      ...state,
      step: "CONSENT",
      otpError: "",
    };
  }

  if (action.type === "AGREE") {
    return state.step === "CONSENT" ? { ...state, step: "SIGNED_IN" } : state;
  }

  return INITIAL_MOCK_AUTH_STATE;
}
