import {
  STAGE_IDS,
  type Diagnosis,
  type FailureCode,
  type StageId,
  type StageResult,
} from "./types";

type TerminalStageResult = Readonly<{
  status: "FAILED" | "PENDING";
  explanation: string;
  technicalDetail?: string;
  provenance: StageResult["provenance"];
}>;

const AADHAAR_SEEDING_FORM_NAME = "Aadhaar Seeding Consent Form (Annexure-I)";
const NO_FORM_REQUIRED = "No form is required";

const PASSED_STAGE_RESULTS: Readonly<Record<StageId, Omit<StageResult, "stageId">>> = {
  SCHEME: {
    status: "PASSED",
    explanation: "The department approved your name for this payment.",
    provenance: "MODELLED",
  },
  PFMS: {
    status: "PASSED",
    explanation: "The treasury made the payment file for your benefit.",
    provenance: "MODELLED",
  },
  APBS: {
    status: "PASSED",
    explanation: "The Aadhaar payment system accepted the payment file.",
    provenance: "MODELLED",
  },
  MAPPER: {
    status: "PASSED",
    explanation: "NPCI found the bank currently chosen for this Aadhaar number.",
    provenance: "MODELLED",
  },
  BANK: {
    status: "PASSED",
    explanation: "The destination bank accepted the payment.",
    provenance: "MODELLED",
  },
};

const GENERIC_TRACE_CASE = {
  id: "100000000000",
  displayName: "Demo Citizen",
  age: null,
  schemeName: "Government Benefit",
  lastExpectedPaymentDate: "August 2026",
  portalClaim: "Payment Processed",
  provenance: "MOCK",
} as const;

/** Build all five stages in payment order and stop the trace after its first failed or pending stage. */
export function buildStageResults(
  terminalStage: StageId,
  terminalResult: TerminalStageResult,
): StageResult[] {
  const terminalIndex = STAGE_IDS.indexOf(terminalStage);

  if (terminalIndex < 0) {
    throw new RangeError(`Unknown payment stage: ${String(terminalStage)}`);
  }

  return STAGE_IDS.map((stageId, stageIndex) => {
    if (stageIndex < terminalIndex) {
      return { stageId, ...PASSED_STAGE_RESULTS[stageId] };
    }

    if (stageIndex === terminalIndex) {
      return { stageId, ...terminalResult };
    }

    return {
      stageId,
      status: "NOT_REACHED",
      explanation: "The payment did not reach this step.",
      provenance: "MODELLED",
    };
  });
}

