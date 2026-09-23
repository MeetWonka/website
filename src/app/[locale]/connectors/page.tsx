import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@sanity/lib/live";
import { CONNECTOR_PAGES_QUERY } from "@sanity/lib/queries";
import { urlFor } from "@sanity/lib/image";
import { buildMetadata } from "@/lib/seo";
import { hubPath, itemPath } from "@/lib/locale-path";
import { HubPopularLinks } from "@/components/sections/hub-popular-links";
import { getHubPopularLinks } from "@/lib/hub-popular-links";
import type { Locale } from "@/i18n/config";
import type { ConnectorPage } from "@/lib/types";

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
    categories: ["CRM", "Documents", "Project management", "Communication", "ERP", "Knowledge"],
    empty: "No connectors yet.",
    explainerTitle: "What a Wonka connector does",
    explainerBody: "A Wonka connector links private AI agents to the tools where company work already happens. Instead of asking teams to move sensitive data into a generic assistant, Wonka keeps the operational context connected to trusted systems such as CRM, ERP, document storage and communication platforms. Each connector is designed to preserve permissions, expose sources, and make answers usable inside real workflows rather than isolated chat sessions. This matters because enterprise AI adoption depends on trust: users need to know which system supplied the context, administrators need to know which permissions apply, and managers need to see whether the workflow produces measurable operational value.",
    explainerPoints: ["Source-aware answers from business tools", "Governed workflows with human review", "Private deployment for enterprise data"],
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
    categories: ["CRM", "Documents", "Gestion projet", "Communication", "ERP", "Connaissance"],
    empty: "Aucun connecteur pour le moment.",
    explainerTitle: "Ce que fait un connecteur Wonka",
    explainerBody: "Un connecteur Wonka relie des agents IA privés aux outils où le travail existe déjà. Au lieu de déplacer des données sensibles dans un assistant générique, Wonka garde le contexte opérationnel connecté aux systèmes de confiance comme le CRM, l'ERP, les documents et les outils de communication. Chaque connecteur est pensé pour préserver les permissions, afficher les sources et rendre les réponses utiles dans de vrais workflows plutôt que dans des conversations isolées. C'est essentiel pour l'adoption : les utilisateurs doivent savoir quel système fournit le contexte, les administrateurs doivent comprendre les permissions appliquées et les managers doivent mesurer la valeur opérationnelle du workflow.",
    explainerPoints: ["Réponses sourcées depuis les outils métier", "Workflows gouvernés avec validation humaine", "Déploiement privé pour les données enterprise"],
    seo: {
      metaTitle: "Connecteurs IA et intégrations | Wonka AI",
      metaDescription: "Explorez les connecteurs Wonka pour Odoo, SharePoint, Salesforce, Slack, Google Drive, HubSpot et les systèmes enterprise.",
      ogImage: null,
    },
  },
  nl: {
    eyebrow: "Integraties",
    title: "Koppel private AI-agents aan je bedrijfsstack",
    subtitle: "Ontdek de tools die Wonka kan verbinden voor private search, samenvattingen, workflowautomatisering en beheerde AI-agents.",
    popular: "Populaire integraties",
    popularGuides: "Populaire integratiegidsen",
    all: "Alle connectoren",
    categories: ["CRM", "Documenten", "Projectmanagement", "Communicatie", "ERP", "Kennis"],
    empty: "Nog geen connectoren.",
    explainerTitle: "Wat een Wonka-connector doet",
    explainerBody: "Een Wonka-connector koppelt private AI-agents aan de tools waar het werk al gebeurt. Teams hoeven gevoelige data niet naar een generieke assistent te verplaatsen: Wonka houdt operationele context verbonden met vertrouwde systemen zoals CRM, ERP, documentopslag en communicatietools. Elke connector is ontworpen om permissies te respecteren, bronnen zichtbaar te maken en antwoorden bruikbaar te maken in echte workflows in plaats van losse chatsessies. Dat is belangrijk voor adoptie: gebruikers moeten weten welk systeem context leverde, beheerders moeten de permissies begrijpen en managers moeten zien of de workflow meetbare operationele waarde oplevert.",
    explainerPoints: ["Antwoorden met bronnen uit bedrijfstools", "Beheerste workflows met menselijke controle", "Private deployment voor enterprise data"],
    seo: {
      metaTitle: "AI-integraties en connectoren | Wonka AI",
      metaDescription: "Ontdek Wonka AI-connectoren voor Odoo, SharePoint, Salesforce, Slack, Google Drive, HubSpot en enterprise systemen.",
      ogImage: null,
    },
  },
} satisfies Record<Locale, Record<string, string | string[] | { metaTitle: string; metaDescription: string; ogImage: null }>>;

