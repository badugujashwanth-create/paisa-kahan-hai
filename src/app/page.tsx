import Link from "next/link";

import { Prov } from "@/components/prov";

type ChainStatus = "PASSED" | "FAILED" | "NOT_REACHED";

type ChainStage = Readonly<{
  shortName: string;
  status: ChainStatus;
}>;

// The same five stages the trace walks, abbreviated so all five fit on one
// 360px row. This is the product's signature image, so it appears before a
// citizen has run anything rather than only inside a result.
const CHAIN_STAGES: readonly ChainStage[] = [
  { shortName: "Scheme", status: "PASSED" },
  { shortName: "Treasury", status: "PASSED" },
  { shortName: "Aadhaar", status: "PASSED" },
  { shortName: "Mapper", status: "FAILED" },
  { shortName: "Bank", status: "NOT_REACHED" },
];

const PROVENANCE_KINDS = ["cited", "modelled", "mock", "verified"] as const;

/** Render the small status glyph for one stage of the home-page chain. */
function ChainIcon({ status }: Readonly<{ status: ChainStatus }>) {
  if (status === "PASSED") {
    return (
      <svg aria-hidden="true" className="size-5" fill="none" focusable="false" viewBox="0 0 24 24">
        <path
          d="m5 12.5 4.25 4.25L19 7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.5"
        />
      </svg>
    );
  }

  if (status === "FAILED") {
    return (
      <svg aria-hidden="true" className="size-5" fill="none" focusable="false" viewBox="0 0 24 24">
        <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="3.5" />
      </svg>
    );
  }

  return <span aria-hidden="true" className="size-2 rounded-full bg-muted" />;
}

/** Render the five-stage payment chain with its one broken link. */
function PaymentChain() {
  return (
    <ol
      aria-label="Five-stage payment chain, breaking at the NPCI mapper"
      className="m-0 flex list-none items-start gap-1.5 p-0 sm:gap-2"
    >
      {CHAIN_STAGES.map((stage, index) => {
        const previous = CHAIN_STAGES[index - 1];
        // The rule is only "live" where the payment actually travelled, so it
        // goes dead at the same point the money does.
        const connectorClassName =
          previous && previous.status === "PASSED" ? "bg-success" : "bg-line";
        const markerClassName =
          stage.status === "PASSED"
            ? "bg-success text-paper"
            : stage.status === "FAILED"
              ? "bg-error text-paper ring-4 ring-error/20"
              : "border-2 border-line bg-paper text-muted";

        return (
          <li className="flex min-w-0 flex-1 flex-col items-center gap-2" key={stage.shortName}>
            <div className="relative flex w-full justify-center">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className={`absolute right-1/2 top-[1.125rem] h-1 w-full -translate-y-1/2 ${connectorClassName}`}
                />
              ) : null}
              <span
                className={`relative z-10 flex size-9 items-center justify-center rounded-full ${markerClassName}`}
              >
                <ChainIcon status={stage.status} />
              </span>
            </div>
            {/* Sentence case, not uppercase: five uppercase words do not fit a
                360px row without colliding, and shrinking them further would
                make the labels unreadable. */}
            <span
              className={`text-center text-[0.6875rem] font-black leading-tight sm:text-xs ${
                stage.status === "FAILED" ? "text-error" : "text-muted"
              }`}
            >
              {stage.shortName}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** Render the short public entry point for starting a payment trace. */
export default function HomePage() {
  return (
    <section
      aria-labelledby="home-heading"
      className="home-entry mx-auto flex w-full max-w-6xl flex-1 items-center px-5 py-10 sm:px-8 sm:py-14"
    >
      {/* Three blocks, not two columns: on a phone the chain graphic has to sit
          directly under the headline where it is seen in the first seconds, while
          on a wide screen it belongs beside the whole left-hand column. */}
      <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14">
        <div className="max-w-2xl lg:col-start-1 lg:row-start-1">
          <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-primary">
            Payment missing?
          </p>
          <h1
            className="mt-3 text-4xl font-black leading-[1.06] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl"
            id="home-heading"
          >
            Your government payment says &lsquo;Processed&rsquo;. So where is it?
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink sm:text-xl sm:leading-9">
            We trace the payment through the scheme office, treasury, Aadhaar
            payment system, NPCI mapper, and bank. Then we tell you what broke and
            the exact thing to do next.
          </p>
        </div>

        <div className="lg:col-start-2 lg:row-start-1 lg:pl-2">
          <div className="border-2 border-ink bg-white">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-ink px-5 py-4">
              <p className="m-0 text-xs font-black uppercase tracking-[0.12em] text-muted">
                The portal says
              </p>
              <p className="m-0 text-xl font-black leading-tight text-ink sm:text-2xl">
                Payment Processed
              </p>
            </div>

            <div className="px-5 py-7">
              <PaymentChain />
            </div>

            <div className="border-t-2 border-ink bg-error px-5 py-5 text-paper">
              <p className="m-0 text-xs font-black uppercase tracking-[0.12em]">
                The bank received
              </p>
              <p className="m-0 mt-1 text-3xl font-black leading-none tracking-[-0.02em] sm:text-4xl">
                Nothing.
              </p>
            </div>
          </div>

        </div>

        <div className="max-w-2xl lg:col-start-1 lg:row-start-2">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link
              className="inline-flex min-h-14 w-full items-center justify-center bg-primary px-6 py-3 text-center text-lg font-black text-paper hover:bg-ink sm:w-auto sm:whitespace-nowrap"
              href="/trace"
            >
              Find my missing payment
            </Link>
            <Link
              className="flex min-h-tap w-fit items-center font-black text-primary underline decoration-2 underline-offset-4"
              href="/help"
            >
              I don&apos;t have a payment ID
            </Link>
          </div>

          <p className="mt-4 text-base font-semibold text-muted">
            Helping someone else? This works for that too.
          </p>
          <Link
            className="mt-3 inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
            href="/check-yourself"
          >
            Or check your Aadhaar mapping yourself, free, right now
          </Link>

          <nav
            aria-label="More information"
            className="mt-7 flex gap-6 border-t border-line pt-4"
          >
            <Link
              className="inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
              href="/about"
            >
              About
            </Link>
            <Link
              className="inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
              href="/sources"
            >
              Sources
            </Link>
          </nav>
        </div>

        <div className="lg:col-start-2 lg:row-start-2 lg:pl-2">
          <div className="border-t border-line pt-5">
            <p className="m-0 text-base font-bold leading-7 text-ink">
              Every claim we make carries its evidence:
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              {PROVENANCE_KINDS.map((kind) => (
                <Prov key={kind} kind={kind} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
