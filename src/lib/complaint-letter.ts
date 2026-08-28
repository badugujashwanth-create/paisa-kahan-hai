import { ESCALATION_LADDER } from "./escalation";
import type { Diagnosis, FailureCode } from "./types";

// A citizen who gets turned away at a counter usually leaves with nothing in
// writing and therefore nothing to escalate with. Every fact this letter
// states about timelines or next steps is pulled from escalation.ts, which
// carries its own sourcing — this file adds no new facts of its own.

const BLANK = "_".repeat(24);
const SHORT_BLANK = "_".repeat(10);

const BANK_GRIEVANCE_RUNG_ORDER = 1;
const RBI_OMBUDSMAN_RUNG_ORDER = 3;
const CPGRAMS_RUNG_ORDER = 4;

export type ComplaintLetterInput = Readonly<{
  citizenName?: string;
  accountNumber?: string;
  branchOrOfficeName?: string;
  firstVisitDate?: string;
}>;

export type ComplaintLetter = Readonly<{
  recipientLine: string;
  dateLine: string;
  subjectLine: string;
  bodyParagraphs: readonly string[];
  specificRequest: string;
  acknowledgementRequest: string;
  timelineStatement: string;
  escalationNotice: string;
  signatureBlock: readonly string[];
}>;

/** Look up a rung by its position in the ladder, failing loudly if escalation.ts ever reorders. */
function findRung(order: number) {
  const rung = ESCALATION_LADDER.find((candidate) => candidate.order === order);

  if (!rung) {
    throw new RangeError(`escalation.ts has no rung at order ${order}`);
  }

  return rung;
}

function fallback(value: string | undefined, placeholder: string): string {
  const trimmed = value?.trim();

  return trimmed && trimmed.length > 0 ? trimmed : placeholder;
}

// F7 and F8 are the app's own "wait only" outcomes (see isWaitOnly in
// action-instructions.tsx) — nothing has actually failed yet, so this is a
// request for a written status note, not a complaint.
const WAIT_ONLY_CODES: ReadonlySet<FailureCode> = new Set(["F7", "F8"]);

/** Build the printable written complaint (or status-request letter, for the two wait-only codes) for a diagnosis. */
export function generateComplaintLetter(
  diagnosis: Diagnosis,
  details?: ComplaintLetterInput,
): ComplaintLetter {
  const citizenName = fallback(details?.citizenName, BLANK);
  const accountNumber = fallback(details?.accountNumber, SHORT_BLANK);
  const branchOrOfficeName = fallback(
    details?.branchOrOfficeName,
    diagnosis.citizenAction.whereToGo,
  );
  const firstVisitDate = fallback(details?.firstVisitDate, SHORT_BLANK);

  if (WAIT_ONLY_CODES.has(diagnosis.failureCode)) {
    return buildWaitOnlyLetter(diagnosis, {
      citizenName,
      accountNumber,
      branchOrOfficeName,
      firstVisitDate,
    });
  }

  if (diagnosis.failedStage === "SCHEME") {
    return buildGovernmentOfficeLetter(diagnosis, {
      citizenName,
      accountNumber,
      branchOrOfficeName,
      firstVisitDate,
    });
  }

  return buildBankLetter(diagnosis, {
    citizenName,
    accountNumber,
    branchOrOfficeName,
    firstVisitDate,
  });
}

type ResolvedDetails = Readonly<{
  citizenName: string;
  accountNumber: string;
  branchOrOfficeName: string;
  firstVisitDate: string;
}>;

