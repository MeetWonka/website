"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";

interface ServiceCard {
  tagline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

const CARDS: ServiceCard[] = [
  {
    tagline: "Know where to begin.",
    body: "For organisations that know AI matters but not where it fits. We assess where AI creates real value for you, build the business cases with ROI, and hand you a roadmap and policy to move forward with confidence.",
    ctaLabel: "Discover Start AI",
    ctaHref: "/start-ai",
  },
  {
    tagline: "Build exactly what you need.",
    body: "For the processes off-the-shelf tools can't handle. We design and build custom AI applications and agents around your systems and workflows — not a demo, but something that runs in your real operation.",
    ctaLabel: "Discover Wonka Build",
    ctaHref: "/ai-agents",
  },
  {
    tagline: "AI for your whole team.",
    body: "For teams ready to use AI every day. One AI chat connected to your tools and data, with agents that act on your processes. Your people don't become prompt engineers — they just get to work.",
    ctaLabel: "Discover WonkaChat",
    ctaHref: "/wonka-chat",
  },
];

export function HowItWorksDraft({ id = "how-it-works-draft" }: { id?: string }) {
  const headingId = `${id}-heading`;
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const cardsRef = useRef<HTMLUListElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });

  return (
    <Section id={id} className="py-20 md:py-30" aria-labelledby={headingId}>
      <div className="flex flex-col gap-16">
        <div ref={headerRef} className="flex flex-col items-center gap-6">
          <FadeIn play={headerInView}>
            <Eyebrow>What we do</Eyebrow>
          </FadeIn>
          <FadeIn play={headerInView} delay={0.1}>
            <h2
              id={headingId}
              className="type-h4 max-w-[44.875rem] text-center text-text"
            >
              Everything you need
              <br />
              to make AI work.
            </h2>
          </FadeIn>
        </div>

        <ul ref={cardsRef} className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {CARDS.map((card, i) => (
            <li key={card.tagline}>
              <FadeIn
                play={cardsInView}
                delay={i * 0.12}
                className="flex h-full flex-col gap-6 rounded-sm border border-dashed border-border p-6 md:p-8"
              >
                <h3 className="type-h6 text-text">{card.tagline}</h3>
                <p className="type-body flex-1 text-text opacity-80">{card.body}</p>
                <ButtonLink href={card.ctaHref} variant="primary" className="self-start">
                  {card.ctaLabel}
                </ButtonLink>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
