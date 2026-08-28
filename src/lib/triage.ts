import type { FailureCode } from "./types";

// Most citizens who land here do not have the payment ID this app otherwise
// demands. This maps a short series of plain questions onto the most likely
// failure code so nobody is turned away just for not having an ID handy.

export type ConfidenceLevel = "HIGH" | "MEDIUM" | "LOW";

export type BenefitTypeAnswer = "PENSION" | "SCHOLARSHIP" | "FARMER_PAYMENT" | "OTHER";
export type MissingDurationAnswer = "UNDER_2_WEEKS" | "2_TO_6_WEEKS" | "OVER_6_WEEKS";
export type EverReceivedBeforeAnswer = "NEVER" | "USED_TO_BUT_STOPPED" | "FIRST_TIME_MISSING";
export type RecentBankOrAadhaarChangeAnswer = "YES" | "NO" | "NOT_SURE";
export type PortalOrSmsMessageAnswer =
  | "SAYS_SUCCESSFUL"
  | "SAYS_PENDING"
  | "SAYS_REJECTED_FAILED"
  | "DONT_KNOW";

export type TriageAnswers = Readonly<{
  benefitType?: BenefitTypeAnswer;
  missingDuration?: MissingDurationAnswer;
  everReceivedBefore?: EverReceivedBeforeAnswer;
  recentBankOrAadhaarChange?: RecentBankOrAadhaarChangeAnswer;
  portalOrSmsMessage?: PortalOrSmsMessageAnswer;
}>;

export type TriageOption<Answer extends string> = Readonly<{ id: Answer; label: string }>;

export type TriageQuestion<Answer extends string = string> = Readonly<{
  id: keyof TriageAnswers;
  prompt: string;
  options: readonly TriageOption<Answer>[];
}>;

export type TriageResult = Readonly<{
  failureCode: FailureCode;
  confidence: ConfidenceLevel;
  reasoning: string;
}>;

// Asked first so later answers can be phrased in the citizen's own words
// ("your pension", not "your benefit"). It does not change which failure
// code comes out — every scheme runs through the same five payment stages.
const BENEFIT_TYPE_QUESTION: TriageQuestion<BenefitTypeAnswer> = {
  id: "benefitType",
  prompt: "Which payment are you expecting?",
  options: [
    { id: "PENSION", label: "A pension" },
    { id: "SCHOLARSHIP", label: "A scholarship" },
    { id: "FARMER_PAYMENT", label: "A farmer payment (like PM-Kisan)" },
    { id: "OTHER", label: "Another government payment" },
  ],
};

// A short delay is normal — treasury and mapper processing both take a few
// days. Asked second so an early answer of "under 2 weeks" can end the
// conversation quickly with "this is probably still normal" instead of
// marching a worried citizen through every remaining question.
const MISSING_DURATION_QUESTION: TriageQuestion<MissingDurationAnswer> = {
  id: "missingDuration",
  prompt: "How long has it been since you expected this payment?",
  options: [
    { id: "UNDER_2_WEEKS", label: "Less than 2 weeks" },
    { id: "2_TO_6_WEEKS", label: "Between 2 and 6 weeks" },
    { id: "OVER_6_WEEKS", label: "More than 6 weeks" },
  ],
};

// This is the single most powerful signal in the whole tree: a payment that
// has NEVER arrived means Aadhaar seeding or scheme approval never
// succeeded in the first place (F1 or F6). A payment that USED to arrive
// and then stopped means something that was working got disturbed — most
// often a bank-side change (F2, F3, F5) — and can never be F1 or F6, since
// those describe a mapping or approval that was never there to begin with.
const EVER_RECEIVED_BEFORE_QUESTION: TriageQuestion<EverReceivedBeforeAnswer> = {
  id: "everReceivedBefore",
  prompt: "Have you ever received this payment before?",
  options: [
    { id: "NEVER", label: "No, I have never received it" },
    { id: "USED_TO_BUT_STOPPED", label: "Yes, it used to come regularly, but has now stopped" },
    { id: "FIRST_TIME_MISSING", label: "Yes, it always comes — this is just the first time it's late" },
  ],
};

