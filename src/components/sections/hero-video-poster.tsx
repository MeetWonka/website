"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ButtonBackgroundShape, buttonVariants } from "@/components/ui/button";
import { radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

function PlayIcon({
  className,
  centered,
}: {
  className?: string;
  centered?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={cn("size-5 fill-current", centered && "ml-0.5", className)}
      aria-hidden
    >
      <path d="M3 1.5v9l7.5-4.5z" />
    </svg>
  );
}

interface HeroVideoPosterProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  youtubeId: string;
  playLabel: string;
  closeLabel: string;
  caption?: string;
  sizes: string;
  unoptimized?: boolean;
  priority?: boolean;
}

export function HeroVideoPoster({
  src,
  alt,
  width,
  height,
  youtubeId,
  playLabel,
  closeLabel,
  caption,
  sizes,
  unoptimized,
  priority,
}: HeroVideoPosterProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={caption ?? playLabel}
        className={cn(
          radius.sm,
          "group/poster relative block w-full cursor-pointer overflow-hidden",
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full"
          unoptimized={unoptimized}
        />
        <span className="absolute inset-0 bg-black/10 transition-colors group-hover/poster:bg-black/20" />
        <span className="absolute inset-0 flex items-center justify-center p-4">
          {caption ? (
            <>
              <span
                className={cn(
                  radius.full,
                  "flex size-16 items-center justify-center bg-white text-black shadow-lg transition-transform duration-[var(--ds-motion-duration-normal)] will-change-transform group-hover/poster:scale-110 md:hidden",
                )}
              >
                <PlayIcon
                  centered
                  className="size-7 text-black"
                />
              </span>
              <span
                className={cn(
                  buttonVariants({ variant: "primary" }),
                  "group/btn pointer-events-none hidden transition-transform duration-[var(--ds-motion-duration-normal)] will-change-transform group-hover/poster:scale-105 md:inline-flex",
                  "[&>span]:opacity-100 [&>span]:group-hover/btn:opacity-100",
                  "[&>svg]:opacity-100 [&>svg]:group-hover/btn:opacity-100",
                )}
              >
                <ButtonBackgroundShape variant="primary" />
                <span className="whitespace-nowrap">{caption}</span>
                <PlayIcon centered className="size-5 text-white" />
              </span>
            </>
          ) : (
            <span
              className={cn(
                radius.full,
                "flex size-16 items-center justify-center bg-white text-black shadow-lg transition-transform duration-[var(--ds-motion-duration-normal)] will-change-transform group-hover/poster:scale-110 md:size-20",
              )}
            >
              <PlayIcon
                centered
                className="size-7 text-black md:size-8"
              />
            </span>
          )}
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={playLabel}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <div
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="type-paragraph-s absolute -top-10 right-0 text-white/80 underline-offset-4 hover:underline"
              >
                {closeLabel} ✕
              </button>
              <div className={cn(radius.sm, "aspect-video overflow-hidden bg-black")}>
                <iframe
                  className="size-full"
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                  title={playLabel}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
