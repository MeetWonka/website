import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { GLOSSARY_TERM_QUERY, GLOSSARY_SLUGS_QUERY, RELATED_BLOG_POSTS_QUERY, RELATED_CONNECTOR_PAGES_QUERY, RELATED_COMPARISON_PAGES_QUERY, MEETING_URL_QUERY } from "@sanity/lib/queries";
import { client } from "@sanity/lib/client";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { hubPath, itemPath } from "@/lib/locale-path";
import { getContentLanguages } from "@/lib/content-languages";
import { PortableText } from "@portabletext/react";
import { DefinedTermSchema, FaqSchema, BreadcrumbSchema } from "@/components/json-ld";
import { WonkaSolves } from "@/components/sections/wonka-solves";
import { Cta } from "@/components/sections/cta";
import { InternalLinkGrid } from "@/components/sections/internal-link-grid";
import { getEvergreenInternalLinks } from "@/lib/internal-links";
import { resolveTeamMeetingUrl } from "@/lib/resolve-meeting-url";
import type { Locale } from "@/i18n/config";
import type { BlogPost, ComparisonPage, ConnectorPage, GlossaryTerm } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  const data = await client.fetch(GLOSSARY_SLUGS_QUERY);
  return (data ?? []).map((item: { slug: { current: string }; language: string }) => ({ locale: item.language, slug: item.slug.current }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: GLOSSARY_TERM_QUERY, params: { slug, language: locale } });
  if (!data) return {};
  const t = data as GlossaryTerm;
  const siteUrl = getSiteUrl();
  const languages = await getContentLanguages(siteUrl, "glossary", slug);
  return buildMetadata(t.seo ?? null, { path: itemPath('glossary', locale, slug), fallbackTitle: t.term, locale, languages });
}

const relatedLabels = {
  en: "Related articles",
  fr: "Articles liés",
  nl: "Gerelateerde artikelen",
};

const relatedConnectorLabels = {
  en: "Related integrations",
  fr: "Intégrations liées",
  nl: "Gerelateerde integraties",
};

const relatedComparisonLabels = {
  en: "Related comparisons",
  fr: "Comparaisons liées",
  nl: "Gerelateerde vergelijkingen",
};

const parentLabels = {
  en: "Glossary",
  fr: "Glossaire",
  nl: "Woordenlijst",
};

const exploreMoreLabels = {
  en: "Explore related AI topics",
  fr: "Explorer les sujets IA liés",
  nl: "Verken gerelateerde AI-thema's",
};

const contextLabels = {
  en: {
    eyebrow: "Enterprise context",
    title: "Why this concept matters",
    body: "In enterprise AI projects, clear definitions prevent teams from buying or deploying the wrong thing. The same term can mean a product feature, a technical pattern, or an operating model. Wonka uses this glossary to connect concepts back to real workflows, private data, governance, and measurable adoption.",
    usage: "When evaluating this topic, look at the systems involved, the data boundaries, the human approval points, and whether the workflow can be repeated safely across teams.",
    rollout: "The practical question is not only what the concept means, but how it changes day-to-day work. A useful enterprise AI pattern should help teams retrieve trusted context, keep evidence visible, and turn repeated requests into workflows that administrators can monitor.",
  },
  fr: {
    eyebrow: "Contexte entreprise",
    title: "Pourquoi ce concept compte",
    body: "Dans les projets IA d'entreprise, des définitions claires évitent aux équipes d'acheter ou de déployer la mauvaise chose. Le même terme peut désigner une fonctionnalité produit, un pattern technique ou un modèle opérationnel. Wonka relie ces notions aux workflows réels, aux données privées, à la gouvernance et à l'adoption mesurable.",
    usage: "Pour évaluer ce sujet, regardez les systèmes concernés, les limites de données, les points de validation humaine et la capacité du workflow à être répété en sécurité par plusieurs équipes.",
    rollout: "La question pratique n'est pas seulement la définition du concept, mais son impact sur le travail quotidien. Un bon pattern IA enterprise doit aider les équipes à retrouver un contexte fiable, garder les preuves visibles et transformer les demandes répétées en workflows que les administrateurs peuvent suivre.",
  },
  nl: {
    eyebrow: "Enterprise context",
    title: "Waarom dit concept belangrijk is",
    body: "In enterprise AI-projecten voorkomen heldere definities dat teams de verkeerde oplossing kopen of uitrollen. Dezelfde term kan een productfunctie, een technisch patroon of een operationeel model betekenen. Wonka koppelt deze begrippen aan echte workflows, private data, governance en meetbare adoptie.",
    usage: "Beoordeel bij dit onderwerp welke systemen betrokken zijn, waar de datagrenzen liggen, welke menselijke goedkeuring nodig is en of de workflow veilig herhaald kan worden door meerdere teams.",
    rollout: "De praktische vraag is niet alleen wat het concept betekent, maar hoe het dagelijks werk verandert. Een bruikbaar enterprise AI-patroon helpt teams betrouwbare context op te halen, bewijs zichtbaar te houden en terugkerende vragen om te zetten in workflows die beheerders kunnen opvolgen.",
  },
} satisfies Record<Locale, { eyebrow: string; title: string; body: string; usage: string; rollout: string }>;

