import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { BreadcrumbSchema, FaqSchema } from "@/components/json-ld";
import { JsonLd } from "@/components/json-ld/json-ld";
import { Cta } from "@/components/sections/cta";
import { LogoStrip } from "@/components/sections/logo-strip";
import { Testimonials } from "@/components/sections/testimonials";
import { ButtonLink } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import {
  commercialPath,
  landingLanguages,
  landingPath,
  type SeoLandingPage,
} from "@/i18n/routes";
import { getT } from "@/i18n/ui";
import { resolveMeetingLabel } from "@/lib/localized-content";
import { meetingTrackProps } from "@/lib/meeting-track";
import { getPageDefaults } from "@/lib/page-defaults/localized";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildMetadata } from "@/lib/seo";
import { radius } from "@/lib/design-tokens";
import { getSiteUrl } from "@/lib/site-url";
import type { SiteSettings } from "@/lib/types";
import type { LandingCopy, LandingCta } from "@/views/copy/landing-types";
import { LANDING_COPY } from "@/views/copy/landing";
import { LANDING_VISUALS } from "@/views/copy/landing-visuals";

const TRIAL_URL = "https://wonka.chat/register";
const FRANCE_DIAGNOSTIC_PATH = "/france/diagnostic";
const FRANCE_DIAGNOSTIC_LABEL = "Faire le diagnostic gratuit";

function getCopy(page: SeoLandingPage, locale: Locale): LandingCopy {
  const copy = LANDING_COPY[page][locale];
  if (!copy) throw new Error(`No ${locale} copy for landing page ${page}`);
  return copy;
}

function getPagePath(page: SeoLandingPage, locale: Locale): string {
  const path = landingPath(page, locale);
  if (!path) throw new Error(`Landing page ${page} has no ${locale} route`);
  return path;
}

export async function landingMetadata(
  page: SeoLandingPage,
  locale: Locale,
): Promise<Metadata> {
  const copy = getCopy(page, locale);
  return buildMetadata(
    { metaTitle: copy.seo.title, metaDescription: copy.seo.description, ogImage: null },
    {
      path: getPagePath(page, locale),
      locale,
      languages: landingLanguages(getSiteUrl(), page),
    },
  );
}

