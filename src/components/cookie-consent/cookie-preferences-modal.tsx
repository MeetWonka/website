"use client";

import { useEffect, useId, useState } from "react";
import { motion } from "motion/react";
import { useT } from "@/i18n/use-t";
import {
  useCookieConsent,
  type ConsentCategories,
} from "./cookie-consent-provider";

type Row = {
  key: keyof ConsentCategories | "essential";
  required?: boolean;
};

const ROWS: Row[] = [
  { key: "essential", required: true },
  { key: "analytics" },
  { key: "marketing" },
];

export function CookiePreferencesModal() {
  const { consent, acceptAll, savePreferences, closePreferences } =
    useCookieConsent();
  const t = useT();

  const [draft, setDraft] = useState<ConsentCategories>(() => ({
    analytics: consent?.categories.analytics ?? false,
    marketing: consent?.categories.marketing ?? false,
  }));

  const titleId = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreferences();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [closePreferences]);

  const toggle = (key: keyof ConsentCategories) =>
    setDraft((d) => ({ ...d, [key]: !d[key] }));

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-black/60"
        onClick={closePreferences}
      />
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md rounded-2xl bg-background p-6 shadow-[0_4px_24px_rgba(0,0,0,0.12),_0_1px_1px_rgba(0,0,0,0.06)]"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="type-h6 text-text">
            {t("cookies.preferences.title")}
          </h2>
          <button
            type="button"
            onClick={closePreferences}
            aria-label={t("cookies.preferences.closeLabel")}
            className="type-paragraph-s text-text/60 underline underline-offset-4 transition-colors hover:text-text"
          >
            {t("cookies.preferences.close")}
          </button>
        </div>

        <p className="type-paragraph-s text-text/80 mb-6">
          {t("cookies.preferences.intro")}
        </p>

        <ul className="mb-6 flex flex-col gap-4">
          {ROWS.map((row) => {
            const isRequired = row.required === true;
            const checked = isRequired
              ? true
              : draft[row.key as keyof ConsentCategories];
            return (
              <li key={row.key} className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id={`${titleId}-${row.key}`}
                  checked={checked}
                  disabled={isRequired}
                  onChange={
                    isRequired
                      ? undefined
                      : () => toggle(row.key as keyof ConsentCategories)
                  }
                  className="mt-1 h-4 w-4 cursor-pointer accent-accent disabled:cursor-not-allowed disabled:opacity-60"
                />
                <label
                  htmlFor={`${titleId}-${row.key}`}
                  className={
                    isRequired ? "flex-1 cursor-not-allowed" : "flex-1 cursor-pointer"
                  }
                >
                  <span className="type-paragraph-m-bold text-text block">
                    {t(`cookies.preferences.categories.${row.key}.label`)}
                    {isRequired && (
                      <span className="type-paragraph-s text-text/50 ml-2">
                        {t("cookies.preferences.alwaysOn")}
                      </span>
                    )}
                  </span>
                  <span className="type-paragraph-s text-text/60 block">
                    {t(`cookies.preferences.categories.${row.key}.description`)}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => savePreferences(draft)}
            className="type-paragraph-s rounded-xl bg-text px-4 py-2 text-background transition-opacity hover:opacity-90"
          >
            {t("cookies.preferences.save")}
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="type-paragraph-s rounded-xl bg-light-gray px-4 py-2 text-text transition-opacity hover:opacity-80"
          >
            {t("cookies.preferences.acceptAll")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
