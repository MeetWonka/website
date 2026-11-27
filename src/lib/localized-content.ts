import { sanityFetch } from "@sanity/lib/live";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/ui";
import type { SharedLinks } from "@/lib/types";

/** Sanity singleton ids per page. FR/NL live next to EN as `<id>-fr` / `<id>-nl`. */
export type PageDocBase =
  | "homepageContent"
  | "wonkaChatContent"
  | "startAiContent"
  | "wonkaBuildContent"
  | "wonkaChatOdooContent"
  | "contactPageContent";

export function pageDocId(base: PageDocBase, locale: Locale): string {
  return locale === "en" ? base : `${base}-${locale}`;
}

/** Fetch a page singleton for `locale`. Returns null when no translation exists yet. */
export async function fetchPageDoc<T>(
  query: string,
  base: PageDocBase,
  locale: Locale,
): Promise<T | null> {
  const { data } = await sanityFetch({
    query,
    params: { id: pageDocId(base, locale) },
  });
  return (data as T | null) ?? null;
}

/**
 * CTA label for meeting buttons. The Sanity `sharedLinks.meetingLabel`
 * is English-only, so translated locales use the UI dictionary.
 */
export function resolveMeetingLabel(
  sharedLinks: SharedLinks | null | undefined,
  locale: Locale,
): string | null {
  if (locale === "en") return sharedLinks?.meetingLabel ?? null;
  return getT(locale)("common.bookMeeting");
}
