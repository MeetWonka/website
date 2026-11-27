import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { BreadcrumbSchema, FaqSchema, SoftwareAppSchema } from "@/components/json-ld";
import { Cta } from "@/components/sections/cta";
import { ButtonLink } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import { commercialPath, localizeHref } from "@/i18n/routes";
import { resolveMeetingLabel } from "@/lib/localized-content";
import { meetingTrackProps } from "@/lib/meeting-track";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildCommercialMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import type { SiteSettings } from "@/lib/types";
import { AI_AGENTS_COPY } from "@/views/copy/ai-agents";

const connectors = [
  { name: "Odoo", logo: "/images/solution/card-3/logos/odoo.svg" },
  { name: "SharePoint", logo: "/images/visual/sharepoint.svg" },
  { name: "Outlook", logo: "/images/solution/card-3/logos/outlook.svg" },
  { name: "Microsoft Teams", logo: "/images/solution/card-3/logos/teams.svg" },
  { name: "Salesforce", logo: "/images/solution/card-3/logos/salesforce.svg" },
  { name: "HubSpot", logo: "/images/solution/card-3/logos/hubspot.svg" },
  { name: "Jira", logo: "/images/solution/card-3/logos/jira.svg" },
  { name: "Notion", logo: "/images/solution/card-3/logos/notion.svg" },
  { name: "Google Drive", logo: "/images/solution/card-3/logos/googledrive.svg" },
  { name: "Slack", logo: "/images/solution/card-3/logos/slack.svg" },
];

export async function aiAgentsMetadata(locale: Locale): Promise<Metadata> {
  const { seo } = AI_AGENTS_COPY[locale];
  return buildCommercialMetadata(
    { metaTitle: seo.title, metaDescription: seo.description, ogImage: null },
    "aiAgents",
    locale,
    seo.title,
  );
}

