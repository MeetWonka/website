"use client";

import { HomeV2Reveal } from "@/components/pages/home-v2/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";
import type { Locale } from "@/i18n/config";
import { commercialPath } from "@/i18n/routes";
import { headingClass } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import type { HomeV2Copy } from "@/views/copy/home-v2";

export function HomeV2Subsidies({
  copy,
  locale,
}: {
  copy: HomeV2Copy["subsidies"];
  locale: Locale;
}) {
  const startAiHref = commercialPath("startAi", locale);

  return (
    <section className="bg-background py-14 md:py-20">
      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-center lg:gap-16">
          <HomeV2Reveal>
            <SectionHeader
              align="left"
              eyebrow={<Eyebrow>{copy.eyebrow}</Eyebrow>}
              heading={copy.title}
              body={copy.body}
              headingRole="section"
            />
            <ButtonLink
              href={startAiHref}
              variant="primary"
              className="mt-6 md:mt-8"
            >
              {copy.strategyCta}
            </ButtonLink>
          </HomeV2Reveal>

          {copy.cards.length ? (
            <div className="grid gap-4">
              {copy.cards.map((card, index) => (
                <HomeV2Reveal key={card.title} delay={0.08 + 0.06 * index}>
                  <Surface
                    variant="card"
                    className="flex flex-col gap-3 bg-mid-gray p-6"
                  >
                    <p className="type-eyebrow text-text/45">
                      {copy.subsidiesTitle}
                    </p>
                    <h3 className={cn(headingClass.card, "text-text")}>
                      {card.title}
                    </h3>
                    <p className="type-paragraph-m text-text/70">{card.body}</p>
                    <ButtonLink
                      href={card.href}
                      variant="underline"
                      className="mt-2 w-fit"
                    >
                      {copy.cardCta}
                    </ButtonLink>
                  </Surface>
                </HomeV2Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </Section>
    </section>
  );
}
