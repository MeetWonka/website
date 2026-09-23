import type { Locale } from "@/i18n/config";
import { itemPath } from "@/lib/locale-path";

export interface HubPopularLink {
  href: string;
  title: string;
  description: string;
}

const links = {
  en: [
    {
      href: itemPath("blog", "en", "dust-alternatives"),
      title: "Dust.tt alternatives",
      description: "Compare private AI workspace options for enterprise teams.",
    },
    {
      href: itemPath("blog", "en", "glean-alternatives"),
      title: "Glean alternatives",
      description: "Review AI search tools by connectors, governance and deployment model.",
    },
    {
      href: itemPath("blog", "en", "langdock-alternatives"),
      title: "Langdock alternatives",
      description: "Understand how enterprise AI platforms differ beyond chat.",
    },
    {
      href: itemPath("blog", "en", "wonka-vs-dust"),
      title: "Wonka AI vs Dust.tt",
      description: "Compare private deployment, connectors and governance in detail.",
    },
    {
      href: itemPath("blog", "en", "wonka-vs-langdock"),
      title: "Wonka AI vs Langdock",
      description: "Review pricing, workflows and enterprise AI operating models.",
    },
    {
      href: itemPath("blog", "en", "notebooklm-alternatives"),
      title: "NotebookLM alternatives",
      description: "Evaluate document AI options for company knowledge and teams.",
    },
    {
      href: itemPath("blog", "en", "how-to-calculate-roi-enterprise-ai"),
      title: "Enterprise AI ROI",
      description: "Use a practical framework to measure AI workflow value.",
    },
    {
      href: itemPath("comparisons", "en", "wonka-ai-vs-chatgpt-enterprise"),
      title: "Wonka AI vs ChatGPT Enterprise",
      description: "Compare private enterprise AI with a general-purpose assistant.",
    },
  ],
  fr: [
    {
      href: itemPath("blog", "fr", "alternatives-dust-tt"),
      title: "Alternatives à Dust.tt",
      description: "Comparez les options d'espace de travail IA privé pour les équipes.",
    },
    {
      href: itemPath("blog", "fr", "alternatives-glean"),
      title: "Alternatives à Glean",
      description: "Évaluez les outils de recherche IA par connecteurs et gouvernance.",
    },
    {
      href: itemPath("blog", "fr", "alternatives-langdock"),
      title: "Alternatives à Langdock",
      description: "Comprenez les différences entre plateformes IA enterprise.",
    },
    {
      href: itemPath("blog", "fr", "fr-wonka-vs-dust"),
      title: "Wonka AI vs Dust.tt",
      description: "Comparez le déploiement privé, les connecteurs et la gouvernance.",
    },
    {
      href: itemPath("blog", "fr", "fr-wonka-vs-langdock"),
      title: "Wonka AI vs Langdock",
      description: "Analysez les prix, les workflows et le modèle opérationnel IA.",
    },
    {
      href: itemPath("blog", "fr", "alternatives-notebooklm"),
      title: "Alternatives à NotebookLM",
      description: "Comparez les options IA documentaire pour les équipes.",
    },
    {
      href: itemPath("blog", "fr", "fr-microsoft-copilot-insuffisant"),
      title: "Pourquoi Copilot ne suffit pas",
      description: "Analysez les limites de Copilot pour les entreprises européennes.",
    },
    {
      href: itemPath("comparisons", "fr", "wonka-ai-vs-chatgpt-enterprise"),
      title: "Wonka AI vs ChatGPT Enterprise",
      description: "Comparez l'IA privée enterprise à un assistant généraliste.",
    },
  ],
  nl: [
    {
      href: itemPath("blog", "nl", "dust-tt-alternatieven"),
      title: "Dust.tt alternatieven",
      description: "Vergelijk private AI-workspaces voor enterprise teams.",
    },
    {
      href: itemPath("blog", "nl", "glean-alternatieven"),
      title: "Glean alternatieven",
      description: "Beoordeel AI-search op connectoren, governance en deployment.",
    },
    {
      href: itemPath("blog", "nl", "langdock-alternatieven"),
      title: "Langdock alternatieven",
      description: "Vergelijk enterprise AI-platformen voorbij chatfuncties.",
    },
    {
      href: itemPath("blog", "nl", "nl-wonka-vs-dust"),
      title: "Wonka AI vs Dust.tt",
      description: "Vergelijk private deployment, connectoren en governance.",
    },
    {
      href: itemPath("blog", "nl", "nl-wonka-vs-langdock"),
      title: "Wonka AI vs Langdock",
      description: "Bekijk prijzen, workflows en enterprise AI-operatiemodellen.",
    },
    {
      href: itemPath("blog", "nl", "notebooklm-alternatieven"),
      title: "NotebookLM alternatieven",
      description: "Evalueer document-AI voor bedrijfskennis en teams.",
    },
    {
      href: itemPath("blog", "nl", "nl-microsoft-copilot-niet-genoeg"),
      title: "Waarom Copilot niet genoeg is",
      description: "Bekijk de grenzen van Copilot voor Europese ondernemingen.",
    },
    {
      href: itemPath("comparisons", "nl", "wonka-ai-vs-chatgpt-enterprise"),
      title: "Wonka AI vs ChatGPT Enterprise",
      description: "Vergelijk private enterprise AI met een algemene assistent.",
    },
  ],
} satisfies Record<Locale, HubPopularLink[]>;

export function getHubPopularLinks(locale: Locale, currentHref?: string): HubPopularLink[] {
  return links[locale].filter((link) => link.href !== currentHref);
}
