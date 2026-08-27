import type { CSSProperties } from "react";

import { Prov, type ProvKind } from "@/components/prov";
import type {
  Provenance,
  StageId,
  StageResult,
  StageStatus,
} from "@/lib/types";

const STAGE_NAMES: Readonly<Record<StageId, string>> = {
  SCHEME: "Scheme",
  PFMS: "Treasury (PFMS)",
  APBS: "Aadhaar Payment Bridge (APBS)",
  MAPPER: "NPCI Mapper",
  BANK: "Bank",
};

const STATUS_LABELS: Readonly<Record<StageStatus, string>> = {
  PASSED: "Passed",
  FAILED: "Failed here",
  PENDING: "Still processing",
  NOT_REACHED: "Not reached — the payment never got this far",
};

const PROVENANCE_KINDS: Readonly<Record<Provenance, ProvKind>> = {
  MOCK: "mock",
  MODELLED: "modelled",
  CITED: "cited",
  VERIFIED: "verified",
};

type StageTimelineProps = Readonly<{
  stages: readonly StageResult[];
}>;

type TimelineStyle = CSSProperties & {
  "--trace-stage-index": number;
};

/** Render the accessible status symbol for one payment stage. */
function StageStatusIcon({ status }: Readonly<{ status: StageStatus }>) {
  if (status === "PASSED") {
    return (
      <svg
        aria-label="Passed"
        className="size-6"
        fill="none"
        focusable="false"
        role="img"
        viewBox="0 0 24 24"
      >
        <path
          d="m5 12.5 4.25 4.25L19 7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>
    );
  }

  if (status === "FAILED") {
    return (
      <svg
        aria-label="Failed"
        className="size-7"
        fill="none"
        focusable="false"
        role="img"
        viewBox="0 0 24 24"
      >
        <path
          d="m6 6 12 12M18 6 6 18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
    );
  }

  if (status === "PENDING") {
    return (
      <svg
        aria-label="Still processing"
        className="size-6"
        fill="none"
        focusable="false"
        role="img"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M12 7.5V12l3 2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  return (
    <span
      aria-label="Not reached"
      className="size-3 rounded-full border-2 border-muted bg-paper"
      role="img"
    />
  );
}

/** Render the ordered five-stage payment journey as a vertical timeline. */
export function StageTimeline({ stages }: StageTimelineProps) {
  const terminalStageIndex = stages.findIndex(
    (stage) => stage.status === "FAILED" || stage.status === "PENDING",
  );

  return (
    <ol aria-label="Five-stage payment trace" className="m-0 list-none p-0">
      {stages.map((stage, stageIndex) => {
        const isFailed = stage.status === "FAILED";
        const isLastStage = stageIndex === stages.length - 1;
        const revealIndex = Math.min(stageIndex, terminalStageIndex);
        const timelineStyle: TimelineStyle = {
          "--trace-stage-index": revealIndex,
        };
        const markerClassName = isFailed
          ? "bg-paper text-error ring-4 ring-paper/35"
          : stage.status === "PASSED"
            ? "bg-success text-paper"
            : stage.status === "PENDING"
              ? "bg-accent text-ink"
              : "bg-paper text-muted ring-2 ring-line";

        return (
          <li
            className={`trace-stage grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 ${
              isFailed
                ? "-mx-5 border-y-4 border-error bg-error px-5 py-7 text-paper sm:-mx-8 sm:px-8"
                : "py-6"
            } ${stage.status === "NOT_REACHED" ? "opacity-60" : ""}`}
            key={stage.stageId}
            style={timelineStyle}
          >
            <div className="relative flex justify-center">
              <span
                className={`relative z-10 flex size-11 items-center justify-center rounded-full ${markerClassName}`}
              >
                <StageStatusIcon status={stage.status} />
              </span>
              {!isLastStage ? (
                <span
                  aria-hidden="true"
                  className={`absolute bottom-[-1.75rem] top-11 w-1 ${
                    stage.status === "PASSED" ? "bg-success" : "bg-line"
                  }`}
                />
              ) : null}
            </div>

            <div className="min-w-0 pt-0.5">
              <p
                className={`m-0 text-sm font-black uppercase tracking-[0.09em] ${
                  isFailed
                    ? "text-paper"
                    : stage.status === "PASSED"
                      ? "text-success"
                      : stage.status === "PENDING"
                        ? "text-ink"
                        : "text-muted"
                }`}
              >
                {STATUS_LABELS[stage.status]}
              </p>
              <h3
                className={`mt-1 font-black leading-tight ${
                  isFailed ? "text-3xl text-paper" : "text-xl text-ink"
                }`}
              >
                {STAGE_NAMES[stage.stageId]}
              </h3>
              <p
                className={`mt-2 text-base leading-7 ${
                  isFailed ? "font-semibold text-paper" : "text-ink"
                }`}
              >
                {stage.explanation}
              </p>
              {stage.technicalDetail ? (
                <code
                  className={`mt-3 block break-words font-mono text-sm ${
                    isFailed ? "text-paper" : "text-muted"
                  }`}
                >
                  {stage.technicalDetail}
                </code>
              ) : null}
              <div className="mt-3">
                <Prov kind={PROVENANCE_KINDS[stage.provenance]} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
