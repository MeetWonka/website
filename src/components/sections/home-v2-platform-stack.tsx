"use client";

import { useEffect, useRef, useState } from "react";
import { ClipVideo } from "@/components/pages/home-v2/clip-video";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BulletIcon } from "@/components/ui/icons/bullet";
import { Section } from "@/components/ui/section";
import {
  SolutionCardShape,
  type SolutionCardVariant,
} from "@/components/sections/solution/card-shape";
import { headingClass, radius } from "@/lib/design-tokens";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/routes";
import { cn } from "@/lib/utils";
import type { HomeV2Copy } from "@/views/copy/home-v2";
import { HomeV2Reveal } from "@/components/pages/home-v2/reveal";

type PlatformCopy = HomeV2Copy["platform"];

const CARD_VARIANTS: SolutionCardVariant[] = [
  "card-1",
  "card-2",
  "card-3",
  "card-2",
];

export function HomeV2PlatformStack({
  copy,
  locale,
}: {
  copy: PlatformCopy;
  locale: Locale;
}) {
  const panels = copy.panels;
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (panels.length === 0) return;
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
  }, [panels.length]);

  return (
    <section className="bg-white text-text pt-20 pb-16 md:pt-30 md:pb-20">
      <Section className="pb-0" aria-label={copy.eyebrow}>
        <div className="flex flex-col gap-16">
          <HomeV2Reveal>
            <div className="flex flex-col items-center gap-6 border-b border-dashed border-border pb-10">
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <h2
                className={cn(
                  headingClass.section,
                  "max-w-[44.875rem] text-center text-text",
                )}
              >
                {copy.title}
              </h2>
            </div>
          </HomeV2Reveal>

          <div className="flex flex-col gap-10 xl:flex-row xl:gap-16">
            <div className="hidden xl:block xl:min-w-0 xl:flex-1">
              <ul className="flex flex-col gap-2 xl:sticky xl:top-32">
                {panels.map((panel, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li
                      key={panel.id}
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
                        {panel.title}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col gap-10 xl:w-[55rem] xl:shrink-0">
              {panels.map((panel, i) => {
                const variant = CARD_VARIANTS[i] ?? "card-1";
                const videoSrc = `/videos/home/${locale}/${panel.id}.mp4`;
                const posterSrc = `/videos/home/${locale}/${panel.id}.jpg`;

                return (
                  <article
                    key={panel.id}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="relative flex flex-col"
                  >
                    <SolutionCardShape variant={variant} />
                    <div className="relative flex flex-1 flex-col">
                      <div
                        className={cn(
                          "border-border relative aspect-[3/2] w-full overflow-hidden border-b border-dashed bg-light-gray md:aspect-video",
                          radius.sm,
                        )}
                      >
                        <ClipVideo
                          src={videoSrc}
                          poster={posterSrc}
                          className="size-full object-cover"
                          loop
                        />
                      </div>
                      <div className="flex flex-col gap-3 border-t border-dashed border-border p-6 md:p-8">
                        <p className="type-eyebrow text-accent tabular-nums xl:hidden">
                          {String(i + 1).padStart(2, "0")}{" "}
                          <span className="text-text/35">
                            / {String(panels.length).padStart(2, "0")}
                          </span>
                        </p>
                        <h3 className="type-h6 text-text">{panel.title}</h3>
                        <p className="type-paragraph-m md:type-body text-text/80">
                          {panel.body}
                        </p>
                        {panel.ctaLabel ? (
                          <ButtonLink
                            href={localizeHref("/workspace/ai-agents", locale)}
                            variant="primary"
                            className="mt-1 w-fit"
                          >
                            {panel.ctaLabel}
                          </ButtonLink>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
