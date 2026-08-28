import type { ReactNode } from "react";

import { Prov } from "@/components/prov";

const APBS_STANDARD_OPERATING_PROCEDURE_URL =
  "https://dbtbharat.gov.in/data/dbt_payments/Standard-Operating-Procedure-of-Aadhaar-Payments-Bridge-(APB).pdf";
const PFMS_REJECTION_REMEDIES_URL =
  "https://pfms.nic.in/sitePages/doc/PFMS_Validation_Payment_Rejection_Remedies.pdf";
const AADHAAR_SEEDING_PROCESS_URL =
  "https://dbtbharat.gov.in/data/aadhaar-uidai/Aadhaar-seeding-process.pdf";
const NPCI_BASE_PROCESS_FLOW_URL =
  "https://scholarships.gov.in/public/schemeGuidelines/npci_base.pdf";
const DBT_CITIZEN_CORNER_URL =
  "https://dbtbharat.gov.in/static-page-content/spagecont?id=4";
const CAG_DBT_AUDIT_URL =
  "https://cag.gov.in/webroot/uploads/download_audit_report/2022/Performance%20Audit%20of%20Direct%20Benefit%20Transfer-0632329ede44685.62105221.pdf";
const PIB_PM_KISAN_URL = "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2152566";
const PIB_LPG_PAHAL_URL = "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2152413";
const PIB_ABPS_SUCCESS_URL =
  "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1929577";

type CitedSourceProps = Readonly<{
  index: string;
  claim: string;
  sourceName: string;
  children: ReactNode;
  href: string;
  linkLabel: string;
  isLast?: boolean;
}>;

/** Render one numbered entry in the cited-evidence ledger. */
function CitedSource({
  index,
  claim,
  sourceName,
  children,
  href,
  linkLabel,
  isLast = false,
}: CitedSourceProps) {
  return (
    <li
      className={`grid gap-4 py-8 sm:grid-cols-[3rem_minmax(0,1fr)] ${
        isLast ? "border-b-2 border-ink" : "border-b border-line"
      }`}
    >
      <span className="text-3xl font-black text-primary" aria-hidden="true">
        {index}
      </span>
      <div>
        <h3 className="text-2xl font-black leading-snug text-ink">{claim}</h3>
        <p className="mt-4 text-sm font-black uppercase tracking-[0.08em] text-primary">
          Source: {sourceName}
        </p>
        <p className="mt-2 text-lg leading-8 text-ink">
          <strong>What the source says:</strong> {children}
        </p>
        <a
          className="mt-4 inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
          href={href}
        >
          {linkLabel}
        </a>
      </div>
    </li>
  );
}

type RetractionProps = Readonly<{
  heading: string;
  children: ReactNode;
}>;

