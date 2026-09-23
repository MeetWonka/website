import { DEFAULT_MEETING_URLS, type MeetingContext } from "@/lib/shared-links-defaults";
import type { SharedLinks } from "@/lib/types";

export function resolveMeetingUrl(
  sharedLinks: SharedLinks | null | undefined,
  context: MeetingContext = "default",
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
): string {
  return teamUrl ?? DEFAULT_MEETING_URLS.team;
}
