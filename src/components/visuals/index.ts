import { CoordinatingAppsVisual } from "./coordinating-apps/coordinating-apps-visual";

export { CoordinatingAppsVisual };

/** Registry of reusable page visuals — import from here to pick one for a route. */
export const VISUALS = {
  coordinatingApps: CoordinatingAppsVisual,
} as const;

export type VisualId = keyof typeof VISUALS;
