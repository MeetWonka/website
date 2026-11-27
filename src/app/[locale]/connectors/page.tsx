import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@sanity/lib/live";
import { CONNECTOR_PAGES_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { hubPath, itemPath } from "@/lib/locale-path";
import { HubPopularLinks } from "@/components/sections/hub-popular-links";
import { ConnectorsDirectory } from "@/components/sections/connectors-directory";
import { getHubPopularLinks } from "@/lib/hub-popular-links";
import type { Locale } from "@/i18n/config";
import type { ConnectorPage } from "@/lib/types";
import { resolveConnectorList, type ConnectorView } from "@/lib/resolve-connectors";
import { radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale }> }

const copy = {
  en: {
    eyebrow: "Integrations",
    title: "Connect private AI agents to your company stack",
    subtitle: "Explore the tools Wonka can connect to for private search, summaries, workflow automation and governed AI agents.",
    popular: "Popular integrations",
    popularGuides: "Popular integration guides",
    all: "All connectors",
    empty: "No connectors yet.",
    search: "Search integrations",
    noResults: "No integrations match your search.",
    seo: {
      metaTitle: "AI Integrations and Connectors | Wonka AI",
      metaDescription: "Explore Wonka AI connectors for Odoo, SharePoint, Salesforce, Slack, Google Drive, HubSpot and other enterprise systems.",
      ogImage: null,
    },
  },
  fr: {
    eyebrow: "Intégrations",
    title: "Connectez des agents IA privés à votre stack entreprise",
    subtitle: "Explorez les outils que Wonka peut connecter pour la recherche privée, les résumés, l'automatisation et les agents IA gouvernés.",
    popular: "Intégrations populaires",
    popularGuides: "Guides d'intégration populaires",
    all: "Tous les connecteurs",
    empty: "Aucun connecteur pour le moment.",
    search: "Rechercher une intégration",
    noResults: "Aucune intégration ne correspond à votre recherche.",
    seo: {
      metaTitle: "Connecteurs IA et intégrations | Wonka AI",
      metaDescription: "Explorez les connecteurs Wonka pour Odoo, SharePoint, Salesforce, Slack, Google Drive, HubSpot et les systèmes enterprise.",
      ogImage: null,
    },
  },
  nl: {
    eyebrow: "Integraties",
    title: "Koppel private AI-agents aan uw bedrijfsstack",
    subtitle: "Ontdek de tools die Wonka kan verbinden voor private search, samenvattingen, workflowautomatisering en beheerde AI-agents.",
    popular: "Populaire integraties",
    popularGuides: "Populaire integratiegidsen",
    all: "Alle connectoren",
    empty: "Nog geen connectoren.",
    search: "Zoek een integratie",
    noResults: "Geen integraties gevonden voor uw zoekopdracht.",
    seo: {
      metaTitle: "AI-integraties en connectoren | Wonka AI",
      metaDescription: "Ontdek Wonka AI-connectoren voor Odoo, SharePoint, Salesforce, Slack, Google Drive, HubSpot en enterprise systemen.",
      ogImage: null,
    },
  },
} satisfies Record<Locale, Record<string, string | string[] | { metaTitle: string; metaDescription: string; ogImage: null }>>;

const prioritySlugs = ["odoo", "sharepoint", "salesforce", "slack", "hubspot", "google-drive"];

function ConnectorLogo({ connector, size = "md" }: { connector: ConnectorView; size?: "sm" | "md" }) {
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center border border-border bg-background",
        radius.sm,
        size === "sm" ? "size-10" : "size-12",
      )}
    >
      {connector.logoSrc ? (
        <Image
          src={connector.logoSrc}
          alt={connector.logoAlt}
          width={32}
          height={32}
          unoptimized
          className={cn("object-contain", size === "sm" ? "size-6" : "size-8")}
        />
      ) : (
        <span className="type-paragraph-m-bold text-text/40">{connector.toolName.slice(0, 1)}</span>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(copy[locale].seo as { metaTitle: string; metaDescription: string; ogImage: null }, {
    path: hubPath("connectors", locale),
    hreflang: "hub",
    fallbackTitle: "AI Integrations and Connectors | Wonka AI",
    locale,
  });
}

export default async function ConnectorsPage({ params }: PageProps) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: CONNECTOR_PAGES_QUERY, params: { language: locale } });
  const connectors = resolveConnectorList((data ?? []) as ConnectorPage[], locale);
  const labels = copy[locale];
  const popular = connectors
    .filter((connector) => prioritySlugs.includes(connector.slug))
    .sort((a, b) => prioritySlugs.indexOf(a.slug) - prioritySlugs.indexOf(b.slug));
  return (
    <main className="bg-background">
      <section className="border-b border-dashed border-border">
        <div className="mx-auto max-w-[1200px] px-6 pb-14 pt-32 md:pt-36">
          <p className="type-eyebrow text-text/40">{labels.eyebrow}</p>
          <h1 className="mt-4 type-h2 max-w-4xl">{labels.title}</h1>
          <p className="mt-5 max-w-3xl type-body leading-relaxed text-text/60">{labels.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-14">
        {!connectors.length ? (
          <p className="type-body text-text/40">{labels.empty}</p>
        ) : (
          <>
            {popular.length ? (
              <div className="mb-14">
                <h2 className="type-h5 mb-6">{labels.popular}</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {popular.map((connector) => (
                    <a
                      key={connector.id}
                      href={itemPath("connectors", locale, connector.slug)}
                      className={cn(
                        "group flex gap-4 border border-border bg-mid-gray p-5 transition-colors hover:border-accent hover:bg-background",
                        radius.sm,
                      )}
                    >
                      <ConnectorLogo connector={connector} />
                      <div>
                        <h3 className="type-body font-medium group-hover:text-accent">{connector.toolName}</h3>
                        <p className="mt-1 line-clamp-2 type-paragraph-m text-text/55">{connector.tagline}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            <ConnectorsDirectory
              title={labels.all}
              searchPlaceholder={labels.search}
              emptyLabel={labels.noResults}
              items={connectors.map((connector) => ({
                id: connector.id,
                href: itemPath("connectors", locale, connector.slug),
                toolName: connector.toolName,
                description: connector.description,
                tags: connector.tags,
                logoSrc: connector.logoSrc,
                logoAlt: connector.logoAlt,
              }))}
            />
            <HubPopularLinks title={labels.popularGuides as string} links={getHubPopularLinks(locale)} />
          </>
        )}
      </section>
    </main>
  );
}
