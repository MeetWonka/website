import { sanityFetch, SanityLive } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import type { SiteSettings } from "@/lib/types";
import { resolveNavigation } from "@/lib/nav-defaults";
import { Header, type HeaderVariant } from "./header";
import { Footer } from "./footer";

async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data as SiteSettings | null;
}

interface PageLayoutProps {
  children: React.ReactNode;
  headerVariant?: HeaderVariant;
}

export async function PageLayout({
  children,
  headerVariant = "overlay-dark",
}: PageLayoutProps) {
  const settings = await getSiteSettings();

  return (
    <div className="relative">
      <Header
        navItems={resolveNavigation(settings?.navigation)}
        headerCta={settings?.headerCta}
        variant={headerVariant}
      />
      <main>{children}</main>
      <Footer navItems={resolveNavigation(settings?.navigation)} linkGroups={settings?.footerLinkGroups ?? null} />
      <SanityLive />
    </div>
  );
}
