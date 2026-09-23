import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

export interface CrawledPage {
  url: string;
  path: string;
  title: string;
  description: string;
  headings: string[];
  text: string;
}

export interface CrawlResult {
  pages: CrawledPage[];
  discoveredUrls: number;
}

const MAX_PAGES = 9;
const MAX_REDIRECTS = 3;
const MAX_HTML_BYTES = 1_500_000;
const PAGE_TIMEOUT_MS = 7_000;
const PAGE_TEXT_LIMIT = 3_600;
const TOTAL_TEXT_LIMIT = 26_000;
const USER_AGENT =
  "Mozilla/5.0 (compatible; WonkaAgentBlueprint/1.0; +https://wonka-ai.com/ai-agent-blueprint)";

/**
 * Path keywords worth reading, in English, French, Dutch and German. Higher
 * scores surface pages that describe what the company sells, who it serves
 * and how it operates — the raw material for company-specific agents.
 */
const PATH_SIGNALS: Array<[RegExp, number]> = [
  [
    /(about|over-?ons|a-propos|qui-sommes|ueber-uns|about-us|company|entreprise|bedrijf|who-we-are)/,
    9,
  ],
  [
    /(services?|diensten|dienstverlening|leistungen|what-we-do|expertise|offer|aanbod|offre)/,
    9,
  ],
  [/(solutions?|oplossingen|losungen|platform|plateforme)/, 8],
  [
    /(products?|produits?|producten|produkte|catalog|catalogue|assortiment|range|gamme)/,
    8,
  ],
  [/(industr|sector|secteur|branche|markets?|marches|markten|segments?)/, 7],
  [
    /(careers?|jobs?|vacatures?|emplois?|werken-bij|join|recrutement|karriere|vacancies)/,
    7,
  ],
  [
    /(customers?|clients?|klanten|references?|referenties|cases?|case-stud|realisat|projects?|projets?|projecten|success)/,
    6,
  ],
  [
    /(how-we-work|werkwijze|approach|approche|method|process|processus|aanpak)/,
    6,
  ],
  [
    /(quality|qualite|kwaliteit|certification|compliance|sustainab|duurzaam|durabilite|esg)/,
    4,
  ],
  [/(faq|support|help|service-client|klantenservice)/, 4],
  [/(pricing|tarifs?|prijzen|prices)/, 3],
  [
    /(locations?|sites?|vestigingen|implantations|offices?|network|reseau|netwerk)/,
    3,
  ],
];

const PATH_PENALTIES =
  /(blog\/.+|news\/.+|nieuws\/.+|actualites\/.+|\/tag\/|\/category\/|\/author\/|privacy|cookie|legal|terms|disclaimer|mentions|login|signin|account|cart|checkout|wp-|\/feed|\.(pdf|jpe?g|png|gif|svg|webp|zip|mp4|xml|css|js)$)/;

function isPrivateAddress(address: string): boolean {
  const version = isIP(address);
  if (version === 4) {
    const [a = 0, b = 0] = address.split(".").map(Number);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 198 && (b === 18 || b === 19)) ||
      a >= 224
    );
  }
  if (version === 6) {
    const normalized = address.toLowerCase();
    if (normalized.startsWith("::ffff:")) {
      return isPrivateAddress(normalized.slice(7));
    }
    return (
      normalized === "::" ||
      normalized === "::1" ||
      normalized.startsWith("fc") ||
      normalized.startsWith("fd") ||
      normalized.startsWith("fe8") ||
      normalized.startsWith("fe9") ||
      normalized.startsWith("fea") ||
      normalized.startsWith("feb") ||
      normalized.startsWith("ff")
    );
  }
  return true;
}

async function assertPublicHost(hostname: string) {
  if (isIP(hostname)) throw new Error("IP hosts are not crawled");
  const addresses = await lookup(hostname, { all: true, verbatim: true });
  if (
    addresses.length === 0 ||
    addresses.some(({ address }) => isPrivateAddress(address))
  ) {
    throw new Error("Host resolves to a non-public address");
  }
}

/** Accepts the submitted domain and its subdomains (www., en., shop.…). */
export function isSameSite(hostname: string, domain: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  return host === domain || host.endsWith(`.${domain}`);
}

async function readCapped(response: Response): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > MAX_HTML_BYTES) {
      await reader.cancel();
      break;
    }
    chunks.push(value);
  }
  return new TextDecoder("utf-8", { fatal: false }).decode(
    Buffer.concat(chunks),
  );
}

