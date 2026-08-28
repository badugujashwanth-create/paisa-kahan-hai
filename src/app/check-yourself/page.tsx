import type { ReactNode } from "react";

import { Prov } from "@/components/prov";

const NPCI_WEBSITE_URL = "https://www.npci.org.in";
const NPCI_BASE_PROCESS_FLOW_URL =
  "https://scholarships.gov.in/public/schemeGuidelines/npci_base.pdf";
const MYAADHAAR_URL = "https://myaadhaar.uidai.gov.in";
const PFMS_KNOW_YOUR_PAYMENT_URL =
  "https://pfms.nic.in/SitePages/KnowYourPayment_Dw_NewNew.aspx";
const PFMS_REJECTION_REMEDIES_URL =
  "https://pfms.nic.in/sitePages/doc/PFMS_Validation_Payment_Rejection_Remedies.pdf";
const UMANG_URL = "https://web.umang.gov.in";

type MethodSectionProps = Readonly<{
  number: number;
  title: string;
  children: ReactNode;
}>;

/** Render one numbered self-check method with a consistent heading and body layout. */
function MethodSection({ number, title, children }: MethodSectionProps) {
  return (
    <li className="border-b border-line py-9 last:border-b-0">
      <h2 className="flex items-start gap-4 text-2xl font-black leading-tight text-ink sm:text-3xl">
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-ink text-lg"
        >
          {number}
        </span>
        <span className="pt-1.5">{title}</span>
      </h2>
      <div className="mt-5 space-y-4 pl-14">{children}</div>
    </li>
  );
}

type TakeawayProps = Readonly<{ children: ReactNode }>;

/** Render the single sentence a citizen should carry away from one method's result. */
function Takeaway({ children }: TakeawayProps) {
  return (
    <p className="border-l-4 border-primary bg-primary/5 py-3 pl-4 text-lg font-bold leading-7 text-ink">
      Take away: {children}
    </p>
  );
}

