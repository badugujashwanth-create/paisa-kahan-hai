import { TriageFlow } from "@/components/triage-flow";

/** Render the guided path for citizens who do not have a payment ID. */
export default function HelpPage() {
  return (
    <section
      aria-labelledby="help-heading"
      className="mx-auto w-full max-w-3xl px-5 py-9 sm:px-8 sm:py-12"
    >
      <p className="text-sm font-black uppercase tracking-[0.12em] text-primary">
        No payment ID needed
      </p>
      <h1
        className="mt-3 max-w-2xl text-4xl font-black leading-[1.06] tracking-[-0.04em] text-ink sm:text-5xl"
        id="help-heading"
      >
        You don&apos;t have a payment ID. Let&apos;s work it out.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-ink">
        Answer a few plain questions and we will tell you the most likely reason
        your money has not arrived. You can skip anything you do not understand.
      </p>
      <TriageFlow />
    </section>
  );
}
