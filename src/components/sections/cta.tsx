import Image from "next/image";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { getT } from "@/i18n/ui";
import { meetingTrackProps, type MeetingTrackType } from "@/lib/meeting-track";
import { headingClass } from "@/lib/design-tokens";
import type { HomepageCtaData } from "@/lib/types";

interface CtaProps {
  id?: string;
  data?: HomepageCtaData | null;
  meetingUrl?: string | null;
  meetingLabel?: string | null;
  meetingTrackType?: MeetingTrackType;
  showImage?: boolean;
  locale?: Locale;
}

export function Cta({
  id,
  data,
  meetingUrl,
  meetingLabel,
  meetingTrackType = "general",
  showImage = true,
  locale = "en",
}: CtaProps) {
  const t = getT(locale);
  const heading = data?.heading ?? t("home.cta.heading");
  const body = data?.body ?? t("home.cta.body");
  const ctaLabel = meetingLabel ?? t("common.bookMeeting");

  return (
    <Section
      id={id}
      data-theme="dark"
      fluid
      className="bg-black px-0 md:px-0 lg:px-0"
      containerClassName="relative overflow-hidden flex flex-col items-center px-6 md:px-12 py-15 md:py-22"
    >
      {showImage && (
        <Image
          src="/images/CTA/cta-bg.avif"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover opacity-80"
        />
      )}
      <div className="relative flex flex-col items-center gap-6 text-center">
        <h2 className={cn(headingClass.section, "text-text xl:whitespace-nowrap")}>{heading}</h2>
        <p className="type-body max-w-[35.125rem] text-text opacity-80">{body}</p>
        <ButtonLink
          href={meetingUrl ?? "#"}
          variant="primary"
          {...meetingTrackProps(meetingTrackType)}
        >
          {ctaLabel}
        </ButtonLink>
      </div>
    </Section>
  );
}
