import type { Provenance } from "./types";

// Every rung below was checked against a primary source before being written down.
// Where a fact could not be pinned to a primary source, it is marked MODELLED and
// the comment above that rung says exactly what is unverified and why. Nothing here
// is MOCK — there is no invented data in this file.

export type EscalationProvenance = Extract<Provenance, "CITED" | "MODELLED" | "MOCK">;

export type ContactMethod = "PHONE" | "PORTAL" | "EMAIL" | "IN_PERSON" | "POST";

export type EscalationRung = Readonly<{
  /** 1-indexed position in the ladder. */
  order: number;
  title: string;
  /** Who the citizen is contacting at this rung. */
  contactWho: string;
  methods: ContactMethod[];
  /** Phone numbers, portal URLs, email addresses or postal address for this rung. */
  contactDetails: string[];
  /** What the citizen should say or file. */
  whatToFile: string;
  /** How long they must wait before moving to the next rung. */
  waitBeforeEscalating: string;
  cost: string;
  provenance: EscalationProvenance;
  sourceUrl?: string;
  sourceLabel?: string;
  /** Required when provenance is not CITED — explains the gap. */
  verificationNote?: string;
}>;

// RBI's Master Direction on the Internal Ombudsman requires every covered bank to run
// its own internal grievance process (branch → Grievance Redressal Officer / nodal
// officer) and to communicate a final decision within 30 days. The RB-IOS, 2026 FAQ
// (rung 3 below) confirms a citizen cannot approach the RBI Ombudsman before that.
// Fetched and read directly: https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12586&Mode=0
const BANK_INTERNAL_GRIEVANCE: EscalationRung = {
  order: 1,
  title: "Your bank's own grievance redressal officer",
  contactWho:
    "Your branch manager first, then the bank's Grievance Redressal Officer / Nodal Officer if the branch does not resolve it. Every RBI-regulated bank must publish this contact on its own website and in its branches.",
  methods: ["IN_PERSON", "PHONE", "PORTAL"],
  contactDetails: [
    "Ask any branch of your bank for the name and contact details of the Grievance Redressal Officer / Nodal Officer — banks are required to display this.",
    "Most banks also list a grievance-complaint form on their own website (search '[your bank name] grievance redressal officer').",
  ],
  whatToFile:
    "A written complaint describing the missed DBT payment: your account number, the scheme name, the date you expected payment, and (if you have it) the failure reason shown on PFMS. Ask for a written acknowledgement with a complaint/reference number and date — you will need this to escalate.",
  waitBeforeEscalating:
    "30 days from the date the bank received your complaint (or a longer period if RBI, NPCI or a card network has separately specified one) — whichever is longer — before you may go to the RBI Ombudsman. You can escalate sooner if the bank rejects your complaint or replies and you are not satisfied with the reply.",
  cost: "Free.",
  provenance: "CITED",
  sourceUrl: "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12586&Mode=0",
  sourceLabel:
    "RBI Master Direction — Reserve Bank of India (Internal Ombudsman for Regulated Entities) Directions, 2023 (RBI/CEPD/2023-24/108)",
};

// NPCI runs DigiSaathi, a joint helpline of NPCI and the payment-system industry, for
// digital payment product queries including AePS (the same Aadhaar-based rail family
// as the Aadhaar Payment Bridge System used for DBT). Numbers verified directly from
// NPCI's own press release announcing the WhatsApp channel:
// https://www.npci.org.in/PDF/npci/press-releases/2022/NPCI-Press-Release-DigiSaathi-24x7-Helpline-for-information-on-Digital-Payments-now-enabled-on-additional-channels-(002).pdf
// (npci.org.in blocks automated fetches; the identical press release text was
// independently read from a mirrored copy of the same PDF to confirm the numbers below.)
// DigiSaathi is NOT a dedicated Aadhaar-mapper complaint line and cannot itself fix a
// mapper problem — it can confirm what QSAM/BASE show you and point you to the right
// bank contact. No dedicated public complaint line exclusively for APBS/mapper issues
// was found, so this is the closest verified NPCI-run contact point.
const NPCI_DIGISAATHI: EscalationRung = {
  order: 2,
  title: "NPCI's digital payments helpline (DigiSaathi)",
  contactWho: "DigiSaathi — the 24x7 helpline run by NPCI with banks and payment system operators.",
  methods: ["PHONE", "PORTAL"],
  contactDetails: [
    "Toll-free: 14431",
    "Toll-free: 1800-891-3333",
    "WhatsApp chatbot: message +91 892 891 3333",
    "Website & chatbot: digisaathi.info",
  ],
  whatToFile:
    "Not a formal complaint — describe what the NPCI BASE portal showed you, and ask for guidance on the Aadhaar Payment Bridge System / AePS mapping. Use this alongside, not instead of, your written bank complaint.",
  waitBeforeEscalating:
    "No fixed wait — this is a same-call information line, not a case that needs to run its course.",
  cost: "Free (toll-free number).",
  provenance: "CITED",
  sourceUrl:
    "https://www.npci.org.in/PDF/npci/press-releases/2022/NPCI-Press-Release-DigiSaathi-24x7-Helpline-for-information-on-Digital-Payments-now-enabled-on-additional-channels-(002).pdf",
  sourceLabel: "NPCI press release, 10 May 2022 — DigiSaathi enabled on additional channels",
};

