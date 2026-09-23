import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import type { SiteSettings } from "@/lib/types";
import type { MeetingContext } from "@/lib/shared-links-defaults";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const context = (searchParams.get("context") || "default") as MeetingContext;

  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const settings = data as SiteSettings | null;

  const url = resolveMeetingUrl(settings?.sharedLinks, context);

  return Response.json({ url });
}