async function fetchSameSite(
  url: string,
  domain: string,
  accept: "html" | "xml",
): Promise<{ url: string; body: string } | null> {
  let current = new URL(url);

  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    if (
      !["http:", "https:"].includes(current.protocol) ||
      !isSameSite(current.hostname, domain) ||
      (current.port && !["80", "443"].includes(current.port))
    ) {
      return null;
    }
    await assertPublicHost(current.hostname);

    const response = await fetch(current, {
      redirect: "manual",
      headers: {
        "User-Agent": USER_AGENT,
        Accept:
          accept === "html"
            ? "text/html,application/xhtml+xml"
            : "application/xml,text/xml",
        "Accept-Language": "en,fr;q=0.8,nl;q=0.7,de;q=0.5",
      },
      signal: AbortSignal.timeout(PAGE_TIMEOUT_MS),
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      await response.body?.cancel();
      if (!location) return null;
      current = new URL(location, current);
      continue;
    }

    if (!response.ok) {
      await response.body?.cancel();
      return null;
    }

    const contentType = response.headers.get("content-type") ?? "";
    const expected = accept === "html" ? /html/ : /xml/;
    if (!expected.test(contentType)) {
      await response.body?.cancel();
      return null;
    }

    return { url: current.toString(), body: await readCapped(response) };
  }

  return null;
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  eacute: "é",
  egrave: "è",
  ecirc: "ê",
  agrave: "à",
  ccedil: "ç",
  euml: "ë",
  iuml: "ï",
  ouml: "ö",
  uuml: "ü",
};

function decodeEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
    if (entity.startsWith("#")) {
      const code =
        entity[1]?.toLowerCase() === "x"
          ? parseInt(entity.slice(2), 16)
          : parseInt(entity.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code < 0x110000
        ? String.fromCodePoint(code)
        : match;
    }
    return ENTITIES[entity.toLowerCase()] ?? match;
  });
}

function cleanText(value: string): string {
  return decodeEntities(value.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

/** Like cleanText, but keeps one line per block element. */
function cleanBlockText(value: string): string {
  return decodeEntities(value.replace(/<[^>]+>/g, " "))
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 1)
    .join("\n");
}

export function extractPage(html: string, url: string): CrawledPage {
  const title = cleanText(
    html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "",
  );
  const description = cleanText(
    html.match(
      /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i,
    )?.[1] ??
      html.match(
        /<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i,
      )?.[1] ??
      "",
  );

  const body = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(
      /<(script|style|noscript|svg|iframe|template|canvas|form|select)\b[\s\S]*?<\/\1>/gi,
      " ",
    )
    .replace(/<(footer|nav)\b[\s\S]*?<\/\1>/gi, " ");

  const headings = Array.from(
    body.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi),
  )
    .map((match) => cleanText(match[1] ?? ""))
    .filter((heading) => heading.length > 2 && heading.length < 160);

  const text = cleanBlockText(
    body.replace(/<\/(p|li|h[1-6]|div|section|article|tr)>|<br\s*\/?>/gi, "\n"),
  );

  const parsed = new URL(url);
  return {
    url,
    path: parsed.pathname === "" ? "/" : parsed.pathname,
    title,
    description,
    headings: Array.from(new Set(headings)).slice(0, 24),
    text,
  };
}

const LOCALE_SEGMENT = /^[a-z]{2}(?:[-_][a-z]{2})?$/i;

/** "/fr/services" → "fr"; "/services" → null. */
export function localeOf(pathname: string): string | null {
  const first = pathname.split("/").filter(Boolean)[0] ?? "";
  return LOCALE_SEGMENT.test(first) ? first.toLowerCase() : null;
}

export function scorePath(pathname: string): number {
  const path = decodeURIComponent(pathname).toLowerCase();
  if (PATH_PENALTIES.test(path)) return -1;
  const segments = path.split("/").filter(Boolean);
  if (segments[0] && LOCALE_SEGMENT.test(segments[0])) segments.shift();
  // Keywords only count in section names, not in long article slugs.
  const sections = segments
    .slice(0, 2)
    .filter((segment) => segment.length <= 40);
  const keywordScore = PATH_SIGNALS.reduce(
    (score, [pattern, weight]) =>
      sections.some((segment) => pattern.test(segment))
        ? score + weight
        : score,
    0,
  );
  if (keywordScore === 0) return segments.length <= 1 ? 1 : 0;
  return keywordScore - Math.max(0, segments.length - 2) * 3;
}

export function extractLinks(html: string, baseUrl: string, domain: string) {
  const links = new Set<string>();
  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
    try {
      const url = new URL(decodeEntities(match[1] ?? ""), baseUrl);
      if (!["http:", "https:"].includes(url.protocol)) continue;
      if (!isSameSite(url.hostname, domain)) continue;
      url.hash = "";
      url.search = "";
      links.add(url.toString().replace(/\/$/, ""));
    } catch {
      // Ignore malformed hrefs.
    }
  }
  return Array.from(links);
}

