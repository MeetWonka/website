import type { Locale } from "@/i18n/config";
import { INTL_LOCALE } from "@/i18n/ui";

/**
 * Euro amount with 2 decimals. EN keeps the historical "€ 1,234.56" output;
 * FR uses the idiomatic suffix ("1 234,56 €"), NL the Belgian prefix ("€ 1.234,56").
 */
export function formatEuro(amount: number, locale: Locale = "en"): string {
  const value = amount.toLocaleString(INTL_LOCALE[locale], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return locale === "fr" ? `${value} €` : `€ ${value}`;
}

/** @deprecated Use formatEuro */
export const formatEur = formatEuro;
