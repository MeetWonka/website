import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { COMPARISON_PAGE_QUERY, COMPARISON_SLUGS_QUERY, MEETING_URL_QUERY, RELATED_BLOG_POSTS_QUERY, RELATED_CONNECTOR_PAGES_QUERY } from "@sanity/lib/queries";
import { client } from "@sanity/lib/client";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { hubPath, itemPath } from "@/lib/locale-path";
import { getContentLanguages } from "@/lib/content-languages";
import { resolveTeamMeetingUrl } from "@/lib/resolve-meeting-url";
import { PortableText } from "@portabletext/react";
import { ArticleSchema, FaqSchema, BreadcrumbSchema } from "@/components/json-ld";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { WonkaSolves } from "@/components/sections/wonka-solves";
import { Cta } from "@/components/sections/cta";
import { InternalLinkGrid } from "@/components/sections/internal-link-grid";
import { getContextualInternalLinks, getEvergreenInternalLinks } from "@/lib/internal-links";
import type { Locale } from "@/i18n/config";
import type { BlogPost, ComparisonPage, ConnectorPage } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  const data = await client.fetch(COMPARISON_SLUGS_QUERY);
  return (data ?? []).map((item: { slug: { current: string }; language: string }) => ({ locale: item.language, slug: item.slug.current }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: COMPARISON_PAGE_QUERY, params: { slug, language: locale } });
  if (!data) return {};
  const c = data as ComparisonPage;
  const siteUrl = getSiteUrl();
  const languages = await getContentLanguages(siteUrl, "comparisons", slug);
  return buildMetadata(c.seo ?? null, { path: itemPath('comparisons', locale, slug), fallbackTitle: c.title, locale, languages });
}

