export const HOMEPAGE_HERO_VARIANTS = [
  "control",
  "product-side",
  "product-below",
  "voice-action",
  "customer-proof",
] as const;

export type HomepageHeroVariant = (typeof HOMEPAGE_HERO_VARIANTS)[number];

export function isHomepageHeroVariant(
  value: string | boolean | undefined | null,
): value is HomepageHeroVariant {
  return (
    typeof value === "string" &&
    HOMEPAGE_HERO_VARIANTS.includes(value as HomepageHeroVariant)
  );
}