// The flagship failure this whole app was built to explain: NPCI's mapper
// keeps only the single most-recently-seeded bank account per Aadhaar
// number, so any new account opening or re-seeding silently redirects every
// future payment. Citizens rarely connect an unrelated bank visit to a
// missing pension months later, so this has to be asked directly.
const RECENT_BANK_OR_AADHAAR_CHANGE_QUESTION: TriageQuestion<RecentBankOrAadhaarChangeAnswer> = {
  id: "recentBankOrAadhaarChange",
  prompt:
    "In the last few months, did you open a new bank account, or visit a bank or Aadhaar centre to link or update your Aadhaar?",
  options: [
    { id: "YES", label: "Yes" },
    { id: "NO", label: "No" },
    { id: "NOT_SURE", label: "Not sure" },
  ],
};

// A stated rejection points at the payment rail itself; "pending" points
// upstream at the treasury or department; "successful" despite no money
// received points at the receiving bank account. We ask what the message
// SAYS rather than for a code number, because the published enumerations
// disagree with each other — see the note at the top of scenarios.ts.
// Asked last because most citizens have to go and check before answering.
const PORTAL_OR_SMS_MESSAGE_QUESTION: TriageQuestion<PortalOrSmsMessageAnswer> = {
  id: "portalOrSmsMessage",
  prompt: "If you have checked a portal, app or SMS, what does it say?",
  options: [
    { id: "SAYS_SUCCESSFUL", label: "It says the payment was successful" },
    { id: "SAYS_PENDING", label: "It says pending or under process" },
    { id: "SAYS_REJECTED_FAILED", label: "It says rejected or failed, with a code" },
    { id: "DONT_KNOW", label: "I haven't checked, or I don't understand what it says" },
  ],
};

export const TRIAGE_QUESTIONS: readonly TriageQuestion[] = [
  BENEFIT_TYPE_QUESTION,
  MISSING_DURATION_QUESTION,
  EVER_RECEIVED_BEFORE_QUESTION,
  RECENT_BANK_OR_AADHAAR_CHANGE_QUESTION,
  PORTAL_OR_SMS_MESSAGE_QUESTION,
];

const GUESS_DISCLAIMER =
  "This is a guess based on your answers, not a certainty — a payment ID would give a definite answer.";

/** Decide between F1 (never seeded) and F6 (scheme approval still pending) when the payment has never once arrived. */
function triageNeverReceived(portal: PortalOrSmsMessageAnswer | undefined): TriageResult {
  // A department/scheme portal showing "pending" describes approval still
  // in progress — that is F6 by definition, regardless of Aadhaar mapping.
  if (portal === "SAYS_PENDING") {
    return {
      failureCode: "F6",
      confidence: "HIGH",
      reasoning:
        "You have never received this payment, and the portal shows it as still pending — your scheme application is most likely still being verified, and no bank action can speed this up.",
    };
  }

  if (portal === "DONT_KNOW" || portal === undefined) {
    return {
      failureCode: "F1",
      confidence: "MEDIUM",
      reasoning: `You have never received this payment. Without a clearer portal status, the most common cause is that your Aadhaar was never seeded with any bank for this scheme. ${GUESS_DISCLAIMER}`,
    };
  }

  // A rejection/failure code or a false "successful" message still means no
  // money ever arrived, which is inconsistent with F6 (a pending
  // application produces no payment file at all, not a rejected one) — so
  // this narrows back to the mapper never being set up.
  return {
    failureCode: "F1",
    confidence: "MEDIUM",
    reasoning:
      "You have never received this payment, and a payment attempt was made and rejected rather than staying pending — this points at your Aadhaar never having been seeded with a bank for DBT.",
  };
}