function ctaHref(cta: LandingCta, meetingUrl: string): string {
  if (cta.href === "meeting") return meetingUrl;
  if (cta.href === "trial") return TRIAL_URL;
  return cta.href;
}

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export async function SeoLandingView({
  page,
  locale,
}: {
  page: SeoLandingPage;
  locale: Locale;
}) {
  const copy = getCopy(page, locale);
  const visual = LANDING_VISUALS[page];
  const t = getT(locale);
  const siteUrl = getSiteUrl();
  const homePath = commercialPath("home", locale);
  const homeUrl = homePath === "/" ? siteUrl : `${siteUrl}${homePath}`;
  const pageUrl = `${siteUrl}${getPagePath(page, locale)}`;

  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const sharedLinks = (settings as SiteSettings | null)?.sharedLinks ?? null;
  const meetingContext = copy.meetingContext ?? "default";
  const meetingTrack = meetingContext === "france" ? "france" : "general";
  // France never falls back to the HQ calendar (see resolveMeetingUrl): until a
  // French booking link is configured, meeting CTAs send people to the free
  // French diagnostic instead of an empty href.
  const resolvedMeetingUrl = resolveMeetingUrl(sharedLinks, meetingContext, locale);
  const franceFallback = meetingContext === "france" && !resolvedMeetingUrl;
  const meetingUrl = franceFallback ? FRANCE_DIAGNOSTIC_PATH : resolvedMeetingUrl;
  const meetingLabel = franceFallback
    ? FRANCE_DIAGNOSTIC_LABEL
    : resolveMeetingLabel(sharedLinks, locale);
  const defaults = getPageDefaults(locale);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.schema.serviceName,
    serviceType: copy.schema.serviceType,
    description: copy.seo.description,
    url: pageUrl,
    inLanguage: locale,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Belgium" },
      { "@type": "Place", name: "European Union" },
    ],
    audience: { "@type": "BusinessAudience", audienceType: "Companies" },
  };

  const primaryHref = ctaHref(copy.hero.primaryCta, meetingUrl);
  const secondaryTarget = copy.hero.secondaryCta
    ? ctaHref(copy.hero.secondaryCta, meetingUrl)
    : null;
  // Hide the secondary CTA when a fallback makes it point where the primary does.
  const secondaryHref = secondaryTarget === primaryHref ? null : secondaryTarget;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: t("common.home"), url: homeUrl },
          { name: copy.breadcrumb, url: pageUrl },
        ]}
      />
      <JsonLd id="schema-landing-service" data={serviceSchema} />
      <FaqSchema items={copy.faq.items} />

      <main className="bg-background text-text">
        {/* Hero — landscape background like the product pages, facts or product shot on the right */}
        <section className="relative isolate overflow-hidden bg-black text-white">
          <Image
            src={visual.background.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="pointer-events-none -z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/35 to-black/0" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-transparent to-black/45" />

          <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 pb-18 pt-32 md:grid-cols-[1.05fr_0.95fr] md:pb-24 md:pt-40">
            <div>
              <span
                className={`inline-block ${radius.full} bg-white px-4 py-1.5 type-eyebrow text-text`}
              >
                {copy.hero.eyebrow}
              </span>
              <h1 className="mt-6 max-w-3xl text-balance type-h2 text-white">
                {copy.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl type-body text-white/80">{copy.hero.subtitle}</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <ButtonLink
                  href={primaryHref}
                  variant="primary"
                  {...(copy.hero.primaryCta.href === "meeting"
                    ? meetingTrackProps(meetingTrack)
                    : {})}
                >
                  {franceFallback && copy.hero.primaryCta.href === "meeting"
                    ? FRANCE_DIAGNOSTIC_LABEL
                    : copy.hero.primaryCta.label}
                </ButtonLink>
                {copy.hero.secondaryCta && secondaryHref ? (
                  <Link
                    href={secondaryHref}
                    className="type-paragraph-m-bold text-white underline underline-offset-4"
                  >
                    {franceFallback && copy.hero.secondaryCta.href === "meeting"
                      ? FRANCE_DIAGNOSTIC_LABEL
                      : copy.hero.secondaryCta.label}
                  </Link>
                ) : null}
              </div>

              {visual.productShot ? (
                <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t border-white/20 pt-6">
                  {copy.hero.facts.map(([label, value]) => (
                    <div key={label}>
                      <dt className="type-eyebrow text-white/55">{label}</dt>
                      <dd className="mt-1 type-paragraph-m-bold text-white">{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>

            {visual.productShot ? (
              <div className={`overflow-hidden ${radius.sm} border border-white/20 bg-white shadow-2xl`}>
                <Image
                  src={visual.productShot.src}
                  alt={copy.schema.serviceName}
                  width={visual.productShot.width}
                  height={visual.productShot.height}
                  priority
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="h-auto w-full"
                />
              </div>
            ) : (
              <dl
                className={`grid grid-cols-2 gap-px overflow-hidden ${radius.sm} border border-white/20 bg-white/15 backdrop-blur-md`}
              >
                {copy.hero.facts.map(([label, value]) => (
                  <div key={label} className="bg-black/35 p-5 md:p-6">
                    <dt className="type-eyebrow text-white/60">{label}</dt>
                    <dd className="mt-2 type-paragraph-m-bold text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        <LogoStrip data={defaults.startAi.logoStrip} />

        {/* Answer-first definition */}
        <section className="mx-auto max-w-[900px] px-6 py-18 md:py-24">
          <h2 className="type-h4">{copy.answer.heading}</h2>
          <div className="mt-8 flex flex-col gap-5">
            {copy.answer.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="type-body text-text/72">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="border-y border-dashed border-border bg-mid-gray">
          <div className="mx-auto max-w-[1200px] px-6 py-18 md:py-24">
            <div className="max-w-2xl">
              <p className="type-eyebrow text-text/45">{copy.benefits.eyebrow}</p>
              <h2 className="mt-5 type-h4">{copy.benefits.heading}</h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {copy.benefits.items.map((item) => (
                <article key={item.title} className="rounded-lg bg-background p-6 md:p-7">
                  <h3 className="type-h6">{item.title}</h3>
                  <p className="mt-4 type-paragraph-m text-text/62">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="mx-auto max-w-[1200px] px-6 py-18 md:py-24">
          <div className="max-w-2xl">
            <p className="type-eyebrow text-text/45">{copy.useCases.eyebrow}</p>
            <h2 className="mt-5 type-h4">{copy.useCases.heading}</h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {copy.useCases.items.map((item) => (
              <article key={item.title} className="flex flex-col bg-background p-6 md:p-8">
                <h3 className="type-h6">{item.title}</h3>
                <p className="mt-4 type-paragraph-m text-text/62">{item.body}</p>
                {item.link ? (
                  <Link
                    href={item.link.href}
                    className="mt-6 type-paragraph-m-bold text-text underline underline-offset-4"
                  >
                    {item.link.label}
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="border-y border-dashed border-border">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-18 md:grid-cols-[0.75fr_1.25fr] md:py-24">
            <div>
              <p className="type-eyebrow text-text/45">{copy.process.eyebrow}</p>
              <h2 className="mt-5 type-h4">{copy.process.heading}</h2>
            </div>
            <ol className="grid gap-4">
              {copy.process.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid gap-4 rounded-lg bg-mid-gray p-5 md:grid-cols-[5rem_1fr] md:p-6"
                >
                  <span className="type-h5 text-text/24">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="type-paragraph-m-bold">{step.title}</h3>
                    <p className="mt-2 type-body text-text/68">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Comparison */}
        {copy.comparison ? (
          <section className="mx-auto max-w-[1200px] px-6 py-18 md:py-24">
            <div className="max-w-2xl">
              <p className="type-eyebrow text-text/45">{copy.comparison.eyebrow}</p>
              <h2 className="mt-5 type-h4">{copy.comparison.heading}</h2>
            </div>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[40rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border">
                    {copy.comparison.columns.map((column) => (
                      <th key={column} scope="col" className="py-4 pr-6 type-paragraph-m-bold">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.comparison.rows.map(([feature, ours, theirs]) => (
                    <tr key={feature} className="border-b border-dashed border-border">
                      <th scope="row" className="py-4 pr-6 type-paragraph-m font-medium">
                        {feature}
                      </th>
                      <td className="py-4 pr-6 type-paragraph-m text-text/72">{ours}</td>
                      <td className="py-4 pr-6 type-paragraph-m text-text/62">{theirs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {copy.comparison.footnote ? (
              <p className="mt-6 type-paragraph-m text-text/50">{copy.comparison.footnote}</p>
            ) : null}
          </section>
        ) : null}

        <Testimonials id="testimonials" className="py-24" locale={locale} />

        {/* FAQ */}
        <section className="mx-auto max-w-[900px] px-6 py-18 md:py-24">
          <h2 className="type-h4">{copy.faq.heading}</h2>
          <div className="mt-10 divide-y divide-dashed divide-border">
            {copy.faq.items.map((item) => (
              <article key={item.question} className="py-6">
                <h3 className="type-body font-medium">{item.question}</h3>
                <p className="mt-3 type-paragraph-m text-text/62">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Related pages (internal linking) */}
        <section className="border-t border-dashed border-border">
          <div className="mx-auto max-w-[1200px] px-6 py-18 md:py-24">
            <h2 className="type-h5">{copy.related.heading}</h2>
            <ul className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {copy.related.links.map((link) => (
                <li key={link.href} className="bg-background">
                  <Link
                    href={link.href}
                    {...(isExternal(link.href) ? { rel: "noopener" } : {})}
                    className="flex h-full flex-col gap-2 p-6 transition-colors hover:bg-mid-gray"
                  >
                    <span className="type-paragraph-m-bold">{link.label}</span>
                    {link.description ? (
                      <span className="type-paragraph-m text-text/62">{link.description}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Cta
        id="contact"
        data={{ heading: copy.cta.heading, body: copy.cta.body }}
        meetingUrl={meetingUrl}
        meetingLabel={meetingLabel}
        meetingTrackType={meetingTrack}
        locale={locale}
      />
    </>
  );
}
