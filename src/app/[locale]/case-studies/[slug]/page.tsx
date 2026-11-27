import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { CASE_STUDY_QUERY, CASE_STUDY_SLUGS_QUERY, RELATED_BLOG_POSTS_QUERY, RELATED_CONNECTOR_PAGES_QUERY } from "@sanity/lib/queries";
import { client } from "@sanity/lib/client";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { hubPath, itemPath } from "@/lib/locale-path";
import { getContentLanguages } from "@/lib/content-languages";
import { PortableText } from "@portabletext/react";
import { ArticleSchema, FaqSchema, BreadcrumbSchema } from "@/components/json-ld";
import { InternalLinkGrid } from "@/components/sections/internal-link-grid";
import { getEvergreenInternalLinks } from "@/lib/internal-links";
import type { Locale } from "@/i18n/config";
import type { BlogPost, CaseStudy, ConnectorPage } from "@/lib/types";

export const dynamic = "force-static";

// SEO for the static fallback case studies rendered below when the CMS has no entry
const FALLBACK_CASE_STUDY_SEO: Record<string, { title: string; description: string }> = {
  itzu: {
    title: "Itzu Case Study: Personal AI Assistants for Every Employee | Wonka AI",
    description: "Itzu deployed personal WonkaChat assistants to 100% of their workforce, with employees saving multiple hours per week.",
  },
  "n-allo": {
    title: "N-allo (Engie) Case Study: 50% Faster Support Emails | Wonka AI",
    description: "Engie subsidiary N-allo deployed AI agents to handle support emails, cutting handling time by 50% across a team of +70 employees.",
  },
};

interface PageProps { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  const data = await client.fetch(CASE_STUDY_SLUGS_QUERY);
  const slugs = (data ?? []).map((item: { slug: { current: string }; language: string }) => ({ locale: item.language, slug: item.slug.current }));
  
  // Add static fallback case studies
  const staticCaseStudies = [
    { locale: "en", slug: "itzu" },
    { locale: "en", slug: "n-allo" }
  ];
  
