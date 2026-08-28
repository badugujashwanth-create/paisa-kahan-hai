"use client";

import Link from "next/link";
import { useEffect, useReducer, useRef } from "react";

import { Prov } from "./prov";
import { SCENARIOS } from "../lib/scenarios";
import {
  TRIAGE_QUESTIONS,
  triage,
  type ConfidenceLevel,
  type TriageAnswers,
  type TriageQuestion,
  type TriageResult,
} from "../lib/triage";
import type { FailureCode } from "../lib/types";

const TRACE_ID_BY_FAILURE_CODE: Readonly<Record<FailureCode, string>> = {
  F1: "100000000002",
  F2: "100000000001",
  F3: "100000000003",
  F4: "100000000005",
  F5: "100000000004",
  F6: "100000000010",
  F7: "100000000006",
  F8: "100000000009",
};

const CONFIDENCE_COPY: Readonly<Record<ConfidenceLevel, string>> = {
  HIGH: "Strong estimate",
  MEDIUM: "Reasonable estimate",
  LOW: "Best guess only",
};

type TriageFlowState = Readonly<{
  questionIndex: number;
  answers: TriageAnswers;
  result: TriageResult | null;
}>;

type TriageFlowAction =
  | Readonly<{ type: "ANSWER"; value: string }>
  | Readonly<{ type: "SKIP" }>
  | Readonly<{ type: "BACK" }>;

const INITIAL_TRIAGE_FLOW_STATE: TriageFlowState = {
  questionIndex: 0,
  answers: {},
  result: null,
};

type TriageQuestionStepProps = Readonly<{
  answer?: string;
  onAnswer: (value: string) => void;
  onBack: () => void;
  onSkip: () => void;
  question: TriageQuestion;
  questionIndex: number;
}>;

type TriageResultNoticeProps = Readonly<{
  onBack: () => void;
  result: TriageResult;
}>;

/** Advance to the next question or calculate the final guided estimate. */
function advanceFlow(
  state: TriageFlowState,
  nextAnswers: TriageAnswers,
): TriageFlowState {
  const nextQuestionIndex = state.questionIndex + 1;

  if (nextQuestionIndex >= TRIAGE_QUESTIONS.length) {
    return {
      questionIndex: state.questionIndex,
      answers: nextAnswers,
      result: triage(nextAnswers),
    };
  }

  return {
    questionIndex: nextQuestionIndex,
    answers: nextAnswers,
    result: null,
  };
}

/** Apply one validated navigation or answer change to the guided flow. */
function triageFlowReducer(
  state: TriageFlowState,
  action: TriageFlowAction,
): TriageFlowState {
  if (action.type === "BACK") {
    if (state.result) {
      return { ...state, result: null };
    }

    return state.questionIndex > 0
      ? { ...state, questionIndex: state.questionIndex - 1 }
      : state;
  }

  const question = TRIAGE_QUESTIONS[state.questionIndex];

  if (!question) return state;

  if (action.type === "SKIP") {
    return advanceFlow(state, {
      ...state.answers,
      [question.id]: undefined,
    });
  }

  const selectedOption = question.options.find(
    (option) => option.id === action.value,
  );

  if (!selectedOption) return state;

  return advanceFlow(state, {
    ...state.answers,
    [question.id]: selectedOption.id,
  } as TriageAnswers);
}

