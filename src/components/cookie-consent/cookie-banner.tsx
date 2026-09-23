"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { radius } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { useCookieConsent } from "./cookie-consent-provider";

export function CookieBanner() {
  const { acceptEssentialOnly, acceptAll, rejectAll, openPreferences } =
    useCookieConsent();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="fixed inset-0 z-[89] bg-black/30 backdrop-blur-[1px]"
        aria-hidden
      />
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 48, opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
        className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-lg md:inset-x-auto md:bottom-8 md:left-1/2 md:w-full md:-translate-x-1/2"
        role="dialog"
        aria-modal="true"
        aria-label="Cookie consent"
      >
        <div
          className={cn(
            radius.sm,
            "border border-border bg-background p-6 shadow-[0_16px_48px_rgba(0,0,0,0.14),_0_2px_8px_rgba(0,0,0,0.06)]",
          )}
        >
          <p className="type-paragraph-m text-text">
            We use cookies to keep the site working and to measure how our
            marketing performs.{" "}
            <Link
              href="/cookies"
              className="font-medium text-text underline underline-offset-4 hover:opacity-70"
            >
              Read our cookie policy
            </Link>
            .
          </p>

          <div className="mt-5 flex flex-col gap-2">
            <button
              type="button"
              onClick={acceptEssentialOnly}
              className={cn(
                radius.sm,
                "type-paragraph-m-bold w-full bg-text px-4 py-3 text-background transition-opacity hover:opacity-90",
              )}
            >
              Essential cookies only
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className={cn(
                radius.sm,
                "type-paragraph-m-bold w-full border border-border bg-light-gray px-4 py-3 text-text transition-opacity hover:opacity-90",
              )}
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={rejectAll}
              className={cn(
                radius.sm,
                "type-paragraph-m w-full border border-dashed border-border bg-background px-4 py-2.5 text-text/60 transition-colors hover:border-text/20 hover:text-text/80",
              )}
            >
              Reject all
            </button>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={openPreferences}
              className="type-paragraph-s text-text/50 underline underline-offset-4 transition-colors hover:text-text/70"
            >
              Manage preferences
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
