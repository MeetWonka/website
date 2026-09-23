import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Problem, type ProblemItem } from "@/components/sections/problem";
import { Stats } from "@/components/sections/stats";
import { Security } from "@/components/sections/security";
import { Cta } from "@/components/sections/cta";
import { buildMetadata } from "@/lib/seo";
import type { HeroData } from "@/lib/types";
import type { Locale } from "@/i18n/config";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale }> }

export async function generateStaticParams() {
  return [{ locale: "en" as const }, { locale: "fr" as const }];
}

const content = {
  en: {
    path: "/vs/dust",
    title: "Dust AI alternative for French ETI | Wonka vs Dust",
    description: "Dust AI alternative for French ETI. Agents that act in Odoo and SharePoint. Data in Azure West Europe. 45 min diagnostic with Gabriel.",
    hero: {
      awardBadge: "#1 AI START-UP OF THE YEAR - BELGIUM STARTUP AWARDS 2026",
      title: "Dust alternative for IT and security leads of French ETI",
      subtitle: "Agents that act in Odoo and SharePoint. Data in Azure West Europe. 45 min diagnostic with Gabriel.",
    },
    problem: [
      { tag: "h2" as const, content: "Dust is the search term. ChatGPT perso remains the real competitor." },
      { tag: "p" as const, content: "Your team already uses ChatGPT on personal accounts." },
      { tag: "p" as const, content: "IT and security leads at French ETI know they need governance, data residency in Europe, and agents that act in your actual tools (Odoo, SharePoint) rather than just chat." },
    ],
    ctaLabel: "45 min diagnostic",
    sectionICP: "For French ETI with Odoo and SharePoint",
    icpBullets: [
      "If you run Odoo as your ERP and SharePoint for documents, Wonka connects natively.",
      "Agents read Odoo context, suggest actions, and let ops teams validate before executing.",
      "SharePoint connection runs via Microsoft Graph API with your credentials.",
      "Dust offers 66 public connectors including SharePoint, Salesforce, Slack, Notion, ServiceNow, but NOT Odoo. Custom MCP connectors possible but require development effort.",
    ],
    certHeading: "Certifications and compliance",
    certWonka: "ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe (Microsoft Ireland).",
    certDust: "Dust: SOC 2 Type II certified, GDPR, HIPAA enablement. ISO 27001 not listed on their public security page as of August 2026.",
    tableHeading: "Comparison table",
    table: {
      headers: ["Criteria", "ChatGPT perso", "Dust", "Wonka"],
      rows: [
        ["Data location", "US (OpenAI)", "Cloud, multi-region", "Azure West Europe"],
        ["Who uses agents", "Personal accounts", "Org workspace", "Org workspace"],
        ["Odoo native", "No", "Custom MCP", "Yes"],
        ["SharePoint", "No", "Yes (connector)", "Yes (Graph API)"],
        ["ISO 27001", "N/A", "Not listed publicly", "Certified"],
        ["Other compliance", "N/A", "SOC 2 Type II, GDPR, HIPAA", "GDPR, NIS 2, SOC 2 in progress"],
        ["EU hosting", "No", "Multi-region option", "Azure West Europe default"],
        ["Time to first useful agent", "Immediate", "Varies", "45 min diagnostic + 1 week"],
        ["Public pricing", "$20/month", "Pro $24/seat/year, Max $120", "21,60 € HT/user/month"],
        ["Trial", "Limited free", "Check dust.tt", "7-day trial, no card"],
      ],
    },
    proofHeading: "Proof: Itzu and N-allo",
    proofs: [
      { title: "Itzu", text: "100% of employees on personal WonkaChat. Hours saved per person each week across HR and ops workflows.", link: "/case-studies/itzu", linkText: "Read case study →" },
      { title: "N-allo (Engie)", text: "Team of over 70 people, 50% reduction in support email handling time. Never operated at 70% capacity.", link: "/case-studies/n-allo", linkText: "Read case study →" },
    ],
    awards: "#1 AI Start-up Belgium 2026 • Nvidia Inception • Microsoft for Startups • ~35 people",
    faqHeading: "FAQ for IT and security leads",
    faqs: [
      { q: "Does Wonka connect to Odoo natively?", a: "Yes. Wonka reads Odoo records, prepares actions (create quote, update delivery), and lets your ops team validate before execution. This is a native integration, not a generic API connector." },
      { q: "Where is data processed?", a: "Azure West Europe (Microsoft Ireland) by default. Your data never leaves European infrastructure. SOC 2 Type II in progress, ISO 27001 certified, GDPR and NIS 2 compliant." },
      { q: "How long to deploy for a 50-person ETI?", a: "45-minute diagnostic, 3 agents scoped to your Odoo and SharePoint workflows. Trial agents live within one week. Full rollout depends on validation cycles, typically 4-8 weeks." },
      { q: "Can IT and security leads paste the compliance line?", a: "ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe (Microsoft Ireland)." },
    ],
    linksHeading: "Internal links",
    links: [
      { href: "/france", text: "France" },
      { href: "/security", text: "Security" },
      { href: "/wonka-chat", text: "WonkaChat" },
      { href: "/integrations/odoo", text: "Odoo integration" },
      { href: "/integrations/sharepoint", text: "SharePoint integration" },
      { href: "/ai-agents", text: "AI agents" },
    ],
    securityHeading: "Your data stays yours.",
    ctaHeading: "45 min diagnostic. 3 agents ready for your Odoo and SharePoint.",
    ctaBody: "Sector, tools, data, blocker, role. Two minutes. You see the result before talking to anyone.",
    ctaLabelFinal: "Start diagnostic",
  },
  fr: {
    path: "/fr/vs/dust",
    title: "Alternative Dust AI pour ETI françaises | Wonka vs Dust",
    description: "L'alternative Dust pour ceux qui arbitrent le SI des ETI françaises. Agents IA dans Odoo et SharePoint. Données en Azure West Europe.",
    hero: {
      awardBadge: "#1 AI START-UP OF THE YEAR - BELGIUM STARTUP AWARDS 2026",
      title: "L'alternative Dust pour ceux qui arbitrent le SI des ETI françaises",
      subtitle: "Agents IA dans Odoo et SharePoint. Données en Azure West Europe. Diagnostic 45 min avec Gabriel.",
    },
    problem: [
      { tag: "h2" as const, content: "Dust est le terme de recherche. ChatGPT perso reste le vrai concurrent." },
      { tag: "p" as const, content: "Votre équipe utilise déjà ChatGPT sur des comptes personnels." },
      { tag: "p" as const, content: "Les directions informatiques d'ETI françaises savent qu'elles ont besoin de gouvernance, de résidence des données en Europe, et d'agents qui agissent dans vos outils réels (Odoo, SharePoint) plutôt que juste du chat." },
    ],
    ctaLabel: "Diagnostic 45 min",
    sectionICP: "Pour les ETI françaises avec Odoo et SharePoint",
    icpBullets: [
      "Si vous utilisez Odoo comme ERP et SharePoint pour les documents, Wonka se connecte nativement.",
      "Les agents lisent le contexte Odoo, suggèrent des actions, et laissent les équipes ops valider avant exécution.",
      "La connexion SharePoint fonctionne via l'API Microsoft Graph avec vos credentials.",
      "Dust offre 66 connecteurs publics dont SharePoint, Salesforce, Slack, Notion, ServiceNow, mais PAS Odoo. Des connecteurs MCP personnalisés sont possibles mais nécessitent un effort de développement.",
    ],
    certHeading: "Certifications et conformité",
    certWonka: "Certifié ISO 27001. Conforme RGPD. Conforme NIS 2. SOC 2 Type II en cours. Hébergé en Azure West Europe (Microsoft Irlande).",
    certDust: "Dust: certifié SOC 2 Type II, RGPD, activation HIPAA. ISO 27001 non listé sur leur page sécurité publique en août 2026.",
    tableHeading: "Tableau comparatif",
    table: {
      headers: ["Critère", "ChatGPT perso", "Dust", "Wonka"],
      rows: [
        ["Localisation données", "US (OpenAI)", "Cloud, multi-région", "Azure West Europe"],
        ["Qui utilise les agents", "Comptes personnels", "Workspace org", "Workspace org"],
        ["Odoo natif", "Non", "MCP personnalisé", "Oui"],
        ["SharePoint", "Non", "Oui (connecteur)", "Oui (Graph API)"],
        ["ISO 27001", "N/A", "Non listé publiquement", "Certifié"],
        ["Autre conformité", "N/A", "SOC 2 Type II, RGPD, HIPAA", "RGPD, NIS 2, SOC 2 en cours"],
        ["Hébergement EU", "Non", "Option multi-région", "Azure West Europe par défaut"],
        ["Délai premier agent utile", "Immédiat", "Variable", "Diagnostic 45 min + 1 semaine"],
        ["Tarifs publics", "20$/mois", "Pro 24$/siège/an, Max 120$", "21,60€ HT/user/mois"],
        ["Essai", "Gratuit limité", "Voir dust.tt", "7 jours sans carte"],
      ],
    },
    proofHeading: "Preuves: Itzu et N-allo",
    proofs: [
      { title: "Itzu", text: "100% des employés sur WonkaChat personnel. Heures économisées par personne chaque semaine sur les workflows RH et ops.", link: "/case-studies/itzu", linkText: "Lire le cas client →" },
      { title: "N-allo (Engie)", text: "Équipe de plus de 70 personnes, réduction de 50% du temps de traitement des emails support. N'a jamais opéré à 70% de capacité.", link: "/case-studies/n-allo", linkText: "Lire le cas client →" },
    ],
    awards: "#1 AI Start-up Belgium 2026 • Nvidia Inception • Microsoft for Startups • ~35 personnes",
    faqHeading: "FAQ pour les directions informatiques",
    faqs: [
      { q: "Wonka se connecte-t-il nativement à Odoo?", a: "Oui. Wonka lit les enregistrements Odoo, prépare des actions (créer devis, mettre à jour livraison), et laisse votre équipe ops valider avant exécution. C'est une intégration native, pas un connecteur API générique." },
      { q: "Où les données sont-elles traitées?", a: "Azure West Europe (Microsoft Irlande) par défaut. Vos données ne quittent jamais l'infrastructure européenne. SOC 2 Type II en cours, certifié ISO 27001, conforme RGPD et NIS 2." },
      { q: "Combien de temps pour déployer pour une ETI de 50 personnes?", a: "Diagnostic de 45 minutes, 3 agents définis pour vos workflows Odoo et SharePoint. Agents de test en ligne dans la semaine. Déploiement complet selon cycles de validation, typiquement 4-8 semaines." },
      { q: "Les directions informatiques peuvent-elles coller la ligne de conformité?", a: "Certifié ISO 27001. Conforme RGPD. Conforme NIS 2. SOC 2 Type II en cours. Hébergé en Azure West Europe (Microsoft Irlande)." },
    ],
    linksHeading: "Liens internes",
    links: [
      { href: "/france", text: "France" },
      { href: "/security", text: "Sécurité" },
      { href: "/wonka-chat", text: "WonkaChat" },
      { href: "/fr/wonka-chat/odoo", text: "Odoo" },
      { href: "/fr/integrations/odoo", text: "Intégration Odoo" },
      { href: "/fr/integrations/sharepoint", text: "Intégration SharePoint" },
      { href: "/ai-agents", text: "Agents IA" },
    ],
    securityHeading: "Vos données restent les vôtres.",
    ctaHeading: "Diagnostic 45 min. 3 agents prêts pour votre Odoo et SharePoint.",
    ctaBody: "Secteur, outils, données, frein, rôle. Deux minutes. Vous voyez le résultat avant de parler à quelqu'un.",
    ctaLabelFinal: "Démarrer diagnostic",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = content[locale === "fr" ? "fr" : "en"];
  return buildMetadata(
    { metaTitle: c.title, metaDescription: c.description, ogImage: null },
    { path: c.path, fallbackTitle: c.title },
  );
}

export default async function DustVsPage({ params }: PageProps) {
  const { locale } = await params;
  const c = content[locale === "fr" ? "fr" : "en"];
  const diagnosticUrl = "/france/diagnostic?utm_campaign=france&utm_source=vs-dust";
  const heroData: HeroData = c.hero;

  return (
    <>
      <Hero data={heroData} ctaHref={diagnosticUrl} ctaLabel={c.ctaLabel} />
      <Problem id="problem" items={c.problem} />

      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="mb-12 rounded-lg border border-border bg-mid-gray p-8">
          <h2 className="type-h4 mb-6">{c.sectionICP}</h2>
          <ul className="space-y-4 type-body">
            {c.icpBullets.map((bullet, i) => (
              <li key={i} className="flex gap-3">
                <span className={i === 3 ? "text-text/40" : "text-green-600"}>{i === 3 ? "~" : "✓"}</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-background p-8">
          <h2 className="type-h4 mb-6">{c.certHeading}</h2>
          <p className="type-body mb-4 font-medium">{c.certWonka}</p>
          <p className="type-paragraph-m text-text/60">{c.certDust}</p>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-mid-gray p-8">
          <h2 className="type-h4 mb-6">{c.tableHeading}</h2>
          <div className="overflow-x-auto rounded-lg border border-border bg-background">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-text/[0.03]">
                  {c.table.headers.map((h, i) => (
                    <th key={i} className={`px-5 py-4 type-paragraph-m-bold ${i > 0 && i < 3 ? "text-text/50" : i === 3 ? "text-accent" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.table.rows.map((row, i) => (
                  <tr key={i} className={i < c.table.rows.length - 1 ? "border-b border-border" : ""}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-5 py-4 type-paragraph-m ${j > 0 ? "text-text/60" : ""}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="type-h4 mb-6">{c.proofHeading}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {c.proofs.map((proof, i) => (
              <div key={i} className="rounded-lg border border-border bg-background p-6">
                <h3 className="type-h6 mb-3">{proof.title}</h3>
                <p className="type-paragraph-m text-text/70">{proof.text}</p>
                <a href={proof.link} className="mt-4 inline-block type-paragraph-m-bold text-accent hover:underline">{proof.linkText}</a>
              </div>
            ))}
          </div>
          <div className="mt-6 type-paragraph-m text-text/60">{c.awards}</div>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-mid-gray p-8">
          <h2 className="type-h4 mb-6">{c.faqHeading}</h2>
          <div className="space-y-6">
            {c.faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="type-paragraph-m-bold mb-2">{faq.q}</h3>
                <p className="type-paragraph-m text-text/60">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="type-h4 mb-4">{c.linksHeading}</h2>
          <div className="flex flex-wrap justify-center gap-4 type-paragraph-m">
            {c.links.map((link, i) => (
              <span key={i} className="contents">
                <a href={link.href} className="text-accent hover:underline">{link.text}</a>
                {i < c.links.length - 1 && <span className="text-text/30">•</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Stats id="stats" />
      <div className="pb-20 md:pb-24">
        <Security id="security" data={{ eyebrow: null, heading: c.securityHeading, body: null }} />
      </div>
      <Cta
        id="get-started"
        data={{ heading: c.ctaHeading, body: c.ctaBody }}
        meetingUrl={diagnosticUrl}
        meetingLabel={c.ctaLabelFinal}
        meetingTrackType="france"
        showImage={false}
      />
    </>
  );
}
