"use client";

import { useEffect } from "react";

/**
 * The shared root layout renders `<html lang="en">`. Translated routes fix it
 * after hydration (a pre-hydration script would cause a hydration mismatch).
 */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