  return [...slugs, ...staticCaseStudies];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: CASE_STUDY_QUERY, params: { slug, language: locale } });
  if (!data) {
    const fallback = locale === "en" ? FALLBACK_CASE_STUDY_SEO[slug] : undefined;
    if (!fallback) return {};
    return buildMetadata(
      { metaTitle: fallback.title, metaDescription: fallback.description, ogImage: null },
      { path: itemPath('case-studies', locale, slug), locale },
    );
  }
  const c = data as CaseStudy;
  const siteUrl = getSiteUrl();
  const languages = await getContentLanguages(siteUrl, "case-studies", slug);
  return buildMetadata(c.seo ?? null, { path: itemPath('case-studies', locale, slug), fallbackTitle: c.headline, locale, languages });
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: CASE_STUDY_QUERY, params: { slug, language: locale } });
  
  // Static fallback for production case studies if CMS data is not available
  let c: CaseStudy | null = data as CaseStudy | null;
  
  if (!c && slug === "itzu" && locale === "en") {
    c = {
      _id: "itzu-fallback",
      slug: { current: "itzu" },
      language: "en",
      clientName: "Itzu",
      clientLogo: null,
      headline: "How Itzu empowers every employee with personal AI assistants",
      excerpt: "Itzu deployed personal WonkaChat assistants to 100% of their workforce, with employees saving multiple hours per week.",
      sector: "Recruitment & HR",
      publishedAt: "2026-08-01T00:00:00Z",
      results: [
        "100% employee adoption",
        "Multiple hours saved per employee weekly",
        "Personal AI assistant for each team member"
      ],
      body: [
        {
          _type: "block",
          _key: "intro",
          children: [
            {
              _type: "span",
              _key: "intro-text",
              text: "Itzu deployed WonkaChat to 100% of employees. Each team member received a personal AI assistant connected to internal systems, helping with daily work.",
              marks: []
            }
          ],
          markDefs: [],
          style: "normal"
        },
        {
          _type: "block",
          _key: "result",
          children: [
            {
              _type: "span",
              _key: "result-text",
              text: "The deployment achieved 100% adoption. Employees save multiple hours per week using their personal AI assistants.",
              marks: []
            }
          ],
          markDefs: [],
          style: "normal"
        }
      ] as never,
      tags: ["recruitment", "employee-productivity"],
      seo: null,
      faq: []
    };
  }
  
  if (!c && slug === "n-allo" && locale === "en") {
    c = {
      _id: "n-allo-fallback",
      slug: { current: "n-allo" },
      language: "en",
      clientName: "N-allo (Engie)",
      clientLogo: null,
      headline: "N-allo cuts support email time by 50% with AI agents",
      excerpt: "Engie subsidiary N-allo deployed AI agents to handle support emails, cutting handling time by 50% across a team of +70 employees.",
      sector: "Energy & Utilities",
      publishedAt: "2026-07-15T00:00:00Z",
      results: [
        "50% time reduction on support emails",
        "Team of +70 employees"
      ],
      body: [
        {
          _type: "block",
          _key: "intro",
          children: [
            {
              _type: "span",
              _key: "intro-text",
              text: "N-allo, an Engie group subsidiary, deployed AI agents to handle support emails across their team of over 70 employees.",
              marks: []
            }
          ],
          markDefs: [],
          style: "normal"
        },
        {
          _type: "block",
          _key: "result",
          children: [
            {
              _type: "span",
              _key: "result-text",
              text: "The deployment reduced time spent handling support emails by 50% across the team.",
              marks: []
            }
          ],
          markDefs: [],
          style: "normal"
        }
      ] as never,
      tags: ["customer-support", "email-automation"],
      seo: null,
      faq: []
    };
  }
  
  if (!c) notFound();
  const [{ data: relatedPosts }, { data: relatedConnectors }] = await Promise.all([
    sanityFetch({ query: RELATED_BLOG_POSTS_QUERY, params: { slug, language: locale, tags: c.tags ?? [] } }),
    sanityFetch({ query: RELATED_CONNECTOR_PAGES_QUERY, params: { slug, language: locale, tags: c.tags ?? [] } }),
  ]);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${itemPath('case-studies', locale, slug)}`;
  const parentUrl = `${siteUrl}${hubPath('case-studies', locale)}`;
  const relatedGuidesLabel = locale === "fr" ? "Guides liés" : locale === "nl" ? "Gerelateerde gidsen" : "Related guides";
  const relatedIntegrationsLabel = locale === "fr" ? "Intégrations liées" : locale === "nl" ? "Gerelateerde integraties" : "Related integrations";
  const exploreMoreLabel = locale === "fr" ? "Explorer les sujets IA liés" : locale === "nl" ? "Verken gerelateerde AI-thema's" : "Explore related AI topics";
  const rolloutTitle = locale === "fr" ? "Ce qu'il faut retenir du déploiement" : locale === "nl" ? "Wat je uit deze uitrol kunt leren" : "What to learn from this deployment";
  const rolloutBody = {
    en: `A strong private AI deployment connects a concrete business workflow, a trusted data source, and a clear control model. For ${c.clientName}, the important pattern is not only the AI interface, but the way teams can use governed answers inside their existing operating rhythm.`,
    fr: `Un bon déploiement d'IA privée relie un workflow métier concret, une source de données fiable et un modèle de contrôle clair. Pour ${c.clientName}, le point important n'est pas seulement l'interface IA, mais la capacité des équipes à utiliser des réponses gouvernées dans leur rythme de travail existant.`,
    nl: `Een sterke private AI-uitrol verbindt een concrete bedrijfsworkflow, een betrouwbare databron en een duidelijk controlemodel. Voor ${c.clientName} gaat het niet alleen om de AI-interface, maar om hoe teams beheerste antwoorden gebruiken binnen hun bestaande werkritme.`,
  }[locale];
  const evergreenLinks = getEvergreenInternalLinks(locale, "case-studies", itemPath("case-studies", locale, slug));

  return (
    <main className="container mx-auto px-4 py-24 max-w-3xl">
      <ArticleSchema title={c.headline} description={c.excerpt} publishedAt={c.publishedAt ?? new Date().toISOString()} url={pageUrl} />
      <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: "Case Studies", url: parentUrl }, { name: c.clientName, url: pageUrl }]} />
      {c.faq?.length ? <FaqSchema items={c.faq} /> : null}

      <span className="type-eyebrow text-text/40 block mb-4">{c.sector}</span>
      <h1 className="type-h2 mb-6">{c.headline}</h1>

      {c.results?.length ? (
        <div className="grid grid-cols-2 gap-4 mb-12">
          {c.results.map((r, i) => <div key={i} className="p-4 bg-light-gray rounded-lg"><p className="type-paragraph-m-bold">{r}</p></div>)}
        </div>
      ) : null}

      <div className="prose prose-lg max-w-none">{c.body && <PortableText value={c.body as never} />}</div>

      <section className="mt-16 rounded-lg border border-border bg-mid-gray p-6">
        <h2 className="type-h5">{rolloutTitle}</h2>
        <p className="mt-4 type-paragraph-m leading-relaxed text-text/65">{rolloutBody}</p>
      </section>

      {c.faq?.length ? (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="type-h5 mb-8">FAQ</h2>
          {c.faq.map((item, i) => <div key={i} className="mb-6"><h3 className="type-paragraph-m-bold mb-2">{item.question}</h3><p className="type-paragraph-m text-text/60">{item.answer}</p></div>)}
        </section>
      ) : null}

      {((relatedPosts as BlogPost[])?.length || (relatedConnectors as ConnectorPage[])?.length) ? (
        <section className="mt-16 border-t border-border pt-12">
          <div className="grid gap-8 md:grid-cols-2">
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
          </div>
        </section>
      ) : null}

      <InternalLinkGrid title={exploreMoreLabel} links={evergreenLinks} className="mt-16" />
    </main>
  );
}
