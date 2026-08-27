"use client";

import {
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { Prov, type ProvKind } from "@/components/prov";
import { StageTimeline } from "@/components/stage-timeline";
import { DEMO_CASES } from "@/lib/cases";
import { diagnose } from "@/lib/engine";
import type { Diagnosis } from "@/lib/types";

type PaymentOwner = "mine" | "helping";

const OWNER_COPY: Readonly<
  Record<PaymentOwner, Readonly<{ possessive: string; resultLabel: string }>>
> = {
  mine: {
    possessive: "your",
    resultLabel: "We checked your payment",
  },
  helping: {
    possessive: "their",
    resultLabel: "We checked their payment",
  },
};

/** Render the payment-ID entry and five-stage diagnosis journey. */
export default function TracePage() {
  const [paymentOwner, setPaymentOwner] = useState<PaymentOwner>("mine");
  const [paymentId, setPaymentId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const entryHeadingReference = useRef<HTMLHeadingElement>(null);
  const inputReference = useRef<HTMLInputElement>(null);
  const resultHeadingReference = useRef<HTMLHeadingElement>(null);
  const shouldFocusEntry = useRef(false);
  const ownerCopy = OWNER_COPY[paymentOwner];

  /** Move keyboard focus when the journey changes screens. */
  useEffect(() => {
    if (diagnosis) {
      resultHeadingReference.current?.focus();
      return;
    }

    if (shouldFocusEntry.current) {
      entryHeadingReference.current?.focus();
      shouldFocusEntry.current = false;
    }
  }, [diagnosis]);

  /** Store a validated owner choice from either relationship button. */
  function handlePaymentOwnerChange(event: MouseEvent<HTMLButtonElement>) {
    const selectedOwner = event.currentTarget.value;

    if (selectedOwner === "mine" || selectedOwner === "helping") {
      setPaymentOwner(selectedOwner);
    }
  }

  /** Update the payment identifier while clearing a stale validation message. */
  function handlePaymentIdChange(event: ChangeEvent<HTMLInputElement>) {
    setPaymentId(event.target.value);
    setErrorMessage("");
  }

  /** Fill the input with a synthetic case without submitting unexpectedly. */
  function chooseDemoCase(event: MouseEvent<HTMLButtonElement>) {
    const demoId = event.currentTarget.value.trim();

    if (!demoId) return;

    setPaymentId(demoId);
    setErrorMessage("");
    inputReference.current?.focus();
  }

  /** Diagnose the entered payment identifier and keep citizen-facing errors inline. */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = diagnose(paymentId);

    if (!result.ok) {
      setErrorMessage(result.error.message);
      inputReference.current?.focus();
      return;
    }

    setErrorMessage("");
    setDiagnosis(result.diagnosis);
  }

  /** Return to the entry screen for another payment check. */
  function checkAnotherPayment() {
    shouldFocusEntry.current = true;
    setPaymentId("");
    setErrorMessage("");
    setDiagnosis(null);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-9 sm:px-8 sm:py-12">
      <p aria-live="polite" className="sr-only" role="status">
        {diagnosis
          ? `Diagnosis ready for ${diagnosis.traceCase.displayName}: ${diagnosis.humanHeadline}`
          : errorMessage}
      </p>

      {diagnosis ? (
        <div>
          <section aria-labelledby="case-heading">
            <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-primary">
              {ownerCopy.resultLabel}
            </p>
            <h1
              className="mt-2 text-4xl font-black leading-[1.08] tracking-[-0.03em] text-ink sm:text-5xl"
              id="case-heading"
              ref={resultHeadingReference}
              tabIndex={-1}
            >
              {diagnosis.traceCase.displayName}
            </h1>
            <dl className="mt-5 grid gap-3 border-y border-line py-5 text-base sm:grid-cols-3">
              {diagnosis.traceCase.age !== null ? (
                <div>
                  <dt className="font-bold text-muted">Age</dt>
                  <dd className="mt-1 text-lg font-black text-ink">
                    {diagnosis.traceCase.age}
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="font-bold text-muted">Scheme</dt>
                <dd className="mt-1 text-lg font-black text-ink">
                  {diagnosis.traceCase.schemeName}
                </dd>
              </div>
              <div>
                <dt className="font-bold text-muted">Payment expected</dt>
                <dd className="mt-1 text-lg font-black text-ink">
                  {diagnosis.traceCase.lastExpectedPaymentDate}
                </dd>
              </div>
            </dl>

            <div className="mt-6 border-l-8 border-accent bg-ink px-5 py-5 text-paper">
              <p className="m-0 text-base font-semibold">The official portal says:</p>
              <p className="mt-1 text-2xl font-black leading-tight">
                {diagnosis.traceCase.portalClaim}
              </p>
              <div className="mt-3">
                <Prov kind="mock" />
              </div>
            </div>
          </section>

          <section aria-labelledby="trace-heading" className="mt-12">
            <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-primary">
              Five checks, in order
            </p>
            <h2
              className="mt-2 text-3xl font-black tracking-[-0.025em] text-ink"
              id="trace-heading"
            >
              Where {ownerCopy.possessive} payment went
            </h2>
            <div className="mt-5">
              <StageTimeline stages={diagnosis.stages} />
            </div>
          </section>

          <section
            aria-labelledby="diagnosis-heading"
            className={`mt-10 border-t-8 px-5 py-7 sm:px-7 ${
              diagnosis.failedStage === null
                ? "border-success bg-success-soft"
                : "border-primary bg-white"
            }`}
          >
            <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-primary">
              Diagnosis
            </p>
            <h2
              className="mt-2 text-3xl font-black leading-tight tracking-[-0.025em] text-ink sm:text-4xl"
              id="diagnosis-heading"
            >
              {diagnosis.humanHeadline}
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink">{diagnosis.explanation}</p>
            <div className="mt-5">
              <Prov kind={diagnosis.provenance.toLowerCase() as ProvKind} />
            </div>
          </section>

          <section aria-labelledby="action-heading" className="mt-10 border-t border-line pt-8">
            <h2 className="text-3xl font-black text-ink" id="action-heading">
              What to do about it
            </h2>
            <p className="mt-3 text-lg text-ink">Coming in the next step.</p>
          </section>

          <button
            className="mt-10 min-h-tap w-full border-2 border-primary bg-transparent px-5 py-3 text-lg font-black text-primary hover:bg-primary hover:text-paper sm:w-auto"
            onClick={checkAnotherPayment}
            type="button"
          >
            Check another payment
          </button>
        </div>
      ) : (
        <div>
          <h1
            className="max-w-xl text-4xl font-black leading-[1.08] tracking-[-0.035em] text-ink sm:text-5xl"
            ref={entryHeadingReference}
            tabIndex={-1}
          >
            Whose payment are we checking?
          </h1>

          <div aria-label="Choose whose payment" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2" role="group">
            <button
              aria-pressed={paymentOwner === "mine"}
              className={`min-h-14 border-2 px-5 py-3 text-left text-lg font-black ${
                paymentOwner === "mine"
                  ? "border-primary bg-primary text-paper"
                  : "border-line bg-transparent text-ink hover:border-primary"
              }`}
              onClick={handlePaymentOwnerChange}
              type="button"
              value="mine"
            >
              Mine
            </button>
            <button
              aria-pressed={paymentOwner === "helping"}
              className={`min-h-14 border-2 px-5 py-3 text-left text-lg font-black ${
                paymentOwner === "helping"
                  ? "border-primary bg-primary text-paper"
                  : "border-line bg-transparent text-ink hover:border-primary"
              }`}
              onClick={handlePaymentOwnerChange}
              type="button"
              value="helping"
            >
              Someone I am helping
            </button>
          </div>

          <form className="mt-9" noValidate onSubmit={handleSubmit}>
            <label className="block text-lg font-black text-ink" htmlFor="payment-id">
              Enter the payment ID
            </label>
            <input
              aria-describedby={errorMessage ? "payment-id-error" : undefined}
              aria-invalid={errorMessage ? true : undefined}
              autoComplete="off"
              className={`mt-3 min-h-14 w-full border-2 bg-white px-4 py-3 text-xl font-bold text-ink ${
                errorMessage ? "border-error" : "border-ink"
              }`}
              id="payment-id"
              inputMode="numeric"
              onChange={handlePaymentIdChange}
              ref={inputReference}
              value={paymentId}
            />
            {errorMessage ? (
              <p className="mt-2 font-bold text-error" id="payment-id-error">
                {errorMessage}
              </p>
            ) : null}
            <button
              className="mt-4 min-h-14 w-full bg-primary px-5 py-3 text-lg font-black text-paper hover:bg-ink"
              type="submit"
            >
              Check
            </button>
          </form>

          <section
            aria-labelledby="demo-cases-heading"
            className="-mx-5 mt-10 border-y-2 border-accent bg-accent/10 px-5 py-7 sm:-mx-8 sm:px-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-black text-ink" id="demo-cases-heading">
                Demo cases — tap one to try
              </h2>
              <Prov kind="mock" />
            </div>
            <div className="mt-5 divide-y divide-ink/25 border-y border-ink/25">
              {DEMO_CASES.map((demoCase) => (
                <button
                  className="min-h-14 w-full py-4 text-left text-ink hover:bg-accent/15"
                  key={demoCase.id}
                  onClick={chooseDemoCase}
                  type="button"
                  value={demoCase.id}
                >
                  <span className="block text-lg font-black">{demoCase.displayName}</span>
                  <span className="mt-1 block text-base leading-6">
                    {demoCase.schemeName} — {demoCase.id}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-5 text-base font-semibold leading-7 text-ink">
              Any other number also works — every input returns a full example diagnosis.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
