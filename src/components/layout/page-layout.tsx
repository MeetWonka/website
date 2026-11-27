import { sanityFetch, SanityLive } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import type { Locale } from "@/i18n/config";
import type { SiteSettings } from "@/lib/types";
import { resolveNavigation } from "@/lib/nav-defaults";
import { resolveHeaderCta } from "@/lib/resolve-header-cta";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { Header, type HeaderVariant } from "./header";
import { Footer } from "./footer";

async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data as SiteSettings | null;
}

interface PageLayoutProps {
  children: React.ReactNode;
  headerVariant?: HeaderVariant;
  locale?: Locale;
}

export async function PageLayout({
  children,
  headerVariant = "overlay-dark",
  locale = "en",
}: PageLayoutProps) {
  const settings = await getSiteSettings();
  const navItems = resolveNavigation(settings?.navigation, locale);
  return (
    <div className="relative">
      <Header
        navItems={navItems}
        headerCta={resolveHeaderCta(
          settings?.headerCta,
          settings?.sharedLinks,
          locale,
        )}
        franceMeetingUrl={resolveMeetingUrl(settings?.sharedLinks, "france")}
        variant={headerVariant}
        locale={locale}
      />
      <main>{children}</main>
      <Footer
        navItems={navItems}
        linkGroups={settings?.footerLinkGroups ?? null}
        locale={locale}
      />
      <SanityLive />
    </div>
  );
}