export default async function GlossaryTermPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: GLOSSARY_TERM_QUERY, params: { slug, language: locale } });
  if (!data) notFound();

  const t = data as GlossaryTerm;
  const [{ data: relatedPosts }, { data: relatedConnectors }, { data: relatedComparisons }, { data: meetingUrl }] = await Promise.all([
    sanityFetch({ query: RELATED_BLOG_POSTS_QUERY, params: { slug, language: locale, tags: t.tags ?? [] } }),
    sanityFetch({ query: RELATED_CONNECTOR_PAGES_QUERY, params: { slug, language: locale, tags: t.tags ?? [] } }),
    sanityFetch({ query: RELATED_COMPARISON_PAGES_QUERY, params: { slug, language: locale, tags: t.tags ?? [] } }),
    sanityFetch({ query: MEETING_URL_QUERY }),
  ]);

  const bookingUrl = resolveTeamMeetingUrl(meetingUrl as string | null);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${itemPath('glossary', locale, slug)}`;
  const parentUrl = `${siteUrl}${hubPath('glossary', locale)}`;
  const evergreenLinks = getEvergreenInternalLinks(locale, "glossary", itemPath("glossary", locale, slug));
  const context = contextLabels[locale];

  return (
    <>
      <main className="container mx-auto px-4 py-24 max-w-3xl">
        <DefinedTermSchema term={t.term} definition={t.shortDefinition} url={pageUrl} />
        <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: parentLabels[locale], url: parentUrl }, { name: t.term, url: pageUrl }]} />
        {t.faq?.length ? <FaqSchema items={t.faq} /> : null}

        <h1 className="type-h2 mb-4">{t.term}</h1>
        <p className="type-body text-text/60 mb-12">{t.shortDefinition}</p>

        <div className="prose prose-lg max-w-none">
          {t.body && <PortableText value={t.body as never} />}
        </div>

        <section className="mt-16 rounded-lg border border-border bg-mid-gray p-6">
          <p className="type-eyebrow text-text/40">{context.eyebrow}</p>
          <h2 className="mt-3 type-h5">{context.title}</h2>
          <div className="mt-5 grid gap-4">
            <p className="type-paragraph-m leading-relaxed text-text/65">{context.body}</p>
            <p className="type-paragraph-m leading-relaxed text-text/65">{context.usage}</p>
            <p className="type-paragraph-m leading-relaxed text-text/65">{context.rollout}</p>
          </div>
        </section>

        {t.faq?.length ? (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="type-h5 mb-8">{locale === "fr" ? "Questions fréquentes" : locale === "nl" ? "Veelgestelde vragen" : "Frequently asked questions"}</h2>
            {t.faq.map((item, i) => (
              <div key={i} className="mb-6">
                <h3 className="type-paragraph-m-bold mb-2">{item.question}</h3>
                <p className="type-paragraph-m text-text/60">{item.answer}</p>
              </div>
            ))}
          </section>
        ) : null}

        {(relatedPosts as BlogPost[])?.length ? (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="type-h6 mb-6 text-text/50">{relatedLabels[locale]}</h2>
            <div className="flex flex-col gap-4">
              {(relatedPosts as BlogPost[]).map((post) => (
                <a key={post._id} href={itemPath('blog', locale, post.slug.current)} className="group flex flex-col gap-1 rounded-lg border border-border p-4 hover:border-accent transition-colors">
                  <span className="type-eyebrow text-text/30">{post.category}</span>
                  <span className="type-paragraph-m-bold group-hover:text-accent transition-colors">{post.title}</span>
                  <span className="type-paragraph-s text-text/50">{post.excerpt}</span>
                </a>
              ))}
            </div>
          </section>
        ) : null}

        {((relatedConnectors as ConnectorPage[])?.length || (relatedComparisons as ComparisonPage[])?.length) ? (
          <section className="mt-16 border-t border-border pt-12">
            <div className="grid gap-8 md:grid-cols-2">
              {(relatedConnectors as ConnectorPage[])?.length ? (
                <div>
                  <h2 className="type-h6 mb-6 text-text/50">{relatedConnectorLabels[locale]}</h2>
                  <div className="flex flex-col gap-4">
                    {(relatedConnectors as ConnectorPage[]).map((connector) => (
                      <a key={connector._id} href={itemPath("connectors", locale, connector.slug.current)} className="group rounded-lg border border-border p-4 transition-colors hover:border-accent">
                        <span className="type-paragraph-m-bold group-hover:text-accent">{connector.toolName}</span>
                        <span className="mt-1 block type-paragraph-s text-text/50">{connector.tagline}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
              {(relatedComparisons as ComparisonPage[])?.length ? (
                <div>
                  <h2 className="type-h6 mb-6 text-text/50">{relatedComparisonLabels[locale]}</h2>
                  <div className="flex flex-col gap-4">
                    {(relatedComparisons as ComparisonPage[]).map((comparison) => (
                      <a key={comparison._id} href={itemPath("comparisons", locale, comparison.slug.current)} className="group rounded-lg border border-border p-4 transition-colors hover:border-accent">
                        <span className="type-eyebrow text-text/30">Wonka vs {comparison.competitor}</span>
                        <span className="mt-1 block type-paragraph-m-bold group-hover:text-accent">{comparison.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        <InternalLinkGrid title={exploreMoreLabels[locale]} links={evergreenLinks} className="mt-16" />

        <WonkaSolves locale={locale} meetingUrl={bookingUrl} />
      </main>
      <Cta meetingUrl={bookingUrl} />
    </>
  );
}
