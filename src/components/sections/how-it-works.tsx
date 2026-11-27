"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { useT, useUiLocale } from "@/i18n/use-t";
import type { UiTranslator } from "@/i18n/ui";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/routes";
import { MultilineText } from "@/lib/cms-text";
import { headingClass } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import type { SharedLinks, WhatWeDoCard, WhatWeDoData } from "@/lib/types";

interface ResolvedCard {
  _key: string;
  tagline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

const DEFAULT_CARD_HREFS = ["/start-ai", "/wonka-build", "/wonka-chat"];

function defaultCards(t: UiTranslator): Omit<ResolvedCard, "_key">[] {
  const copy = t.raw("home.howItWorks.cards") as Array<
    Pick<ResolvedCard, "tagline" | "body" | "ctaLabel">
  >;
  return copy.map((card, i) => ({
    ...card,
    ctaHref: DEFAULT_CARD_HREFS[i] ?? DEFAULT_CARD_HREFS[0],
  }));
}

function resolveCards(
  data: WhatWeDoData | null | undefined,
  sharedLinks: SharedLinks | null | undefined,
  t: UiTranslator,
  locale: Locale,
): ResolvedCard[] {
  const DEFAULT_CARDS = defaultCards(t);
  const productUrls = [
    sharedLinks?.startAiUrl ?? "/start-ai",
    sharedLinks?.wonkaBuildUrl ?? "/wonka-build",
    sharedLinks?.wonkaChatUrl ?? "/wonka-chat",
  ];
  const source: Array<WhatWeDoCard | Omit<ResolvedCard, "_key">> =
    data?.cards?.length ? data.cards : DEFAULT_CARDS;

  return source.map((card, i) => {
    const fallback = DEFAULT_CARDS[i] ?? DEFAULT_CARDS[0];
    const cmsCard = "cta" in card ? card : null;

    return {
      _key: cmsCard?._key ?? `default-${i}`,
      tagline: card.tagline,
      body: card.body,
      ctaLabel: cmsCard?.cta?.label ?? fallback.ctaLabel,
      ctaHref: localizeHref(
        cmsCard?.cta?.href || productUrls[i] || fallback.ctaHref,
        locale,
      ),
    };
  });
}

interface HowItWorksProps {
  id?: string;
  data?: WhatWeDoData | null;
  sharedLinks?: SharedLinks | null;
}

export function HowItWorks({
  id = "how-it-works",
  data,
  sharedLinks,
}: HowItWorksProps) {
  const headingId = `${id}-heading`;
  const t = useT();
  const locale = useUiLocale();
  const eyebrow = data?.eyebrow ?? t("home.howItWorks.eyebrow");
  const heading = data?.heading ?? t("home.howItWorks.heading");
  const cards = resolveCards(data, sharedLinks, t, locale);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const cardsRef = useRef<HTMLUListElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });

  return (
    <Section id={id} className="py-20 md:py-30" aria-labelledby={headingId}>
      <div className="flex flex-col gap-16">
        <div ref={headerRef} className="flex flex-col items-center gap-6">
          <FadeIn play={headerInView}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </FadeIn>
          <FadeIn play={headerInView} delay={0.1}>
            <MultilineText
              text={heading}
              as="h2"
              id={headingId}
              className={cn(headingClass.section, "max-w-[44.875rem] text-center text-text")}
            />
          </FadeIn>
        </div>

        <ul ref={cardsRef} className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {cards.map((card, i) => (
            <li key={card._key} className="h-full">
              <FadeIn
                play={cardsInView}
                delay={i * 0.12}
                className="relative isolate flex h-full min-h-[22rem] flex-col overflow-hidden rounded-sm bg-blue-400 p-6 md:min-h-[24rem] md:p-8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 110% at 65% 115%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 65%)",
                  }}
                />
                <h3 className="relative shrink-0 type-h6 text-white">{card.tagline}</h3>
                <div className="relative min-h-6 flex-1" aria-hidden />
                <div className="relative flex flex-col gap-6">
                  <p className="type-body text-white opacity-80">{card.body}</p>
                  <ButtonLink
                    href={card.ctaHref}
                    variant="secondary"
                    className="type-paragraph-m-bold relative h-[2.6875rem] self-start px-[1.125rem] text-black [&>svg:first-of-type_path]:fill-light-gray"
                  >
                    {card.ctaLabel}
                  </ButtonLink>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