/** Decide among F2, F3, F4, F5, F7 and F8 when the payment has arrived before (or usually does). */
function triageHasReceivedBefore(
  everReceived: EverReceivedBeforeAnswer,
  recentChange: RecentBankOrAadhaarChangeAnswer | undefined,
  portal: PortalOrSmsMessageAnswer | undefined,
  missingDuration: MissingDurationAnswer | undefined,
): TriageResult {
  // An explicit rejection code is stronger evidence than an inferred one —
  // it is the one signal a citizen can produce that a specific APBS check
  // actually failed, so it outranks the recent-bank-change heuristic below.
  if (portal === "SAYS_REJECTED_FAILED") {
    if (recentChange === "YES") {
      return {
        failureCode: "F3",
        confidence: "HIGH",
        reasoning:
          "Your payment was rejected, and you recently made a bank or Aadhaar change — the bank most likely accepted your seeding request but never uploaded it to NPCI's mapper.",
      };
    }

    return {
      failureCode: "F4",
      confidence: "MEDIUM",
      reasoning: `Your payment was rejected with no recent bank change to explain it — a mismatch between your name, date of birth or gender in the bank and Aadhaar records is a common cause. ${GUESS_DISCLAIMER}`,
    };
  }

  // The flagship case: NPCI keeps only the most recent Aadhaar-to-bank
  // mapping, so any new account or re-seeding silently overwrites where a
  // previously-working payment gets sent.
  if (recentChange === "YES") {
    return {
      failureCode: "F2",
      confidence: "HIGH",
      reasoning:
        "This payment used to arrive, and you recently opened a new bank account or re-linked your Aadhaar — NPCI's mapper keeps only your most recent bank, so your payment is very likely going there instead.",
    };
  }

  if (portal === "SAYS_SUCCESSFUL") {
    return {
      failureCode: "F5",
      confidence: "MEDIUM",
      reasoning:
        "The portal shows this payment as successful, but you never received it — with no recent bank change, this usually means the receiving account itself needs attention, such as a dormant status or expired KYC.",
    };
  }

  if (portal === "SAYS_PENDING") {
    return {
      failureCode: "F7",
      confidence: "MEDIUM",
      reasoning:
        "The portal shows this payment as pending — the department most likely has not yet released the funds to the treasury, which no bank visit can change.",
    };
  }

  // No clear portal signal either way. A short delay for a payment that
  // usually arrives on time is still most likely just running late; a long
  // one for the same payment is treated as the bank-side default because
  // that is this app's most common real-world cause, but we say plainly
  // this is a guess.
  if (missingDuration === "UNDER_2_WEEKS" && everReceived === "FIRST_TIME_MISSING") {
    return {
      failureCode: "F8",
      confidence: "LOW",
      reasoning: `This payment usually arrives on time and it has only been a short delay, with no other warning sign — it is most likely still processing normally. ${GUESS_DISCLAIMER}`,
    };
  }

  return {
    failureCode: "F5",
    confidence: "LOW",
    reasoning: `This payment has arrived before but not this time, with no rejection code and no recent bank change reported — a bank-side account problem is the most common explanation, but this is not certain. ${GUESS_DISCLAIMER}`,
  };
}

/** Map a citizen's plain-English answers onto the most likely failure code. Always returns a result — never throws, never leaves a dead end. */
export function triage(answers: TriageAnswers): TriageResult {
  if (answers.everReceivedBefore === "NEVER") {
    return triageNeverReceived(answers.portalOrSmsMessage);
  }

  if (
    answers.everReceivedBefore === "USED_TO_BUT_STOPPED" ||
    answers.everReceivedBefore === "FIRST_TIME_MISSING"
  ) {
    return triageHasReceivedBefore(
      answers.everReceivedBefore,
      answers.recentBankOrAadhaarChange,
      answers.portalOrSmsMessage,
      answers.missingDuration,
    );
  }

  // Nothing answered yet about payment history at all — the weakest
  // starting point, so this returns the lowest-confidence guess in the
  // whole tree rather than refusing to answer.
  return {
    failureCode: "F8",
    confidence: "LOW",
    reasoning: `Not enough was answered to narrow this down. ${GUESS_DISCLAIMER}`,
  };
}