export async function AiAgentsView({ locale }: { locale: Locale }) {
  const copy = AI_AGENTS_COPY[locale];
  const siteUrl = getSiteUrl();
  const homePath = commercialPath("home", locale);
  const homeUrl = homePath === "/" ? siteUrl : `${siteUrl}${homePath}`;
  const pageUrl = `${siteUrl}${commercialPath("aiAgents", locale)}`;
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingUrl = resolveMeetingUrl(sharedLinks, "default", locale);
  const meetingLabel = locale === "en" ? undefined : resolveMeetingLabel(sharedLinks, locale);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: copy.schema.breadcrumbHome, url: homeUrl },
          { name: copy.schema.breadcrumbPage, url: pageUrl },
        ]}
      />
      <SoftwareAppSchema
        name={copy.schema.appName}
        description={copy.seo.description}
        url={pageUrl}
        features={copy.agentTypes.map((agent) => agent.title)}
      />
      <FaqSchema items={copy.faqItems} />

      <main className="bg-background text-text">
        <section className="relative overflow-hidden border-b border-dashed border-border bg-black text-white">
          <div className="absolute inset-x-0 top-0 h-px bg-white/40" />
          <div className="absolute right-[-10%] top-24 hidden h-[28rem] w-[28rem] rotate-12 border border-white/10 md:block" />
          <div className="absolute right-[6%] top-40 hidden h-[16rem] w-[16rem] rotate-12 border border-white/15 md:block" />

          <div className="mx-auto grid max-w-[1200px] gap-12 px-6 pb-18 pt-32 md:grid-cols-[1.05fr_0.95fr] md:pb-24 md:pt-40">
            <div>
              <p className="type-eyebrow text-white/45">{copy.hero.eyebrow}</p>
              <h1 className="mt-6 max-w-3xl type-h2 text-white">{copy.hero.title}</h1>
              <p className="mt-6 max-w-2xl type-body text-white/68">{copy.hero.body}</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <ButtonLink
                  href={meetingUrl ?? "#contact"}
                  variant="primary"
                  {...meetingTrackProps("general")}
                >
                  {copy.hero.primaryCta}
                </ButtonLink>
                <Link
                  href={localizeHref("/integrations", locale)}
                  className="type-paragraph-m-bold text-white underline underline-offset-4"
                >
                  {copy.hero.secondaryCta}
                </Link>
              </div>
            </div>

            <div className="self-end border border-white/16 bg-white/[0.04] p-6 backdrop-blur md:p-8">
              <p className="type-eyebrow text-white/38">{copy.hero.answerEyebrow}</p>
              <p className="mt-5 type-body text-white/78">{copy.hero.answerBody}</p>
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden bg-white/12">
                {copy.hero.facts.map(([kicker, value]) => (
                  <div key={kicker} className="bg-black/70 p-4">
                    <p className="type-eyebrow text-white/35">{kicker}</p>
                    <p className="mt-2 type-paragraph-m-bold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-6 py-18 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:items-start">
            <div className="md:sticky md:top-24">
              <p className="type-eyebrow text-text/45">{copy.connectors.eyebrow}</p>
              <h2 className="mt-5 type-h4">{copy.connectors.heading}</h2>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border md:grid-cols-5">
              {connectors.map((connector) => (
                <div key={connector.name} className="group flex h-28 items-center justify-center bg-background p-6 md:h-32">
                  <Image
                    src={connector.logo}
                    alt={connector.name}
                    width={92}
                    height={34}
                    className="max-h-9 w-auto max-w-[7rem] object-contain grayscale transition duration-300 group-hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-dashed border-border bg-mid-gray">
          <div className="mx-auto max-w-[1200px] px-6 py-18 md:py-24">
            <div className="max-w-2xl">
              <p className="type-eyebrow text-text/45">{copy.patterns.eyebrow}</p>
              <h2 className="mt-5 type-h4">{copy.patterns.heading}</h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-4">
              {copy.agentTypes.map((agent) => (
                <article key={agent.title} className="rounded-lg bg-background p-6 md:p-7">
                  <p className="type-eyebrow text-text/35">{agent.label}</p>
                  <h3 className="mt-4 type-h6">{agent.title}</h3>
                  <p className="mt-4 type-paragraph-m text-text/62">{agent.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1200px] gap-12 px-6 py-18 md:grid-cols-[1fr_1fr] md:py-24">
          <div>
            <p className="type-eyebrow text-text/45">{copy.odoo.eyebrow}</p>
            <h2 className="mt-5 type-h4">{copy.odoo.heading}</h2>
          </div>
          <div className="border-l border-dashed border-border pl-6 md:pl-10">
            <p className="type-body text-text/70">{copy.odoo.body}</p>
            <div className="mt-8 bg-black p-6 text-white">
              <p className="type-eyebrow text-white/35">{copy.odoo.promptEyebrow}</p>
              <p className="mt-4 type-body text-white/78">{copy.odoo.prompt}</p>
            </div>
          </div>
        </section>

        <section className="border-y border-dashed border-border">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-18 md:grid-cols-[0.75fr_1.25fr] md:py-24">
            <div>
              <p className="type-eyebrow text-text/45">{copy.deployment.eyebrow}</p>
              <h2 className="mt-5 type-h4">{copy.deployment.heading}</h2>
            </div>
            <ol className="grid gap-4">
              {copy.steps.map((step, index) => (
                <li key={step} className="grid gap-4 rounded-lg bg-mid-gray p-5 md:grid-cols-[5rem_1fr] md:p-6">
                  <span className="type-h5 text-text/24">{String(index + 1).padStart(2, "0")}</span>
                  <p className="type-body text-text/68">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-[900px] px-6 py-18 md:py-24">
          <p className="type-eyebrow text-text/45">{copy.faq.eyebrow}</p>
          <h2 className="mt-5 type-h4">{copy.faq.heading}</h2>
          <div className="mt-10 divide-y divide-dashed divide-border">
            {copy.faqItems.map((item) => (
              <article key={item.question} className="py-6">
                <h3 className="type-body font-medium">{item.question}</h3>
                <p className="mt-3 type-paragraph-m text-text/62">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Cta
        id="contact"
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType="general"
        locale={locale}
      />
    </>
  );
}
