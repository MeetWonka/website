/**
 * Seed connector pages into Sanity CMS.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=<token> bun run scripts/seed-connectors.ts
 *
 * Requires:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID in .env
 *   - NEXT_PUBLIC_SANITY_DATASET in .env (default: production)
 *   - SANITY_API_WRITE_TOKEN env var (Editor token from sanity.io/manage)
 */

import { createClient } from "next-sanity";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env manually — avoids conflicts with Bun's dotenvx wrapper
const envPath = resolve(process.cwd(), ".env");
try {
  const lines = readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
} catch {}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-03-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

// ─── Content ──────────────────────────────────────────────────────────────────

const connectors = [
  // ── OUTLOOK ──────────────────────────────────────────────────────────────
  {
    _type: "connectorPage",
    language: "fr",
    toolName: "Microsoft Outlook",
    slug: { _type: "slug", current: "outlook" },
    tagline: "IA privée sur Outlook — sans Microsoft, sans fuite de données",
    description:
      "Wonka AI connecte votre Outlook à un LLM privé déployé dans votre infrastructure. Résumez vos emails, rédigez des réponses, détectez les priorités — sans que vos données transitent chez Microsoft, OpenAI ou aucun tiers.",
    useCases: [
      {
        _type: "useCase",
        title: "Résumé intelligent de fils d'emails",
        description:
          "Wonka analyse les fils de discussion longs et génère un résumé exécutif en une phrase, avec les actions à prendre. Idéal pour les managers qui reçoivent 200+ emails/jour.",
        prompt:
          "Résume ce fil d'emails en 3 points et liste les actions attendues de ma part.",
      },
      {
        _type: "useCase",
        title: "Rédaction de réponses contextuelles",
        description:
          "Sur la base du contexte de la conversation et du profil de votre interlocuteur dans votre CRM, Wonka propose un brouillon de réponse au bon ton et à la bonne longueur.",
        prompt:
          "Rédige une réponse à cet email en gardant un ton professionnel mais direct. L'objectif est de fixer un RDV la semaine prochaine.",
      },
      {
        _type: "useCase",
        title: "Détection des emails prioritaires",
        description:
          "Wonka classifie automatiquement votre boîte de réception selon vos critères : client clé, délai urgent, escalade commerciale. Vous ne ratez plus l'essentiel.",
        prompt:
          "Parmi mes emails non lus des dernières 48h, lesquels nécessitent une réponse aujourd'hui ? Classe-les par priorité.",
      },
    ],
    faq: [
      {
        _type: "faqItem",
        question: "Est-ce que Wonka lit mes emails via les serveurs Microsoft ?",
        answer:
          "Non. Wonka AI se connecte à Outlook via l'API Microsoft Graph, mais le traitement IA se fait entièrement dans votre infrastructure. Vos emails ne transitent jamais chez OpenAI, Azure ou un tiers cloud. C'est la différence fondamentale avec Microsoft Copilot.",
      },
      {
        _type: "faqItem",
        question: "Quelle est la différence avec Microsoft Copilot pour Outlook ?",
        answer:
          "Microsoft Copilot envoie vos données vers les serveurs Microsoft/OpenAI. Wonka AI déploie le LLM dans vos propres serveurs ou cloud privé — vos données restent dans vos murs. C'est essentiel pour les secteurs réglementés (juridique, finance, santé) ou les entreprises soumises au RGPD strict.",
      },
      {
        _type: "faqItem",
        question: "Faut-il un abonnement Microsoft 365 Copilot pour utiliser Wonka ?",
        answer:
          "Non. Wonka AI fonctionne indépendamment de Microsoft Copilot et ne nécessite pas de licence supplémentaire Microsoft. Il suffit d'avoir un compte Microsoft 365 standard avec accès à l'API Graph.",
      },
      {
        _type: "faqItem",
        question: "En combien de temps le connecteur Outlook est-il opérationnel ?",
        answer:
          "La configuration initiale prend généralement 2 à 4 heures avec l'accompagnement de notre équipe. Cela inclut l'autorisation API, le déploiement du LLM dans votre infra, et les premiers tests utilisateurs.",
      },
    ],
    tags: ["outlook", "microsoft", "email", "rgpd", "souveraineté", "copilot"],
    seo: {
      _type: "seo",
      metaTitle: "IA privée sur Outlook — Alternative RGPD à Microsoft Copilot | Wonka AI",
      metaDescription:
        "Connectez Outlook à un LLM privé dans votre infrastructure. Résumés d'emails, rédaction IA, priorisation — sans que vos données quittent votre organisation. Alternative souveraine à Copilot.",
    },
  },
  {
    _type: "connectorPage",
    language: "en",
    toolName: "Microsoft Outlook",
    slug: { _type: "slug", current: "outlook" },
    tagline: "Private AI on Outlook — no Microsoft, no data leakage",
    description:
      "Wonka AI connects your Outlook to a private LLM deployed in your own infrastructure. Summarize emails, draft replies, detect priorities — without your data going through Microsoft, OpenAI, or any third party.",
    useCases: [
      {
        _type: "useCase",
        title: "Smart email thread summarization",
        description:
          "Wonka analyzes long email threads and generates a one-sentence executive summary with next actions. Perfect for managers handling 200+ emails a day.",
        prompt:
          "Summarize this email thread in 3 key points and list the actions expected from me.",
      },
      {
        _type: "useCase",
        title: "Contextual reply drafting",
        description:
          "Based on the conversation context and your contact's CRM profile, Wonka drafts a reply in the right tone and length.",
        prompt:
          "Draft a professional but direct reply to this email. The goal is to schedule a meeting next week.",
      },
      {
        _type: "useCase",
        title: "Priority inbox detection",
        description:
          "Wonka automatically classifies your inbox by your criteria: key client, urgent deadline, sales escalation. Never miss what matters.",
        prompt:
          "Among my unread emails from the last 48 hours, which ones need a reply today? Rank them by priority.",
      },
    ],
    faq: [
      {
        _type: "faqItem",
        question: "Does Wonka read my emails through Microsoft's servers?",
        answer:
          "No. Wonka AI connects to Outlook via the Microsoft Graph API, but all AI processing happens inside your own infrastructure. Your emails never pass through OpenAI, Azure, or any third-party cloud. That's the fundamental difference from Microsoft Copilot.",
      },
      {
        _type: "faqItem",
        question: "What's the difference between Wonka and Microsoft Copilot for Outlook?",
        answer:
          "Microsoft Copilot sends your data to Microsoft/OpenAI servers. Wonka AI deploys in Azure West Europe (Microsoft Ireland) by default, with ISO 27001 certification, GDPR compliance, and NIS 2 compliance. SOC 2 Type II audit in progress. On-premise deployment available as an Enterprise option. This architecture is essential for regulated sectors (legal, finance, healthcare) with strict data residency requirements.",
      },
      {
        _type: "faqItem",
        question: "Do I need a Microsoft 365 Copilot subscription to use Wonka?",
        answer:
          "No. Wonka AI works independently of Microsoft Copilot and requires no additional Microsoft license. A standard Microsoft 365 account with Graph API access is all you need.",
      },
      {
        _type: "faqItem",
        question: "How long does the Outlook connector take to set up?",
        answer:
          "Initial setup typically takes 2 to 4 hours with our team's guidance. This includes API authorization, LLM deployment in your infrastructure, and initial user testing.",
      },
    ],
    tags: ["outlook", "microsoft", "email", "gdpr", "sovereignty", "copilot"],
    seo: {
      _type: "seo",
      metaTitle: "Private AI on Outlook — GDPR Alternative to Microsoft Copilot | Wonka AI",
      metaDescription:
        "Connect Outlook to a private LLM in your infrastructure. Email summaries, AI drafting, inbox prioritization — without your data leaving your organization. Sovereign alternative to Copilot.",
    },
  },
  {
    _type: "connectorPage",
    language: "nl",
    toolName: "Microsoft Outlook",
    slug: { _type: "slug", current: "outlook" },
    tagline: "Privé AI op Outlook — geen Microsoft, geen datalekkage",
    description:
      "Wonka AI verbindt uw Outlook met een privé LLM dat in uw eigen infrastructuur is geïnstalleerd. Vat e-mails samen, stel antwoorden op, detecteer prioriteiten — zonder dat uw gegevens via Microsoft, OpenAI of een derde partij gaan.",
    useCases: [
      {
        _type: "useCase",
        title: "Slimme samenvatting van e-mailthreads",
        description:
          "Wonka analyseert lange e-mailthreads en genereert een beknopte samenvatting met actiepunten. Ideaal voor managers met meer dan 200 e-mails per dag.",
        prompt:
          "Vat deze e-mailthread samen in 3 punten en vermeld de acties die van mij worden verwacht.",
      },
      {
        _type: "useCase",
        title: "Contextueel opstellen van antwoorden",
        description:
          "Op basis van de gesprekscontext en het CRM-profiel van uw contactpersoon stelt Wonka een antwoord op in de juiste toon en lengte.",
        prompt:
          "Stel een professioneel maar direct antwoord op voor deze e-mail. Het doel is een vergadering volgende week in te plannen.",
      },
      {
        _type: "useCase",
        title: "Detectie van prioritaire e-mails",
        description:
          "Wonka classificeert uw inbox automatisch op basis van uw criteria: sleutelklant, dringende deadline, commerciële escalatie.",
        prompt:
          "Welke ongelezen e-mails van de afgelopen 48 uur hebben vandaag een antwoord nodig? Rangschik ze op prioriteit.",
      },
    ],
    faq: [
      {
        _type: "faqItem",
        question: "Leest Wonka mijn e-mails via de servers van Microsoft?",
        answer:
          "Nee. Wonka AI maakt verbinding met Outlook via de Microsoft Graph API, maar alle AI-verwerking gebeurt binnen uw eigen infrastructuur. Uw e-mails gaan nooit via OpenAI, Azure of een externe cloud.",
      },
      {
        _type: "faqItem",
        question: "Wat is het verschil tussen Wonka en Microsoft Copilot voor Outlook?",
        answer:
          "Microsoft Copilot stuurt uw gegevens naar Microsoft/OpenAI-servers. Wonka AI installeert het LLM in uw eigen servers of privécloud — uw gegevens blijven binnen uw organisatie. Essentieel voor gereguleerde sectoren of organisaties met strenge AVG-vereisten.",
      },
      {
        _type: "faqItem",
        question: "Heb ik een Microsoft 365 Copilot-abonnement nodig voor Wonka?",
        answer:
          "Nee. Wonka AI werkt onafhankelijk van Microsoft Copilot en vereist geen extra Microsoft-licentie. Een standaard Microsoft 365-account met Graph API-toegang is voldoende.",
      },
      {
        _type: "faqItem",
        question: "Hoe lang duurt het instellen van de Outlook-connector?",
        answer:
          "De initiële installatie duurt doorgaans 2 tot 4 uur met begeleiding van ons team, inclusief API-autorisatie, LLM-implementatie en eerste gebruikerstests.",
      },
    ],
    tags: ["outlook", "microsoft", "email", "avg", "soevereiniteit", "copilot"],
    seo: {
      _type: "seo",
      metaTitle: "Privé AI op Outlook — AVG-alternatief voor Microsoft Copilot | Wonka AI",
      metaDescription:
        "Verbind Outlook met een privé LLM in uw infrastructuur. E-mailsamenvattingen, AI-opstellingen, inboxprioritering — zonder dat uw gegevens uw organisatie verlaten.",
    },
  },

  // ── ODOO ─────────────────────────────────────────────────────────────────
  {
    _type: "connectorPage",
    language: "fr",
    toolName: "Odoo",
    slug: { _type: "slug", current: "odoo" },
    tagline: "IA sur Odoo — interrogez vos données ERP en langage naturel",
    description:
      "Wonka AI se connecte à votre instance Odoo pour permettre à vos équipes d'interroger l'ERP en langage naturel. Commandes, stocks, factures, CRM — obtenez des réponses instantanées sans formation technique ni requête SQL.",
    useCases: [
      {
        _type: "useCase",
        title: "Analyse des ventes et du pipeline CRM",
        description:
          "Demandez à Wonka d'analyser votre pipeline Odoo CRM et d'identifier les opportunités à risque, les deals bloqués et les prévisions de clôture. Pas besoin de tableau de bord personnalisé.",
        prompt:
          "Quelles opportunités dans mon pipeline Odoo ont plus de 30 jours sans activité ? Donne-moi un résumé avec le montant et le commercial responsable.",
      },
      {
        _type: "useCase",
        title: "Suivi des stocks et alertes de rupture",
        description:
          "Wonka surveille vos niveaux de stock Odoo et vous alerte proactivement sur les ruptures imminentes ou les surstocks, en croisant avec les commandes en cours.",
        prompt:
          "Quels produits sont en rupture de stock ou en dessous du seuil de réapprovisionnement cette semaine ? Liste-les avec les quantités en commande fournisseur.",
      },
      {
        _type: "useCase",
        title: "Génération de rapports financiers en langage naturel",
        description:
          "Posez vos questions financières à Wonka directement : CA du mois, marge par produit, factures en retard. Il interroge Odoo Accounting et vous répond en prose, pas en tableau.",
        prompt:
          "Quel est le chiffre d'affaires de ce mois comparé au même mois l'an dernier, ventilé par catégorie de produit ?",
      },
    ],
    faq: [
      {
        _type: "faqItem",
        question: "Wonka AI fonctionne-t-il avec Odoo SaaS (odoo.com) et Odoo self-hosted ?",
        answer:
          "Oui. Wonka AI supporte les deux modes de déploiement Odoo via l'API JSON-RPC native. Pour Odoo SaaS, la connexion se fait via les clés API de votre instance. Pour Odoo self-hosted, Wonka peut être déployé dans le même réseau privé pour une isolation totale des données.",
      },
      {
        _type: "faqItem",
        question: "Faut-il installer un module Odoo spécifique ?",
        answer:
          "Non. Wonka AI utilise l'API native d'Odoo (JSON-RPC / XML-RPC) et ne nécessite aucun module additionnel à installer dans votre instance. La connexion se configure en quelques minutes depuis l'interface Wonka.",
      },
      {
        _type: "faqItem",
        question: "Quels modules Odoo sont supportés ?",
        answer:
          "Wonka AI supporte tous les modules standards d'Odoo : CRM, Sales, Inventory, Accounting, Purchase, Manufacturing, HR, Helpdesk et Project. Des connecteurs spécifiques pour les modules personnalisés peuvent être développés sur demande.",
      },
      {
        _type: "faqItem",
        question: "Mes données Odoo transitent-elles par des serveurs externes ?",
        answer:
          "Non si vous optez pour le déploiement on-premise de Wonka AI. Le LLM tourne dans votre infrastructure, et les données Odoo ne sortent jamais de votre réseau. Pour le mode cloud managé, les données transitent de manière chiffrée via nos serveurs européens conformes au RGPD.",
      },
    ],
    tags: ["odoo", "erp", "crm", "stocks", "rgpd", "souveraineté", "ia-erp"],
    seo: {
      _type: "seo",
      metaTitle: "IA sur Odoo — Interrogez votre ERP en langage naturel | Wonka AI",
      metaDescription:
        "Connectez Wonka AI à Odoo pour interroger votre ERP en langage naturel. Analyse CRM, suivi stocks, rapports financiers — sans SQL ni formation. Compatible Odoo SaaS et self-hosted.",
    },
  },
  {
    _type: "connectorPage",
    language: "en",
    toolName: "Odoo",
    slug: { _type: "slug", current: "odoo" },
    tagline: "AI on Odoo — query your ERP in plain language",
    description:
      "Wonka AI connects to your Odoo instance so your teams can query the ERP in natural language. Orders, inventory, invoices, CRM — get instant answers with no technical training or SQL queries.",
    useCases: [
      {
        _type: "useCase",
        title: "Sales analysis and CRM pipeline review",
        description:
          "Ask Wonka to analyze your Odoo CRM pipeline and identify at-risk opportunities, stalled deals, and closing forecasts. No custom dashboard needed.",
        prompt:
          "Which opportunities in my Odoo pipeline have had no activity in the last 30 days? Give me a summary with the amount and responsible sales rep.",
      },
      {
        _type: "useCase",
        title: "Inventory tracking and stockout alerts",
        description:
          "Wonka monitors your Odoo stock levels and proactively alerts you on imminent stockouts or overstocks, cross-referencing with open purchase orders.",
        prompt:
          "Which products are out of stock or below reorder threshold this week? List them with quantities on supplier order.",
      },
      {
        _type: "useCase",
        title: "Financial reporting in plain language",
        description:
          "Ask your financial questions directly: monthly revenue, margin by product, overdue invoices. Wonka queries Odoo Accounting and replies in plain prose.",
        prompt:
          "What is this month's revenue compared to the same month last year, broken down by product category?",
      },
    ],
    faq: [
      {
        _type: "faqItem",
        question: "Does Wonka AI work with both Odoo SaaS (odoo.com) and self-hosted Odoo?",
        answer:
          "Yes. Wonka AI supports both deployment modes via Odoo's native JSON-RPC API. For Odoo SaaS, connection is made via your instance API keys. For self-hosted Odoo, Wonka can be deployed on the same private network for full data isolation.",
      },
      {
        _type: "faqItem",
        question: "Do I need to install a specific Odoo module?",
        answer:
          "No. Wonka AI uses Odoo's native API (JSON-RPC / XML-RPC) and requires no additional module in your instance. The connection is configured in minutes from the Wonka interface.",
      },
      {
        _type: "faqItem",
        question: "Which Odoo modules are supported?",
        answer:
          "Wonka AI supports all standard Odoo modules: CRM, Sales, Inventory, Accounting, Purchase, Manufacturing, HR, Helpdesk, and Project. Custom module connectors can be developed on request.",
      },
      {
        _type: "faqItem",
        question: "Does my Odoo data pass through external servers?",
        answer:
          "Not with on-premise Wonka AI deployment. The LLM runs in your infrastructure, and Odoo data never leaves your network. For the managed cloud mode, data transits encrypted via our GDPR-compliant European servers.",
      },
    ],
    tags: ["odoo", "erp", "crm", "inventory", "gdpr", "sovereignty", "ai-erp"],
    seo: {
      _type: "seo",
      metaTitle: "AI on Odoo — Query Your ERP in Plain Language | Wonka AI",
      metaDescription:
        "Connect Wonka AI to Odoo to query your ERP in natural language. CRM analysis, inventory tracking, financial reports — no SQL or training needed. Compatible with Odoo SaaS and self-hosted.",
    },
  },
  {
    _type: "connectorPage",
    language: "nl",
    toolName: "Odoo",
    slug: { _type: "slug", current: "odoo" },
    tagline: "AI op Odoo — bevraag uw ERP in gewone taal",
    description:
      "Wonka AI verbindt met uw Odoo-instantie zodat uw teams het ERP in natuurlijke taal kunnen bevragen. Bestellingen, voorraad, facturen, CRM — krijg directe antwoorden zonder technische training of SQL-query's.",
    useCases: [
      {
        _type: "useCase",
        title: "Verkoopanalyse en CRM-pijplijnbeoordeling",
        description:
          "Vraag Wonka om uw Odoo CRM-pijplijn te analyseren en risicovolle kansen, vastgelopen deals en sluitingsprognoses te identificeren.",
        prompt:
          "Welke kansen in mijn Odoo-pijplijn hebben de afgelopen 30 dagen geen activiteit gehad? Geef me een overzicht met het bedrag en de verantwoordelijke verkoper.",
      },
      {
        _type: "useCase",
        title: "Voorraadbeheer en stockoutmeldingen",
        description:
          "Wonka bewaakt uw Odoo-voorraadniveaus en waarschuwt u proactief over dreigende stockouts of overstocks, gekruist met openstaande inkooporders.",
        prompt:
          "Welke producten zijn deze week uitverkocht of onder de bestelnorm? Vermeld de hoeveelheden in leveranciersorder.",
      },
      {
        _type: "useCase",
        title: "Financiële rapportage in gewone taal",
        description:
          "Stel uw financiële vragen rechtstreeks: maandelijkse omzet, marge per product, achterstallige facturen. Wonka raadpleegt Odoo Accounting en antwoordt in begrijpelijke taal.",
        prompt:
          "Wat is de omzet van deze maand vergeleken met dezelfde maand vorig jaar, uitgesplitst per productcategorie?",
      },
    ],
    faq: [
      {
        _type: "faqItem",
        question: "Werkt Wonka AI met zowel Odoo SaaS als zelfgehoste Odoo?",
        answer:
          "Ja. Wonka AI ondersteunt beide implementatiemodi via de native JSON-RPC API van Odoo. Voor Odoo SaaS verloopt de verbinding via uw instantie-API-sleutels. Voor zelfgehoste Odoo kan Wonka in hetzelfde privénetwerk worden geïmplementeerd.",
      },
      {
        _type: "faqItem",
        question: "Moet ik een specifieke Odoo-module installeren?",
        answer:
          "Nee. Wonka AI gebruikt de native Odoo API (JSON-RPC / XML-RPC) en vereist geen extra module in uw instantie. De verbinding is in enkele minuten geconfigureerd vanuit de Wonka-interface.",
      },
      {
        _type: "faqItem",
        question: "Welke Odoo-modules worden ondersteund?",
        answer:
          "Wonka AI ondersteunt alle standaard Odoo-modules: CRM, Sales, Inventory, Accounting, Purchase, Manufacturing, HR, Helpdesk en Project.",
      },
      {
        _type: "faqItem",
        question: "Verlaten mijn Odoo-gegevens de organisatie?",
        answer:
          "Niet bij on-premise implementatie van Wonka AI. Het LLM draait in uw infrastructuur en Odoo-gegevens verlaten uw netwerk nooit. Voor de beheerde cloudmodus verloopt het gegevensverkeer versleuteld via onze AVG-conforme Europese servers.",
      },
    ],
    tags: ["odoo", "erp", "crm", "voorraad", "avg", "soevereiniteit", "ai-erp"],
    seo: {
      _type: "seo",
      metaTitle: "AI op Odoo — Bevraag uw ERP in gewone taal | Wonka AI",
      metaDescription:
        "Verbind Wonka AI met Odoo om uw ERP in natuurlijke taal te bevragen. CRM-analyse, voorraadbeheer, financiële rapporten — geen SQL of training nodig.",
    },
  },
];

// ─── Runner ───────────────────────────────────────────────────────────────────

async function seed() {
  console.log(`\n🚀 Seeding ${connectors.length} connector pages...\n`);

  for (const connector of connectors) {
    const id = `connectorPage-${connector.slug.current}-${connector.language}`;

    try {
      await client.createOrReplace({ _id: id, ...connector });
      console.log(`  ✅ ${connector.language.toUpperCase()} — ${connector.toolName}`);
    } catch (err) {
      console.error(`  ❌ ${connector.language.toUpperCase()} — ${connector.toolName}:`, err);
    }
  }

  console.log("\n✨ Done. Check Sanity Studio → Connectors.\n");
}

seed();
