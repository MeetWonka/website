import type { Locale } from "@/i18n/config";
import {
  DEFAULT_SECURITY,
  DEFAULT_USE_CASES,
  DEFAULT_WONKA_CHAT_SECURITY,
} from "@/lib/cms-sections";
import {
  getAiChatCapabilityClusters,
  type AiChatCapabilityClustersData,
} from "@/lib/page-defaults/ai-chat-capability-grid";
import { CONTACT_DEFAULTS, type ContactDefaults } from "@/lib/page-defaults/contact";
import { START_AI_DEFAULTS, type StartAiDefaults } from "@/lib/page-defaults/start-ai";
import { WONKA_BUILD_DEFAULTS, type WonkaBuildDefaults } from "@/lib/page-defaults/wonka-build";
import { WONKA_CHAT_DEFAULTS, type WonkaChatDefaults } from "@/lib/page-defaults/wonka-chat";
import {
  WONKA_CHAT_ODOO_DEFAULTS,
  type WonkaChatOdooDefaults,
} from "@/lib/page-defaults/wonka-chat-odoo";
import { FR_PAGE_DEFAULTS } from "@/lib/page-defaults/fr";
import { NL_PAGE_DEFAULTS } from "@/lib/page-defaults/nl";
import {
  DEFAULT_TESTIMONIALS_HEADER,
  type TestimonialsHeader,
} from "@/lib/testimonials-defaults";
import type { SecurityData, UseCasesData } from "@/lib/types";

/**
 * Code fallbacks for every CMS-backed page, per locale. Sanity content
 * (EN singleton, or its `-fr` / `-nl` sibling) always wins field by field;
 * these fill whatever the document leaves empty.
 */
export interface LocalePageDefaults {
  startAi: StartAiDefaults;
  wonkaBuild: WonkaBuildDefaults;
  wonkaChat: WonkaChatDefaults;
  wonkaChatOdoo: WonkaChatOdooDefaults;
  contact: ContactDefaults;
  useCases: UseCasesData;
  security: SecurityData;
  wonkaChatSecurity: SecurityData;
  testimonialsHeader: TestimonialsHeader;
  aiChatCapabilities: AiChatCapabilityClustersData;
}

const EN_PAGE_DEFAULTS: LocalePageDefaults = {
  startAi: START_AI_DEFAULTS,
  wonkaBuild: WONKA_BUILD_DEFAULTS,
  wonkaChat: WONKA_CHAT_DEFAULTS,
  wonkaChatOdoo: WONKA_CHAT_ODOO_DEFAULTS,
  contact: CONTACT_DEFAULTS,
  useCases: DEFAULT_USE_CASES,
  security: DEFAULT_SECURITY,
  wonkaChatSecurity: DEFAULT_WONKA_CHAT_SECURITY,
  testimonialsHeader: DEFAULT_TESTIMONIALS_HEADER,
  aiChatCapabilities: getAiChatCapabilityClusters("en"),
};

const PAGE_DEFAULTS: Record<Locale, LocalePageDefaults> = {
  en: EN_PAGE_DEFAULTS,
  fr: FR_PAGE_DEFAULTS,
  nl: NL_PAGE_DEFAULTS,
};

export function getPageDefaults(locale: Locale): LocalePageDefaults {
  return PAGE_DEFAULTS[locale];
}
