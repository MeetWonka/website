export const DEFAULT_MEETING_URLS = {
  team: "https://outlook.office.com/book/WonkaAITeam1@meetwonka.com/?ismsaljsauthenabled",
  startAi:
    "https://outlook.office.com/book/WonkaAIStartAI@meetwonka.com/?ismsaljsauthenabled",
  wonkaBuild:
    "https://outlook.office.com/book/WonkaAIWonkaBuild@meetwonka.com/?ismsaljsauthenabled",
  wonkaChat:
    "https://outlook.office.com/book/WonkaAIWonkaChat@meetwonka.com/?ismsaljsauthenabled",
  // French team calendar (never the HQ one); env var overrides for testing
  france:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_FRANCE_MEETING_URL) ||
    "https://bookings.cloud.microsoft/book/WonkaAIFrance@meetwonka.com/?ismsaljsauthenabled",
} as const;

export type MeetingContext = "default" | "start-ai" | "wonka-build" | "wonka-chat" | "france";