export default async function ComparisonDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const [{ data }, { data: meetingUrl }] = await Promise.all([
    sanityFetch({ query: COMPARISON_PAGE_QUERY, params: { slug, language: locale } }),
    sanityFetch({ query: MEETING_URL_QUERY }),
  ]);
  if (!data) notFound();

  const bookingUrl = resolveTeamMeetingUrl(meetingUrl as string | null);
  const c = data as ComparisonPage;
  const [{ data: relatedPosts }, { data: relatedConnectors }] = await Promise.all([
    sanityFetch({ query: RELATED_BLOG_POSTS_QUERY, params: { slug, language: locale, tags: c.tags ?? [] } }),
    sanityFetch({ query: RELATED_CONNECTOR_PAGES_QUERY, params: { slug, language: locale, tags: c.tags ?? [] } }),
  ]);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${itemPath('comparisons', locale, slug)}`;
  const parentUrl = `${siteUrl}${hubPath('comparisons', locale)}`;

  const parentLabel = locale === "fr" ? "Comparaisons" : locale === "nl" ? "Vergelijkingen" : "Comparisons";
  const relatedGuidesLabel = locale === "fr" ? "Guides liés" : locale === "nl" ? "Gerelateerde gidsen" : "Related guides";
  const relatedIntegrationsLabel = locale === "fr" ? "Intégrations liées" : locale === "nl" ? "Gerelateerde integraties" : "Related integrations";
  const contextualGuidesLabel = locale === "fr" ? "Analyse détaillée liée" : locale === "nl" ? "Gerelateerde diepgaande analyse" : "Related deep dive";
  const exploreMoreLabel = locale === "fr" ? "Explorer les sujets IA liés" : locale === "nl" ? "Verken gerelateerde AI-thema's" : "Explore related AI topics";
  const evaluationTitle = locale === "fr" ? "Ce qu'il faut comparer au-delà des fonctionnalités" : locale === "nl" ? "Wat je naast functies moet vergelijken" : "What to compare beyond features";
  const evaluationBody = {
    en: `A useful ${c.competitor} comparison should look beyond interface features. Enterprise teams need to know where data is processed, how internal systems are connected, whether answers include sources, and how much governance is available before an AI workflow reaches production.`,
    fr: `Une bonne comparaison avec ${c.competitor} doit aller au-delà des fonctionnalités d'interface. Les équipes enterprise doivent savoir où les données sont traitées, comment les systèmes internes sont connectés, si les réponses sont sourcées et quel niveau de gouvernance existe avant la mise en production.`,
    nl: `Een goede vergelijking met ${c.competitor} gaat verder dan interfacefuncties. Enterprise teams moeten weten waar data verwerkt wordt, hoe interne systemen gekoppeld zijn, of antwoorden bronnen bevatten en hoeveel governance beschikbaar is voor een AI-workflow in productie gaat.`,
  }[locale];
  const adoptionBody = {
    en: `For a production decision, the comparison should also cover implementation effort. A tool can look strong in a demo but still fail if it cannot connect to the systems teams use every day, if answers cannot be traced back to sources, or if administrators cannot control permissions and workflow boundaries.`,
    fr: `Pour une décision de production, la comparaison doit aussi couvrir l'effort d'implémentation. Un outil peut sembler solide en démo mais échouer s'il ne se connecte pas aux systèmes utilisés chaque jour, si les réponses ne sont pas traçables ou si les administrateurs ne contrôlent pas les permissions et les limites des workflows.`,
    nl: `Voor een productiebeslissing moet de vergelijking ook de implementatie-inspanning tonen. Een tool kan sterk lijken in een demo maar toch falen als hij niet koppelt met dagelijkse systemen, als antwoorden niet naar bronnen herleidbaar zijn of als beheerders permissies en workflowgrenzen niet kunnen controleren.`,
  }[locale];
  const evaluationPoints = {
    en: ["Data control and hosting model", "Connectors to existing business systems", "Workflow automation with human oversight"],
    fr: ["Contrôle des données et modèle d'hébergement", "Connecteurs vers les systèmes métier existants", "Automatisation avec validation humaine"],
    nl: ["Datacontrole en hostingmodel", "Connectoren met bestaande bedrijfssystemen", "Workflowautomatisering met menselijke controle"],
  }[locale];
  const contextualLinks = getContextualInternalLinks(locale, "comparisons", slug);
  const evergreenLinks = getEvergreenInternalLinks(locale, "comparisons", itemPath("comparisons", locale, slug));

  return (
    <>
      <main className="container mx-auto px-4 py-24 max-w-3xl">
        <ArticleSchema title={c.title} description={c.excerpt} publishedAt={new Date().toISOString()} url={pageUrl} />
        <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: parentLabel, url: parentUrl }, { name: c.title, url: pageUrl }]} />
        {c.faq?.length ? <FaqSchema items={c.faq} /> : null}

        <h1 className="type-h2 mb-4">{c.title}</h1>
        <p className="type-body text-text/60 mb-12">{c.excerpt}</p>

        <div className="prose prose-lg max-w-none">{c.body && <PortableText value={c.body as never} />}</div>

        <ComparisonTable locale={locale} competitor={c.competitor} />

        <section className="mt-16 rounded-lg border border-border bg-mid-gray p-6">
          <h2 className="type-h5">{evaluationTitle}</h2>
          <p className="mt-4 type-paragraph-m leading-relaxed text-text/65">{evaluationBody}</p>
          <p className="mt-4 type-paragraph-m leading-relaxed text-text/65">{adoptionBody}</p>
          <div className="mt-6 grid gap-3">
            {evaluationPoints.map((point) => (
              <p key={point} className="rounded-md border border-border bg-background p-4 type-paragraph-m-bold">{point}</p>
            ))}
          </div>
        </section>

        {c.faq?.length ? (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="type-h5 mb-8">{locale === "fr" ? "Questions fréquentes" : locale === "nl" ? "Veelgestelde vragen" : "Frequently asked questions"}</h2>
            {c.faq.map((item, i) => (
              <div key={i} className="mb-6">
                <h3 className="type-paragraph-m-bold mb-2">{item.question}</h3>
                <p className="type-paragraph-m text-text/60">{item.answer}</p>
              </div>
            ))}
          </section>
        ) : null}

        {((relatedPosts as BlogPost[])?.length || (relatedConnectors as ConnectorPage[])?.length) ? (
          <section className="mt-16 border-t border-border pt-12">
            <div className="grid gap-8 md:grid-cols-2">
              {(relatedPosts as BlogPost[])?.length ? (
                <div>
                  <h2 className="type-h6 mb-5 text-text/50">{relatedGuidesLabel}</h2>
                  <div className="grid gap-3">
                    {(relatedPosts as BlogPost[]).map((post) => (
                      <a key={post._id} href={itemPath("blog", locale, post.slug.current)} className="group rounded-lg border border-border p-4 transition-colors hover:border-accent">
                        <span className="type-eyebrow text-text/30">{post.category}</span>
                        <p className="mt-2 type-paragraph-m-bold group-hover:text-accent">{post.title}</p>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
              {(relatedConnectors as ConnectorPage[])?.length ? (
                <div>
                  <h2 className="type-h6 mb-5 text-text/50">{relatedIntegrationsLabel}</h2>
                  <div className="grid gap-3">
                    {(relatedConnectors as ConnectorPage[]).map((connector) => (
                      <a key={connector._id} href={itemPath("connectors", locale, connector.slug.current)} className="group rounded-lg border border-border p-4 transition-colors hover:border-accent">
                        <p className="type-paragraph-m-bold group-hover:text-accent">{connector.toolName}</p>
                        <p className="mt-1 line-clamp-2 type-paragraph-s text-text/50">{connector.tagline}</p>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {contextualLinks.length ? (
          <InternalLinkGrid title={contextualGuidesLabel} links={contextualLinks} className="mt-16" />
        ) : null}

        <InternalLinkGrid title={exploreMoreLabel} links={evergreenLinks} className="mt-16" />

        <WonkaSolves locale={locale} meetingUrl={bookingUrl} />
      </main>
      <Cta meetingUrl={bookingUrl} />
    </>
  );
}
