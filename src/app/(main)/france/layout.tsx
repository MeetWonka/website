import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import type { SiteSettings } from "@/lib/types";
import { resolveNavigation } from "@/lib/nav-defaults";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data as SiteSettings | null;
}

export default async function FranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  // For France routes, don't show the header CTA (which would point to HQ booking)
  // The diagnostic CTA is the only call-to-action on these pages
  return (
    <div className="relative">
      <Header
        navItems={resolveNavigation(settings?.navigation)}
        headerCta={null}
        variant="overlay-dark"
      />
      <main>{children}</main>
      <Footer
        navItems={resolveNavigation(settings?.navigation)}
        linkGroups={settings?.footerLinkGroups ?? null}
      />
    </div>
  );
}
