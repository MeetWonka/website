import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { HREFLANG } from "@/lib/hreflang";

/**
 * Commercial pages published in every locale. The slug is shared across
 * locales: EN lives at the root (`/start-ai`), FR/NL are prefixed
 * (`/fr/start-ai`, `/nl/start-ai`). Home is `/`, `/fr`, `/nl`.
 */
export const COMMERCIAL_PATHS = {
  home: "/",
  startAi: "/start-ai",
  wonkaBuild: "/wonka-build",
  aiAgents: "/ai-agents",
  wonkaChat: "/wonka-chat",
  wonkaChatOdoo: "/wonka-chat/odoo",
  aiChat: "/workspace/ai-chat",
  security: "/security",
  pricing: "/pricing",
  contact: "/contact",
} as const;

export type CommercialPage = keyof typeof COMMERCIAL_PATHS;

/** Locales that get a prefixed copy of the commercial pages. */
export const TRANSLATED_LOCALES = ["fr", "nl"] as const satisfies readonly Locale[];

const COMMERCIAL_PATH_SET = new Set<string>(Object.values(COMMERCIAL_PATHS));

/** Translated pages that share a slug across locales but stay out of the sitemap. */
export const UNLISTED_TRANSLATED_PATHS = new Set<string>([
  "/team",
  "/workspace",
  "/workspace/ai-agents",
  "/workspace/governance",
  "/links",
]);

/**
 * SEO landing pages. Unlike commercial pages, each locale gets its own
 * keyword slug (`/ai-for-business`, `/fr/ia-pour-entreprise`, …). A page
 * may exist in a subset of locales.
 */
export const LANDING_PATHS = {
  aiForBusiness: {
    en: "/ai-for-business",
    fr: "/fr/ia-pour-entreprise",
    nl: "/nl/ai-voor-bedrijven",
  },
  aiConsultancy: {
    en: "/ai-consultancy",
    fr: "/fr/agence-ia",
    nl: "/nl/ai-consultancy",
  },
  chatgptForBusiness: {
    en: "/chatgpt-for-business",
    fr: "/fr/chatgpt-entreprise",
    nl: "/nl/chatgpt-voor-bedrijven",
  },
  // French-market pages (France): published in French only
  auditIa: {
    fr: "/fr/audit-ia",
  },
  acculturationIa: {
    fr: "/fr/acculturation-ia",
  },
  chatbotEntreprise: {
    fr: "/fr/chatbot-entreprise",
  },
  charteIa: {
    fr: "/fr/charte-ia-entreprise",
  },
  shadowAi: {
    fr: "/fr/shadow-ai",
  },
  comparatifIa: {
    fr: "/fr/comparatif-ia-entreprise",
  },
  agentBlueprint: {
    en: "/ai-agent-blueprint",
    fr: "/fr/ai-agent-blueprint",
    nl: "/nl/ai-agent-blueprint",
  },
} as const satisfies Record<string, Partial<Record<Locale, string>>>;

export type LandingPage = keyof typeof LANDING_PATHS;
export type SeoLandingPage = Exclude<LandingPage, "agentBlueprint">;

export function landingPath(page: LandingPage, locale: Locale): string | null {
  const paths: Partial<Record<Locale, string>> = LANDING_PATHS[page];
  return paths[locale] ?? null;
}

export function landingPageFromPathname(pathname: string): LandingPage | null {
  const path = pathname.replace(/\/+$/, "") || "/";
  for (const [page, paths] of Object.entries(LANDING_PATHS)) {
    if ((Object.values(paths) as string[]).includes(path)) return page as LandingPage;
  }
  return null;
}

/** hreflang map for a landing page, limited to the locales it exists in. */
export function landingLanguages(
  siteUrl: string,
  page: LandingPage,
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    const path = landingPath(page, locale);
    if (path) languages[HREFLANG[locale]] = `${siteUrl}${path}`;
  }
  const fallback = languages[HREFLANG.en] ?? Object.values(languages)[0];
  if (fallback) languages["x-default"] = fallback;
  return languages;
}

/** Content hubs whose first segment changes per locale (see locale-path.ts). */
const HUB_SEGMENTS: Record<string, Record<Locale, string>> = {
  blog: { en: "blog", fr: "blog", nl: "blog" },
  integrations: { en: "integrations", fr: "integrations", nl: "integrations" },
  learn: { en: "learn", fr: "apprendre", nl: "leren" },
  vs: { en: "vs", fr: "vs", nl: "vs" },
  "case-studies": { en: "case-studies", fr: "cas-clients", nl: "klantcases" },
};

export function commercialPath(page: CommercialPage, locale: Locale): string {
  const path = COMMERCIAL_PATHS[page];
  if (locale === "en") return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** French-market pages served outside the /fr prefix (/france, /france/diagnostic). */
const FRENCH_UNPREFIXED_SEGMENTS = new Set(["france"]);

export function isFranceMarketPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "france") return true;
  return segments[0] === "fr" && segments[1] === "lp";
}

export function getLocaleFromPathname(pathname: string | null | undefined): Locale {
  const first = pathname?.split("/")[1];
  if (first === "fr" || first === "nl") return first;
  if (first && FRENCH_UNPREFIXED_SEGMENTS.has(first)) return "fr";
  return "en";
}

/** Strip the locale prefix: `/fr/start-ai` → `/start-ai`, `/nl` → `/`. */
export function stripLocale(pathname: string): string {
  const first = pathname.split("/")[1];
  if (first !== "fr" && first !== "nl") return pathname;
  const rest = pathname.slice(first.length + 1);
  return rest === "" ? "/" : rest;
}

/**
 * Map an internal EN href to its equivalent in `locale`. Only pages that
 * exist in that locale are rewritten (commercial pages and content hubs);
 * everything else (legal pages, anchors, external URLs) is returned as-is.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (locale === "en" || !href.startsWith("/") || href.startsWith("//")) {
    return href;
  }

  const match = href.match(/^([^?#]*)(.*)$/);
  const path = match?.[1] || "/";
  const suffix = match?.[2] ?? "";

  const landing = landingPageFromPathname(path);
  if (landing) {
    const target = landingPath(landing, locale);
    if (target) return `${target}${suffix}`;
  }

  if (COMMERCIAL_PATH_SET.has(path) || UNLISTED_TRANSLATED_PATHS.has(path)) {
    return `${path === "/" ? `/${locale}` : `/${locale}${path}`}${suffix}`;
  }

  const [, first, ...rest] = path.split("/");
  const segments = HUB_SEGMENTS[first];
  if (segments) {
    return `/${locale}/${[segments[locale], ...rest].join("/")}${suffix}`;
  }

  return href;
}

/** Find the commercial page a pathname belongs to, if any. */
export function commercialPageFromPathname(pathname: string): CommercialPage | null {
  const path = stripLocale(pathname);
  const entry = Object.entries(COMMERCIAL_PATHS).find(([, p]) => p === path);
  return (entry?.[0] as CommercialPage | undefined) ?? null;
}

/** hreflang map (absolute URLs) for a commercial page. */
export function commercialLanguages(
  siteUrl: string,
  page: CommercialPage,
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    const path = commercialPath(page, locale);
    languages[HREFLANG[locale]] = path === "/" ? siteUrl : `${siteUrl}${path}`;
  }
  languages["x-default"] = languages[HREFLANG.en];
  return languages;
}
