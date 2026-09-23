import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { HeroLeadForm } from "@/components/sections/hero-lead-form";
import { resolveImageAlt, resolveImageSrc } from "@/lib/cms-image";
import { DEFAULT_MEETING_LABEL } from "@/lib/cms-text";
import { meetingTrackProps, type MeetingTrackType } from "@/lib/meeting-track";
import { headingClass, radius } from "@/lib/design-tokens";
import type { LeadSource } from "@/lib/lead-capture";
import { hasSanityImage } from "@/lib/resolve-cms";
import type { ProductHeroResolved } from "@/lib/types/page-sections";

interface ProductHeroProps {
  data: ProductHeroResolved;
  leadForm?: LeadSource;
  meetingUrl?: string | null;
  meetingLabel?: string | null;
  meetingTrackType?: MeetingTrackType;
}

function HeroCta({
  leadForm,
  meetingUrl,
  meetingLabel,
  meetingTrackType,
  secondaryLink,
  theme,
}: {
  leadForm?: LeadSource;
  meetingUrl?: string | null;
  meetingLabel?: string | null;
  meetingTrackType?: MeetingTrackType;
  secondaryLink: ProductHeroResolved["secondaryLink"];
  theme: "dark" | "light";
}) {
  if (leadForm) {
    return (
      <div className="mt-9">
        <HeroLeadForm source={leadForm} theme={theme} />
      </div>
    );
  }

  const ctaLabel = meetingLabel ?? DEFAULT_MEETING_LABEL;
  const isDark = theme === "dark";

  return (
    <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
      <ButtonLink
        href={meetingUrl ?? "#contact"}
        variant="primary"
        {...(meetingTrackType ? meetingTrackProps(meetingTrackType) : {})}
      >
        {ctaLabel}
      </ButtonLink>
      {secondaryLink?.href && secondaryLink.label ? (
        <Link
          href={secondaryLink.href}
          className={
            isDark
              ? "type-paragraph-m-bold text-white underline underline-offset-4"
              : "type-paragraph-m-bold text-text underline underline-offset-4"
          }
        >
          {secondaryLink.label}
        </Link>
      ) : null}
    </div>
  );
}

export function ProductHero({
  data,
  leadForm,
  meetingUrl,
  meetingLabel,
  meetingTrackType,
}: ProductHeroProps) {
  const theme = data.theme ?? "dark";
  const eyebrow = data.eyebrow ?? "";
  const title = data.title ?? "";
  const subtitle = data.subtitle ?? "";
  const secondaryText = data.secondaryText ?? "";
  const bgFallback = data.fallbackBackground ?? { src: "", alt: "" };
  const heroFallback = data.fallbackHero ?? { src: "", alt: "" };
  const bgSrc = resolveImageSrc(data.backgroundImage, bgFallback);
  const heroSrc = resolveImageSrc(data.heroImage, heroFallback);
  const heroAlt = resolveImageAlt(data.heroImage, heroFallback);

  if (theme === "light") {
    return (
      <Section containerClassName="pb-12 pt-32 md:pb-16 md:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <span
              className={`inline-block ${radius.full} bg-mid-gray px-4 py-1.5 type-eyebrow text-text`}
            >
              {eyebrow}
            </span>
          ) : null}
          {title ? (
            <h1
              className={`mx-auto mt-6 max-w-[20ch] text-balance ${headingClass.hero}`}
            >
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mx-auto mt-6 max-w-2xl type-body text-text/70">
              {subtitle}
            </p>
          ) : null}
          {secondaryText ? (
            <p className="mx-auto mt-3 max-w-xl type-paragraph-m text-text/50">
              {secondaryText}
            </p>
          ) : null}
          <HeroCta
            leadForm={leadForm}
            meetingUrl={meetingUrl}
            meetingLabel={meetingLabel}
            meetingTrackType={meetingTrackType}
            secondaryLink={data.secondaryLink}
            theme="light"
          />
        </div>
        {heroSrc ? (
          <div className="mx-auto mt-12 max-w-[1400px] md:mt-16">
            <Image
              src={heroSrc}
              alt={heroAlt}
              width={heroFallback.width ?? 1920}
              height={heroFallback.height ?? 694}
              priority
              sizes="(min-width: 1400px) 1400px, 100vw"
              className="h-auto w-full"
              unoptimized={!hasSanityImage(data.heroImage)}
            />
          </div>
        ) : null}
      </Section>
    );
  }

  return (
    <section className="relative isolate w-full overflow-hidden bg-black">
      {bgSrc ? (
        <Image
          src={bgSrc}
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="pointer-events-none object-cover opacity-80"
          priority
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />
      <div className="relative mx-auto max-w-[1100px] px-6 pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <span
              className={`inline-block ${radius.full} bg-white px-4 py-1.5 type-eyebrow text-text`}
            >
              {eyebrow}
            </span>
          ) : null}
          {title ? (
            <h1 className={`mx-auto mt-6 ${headingClass.hero} text-white`}>
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mx-auto mt-6 max-w-xl type-body text-white/80">
              {subtitle}
            </p>
          ) : null}
          <HeroCta
            leadForm={leadForm}
            meetingUrl={meetingUrl}
            meetingLabel={meetingLabel}
            meetingTrackType={meetingTrackType}
            secondaryLink={data.secondaryLink}
            theme="dark"
          />
        </div>
      </div>
    </section>
  );
}
