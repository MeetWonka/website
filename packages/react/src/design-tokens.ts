/** Stable class contracts used by Wonka’s React primitives and app adapters. */
export const radius = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  full: "rounded-full",
} as const;

export type HeadingRole = "hero" | "section" | "subsection" | "card";

export const headingClass: Record<HeadingRole, string> = {
  hero: "type-h3",
  section: "type-h4",
  subsection: "type-h5",
  card: "type-h6",
};
