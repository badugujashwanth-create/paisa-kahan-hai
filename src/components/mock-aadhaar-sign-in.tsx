"use client";

import type {
  ChangeEvent,
  Dispatch,
  FormEvent,
} from "react";
import { useEffect, useRef } from "react";

import { Prov } from "@/components/prov";
import {
  MOCK_AADHAAR_DISPLAY,
  MOCK_AADHAAR_DIGIT_COUNT,
  MOCK_MOBILE_ENDING,
  MOCK_OTP,
  MOCK_OTP_DIGIT_COUNT,
  type MockAuthAction,
  type MockAuthState,
} from "@/lib/mock-aadhaar-auth";

type MockAadhaarSignInProps = Readonly<{
  state: MockAuthState;
  dispatch: Dispatch<MockAuthAction>;
  onAgree: () => void;
}>;

/** Render the optional synthetic Aadhaar, OTP, and read-only consent journey. */
export function MockAadhaarSignIn({
  state,
  dispatch,
  onAgree,
}: MockAadhaarSignInProps) {
  const otpInputReference = useRef<HTMLInputElement>(null);
  const consentHeadingReference = useRef<HTMLHeadingElement>(null);

  /** Move focus to the newly revealed step for keyboard and screen-reader users. */
  useEffect(() => {
    if (state.step === "OTP") {
      otpInputReference.current?.focus();
    } else if (state.step === "CONSENT") {
      // The sticky synthetic-data notice otherwise covers the focused heading
      // after the lower OTP form is replaced by the consent screen.
      window.scrollTo({ top: 0, behavior: "auto" });
      consentHeadingReference.current?.focus({ preventScroll: true });
    }
  }, [state.step]);

  /** Store a digits-only synthetic Aadhaar value. */
  function handleAadhaarChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "CHANGE_AADHAAR", value: event.target.value });
  }

  /** Validate the mock Aadhaar length before revealing the OTP step. */
  function handleAadhaarSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({ type: "SEND_OTP" });
  }

  /** Store a digits-only mock OTP value while clearing a stale error. */
  function handleOtpChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "CHANGE_OTP", value: event.target.value });
  }

  /** Check the fixed demo OTP without contacting any external service. */
  function handleOtpSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({ type: "VERIFY_OTP" });
  }

  /** Clear every mock credential and return to the first optional step. */
  function resetMockSignIn() {
    dispatch({ type: "RESET" });
  }

  if (state.step === "CONSENT") {
    return (
      <section
        aria-labelledby="consent-heading"
        className="-mx-5 border-y-8 border-primary bg-white px-5 py-7 sm:-mx-8 sm:px-8 sm:py-6"
      >
        <div className="flex flex-wrap items-center gap-3">
          <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-primary">
            Your permission comes first
          </p>
          <Prov kind="mock" />
        </div>
        <h1
          className="mt-3 max-w-2xl text-4xl font-black leading-[1.05] tracking-[-0.035em] text-ink sm:mt-2 sm:text-5xl"
          id="consent-heading"
          ref={consentHeadingReference}
          tabIndex={-1}
        >
          Before we check anything
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink sm:mt-3">
          Paisa Kahan Hai is asking for permission to read three payment
          statuses so it can explain where this example payment stopped.
        </p>

        <div className="mt-6 grid border-y-4 border-ink sm:mt-4 sm:grid-cols-2">
          <section
            aria-labelledby="consent-read-heading"
            className="px-4 py-5 sm:border-r-4 sm:border-ink sm:px-5 sm:py-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-black text-ink" id="consent-read-heading">
                We will read
              </h2>
              <Prov kind="mock" />
            </div>
            <ul className="mt-4 space-y-3 text-base font-bold leading-6 text-ink">
              <li>DBT payment status</li>
              <li>NPCI mapper state</li>
              <li>Scheme beneficiary status</li>
            </ul>
          </section>

          <section
            aria-labelledby="consent-never-heading"
            className="border-t-4 border-ink bg-primary px-4 py-5 text-paper sm:border-t-0 sm:px-5 sm:py-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-black text-paper" id="consent-never-heading">
                This will never happen
              </h2>
              <Prov kind="mock" />
            </div>
            <ul className="mt-4 space-y-3 text-base font-black leading-6 text-paper">
              <li>No Aadhaar-bank mapping will be changed.</li>
              <li>No money will move.</li>
              <li>Nothing will be stored.</li>
              <li>No real bank or government system will be contacted.</li>
            </ul>
          </section>
        </div>

        <section aria-labelledby="consent-who-heading" className="mt-6 border-l-4 border-accent pl-4 sm:mt-4">
          <h2 className="text-xl font-black text-ink" id="consent-who-heading">
            Who is asking, and why
          </h2>
          <p className="mt-2 text-base leading-7 text-ink">
            This independent hackathon prototype is demonstrating how a real
            service should ask before a read-only lookup. This screen is a
            simulation and the entered number stays only in this browser tab.
          </p>
        </section>

        <div className="mt-7 flex flex-col gap-3 sm:mt-5 sm:flex-row">
          <button
            className="min-h-14 bg-primary px-6 py-3 text-lg font-black text-paper hover:bg-ink"
            onClick={onAgree}
            type="button"
          >
            I agree — check my payment
          </button>
          <button
            className="min-h-14 border-2 border-primary px-6 py-3 text-lg font-black text-primary hover:bg-primary hover:text-paper"
            onClick={resetMockSignIn}
            type="button"
          >
            Cancel
          </button>
        </div>
      </section>
    );
  }

  if (state.step === "SIGNED_IN") {
    return null;
  }

  return (
    <section
      aria-labelledby="mock-sign-in-heading"
      className="-mx-5 mt-10 border-y-2 border-accent bg-accent/10 px-5 py-7 sm:-mx-8 sm:px-8"
    >
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-black text-ink" id="mock-sign-in-heading">
          Sign in with Aadhaar (demo)
        </h2>
        <Prov kind="mock" />
      </div>
      <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-ink">
        Optional. This is only a simulation: no OTP is sent and no real Aadhaar
        is accepted or checked. Any 12-digit entry is treated as synthetic and
        stays only in this browser tab.
      </p>

      <dl className="mt-5 grid gap-3 border-y border-ink/35 py-4 text-base sm:grid-cols-2">
        <div>
          <dt className="font-bold text-muted">Demo Aadhaar</dt>
          <dd className="mt-1 font-mono text-xl font-black text-ink">
            {MOCK_AADHAAR_DISPLAY}
          </dd>
        </div>
        <div>
          <dt className="font-bold text-muted">Demo OTP</dt>
          <dd className="mt-1 font-mono text-xl font-black text-ink">{MOCK_OTP}</dd>
        </div>
      </dl>

      {state.step === "AADHAAR" ? (
        <form className="mt-6" noValidate onSubmit={handleAadhaarSubmit}>
          <label className="block text-lg font-black text-ink" htmlFor="mock-aadhaar">
            Enter a 12-digit Aadhaar number
          </label>
          <input
            aria-describedby={state.aadhaarError ? "mock-aadhaar-error" : "mock-aadhaar-help"}
            aria-invalid={Boolean(state.aadhaarError)}
            autoComplete="off"
            className={`mt-3 min-h-14 w-full border-2 bg-white px-4 py-3 font-mono text-xl font-bold text-ink ${
              state.aadhaarError ? "border-error" : "border-ink"
            }`}
            id="mock-aadhaar"
            inputMode="numeric"
            maxLength={MOCK_AADHAAR_DIGIT_COUNT}
            onChange={handleAadhaarChange}
            value={state.aadhaarInput}
          />
          <p className="mt-2 text-base leading-6 text-muted" id="mock-aadhaar-help">
            For the walkthrough, use {MOCK_AADHAAR_DISPLAY}.
          </p>
          {state.aadhaarError ? (
            <p className="mt-2 font-bold text-error" id="mock-aadhaar-error">
              {state.aadhaarError}
            </p>
          ) : null}
          <button
            className="mt-4 min-h-14 w-full border-2 border-primary bg-white px-5 py-3 text-lg font-black text-primary hover:bg-primary hover:text-paper sm:w-auto"
            type="submit"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <form className="mt-6" noValidate onSubmit={handleOtpSubmit}>
          <p className="border-l-4 border-accent pl-4 text-base font-bold leading-7 text-ink" role="status">
            Simulated OTP sent to mock mobile ••••••{MOCK_MOBILE_ENDING}. No
            message was actually sent.
          </p>
          <label className="mt-5 block text-lg font-black text-ink" htmlFor="mock-otp">
            Enter the 6-digit OTP
          </label>
          <input
            aria-describedby={state.otpError ? "mock-otp-error" : "mock-otp-help"}
            aria-invalid={Boolean(state.otpError)}
            autoComplete="one-time-code"
            className={`mt-3 min-h-14 w-full border-2 bg-white px-4 py-3 font-mono text-2xl font-black tracking-[0.2em] text-ink ${
              state.otpError ? "border-error" : "border-ink"
            }`}
            id="mock-otp"
            inputMode="numeric"
            maxLength={MOCK_OTP_DIGIT_COUNT}
            onChange={handleOtpChange}
            ref={otpInputReference}
            value={state.otpInput}
          />
          <p className="mt-2 text-base leading-6 text-muted" id="mock-otp-help">
            The demo OTP is {MOCK_OTP}.
          </p>
          {state.otpError ? (
            <p className="mt-2 font-bold text-error" id="mock-otp-error">
              {state.otpError}
            </p>
          ) : null}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              className="min-h-14 bg-primary px-5 py-3 text-lg font-black text-paper hover:bg-ink"
              type="submit"
            >
              Check OTP
            </button>
            <button
              className="min-h-14 border-2 border-primary bg-white px-5 py-3 text-lg font-black text-primary hover:bg-primary hover:text-paper"
              onClick={resetMockSignIn}
              type="button"
            >
              Use a different number
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
