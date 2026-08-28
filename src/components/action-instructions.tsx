import type { ReactNode } from "react";

import { Prov, type ProvKind } from "@/components/prov";
import {
  AADHAAR_SEEDING_FORM_NAME,
  FORM_ANNEXURE_HINT,
} from "@/lib/scenarios";
import type { Diagnosis, Provenance } from "@/lib/types";

type ActionInstructionsProps = Readonly<{
  diagnosis: Diagnosis;
}>;

type InstructionHeadingProps = Readonly<{
  number: number;
  children: ReactNode;
}>;

/** Convert the domain provenance value to the chip component's lowercase kind. */
function provenanceKind(provenance: Provenance): ProvKind {
  return provenance.toLowerCase() as ProvKind;
}

/** Render a numbered instruction heading that stays legible in print. */
function InstructionHeading({ number, children }: InstructionHeadingProps) {
  return (
    <h3 className="flex items-start gap-3 text-xl font-black leading-tight text-ink sm:text-2xl">
      <span
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-ink text-base"
      >
        {number}
      </span>
      <span className="pt-1">{children}</span>
    </h3>
  );
}

/** Render the counter-ready action output for a completed diagnosis. */
export function ActionInstructions({ diagnosis }: ActionInstructionsProps) {
  const action = diagnosis.citizenAction;
  const isWaitOnly = diagnosis.failureCode === "F7" || diagnosis.failureCode === "F8";
  const usesNpciSeedingForm = action.exactFormName === AADHAAR_SEEDING_FORM_NAME;

  return (
    <section
      aria-labelledby="action-heading"
      className="print-section mt-12 border-t-4 border-ink pt-8"
    >
      <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-primary">
        {isWaitOnly ? "No trip needed" : "Take this with you"}
      </p>
      <h2
        className="mt-2 text-4xl font-black leading-tight tracking-[-0.03em] text-ink"
        id="action-heading"
      >
        {isWaitOnly ? "What happens next" : "What to do about it"}
      </h2>

      <div className="action-step -mx-5 mt-7 border-y-4 border-accent bg-accent/10 px-5 py-6 sm:-mx-8 sm:px-8">
        <InstructionHeading number={0}>Before you travel</InstructionHeading>
        <p className="mt-4 text-lg font-semibold leading-8 text-ink">
          {action.beforeYouTravel}
        </p>
        <div className="mt-4">
          <Prov kind={provenanceKind(action.beforeYouTravelProvenance)} />
        </div>
      </div>

      {isWaitOnly ? (
        <div
          className={`action-step mt-8 border-y-4 px-5 py-7 sm:px-7 ${
            diagnosis.failedStage === null
              ? "border-success bg-success-soft"
              : "border-accent bg-accent/10"
          }`}
          data-action-mode="wait"
        >
          <h3 className="text-3xl font-black leading-tight text-ink">
            There is nothing to do right now
          </h3>
          <p className="mt-5 text-sm font-black uppercase tracking-[0.1em] text-primary">
            Check again
          </p>
          <p className="mt-2 text-lg font-bold leading-8 text-ink">
            {action.expectedTimeline}
          </p>
          <div className="mt-3">
            <Prov kind={provenanceKind(action.fieldProvenance.expectedTimeline)} />
          </div>
          <p className="mt-6 text-sm font-black uppercase tracking-[0.1em] text-primary">
            Cost
          </p>
          <p className="mt-2 text-lg font-bold leading-8 text-ink">
            {action.costToCitizen}
          </p>
        </div>
      ) : (
        <ol className="m-0 list-none p-0">
          <li className="action-step border-b border-line py-7">
            <InstructionHeading number={1}>Where to go</InstructionHeading>
            <p className="mt-4 text-lg leading-8 text-ink">{action.whereToGo}</p>
          </li>

          <li className="action-step border-b border-line py-7">
            <InstructionHeading number={2}>Who to ask</InstructionHeading>
            <p className="mt-4 text-lg leading-8 text-ink">{action.whoToAsk}</p>
          </li>

          <li className="action-step -mx-5 border-y-4 border-primary bg-primary/5 px-5 py-7 sm:-mx-8 sm:px-8">
            <InstructionHeading number={3}>The form to ask for</InstructionHeading>
            <p className="mt-5 text-3xl font-black leading-tight text-primary sm:text-4xl">
              {action.exactFormName}
            </p>
            {usesNpciSeedingForm ? (
              <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-muted">
                {FORM_ANNEXURE_HINT}
              </p>
            ) : null}
            <div className="mt-4">
              <Prov kind={provenanceKind(action.fieldProvenance.exactFormName)} />
            </div>
          </li>

          <li className="action-step action-step-long border-b border-line py-8">
            <InstructionHeading number={4}>What to say</InstructionHeading>
            <p className="mt-5 text-lg font-semibold leading-8 text-ink">
              &ldquo;{action.whatToSay}&rdquo;
            </p>
            <blockquote className="mt-5 border-l-8 border-primary bg-primary px-5 py-6 text-paper sm:px-7">
              <p className="text-xl font-black leading-8 sm:text-2xl">
                &ldquo;{action.whatToSayHindiRoman}&rdquo;
              </p>
              <footer className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Prov kind="verified" />
                <span className="text-base font-bold text-paper">
                  Spoken Hindi — checked by a human on our team
                </span>
              </footer>
            </blockquote>
          </li>

          <li className="action-step action-step-long border-b border-line py-8">
            <InstructionHeading number={5}>If they say no</InstructionHeading>
            <div className="mt-5 border-4 border-ink">
              <div className="bg-line/45 px-5 py-5 sm:px-7">
                <p className="text-sm font-black uppercase tracking-[0.09em] text-error">
                  They will probably say:
                </p>
                <p className="mt-2 text-lg font-bold leading-8 text-ink">
                  &ldquo;{action.clerkPushback}&rdquo;
                </p>
              </div>
              <div className="counter-reply border-t-4 border-ink bg-primary px-5 py-6 text-paper sm:px-7">
                <p className="text-sm font-black uppercase tracking-[0.09em] text-paper">
                  You say:
                </p>
                <p className="mt-2 text-xl font-black leading-8 text-paper">
                  &ldquo;{action.yourReply}&rdquo;
                </p>
                <div className="mt-4">
                  <Prov kind={provenanceKind(action.fieldProvenance.yourReply)} />
                </div>
              </div>
            </div>
          </li>

          <li className="action-step border-b border-line py-7">
            <InstructionHeading number={6}>What to bring</InstructionHeading>
            <ul className="mt-5 space-y-3">
              {action.documentsToBring.map((document) => (
                <li className="flex gap-3 text-lg leading-8 text-ink" key={document}>
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-5 shrink-0 border-2 border-ink bg-white"
                  />
                  <span>{document}</span>
                </li>
              ))}
            </ul>
          </li>

          <li className="action-step border-b border-line py-7">
            <InstructionHeading number={7}>How long it takes</InstructionHeading>
            <p className="mt-4 text-lg leading-8 text-ink">{action.expectedTimeline}</p>
            <div className="mt-4">
              <Prov kind={provenanceKind(action.fieldProvenance.expectedTimeline)} />
            </div>
          </li>

          <li className="action-step py-7">
            <InstructionHeading number={8}>What it costs</InstructionHeading>
            <p className="mt-4 text-lg leading-8 text-ink">{action.costToCitizen}</p>
          </li>
        </ol>
      )}
    </section>
  );
}
