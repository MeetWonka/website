import type { SectionHeaderData } from "@/lib/types";

export function resolveString(
  value: string | null | undefined,
  fallback: string,
): string {
  return value?.trim() ? value : fallback;
}

export function resolveOptionalString(
  value: string | null | undefined,
  fallback: string | null = null,
): string | null {
  return value?.trim() ? value : fallback;
}

export function resolveItems<T>(
  cms: T[] | null | undefined,
  defaults: T[],
): T[] {
  return cms?.length ? cms : defaults;
}

export function resolveSectionHeader(
  cms: SectionHeaderData | null | undefined,
  defaults: SectionHeaderData,
): SectionHeaderData {
  return {
    eyebrow: resolveOptionalString(cms?.eyebrow, defaults.eyebrow),
    heading: resolveOptionalString(cms?.heading, defaults.heading),
    body: resolveOptionalString(cms?.body, defaults.body),
    supplemental: resolveOptionalString(
      cms?.supplemental,
      defaults.supplemental ?? null,
    ),
  };
}

export function hasSanityImage(
  image: { asset?: unknown } | null | undefined,
): boolean {
  return Boolean(image?.asset);
}
