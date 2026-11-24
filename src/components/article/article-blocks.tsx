import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/ui";
import type { ResolvedTopic, TopicLink } from "@/lib/article-topics";
import { radius } from "@/lib/design-tokens";
import { meetingTrackProps } from "@/lib/meeting-track";

const TRIAL_URL = "https://wonka.chat/register";

/* ── Hero ─────────────────────────────────────────────────────────────── */

interface ArticleHeroProps {
  locale: Locale;
  topic: ResolvedTopic;
  title: string;
  excerpt?: string | null;
  category?: string | null;
  readMins: number;
  publishedAt: string;
  updatedAt?: string | null;
  crumbs: { label: string; href: string }[];
}

function formatDate(value: string, locale: Locale): string {
  return new Date(value).toLocaleDateString(locale === "en" ? "en-GB" : `${locale}-BE`, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArticleHero({
  locale,
  topic,
  title,
  excerpt,
  category,
  readMins,
  publishedAt,
  updatedAt,
  crumbs,
}: ArticleHeroProps) {
  const t = getT(locale);
  const showUpdated = updatedAt && updatedAt.slice(0, 10) > publishedAt.slice(0, 10);

  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <Image
        src={topic.cover.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none -z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-transparent to-black/55" />

      <div className="mx-auto max-w-[1200px] px-6 pb-14 pt-32 md:pb-20 md:pt-40">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 type-eyebrow text-white/60">
          {crumbs.map((crumb, index) => (
            <span key={crumb.href} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden>/</span> : null}
              <Link href={crumb.href} className="transition-colors hover:text-white">
                {crumb.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="mb-5 flex flex-wrap items-center gap-3">
          {category ? (
            <span className={`inline-block ${radius.full} bg-white px-3 py-1 type-eyebrow text-text`}>{category}</span>
          ) : null}
          <span className="type-paragraph-s text-white/70">
            {readMins} {t("article.readingTime")}
          </span>
        </div>

        <h1 className="max-w-4xl text-balance type-h2 text-white">{title}</h1>
        {excerpt ? <p className="mt-5 max-w-2xl type-body text-white/80">{excerpt}</p> : null}

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 type-paragraph-s text-white/70">
          <span className="flex items-center gap-2">
            <Image src="/images/brand/wonka-logo-mark-transparent.png" alt="" width={20} height={20} className="h-5 w-5 invert" />
            <span className="text-white">{t("article.author")}</span>
          </span>
          <span>
            {t("article.published")} <time dateTime={publishedAt}>{formatDate(publishedAt, locale)}</time>
          </span>
          {showUpdated ? (
            <span>
              {t("article.updated")} <time dateTime={updatedAt!}>{formatDate(updatedAt!, locale)}</time>
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ── Table of contents ────────────────────────────────────────────────── */

export function ArticleToc({ locale, headings }: { locale: Locale; headings: { id: string; text: string }[] }) {
  if (headings.length < 2) return null;
  const t = getT(locale);
  return (
    <nav aria-label={t("article.toc")}>
      <p className="mb-3 type-eyebrow text-text/45">{t("article.toc")}</p>
      <ol className="flex flex-col gap-2 border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="-ml-px block border-l border-transparent py-0.5 pl-4 type-paragraph-s text-text/60 transition-colors hover:border-accent hover:text-text"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Collapsible TOC shown above the body on small screens. */
export function ArticleTocMobile({ locale, headings }: { locale: Locale; headings: { id: string; text: string }[] }) {
  if (headings.length < 2) return null;
  const t = getT(locale);
  return (
    <details className={`mb-10 ${radius.sm} border border-border bg-mid-gray p-4 lg:hidden`}>
      <summary className="cursor-pointer type-paragraph-m-bold">{t("article.toc")}</summary>
      <ol className="mt-3 flex flex-col gap-2 pl-4">
        {headings.map((heading) => (
          <li key={heading.id} className="list-decimal type-paragraph-s text-text/70">
            <a href={`#${heading.id}`} className="hover:text-text">{heading.text}</a>
          </li>
        ))}
      </ol>
    </details>
  );
}

/* ── Product visual (inserted in the body) ────────────────────────────── */

export function ArticleProductCard({ locale, topic }: { locale: Locale; topic: ResolvedTopic }) {
  const t = getT(locale);
  return (
    <figure className={`not-prose my-12 overflow-hidden ${radius.sm} border border-border bg-mid-gray`}>
      <div className="bg-background">
        <Image
          src={topic.shot.src}
          alt={topic.productTitle}
          width={topic.shot.width}
          height={topic.shot.height}
          sizes="(min-width: 1024px) 760px, 100vw"
          className="h-auto max-h-[340px] w-full object-contain"
        />
      </div>
      <figcaption className="flex flex-col gap-3 p-6 md:flex-row md:items-end md:justify-between md:gap-8">
        <div>
          <p className="type-h6">{topic.productTitle}</p>
          <p className="mt-2 max-w-xl type-paragraph-m text-text/65">{topic.productBody}</p>
        </div>
        <Link
          href={topic.productHref}
          className="shrink-0 type-paragraph-m-bold text-text underline underline-offset-4 hover:text-accent"
        >
          {t("article.productCta")} →
        </Link>
      </figcaption>
    </figure>
  );
}

/* ── Customer proof + trial CTA (inserted in the body) ────────────────── */

export function ArticleProof({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const proof = t.raw("article.proof") as { value: string; label: string }[];
  return (
    <aside data-theme="dark" className={`not-prose my-12 overflow-hidden ${radius.sm} bg-black text-white`}>
      <div className="p-6 md:p-8">
        <p className="type-eyebrow text-white/50">{t("article.proofEyebrow")}</p>
        <p className="mt-3 type-h5 text-white">{t("article.proofTitle")}</p>
        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/15 md:grid-cols-4">
          {proof.map((item) => (
            <div key={item.label} className="bg-black p-4">
              <dt className="type-h6 whitespace-nowrap text-white">{item.value}</dt>
              <dd className="mt-1 type-paragraph-s text-white/65">{item.label}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-col gap-4 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="type-paragraph-m-bold text-white">{t("article.midCtaTitle")}</p>
            <p className="mt-1 type-paragraph-s text-white/65">{t("article.midCtaBody")}</p>
          </div>
          <ButtonLink href={TRIAL_URL} variant="primary">
            {t("article.trialCta")}
          </ButtonLink>
        </div>
      </div>
    </aside>
  );
}

/* ── Go further (topic landing pages) ─────────────────────────────────── */

export function ArticleGoFurther({ locale, links }: { locale: Locale; links: TopicLink[] }) {
  if (!links.length) return null;
  const t = getT(locale);
  return (
    <section className="mt-16 border-t border-dashed border-border pt-12">
      <h2 className="type-h5">{t("article.goFurther")}</h2>
      <ul className="mt-6 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href} className="bg-background">
            <Link href={link.href} className="flex h-full flex-col gap-1 p-5 transition-colors hover:bg-mid-gray">
              <span className="type-paragraph-m-bold">{link.label}</span>
              <span className="type-paragraph-s text-text/60">{link.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Sidebar CTA ──────────────────────────────────────────────────────── */

export function ArticleSidebarCta({
  locale,
  bookingUrl,
  meetingTrack,
}: {
  locale: Locale;
  bookingUrl: string;
  meetingTrack: "general" | "france";
}) {
  const t = getT(locale);
  return (
    <div className={`${radius.sm} border border-border bg-mid-gray p-6`}>
      <p className="mb-1 type-body font-medium">{t("article.sidebarTitle")}</p>
      <p className="mb-4 type-paragraph-s text-text/55">{t("article.sidebarBody")}</p>
      <ButtonLink href={bookingUrl} variant="primary" {...meetingTrackProps(meetingTrack)}>
        {t("article.sidebarCta")}
      </ButtonLink>
    </div>
  );
}
