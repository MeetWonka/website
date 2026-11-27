import type { Locale } from "@/i18n/config";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import type { CtaButtonData, SharedLinks } from "@/lib/types";
import { isWonkaTrialRegisterUrl } from "@/lib/wonka-trial-register";

/** Maps legacy trial-register header links to the team booking calendar. */
export function resolveHeaderCta(
  headerCta: CtaButtonData | null | undefined,
  sharedLinks: SharedLinks | null | undefined,
  locale: Locale,
): CtaButtonData | null {
  if (!headerCta?.href) return headerCta ?? null;
  if (isWonkaTrialRegisterUrl(headerCta.href)) {
    return {
      ...headerCta,
      href: resolveMeetingUrl(sharedLinks, "wonka-chat", locale),
    };
  }
  return headerCta;
}