/** Render one plain-language question with large answer and navigation targets. */
function TriageQuestionStep({
  answer,
  onAnswer,
  onBack,
  onSkip,
  question,
  questionIndex,
}: TriageQuestionStepProps) {
  const questionNumber = questionIndex + 1;

  return (
    <section aria-labelledby={`triage-question-${questionIndex}`}>
      <p className="text-sm font-black uppercase tracking-[0.12em] text-primary">
        Question {questionNumber} of {TRIAGE_QUESTIONS.length}
      </p>
      <div aria-hidden="true" className="mt-3 flex gap-2">
        {TRIAGE_QUESTIONS.map((progressQuestion, index) => (
          <span
            className={`h-1.5 flex-1 ${index <= questionIndex ? "bg-primary" : "bg-line"}`}
            key={progressQuestion.id}
          />
        ))}
      </div>

      <h2
        className="mt-7 scroll-mt-32 text-3xl font-black leading-tight tracking-[-0.025em] text-ink focus:outline-none sm:text-4xl"
        id={`triage-question-${questionIndex}`}
        tabIndex={-1}
      >
        {question.prompt}
      </h2>

      <div className="mt-7 divide-y-2 divide-line border-y-2 border-line">
        {question.options.map((option) => (
          <button
            aria-pressed={answer === option.id}
            className={`flex min-h-16 w-full items-center px-4 py-4 text-left text-lg font-black leading-7 transition-colors focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              answer === option.id
                ? "bg-primary text-paper"
                : "bg-white text-ink hover:bg-primary/10"
            }`}
            key={option.id}
            onClick={() => onAnswer(option.id)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
        {questionIndex > 0 ? (
          <button
            className="inline-flex min-h-tap items-center px-1 font-black text-primary underline decoration-2 underline-offset-4"
            onClick={onBack}
            type="button"
          >
            Back
          </button>
        ) : (
          <span aria-hidden="true" />
        )}
        <button
          className="inline-flex min-h-tap items-center px-1 font-black text-primary underline decoration-2 underline-offset-4"
          onClick={onSkip}
          type="button"
        >
          I don&apos;t know — skip this question
        </button>
      </div>
    </section>
  );
}

/** Render the reasoning-led estimate and its verified trace destination. */
function TriageResultNotice({ onBack, result }: TriageResultNoticeProps) {
  const traceId = TRACE_ID_BY_FAILURE_CODE[result.failureCode];
  const isLowConfidence = result.confidence === "LOW";

  return (
    <section aria-labelledby="triage-result-heading" aria-live="polite">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm font-black uppercase tracking-[0.12em] text-primary">
          Guided estimate
        </p>
        <Prov kind="mock" />
      </div>
      <h2
        className="mt-4 scroll-mt-32 text-3xl font-black leading-tight tracking-[-0.025em] text-ink focus:outline-none sm:text-4xl"
        id="triage-result-heading"
        tabIndex={-1}
      >
        How we reached this estimate
      </h2>
      <p className="mt-5 border-l-8 border-primary bg-white px-5 py-5 text-xl font-black leading-8 text-ink sm:text-2xl sm:leading-9">
        {result.reasoning}
      </p>

      <div
        className={`mt-6 border-l-4 px-4 py-4 ${
          isLowConfidence
            ? "border-accent bg-accent/10"
            : "border-primary bg-primary/10"
        }`}
      >
        <p className="text-lg font-black text-ink">
          Confidence: {CONFIDENCE_COPY[result.confidence]}
        </p>
        {isLowConfidence ? (
          <p className="mt-2 text-base font-bold leading-7 text-ink">
            This is our best guess. A payment ID would give you a definite answer.
          </p>
        ) : null}
      </div>

      <p className="mt-8 text-sm font-black uppercase tracking-[0.12em] text-primary">
        Most likely reason
      </p>
      <h3 className="mt-2 text-3xl font-black leading-tight text-ink">
        {SCENARIOS[result.failureCode].humanHeadline}
      </h3>
      <p className="mt-4 text-base font-semibold leading-7 text-muted">
        This is a guided estimate using mock examples. It is not a lookup of any
        real payment or personal record.
      </p>

      <Link
        className="mt-7 inline-flex min-h-14 w-full items-center justify-center bg-primary px-6 py-3 text-center text-lg font-black text-paper hover:bg-ink sm:w-auto"
        href={`/trace?id=${traceId}`}
      >
        See what to do about it
      </Link>
      <div className="mt-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
        <button
          className="inline-flex min-h-tap items-center font-black text-primary underline decoration-2 underline-offset-4"
          onClick={onBack}
          type="button"
        >
          Change an answer
        </button>
        <Link
          className="inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
          href="/trace"
        >
          I found my payment ID
        </Link>
      </div>
    </section>
  );
}

/** Run the five-question client-only triage journey without storing answers. */
export function TriageFlow() {
  const [state, dispatch] = useReducer(
    triageFlowReducer,
    INITIAL_TRIAGE_FLOW_STATE,
  );
  const flowReference = useRef<HTMLDivElement>(null);

  /** Move keyboard focus to the newly displayed question or result explanation. */
  useEffect(() => {
    flowReference.current
      ?.querySelector<HTMLElement>("h2")
      ?.focus();
  }, [state.questionIndex, state.result]);

  const question = TRIAGE_QUESTIONS[state.questionIndex];

  return (
    <div className="mt-10 border-t-4 border-primary pt-8" ref={flowReference}>
      {state.result ? (
        <TriageResultNotice
          onBack={() => dispatch({ type: "BACK" })}
          result={state.result}
        />
      ) : question ? (
        <TriageQuestionStep
          answer={state.answers[question.id]}
          onAnswer={(value) => dispatch({ type: "ANSWER", value })}
          onBack={() => dispatch({ type: "BACK" })}
          onSkip={() => dispatch({ type: "SKIP" })}
          question={question}
          questionIndex={state.questionIndex}
        />
      ) : null}
    </div>
  );
}