export const SCENARIOS: Readonly<Record<FailureCode, Diagnosis>> = {
  F1: {
    failureCode: "F1",
    humanHeadline: "Your Aadhaar has no DBT bank",
    failedStage: "MAPPER",
    explanation:
      "The payment reached NPCI, but NPCI could not find a bank chosen to receive DBT money for your Aadhaar number.",
    stages: buildStageResults("MAPPER", {
      status: "FAILED",
      explanation: "No active DBT bank was found for your Aadhaar number.",
      technicalDetail: "NEVER_SEEDED",
      provenance: "CITED",
    }),
    citizenAction: {
      whereToGo: "The branch of the bank account where you want future payments.",
      whoToAsk: "The officer handling Aadhaar DBT seeding.",
      exactFormName: AADHAAR_SEEDING_FORM_NAME,
      whatToSay:
        "I need this account seeded in the NPCI mapper for DBT. Please give me the Aadhaar Seeding Consent Form, Annexure-I.",
      whatToSayHindiRoman:
        "Mujhe is khate ko NPCI DBT mapper mein seed karne ke liye Aadhaar Seeding Consent Form, Annexure-I chahiye.",
      clerkPushback: "Your Aadhaar is already linked to this account.",
      yourReply:
        "Linked for bank KYC is not the same as seeded in the NPCI mapper for DBT. Please check the NPCI mapper status and process Annexure-I.",
      documentsToBring: [
        "Aadhaar card or a clear copy",
        "Bank passbook",
        "Mobile phone linked to the bank account",
      ],
      expectedTimeline: "Usually 2 to 7 working days after the bank accepts the form.",
      costToCitizen: "No bank fee; only normal photocopy costs, if needed.",
      fieldProvenance: {
        exactFormName: "CITED",
        whatToSayHindiRoman: "VERIFIED",
        yourReply: "CITED",
        expectedTimeline: "MODELLED",
      },
    },
    traceCase: GENERIC_TRACE_CASE,
    provenance: "CITED",
  },
  F2: {
    failureCode: "F2",
    humanHeadline: "Your payment went to a different bank account",
    failedStage: "MAPPER",
    explanation:
      "A later Aadhaar seeding replaced the earlier NPCI mapping. The payment was sent to the bank seeded most recently, which may hold an older or closed account for you.",
    stages: buildStageResults("MAPPER", {
      status: "FAILED",
      explanation: "NPCI found a different bank from the one where you expected the money.",
      technicalDetail: "MAPPER_OVERWRITTEN",
      provenance: "CITED",
    }),
    citizenAction: {
      whereToGo: "The branch of the bank where you want future DBT money to arrive.",
      whoToAsk: "The officer handling Aadhaar DBT seeding.",
      exactFormName: AADHAAR_SEEDING_FORM_NAME,
      whatToSay:
        "I want DBT payments in this account. Please use Annexure-I to seed this bank as my latest bank in the NPCI mapper.",
      whatToSayHindiRoman:
        "Mujhe DBT ka paisa isi khate mein chahiye. Kripya Aadhaar Seeding Consent Form, Annexure-I lekar NPCI mapper mein is bank ko naya seed kijiye.",
      clerkPushback: "Your Aadhaar is already linked, so no change is needed.",
      yourReply:
        "Bank linking for KYC is separate from NPCI DBT seeding. NPCI uses the bank seeded most recently, so please process a fresh Annexure-I for this bank.",
      documentsToBring: [
        "Aadhaar card or a clear copy",
        "Passbook for the account where you want the money",
        "Name of the bank currently receiving DBT, if known",
      ],
      expectedTimeline: "Usually 2 to 7 working days for the new mapping to become active.",
      costToCitizen: "No bank fee; only normal photocopy costs, if needed.",
      fieldProvenance: {
        exactFormName: "CITED",
        whatToSayHindiRoman: "VERIFIED",
        yourReply: "CITED",
        expectedTimeline: "MODELLED",
      },
    },
    traceCase: GENERIC_TRACE_CASE,
    provenance: "CITED",
  },
  F3: {
    failureCode: "F3",
    humanHeadline: "Your bank did not send the mapping",
    failedStage: "MAPPER",
    explanation:
      "The branch accepted your request, but the bank did not upload the Aadhaar mandate to the central NPCI mapper. This is a bank-side failure, not your fault.",
    stages: buildStageResults("MAPPER", {
      status: "FAILED",
      explanation: "The bank's Aadhaar mandate is missing from the central mapper.",
      technicalDetail: "APBS response code B08",
      provenance: "CITED",
    }),
    citizenAction: {
      whereToGo: "The branch where you submitted Aadhaar seeding.",
      whoToAsk: "The Branch Manager, not the counter clerk.",
      exactFormName: AADHAAR_SEEDING_FORM_NAME,
      whatToSay:
        "My payment failed with code B08 because the bank mandate did not reach the NPCI mapper. Please escalate and upload it again.",
      whatToSayHindiRoman:
        "Maine Aadhaar seeding form jama kiya tha. B08 bank ki upload ki galti hai. Kripya Branch Manager isse NPCI mapper mein dobara bheje.",
      clerkPushback: "NPCI rejected it, so you must contact NPCI yourself.",
      yourReply:
        "NPCI says Aadhaar mapper seeding is the bank's responsibility. Please check the bank's upload and give me a written complaint number.",
      documentsToBring: [
        "Bank-acknowledged copy of Annexure-I, if available",
        "Aadhaar card or a clear copy",
        "Bank passbook",
        "Payment failure screenshot showing B08",
      ],
      expectedTimeline: "Ask for correction within 7 working days and a complaint number today.",
      costToCitizen: "No fee. The bank must correct its own upload.",
      fieldProvenance: {
        exactFormName: "CITED",
        whatToSayHindiRoman: "VERIFIED",
        yourReply: "CITED",
        expectedTimeline: "MODELLED",
      },
    },
    traceCase: GENERIC_TRACE_CASE,
    provenance: "CITED",
  },
  F4: {
    failureCode: "F4",
    humanHeadline: "Your bank details do not match Aadhaar",
    failedStage: "APBS",
    explanation:
      "Your name, date of birth, or gender is different in the bank record and Aadhaar record, so the Aadhaar payment check stopped.",
    stages: buildStageResults("APBS", {
      status: "FAILED",
      explanation: "The personal details in the bank and Aadhaar records did not match.",
      technicalDetail: "APBS response code 207",
      provenance: "CITED",
    }),
    citizenAction: {
      whereToGo: "Your bank branch first, with your Aadhaar details and bank passbook.",
      whoToAsk: "The officer handling customer information or re-KYC corrections.",
      exactFormName: "Customer Information Update Form (CIF Correction Form)",
      whatToSay:
        "Please compare my name, date of birth, and gender with Aadhaar and correct the wrong bank field using the CIF Correction Form.",
      whatToSayHindiRoman:
        "Mera bank record aur Aadhaar ka naam, janm tithi ya ling mil nahi raha. Kripya sahi record dekhkar CIF Correction Form se bank record theek kijiye.",
      clerkPushback: "You must change Aadhaar first.",
      yourReply:
        "Please first show me which record is wrong. If Aadhaar is correct, changing the bank record is usually free, faster, and needs only branch verification. I will visit an Aadhaar centre only if Aadhaar itself is wrong.",
      documentsToBring: [
        "Aadhaar card",
        "Bank passbook",
        "One document proving the correct name, date of birth, or gender",
      ],
      expectedTimeline: "A bank correction usually takes 1 to 7 working days after verification.",
      costToCitizen:
        "Bank record correction is normally free; an Aadhaar centre may charge the official update fee if Aadhaar is wrong.",
      fieldProvenance: {
        exactFormName: "MODELLED",
        whatToSayHindiRoman: "VERIFIED",
        yourReply: "MODELLED",
        expectedTimeline: "MODELLED",
      },
    },
    traceCase: GENERIC_TRACE_CASE,
    provenance: "CITED",
  },
  F5: {
    failureCode: "F5",
    humanHeadline: "Your bank account needs reactivation",
    failedStage: "BANK",
    explanation:
      "The payment reached your bank, but the account is dormant or its KYC has expired. The money may already be in the account but unavailable to withdraw.",
    stages: buildStageResults("BANK", {
      status: "FAILED",
      explanation: "The bank could not make the money available in this inactive account.",
      technicalDetail: "ACCOUNT_DORMANT_OR_KYC_EXPIRED",
      provenance: "MODELLED",
    }),
    citizenAction: {
      whereToGo: "The branch that holds the inactive account.",
      whoToAsk: "The account service or re-KYC officer.",
      exactFormName: "Re-KYC Form and Account Activation Request",
      whatToSay:
        "Please complete my re-KYC, activate this account, and check whether the DBT payment is already waiting in it.",
      whatToSayHindiRoman:
        "Mera khata dormant hai ya KYC samapt hai. Kripya Re-KYC Form lekar khata chalu kijiye aur DBT jama hua hai ya nahi dekhiye.",
      clerkPushback: "The government has not sent the money.",
      yourReply:
        "The trace reached this bank. Please check pending credits and the account restriction before sending me back to the department.",
      documentsToBring: [
        "Aadhaar card",
        "PAN card or another KYC document accepted by the bank",
        "Bank passbook",
        "Recent passport-size photograph if the branch asks for one",
      ],
      expectedTimeline: "Re-KYC is often completed the same day or within 3 working days.",
      costToCitizen: "No bank fee for re-KYC or account activation.",
      fieldProvenance: {
        exactFormName: "MODELLED",
        whatToSayHindiRoman: "VERIFIED",
        yourReply: "MODELLED",
        expectedTimeline: "MODELLED",
      },
    },
    traceCase: GENERIC_TRACE_CASE,
    provenance: "MODELLED",
  },
  F6: {
    failureCode: "F6",
    humanHeadline: "Your scheme application is still unverified",
    failedStage: "SCHEME",
    explanation:
      "The department has not yet verified you as an approved beneficiary, so no payment file was made. The bank cannot fix this.",
    stages: buildStageResults("SCHEME", {
      status: "FAILED",
      explanation: "The scheme office has not approved your beneficiary record yet.",
      technicalDetail: "BENEFICIARY_PENDING",
      provenance: "MODELLED",
    }),
    citizenAction: {
      whereToGo: "Your block office or panchayat office, not the bank.",
      whoToAsk: "The officer who verifies beneficiaries for your scheme.",
      exactFormName: "Beneficiary Verification Form",
      whatToSay:
        "My beneficiary verification is still pending. Please give me the Beneficiary Verification Form and tell me which document is missing.",
      whatToSayHindiRoman:
        "Mera labharthi verification abhi pending hai. Kripya Beneficiary Verification Form lekar meri jaanch poori kijiye.",
      clerkPushback: "Go to your bank and link Aadhaar again.",
      yourReply:
        "The payment has not reached the bank system. The scheme office must verify my beneficiary record before any bank action is possible.",
      documentsToBring: [
        "Scheme application receipt or beneficiary number",
        "Aadhaar card",
        "Bank passbook",
        "Scheme eligibility documents originally submitted",
      ],
      expectedTimeline: "Ask for a written status date; verification commonly takes 7 to 30 days.",
      costToCitizen: "No official fee.",
      fieldProvenance: {
        exactFormName: "MODELLED",
        whatToSayHindiRoman: "VERIFIED",
        yourReply: "MODELLED",
        expectedTimeline: "MODELLED",
      },
    },
    traceCase: GENERIC_TRACE_CASE,
    provenance: "MODELLED",
  },
  F7: {
    failureCode: "F7",
    humanHeadline: "The department has not released the money",
    failedStage: "PFMS",
    explanation:
      "Your name is approved, but the department has not released funds to the treasury. Nothing at the bank can speed this up.",
    stages: buildStageResults("PFMS", {
      status: "PENDING",
      explanation: "The treasury is waiting for the department to release this payment budget.",
      technicalDetail: "BUDGET_PENDING",
      provenance: "MODELLED",
    }),
    citizenAction: {
      whereToGo: "Do not travel to the bank; check the scheme portal or helpline from home.",
      whoToAsk: "The scheme helpline only if the status is unchanged after the check date.",
      exactFormName: NO_FORM_REQUIRED,
      whatToSay:
        "Please tell me whether this scheme's funds have been released and give me the next date to check.",
      whatToSayHindiRoman:
        "Kripya batayiye ki is yojana ka fund release hua hai ya nahi. Agar nahi hua, to agali jaanch ki tareekh likh dijiye.",
      clerkPushback: "Ask your bank why the payment is missing.",
      yourReply:
        "No treasury payment file exists yet, so the bank has received nothing and will turn me away.",
      documentsToBring: ["No documents or bank visit needed right now"],
      expectedTimeline: "Check again after 15 September 2026; release dates can move.",
      costToCitizen: "Nothing. Do not spend money travelling to the bank.",
      fieldProvenance: {
        exactFormName: "MODELLED",
        whatToSayHindiRoman: "VERIFIED",
        yourReply: "MODELLED",
        expectedTimeline: "MOCK",
      },
    },
    traceCase: GENERIC_TRACE_CASE,
    provenance: "MODELLED",
  },
  F8: {
    failureCode: "F8",
    humanHeadline: "Your payment is still moving normally",
    failedStage: null,
    explanation:
      "Nothing is broken. The treasury sent the payment and the Aadhaar payment system is still processing it within the normal time.",
    stages: buildStageResults("APBS", {
      status: "PENDING",
      explanation: "The Aadhaar payment system is still processing this payment normally.",
      technicalDetail: "IN_FLIGHT_NORMAL",
      provenance: "MODELLED",
    }),
    citizenAction: {
      whereToGo: "Nowhere today; check the payment status again from home.",
      whoToAsk: "No clerk is needed unless the status is unchanged after the check date.",
      exactFormName: NO_FORM_REQUIRED,
      whatToSay:
        "No action is needed today. I will check the payment again after 3 September 2026.",
      whatToSayHindiRoman:
        "Mera payment abhi prakriya mein hai. Main 3 September 2026 ke baad dobara sthiti dekhunga.",
      clerkPushback: "Visit the bank now to make sure your account is linked.",
      yourReply:
        "The payment has not reached the mapper or bank yet, and it is still within normal processing time. I will wait until the check date.",
      documentsToBring: ["No documents or office visit needed right now"],
      expectedTimeline: "Do nothing and check again after 3 September 2026.",
      costToCitizen: "Nothing.",
      fieldProvenance: {
        exactFormName: "MODELLED",
        whatToSayHindiRoman: "VERIFIED",
        yourReply: "MODELLED",
        expectedTimeline: "MOCK",
      },
    },
    traceCase: GENERIC_TRACE_CASE,
    provenance: "MODELLED",
  },
};
