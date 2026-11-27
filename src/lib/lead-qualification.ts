import type { LeadSource } from "@/lib/lead-capture";

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "yahoo.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
]);

export type LeadLifecycleStage = "lead" | "mql";

export type LeadQualification = {
  lifecycleStage: LeadLifecycleStage;
  score: number;
  signals: string[];
};

export function qualifyLead(
  email: string,
  source: LeadSource,
  attribution: Record<string, string>,
): LeadQualification {
  const signals: string[] = [];
  let score = 0;
  const domain = email.split("@")[1] || "";

  if (!FREE_EMAIL_DOMAINS.has(domain)) {
    score += 25;
    signals.push("business_email");
  }

  const sourceScores: Record<LeadSource, number> = {
    "start-ai-hero": 20,
    "start-ai-flanders-hero": 25,
    "wonka-chat-hero": 25,
    "wonka-chat-odoo-hero": 30,
    "france-diagnostic": 35,
  };
  score += sourceScores[source];
  signals.push(`intent:${source}`);

  if (attribution.utm_campaign) {
    score += 10;
    signals.push("campaign_attributed");
  }
  if (["cpc", "paid", "paid_social"].includes(attribution.utm_medium?.toLowerCase())) {
    score += 10;
    signals.push("paid_high_intent");
  }

  return {
    lifecycleStage: score >= 50 ? "mql" : "lead",
    score,
    signals,
  };
}
