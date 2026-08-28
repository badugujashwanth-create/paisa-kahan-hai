const CODEX_LOG_URL =
  "https://github.com/badugujashwanth-create/paisa-kahan-hai/blob/master/CODEX_LOG.md";

/** Render the prototype's scope, limitations, and path to real-world use. */
export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="max-w-3xl">
        <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-primary">
          Independent prototype
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight tracking-[-0.035em] text-ink sm:text-6xl">
          What this is, and what it is not
        </h1>
      </header>

      <div className="mt-9 border-y-2 border-ink">
        <section aria-labelledby="what-this-is-heading" className="py-7">
          <h2 className="text-2xl font-black text-ink" id="what-this-is-heading">
            What this is
          </h2>
          <p className="mt-3 max-w-4xl text-lg leading-8 text-ink">
            An independent hackathon prototype built for Build What Moves India.
            It is not a government service and is not affiliated with, endorsed
            by, or connected to NPCI, PFMS, UIDAI or any government body. No
            government logos are used. It does not connect to any live government
            system.
          </p>
        </section>

        <section aria-labelledby="works-heading" className="border-t border-line py-7">
          <h2 className="text-2xl font-black text-ink" id="works-heading">
            What works today
          </h2>
          <p className="mt-3 max-w-4xl text-lg leading-8 text-ink">
            The complete citizen journey works end to end: entry, five-stage
            trace, eight diagnosis outcomes, full action instructions, and
            printing. Every input returns a complete result—there are no dead
            ends. It runs entirely in the browser after first load, so it does
            not fail on a slow or dropping connection.
          </p>
        </section>

        <section aria-labelledby="mocked-heading" className="border-t border-line py-7">
          <h2 className="text-2xl font-black text-ink" id="mocked-heading">
            What is mocked
          </h2>
          <p className="mt-3 max-w-4xl text-lg leading-8 text-ink">
            The payment status of every case, the NPCI mapper state, all PFMS and
            APBS responses, and every personal detail. A real version would read
            these from live systems.
          </p>
        </section>
      </div>

      <section aria-labelledby="real-heading" className="mt-14 border-t-8 border-primary pt-9">
        <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-primary">
          The implementation path
        </p>
        <h2
          className="mt-2 max-w-4xl text-4xl font-black leading-tight tracking-[-0.035em] text-ink sm:text-5xl"
          id="real-heading"
        >
          How this would work for real
        </h2>

        <ol className="mt-9 border-t-2 border-ink">
          <li className="grid gap-3 border-b border-line py-7 sm:grid-cols-[3rem_minmax(0,1fr)]">
            <span className="text-2xl font-black text-primary" aria-hidden="true">01</span>
            <div>
              <h3 className="text-2xl font-black text-ink">Data it would need</h3>
              <p className="mt-3 text-lg leading-8 text-ink">
                PFMS payment status by beneficiary reference; the NPCI mapper&apos;s
                current Aadhaar-to-bank state; and scheme-level beneficiary
                verification status from the department. None has a public
                citizen-facing API today. That gap is the actual problem—the
                diagnosis is simple once the data exists.
              </p>
            </div>
          </li>

          <li className="grid gap-3 border-b border-line py-7 sm:grid-cols-[3rem_minmax(0,1fr)]">
            <span className="text-2xl font-black text-primary" aria-hidden="true">02</span>
            <div>
              <h3 className="text-2xl font-black text-ink">Consent</h3>
              <p className="mt-3 text-lg leading-8 text-ink">
                A citizen would authenticate and consent before any lookup. The
                tool should read status only. It must never be able to change a mapping.
              </p>
            </div>
          </li>

          <li className="grid gap-3 border-b border-line py-7 sm:grid-cols-[3rem_minmax(0,1fr)]">
            <span className="text-2xl font-black text-primary" aria-hidden="true">03</span>
            <div>
              <h3 className="text-2xl font-black text-ink">Who would run it</h3>
              <p className="mt-3 text-lg leading-8 text-ink">
                This belongs inside an existing scheme portal or a bank&apos;s own
                app, not as a separate destination. Citizens should not need to
                know this tool exists.
              </p>
            </div>
          </li>

          <li className="grid gap-3 border-b border-line py-7 sm:grid-cols-[3rem_minmax(0,1fr)]">
            <span className="text-2xl font-black text-primary" aria-hidden="true">04</span>
            <div>
              <h3 className="text-2xl font-black text-ink">Assisted use</h3>
              <p className="mt-3 text-lg leading-8 text-ink">
                It must work for a CSC operator, a college clerk or a family
                member operating it on someone else&apos;s behalf, because that is
                how it actually happens. Printed output matters more than a polished screen.
              </p>
            </div>
          </li>

          <li className="grid gap-3 border-b border-line py-7 sm:grid-cols-[3rem_minmax(0,1fr)]">
            <span className="text-2xl font-black text-primary" aria-hidden="true">05</span>
            <div>
              <h3 className="text-2xl font-black text-ink">Language</h3>
              <p className="mt-3 text-lg leading-8 text-ink">
                This prototype ships English, plus spoken Hindi scripts we could
                personally verify. A real version needs Indian languages
                properly, which means MeitY&apos;s Bhashini translation stack plus
                human review of anything a citizen will say aloud at a counter.
                We did not ship unverified translated text.
              </p>
            </div>
          </li>

          <li className="grid gap-3 border-b-2 border-ink py-7 sm:grid-cols-[3rem_minmax(0,1fr)]">
            <span className="text-2xl font-black text-primary" aria-hidden="true">06</span>
            <div>
              <h3 className="text-2xl font-black text-ink">What it deliberately does not do</h3>
              <p className="mt-3 text-lg font-semibold leading-8 text-ink">
                It does not use a language model. A citizen being told which form
                to demand needs the same answer every time, traceable to a source.
                That is a decision tree, not a model.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section aria-labelledby="team-heading" className="mt-14 border-t-4 border-ink pt-8">
        <h2 className="text-3xl font-black text-ink" id="team-heading">Team</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink">
          Built by Abhi and Jashwanth for Build What Moves India, August 2026.
          Built with OpenAI Codex. Every build task is logged publicly in{" "}
          <a className="font-bold text-primary underline decoration-2 underline-offset-4" href={CODEX_LOG_URL}>
            CODEX_LOG.md on GitHub
          </a>
          .
        </p>
      </section>
    </article>
  );
}
