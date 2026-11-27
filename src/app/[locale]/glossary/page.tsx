import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { GLOSSARY_TERMS_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { hubPath, itemPath } from "@/lib/locale-path";
import { HubPopularLinks } from "@/components/sections/hub-popular-links";
import { getHubPopularLinks } from "@/lib/hub-popular-links";
import type { Locale } from "@/i18n/config";
import type { GlossaryTerm } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale }> }

const copy = {
  en: {
    eyebrow: "Learn",
    title: "Enterprise AI glossary for private agents and workflows",
    subtitle: "Clear definitions for the concepts behind AI agents, RAG, automation, governance and private enterprise AI.",
    core: "Core concepts",
    all: "All terms",
    popular: "Popular AI guides",
    empty: "No terms yet.",
    pillars: ["Agents", "RAG", "Automation", "Governance", "Private AI"],
    explainer: "This glossary is written for teams evaluating enterprise AI in real operating environments. Each definition connects the concept to private data, existing tools, workflow design and the controls needed before AI reaches production.",
    seo: {
      metaTitle: "Enterprise AI Glossary | Wonka AI",
      metaDescription: "Clear definitions of AI agents, RAG, MCP, governance, private LLMs and workflow automation for enterprise teams.",
      ogImage: null,
    },
  },
  fr: {
    eyebrow: "Apprendre",
    title: "Glossaire IA entreprise pour agents privés et workflows",
    subtitle: "Des définitions claires pour comprendre agents IA, RAG, automatisation, gouvernance et IA privée en entreprise.",
    core: "Concepts clés",
    all: "Tous les termes",
    popular: "Guides IA populaires",
    empty: "Aucun terme pour le moment.",
    pillars: ["Agents", "RAG", "Automatisation", "Gouvernance", "IA privée"],
    explainer: "Ce glossaire est conçu pour les équipes qui évaluent l'IA entreprise dans des environnements réels. Chaque définition relie le concept aux données privées, aux outils existants, aux workflows et aux contrôles nécessaires avant la production.",
    seo: {
      metaTitle: "Glossaire IA entreprise | Wonka AI",
      metaDescription: "Définitions claires des agents IA, du RAG, du MCP, de la gouvernance, des LLM privés et de l'automatisation enterprise.",
      ogImage: null,
    },
  },
  nl: {
    eyebrow: "Leren",
    title: "Enterprise AI-woordenlijst voor private agents en workflows",
    subtitle: "Heldere definities voor AI-agents, RAG, automatisering, governance en private enterprise AI.",
    core: "Kernbegrippen",
    all: "Alle termen",
    popular: "Populaire AI-gidsen",
    empty: "Nog geen termen.",
    pillars: ["Agents", "RAG", "Automatisering", "Governance", "Private AI"],
    explainer: "Deze woordenlijst is gemaakt voor teams die enterprise AI beoordelen in echte operationele omgevingen. Elke definitie koppelt het concept aan private data, bestaande tools, workflowontwerp en controles voor productie.",
    seo: {
      metaTitle: "Enterprise AI-woordenlijst | Wonka AI",
      metaDescription: "Heldere definities van AI-agents, RAG, MCP, governance, private LLMs en workflowautomatisering voor enterprise teams.",
      ogImage: null,
    },
  },
} satisfies Record<Locale, { eyebrow: string; title: string; subtitle: string; core: string; all: string; popular: string; empty: string; pillars: string[]; explainer: string; seo: { metaTitle: string; metaDescription: string; ogImage: null } }>;

const prioritySlugs = ["ai-agent", "agentic-ai", "ai-agents", "agentic-rag", "workflow-automation", "multi-agent-system"];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(copy[locale].seo, {
    path: hubPath("glossary", locale),
    hreflang: "hub",
    fallbackTitle: "Enterprise AI Glossary | Wonka AI",
    locale,
  });
}

export default async function GlossairePage({ params }: PageProps) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: GLOSSARY_TERMS_QUERY, params: { language: locale } });
  const terms = (data ?? []) as GlossaryTerm[];
  const l = copy[locale];
  const coreTerms = terms
    .filter((term) => prioritySlugs.includes(term.slug.current))
    .sort((a, b) => prioritySlugs.indexOf(a.slug.current) - prioritySlugs.indexOf(b.slug.current));

  return (
    <main className="bg-background">
      <section className="border-b border-dashed border-border">
        <div className="mx-auto max-w-[1200px] px-6 pb-14 pt-32 md:pt-36">
          <p className="type-eyebrow text-text/40">{l.eyebrow}</p>
          <h1 className="mt-4 type-h2 max-w-4xl">{l.title}</h1>
          <p className="mt-5 max-w-3xl type-body leading-relaxed text-text/60">{l.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {l.pillars.map((pillar) => (
              <span key={pillar} className="rounded-full border border-border px-3 py-1 type-eyebrow text-text/45">
                {pillar}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-14">
        {!terms.length ? (
          <p className="type-body text-text/40">{l.empty}</p>
        ) : (
          <>
            {coreTerms.length ? (
              <div className="mb-14">
                <h2 className="type-h5 mb-6">{l.core}</h2>
                <p className="mb-6 max-w-3xl type-paragraph-m leading-relaxed text-text/60">{l.explainer}</p>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {coreTerms.map((term) => (
                    <a
                      key={term._id}
                      href={itemPath("glossary", locale, term.slug.current)}
                      className="group rounded-lg border border-border bg-mid-gray p-5 transition-colors hover:border-accent hover:bg-background"
                    >
                      <h3 className="type-h6 group-hover:text-accent">{term.term}</h3>
                      <p className="mt-3 line-clamp-4 type-paragraph-m text-text/60">{term.shortDefinition}</p>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            <h2 className="type-h5 mb-6">{l.all}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {terms.map((term) => (
                <a
                  key={term._id}
                  href={itemPath("glossary", locale, term.slug.current)}
                  className="group rounded-lg border border-border p-5 transition-colors hover:border-accent"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="type-body font-medium group-hover:text-accent">{term.term}</h3>
                    <span className="type-eyebrow text-text/30">{term.slug.current}</span>
                  </div>
                  <p className="mt-3 type-paragraph-m text-text/60">{term.shortDefinition}</p>
                </a>
              ))}
            </div>
            <HubPopularLinks title={l.popular} links={getHubPopularLinks(locale)} />
          </>
        )}
      </section>
    </main>
  );
}
