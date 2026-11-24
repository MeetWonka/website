import { createTranslator } from "next-intl";
import type { Locale } from "@/i18n/config";
import { en, type UiMessages } from "@/i18n/messages/en";
import { fr } from "@/i18n/messages/fr";
import { nl } from "@/i18n/messages/nl";

/**
 * UI strings for components shared by every locale (shell, forms, section
 * chrome). Page copy lives in per-locale page defaults, not here.
 *
 * Works in server and client components alike, without a provider:
 * server code passes the route locale, client code uses `useT()`.
 */
const MESSAGES: Record<Locale, UiMessages> = { en, fr, nl };

export function getT(locale: Locale) {
  return createTranslator({ locale, messages: MESSAGES[locale] });
}

export type UiTranslator = ReturnType<typeof getT>;

/** BCP 47 tag for Intl formatting (numbers, dates). */
export const INTL_LOCALE: Record<Locale, string> = {
  en: "en-GB",
  fr: "fr-BE",
  nl: "nl-BE",
};