async function sitemapUrls(website: string, domain: string): Promise<string[]> {
  try {
    const sitemap = await fetchSameSite(
      `${website}/sitemap.xml`,
      domain,
      "xml",
    );
    if (!sitemap) return [];
    const locations = Array.from(
      sitemap.body.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi),
      (match) => decodeEntities(match[1] ?? ""),
    );
    // A sitemap index points at child sitemaps; read the first page sitemap.
    const child = locations.find((loc) => /\.xml($|\?)/i.test(loc));
    if (child && locations.every((loc) => /\.xml($|\?)/i.test(loc))) {
      const nested = await fetchSameSite(child, domain, "xml");
      if (!nested) return [];
      return Array.from(
        nested.body.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi),
        (match) => decodeEntities(match[1] ?? ""),
      ).slice(0, 400);
    }
    return locations.slice(0, 400);
  } catch {
    return [];
  }
}

/**
 * Reads the public website behind a validated domain: the homepage plus the
 * highest-signal pages found via internal links and the sitemap.
 */
export async function crawlCompanySite(
  website: string,
  domain: string,
): Promise<CrawlResult> {
  const home = await fetchSameSite(website, domain, "html").catch(() => null);
  if (!home) return { pages: [], discoveredUrls: 0 };

  const homePage = extractPage(home.body, home.url);
  const candidates = new Set([
    ...extractLinks(home.body, home.url, domain),
    ...(await sitemapUrls(new URL(home.url).origin, domain)),
  ]);
  candidates.delete(home.url.replace(/\/$/, ""));

  // Prefer the language version the homepage landed on; other languages
  // only fill the gaps (common on sites whose menu is rendered in JS).
  const homeLocale = localeOf(new URL(home.url).pathname);
  const ranked = Array.from(candidates)
    .map((url) => {
      try {
        const { pathname } = new URL(url);
        const locale = localeOf(pathname);
        const sameLocale = homeLocale ? locale === homeLocale : locale === null;
        return { url, pathname, sameLocale, score: scorePath(pathname) };
      } catch {
        return null;
      }
    })
    .filter(
      (candidate): candidate is NonNullable<typeof candidate> =>
        candidate !== null && candidate.score > 0,
    )
    .sort(
      (a, b) =>
        Number(b.sameLocale) - Number(a.sameLocale) ||
        b.score - a.score ||
        a.url.length - b.url.length,
    );

  // Keep variety: at most two pages per section, across languages.
  const perSection = new Map<string, number>();
  const selected: string[] = [];
  for (const candidate of ranked) {
    const segments = candidate.pathname.split("/").filter(Boolean);
    if (localeOf(candidate.pathname)) segments.shift();
    const section = segments[0] ?? "";
    const limit = candidate.sameLocale ? 2 : 1;
    const count = perSection.get(section) ?? 0;
    if (count >= limit) continue;
    perSection.set(section, count + 1);
    selected.push(candidate.url);
    if (selected.length >= MAX_PAGES - 1) break;
  }

  const pages: CrawledPage[] = [homePage];
  const queue = [...selected];
  const workers = Array.from({ length: 4 }, async () => {
    while (queue.length > 0) {
      const url = queue.shift();
      if (!url) break;
      const fetched = await fetchSameSite(url, domain, "html").catch(
        () => null,
      );
      if (fetched) pages.push(extractPage(fetched.body, fetched.url));
    }
  });
  await Promise.all(workers);

  // Lines repeated on most pages are headers, menus and banners.
  const lineCounts = new Map<string, number>();
  for (const page of pages) {
    for (const line of new Set(page.text.split("\n"))) {
      lineCounts.set(line, (lineCounts.get(line) ?? 0) + 1);
    }
  }
  const boilerplateThreshold = Math.max(2, Math.ceil(pages.length * 0.5));

  let budget = TOTAL_TEXT_LIMIT;
  const bounded = pages
    .map((page) => ({
      ...page,
      text: page.text
        .split("\n")
        .filter(
          (line) =>
            pages.length < 3 ||
            (lineCounts.get(line) ?? 0) < boilerplateThreshold,
        )
        .join("\n")
        .slice(0, PAGE_TEXT_LIMIT),
    }))
    .filter(
      (page, index, all) =>
        page.text.length > 80 &&
        all.findIndex((other) => other.text === page.text) === index,
    )
    .map((page) => {
      const text = page.text.slice(0, Math.max(0, budget));
      budget -= text.length;
      return { ...page, text };
    })
    .filter((page) => page.text.length > 0);

  return { pages: bounded, discoveredUrls: candidates.size };
}
