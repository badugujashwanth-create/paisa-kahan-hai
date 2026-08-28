import type { ReactNode } from "react";

import { Prov } from "@/components/prov";

const NPCI_WEBSITE_URL = "https://www.npci.org.in";
const MYAADHAAR_URL = "https://myaadhaar.uidai.gov.in";
const PFMS_KNOW_YOUR_PAYMENT_URL =
  "https://pfms.nic.in/SitePages/KnowYourPayment_Dw_NewNew.aspx";
const PFMS_REJECTION_REMEDIES_URL =
  "https://pfms.nic.in/sitePages/doc/PFMS_Validation_Payment_Rejection_Remedies.pdf";
const QSAM_USSD_CODE = "*99*99#";
const QSAM_TEL_HREF = "tel:*99*99%23";

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
          is simulated. Every phone number and web address below is one you can
          use right now, outside this prototype, at no cost.
        </p>
      </header>

      <ol className="m-0 mt-10 list-none border-t-2 border-ink p-0">
        <MethodSection number={1} title="Dial *99*99# — no internet needed">
          <p className="text-lg leading-8 text-ink">
            This is NPCI&apos;s Query Service on Aadhaar Mapper (QSAM). Dial{" "}
            <strong>{QSAM_USSD_CODE}</strong> from any phone — including a basic
            keypad phone, with no internet connection or smartphone required.
            Enter your 12-digit Aadhaar number when prompted.
          </p>
          <a
            className="inline-flex min-h-tap items-center font-bold text-primary underline decoration-2 underline-offset-4"
            href={QSAM_TEL_HREF}
          >
            Dial {QSAM_USSD_CODE} now
          </a>
          <div>
            <Prov kind="cited" source="NPCI product listing" />
          </div>
          <p className="text-lg leading-8 text-ink">
            <strong>What it tells you:</strong> which bank account, if any, is
            currently mapped to your Aadhaar number in NPCI&apos;s central mapper —
            the same mapper the Aadhaar Payment Bridge System uses to route DBT
            payments.
          </p>
          <p className="text-lg leading-8 text-ink">
            <strong>What it does NOT tell you:</strong> being mapped to a bank is
            not the same as being seeded for DBT at that bank, and this check
            cannot tell you why a specific payment failed or whether that
            account is currently active.
          </p>
          <p className="border-l-4 border-primary bg-primary/5 py-3 pl-4 text-lg font-bold leading-7 text-ink">
            Take away: if this shows a bank you did not expect, that old
            mapping — not the bank you actually use — is where your government
            payments are being sent.
          </p>
        </MethodSection>

        <MethodSection number={2} title="The NPCI BASE portal">
          <p className="text-lg leading-8 text-ink">
            BASE (Bharat Aadhaar Seeding Enabler) is NPCI&apos;s self-service portal
            for Aadhaar seeding. On{" "}
            <a
              className="font-bold text-primary underline decoration-2 underline-offset-4"
              href={NPCI_WEBSITE_URL}
            >
              npci.org.in
            </a>
            , open the Customer menu and choose Bharat Aadhaar Seeding Enabler
            (BASE), then Aadhaar Mapped Status. You will need your Aadhaar
            number and an OTP sent to your Aadhaar-registered mobile.
          </p>
          <div>
            <Prov kind="cited" source="NPCI product listing" />
          </div>
          <p className="text-lg leading-8 text-ink">
            <strong>What it tells you:</strong> the bank currently mapped to your
            Aadhaar, whether that mapping is active, when it was last updated,
            and your full history of seeding requests — and it lets you submit a
            new seeding or de-seeding request yourself, online.
          </p>
          <p className="text-lg leading-8 text-ink">
            <strong>What it does NOT tell you:</strong> why a specific PFMS
            payment failed, or whether the scheme department has released the
            money at all — a correct mapping does not guarantee a payment
            arrives.
          </p>
          <p className="border-l-4 border-primary bg-primary/5 py-3 pl-4 text-lg font-bold leading-7 text-ink">
            Take away: this is the one place you can fix a wrong mapping
            yourself, without visiting a branch.
          </p>
        </MethodSection>

        <MethodSection number={3} title="UIDAI's Aadhaar–bank linking check">
          <p className="text-lg leading-8 text-ink">
            UIDAI&apos;s own portal,{" "}
            <a
              className="font-bold text-primary underline decoration-2 underline-offset-4"
              href={MYAADHAAR_URL}
            >
              myaadhaar.uidai.gov.in
            </a>
            , offers a bank-seeding status check. You verify your Aadhaar number
            with an OTP, and it displays the bank(s) linked to your Aadhaar —
            using the same NPCI mapper data as the two tools above, fetched
            live rather than stored by UIDAI.
          </p>
          <div>
            <Prov kind="cited" source="UIDAI — myAadhaar portal (live at myaadhaar.uidai.gov.in)" />
          </div>
          <p className="text-lg leading-8 text-ink">
            <strong>What it tells you:</strong> a second, independent way to see
            the same Aadhaar–bank mapping as *99*99# and BASE — useful if you
            would rather use a website than a phone call, or want to
            double-check one tool against another.
          </p>
          <p className="text-lg leading-8 text-ink">
            <strong>What it does NOT tell you:</strong> DBT-enablement status or
            payment failure reasons — same limits as the two tools above.
          </p>
          <p className="border-l-4 border-primary bg-primary/5 py-3 pl-4 text-lg font-bold leading-7 text-ink">
            Take away: if this and *99*99# ever disagree, trust neither until
            you check again tomorrow — mapper updates can take time to
            propagate.
          </p>
        </MethodSection>

        <MethodSection number={4} title="PFMS payment status lookup">
          <p className="text-lg leading-8 text-ink">
            PFMS&apos;s{" "}
            <a
              className="font-bold text-primary underline decoration-2 underline-offset-4"
              href={PFMS_KNOW_YOUR_PAYMENT_URL}
            >
              Know Your Payment
            </a>{" "}
            tool looks up payments by bank account rather than by Aadhaar. Pick
            your bank, enter your account number twice, and complete the
            captcha. If you have updated your mobile number with your bank in
            the last 14 days, PFMS asks you to verify with a QR code scanned in
            the SANDES app instead of a text-message OTP.
          </p>
          <div>
            <Prov kind="cited" source="PFMS — Know Your Payment (Payment by Account Number)" />
          </div>
          <p className="text-lg leading-8 text-ink">
            <strong>What it tells you:</strong> the government payments credited
            or attempted against your account — this confirms whether a
            payment was sent at all, independent of Aadhaar mapping.
          </p>
          <p className="text-lg leading-8 text-ink">
            <strong>What it does NOT tell you:</strong> the reason a payment was
            rejected. For that, PFMS separately publishes a{" "}
            <a
              className="font-bold text-primary underline decoration-2 underline-offset-4"
              href={PFMS_REJECTION_REMEDIES_URL}
            >
              list of rejection reasons and remedies
            </a>{" "}
            — you have to match your result against that list yourself.
          </p>
          <p className="border-l-4 border-primary bg-primary/5 py-3 pl-4 text-lg font-bold leading-7 text-ink">
            Take away: this is the only tool here that confirms money actually
            moved — or didn&apos;t — rather than just checking your mapping.
          </p>
        </MethodSection>
      </ol>

      <aside
        aria-labelledby="honest-note-heading"
        className="-mx-5 mt-14 border-y-4 border-accent bg-accent/10 px-5 py-8 sm:mx-0 sm:px-8"
      >
        <p className="m-0 text-sm font-black uppercase tracking-[0.12em] text-ink">
          Honest limit
        </p>
        <h2 className="mt-2 text-3xl font-black leading-tight text-ink sm:text-4xl" id="honest-note-heading">
          What none of these tools do
        </h2>
        <p className="mt-5 max-w-4xl text-lg font-semibold leading-8 text-ink">
          These four are the real tools that exist today, and every one of them
          works right now. None of them explains WHY a payment failed, connects
          the failure to a specific stage of the payment chain, or tells you
          exactly what to do about it — which is the gap this prototype
          demonstrates.
        </p>
      </aside>
    </article>
  );
}