/** Render one item we published, then withdrew. */
function Retraction({ heading, children }: RetractionProps) {
  return (
    <li className="border-b border-ink/25 py-6 last:border-b-0">
      <h3 className="text-xl font-black leading-snug text-ink sm:text-2xl">{heading}</h3>
      <p className="mt-3 max-w-4xl text-lg font-semibold leading-8 text-ink">{children}</p>
    </li>
  );
}

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
          invented for the demo. This page says exactly which is which — including
          the things we got wrong and took back.
        </p>
      </header>

      <section
        aria-labelledby="removed-heading"
        className="-mx-5 mt-12 border-y-4 border-accent bg-accent/10 px-5 py-9 sm:mx-0 sm:px-8"
      >
        <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-ink">
          Retraction
        </p>
        <h2
          className="mt-2 text-3xl font-black leading-tight tracking-[-0.02em] text-ink sm:text-4xl"
          id="removed-heading"
        >
          What we removed, and why
        </h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-ink">
          Earlier versions of this prototype told citizens things we could not
          stand behind. Four independent research reviews went looking for the
          primary sources and did not find them. Here is what we withdrew.
        </p>

        <ul className="m-0 mt-7 list-none border-t-2 border-ink p-0">
          <Retraction heading="We shipped two APBS error codes, B08 and 207.">
            Neither appears in any primary NPCI, PFMS or UIDAI document we could
            locate. One review traced &ldquo;B08&rdquo; to an unrelated Staff Selection
            Commission recruitment post code, and &ldquo;207&rdquo; to a paragraph number in
            the 2018 Aadhaar Supreme Court judgment. They were internet folklore
            that we repeated. We removed them and did not substitute different
            numbers, because the real enumerations disagree with each other: the
            same failure is numbered 64 in one government list and E23 in another,
            in the same audit table. A citizen quoting a wrong code at a bank
            counter is worse off than one describing the problem plainly, so we
            now show the description alone.
          </Retraction>

          <Retraction heading="We told citizens to dial *99*99# from any phone.">
            That service authenticates against the mobile number registered with
            your Aadhaar. A citizen who borrows a neighbour&apos;s phone — exactly the
            person we built this for — gets an error and can reasonably conclude
            their Aadhaar has been cancelled. Sources also disagree on whether the
            code is *99*99# or *99*99*1#, and it is reported to fail on many modern
            networks. We removed it from the guidance and now lead with NPCI&apos;s BASE
            portal, while saying plainly that every online route still needs the
            Aadhaar-registered phone, and naming the assisted routes that do not.
          </Retraction>

          <Retraction heading="We named the consent form by its annexure number.">
            Our sources disagree. The DBT Mission&apos;s own Aadhaar seeding process
            document calls it Annexure I; NPCI&apos;s Standard Operating Procedure uses
            a different annexure number internally. Rather than pick one and send
            citizens to a counter with the wrong name, we name the form by what it
            does, and mention the annexure only as a hint.{" "}
            <a
              className="font-bold text-primary underline decoration-2 underline-offset-4"
              href={APBS_STANDARD_OPERATING_PROCEDURE_URL}
            >
              NPCI&apos;s Aadhaar Payments Bridge SOP (PDF)
            </a>
          </Retraction>

          <Retraction heading="We claimed a new mapping activates within 48 hours.">
            No source we found supports a fixed 48-hour figure. We now say a new
            mapping usually takes a few working days, and we label that as an
            estimate rather than a citation.
          </Retraction>

          <Retraction heading="We cited a BHIM/UPI helpline as an Aadhaar-mapper contact.">
            It belongs to a different NPCI service. We removed it and replaced it
            with NPCI&apos;s DigiSaathi numbers and its mapper-specific escalation
            address, both taken from NPCI&apos;s own material.
          </Retraction>
        </ul>
      </section>

      <section aria-labelledby="cited-heading" className="mt-16">
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
          <CitedSource
            index="01"
            claim="The NPCI mapper holds ONE bank account per Aadhaar number. Seeding a new account overwrites the previous mapping."
            sourceName="Aadhaar seeding process, DBT Mission / NPCI"
            href={AADHAAR_SEEDING_PROCESS_URL}
            linkLabel="Read the Aadhaar seeding process (PDF)"
          >
            &ldquo;Customer can link only one account with Aadhaar at any point of
            time. If customer gives consent to multiple banks then subsidy will be
            credited to the last seeded Bank with which the status is active in
            NPCI mapper.&rdquo;
          </CitedSource>

          <CitedSource
            index="02"
            claim="Linking Aadhaar to your account is NOT the same as updating the mapper — and your bank cannot prove seeding by showing you its own screen."
            sourceName="Aadhaar seeding process, DBT Mission / NPCI"
            href={AADHAAR_SEEDING_PROCESS_URL}
            linkLabel="Read the Aadhaar seeding process (PDF)"
          >
            &ldquo;By linking the Aadhaar number to the account the branch is not
            updating the mapper.&rdquo; The same document adds that &ldquo;Aadhaar number being
            active in bank&apos;s CBS does not mean that mapper file is updated, the
            branch should not show CBS screen or provide screen shot to the
            customer confirming seeding.&rdquo;
          </CitedSource>

          <CitedSource
            index="03"
            claim="If your Aadhaar is not in the NPCI mapper, that is the bank's job to fix — and the bank should not blame NPCI."
            sourceName="Aadhaar seeding process, DBT Mission / NPCI"
            href={AADHAAR_SEEDING_PROCESS_URL}
            linkLabel="Read the bank's stated responsibility (PDF)"
          >
            &ldquo;Branches should understand that if Aadhaar number is not updated in
            NPCI mapper the action is purely lies with the bank only. The customer
            should not be told that NPCI has not updated the Aadhaar number.&rdquo; This
            is the sentence behind every &ldquo;if they say no&rdquo; reply in this prototype.
          </CitedSource>

          <CitedSource
            index="04"
            claim="A bank-switch consent form should name the previous bank."
            sourceName="Aadhaar seeding process, DBT Mission / NPCI"
            href={AADHAAR_SEEDING_PROCESS_URL}
            linkLabel="Read the consent process (PDF)"
          >
            &ldquo;In case of moving Aadhaar number from one bank to another bank, the
            customer should provide the name of the bank from which the Aadhaar is
            being moved.&rdquo;
          </CitedSource>

          <CitedSource
            index="05"
            claim="The NPCI BASE portal click path we give you is NPCI's own."
            sourceName="Process flow for Bharat Aadhaar Seeding Enabler (BASE), NPCI"
            href={NPCI_BASE_PROCESS_FLOW_URL}
            linkLabel="Read the BASE process flow (PDF)"
          >
            NPCI&apos;s process flow gives the path as: open npci.org.in, click the
            Consumer tab, click Bharat Aadhaar Seeding Enabler (BASE), and then
            choose from four options, one of which is Get Aadhaar Mapped Status.
            That is exactly the path this prototype tells you to follow. The OTP
            requirement and the Common Service Centre fallback are ours, and are
            labelled MODELLED.
          </CitedSource>

          <CitedSource
            index="06"
            claim="The government's own list of why these payments fail matches our diagnoses."
            sourceName="Ministry of Agriculture and Farmers Welfare, Lok Sabha written reply, 5 August 2025"
            href={PIB_PM_KISAN_URL}
            linkLabel="Read the PM-KISAN reply (PIB)"
          >
            &ldquo;The major reasons for transaction failure are de-seeding of Aadhaar
            number from NPCI mapper by the bank, non-mapping of Aadhaar to account
            number, and account closure.&rdquo; Those are the failures this prototype
            calls F3, F1 and F5, in the government&apos;s own words. It is also why we
            describe failures in words rather than code numbers.
          </CitedSource>

          <CitedSource
            index="07"
            claim="PFMS publishes DBT rejection reasons and remedies."
            sourceName="PFMS — DBT Validation / Payment Error / Rejection and action thereon"
            href={PFMS_REJECTION_REMEDIES_URL}
            linkLabel="Read the PFMS rejection remedies (PDF)"
          >
            PFMS lists each return reason in words with an action for each. For a
            failed Aadhaar-based payment it lists &ldquo;Aadhaar de-seeded&rdquo; and directs
            the beneficiary to &ldquo;contact their bank branch for Aadhaar seeding with
            their bank account and ask the bank to update the same on NPCI mapper.&rdquo;
            Note that it too uses no numeric code.
          </CitedSource>

          <CitedSource
            index="08"
            claim="India's official DBT portal has a page for failure codes. It has said 'Coming soon' for years."
            sourceName="DBT Bharat — Citizen Corner, DBT Payments"
            href={DBT_CITIZEN_CORNER_URL}
            linkLabel="See the Citizen Corner page"
          >
            Under the heading &ldquo;DBT Returns / Failures&rdquo;, the entry &ldquo;List of Return
            Codes&rdquo; is marked &ldquo;Coming soon&rdquo;. We checked this page again on the day we
            published this prototype and it still said so. This is the clearest
            evidence we have that the explanation layer is simply missing: the
            government publishes the rails, the procedures and the audits, but not
            the one list that would let a citizen find out what happened to them.
          </CitedSource>

          <CitedSource
            index="09"
            claim="A state audit found these failures at scale — and found that citizens only discover them by not being paid."
            sourceName="Comptroller and Auditor General of India, Performance Audit of Direct Benefit Transfer, Government of Karnataka, Report No. 2 of 2022"
            href={CAG_DBT_AUDIT_URL}
            linkLabel="Read the CAG performance audit (PDF)"
            isLast
          >
            Covering 2018-19 and 2019-20, the audit recorded 1,28,705 failed
            transactions worth ₹235.94 crore, and found that 6.67 lakh
            beneficiaries were &ldquo;deprived of the financial benefit of ₹153.30 crore&rdquo;,
            with pendency ranging &ldquo;from three days to 673 days&rdquo;. Among the major
            recorded causes were &ldquo;Inactive Aadhaar seeding&rdquo; and &ldquo;Aadhaar number not
            mapped to account number&rdquo;. It also found money credited to the wrong
            person while the transaction still counted as successful, and stated
            the problem this prototype exists for: &ldquo;The seeding error would be known
            only when beneficiaries complain of not having received the benefits.&rdquo;
            <strong className="mt-3 block">
              Caution: these are Karnataka state figures for two financial years,
              not national totals. We are not presenting them as an all-India
              picture.
            </strong>
          </CitedSource>
        </ol>
      </section>

      <section aria-labelledby="against-heading" className="mt-16 border-t-4 border-primary pt-9">
        <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-primary">
          The other side
        </p>
        <h2
          className="mt-2 text-3xl font-black leading-tight tracking-[-0.02em] text-ink sm:text-4xl"
          id="against-heading"
        >
          Numbers that argue against us
        </h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-ink">
          Any honest reading of the official data says this system works well
          almost every time. We think you should see those numbers from us, in
          full, rather than find them later and wonder what else we left out.
        </p>

        <ul className="m-0 mt-8 list-none border-t-2 border-ink p-0">
          <li className="border-b border-line py-7">
            <p className="text-3xl font-black leading-none text-primary sm:text-4xl">99.92%</p>
            <p className="mt-3 text-lg leading-8 text-ink">
              PM-KISAN&apos;s 19th instalment &ldquo;witnessed a transaction success rate of
              99.92%&rdquo;, the Ministry of Agriculture and Farmers Welfare told the Lok
              Sabha in a written reply on 5 August 2025.
            </p>
            <a
              className="mt-3 inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
              href={PIB_PM_KISAN_URL}
            >
              Read the reply (PIB)
            </a>
          </li>

          <li className="border-b border-line py-7">
            <p className="text-3xl font-black leading-none text-primary sm:text-4xl">0.08%</p>
            <p className="mt-3 text-lg leading-8 text-ink">
              For LPG, the Ministry of Petroleum and Natural Gas told the Rajya
              Sabha that of about 194 crore refills delivered in 2024-25,
              &ldquo;complaints were received for only around 0.08% of these — mostly
              related to subsidy transfer or delivery delays&rdquo;.{" "}
              <strong>
                Read that precisely: it is a complaint rate on refills delivered,
                not a DBT failure rate, and it mixes subsidy problems with delivery
                delays. We are not going to round it into something it is not.
              </strong>
            </p>
            <a
              className="mt-3 inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
              href={PIB_LPG_PAHAL_URL}
            >
              Read the reply (PIB)
            </a>
          </li>

          <li className="border-b-2 border-ink py-7">
            <p className="text-3xl font-black leading-none text-primary sm:text-4xl">
              99.55% vs 98%
            </p>
            <p className="mt-3 text-lg leading-8 text-ink">
              Aadhaar routing is <em>more</em> reliable than account-number routing,
              not less. The Ministry of Rural Development, citing NPCI data, said
              &ldquo;there is higher success percentage to the extent of 99.55% or above
              where the Aadhaar is enabled for DBT. In case of Account based payment
              such success is about 98%.&rdquo; The Aadhaar bridge is the better rail.
            </p>
            <a
              className="mt-3 inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
              href={PIB_ABPS_SUCCESS_URL}
            >
              Read the statement (PIB)
            </a>
          </li>
        </ul>

        <div className="-mx-5 mt-9 border-y-4 border-primary bg-primary px-5 py-8 text-paper sm:mx-0 sm:px-8">
          <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-paper">
            Our answer
          </p>
          <p className="mt-4 max-w-4xl text-xl font-black leading-9 sm:text-2xl sm:leading-10">
            The failure is rare per transaction and permanent per person.
          </p>
          <p className="mt-5 max-w-4xl text-lg font-semibold leading-8">
            We are not claiming the rail is bad. On the government&apos;s own numbers it
            is very good, and getting better. But 0.08% of 194 crore refills is
            still roughly 15 lakh complaints in a single year, in a single scheme.
            And the people behind that fraction are not a fresh random draw each
            cycle — they are the same people, every cycle, because the thing that
            broke for them stays broken until somebody explains it to them.
          </p>
          <p className="mt-5 max-w-4xl text-lg font-semibold leading-8">
            The Ministry of Petroleum told the same Rajya Sabha reply that around
            86.78% of 30.63 crore LPG DBT consumers are Aadhaar Transfer Compliant.
            The remaining share is millions of households. A success rate measures
            transactions. It does not measure whether the person who did not get
            paid was ever told why — and on the government&apos;s own Citizen Corner, the
            list that would tell them is still marked &ldquo;Coming soon&rdquo;.
          </p>
        </div>
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
            "Typical processing timelines",
            "The re-KYC, CIF correction and beneficiary verification form names",
            "That the BASE portal sends an OTP to your Aadhaar-registered mobile",
            "That a Common Service Centre or bank can check your mapping for you",
            "That a demographic mismatch is a distinct payment failure",
            "How often seeding consent is buried inside app onboarding",
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
            What we still cannot verify
          </h3>
          <p className="mt-5 max-w-4xl text-lg font-semibold leading-8 text-ink">
            Two items in the list above deserve naming. We describe a demographic
            mismatch between your bank record and Aadhaar as a distinct reason a
            payment stops, but neither PFMS&apos;s published rejection list nor the CAG
            audit&apos;s recorded failure reasons contains such a return, so we label it
            MODELLED. And while NPCI&apos;s BASE process flow verifies the click path
            exactly, it does not state the OTP requirement, so the whole
            before-you-travel paragraph carries the weaker label rather than the
            stronger one.
          </p>
          <p className="mt-5 max-w-4xl border-t border-modelled pt-5 text-lg font-semibold leading-8 text-ink">
            We also went looking for two widely repeated statistics and could not
            source either: a &ldquo;under 1%&rdquo; DBT failure rate for SC post-matric
            scholarships, and a 0.32%-versus-2.56% comparison between Aadhaar and
            account-based routing. Both circulate. Neither traces to a primary
            government source we could reach, so neither appears on this page.
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
        <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-ink">
          One exception, stated plainly: when we removed the false error code from
          the F3 script, the replacement Hindi sentence was rewritten and has not
          yet been read aloud by a Hindi speaker on the team. It is the one line
          on this site carrying a VERIFIED label that has not been through that
          check.
        </p>
      </section>

      <p className="mt-14 border-t-2 border-ink pt-6 text-base leading-7 text-muted">
        Government pages change. Every link above was fetched and read in full
        while writing this page; the quotations are copied from those documents
        rather than summarised from memory. Where a document is a PDF, we quote it
        directly so you can search for the sentence yourself.
      </p>

    </article>
  );
}