const prioritySlugs = ["odoo", "sharepoint", "salesforce", "slack", "hubspot", "google-drive"];

function logoUrl(connector: ConnectorPage): string | null {
  return connector.toolLogo ? urlFor(connector.toolLogo).width(96).height(96).fit("max").url() : null;
}

function ConnectorLogo({ connector }: { connector: ConnectorPage }) {
  const src = logoUrl(connector);
  return (
    <div className="grid size-12 shrink-0 place-items-center rounded-md border border-border bg-background">
      {src ? (
        <Image
          src={src}
          alt={connector.toolLogo?.alt || `${connector.toolName} logo`}
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
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
  const connectors = (data ?? []) as ConnectorPage[];
  const labels = copy[locale];
  const popular = connectors
    .filter((connector) => prioritySlugs.includes(connector.slug.current))
    .sort((a, b) => prioritySlugs.indexOf(a.slug.current) - prioritySlugs.indexOf(b.slug.current));

  return (
    <main className="bg-background">
      <section className="border-b border-dashed border-border">
        <div className="mx-auto max-w-[1200px] px-6 pb-14 pt-32 md:pt-36">
          <p className="type-eyebrow text-text/40">{labels.eyebrow}</p>
          <h1 className="mt-4 type-h2 max-w-4xl">{labels.title}</h1>
          <p className="mt-5 max-w-3xl type-body leading-relaxed text-text/60">{labels.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {(labels.categories as string[]).map((category) => (
              <span key={category} className="rounded-full border border-border px-3 py-1 type-eyebrow text-text/45">
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-14">
        {!connectors.length ? (
          <p className="type-body text-text/40">{labels.empty}</p>
        ) : (
          <>
            <div className="mb-14 grid gap-6 rounded-lg border border-border bg-mid-gray p-6 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <h2 className="type-h5">{labels.explainerTitle}</h2>
                <p className="mt-4 type-paragraph-m leading-relaxed text-text/65">{labels.explainerBody}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {(labels.explainerPoints as string[]).map((point) => (
                  <p key={point} className="rounded-md border border-border bg-background p-4 type-paragraph-m-bold">{point}</p>
                ))}
              </div>
            </div>

            {popular.length ? (
              <div className="mb-14">
                <h2 className="type-h5 mb-6">{labels.popular}</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {popular.map((connector) => (
                    <a
                      key={connector._id}
                      href={itemPath("connectors", locale, connector.slug.current)}
                      className="group flex gap-4 rounded-lg border border-border bg-mid-gray p-5 transition-colors hover:border-accent hover:bg-background"
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

            <div>
              <h2 className="type-h5 mb-6">{labels.all}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {connectors.map((connector) => (
                  <a
                    key={connector._id}
                    href={itemPath("connectors", locale, connector.slug.current)}
                    className="group flex min-h-40 flex-col rounded-lg border border-border p-5 transition-colors hover:border-accent"
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <ConnectorLogo connector={connector} />
                      <h3 className="type-body font-medium group-hover:text-accent">{connector.toolName}</h3>
                    </div>
                    <p className="type-paragraph-m text-text/60">{connector.tagline}</p>
                    {connector.tags?.length ? (
                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        {connector.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-full bg-mid-gray px-2 py-1 type-eyebrow text-text/40">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </a>
                ))}
              </div>
            </div>
            <HubPopularLinks title={labels.popularGuides as string} links={getHubPopularLinks(locale)} />
          </>
        )}
      </section>
    </main>
  );
}
