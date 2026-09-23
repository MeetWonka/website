import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { resolveImageAlt, resolveImageSrc } from "@/lib/cms-image";
import { DEFAULT_MEETING_LABEL } from "@/lib/cms-text";
import { meetingTrackProps, type MeetingTrackType } from "@/lib/meeting-track";
import { radius } from "@/lib/design-tokens";
import { hasSanityImage } from "@/lib/resolve-cms";
import { cn } from "@/lib/utils";
import type { ContactSectionResolved } from "@/lib/types/page-sections";

interface ContactBlockProps {
  data: ContactSectionResolved;
  meetingUrl?: string | null;
  meetingLabel?: string | null;
  meetingTrackType: MeetingTrackType;
  email?: string | null;
  phone?: string | null;
  id?: string;
  className?: string;
}

export function ContactBlock({
  data,
  meetingUrl,
  meetingLabel,
  meetingTrackType,
  email,
  phone,
  id = "contact",
  className,
}: ContactBlockProps) {
  const ctaLabel = meetingLabel ?? DEFAULT_MEETING_LABEL;
  const header = data.header;
  const fallback = data.fallbackPortrait ?? { src: "", alt: "" };
  const portraitSrc = resolveImageSrc(data.portrait, fallback);
  const portraitAlt = resolveImageAlt(data.portrait, fallback);
  const personName = data.personName ?? "";
  const personRole = data.personRole ?? "";

  if (!header?.heading && !personName) {
    return null;
  }

  return (
    <Section
      id={id}
      className={cn("py-18 text-center md:py-24", className)}
      containerClassName="max-w-2xl"
    >
      {header?.heading ? (
        <SectionHeader
          align="center"
          eyebrow={
            header.eyebrow ? <Eyebrow>{header.eyebrow}</Eyebrow> : undefined
          }
          heading={header.heading}
          body={header.body ?? undefined}
          bodyClassName="mx-auto max-w-xl type-body text-text/65 opacity-100"
        />
      ) : null}
      <div className="mt-10 flex flex-col items-center gap-4">
        {portraitSrc ? (
          <div
            className={`relative h-24 w-24 overflow-hidden ${radius.full} ring-4 ring-border`}
          >
            <Image
              src={portraitSrc}
              alt={portraitAlt}
              fill
              sizes="96px"
              className="object-cover object-top"
              unoptimized={!hasSanityImage(data.portrait)}
            />
          </div>
        ) : null}
        {personName || personRole ? (
          <div>
            {personName ? (
              <div className="type-body font-medium">{personName}</div>
            ) : null}
            {personRole ? (
              <div className="type-paragraph-s text-text/55">{personRole}</div>
            ) : null}
          </div>
        ) : null}
        {email || phone ? (
          <div className="flex flex-col items-center gap-1">
            {email ? (
              <a
                href={`mailto:${email}`}
                className="type-paragraph-m text-text/70 underline underline-offset-4 transition-opacity hover:text-text"
              >
                {email}
              </a>
            ) : null}
            {phone ? (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="type-paragraph-m text-text/70 underline underline-offset-4 transition-opacity hover:text-text"
              >
                {phone}
              </a>
            ) : null}
          </div>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink
            href={meetingUrl ?? "#"}
            variant="primary"
            {...meetingTrackProps(meetingTrackType)}
          >
            {ctaLabel}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