/** Build the letter for F1–F5: the mapper, APBS-mismatch and dormant-account failures a bank must fix. */
function buildBankLetter(diagnosis: Diagnosis, details: ResolvedDetails): ComplaintLetter {
  const bankRung = findRung(BANK_GRIEVANCE_RUNG_ORDER);
  const ombudsmanRung = findRung(RBI_OMBUDSMAN_RUNG_ORDER);
  const action = diagnosis.citizenAction;

  return {
    recipientLine: `The Branch Manager, ${details.branchOrOfficeName}`,
    dateLine: `Date: ${SHORT_BLANK}`,
    subjectLine: `Subject: Complaint regarding non-receipt of ${diagnosis.traceCase.schemeName} payment — request for written acknowledgement`,
    bodyParagraphs: [
      `I am a holder of account number ${details.accountNumber} at this branch. I was expecting a ${diagnosis.traceCase.schemeName} payment around ${diagnosis.traceCase.lastExpectedPaymentDate}, which I have not received.`,
      `${diagnosis.humanHeadline}. ${diagnosis.explanation}`,
      `I first raised this at this branch on ${details.firstVisitDate}, and have not received a resolution.`,
    ],
    specificRequest: `Please provide: ${action.exactFormName}, and complete the following action — ${action.whatToSay}`,
    acknowledgementRequest:
      "Please give me a written acknowledgement of this complaint with a complaint reference number and today's date. Without this reference number I cannot escalate this complaint further.",
    timelineStatement: `Under RBI's rules for banks (${bankRung.sourceLabel}), you must communicate a final decision on this complaint within ${bankRung.waitBeforeEscalating}`,
    escalationNotice: `If I do not receive a resolution or an acknowledgement in that time, I will file this complaint with the RBI Ombudsman (${ombudsmanRung.contactDetails.join("; ")}), which is free of charge.`,
    signatureBlock: [
      "Yours faithfully,",
      "",
      details.citizenName,
      `Account No.: ${details.accountNumber}`,
      `Date: ${SHORT_BLANK}`,
    ],
  };
}

/** Build the letter for F6: the beneficiary-verification failure that sits with the block/panchayat office, not the bank. */
function buildGovernmentOfficeLetter(diagnosis: Diagnosis, details: ResolvedDetails): ComplaintLetter {
  const cpgramsRung = findRung(CPGRAMS_RUNG_ORDER);
  const action = diagnosis.citizenAction;

  return {
    recipientLine: `The Officer In-Charge, ${details.branchOrOfficeName}`,
    dateLine: `Date: ${SHORT_BLANK}`,
    subjectLine: `Subject: Request for written status of ${diagnosis.traceCase.schemeName} beneficiary verification`,
    bodyParagraphs: [
      `I applied for ${diagnosis.traceCase.schemeName} and was expecting a payment around ${diagnosis.traceCase.lastExpectedPaymentDate}, which I have not received.`,
      `${diagnosis.humanHeadline}. ${diagnosis.explanation}`,
      `I first raised this at this office on ${details.firstVisitDate}, and have not received a resolution.`,
    ],
    specificRequest: `Please provide: ${action.exactFormName}, and tell me in writing which document or step, if any, is still pending — ${action.whatToSay}`,
    acknowledgementRequest:
      "Please give me a written acknowledgement of this request with a reference number and today's date. Without this reference number I cannot escalate this request further.",
    timelineStatement: `If this is not resolved informally, a formal grievance filed on CPGRAMS (${cpgramsRung.contactDetails[0]}) carries ${cpgramsRung.waitBeforeEscalating}`,
    escalationNotice: `${cpgramsRung.sourceLabel} confirms this is free of charge and open to any citizen.`,
    signatureBlock: [
      "Yours faithfully,",
      "",
      details.citizenName,
      `Date: ${SHORT_BLANK}`,
    ],
  };
}

/** Build the lighter-weight status-request letter for F7/F8, where nothing has failed yet — only a written record is missing. */
function buildWaitOnlyLetter(diagnosis: Diagnosis, details: ResolvedDetails): ComplaintLetter {
  const cpgramsRung = findRung(CPGRAMS_RUNG_ORDER);
  const action = diagnosis.citizenAction;

  return {
    recipientLine: `To: The ${diagnosis.traceCase.schemeName} Helpdesk / PFMS Support Desk`,
    dateLine: `Date: ${SHORT_BLANK}`,
    subjectLine: `Subject: Request for written confirmation of ${diagnosis.traceCase.schemeName} payment status`,
    bodyParagraphs: [
      `I was expecting a ${diagnosis.traceCase.schemeName} payment around ${diagnosis.traceCase.lastExpectedPaymentDate}, which I have not yet received.`,
      `${diagnosis.humanHeadline}. ${diagnosis.explanation}`,
      `${action.beforeYouTravel}`,
    ],
    specificRequest: `${action.exactFormName}. I am asking only for a written note confirming this status and the date by which it should change — ${action.whatToSay}`,
    acknowledgementRequest:
      "Please give me a written reply with today's date, even if the answer is simply that this is still processing normally.",
    timelineStatement: `${action.expectedTimeline}`,
    escalationNotice: `If that date passes with no change, I will file a grievance on CPGRAMS (${cpgramsRung.contactDetails[0]}), which carries ${cpgramsRung.waitBeforeEscalating}`,
    signatureBlock: [
      "Yours faithfully,",
      "",
      details.citizenName,
      `Date: ${SHORT_BLANK}`,
    ],
  };
}
