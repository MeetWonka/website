import type { Locale } from "@/i18n/config";
import { isBookingUrl } from "@/lib/resolve-meeting-url";
import type { CtaButtonData, SharedLinks } from "@/lib/types";
import {
  isWonkaTrialRegisterUrl,
  WONKA_CHAT_LOGIN_URL,
} from "@/lib/wonka-trial-register";

/** Maps legacy header “get started” links (register or booking) to WonkaChat login. */
export function resolveHeaderCta(
  headerCta: CtaButtonData | null | undefined,
  _sharedLinks: SharedLinks | null | undefined,
  _locale: Locale,
): CtaButtonData | null {
  if (!headerCta?.href) return headerCta ?? null;
  if (isWonkaTrialRegisterUrl(headerCta.href) || isBookingUrl(headerCta.href)) {
    return {
      ...headerCta,
      href: WONKA_CHAT_LOGIN_URL,
    };
  }
  return headerCta;
}