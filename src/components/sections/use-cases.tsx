"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BulletIcon } from "@/components/ui/icons/bullet";
import { CheckmarkIcon } from "@/components/ui/icons/checkmark-icon";
import { FadeIn } from "@/components/animations/fade-in";
import { cn } from "@/lib/utils";
import { DEFAULT_USE_CASES, resolveUseCasesSection } from "@/lib/cms-sections";
import { MultilineText } from "@/lib/cms-text";
import type { UseCasesData } from "@/lib/types";

interface UseCasesProps {
  data?: UseCasesData | null;
  id?: string;
  defaults?: UseCasesData;
}

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;
const SWAP_EASE = [0.32, 0.72, 0, 1] as const;

const swapContainer = {
  initial: {},
  animate: (delay: number = 0) => ({
    transition: { delayChildren: delay, staggerChildren: 0.035 },
  }),
  exit: {
    transition: { staggerChildren: 0.015, staggerDirection: -1 },
  },
};

const swapItem = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: SWAP_EASE },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.12, ease: SWAP_EASE },
  },
};

export function UseCases({ data, id, defaults = DEFAULT_USE_CASES }: UseCasesProps) {
  const resolved = resolveUseCasesSection(data, null, defaults);
  const industries = resolved.industries ?? [];
  const eyebrow = resolved.eyebrow ?? "Use cases";
  const heading =
    resolved.heading ??
    "The work that used to wait now doesn't. Across teams.";
  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const cardsRef = useRef<HTMLUListElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });

  if (industries.length === 0) return null;

  const active = industries[Math.min(activeIndex, industries.length - 1)];
  const workflows = active?.workflows ?? [];

  return (
    <Section
      id={id}
      className="pt-15 pb-20 md:pb-30"
      aria-labelledby="use-cases-heading"
    >
      <div className="flex flex-col gap-10 md:gap-16">
        <div
          ref={headerRef}
          className="flex flex-col items-start gap-8 border-b border-dashed border-border pb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        >
          <div className="flex flex-col items-start gap-6">
            <FadeIn play={headerInView}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </FadeIn>
            <FadeIn play={headerInView} delay={0.1}>
              <MultilineText
                text={heading}
                as="h2"
                id="use-cases-heading"
                className="type-h4 max-w-[36.625rem] text-text"
              />
            </FadeIn>
          </div>

          <ul
            role="tablist"
            aria-label="Industries"
            className="flex flex-wrap items-center gap-2 lg:flex-nowrap lg:gap-0"
          >
            {industries.map((industry, i) => {
              const isActive = i === activeIndex;
              const isLast = i === industries.length - 1;
              return (
                <li
                  key={industry._key}
                  className={cn(
                    "flex shrink-0 items-center",
                    !isLast &&
                      "lg:mr-4 lg:border-r lg:border-dashed lg:border-border lg:pr-4",
                  )}
                >
                  <FadeIn play={headerInView} delay={0.2 + i * 0.06}>
                    <button
                      type="button"
                      role="tab"
                      id={`use-cases-tab-${i}`}
                      aria-selected={isActive}
                      aria-controls="use-cases-panel"
                      onClick={() => setActiveIndex(i)}
                      className={cn(
                        "type-eyebrow flex cursor-pointer items-center rounded-full px-3 py-1.5 transition-colors duration-200",
                        isActive
                          ? "bg-blue-100 text-blue-900"
                          : "bg-light-gray text-light-brown hover:text-text",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.15, ease: EASE_OUT }}
                          aria-hidden
                          className="mr-1.5 inline-flex shrink-0 text-blue-900"
                        >
                          <BulletIcon className="h-2.5 w-[0.4167rem]" />
                        </motion.span>
                      ) : null}
                      {industry.label}
                    </button>
                  </FadeIn>
                </li>
              );
            })}
          </ul>
        </div>

        <ul
          ref={cardsRef}
          role="tabpanel"
          id="use-cases-panel"
          aria-labelledby={`use-cases-tab-${activeIndex}`}
          className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3"
        >
          {[0, 1, 2].map((slot) => {
            const workflow = workflows[slot];
            const tag = `Workflow ${String(slot + 1).padStart(2, "0")}`;
            const cardDelay = slot * 0.045;
            const bullets = workflow?.bullets ?? [];

            return (
              <li
                key={slot}
                className="flex min-h-90 flex-col rounded-sm border border-border bg-light-gray p-7"
              >
                <FadeIn
                  play={cardsInView}
                  duration={0.5}
                  delay={slot * 0.08}
                  y={8}
                  className="flex h-full flex-col justify-between gap-9"
                >
                  <div className="flex flex-col items-start gap-4">
                    <span className="type-eyebrow rounded-full bg-dark-brown px-2.5 py-1 text-light-gray">
                      {tag}
                    </span>
                    <AnimatePresence mode="wait" initial={false}>
                      {workflow ? (
                        <motion.h3
                          key={`${active._key}-title`}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{
                            duration: 0.22,
                            ease: SWAP_EASE,
                            delay: cardDelay,
                          }}
                          className="type-h6 text-text"
                        >
                          {workflow.title}
                        </motion.h3>
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    {workflow ? (
                      <motion.div
                        key={active._key}
                        variants={swapContainer}
                        custom={cardDelay + 0.03}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex flex-col gap-9"
                      >
                        {workflow.description ? (
                          <motion.p
                            variants={swapItem}
                            className="type-body text-text opacity-80"
                          >
                            {workflow.description}
                          </motion.p>
                        ) : null}

                        {bullets.length > 0 ? (
                          <motion.ul
                            variants={swapContainer}
                            className="flex flex-col gap-2"
                          >
                            {bullets.map((bullet, i) => (
                              <motion.li
                                key={i}
                                variants={swapItem}
                                className={cn(
                                  "flex items-start gap-2.5",
                                  i < bullets.length - 1 &&
                                    "border-b border-dashed border-border pb-2",
                                )}
                              >
                                <CheckmarkIcon className="mt-1.75 h-2.5 w-3 shrink-0 text-text" />
                                <span className="type-paragraph-m text-text">
                                  {bullet}
                                </span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        ) : null}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
