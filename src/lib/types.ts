export const STAGE_IDS = ["SCHEME", "PFMS", "APBS", "MAPPER", "BANK"] as const;

export type StageId = (typeof STAGE_IDS)[number];
export type StageStatus = "PASSED" | "FAILED" | "PENDING" | "NOT_REACHED";
export type Provenance = "MOCK" | "MODELLED" | "CITED" | "VERIFIED";
export type FailureCode = "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8";

export type StageResult = Readonly<{
  stageId: StageId;
  status: StageStatus;
  explanation: string;
  technicalDetail?: string;
  provenance: Provenance;
}>;

export type CitizenAction = Readonly<{
  whereToGo: string;
  whoToAsk: string;
  exactFormName: string;
  whatToSay: string;
  whatToSayHindiRoman: string;
  clerkPushback: string;
  yourReply: string;
  documentsToBring: string[];
  expectedTimeline: string;
  costToCitizen: string;
  fieldProvenance: Readonly<{
    exactFormName: Provenance;
    whatToSayHindiRoman: "VERIFIED";
    yourReply: Provenance;
    expectedTimeline: Provenance;
  }>;
}>;

export type TraceCase = Readonly<{
  id: string;
  displayName: string;
  age: number | null;
  schemeName: string;
  lastExpectedPaymentDate: string;
  portalClaim: string;
  provenance: "MOCK";
}>;

export type Diagnosis = Readonly<{
  failureCode: FailureCode;
  humanHeadline: string;
  failedStage: StageId | null;
  explanation: string;
  stages: StageResult[];
  citizenAction: CitizenAction;
  traceCase: TraceCase;
  provenance: Provenance;
}>;

export type EmptyInputError = Readonly<{
  code: "EMPTY_INPUT";
  message: string;
}>;

export type DiagnosisResult =
  | Readonly<{ ok: true; diagnosis: Diagnosis }>
  | Readonly<{ ok: false; error: EmptyInputError }>;
