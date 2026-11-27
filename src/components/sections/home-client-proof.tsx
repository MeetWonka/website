"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HomeV2Reveal } from "@/components/pages/home-v2/reveal";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import { useT } from "@/i18n/use-t";
import { headingClass } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export interface HomeClientProofCard {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string | null;
  portraitUrl: string;
  portraitAlt: string;
  companyLogoUrl: string | null;
  companyLogoAlt: string | null;
  companyLogoWidth: number;
  companyLogoHeight?: number;
  portraitObjectPosition?: string;
  statValue: string;
  statLabel: string;
}

export interface ClientProofVideo {
  youtubeId: string;
  title: string;
  playLabel: string;
  closeLabel: string;
}

function ClientProofVideoModal({
  youtubeId,
  title,
  closeLabel,
  onClose,
}: {
  youtubeId: string;
  title: string;
  closeLabel: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="type-paragraph-s absolute -top-10 right-0 text-white/80 underline-offset-4 hover:underline"
        >
          {closeLabel} ✕
        </button>
        <div className="aspect-video overflow-hidden rounded-sm bg-black">
          <iframe
            className="size-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </motion.div>
  );
}

function PortraitPlayButton({ label }: { label: string }) {
  return (
    <>
      <span className="absolute inset-0 bg-black/15 transition-colors group-hover/portrait:bg-black/25" />
      <span className="absolute top-1/2 left-1/2 flex size-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform group-hover/portrait:scale-105">
        <svg
          viewBox="0 0 12 12"
          className="ml-1 size-5 fill-current"
          aria-hidden
        >
          <path d="M3 1.5v9l7.5-4.5z" />
        </svg>
      </span>
      <span className="sr-only">{label}</span>
    </>
  );
}

interface ClientProofCardProps {
  card: HomeClientProofCard;
  index?: number;
  className?: string;
  video?: ClientProofVideo;
}

export function ClientProofCard({
  card,
  index = 0,
  className,
  video,
}: ClientProofCardProps) {
  const t = useT();
  const [videoOpen, setVideoOpen] = useState(false);

  const portraitPosition = card.portraitObjectPosition ?? "center";
  const portrait = (
    <Image
      src={card.portraitUrl}
      alt={card.portraitAlt}
      fill
      sizes="(min-width: 1024px) 320px, 100vw"
      className="object-cover"
      style={{ objectPosition: portraitPosition }}
    />
  );

  return (
    <>
      <HomeV2Reveal delay={0.12 + index * 0.1} className={className}>
        <Surface variant="card" className="overflow-hidden bg-mid-gray p-0">
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-t-sm lg:w-[17.5rem] lg:rounded-none lg:rounded-l-sm xl:w-[20rem]">
              {video ? (
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  aria-label={video.playLabel}
                  className="group/portrait relative block size-full cursor-pointer"
                >
                  {portrait}
                  <PortraitPlayButton label={video.playLabel} />
                </button>
              ) : (
                portrait
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between gap-8 border-t border-dashed border-border p-8 md:p-10 lg:border-t-0 lg:border-r">
              <blockquote
                className={cn(headingClass.subsection, "text-text text-balance")}
              >
                {card.quote}
              </blockquote>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="type-paragraph-m-bold text-text">
                    {card.authorName}
                  </p>
                  {card.authorRole ? (
                    <p className="type-paragraph-m text-text/70">
                      {card.authorRole}
                    </p>
                  ) : null}
                </div>
                {card.companyLogoUrl ? (
                  <Image
                    src={card.companyLogoUrl}
                    alt={card.companyLogoAlt ?? ""}
                    width={card.companyLogoWidth}
                    height={card.companyLogoHeight ?? 28}
                    className={cn(
                      "w-auto self-start object-contain",
                      card.companyLogoHeight && card.companyLogoHeight >= 48
                        ? "h-12"
                        : card.companyLogoHeight && card.companyLogoHeight > 28
                          ? "h-8"
                          : "h-7",
                    )}
                    sizes={`${card.companyLogoWidth}px`}
                  />
                ) : (
                  <div className="flex h-7 w-[4.3rem] items-center justify-center rounded-xs border border-dashed border-border type-eyebrow text-text/60">
                    {t("sections.testimonials.logoPlaceholder")}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center border-t border-dashed border-border px-8 py-10 lg:w-[14rem] lg:shrink-0 lg:border-t-0 xl:w-[16rem] xl:px-10">
              <p className="font-serif text-[2.5rem] leading-none lining-nums text-text md:text-[3rem]">
                {card.statValue}
              </p>
              <p className="mt-3 type-paragraph-m text-text/70 text-balance">
                {card.statLabel}
              </p>
            </div>
          </div>
        </Surface>
      </HomeV2Reveal>

      <AnimatePresence>
        {video && videoOpen ? (
          <ClientProofVideoModal
            youtubeId={video.youtubeId}
            title={video.title}
            closeLabel={video.closeLabel}
            onClose={() => setVideoOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

interface HomeClientProofProps {
  id?: string;
  heading: string;
  cards: HomeClientProofCard[];
}

export function HomeClientProof({ id, heading, cards }: HomeClientProofProps) {
  const t = useT();

  if (cards.length === 0) return null;

  return (
    <Section
      id={id}
      className="py-20 md:py-30"
      aria-label={t("sections.clientProof.ariaLabel")}
    >
      <div className="max-w-[44rem]">
        <HomeV2Reveal>
          <h2 className={cn(headingClass.section, "text-text")}>{heading}</h2>
        </HomeV2Reveal>
      </div>
      <ul className="mt-12 flex flex-col gap-6 md:mt-16 md:gap-8">
        {cards.map((card, index) => (
          <li key={card.id}>
            <ClientProofCard card={card} index={index} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
