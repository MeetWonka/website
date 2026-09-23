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

export const LEAD_FORM_COPY: Record<
  LeadSource,
  {
    submitLabel: string;
    successMessage: string;
  }
> = {
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