/** Render the real, verifiable self-check tools a citizen can use today — no mock data. */
export default function CheckYourselfPage() {
  return (
    <article className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="max-w-3xl border-b-4 border-primary pb-10">
        <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-primary">
          Real tools, right now
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight tracking-[-0.035em] text-ink sm:text-6xl">
          Check your own Aadhaar mapping — right now, for free
        </h1>
        <p className="mt-6 text-lg leading-8 text-ink sm:text-xl sm:leading-9">
          This page lists the real tools that exist today. Nothing on this page
          is simulated. Every web address below is one you can use right now,
          outside this prototype, at no cost.
        </p>
        <p className="mt-5 max-w-3xl border-l-4 border-accent bg-accent/10 py-3 pl-4 text-lg font-bold leading-8 text-ink">
          Read this first: every online check below sends a one-time password to
          the mobile number registered with your Aadhaar. If you do not have that
          phone with you, skip to the assisted route at the end of this page.
        </p>
      </header>

      <ol className="m-0 mt-10 list-none border-t-2 border-ink p-0">
        <MethodSection number={1} title="NPCI's BASE portal — start here">
          <p className="text-lg leading-8 text-ink">
            BASE (Bharat Aadhaar Seeding Enabler) is NPCI&apos;s own self-service
            portal, and NPCI is the organisation that actually holds the mapping.
            This is the most direct answer you can get.
          </p>
          <ol className="m-0 list-none space-y-2 border-y-2 border-ink p-0 py-4">
            {[
              "Open npci.org.in",
              "Click the Consumer tab",
              "Click Bharat Aadhaar Seeding Enabler (BASE)",
              "Choose Get Aadhaar Mapped Status",
            ].map((step, index) => (
              <li className="flex gap-3 text-lg font-bold leading-7 text-ink" key={step}>
                <span aria-hidden="true" className="shrink-0 text-primary">
                  {index + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="text-lg leading-8 text-ink">
            You will need your Aadhaar number and the mobile number registered
            with your Aadhaar, because that is where the OTP goes.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              className="inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
              href={NPCI_WEBSITE_URL}
            >
              Open npci.org.in
            </a>
            <a
              className="inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
              href={NPCI_BASE_PROCESS_FLOW_URL}
            >
              See NPCI&apos;s own process flow (PDF)
            </a>
          </div>
          <div>
            <Prov kind="cited" source="NPCI — BASE process flow" />
          </div>
          <p className="text-lg leading-8 text-ink">
            <strong>What it tells you:</strong> which bank currently holds your
            Aadhaar mapping, whether it is active, and your mapping history. The
            same portal also lets you request a new seeding yourself.
          </p>
          <p className="text-lg leading-8 text-ink">
            <strong>What it does NOT tell you:</strong> why a particular payment
            failed, or whether the department ever released the money. A correct
            mapping does not guarantee a payment arrives.
          </p>
          <Takeaway>
            if this shows a bank you did not expect, that is where your
            government money is going — and this is the one place you can start
            fixing it yourself.
          </Takeaway>
        </MethodSection>

        <MethodSection number={2} title="UIDAI's myAadhaar portal">
          <p className="text-lg leading-8 text-ink">
            UIDAI&apos;s own portal offers a bank-seeding status check. You verify with
            an OTP and it shows the bank linked to your Aadhaar — reading the same
            NPCI mapper data as BASE, so it is a useful second opinion rather than
            a different answer.
          </p>
          <a
            className="inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
            href={MYAADHAAR_URL}
          >
            Open myaadhaar.uidai.gov.in
          </a>
          <div>
            <Prov kind="cited" source="UIDAI — myAadhaar portal" />
          </div>
          <p className="text-lg leading-8 text-ink">
            <strong>What it tells you:</strong> the same Aadhaar-to-bank mapping,
            from the identity authority rather than the payments body.
          </p>
          <p className="text-lg leading-8 text-ink">
            <strong>What it does NOT tell you:</strong> the same limits as BASE —
            nothing about why a payment failed. It also needs the same
            Aadhaar-registered phone.
          </p>
          <Takeaway>
            if this and BASE disagree, wait a day and check again before acting —
            mapper updates take time to appear.
          </Takeaway>
        </MethodSection>

        <MethodSection number={3} title="PFMS payment status lookup">
          <p className="text-lg leading-8 text-ink">
            PFMS&apos;s Know Your Payment tool looks up payments by bank account rather
            than by Aadhaar. Pick your bank, enter your account number twice, and
            complete the word verification.
          </p>
          <a
            className="inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
            href={PFMS_KNOW_YOUR_PAYMENT_URL}
          >
            Open PFMS Know Your Payment
          </a>
          <div>
            <Prov kind="cited" source="PFMS — Know Your Payment" />
          </div>
          <p className="text-lg leading-8 text-ink">
            <strong>What it tells you:</strong> government payments credited or
            attempted against that account. This is the only check here that
            confirms whether money actually moved, independent of your mapping.
          </p>
          <p className="text-lg leading-8 text-ink">
            <strong>What it does NOT tell you:</strong> the reason a payment was
            rejected. PFMS publishes those reasons{" "}
            <a
              className="font-bold text-primary underline decoration-2 underline-offset-4"
              href={PFMS_REJECTION_REMEDIES_URL}
            >
              in a separate document
            </a>{" "}
            that you have to match against your own result by hand. There is also
            a data window: if you changed your mobile number at the bank within
            the last 14 days, PFMS asks you to verify through the SANDES app
            instead of a text message.
          </p>
          <Takeaway>
            this answers &ldquo;did the money ever leave?&rdquo; — which is a different
            question from &ldquo;where is my mapping?&rdquo;, and you need both.
          </Takeaway>
        </MethodSection>

        <MethodSection number={4} title="UMANG, if you would rather use one app">
          <p className="text-lg leading-8 text-ink">
            UMANG is the government&apos;s single-window app for central and state
            services. It carries Aadhaar services, pension services and
            scholarship applications among more than 2,400 services, so for many
            schemes you can check your own status there without hunting for each
            department&apos;s separate website.
          </p>
          <a
            className="inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
            href={UMANG_URL}
          >
            Open web.umang.gov.in
          </a>
          <div>
            <Prov kind="modelled" source="Service list cited to PIB; per-scheme screens vary" />
          </div>
          <p className="text-lg leading-8 text-ink">
            <strong>What it tells you:</strong> depends entirely on your scheme.
            Search inside the app for your scheme by name.
          </p>
          <p className="text-lg leading-8 text-ink">
            <strong>What it does NOT tell you:</strong> we could not verify that
            UMANG exposes the NPCI mapper status itself, so do not treat it as a
            replacement for method 1. We list it because it is convenient, not
            because it answers the mapping question.
          </p>
          <Takeaway>
            good for your scheme&apos;s own status; not a substitute for checking the
            mapper directly.
          </Takeaway>
        </MethodSection>

        <MethodSection number={5} title="The old dialling code — we do not recommend it">
          <div className="border-y-4 border-accent bg-accent/10 px-4 py-5">
            <p className="text-lg font-bold leading-8 text-ink">
              You may have been told to dial a short code beginning *99 to check
              your Aadhaar mapping. We used to say that too. We took it down.
            </p>
          </div>
          <p className="text-lg leading-8 text-ink">
            The service authenticates against the mobile number registered with
            your Aadhaar, so it does <strong>not</strong> work from a borrowed
            phone — which is exactly when people reach for it. What you get
            instead is an error message that looks like your Aadhaar has been
            cancelled. It has not been. Sources also disagree about the exact
            digits, and it is widely reported to fail on modern networks.
          </p>
          <div>
            <Prov kind="modelled" source="Retracted — see Sources" />
          </div>
          <Takeaway>
            if someone tells you to dial a code, use method 1 instead — and if the
            code does fail, it says nothing at all about your Aadhaar.
          </Takeaway>
        </MethodSection>
      </ol>

      <aside
        aria-labelledby="assisted-heading"
        className="-mx-5 mt-12 border-y-4 border-primary bg-primary/5 px-5 py-8 sm:mx-0 sm:px-8"
      >
        <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-primary">
          If you do not have the Aadhaar-registered phone
        </p>
        <h2
          className="mt-2 text-3xl font-black leading-tight text-ink sm:text-4xl"
          id="assisted-heading"
        >
          Someone can check this for you
        </h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-ink">
          A Common Service Centre operator or any bank branch can look up your
          mapping. This is the route to use if you have no smartphone, no
          internet, or no longer hold the number your Aadhaar was registered
          with. Take your Aadhaar card and your passbook.
        </p>
        <div className="mt-4">
          <Prov kind="modelled" />
        </div>
      </aside>

      <aside
        aria-labelledby="honest-note-heading"
        className="-mx-5 mt-10 border-y-4 border-accent bg-accent/10 px-5 py-8 sm:mx-0 sm:px-8"
      >
        <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-ink">
          Honest limit
        </p>
        <h2 className="mt-2 text-3xl font-black leading-tight text-ink sm:text-4xl" id="honest-note-heading">
          What none of these tools do
        </h2>
        <p className="mt-5 max-w-4xl text-lg font-semibold leading-8 text-ink">
          Checking your mapping online is genuinely possible, and some banks will
          even let you move it online. But if the account is frozen or dormant,
          the online route stops working and a trip to the branch becomes
          unavoidable — so an online check is worth doing first precisely because
          it tells you whether you need to travel at all.
        </p>
        <p className="mt-5 max-w-4xl text-lg font-semibold leading-8 text-ink">
          And none of them explains WHY a payment failed, connects that failure to
          a stage of the payment chain, or tells you what to do about it. That gap
          is what this prototype demonstrates.
        </p>
      </aside>
    </article>
  );
}
