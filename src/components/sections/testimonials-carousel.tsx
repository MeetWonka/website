"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { urlFor } from "@sanity/lib/image";
import { BulletIcon } from "@/components/ui/icons/bullet";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/use-t";
import type { Testimonial } from "@/lib/types";

function ArrowPrevIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M8.56408 -8.2532e-07C8.05126 1.09402 7.55553 2.05128 7.0769 2.87179C6.56408 3.69231 6.06835 4.37607 5.58972 4.92308L18.0046 4.92308L18.0046 7.07692L5.58972 7.07692C6.06835 7.65812 6.56408 8.35897 7.0769 9.17949C7.55553 10 8.05126 10.9402 8.56408 12L6.76921 12C4.61536 9.50427 2.35895 7.65812 -2.2404e-05 6.46154L-2.23233e-05 5.53846C2.35895 4.37607 4.61536 2.52991 6.76921 -9.82233e-07L8.56408 -8.2532e-07Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowNextIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M9.44056 12C9.95338 10.906 10.4491 9.94872 10.9277 9.12821C11.4406 8.30769 11.9363 7.62393 12.4149 7.07692H0V4.92308H12.4149C11.9363 4.34188 11.4406 3.64103 10.9277 2.82051C10.4491 2 9.95338 1.05983 9.44056 0H11.2354C13.3893 2.49573 15.6457 4.34188 18.0047 5.53846V6.46154C15.6457 7.62393 13.3893 9.47009 11.2354 12H9.44056Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Carousel geometry — derived from the Figma SVG shapes (front 309×556, peek 175×552).
// Each card renders at the front trapezoid's bounding box; the clip-path morphs
// between the active and peek shapes. The peek path is offset on x so it sits
// centered in the bounding box (the morph shrinks toward center, face stays framed).
const FRONT_W = 266;
const PEEK_W = 152;
const HEIGHT = 480;
const GAP = 32;
const CLIP_TRANSITION = "clip-path 0.5s cubic-bezier(0.32, 0.72, 0, 1)";

// clip-path: path() values. Both paths share identical command structure
// (M C L C V C L C V Z) so the browser interpolates between them smoothly.
// Coordinates are pixel values, scaled from the Figma SVGs (front 309×556,
// peek 175×552). Peek path is additionally translated +57px on x so its
// 152px-wide trapezoid sits centered inside the 266px bounding box.
const ACTIVE_CLIP =
  "path('M265.852 3.454C265.852 1.265 263.846 -0.373 261.692 0.074L2.741 54.149C1.144 54.483 0 55.894 0 57.519V421.756C0 423.392 1.144 424.804 2.741 425.137L261.692 479.205C263.846 479.652 265.852 478.015 265.852 475.825V3.454Z')";
const PEEK_CLIP =
  "path('M208.852 3.484C208.852 0.802 205.948 -0.871 203.629 0.476L58.729 84.785C57.659 85.408 57 86.553 57 87.792V391.432C57 392.671 57.659 393.816 58.729 394.439L203.629 478.747C205.948 480.095 208.852 478.422 208.852 475.741V3.484Z')";

const SLOTS = {
  front: {
    x: 0,
    opacity: 1,
    clipPath: ACTIVE_CLIP,
    zIndex: 30,
  },
  peek: {
    x: FRONT_W + GAP - (FRONT_W - PEEK_W) / 2,
    opacity: 0.5,
    clipPath: PEEK_CLIP,
    zIndex: 20,
  },
  back: {
    x: FRONT_W * 2 + GAP,
    opacity: 0,
    clipPath: PEEK_CLIP,
    zIndex: 10,
  },
} as const;

type SlotKey = keyof typeof SLOTS;

function getSlotKey(
  itemIndex: number,
  activeIndex: number,
  total: number,
): SlotKey {
  const offset = (itemIndex - activeIndex + total) % total;
  if (offset === 0) return "front";
  if (offset === 1) return "peek";
  return "back";
}

const SPRING = { type: "spring", stiffness: 200, damping: 28, mass: 0.9 } as const;
const FADE = { duration: 0.4, ease: [0.32, 0.72, 0, 1] } as const;
const EXIT_FADE = { duration: 0.22, ease: [0.32, 0.72, 0, 1] } as const;

function buildTextVariants(enterDelay: number, yOffset = 8) {
  return {
    initial: { opacity: 0, y: yOffset },
    animate: {
      opacity: 1,
      y: 0,
      transition: { ...FADE, delay: enterDelay },
    },
    exit: {
      opacity: 0,
      y: -yOffset,
      transition: EXIT_FADE,
    },
  };
}