// RB-IOS, 2026 replaced RB-IOS, 2021 with effect from 1 July 2026 and is the scheme in
// force today. Every figure below (toll-free number, hours, 30-day/90-day windows, no
// fee, no ceiling on the underlying dispute) was read directly from RBI's own FAQ PDF.
const RBI_OMBUDSMAN: EscalationRung = {
  order: 3,
  title: "RBI Ombudsman (Reserve Bank - Integrated Ombudsman Scheme, 2026)",
  contactWho: "The Reserve Bank's Centralised Receipt and Processing Centre (CRPC), which processes complaints for the RBI Ombudsman.",
  methods: ["PORTAL", "PHONE", "EMAIL", "POST"],
  contactDetails: [
    "Online: cms.rbi.org.in",
    "Toll-free contact centre: 14448 (IVRS available 24x7; agents 8:00 AM–10:00 PM, Monday–Saturday except national holidays, in English, Hindi and 10 regional languages)",
    "Email: crpc@rbi.org.in",
    "Post: Centralised Receipt and Processing Centre, Reserve Bank of India, Central Vista, Sector 17, Chandigarh - 160017",
  ],
  whatToFile:
    "Your name, mobile number, postal address; your bank's name and branch; the complaint/reference number and date the bank gave you at rung 1; a copy of your complaint and the bank's reply (if any); account/transaction details; and what outcome you want.",
  waitBeforeEscalating:
    "File within 90 days of the 30-day bank deadline expiring, or within 90 days of the bank's last reply, whichever is later — the Ombudsman cannot accept a complaint filed too early (before the bank has had its 30 days) or too late (after this 90-day window).",
  cost: "Free — no fee at any stage. The Ombudsman can award compensation up to ₹30 lakh for consequential loss and up to ₹3 lakh for harassment or wasted time, with no cap on the underlying disputed amount.",
  provenance: "CITED",
  sourceUrl: "https://www.rbi.org.in/commonman/Upload/English/FAQs/PDFs/RBIOS01072026.pdf",
  sourceLabel: "RBI — Frequently Asked Questions, Reserve Bank - Integrated Ombudsman Scheme, 2026",
};

// pgportal.gov.in's own FAQ page states the 21-day disposal target and the 30-day
// appeal window; fetched directly.
const CPGRAMS: EscalationRung = {
  order: 4,
  title: "CPGRAMS — if the failure is on the government/scheme side, not the bank",
  contactWho:
    "The Centralised Public Grievance Redress and Monitoring System, which routes your grievance to the ministry, department or state that runs the scheme (use this when the money was never released by the department, rather than a bank account or mapping problem).",
  methods: ["PORTAL", "IN_PERSON"],
  contactDetails: [
    "Online: pgportal.gov.in",
    "CPGRAMS mobile app, or via UMANG",
    "In person at any Common Service Centre (CSC)",
  ],
  whatToFile:
    "A grievance describing the scheme, your beneficiary/application ID, and what has not happened. You receive a unique registration number to track it.",
  waitBeforeEscalating:
    "Grievances carry a 21-day disposal target. If you are dissatisfied with the resolution (or it is closed with a 'Poor' rating), you can file an appeal within 30 days of disposal.",
  cost: "Free.",
  provenance: "CITED",
  sourceUrl: "https://pgportal.gov.in/Home/Faq",
  sourceLabel: "CPGRAMS — Frequently Asked Questions, pgportal.gov.in",
};

// The PM-KISAN helpline numbers below (155261 / 1800-115-526 / 011-24300606) are
// repeated consistently by the scheme's own official social media account and by many
// independent aggregator sites, but a direct primary-page fetch was blocked in both
// directions: fw.pmkisan.gov.in's contact/helpdesk pages require an active session and
// pmkisan.gov.in's homepage renders its helpline number through client-side script that
// a plain fetch cannot see. Downgraded from CITED to MODELLED for that reason — the
// numbers are not invented, but this project could not independently load a primary
// page stating them.
const SCHEME_HELPLINE: EscalationRung = {
  order: 5,
  title: "Your scheme's own helpline (example: PM-KISAN)",
  contactWho: "The department that runs the specific scheme you are owed money under.",
  methods: ["PHONE"],
  contactDetails: [
    "PM-KISAN: 155261 or 1800-115-526 (toll-free), or 011-24300606 (standard charges apply)",
    "Other schemes publish their own helpline — check the scheme's official website.",
  ],
  whatToFile:
    "Your beneficiary ID or application number and the payment cycle you did not receive.",
  waitBeforeEscalating: "No fixed wait — use this to check eligibility and sanction status directly.",
  cost: "Free or standard call charges, depending on the number dialled.",
  provenance: "MODELLED",
  verificationNote:
    "Numbers converge across the scheme's official social account and independent sources, but no primary page could be loaded directly to confirm them — see comment above.",
};

/** The escalation ladder, in the order a citizen should generally work through it. */
export const ESCALATION_LADDER: readonly EscalationRung[] = [
  BANK_INTERNAL_GRIEVANCE,
  NPCI_DIGISAATHI,
  RBI_OMBUDSMAN,
  CPGRAMS,
  SCHEME_HELPLINE,
];
