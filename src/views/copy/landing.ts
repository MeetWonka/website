import type { Locale } from "@/i18n/config";
import type { SeoLandingPage } from "@/i18n/routes";
import type { LandingCopy } from "@/views/copy/landing-types";
import { AI_CONSULTANCY_COPY } from "@/views/copy/landing/ai-consultancy";
import { AI_FOR_BUSINESS_COPY } from "@/views/copy/landing/ai-for-business";
import { CHATGPT_FOR_BUSINESS_COPY } from "@/views/copy/landing/chatgpt-for-business";
import { KMO_PORTEFEUILLE_COPY } from "@/views/copy/landing/kmo-portefeuille";
import { ACCULTURATION_IA_COPY } from "@/views/copy/landing/acculturation-ia";
import { AUDIT_IA_COPY } from "@/views/copy/landing/audit-ia";
import { CHARTE_IA_COPY } from "@/views/copy/landing/charte-ia";
import { CHATBOT_ENTREPRISE_COPY } from "@/views/copy/landing/chatbot-entreprise";
import { COMPARATIF_IA_COPY } from "@/views/copy/landing/comparatif-ia";
import { SHADOW_AI_COPY } from "@/views/copy/landing/shadow-ai";

/** Copy per landing page; a page only has copy for the locales in LANDING_PATHS. */
export const LANDING_COPY: Record<SeoLandingPage, Partial<Record<Locale, LandingCopy>>> = {
  aiForBusiness: AI_FOR_BUSINESS_COPY,
  aiConsultancy: AI_CONSULTANCY_COPY,
  chatgptForBusiness: CHATGPT_FOR_BUSINESS_COPY,
  kmoPortefeuille: KMO_PORTEFEUILLE_COPY,
  auditIa: AUDIT_IA_COPY,
  acculturationIa: ACCULTURATION_IA_COPY,
  chatbotEntreprise: CHATBOT_ENTREPRISE_COPY,
  charteIa: CHARTE_IA_COPY,
  shadowAi: SHADOW_AI_COPY,
  comparatifIa: COMPARATIF_IA_COPY,
};
