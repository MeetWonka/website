"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BulletIcon } from "@/components/ui/icons/bullet";
import { FadeIn } from "@/components/animations/fade-in";
import {
  SolutionCardShape,
  type SolutionCardVariant,
} from "./card-shape";
import { CardThreeVisual } from "./card-3-visual";
import { CardFourVisual } from "./card-4-visual";
import { cn } from "@/lib/utils";
import type { SolutionData } from "@/lib/types";

const EYEBROW = "What we do";
const HEADING = "Wonka makes AI work for your whole organisation.";
const BODY =
  "Wonka understands your business processes, connects to your tools, and gets the work done. Across systems. Automatically.";

export const ARCHIVED_SOLUTION_COPY = { eyebrow: EYEBROW, heading: HEADING, body: BODY };

const CARD_VARIANTS: SolutionCardVariant[] = [
  "card-1",
  "card-2",
  "card-3",
  "card-2",
  "card-1",
];

type CardVisual =
  | { kind: "image"; src: string; aspectClass: string }
  | { kind: "component"; component: React.ComponentType; aspectClass: string };

const CARD_VISUALS: Array<CardVisual | null> = [
  {
    kind: "image",
    src: "/images/archived/solution/card-1/card-1-visual.png",
    aspectClass: "aspect-[3/2] md:aspect-[2640/1308]",
  },
  {
    kind: "image",
    src: "/images/archived/solution/card-2/card-2-visual.png",
    aspectClass: "aspect-[3/2] md:aspect-[1760/872]",
  },
  {
    kind: "component",
    component: CardThreeVisual,
    aspectClass: "aspect-[3/2] md:aspect-[1760/872]",
  },
  {
    kind: "component",
    component: CardFourVisual,
    aspectClass: "aspect-[3/2] md:aspect-[1760/816]",
  },
  {
    kind: "image",
    src: "/images/archived/solution/card-5/card-5-visual.png",
    aspectClass: "aspect-[3/2] md:aspect-[1760/872]",
  },
];

interface SolutionProps {
  data: SolutionData | null;
  id?: string;
}

export function ArchivedSolutionSection({ data, id }: SolutionProps) {
  const steps = data?.steps ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (steps.length === 0) return;
    let raf = 0;
    const update = () => {
      const target = window.innerHeight * 0.4;
      let bestIdx = 0;
      let bestDistance = Infinity;
      for (let i = 0; i < cardRefs.current.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - target);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIdx = i;
        }
      }
      setActiveIndex((prev) => (prev !== bestIdx ? bestIdx : prev));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [steps.length]);

  if (!data) return null;

  return (
    <Section id={id} className="py-20 md:py-30" aria-label={EYEBROW}>
      <div className="flex flex-col gap-16">
        <div
          ref={headerRef}
          className="flex flex-col items-center gap-6 border-b border-dashed border-border pb-10"
        >
          <FadeIn play={headerInView}>
            <Eyebrow>{EYEBROW}</Eyebrow>
          </FadeIn>
          <FadeIn play={headerInView} delay={0.1}>
            <h2 className="type-h4 max-w-[44.875rem] text-center text-text">
              {HEADING}
            </h2>
          </FadeIn>
          <FadeIn play={headerInView} delay={0.2}>
            <p className="type-body max-w-[35.125rem] text-center text-text opacity-80">
              {BODY}
            </p>
          </FadeIn>
        </div>

        {steps.length > 0 ? (
          <div className="flex flex-col gap-10 xl:flex-row xl:gap-16">
            <div className="hidden xl:block xl:min-w-0 xl:flex-1">
              <ul className="flex flex-col gap-2 xl:sticky xl:top-32">
                {steps.map((step, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li
                      key={step._key}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "flex items-center border-b border-dashed border-border pb-2 transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-40",
                      )}
                    >
                      <span
                        className={cn(
                          "mr-2.5 shrink-0 text-accent-dark transition-opacity duration-300 ease-out",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      >
                        <BulletIcon />
                      </span>
                      <span
                        className={cn(
                          "type-paragraph-m text-text transition-transform duration-300 ease-out",
                          isActive ? "translate-x-0" : "-translate-x-[1.0625rem]",
                        )}
                      >
                        {step.title}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col gap-10 xl:w-[55rem] xl:shrink-0">
              {steps.map((step, i) => {
                const variant = CARD_VARIANTS[i] ?? "card-1";
                const visual = CARD_VISUALS[i] ?? null;
                return (
                  <article
                    key={step._key}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="relative flex flex-col"
                  >
                    <SolutionCardShape variant={variant} />
                    <div className="relative flex flex-1 flex-col">
                      <div
                        className={cn(
                          "relative w-full",
                          visual ? visual.aspectClass : "aspect-[11/7]",
                        )}
                      >
                        {visual ? (
                          visual.kind === "component" ? (
                            <visual.component />
                          ) : visual.src.endsWith(".svg") ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={visual.src}
                              alt=""
                              className="absolute inset-0 size-full object-cover"
                            />
                          ) : (
                            <Image
                              src={visual.src}
                              alt=""
                              fill
                              sizes="(min-width: 1280px) 55rem, 100vw"
                              className="object-cover"
                              priority={i === 0}
                              unoptimized
                            />
                          )
                        ) : null}
                      </div>
                      <div className="flex flex-col gap-3 border-t border-dashed border-border p-6 md:p-8">
                        <h3 className="type-h6 text-text">{step.title}</h3>
                        {step.body ? (
                          <p className="type-paragraph-m md:type-body text-text opacity-80">
                            {step.body}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
