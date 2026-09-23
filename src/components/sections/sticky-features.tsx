import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { resolveImageAlt, resolveImageSrc } from "@/lib/cms-image";
import { DEFAULT_MEETING_LABEL } from "@/lib/cms-text";
import { meetingTrackProps, type MeetingTrackType } from "@/lib/meeting-track";
import { headingClass } from "@/lib/design-tokens";
import { hasSanityImage } from "@/lib/resolve-cms";
import type { StickyFeaturesResolved } from "@/lib/types/page-sections";

interface StickyFeaturesProps {
  data: StickyFeaturesResolved;
  meetingUrl?: string | null;
  meetingLabel?: string | null;
  meetingTrackType: MeetingTrackType;
  className?: string;
}

export function StickyFeatures({
  data,
  meetingUrl,
  meetingLabel,
  meetingTrackType,
  className,
}: StickyFeaturesProps) {
  const ctaLabel = meetingLabel ?? DEFAULT_MEETING_LABEL;
  const { header, showCta, features } = data;

  if (!header.heading && features.length === 0) {
    return null;
  }

  return (
    <Section className={className ?? "py-18 md:py-24"}>
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div className="md:sticky md:top-24 md:self-start">
          {header.heading ? (
            <SectionHeader
              align="left"
              eyebrow={
                header.eyebrow ? <Eyebrow>{header.eyebrow}</Eyebrow> : undefined
              }
              heading={header.heading}
              body={header.body ?? undefined}
              bodyClassName="type-body text-text/65 opacity-100"
            />
          ) : null}
          {showCta ? (
            <div className="mt-8">
              <ButtonLink
                href={meetingUrl ?? "#contact"}
                variant="primary"
                {...meetingTrackProps(meetingTrackType)}
              >
                {ctaLabel}
              </ButtonLink>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-28 md:gap-40">
          {features.map((feature) => {
            const fallback = feature.fallbackImage ?? { src: "", alt: "" };
            const imageSrc = resolveImageSrc(feature.image, fallback);
            const imageAlt = resolveImageAlt(feature.image, fallback);

            return (
              <article key={feature._key}>
                {imageSrc ? (
                  <div className="mb-8 w-full overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      width={fallback.width ?? 1200}
                      height={fallback.height ?? 800}
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="h-auto w-full"
                      unoptimized={!hasSanityImage(feature.image)}
                    />
                  </div>
                ) : null}
                <h3 className={headingClass.card}>{feature.title}</h3>
                {feature.description ? (
                  <p className="mt-3 type-paragraph-m text-text/65">
                    {feature.description}
                  </p>
                ) : null}
                {feature.link?.href && feature.link.label ? (
                  <Link
                    href={feature.link.href}
                    className="mt-6 inline-flex items-center gap-1.5 type-paragraph-m-bold text-text underline underline-offset-4"
                  >
                    {feature.link.label}
                  </Link>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
