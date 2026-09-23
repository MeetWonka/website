"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FLANDERS_SUBSIDY_URL } from "@/components/sections/start-ai-subsidized-flanders/constants";
import { cn } from "@/lib/utils";

const SHOW_DELAY_MS = 1500;

export function StartAiSubsidizedFlandersSubsidyPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => setVisible(false);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-4 bottom-4 z-[85] w-[calc(100%-2rem)] max-w-md md:bottom-6 md:right-6 md:max-w-lg"
          role="dialog"
          aria-labelledby="flanders-subsidy-popup-title"
          aria-describedby="flanders-subsidy-popup-body"
        >
          <div className="relative rounded-sm bg-blue-900 p-6 text-white shadow-[0_8px_32px_rgba(0,0,0,0.2)] md:p-8">
            <button
              type="button"
              onClick={dismiss}
              className="absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Sluiten"
            >
              <span aria-hidden className="text-lg leading-none">
                ×
              </span>
            </button>

            <p
              id="flanders-subsidy-popup-title"
              className="type-h6 pr-10 text-white"
            >
              70% subsidie voor Vlaamse KMO&apos;s
            </p>
            <p
              id="flanders-subsidy-popup-body"
              className="mt-3 type-body text-white/85"
            >
              Start AI komt in aanmerking voor de VLAIO KMO-portefeuille. Vraag
              vandaag nog uw subsidie aan.
            </p>
            <Link
              href={FLANDERS_SUBSIDY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-5 inline-flex h-[2.875rem] items-center justify-center rounded-button px-6",
                "type-paragraph-m-bold bg-white text-blue-900 transition-opacity hover:opacity-90",
              )}
            >
              Subsidie aanvragen
            </Link>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
