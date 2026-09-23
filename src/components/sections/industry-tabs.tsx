"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";
import { DEFAULT_MEETING_LABEL } from "@/lib/cms-text";
import { meetingTrackProps, type MeetingTrackType } from "@/lib/meeting-track";
import { headingClass, radius } from "@/lib/design-tokens";
import type { IndustriesSectionData } from "@/lib/types/page-sections";

interface IndustryTabsProps {
  data: IndustriesSectionData;
  meetingUrl: string | null;
  meetingLabel?: string | null;
  meetingTrackType: MeetingTrackType;
  className?: string;
}

export function IndustryTabs({
  data,
  meetingUrl,
  meetingLabel,
  meetingTrackType,
  className,
}: IndustryTabsProps) {
  const ctaLabel = meetingLabel ?? DEFAULT_MEETING_LABEL;
  const industries = data.industries ?? [];
  const [active, setActive] = useState(0);

  if (industries.length === 0) {
    return null;
  }

  const current = industries[active] ?? industries[0];
  const bullets = current.bullets ?? [];
  const clients = current.clients ?? [];
  const header = data.header;

  return (
    <section className="bg-mid-gray">
      <Section className={className ?? "py-24"}>
        {header?.heading ? (
          <SectionHeader
            align="left"
            className="max-w-3xl"
            eyebrow={
              header.eyebrow ? <Eyebrow>{header.eyebrow}</Eyebrow> : undefined
            }
            heading={header.heading}
            body={header.body ?? undefined}
            bodyClassName="max-w-2xl type-body text-text/65 opacity-100"
          />
        ) : null}
        <div className="mt-14">
          <div>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind, i) => (
                <button
                  key={ind._key}
                  type="button"
                  onClick={() => setActive(i)}
                  className={
                    `${radius.full} px-5 py-2 type-paragraph-s transition-colors ` +
                    (i === active
                      ? "bg-black text-white"
                      : "border border-border bg-white text-text/70 hover:text-text")
                  }
                >
                  {ind.label}
                </button>
              ))}
            </div>

            <Surface
              variant="card"
              className="mt-10 grid gap-10 border border-border bg-white p-8 md:grid-cols-2 md:gap-14 md:p-12"
            >
              <div className="flex flex-col">
                <h3 className={headingClass.subsection}>{current.label}</h3>
                {current.body ? (
                  <p className="mt-4 max-w-md type-body text-text/60">
                    {current.body}
                  </p>
                ) : null}
                <div className="mt-8">
                  <ButtonLink
                    href={meetingUrl ?? "#contact"}
                    variant="primary"
                    {...meetingTrackProps(meetingTrackType)}
                  >
                    {ctaLabel}
                  </ButtonLink>
                </div>
                {clients.length > 0 ? (
                  <div className="mt-auto pt-10">
                    <p className="type-eyebrow text-text/40">
                      Clients in this industry
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2">
                      {clients.map((client) => (
                        <span key={client} className="type-h6 text-text/40">
                          {client}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              {bullets.length > 0 ? (
                <ul className="md:border-l md:border-dashed md:border-border md:pl-10">
                  {bullets.map((item, i) => (
                    <li key={item}>
                      {i === 0 ? (
                        <div className="border-t border-dashed border-border" />
                      ) : null}
                      <div className="flex items-baseline gap-4 py-4">
                        <span className="font-mono type-eyebrow text-text/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="type-body leading-snug">{item}</span>
                      </div>
                      <div className="border-t border-dashed border-border" />
                    </li>
                  ))}
                </ul>
              ) : null}
            </Surface>
          </div>
        </div>
      </Section>
    </section>
  );
}
