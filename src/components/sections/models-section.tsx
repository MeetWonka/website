"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import {
  getModelsSectionCopy,
  type ModelsSectionCopy,
  type ModelsSectionModelId,
} from "@/views/copy/models-section";

const LOGO = "/images/home/logos";
const EASE = [0.22, 1, 0.36, 1] as const;

const MODEL_META = {
  openai: { name: "GPT", vendor: "OpenAI", src: `${LOGO}/model-openai.svg` },
  claude: {
    name: "Claude",
    vendor: "Anthropic",
    src: `${LOGO}/model-claude.svg`,
  },
  gemini: { name: "Gemini", vendor: "Google", src: `${LOGO}/model-gemini.png` },
  mistral: {
    name: "Mistral",
    vendor: "Mistral AI",
    src: `${LOGO}/model-mistral.png`,
  },
} as const;

const MODEL_ORDER: ModelsSectionModelId[] = [
  "openai",
  "claude",
  "gemini",
  "mistral",
];

// TODO: CHECK token rates for Claude Opus 5.5 and GPT-5.6 Luna (also quoted in views/copy/models-section.ts).
const HEAVY_TASK_COST = 3 * 5.5 + 27.5;
const LIGHT_TASK_COST = 3 * 0.22 + 1.32;

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : reduce ? undefined : { opacity: 0, y: 24 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SavingsCard({ copy }: { copy: ModelsSectionCopy }) {
  const { savings: labels } = copy;
  const [share, setShare] = useState(70);
  const savings = Math.round(share * (1 - LIGHT_TASK_COST / HEAVY_TASK_COST));

  return (
    <div
      data-theme="dark"
      className="bg-background text-text flex h-full flex-col gap-8 rounded-sm p-7 md:p-10"
    >
      <div className="space-y-3">
        <p className="type-paragraph-m text-text/75">{labels.outcomeUpTo}</p>
        <p className="font-serif text-[4.5rem] leading-none tracking-[-0.03em] lining-nums tabular-nums md:text-[5.5rem]">
          {savings}
          <span className="text-blue-400">%</span>
        </p>
        <p className="type-h6 text-text">{labels.outcomeSuffix}</p>
      </div>

      <label className="block space-y-4">
        <div className="type-paragraph-s text-text/60 flex items-start justify-between gap-4">
          <span className="max-w-[9rem] leading-snug">{labels.sliderLeft}</span>
          <span className="max-w-[9rem] text-right leading-snug">
            {labels.sliderRight}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={share}
          onChange={(e) => setShare(Number(e.target.value))}
          aria-valuetext={`${share}%`}
          className="w-full cursor-pointer accent-blue-400"
        />
      </label>

      <p className="type-paragraph-m text-text/70">{labels.supportingLine}</p>

      <p className="type-paragraph-s text-text/45 mt-auto border-t border-dashed border-border pt-6 leading-relaxed">
        {labels.source}
      </p>
    </div>
  );
}

export function ModelsSection({ locale }: { locale: Locale }) {
  const copy = getModelsSectionCopy(locale);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % copy.tasks.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, [inView, reduce, copy.tasks.length]);

  const task = copy.tasks[index];

  return (
    <Section id="models" className="py-20 md:py-30">
      <div ref={ref}>
        <SectionHeader
          eyebrow={<Eyebrow>{copy.eyebrow}</Eyebrow>}
          heading={copy.title}
          body={copy.body}
          align="left"
          className="max-w-3xl"
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-7" delay={0.05}>
            <div className="bg-mid-gray flex h-full flex-col justify-center rounded-sm p-6 md:p-10">
              <div className="border-border flex items-center gap-3 rounded-sm border bg-white px-4 py-3.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xs bg-black">
                  <Image
                    src={`${LOGO}/wonka-logo-mark-white-transparent.png`}
                    alt=""
                    width={18}
                    height={18}
                    className="size-4 object-contain"
                  />
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={task.task}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="type-paragraph-m text-text min-w-0 flex-1 truncate"
                  >
                    {task.task}
                  </motion.span>
                </AnimatePresence>
                <span className="type-paragraph-s border-border text-text/70 hidden items-center gap-1.5 rounded-full border px-3 py-0.5 sm:flex">
                  <span className="text-accent">✦</span> {copy.auto}
                </span>
              </div>

              <div
                className="border-text/25 relative mx-auto my-4 h-12 w-px overflow-hidden border-l border-dashed"
                aria-hidden
              >
                <motion.span
                  key={index}
                  className="absolute inset-x-[-1px] top-0 h-6 bg-gradient-to-b from-transparent via-blue-400 to-transparent"
                  initial={{ y: -24 }}
                  animate={{ y: 48 }}
                  transition={{ duration: 0.7, ease: "easeIn" }}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {MODEL_ORDER.map((id) => {
                  const meta = MODEL_META[id];
                  const selected = id === task.model;
                  return (
                    <div
                      key={id}
                      className={cn(
                        "relative flex items-center gap-3 rounded-sm border bg-white p-4 transition-colors duration-500",
                        selected ? "border-blue-400" : "border-border",
                      )}
                    >
                      <span className="border-border flex size-10 shrink-0 items-center justify-center rounded-xs border bg-white">
                        <Image
                          src={meta.src}
                          alt={meta.vendor}
                          width={24}
                          height={24}
                          className="size-6 object-contain"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="type-paragraph-m text-text block truncate">
                          {meta.name}
                        </span>
                        <span className="type-paragraph-s text-text/55 block truncate">
                          {meta.vendor}
                        </span>
                      </span>
                      {selected && (
                        <span className="type-paragraph-s ml-auto shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-700">
                          {task.tier === "light" ? copy.light : copy.advanced}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-5" delay={0.12}>
            <SavingsCard copy={copy} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
