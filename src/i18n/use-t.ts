"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/i18n/routes";
import { getT } from "@/i18n/ui";
import type { Locale } from "@/i18n/config";

/** Route locale for client components, derived from the URL prefix. */
export function useUiLocale(): Locale {
  return getLocaleFromPathname(usePathname());
}

export function useT() {
  return getT(useUiLocale());
}
