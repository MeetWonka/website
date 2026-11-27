import { DEFAULT_MEETING_URLS, type MeetingContext } from "@/lib/shared-links-defaults";
import type { Locale } from "@/i18n/config";
import type { SharedLinks } from "@/lib/types";

/**
 * Booking link for a meeting CTA. Only pages that pass context `"france"`
 * (the `/france*` market pages) use the French team calendar. Translated
 * `/fr/*` pages use the same calendars as English and Dutch.
 */
export function resolveMeetingUrl(
  sharedLinks: SharedLinks | null | undefined,
  context: MeetingContext = "default",
  _locale?: Locale,
): string {
  switch (context) {
    case "start-ai":
      return (
        sharedLinks?.startAiMeetingUrl ??
        sharedLinks?.meetingUrl ??
        DEFAULT_MEETING_URLS.startAi
      );
    case "wonka-build":
      return (
        sharedLinks?.wonkaBuildMeetingUrl ??
        sharedLinks?.meetingUrl ??
        DEFAULT_MEETING_URLS.wonkaBuild
      );
    case "wonka-chat":
      return (
        sharedLinks?.wonkaChatMeetingUrl ??
        sharedLinks?.meetingUrl ??
        DEFAULT_MEETING_URLS.wonkaChat
      );
    case "france":
      // France must have its own URL set in Sanity or env var; never fall back to HQ
      return (
        sharedLinks?.franceMeetingUrl ??
        DEFAULT_MEETING_URLS.france
      );
    default:
      return sharedLinks?.meetingUrl ?? DEFAULT_MEETING_URLS.team;
  }
}

/** For routes that only fetch the team meeting URL scalar from Sanity. */
export function resolveTeamMeetingUrl(
  teamUrl: string | null | undefined,
  locale?: Locale,
): string {
  if (locale === "fr") return DEFAULT_MEETING_URLS.france;
  return teamUrl ?? DEFAULT_MEETING_URLS.team;
}

/** True for Microsoft Bookings links (the team calendars). */
export function isBookingUrl(href: string | null | undefined): boolean {
  return Boolean(href && /outlook\.office\.com\/book|bookings\.cloud\.microsoft\/book/.test(href));
}
