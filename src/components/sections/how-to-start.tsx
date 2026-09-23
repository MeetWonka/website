"use client";

import Image from "next/image";
import { useRef } from "react";
import { useInView } from "motion/react";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { CheckmarkIcon } from "@/components/ui/icons/checkmark-icon";
import { FadeIn } from "@/components/animations/fade-in";
import { MultilineText, DEFAULT_MEETING_LABEL } from "@/lib/cms-text";
import { meetingTrackProps, type MeetingTrackType } from "@/lib/meeting-track";
import { headingClass } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import type { HowToStartData } from "@/lib/types";

const DEFAULT_EYEBROW = "How to start";
const DEFAULT_HEADING = "Not sure how to get started?";
const DEFAULT_BODY =
  "That's exactly why we talk.\nBook a 30-minute call. Tell us how you work, and we'll tell you where AI would actually make a difference, and where it wouldn't.";
const DEFAULT_CALLOUT_HEADING = "30 minutes.\nYou'll know if it makes sense.";
const DEFAULT_OUTCOMES_HEADING = "You walk away with";

const DEFAULT_OUTCOMES: string[] = [
  "A sense of what's realistic to achieve, and how fast.",
  "A clear next step, whether that's Start AI, Wonka Build, or WonkaChat.",
  "Answers to your specific AI questions.",
  "No obligation, no pressure. Just a clearer picture about AI.",
];

interface HowToStartProps {
  id?: string;
  data?: HowToStartData | null;
  meetingUrl?: string | null;
  meetingLabel?: string | null;
  meetingTrackType?: MeetingTrackType;
}

export function HowToStart({
  id,
  data,
  meetingUrl,
  meetingLabel,
  meetingTrackType = "general",
}: HowToStartProps) {
  const eyebrow = data?.eyebrow ?? DEFAULT_EYEBROW;
  const heading = data?.heading ?? DEFAULT_HEADING;
  const body = data?.body ?? DEFAULT_BODY;
  const calloutHeading = data?.calloutHeading ?? DEFAULT_CALLOUT_HEADING;
  const outcomesHeading = data?.outcomesHeading ?? DEFAULT_OUTCOMES_HEADING;
  const outcomes =
    data?.outcomes?.length ? data.outcomes : DEFAULT_OUTCOMES;
  const ctaLabel = meetingLabel ?? DEFAULT_MEETING_LABEL;

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <Section
      id={id}
      className="pt-15 pb-20 md:pb-30"
      aria-labelledby="how-to-start-heading"
    >
      <div className="flex flex-col gap-16 md:gap-20">
        <div ref={headerRef} className="flex flex-col items-center gap-6">
          <FadeIn play={headerInView}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </FadeIn>
          <FadeIn play={headerInView} delay={0.1}>
            <MultilineText
              text={heading}
              as="h2"
              id="how-to-start-heading"
              className={cn(headingClass.section, "max-w-[44.875rem] text-center text-text")}
            />
          </FadeIn>
          <FadeIn play={headerInView} delay={0.2}>
            <MultilineText
              text={body}
              as="p"
              className="type-body max-w-[35.125rem] text-center text-text opacity-80"
            />
          </FadeIn>
        </div>

        <div className="flex flex-col gap-3.5">
          <Surface
            variant="callout"
            data-theme="dark"
            className="relative bg-black p-7"
          >
            <Image
              src="/images/how-to-start/how-to-start-bg.avif"
              alt=""
              fill
              unoptimized
              sizes="(min-width: 1440px) 1344px, 100vw"
              className="pointer-events-none object-cover opacity-90"
            />

            <div className="relative flex flex-col items-start gap-6">
              <MultilineText
                text={calloutHeading}
                as="h3"
                className="type-h5 max-w-[44.875rem] text-text"
              />
              <ButtonLink
                href={meetingUrl ?? "#"}
                variant="primary"
                {...meetingTrackProps(meetingTrackType)}
              >
                {ctaLabel}
              </ButtonLink>
            </div>
          </Surface>

          <Surface
            variant="card"
            className="flex flex-col gap-8 border border-border bg-light-gray px-7 py-10 lg:flex-row lg:items-stretch lg:gap-6"
          >
            <h3 className="type-h5 flex-1 text-text">{outcomesHeading}</h3>
            <ul className="flex flex-1 flex-col justify-center gap-2">
              {outcomes.map((outcome, i) => (
                <li
                  key={outcome}
                  className={cn(
                    "flex items-center gap-2.5",
                    i < outcomes.length - 1 &&
                      "border-b border-dashed border-border pb-2",
                  )}
                >
                  <CheckmarkIcon className="size-2.5 shrink-0 text-text" />
                  <span className="type-paragraph-m text-text">{outcome}</span>
                </li>
              ))}
            </ul>
          </Surface>
        </div>
      </div>
    </Section>
  );
}