const QUOTE_VARIANTS = buildTextVariants(0, 8);
const NAME_VARIANTS = buildTextVariants(0.1, 6);
const LOGO_VARIANTS = buildTextVariants(0.2, 8);

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const t = useT();
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  if (total === 0) return null;

  const active = testimonials[activeIndex];
  const showControls = total > 1;
  const carouselWidth = FRONT_W + GAP + PEEK_W;

  return (
    <>
      <div className="flex flex-col gap-10 lg:min-w-0 lg:flex-1 lg:max-w-[44.375rem]">
        <div className="flex flex-col gap-10 border-b border-dashed border-border pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active._id}
              variants={LOGO_VARIANTS}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <CompanyLogo testimonial={active} />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active._id}
              variants={QUOTE_VARIANTS}
              initial="initial"
              animate="animate"
              exit="exit"
              className="type-h5 text-text whitespace-pre-line"
            >
              {active.quote}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active._id}
              variants={NAME_VARIANTS}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-start gap-2.5"
            >
              <BulletIcon className="mt-1.5 h-[0.625rem] w-[0.4375rem] shrink-0 text-accent-dark" />
              <div className="flex flex-col">
                <p className="type-paragraph-m text-text">{active.authorName}</p>
                {active.authorRole ? (
                  <p className="type-paragraph-m text-text opacity-80">
                    {active.authorRole}
                  </p>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>

          {showControls ? (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label={t("sections.testimonials.previous")}
                className="cursor-pointer text-text transition-opacity hover:opacity-60"
              >
                <ArrowPrevIcon className="h-3 w-[1.125rem]" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={t("sections.testimonials.next")}
                className="cursor-pointer text-text transition-opacity hover:opacity-60"
              >
                <ArrowNextIcon className="h-3 w-[1.125rem]" />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className="relative hidden lg:block lg:flex-none"
        style={{ width: `${carouselWidth}px`, height: `${HEIGHT}px` }}
      >
        {testimonials.map((t, i) => {
          const slot = getSlotKey(i, activeIndex, total);
          const target = SLOTS[slot];
          return (
            <motion.div
              key={t._id}
              aria-hidden={slot !== "front"}
              className="absolute top-0 left-0"
              style={{
                width: `${FRONT_W}px`,
                height: `${HEIGHT}px`,
                willChange: "transform, opacity, clip-path",
                zIndex: target.zIndex,
                clipPath: target.clipPath,
                transition: CLIP_TRANSITION,
              }}
              initial={false}
              animate={{
                x: target.x,
                opacity: target.opacity,
              }}
              transition={slot === "back" ? FADE : SPRING}
            >
              <PortraitImage testimonial={t} priority={i === activeIndex} />
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

function CompanyLogo({ testimonial }: { testimonial: Testimonial }) {
  const t = useT();
  const logo = testimonial.companyLogo;
  if (!logo?.asset) {
    return (
      <div className="flex h-6 w-[4.3rem] items-center justify-center self-start rounded-xs border border-dashed border-border text-[0.625rem] font-medium tracking-[0.07em] text-text uppercase opacity-60">
        {t("sections.testimonials.logoPlaceholder")}
      </div>
    );
  }

  const dims = logo.dimensions;
  const targetHeight = 28;
  const aspect = dims ? dims.width / dims.height : 3;
  const width = Math.round(targetHeight * aspect);
  const url = urlFor(logo).height(targetHeight * 3).url();

  return (
    <div className="self-start">
      <Image
        src={url}
        alt={logo.alt ?? ""}
        width={width}
        height={targetHeight}
        className="h-7 w-auto"
        sizes={`${width}px`}
      />
    </div>
  );
}

function PortraitImage({
  testimonial,
  priority,
}: {
  testimonial: Testimonial;
  priority?: boolean;
}) {
  const portrait = testimonial.portrait;
  if (!portrait?.asset) {
    return <div className="h-full w-full bg-mid-gray" aria-hidden />;
  }
  const url = urlFor(portrait).width(720).quality(85).url();
  return (
    <Image
      src={url}
      alt={portrait.alt ?? testimonial.authorName}
      fill
      sizes={`${FRONT_W}px`}
      className={cn("object-cover object-center")}
      priority={priority}
    />
  );
}
