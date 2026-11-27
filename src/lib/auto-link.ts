import type { Locale } from "@/i18n/config";
import { commercialPath, landingPath, localizeHref } from "@/i18n/routes";
import { itemPath } from "@/lib/locale-path";

/**
 * Automatic contextual internal links for Portable Text bodies (blog
 * articles, glossary terms). The first plain-text mention of a known term
 * becomes a link to its page; headings, existing links and the current page
 * are never touched. Terms are ordered longest-first so "Microsoft Copilot"
 * wins over "Copilot".
 */
interface LinkRule {
  terms: string[];
  href: string;
  /** Acronyms (RAG, LLM…) must match case exactly. */
  caseSensitive?: boolean;
}

const MAX_LINKS = 10;

function rules(locale: Locale): LinkRule[] {
  const g = (slug: string) => itemPath("glossary", locale, slug);
  const i = (slug: string) => itemPath("connectors", locale, slug);
  const land = (page: Parameters<typeof landingPath>[0]) => landingPath(page, locale);
  const byLocale = <T,>(values: Record<Locale, T>) => values[locale];

  const list: (LinkRule | null)[] = [
    // Glossary
    { terms: ["RAG"], href: g("rag"), caseSensitive: true },
    { terms: ["LLM", "LLMs"], href: g("llm"), caseSensitive: true },
    { terms: ["MCP", "Model Context Protocol"], href: g("mcp") },
    { terms: ["fine-tuning"], href: g("fine-tuning") },
    { terms: ["prompt engineering"], href: g("prompt-engineering") },
    { terms: ["on-premise", "on-prem"], href: g("on-premise") },
    {
      terms: byLocale({
        en: ["AI agents", "AI agent"],
        fr: ["agents IA", "agent IA"],
        nl: ["AI-agents", "AI-agent"],
      }),
      href: g("ai-agent"),
    },
    {
      terms: byLocale({
        en: ["vector database", "vector databases"],
        fr: ["base de données vectorielle", "bases de données vectorielles"],
        nl: ["vectordatabase", "vectordatabases"],
      }),
      href: g("vector-database"),
    },
    {
      terms: byLocale({
        en: ["data sovereignty"],
        fr: ["souveraineté des données"],
        nl: ["gegevenssouvereiniteit", "datasoevereiniteit"],
      }),
      href: g("data-sovereignty"),
    },
    // Products and services
    { terms: ["WonkaChat"], href: commercialPath("wonkaChat", locale) },
    { terms: ["Start AI"], href: commercialPath("startAi", locale) },
    { terms: ["Wonka Build"], href: commercialPath("wonkaBuild", locale) },
    // Integrations
    { terms: ["Odoo"], href: i("odoo") },
    { terms: ["SharePoint"], href: i("sharepoint") },
    { terms: ["Salesforce"], href: i("salesforce") },
    { terms: ["HubSpot"], href: i("hubspot") },
    { terms: ["Microsoft Teams"], href: i("microsoft-teams") },
    { terms: ["Outlook"], href: i("outlook") },
    { terms: ["Notion"], href: i("notion") },
    { terms: ["Google Drive"], href: i("google-drive") },
    { terms: ["Jira"], href: i("jira") },
    { terms: ["Slack"], href: i("slack") },
    // Landing pages
    { terms: ["ChatGPT Enterprise"], href: localizeHref("/vs/wonka-ai-vs-chatgpt-enterprise", locale) },
    ...[
      ["shadowAi", ["shadow AI", "shadow IA"]],
      ["charteIa", ["charte IA", "charte d'utilisation de l'IA"]],
      ["acculturationIa", ["acculturation IA", "acculturation à l'IA"]],
      ["auditIa", ["audit IA"]],
      ["kmoPortefeuille", ["KMO-portefeuille", "kmo-portefeuille"]],
    ].map(([page, terms]) => {
      const href = land(page as Parameters<typeof landingPath>[0]);
      return href ? { terms: terms as string[], href } : null;
    }),
  ];
  return list.filter((rule): rule is LinkRule => rule !== null);
}

interface PTSpan {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
}

interface PTBlock {
  _type: "block";
  _key: string;
  style?: string;
  children?: PTSpan[];
  markDefs?: { _key: string; _type: string; href?: string }[];
  [key: string]: unknown;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildMatcher(rule: LinkRule): RegExp {
  const alternatives = [...rule.terms]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|");
  return new RegExp(`(?<![\\p{L}\\p{N}-])(${alternatives})(?![\\p{L}\\p{N}])`, rule.caseSensitive ? "u" : "iu");
}

const LINKABLE_STYLES = new Set(["normal", "blockquote", undefined]);

/**
 * Return a copy of `body` where the first mention of each known term links
 * to its page. `currentPath` is excluded so a page never links to itself.
 */
export function autoLinkBody<T>(body: T[], locale: Locale, currentPath: string): T[] {
  const active = rules(locale)
    .filter((rule) => rule.href !== currentPath)
    .map((rule) => ({ ...rule, matcher: buildMatcher(rule) }));
  const usedHrefs = new Set<string>();
  let added = 0;

  return body.map((node) => {
    const block = node as unknown as PTBlock;
    if (block._type !== "block" || !LINKABLE_STYLES.has(block.style) || !block.children?.length) {
      return node;
    }
    if (added >= MAX_LINKS) return node;

    const markDefs = [...(block.markDefs ?? [])];
    const linkKeys = new Set(markDefs.filter((m) => m._type === "link").map((m) => m._key));
    const children: PTSpan[] = [];
    let changed = false;

    for (const span of block.children) {
      const alreadyLinked = span.marks?.some((mark) => linkKeys.has(mark));
      if (span._type !== "span" || alreadyLinked || added >= MAX_LINKS) {
        children.push(span);
        continue;
      }

      let rest = span.text;
      let piece = 0;
      // Keep scanning the remaining text so one span can carry several links.
      for (;;) {
        let best: { index: number; length: number; href: string } | null = null;
        for (const rule of active) {
          if (usedHrefs.has(rule.href)) continue;
          const match = rule.matcher.exec(rest);
          if (match && (best === null || match.index < best.index)) {
            best = { index: match.index, length: match[0].length, href: rule.href };
          }
        }
        if (!best || added >= MAX_LINKS) break;

        const key = `al${block._key}${piece}`;
        markDefs.push({ _key: key, _type: "link", href: best.href });
        if (best.index > 0) {
          children.push({ ...span, _key: `${span._key}-${piece}a`, text: rest.slice(0, best.index) });
        }
        children.push({
          ...span,
          _key: `${span._key}-${piece}b`,
          text: rest.slice(best.index, best.index + best.length),
          marks: [...(span.marks ?? []), key],
        });
        rest = rest.slice(best.index + best.length);
        usedHrefs.add(best.href);
        added += 1;
        piece += 1;
        changed = true;
      }
      if (rest || piece === 0) {
        children.push(piece === 0 ? span : { ...span, _key: `${span._key}-${piece}c`, text: rest });
      }
    }

    return changed ? ({ ...block, children, markDefs } as unknown as T) : node;
  });
}
