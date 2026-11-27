/** Pure frame-driven state. No wall clock, network, randomness, or timer. */
export const captureScenarios = [
  "creation",
  "execution",
  "connection",
  "sharing",
] as const;
export type CaptureScenario = (typeof captureScenarios)[number];
export const captureDurationFrames = 150;
export function clampFrame(frame: number, duration = captureDurationFrames) {
  return Number.isFinite(frame)
    ? Math.max(0, Math.min(duration, Math.floor(frame)))
    : 0;
}
export function resolveCaptureFrame(scenario: CaptureScenario, frame: number) {
  const f = clampFrame(frame);
  return {
    scenario,
    frame: f,
    phase: f < 35 ? "before" : f < 100 ? "action" : "after",
    promptProgress: Math.min(1, Math.max(0, (f - 10) / 70)),
    connection: (f < 35
      ? "disconnected"
      : f < 65
        ? "authorizing"
        : f < 100
          ? "connecting"
          : "connected") as
      | "disconnected"
      | "authorizing"
      | "connecting"
      | "connected",
    save: (f < 75 ? "draft" : f < 100 ? "saving" : "saved") as
      | "draft"
      | "saving"
      | "saved",
    completedSteps: f < 50 ? 0 : f < 85 ? 1 : f < 115 ? 2 : 3,
    builderHighlight:
      f < 35 ? "basics" : f < 75 ? "behavior" : f < 100 ? "tools" : undefined,
    titleOpacity: Math.min(1, f / 12),
    titleTranslateY: 24 * (1 - Math.min(1, f / 12)),
  };
}
