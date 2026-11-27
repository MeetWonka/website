"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { HERO_LOGO_SIZE_CLASS } from "@/lib/home-v2-hero-logos";
import { SHOW_LOGO_BANNERS } from "@/lib/feature-flags";
import { PRICING_COPY, PRICING_LOGOS } from "@/lib/pricing.config";
import { cn } from "@/lib/utils";

export function PricingLogoMarquee() {
  const reduce = useReducedMotion();
  if (!SHOW_LOGO_BANNERS) return null;
  const logos = [...PRICING_LOGOS, ...PRICING_LOGOS];

  return (
    <div
      role="region"
      aria-label={PRICING_COPY.social.ariaLabel}
      className="py-4"
    >
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <motion.div
          className="flex w-max items-center"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 55, ease: "linear", repeat: Infinity }}
        >
          {logos.map((logo, i) => {
            const size = HERO_LOGO_SIZE_CLASS[logo.size];
            return (
              <span
                key={`${logo.alt}-${i}`}
                aria-hidden={i >= PRICING_LOGOS.length}
                className={cn(
                  "flex h-20 shrink-0 items-center justify-center px-5",
                  logo.slotClassName ?? size.slot,
                )}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={280}
                  height={80}
                  className={cn(
                    logo.imgHeightClass ?? size.imgHeight,
                    logo.imgScaleClass,
                    "w-auto origin-center object-contain object-center brightness-0 opacity-40",
                  )}
                  unoptimized
                />
              </span>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
