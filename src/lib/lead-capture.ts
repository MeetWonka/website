import type { Locale } from "@/i18n/config";
import { en } from "@/i18n/messages/en";
import { fr } from "@/i18n/messages/fr";
import { nl } from "@/i18n/messages/nl";

export const LEAD_SOURCES = [
  "start-ai-hero",
  "start-ai-flanders-hero",
  "wonka-chat-hero",
  "wonka-chat-odoo-hero",
  "france-diagnostic",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

export function isLeadSource(value: unknown): value is LeadSource {
  return typeof value === "string" && LEAD_SOURCES.includes(value as LeadSource);
}

export type LeadFormCopy = {
  submitLabel: string;
  successMessage: string;
};

/** English copy (plus the French-only diagnostic). Prefer `getLeadFormCopy`. */
export const LEAD_FORM_COPY: Record<LeadSource, LeadFormCopy> = {
  "start-ai-hero": {
    submitLabel: "Get more info",
    successMessage: "Thanks — we'll be in touch with more Start AI info.",
  },
  "start-ai-flanders-hero": {
    submitLabel: "Check subsidy eligibility",
    successMessage:
      "Thanks — we'll be in touch about Start AI and the KMO-portefeuille.",
  },
  "wonka-chat-hero": {
    submitLabel: "Try WonkaChat",
    successMessage: "Thanks — we'll be in touch about trying WonkaChat.",
  },
  "wonka-chat-odoo-hero": {
    submitLabel: "Try WonkaChat",
    successMessage: "Thanks — we'll be in touch about trying WonkaChat for Odoo.",
  },
  "france-diagnostic": {
    submitLabel: "Voir mon résultat",
    successMessage: "Merci — nous vous contacterons bientôt.",
  },
};

const LOCALIZED_SOURCE_COPY: Record<Locale, Partial<Record<LeadSource, LeadFormCopy>>> = {
  en: en.leadForm.sources,
  fr: fr.leadForm.sources,
  nl: nl.leadForm.sources,
};

/** Sources whose copy is fixed regardless of the page locale. */
const FIXED_COPY_SOURCES: readonly LeadSource[] = ["france-diagnostic"];

/** Submit label + success message for a lead source, in `locale`. */
export function getLeadFormCopy(source: LeadSource, locale: Locale): LeadFormCopy {
  if (FIXED_COPY_SOURCES.includes(source)) return LEAD_FORM_COPY[source];
  const sources: Partial<Record<LeadSource, LeadFormCopy>> =
    LOCALIZED_SOURCE_COPY[locale];
  return sources[source] ?? LEAD_FORM_COPY[source];
}

/** Machine-readable error codes returned by `POST /api/lead`. */
export const LEAD_ERROR_CODES = [
  "invalid_body",
  "invalid_email",
  "invalid_source",
  "verification_failed",
  "not_configured",
  "rate_limited",
  "server_error",
] as const;

export type LeadErrorCode = (typeof LEAD_ERROR_CODES)[number];

export function isLeadErrorCode(value: unknown): value is LeadErrorCode {
  return (
    typeof value === "string" &&
    LEAD_ERROR_CODES.includes(value as LeadErrorCode)
  );
}
