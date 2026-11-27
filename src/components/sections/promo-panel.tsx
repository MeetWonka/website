import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import { resolveImageSrc } from "@/lib/cms-image";
import { DEFAULT_MEETING_LABEL } from "@/lib/cms-text";
import { meetingTrackProps, type MeetingTrackType } from "@/lib/meeting-track";
import { headingClass } from "@/lib/design-tokens";
import type { PromoPanelResolved } from "@/lib/types/page-sections";

interface PromoPanelProps {
  data: PromoPanelResolved;
  meetingUrl?: string | null;
  meetingLabel?: string | null;
  meetingTrackType: MeetingTrackType;
  className?: string;
}

export function PromoPanel({
  data,
  meetingUrl,
  meetingLabel,
  meetingTrackType,
  className,
}: PromoPanelProps) {
  const ctaHref = data.ctaHref ?? meetingUrl ?? "#contact";
  const ctaLabel = data.ctaLabel ?? meetingLabel ?? DEFAULT_MEETING_LABEL;
  const meetingTrack = data.ctaHref ? {} : meetingTrackProps(meetingTrackType);
  const variant = data.variant ?? "darkImage";
  const fallback = data.fallbackBackground ?? { src: "", alt: "" };
  const bgSrc = resolveImageSrc(data.backgroundImage, fallback);
  const showCta = data.showCta !== false;

  if (!data.heading && !data.body) {
    return null;
  }

  if (variant === "gradient") {
    return (
      <Section wide className={className ?? "py-8"}>
        <Surface
          variant="panel"
          className="relative"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 35%, #6e8fda 0%, #8aaae8 35%, #b5c8f8 70%, #c8d8ff 100%)",
          }}
        >
          <div className="relative mx-auto grid max-w-[1100px] gap-10 px-8 py-16 md:grid-cols-[1.6fr_1fr] md:items-center md:py-20">
            <div>
              {data.eyebrow ? (
                <span className="type-eyebrow text-white/60">{data.eyebrow}</span>
              ) : null}
              {data.heading ? (
                <h3 className={`mt-3 ${headingClass.section} text-white`}>
                  {data.heading}
                </h3>
              ) : null}
              {data.body ? (
                <p className="mt-4 max-w-xl type-body text-white/75">{data.body}</p>
              ) : null}
            </div>
            {showCta ? (
              <div className="md:justify-self-end">
                <ButtonLink
                  href={ctaHref}
                  variant="primary"
                  {...meetingTrack}
                >
                  {ctaLabel}
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </Surface>
      </Section>
    );
  }

  return (
    <Section wide className={className ?? "py-8"}>
      <Surface variant="panel" className="relative bg-black">
        {bgSrc ? (
          <Image
            src={bgSrc}
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="pointer-events-none object-cover opacity-50"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        <div className="relative mx-auto grid max-w-[1100px] gap-10 px-8 py-16 md:grid-cols-[1.6fr_1fr] md:items-center md:py-20">
          <div>
            {data.eyebrow ? (
              <span className="type-eyebrow text-white/60">{data.eyebrow}</span>
            ) : null}
            {data.heading ? (
              <h3 className="mt-3 type-h4 text-white">{data.heading}</h3>
            ) : null}
            {data.body ? (
              <p className="mt-4 max-w-xl type-body text-white/75">{data.body}</p>
            ) : null}
          </div>
          {showCta ? (
            <div className="md:justify-self-end">
              <ButtonLink
                href={ctaHref}
                variant="primary"
                {...meetingTrack}
              >
                {ctaLabel}
              </ButtonLink>
            </div>
          ) : null}
        </div>
      </Surface>
    </Section>
  );
}
