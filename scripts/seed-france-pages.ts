/**
 * Seed France SEO comparison pages (Dust, Langdock)
 * Usage: node ./scripts/seed-france-pages.ts
 */

import { createClient } from "next-sanity";
import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env");
try {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    const val = t.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
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

// Helpers
let _k = 0;
const k = () => `k${++_k}`;

const p = (text: string) => ({
  _type: "block", _key: k(), style: "normal", markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});

const h2 = (text: string) => ({
  _type: "block", _key: k(), style: "h2", markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});

const faq = (q: string, a: string) => ({ _type: "faqItem", _key: k(), question: q, answer: a });
const slug = (s: string) => ({ _type: "slug", current: s });
const seo = (title: string, desc: string) => ({ _type: "seo", metaTitle: title, metaDescription: desc });

// France SEO Comparison Pages
const comparisons = [
  {
    slug: "dust",
    en: {
      title: "Dust AI alternative for French ETI | Wonka vs Dust",
      competitor: "Dust",
      excerpt: "Dust AI alternative for French ETI. Agents that act in Odoo and SharePoint. Data in Azure West Europe. 45 min diagnostic with Gabriel.",
      tags: ["dust", "eti", "odoo", "sharepoint", "azure", "france"],
      body: [
        h2("Dust is the search term. ChatGPT perso remains the real competitor."),
        p("Your team already uses ChatGPT on personal accounts. IT and security leads at French ETI know they need governance, data residency in Europe, and agents that act in your actual tools (Odoo, SharePoint) rather than just chat."),
        h2("For French ETI with Odoo and SharePoint"),
        p("If you run Odoo as your ERP and SharePoint for documents, Wonka connects natively. Agents read Odoo context, suggest actions, and let ops teams validate before executing. SharePoint connection runs via Microsoft Graph API with your credentials."),
        p("Dust offers 66 public connectors including SharePoint, Salesforce, Slack, Notion, ServiceNow, but NOT Odoo. Custom MCP connectors are possible but require development effort."),
        h2("Certifications and compliance"),
        p("ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe (Microsoft Ireland)."),
        p("Dust: SOC 2 Type II certified, GDPR, HIPAA enablement. ISO 27001 not listed on their public security page as of August 2026."),
        h2("Proof: Itzu and N-allo"),
        p("Itzu: 100% of employees on personal WonkaChat. Hours saved per person each week across HR and ops workflows."),
        p("N-allo (Engie subsidiary): team of over 70 people, 50% reduction in support email handling time. Never operated at 70% capacity."),
        h2("Time to first useful agent"),
        p("45-minute diagnostic with Gabriel identifies 3 agents ready for your Odoo and SharePoint setup. Trial agents ship within one week of diagnostic completion."),
        h2("Pricing comparison"),
        p("Dust Pro: $24 per seat per year (annual), $30 monthly. Dust Max: $120 annual. Public pricing as of August 2026."),
        p("Wonka Standard: 21,60 euro HT per user per month. 7-day trial, no card required. Full pricing at wonka-ai.com/pricing."),
      ],
      faq: [
        faq("Does Wonka connect to Odoo natively?", "Yes. Wonka reads Odoo records, prepares actions (create quote, update delivery), and lets your ops team validate before execution. This is a native integration, not a generic API connector."),
        faq("Where is data processed?", "Azure West Europe (Microsoft Ireland) by default. Your data never leaves European infrastructure. SOC 2 Type II in progress, ISO 27001 certified, GDPR and NIS 2 compliant."),
        faq("How long to deploy for a 50-person ETI?", "45-minute diagnostic, 3 agents scoped to your Odoo and SharePoint workflows. Trial agents live within one week. Full rollout depends on validation cycles, typically 4-8 weeks."),
        faq("Can IT and security leads paste the compliance line?", "ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe (Microsoft Ireland)."),
      ],
      seo: seo("Dust AI alternative for French ETI | Wonka vs Dust", "Dust AI alternative for French ETI. Agents that act in Odoo and SharePoint. Data in Azure West Europe. 45 min diagnostic with Gabriel."),
    },
    fr: {
      title: "Alternative Dust AI pour ETI françaises | Wonka vs Dust",
      competitor: "Dust",
      excerpt: "L'alternative Dust pour ceux qui arbitrent le SI des ETI françaises. Agents IA dans Odoo et SharePoint. Données en Azure West Europe.",
      tags: ["dust", "eti", "odoo", "sharepoint", "azure", "france"],
      body: [
        h2("Dust est le terme de recherche. ChatGPT perso reste le vrai concurrent."),
        p("Votre équipe utilise déjà ChatGPT sur des comptes personnels. Les directions informatiques d'ETI françaises savent qu'elles ont besoin de gouvernance, de résidence des données en Europe, et d'agents qui agissent dans vos outils réels (Odoo, SharePoint) plutôt que juste du chat."),
        h2("Pour les ETI françaises avec Odoo et SharePoint"),
        p("Si vous utilisez Odoo comme ERP et SharePoint pour les documents, Wonka se connecte nativement. Les agents lisent le contexte Odoo, suggèrent des actions, et laissent les équipes ops valider avant exécution. La connexion SharePoint fonctionne via l'API Microsoft Graph avec vos credentials."),
        p("Dust offre 66 connecteurs publics dont SharePoint, Salesforce, Slack, Notion, ServiceNow, mais PAS Odoo. Des connecteurs MCP personnalisés sont possibles mais nécessitent un effort de développement."),
        h2("Certifications et conformité"),
        p("Certifié ISO 27001. Conforme RGPD. Conforme NIS 2. SOC 2 Type II en cours. Hébergé en Azure West Europe (Microsoft Irlande)."),
        p("Dust: certifié SOC 2 Type II, RGPD, activation HIPAA. ISO 27001 non listé sur leur page sécurité publique en août 2026."),
        h2("Preuves: Itzu et N-allo"),
        p("Itzu: 100% des employés sur WonkaChat personnel. Heures économisées par personne chaque semaine sur les workflows RH et ops."),
        p("N-allo (filiale Engie): équipe de plus de 70 personnes, réduction de 50% du temps de traitement des emails support. N'a jamais opéré à 70% de capacité."),
        h2("Délai jusqu'au premier agent utile"),
        p("Diagnostic de 45 minutes avec Gabriel identifie 3 agents prêts pour votre configuration Odoo et SharePoint. Agents de test livrés dans la semaine suivant le diagnostic."),
        h2("Comparaison tarifaire"),
        p("Dust Pro: 24$ par siège par an (annuel), 30$ mensuel. Dust Max: 120$ annuel. Tarifs publics août 2026."),
        p("Wonka Standard: 21,60€ HT par utilisateur par mois. Essai 7 jours sans carte. Tarifs complets sur wonka-ai.com/pricing."),
      ],
      faq: [
        faq("Wonka se connecte-t-il nativement à Odoo?", "Oui. Wonka lit les enregistrements Odoo, prépare des actions (créer devis, mettre à jour livraison), et laisse votre équipe ops valider avant exécution. C'est une intégration native, pas un connecteur API générique."),
        faq("Où les données sont-elles traitées?", "Azure West Europe (Microsoft Irlande) par défaut. Vos données ne quittent jamais l'infrastructure européenne. SOC 2 Type II en cours, certifié ISO 27001, conforme RGPD et NIS 2."),
        faq("Combien de temps pour déployer pour une ETI de 50 personnes?", "Diagnostic de 45 minutes, 3 agents définis pour vos workflows Odoo et SharePoint. Agents de test en ligne dans la semaine. Déploiement complet selon cycles de validation, typiquement 4-8 semaines."),
        faq("Les directions informatiques peuvent-elles coller la ligne de conformité?", "Certifié ISO 27001. Conforme RGPD. Conforme NIS 2. SOC 2 Type II en cours. Hébergé en Azure West Europe (Microsoft Irlande)."),
      ],
      seo: seo("Alternative Dust AI pour ETI françaises | Wonka vs Dust", "L'alternative Dust pour ceux qui arbitrent le SI des ETI françaises. Agents IA dans Odoo et SharePoint. Données en Azure West Europe."),
    },
  },
  {
    slug: "langdock",
    en: {
      title: "Langdock alternative for ETI: Odoo agents, Azure West Europe",
      competitor: "Langdock",
      excerpt: "AI agents in Odoo and SharePoint, for IT and security leads evaluating Langdock. Data in Azure West Europe. ISO 27001, GDPR, NIS 2.",
      tags: ["langdock", "eti", "odoo", "sharepoint", "azure", "france"],
      body: [
        h2("Langdock is the search term. ChatGPT perso remains the real competitor."),
        p("Your team already uses ChatGPT on personal accounts. IT and security leads at ETI know they need governance, European data residency, and agents that act in your actual business tools."),
        h2("Native Odoo integration vs generic connectors"),
        p("Wonka connects natively to Odoo as your ERP. Agents read context, prepare actions, and let ops teams validate before executing. SharePoint runs via Microsoft Graph API with your credentials."),
        p("Langdock connector coverage: check existing wonka-ai.com content and /blog/wonka-vs-langdock for current public information. If specific Langdock connectors or pricing are not documented there, omit rather than invent."),
        h2("Certifications you can paste"),
        p("ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe (Microsoft Ireland)."),
        h2("Proven with French mid-market teams"),
        p("Itzu: 100% of employees on personal WonkaChat across HR and ops."),
        p("N-allo (Engie): over 70 people, 50% reduction in support email time."),
        p("#1 AI Start-up Belgium 2026. Nvidia Inception. Microsoft for Startups. Approximately 35 people."),
        h2("45-minute diagnostic"),
        p("Diagnostic with Gabriel identifies 3 agents ready for your Odoo and SharePoint workflows. Trial agents within one week."),
      ],
      faq: [
        faq("Does Wonka connect to Odoo natively?", "Yes. Native integration reads Odoo records, prepares actions, and lets your team validate before execution. Not a generic API wrapper."),
        faq("Where is data hosted?", "Azure West Europe (Microsoft Ireland). ISO 27001 certified, GDPR compliant, NIS 2 compliant, SOC 2 Type II in progress."),
        faq("How long to first agent for a 50-person company?", "45-minute diagnostic, 3 agents scoped to your tools. Trial live within one week. Full deployment 4-8 weeks depending on validation."),
      ],
      seo: seo("Langdock alternative for ETI: Odoo agents, Azure West Europe", "AI agents in Odoo and SharePoint, for IT and security leads evaluating Langdock. Azure West Europe. ISO 27001, GDPR, NIS 2."),
    },
    fr: {
      title: "Alternative Langdock pour ETI : Odoo, Azure West Europe",
      competitor: "Langdock",
      excerpt: "Des agents IA dans Odoo et SharePoint, pour ceux qui arbitrent le SI d'ETI qui évaluent Langdock. Données en Azure West Europe.",
      tags: ["langdock", "eti", "odoo", "sharepoint", "azure", "france"],
      body: [
        h2("Langdock est le terme de recherche. ChatGPT perso reste le vrai concurrent."),
        p("Votre équipe utilise déjà ChatGPT sur des comptes personnels. Les directions informatiques d'ETI savent qu'elles ont besoin de gouvernance, de résidence européenne des données, et d'agents qui agissent dans vos outils métier réels."),
        h2("Intégration Odoo native vs connecteurs génériques"),
        p("Wonka se connecte nativement à Odoo comme ERP. Les agents lisent le contexte, préparent des actions, et laissent les équipes ops valider avant exécution. SharePoint via API Microsoft Graph avec vos credentials."),
        p("Couverture connecteurs Langdock: vérifier le contenu existant sur wonka-ai.com et /fr/blog/wonka-vs-langdock pour les informations publiques actuelles. Si des connecteurs ou prix Langdock spécifiques ne sont pas documentés là, omettre plutôt qu'inventer."),
        h2("Certifications que vous pouvez coller"),
        p("Certifié ISO 27001. Conforme RGPD. Conforme NIS 2. SOC 2 Type II en cours. Hébergé en Azure West Europe (Microsoft Irlande)."),
        h2("Prouvé avec des équipes ETI françaises"),
        p("Itzu: 100% des employés sur WonkaChat personnel pour RH et ops."),
        p("N-allo (Engie): plus de 70 personnes, réduction de 50% du temps email support."),
        p("#1 AI Start-up Belgium 2026. Nvidia Inception. Microsoft for Startups. Environ 35 personnes."),
        h2("Diagnostic de 45 minutes"),
        p("Diagnostic avec Gabriel identifie 3 agents prêts pour vos workflows Odoo et SharePoint. Agents de test dans la semaine."),
      ],
      faq: [
        faq("Wonka se connecte-t-il nativement à Odoo?", "Oui. Intégration native qui lit les enregistrements Odoo, prépare les actions, et laisse votre équipe valider avant exécution. Pas un wrapper API générique."),
        faq("Où les données sont-elles hébergées?", "Azure West Europe (Microsoft Irlande). Certifié ISO 27001, conforme RGPD, conforme NIS 2, SOC 2 Type II en cours."),
        faq("Combien de temps jusqu'au premier agent pour une entreprise de 50 personnes?", "Diagnostic de 45 minutes, 3 agents définis pour vos outils. Test en ligne dans la semaine. Déploiement complet 4-8 semaines selon validation."),
      ],
      seo: seo("Alternative Langdock pour ETI : Odoo, Azure West Europe", "Des agents IA dans Odoo et SharePoint, pour ceux qui arbitrent le SI d'ETI qui évaluent Langdock. Azure West Europe."),
    },
  },
];

async function seed() {
  console.log("Seeding France SEO comparison pages...");
  
  for (const comparison of comparisons) {
    for (const lang of ["en", "fr"] as const) {
      const content = comparison[lang];
      const docId = `comparison-${comparison.slug}-${lang}`;
      
      const doc = {
        _id: docId,
        _type: "comparisonPage",
        language: lang,
        title: content.title,
        slug: slug(comparison.slug),
        competitor: content.competitor,
        excerpt: content.excerpt,
        body: content.body,
        tags: content.tags,
        faq: content.faq,
        seo: content.seo,
      };
      
      try {
        await client.createOrReplace(doc);
        console.log(`✓ Created ${lang.toUpperCase()} comparison: ${comparison.slug}`);
      } catch (error) {
        console.error(`✗ Failed to create ${lang.toUpperCase()} ${comparison.slug}:`, error);
      }
    }
  }
  
  console.log("\nDone!");
}

seed().catch(console.error);
