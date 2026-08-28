import { Prov } from "@/components/prov";

const APBS_STANDARD_OPERATING_PROCEDURE_URL =
  "https://dbtbharat.gov.in/data/dbt_payments/Standard-Operating-Procedure-of-Aadhaar-Payments-Bridge-(APB).pdf";
const NPCI_WEBSITE_URL = "https://www.npci.org.in";
const PFMS_REJECTION_REMEDIES_URL =
  "https://pfms.nic.in/sitePages/doc/PFMS_Validation_Payment_Rejection_Remedies.pdf";

/** Render the evidence ledger behind every provenance label in the prototype. */
export default function SourcesPage() {
  return (
    <article className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="max-w-3xl border-b-4 border-primary pb-10">
        <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-primary">
          Evidence and limits
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight tracking-[-0.035em] text-ink sm:text-6xl">
          Where our facts come from
        </h1>
        <p className="mt-6 text-lg leading-8 text-ink sm:text-xl sm:leading-9">
          This is a prototype. Some of what you see is real and sourced. Some is
          invented for the demo. This page says exactly which is which.
        </p>
      </header>

      <section aria-labelledby="cited-heading" className="mt-12">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Prov kind="cited" />
          <h2
            className="text-3xl font-black leading-tight tracking-[-0.02em] text-ink sm:text-4xl"
            id="cited-heading"
          >
            CITED: verified against primary sources
          </h2>
        </div>

        <ol className="mt-8 border-t-2 border-ink">
          <li className="grid gap-4 border-b border-line py-8 sm:grid-cols-[3rem_minmax(0,1fr)]">
            <span className="text-3xl font-black text-primary" aria-hidden="true">01</span>
            <div>
              <h3 className="text-2xl font-black leading-snug text-ink">
                The NPCI mapper holds ONE bank account per Aadhaar number.
                Seeding a new account overwrites the previous mapping.
              </h3>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-primary">
                Source: NPCI Aadhaar Payment Bridge (APB) System — Frequently
                Asked Questions for Banks
              </p>
              <p className="mt-2 text-lg leading-8 text-ink">
                <strong>What the source says:</strong> NPCI&apos;s Aadhaar Payment
                Bridge FAQ for banks states that when a customer seeds Aadhaar
                in multiple bank accounts, fresh seeding overwrites the previous
                NPCI mapper entry.
              </p>
              <a className="mt-4 inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4" href={APBS_STANDARD_OPERATING_PROCEDURE_URL}>
                Read the APBS Standard Operating Procedure (PDF)
              </a>
            </div>
          </li>

          <li className="grid gap-4 border-b border-line py-8 sm:grid-cols-[3rem_minmax(0,1fr)]">
            <span className="text-3xl font-black text-primary" aria-hidden="true">02</span>
            <div>
              <h3 className="text-2xl font-black leading-snug text-ink">
                Aadhaar-linked at a bank is not the same as Aadhaar-seeded for DBT.
              </h3>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-primary">
                Source: Aadhaar Payments Bridge System Standard Operating
                Procedure, NPCI
              </p>
              <p className="mt-2 text-lg leading-8 text-ink">
                <strong>What the source says:</strong> Seeding means updating the
                Aadhaar number in the NPCI mapper. A bank must upload the mandate
                to NPCI; updating only its own core banking system is not enough
                for DBT credits to arrive.
              </p>
              <a className="mt-4 inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4" href={APBS_STANDARD_OPERATING_PROCEDURE_URL}>
                Read the NPCI APBS procedure (PDF)
              </a>
            </div>
          </li>

          <li className="grid gap-4 border-b border-line py-8 sm:grid-cols-[3rem_minmax(0,1fr)]">
            <span className="text-3xl font-black text-primary" aria-hidden="true">03</span>
            <div>
              <h3 className="text-2xl font-black leading-snug text-ink">
                A bank-switch consent form should name the previous bank.
              </h3>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-primary">
                Source: Aadhaar Payments Bridge System Standard Operating
                Procedure, NPCI
              </p>
              <p className="mt-2 text-lg leading-8 text-ink">
                <strong>What the source says:</strong> The APBS Standard Operating
                Procedure says the customer&apos;s consent form should include the
                previous bank name when moving an Aadhaar mapping to another bank.
              </p>
              <a className="mt-4 inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4" href={APBS_STANDARD_OPERATING_PROCEDURE_URL}>
                Read the consent process (PDF)
              </a>
            </div>
          </li>

          <li className="grid gap-4 border-b border-line py-8 sm:grid-cols-[3rem_minmax(0,1fr)]">
            <span className="text-3xl font-black text-primary" aria-hidden="true">04</span>
            <div>
              <h3 className="text-2xl font-black leading-snug text-ink">
                Dial *99*99# to check which bank holds an Aadhaar mapping.
              </h3>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-primary">
                Source: NPCI product listing
              </p>
              <p className="mt-2 text-lg leading-8 text-ink">
                <strong>What the source says:</strong> NPCI lists its Query Service
                on Aadhaar Mapper as a phone-based check that works without an
                internet connection.
              </p>
              <a className="mt-4 inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4" href={NPCI_WEBSITE_URL}>
                Visit the NPCI product listing
              </a>
            </div>
          </li>

          <li className="grid gap-4 border-b-2 border-ink py-8 sm:grid-cols-[3rem_minmax(0,1fr)]">
            <span className="text-3xl font-black text-primary" aria-hidden="true">05</span>
            <div>
              <h3 className="text-2xl font-black leading-snug text-ink">
                PFMS publishes DBT rejection reasons and remedies.
              </h3>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-primary">
                Source: PFMS — DBT Validation / Payment Error / Rejection and
                action thereon
              </p>
              <p className="mt-2 text-lg leading-8 text-ink">
                <strong>What the source says:</strong> PFMS publishes an official
                list of DBT validation and payment rejection reasons, with an
                action or remedy for each.
              </p>
              <a className="mt-4 inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4" href={PFMS_REJECTION_REMEDIES_URL}>
                Read the PFMS rejection remedies (PDF)
              </a>
            </div>
          </li>
        </ol>
      </section>

      <section aria-labelledby="modelled-heading" className="mt-16">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Prov kind="modelled" />
          <h2 className="text-3xl font-black leading-tight tracking-[-0.02em] text-ink sm:text-4xl" id="modelled-heading">
            MODELLED: based on documented system behaviour, not quoted
          </h2>
        </div>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink">
          These details mirror how the real systems are documented to behave,
          but describe that behaviour rather than quote a primary source.
        </p>
        <ul className="mt-7 grid gap-x-10 border-y-2 border-ink py-5 sm:grid-cols-2">
          {[
            "The five-stage payment chain itself",
            "The APBS response codes B08 and 207",
            "Typical processing timelines",
            "The re-KYC, CIF correction and beneficiary verification form names",
            "The 48-hour mapper sync window",
          ].map((item) => (
            <li className="border-b border-line py-4 text-lg font-bold leading-7 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0" key={item}>
              {item}
            </li>
          ))}
        </ul>

        <aside aria-labelledby="unverified-heading" className="-mx-5 mt-10 border-y-4 border-modelled bg-modelled-soft px-5 py-8 sm:mx-0 sm:px-8">
          <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-modelled">
            Honest limit
          </p>
          <h3 className="mt-2 text-3xl font-black leading-tight text-ink sm:text-4xl" id="unverified-heading">
            What we could not verify
          </h3>
          <p className="mt-5 max-w-4xl text-lg font-semibold leading-8 text-ink">
            The codes B08 and 207 appear consistently in citizen-facing help
            material about failed DBT payments, but we could not locate them in
            primary NPCI or PFMS documentation. We have therefore labelled them
            MODELLED rather than CITED. Similarly, the Aadhaar seeding consent
            form is commonly called Annexure-I at bank counters, while NPCI&apos;s own
            Standard Operating Procedure uses a different annexure number in its
            internal numbering. Because of that ambiguity, this prototype tells
            citizens to ask for the form by name rather than by annexure number.
          </p>
          <p className="mt-5 max-w-4xl border-t border-modelled pt-5 text-lg font-semibold leading-8 text-ink">
            <strong>Correction:</strong> An earlier version shipped a BHIM/UPI
            helpline as an Aadhaar-mapper contact under a CITED label. We found
            that it belongs to a different NPCI service, removed it, and
            replaced it with NPCI&apos;s primary-sourced DigiSaathi numbers and its
            mapper-specific APBS escalation address.
          </p>
        </aside>
      </section>

      <section aria-labelledby="mock-heading" className="mt-16 border-t-4 border-accent pt-8">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Prov kind="mock" />
          <h2 className="text-3xl font-black leading-tight text-ink sm:text-4xl" id="mock-heading">
            MOCK: invented for this demo
          </h2>
        </div>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink">
          Every name, age, scheme, date, amount, payment ID and system response
          in this prototype is invented. No real person&apos;s data is used.
        </p>
        <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-ink">
          All demo IDs begin with 0 or 1. Real Aadhaar numbers never begin with 0
          or 1, so our synthetic identifiers cannot collide with a real identity.
        </p>
      </section>

      <section aria-labelledby="verified-heading" className="mt-16 border-t-4 border-primary pt-8">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Prov kind="verified" />
          <h2 className="text-3xl font-black leading-tight text-ink sm:text-4xl" id="verified-heading">
            VERIFIED
          </h2>
        </div>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink">
          The spoken Hindi counter scripts are the only content carrying this
          label. Both team members speak Hindi and read each script aloud to
          check it. They are written in Roman letters, not Devanagari, and use
          gender-neutral phrasing because the app cannot know who is speaking.
        </p>
      </section>
    </article>
  );
}
