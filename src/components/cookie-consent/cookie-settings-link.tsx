"use client";

import { useT } from "@/i18n/use-t";
import { useCookieConsent } from "./cookie-consent-provider";

export function CookieSettingsLink({ className }: { className?: string }) {
  const { openPreferences } = useCookieConsent();
  const t = useT();
  return (
    <button
      type="button"
      onClick={openPreferences}
      className={className ?? "text-text/60 transition-colors hover:text-text"}
    >
      {t("cookies.settingsLink")}
    </button>
  );
}
