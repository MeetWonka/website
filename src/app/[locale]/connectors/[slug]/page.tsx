import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/live";
import { CONNECTOR_PAGE_QUERY, CONNECTOR_SLUGS_QUERY, MEETING_URL_QUERY, RELATED_BLOG_POSTS_QUERY, RELATED_CONNECTOR_PAGES_QUERY } from "@sanity/lib/queries";
import { client } from "@sanity/lib/client";
import { urlFor } from "@sanity/lib/image";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { hubPath, itemPath } from "@/lib/locale-path";
import { getContentLanguages } from "@/lib/content-languages";
import { resolveTeamMeetingUrl } from "@/lib/resolve-meeting-url";
import { meetingTrackProps } from "@/lib/meeting-track";
import { FaqSchema, BreadcrumbSchema, SoftwareAppSchema } from "@/components/json-ld";
import { WonkaSolves } from "@/components/sections/wonka-solves";
import { Cta } from "@/components/sections/cta";
import { InternalLinkGrid } from "@/components/sections/internal-link-grid";
import { ButtonLink } from "@/components/ui/button";
import { getContextualInternalLinks, getEvergreenInternalLinks } from "@/lib/internal-links";
import type { Locale } from "@/i18n/config";
import type { BlogPost, ConnectorPage } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const data = await client.fetch(CONNECTOR_SLUGS_QUERY);
  return (data ?? []).map((item: { slug: { current: string }; language: string }) => ({
    locale: item.language,
    slug: item.slug.current,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data } = await sanityFetch({ query: CONNECTOR_PAGE_QUERY, params: { slug, language: locale } });
  if (!data) return {};
  const c = data as ConnectorPage;
  const siteUrl = getSiteUrl();
  const languages = await getContentLanguages(siteUrl, "connectors", slug);
  return buildMetadata(c.seo ?? null, { path: itemPath('connectors', locale, slug), fallbackTitle: c.toolName, locale, languages });
}

export default async function ConnectorDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const [{ data }, { data: meetingUrl }] = await Promise.all([
    sanityFetch({ query: CONNECTOR_PAGE_QUERY, params: { slug, language: locale } }),
    sanityFetch({ query: MEETING_URL_QUERY }),
  ]);

  if (!data) notFound();

  const bookingUrl = resolveTeamMeetingUrl(meetingUrl as string | null);
  const c = data as ConnectorPage;
  const [{ data: relatedConnectors }, { data: relatedPosts }] = await Promise.all([
    sanityFetch({ query: RELATED_CONNECTOR_PAGES_QUERY, params: { slug, language: locale, tags: c.tags ?? [] } }),
    sanityFetch({ query: RELATED_BLOG_POSTS_QUERY, params: { slug, language: locale, tags: c.tags ?? [] } }),
  ]);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${itemPath('connectors', locale, slug)}`;
  const hubUrl = `${siteUrl}${hubPath('connectors', locale)}`;

  const connectorLabel = { en: "Connector", fr: "Connecteur", nl: "Connector" }[locale];
  const useCasesLabel = { en: "Use cases", fr: "Cas d'usage", nl: "Gebruiksscenario's" }[locale];
  const examplePromptLabel = { en: "Example prompt", fr: "Exemple de prompt", nl: "Voorbeeldprompt" }[locale];
  const faqLabel = { en: "Frequently asked questions", fr: "Questions fréquentes", nl: "Veelgestelde vragen" }[locale];
  const hubLabel = { en: "Connectors", fr: "Connecteurs", nl: "Connectoren" }[locale];
  const primaryCtaLabel = { en: "Book a demo", fr: "Réserver une démo", nl: "Boek een demo" }[locale];
  const secondaryCtaLabel = { en: "Explore integrations", fr: "Voir les intégrations", nl: "Bekijk integraties" }[locale];
  const relatedConnectorsLabel = { en: "Related integrations", fr: "Intégrations liées", nl: "Gerelateerde integraties" }[locale];
  const relatedPostsLabel = { en: "Related guides", fr: "Guides liés", nl: "Gerelateerde gidsen" }[locale];
  const exploreMoreLabel = { en: "Explore related AI topics", fr: "Explorer les sujets IA liés", nl: "Verken gerelateerde AI-thema's" }[locale];
  const contextualGuidesLabel = { en: "Recommended guides for this integration", fr: "Guides recommandés pour cette intégration", nl: "Aanbevolen gidsen voor deze integratie" }[locale];
  const deploymentTitle = {
    en: `How Wonka works with ${c.toolName}`,
    fr: `Comment Wonka fonctionne avec ${c.toolName}`,
    nl: `Hoe Wonka werkt met ${c.toolName}`,
  }[locale];
  const deploymentIntro = {
    en: `Wonka connects to ${c.toolName} as a private AI layer for enterprise workflows. The goal is not to copy data into another generic assistant, but to let teams ask questions, summarize records, and trigger work from the systems they already trust.`,
    fr: `Wonka se connecte à ${c.toolName} comme une couche d'IA privée pour les workflows d'entreprise. L'objectif n'est pas de copier les données dans un assistant générique, mais de permettre aux équipes de questionner, résumer et agir depuis les systèmes qu'elles utilisent déjà.`,
    nl: `Wonka koppelt met ${c.toolName} als private AI-laag voor enterprise workflows. Het doel is niet om data naar een generieke assistent te kopiëren, maar teams te laten zoeken, samenvatten en handelen vanuit systemen die ze al vertrouwen.`,
  }[locale];
  const deploymentDetail = {
    en: `In practice, this means Wonka can use ${c.toolName} as part of a controlled enterprise AI workflow: retrieving the right context, summarizing relevant records, keeping references visible, and routing the next action to the people or systems that should own it. This gives teams a way to adopt AI without losing the audit trail around important business data.`,
    fr: `En pratique, Wonka peut utiliser ${c.toolName} dans un workflow IA enterprise contrôlé : récupérer le bon contexte, résumer les informations utiles, garder les références visibles et orienter l'action suivante vers les personnes ou systèmes responsables. Les équipes peuvent ainsi adopter l'IA sans perdre la traçabilité autour des données métier importantes.`,
    nl: `In de praktijk kan Wonka ${c.toolName} gebruiken binnen een gecontroleerde enterprise AI-workflow: de juiste context ophalen, relevante records samenvatten, verwijzingen zichtbaar houden en de volgende actie naar de juiste mensen of systemen sturen. Zo kunnen teams AI inzetten zonder de audit trail rond belangrijke bedrijfsdata te verliezen.`,
  }[locale];
  const rolloutTitle = {
    en: "What to validate before rollout",
    fr: "Ce qu'il faut valider avant le déploiement",
    nl: "Wat je valideert voor de uitrol",
  }[locale];
  const rolloutBody = {
    en: `A reliable ${c.toolName} integration should answer three questions before it reaches production: which users can access which records, what evidence is shown with each AI answer, and how repeated requests become governed workflows instead of one-off prompts. This is where connector quality matters most for enterprise adoption. The integration should preserve existing permissions, support review by the business owner, and make the output useful inside the workflow where the decision already happens. For most teams, the value is not another search box; it is a shorter path from trusted context to the next operational action. That is why Wonka treats connectors as part of the operating layer: the AI experience, the source system and the approval path stay connected from the first answer to the final action.`,
    fr: `Une intégration ${c.toolName} fiable doit répondre à trois questions avant la production : quels utilisateurs accèdent à quelles données, quelles preuves accompagnent chaque réponse IA et comment les demandes répétées deviennent des workflows gouvernés plutôt que de simples prompts ponctuels. C'est là que la qualité du connecteur compte vraiment pour l'adoption enterprise. L'intégration doit préserver les permissions existantes, permettre la revue par le responsable métier et rendre la sortie utile dans le workflow où la décision se prend déjà. Pour la plupart des équipes, la valeur n'est pas une nouvelle barre de recherche, mais un chemin plus court entre le contexte fiable et l'action opérationnelle suivante. C'est pourquoi Wonka traite les connecteurs comme une partie de la couche opérationnelle : l'expérience IA, le système source et le chemin de validation restent reliés de la première réponse à l'action finale.`,
    nl: `Een betrouwbare ${c.toolName}-integratie moet drie vragen beantwoorden voor productie: welke gebruikers krijgen toegang tot welke records, welk bewijs staat naast elk AI-antwoord en hoe worden terugkerende vragen beheerste workflows in plaats van losse prompts. Daar wordt connectorkwaliteit belangrijk voor enterprise adoptie. De integratie moet bestaande permissies respecteren, review door de business owner ondersteunen en de output bruikbaar maken in de workflow waar de beslissing al gebeurt. Voor de meeste teams is de waarde niet nog een zoekbalk, maar een kortere weg van betrouwbare context naar de volgende operationele actie. Daarom behandelt Wonka connectoren als onderdeel van de operationele laag: de AI-ervaring, het bronsysteem en het goedkeuringspad blijven verbonden van het eerste antwoord tot de finale actie.`,
  }[locale];
  const deploymentPoints = {
    en: [
      `Keep ${c.toolName} data connected to source-aware answers.`,
      "Give users cited context before they act on an AI response.",
      "Turn repeated operational questions into governed workflows.",
    ],
    fr: [
      `Garder les données ${c.toolName} reliées à des réponses sourcées.`,
      "Donner aux utilisateurs le contexte cité avant d'agir sur une réponse IA.",
      "Transformer les questions opérationnelles répétées en workflows gouvernés.",
    ],
    nl: [
      `Houd ${c.toolName}-data gekoppeld aan antwoorden met bronnen.`,
      "Geef gebruikers geciteerde context voordat ze op een AI-antwoord handelen.",
      "Zet terugkerende operationele vragen om in beheerste workflows.",
    ],
  }[locale];
  const contextualLinks = getContextualInternalLinks(locale, "connectors", slug);
  const evergreenLinks = getEvergreenInternalLinks(locale, "connectors", itemPath("connectors", locale, slug));
  const logoUrl = c.toolLogo ? urlFor(c.toolLogo).width(160).height(160).fit("max").url() : null;
  const metrics = [
    { label: { en: "Private AI", fr: "IA privée", nl: "Private AI" }[locale] },
    { label: { en: "Source-aware answers", fr: "Réponses sourcées", nl: "Antwoorden met bronnen" }[locale] },
    { label: { en: "Workflow-ready", fr: "Prêt pour workflows", nl: "Workflow-ready" }[locale] },
  ];

  return (
    <>
      <main className="bg-background">
        <BreadcrumbSchema items={[
          { name: "Home", url: siteUrl },
          { name: hubLabel, url: hubUrl },
          { name: c.toolName, url: pageUrl },
        ]} />
        <SoftwareAppSchema
          name={`Wonka AI + ${c.toolName}`}
          description={c.description}
          url={pageUrl}
          features={c.useCases?.map((u) => u.title) ?? []}
        />
        {c.faq?.length ? <FaqSchema items={c.faq} /> : null}

        <section className="border-b border-dashed border-border">
          <div className="mx-auto grid max-w-[1200px] gap-12 px-6 pb-16 pt-32 md:pt-36 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <nav className="mb-8 flex items-center gap-2 type-eyebrow text-text/40">
                <a href={hubUrl} className="transition-colors hover:text-text">{hubLabel}</a>
                <span>/</span>
                <span className="text-text/60">{c.toolName}</span>
              </nav>

              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-border px-3 py-1 type-eyebrow text-text/50">
                  {connectorLabel}
                </span>
                <span className="rounded-full bg-text px-3 py-1 type-eyebrow text-background">
                  Wonka + {c.toolName}
                </span>
              </div>

              <h1 className="type-h2 max-w-4xl">{c.tagline}</h1>
              <p className="mt-6 max-w-3xl type-body leading-relaxed text-text/65">{c.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink
                  href={bookingUrl}
                  variant="primary"
                  {...meetingTrackProps("general")}
                >
                  {primaryCtaLabel}
                </ButtonLink>
                <ButtonLink href={hubPath("connectors", locale)} variant="secondary">
                  {secondaryCtaLabel}
                </ButtonLink>
              </div>
            </div>

            <aside className="rounded-lg border border-border bg-mid-gray p-6">
              <div className="flex items-center gap-4 border-b border-dashed border-border pb-6">
                <div className="grid size-20 place-items-center rounded-lg border border-border bg-background">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={c.toolLogo?.alt || `${c.toolName} logo`}
                      width={56}
                      height={56}
                      className="h-14 w-14 object-contain"
                    />
                  ) : (
                    <span className="type-h5 text-text/40">{c.toolName.slice(0, 1)}</span>
                  )}
                </div>
                <div>
                  <p className="type-eyebrow text-text/40">Integration</p>
                  <p className="type-body font-medium">Wonka + {c.toolName}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-3">
                    <span className="type-paragraph-s text-text/55">{metric.label}</span>
                    <span className="size-2 rounded-full bg-text" aria-hidden />
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {c.useCases?.length ? (
          <section className="mx-auto max-w-[1200px] px-6 py-16">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="type-eyebrow text-text/40">Operational AI</p>
                <h2 className="mt-2 type-h4">{useCasesLabel}</h2>
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {c.useCases.map((u, i) => (
                <article key={i} className="flex min-h-full flex-col rounded-lg border border-border bg-mid-gray p-6">
                  <div className="mb-5 flex size-10 items-center justify-center rounded-md bg-text type-paragraph-s-bold text-background">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="type-body mb-3 font-medium">{u.title}</h3>
                  <p className="type-paragraph-m mb-6 text-text/60">{u.description}</p>
                  {u.prompt && (
                    <div className="mt-auto rounded-md border border-dashed border-border bg-background p-4">
                      <p className="type-eyebrow mb-2 text-text/35">{examplePromptLabel}</p>
                      <p className="type-paragraph-m italic">&ldquo;{u.prompt}&rdquo;</p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-[1200px] px-6 pb-16">
          <div className="grid gap-8 rounded-lg border border-border p-6 lg:grid-cols-[360px_1fr]">
            <div>
              <p className="type-eyebrow text-text/40">Private deployment</p>
              <h2 className="mt-2 type-h5">{deploymentTitle}</h2>
            </div>
            <div>
              <p className="type-body leading-relaxed text-text/65">{deploymentIntro}</p>
              <p className="mt-4 type-body leading-relaxed text-text/65">{deploymentDetail}</p>
              <div className="mt-6 grid gap-3">
                {deploymentPoints.map((point) => (
                  <p key={point} className="rounded-md border border-border bg-mid-gray p-4 type-paragraph-m text-text/65">{point}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-6 pb-16">
          <div className="rounded-lg border border-border bg-mid-gray p-6">
            <h2 className="type-h5">{rolloutTitle}</h2>
            <p className="mt-4 max-w-3xl type-paragraph-m leading-relaxed text-text/65">{rolloutBody}</p>
          </div>
        </section>

        {c.faq?.length ? (
          <section className="border-y border-dashed border-border bg-mid-gray">
            <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 lg:grid-cols-[320px_1fr]">
              <div>
                <p className="type-eyebrow text-text/40">GEO-ready FAQ</p>
                <h2 className="mt-2 type-h5">{faqLabel}</h2>
              </div>
              <div className="grid gap-4">
                {c.faq.map((item, i) => (
                  <div key={i} className="rounded-lg border border-border bg-background p-5">
                    <h3 className="type-paragraph-m-bold mb-2">{item.question}</h3>
                    <p className="type-paragraph-m text-text/60">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {((relatedConnectors as ConnectorPage[])?.length || (relatedPosts as BlogPost[])?.length) ? (
          <section className="mx-auto grid max-w-[1200px] gap-8 px-6 py-16 lg:grid-cols-2">
            {(relatedConnectors as ConnectorPage[])?.length ? (
              <div>
                <h2 className="type-h5 mb-5">{relatedConnectorsLabel}</h2>
                <div className="grid gap-3">
                  {(relatedConnectors as ConnectorPage[]).map((connector) => (
                    <a
                      key={connector._id}
                      href={itemPath("connectors", locale, connector.slug.current)}
                      className="group rounded-lg border border-border p-5 transition-colors hover:border-accent"
                    >
                      <span className="type-paragraph-m-bold group-hover:text-accent">{connector.toolName}</span>
                      <p className="mt-2 type-paragraph-m text-text/60">{connector.tagline}</p>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
            {(relatedPosts as BlogPost[])?.length ? (
              <div>
                <h2 className="type-h5 mb-5">{relatedPostsLabel}</h2>
                <div className="grid gap-3">
                  {(relatedPosts as BlogPost[]).map((post) => (
                    <a
                      key={post._id}
                      href={itemPath("blog", locale, post.slug.current)}
                      className="group rounded-lg border border-border p-5 transition-colors hover:border-accent"
                    >
                      <span className="type-eyebrow text-text/35">{post.category}</span>
                      <p className="mt-2 type-paragraph-m-bold group-hover:text-accent">{post.title}</p>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        {contextualLinks.length ? (
          <div className="mx-auto max-w-[1200px] px-6 pb-16">
            <InternalLinkGrid title={contextualGuidesLabel} links={contextualLinks} />
          </div>
        ) : null}

        <div className="mx-auto max-w-[1200px] px-6 pb-16">
          <InternalLinkGrid title={exploreMoreLabel} links={evergreenLinks} />
        </div>

        <div className="mx-auto max-w-[1200px] px-6">
          <WonkaSolves locale={locale} meetingUrl={bookingUrl} />
        </div>
      </main>
      <Cta meetingUrl={bookingUrl} />
    </>
  );
}
