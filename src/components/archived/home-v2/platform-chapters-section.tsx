"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ClipVideo } from "@/components/pages/home-v2/clip-video";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import type { ArchivedPlatformChaptersCopy } from "./platform-chapters-copy";

const EASE = [0.22, 1, 0.36, 1] as const;

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex max-w-3xl flex-col gap-5">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-text font-serif text-[2.4rem] leading-[1.04] tracking-[-0.01em] md:text-[3.4rem]">
        {title}
      </h2>
    </div>
  );
}

/** Dark three-chapter platform film (home-v2, Mar 2026) — preserved for reuse. */
export function ArchivedHomeV2PlatformChaptersSection({
  copy,
  locale,
}: {
  copy: ArchivedPlatformChaptersCopy;
  locale: Locale;
}) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const chapter = copy.chapters[active];
  const select = useCallback((i: number) => {
    setActive(i);
    setProgress(0);
  }, []);
  const next = useCallback(
    () => select((active + 1) % copy.chapters.length),
    [active, copy.chapters.length, select],
  );

  return (
    <section
      data-theme="dark"
      className="bg-background text-text py-20 md:py-30"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionTitle eyebrow={copy.eyebrow} title={copy.title} />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <ol className="divide-border border-border order-2 flex flex-col divide-y divide-dashed border-y border-dashed lg:order-1 lg:col-span-5">
            {copy.chapters.map((c, i) => {
              const isActive = i === active;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    className="w-full py-5 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span
                        className={cn(
                          "type-eyebrow tabular-nums",
                          isActive ? "text-accent" : "text-text/35",
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={cn(
                          "type-h6 transition-colors",
                          isActive ? "text-text" : "text-text/45",
                        )}
                      >
                        {c.title}
                      </span>
                    </span>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="block overflow-hidden pl-9"
                        >
                          <span className="type-paragraph-m text-text/70 block pt-3">
                            {c.body}
                          </span>
                          <span className="bg-text/10 mt-5 block h-px w-full overflow-hidden">
                            <span
                              className="block h-full bg-blue-400"
                              style={{ width: `${progress * 100}%` }}
                            />
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="border-border relative aspect-video overflow-hidden rounded-sm border border-dashed bg-[#18231f]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={`${chapter.id}-${locale}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0"
                >
                  <ClipVideo
                    src={`/videos/home/${locale}/${chapter.id}.mp4`}
                    poster={`/videos/home/${locale}/${chapter.id}.jpg`}
                    className="size-full object-cover"
                    loop={false}
                    onTime={setProgress}
                    onEnded={next}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
