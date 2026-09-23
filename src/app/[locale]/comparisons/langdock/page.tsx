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
    path: "/vs/langdock",
    title: "Langdock alternative for ETI: Odoo agents, Azure West Europe",
    description: "AI agents in Odoo and SharePoint, for IT and security leads evaluating Langdock. Data in Azure West Europe. ISO 27001, GDPR, NIS 2.",
    hero: {
      awardBadge: "#1 AI START-UP OF THE YEAR - BELGIUM STARTUP AWARDS 2026",
      title: "AI agents in Odoo and SharePoint, for IT and security leads evaluating Langdock",
      subtitle: "Data in Azure West Europe. ISO 27001, GDPR, NIS 2. 45 min diagnostic with Gabriel.",
    },
    problem: [
      { tag: "h2" as const, content: "Langdock is the search term. ChatGPT perso remains the real competitor." },
      { tag: "p" as const, content: "Your team already uses ChatGPT on personal accounts." },
      { tag: "p" as const, content: "IT and security leads at ETI know they need governance, European data residency, and agents that act in your actual business tools." },
    ],
    ctaLabel: "45 min diagnostic",
    icpHeading: "Native Odoo integration vs generic connectors",
    icpBullets: [
      "Wonka connects natively to Odoo as your ERP. Agents read context, prepare actions, and let ops teams validate before executing.",
      "SharePoint runs via Microsoft Graph API with your credentials.",
      "Langdock connector coverage: check existing wonka-ai.com content and /blog/wonka-vs-langdock for current public information.",
    ],
    certHeading: "Certifications you can paste",
    certText: "ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe (Microsoft Ireland).",
    proofHeading: "Proven with French mid-market teams",
    proofs: [
      { title: "Itzu", text: "100% of employees on personal WonkaChat across HR and ops.", link: "/case-studies/itzu", linkText: "Read case study →" },
      { title: "N-allo (Engie)", text: "Over 70 people, 50% reduction in support email time.", link: "/case-studies/n-allo", linkText: "Read case study →" },
    ],
    awards: "#1 AI Start-up Belgium 2026 • Nvidia Inception • Microsoft for Startups • ~35 people",
    diagHeading: "45-minute diagnostic",
    diagText: "Diagnostic with Gabriel identifies 3 agents ready for your Odoo and SharePoint workflows. Trial agents within one week.",
    faqHeading: "FAQ",
    faqs: [
      { q: "Does Wonka connect to Odoo natively?", a: "Yes. Native integration reads Odoo records, prepares actions, and lets your team validate before execution. Not a generic API wrapper." },
      { q: "Where is data hosted?", a: "Azure West Europe (Microsoft Ireland). ISO 27001 certified, GDPR compliant, NIS 2 compliant, SOC 2 Type II in progress." },
      { q: "How long to first agent for a 50-person company?", a: "45-minute diagnostic, 3 agents scoped to your tools. Trial live within one week. Full deployment 4-8 weeks depending on validation." },
    ],
    linksHeading: "Internal links",
    links: [
      { href: "/france", text: "France" },
      { href: "/security", text: "Security" },
      { href: "/wonka-chat", text: "WonkaChat" },
      { href: "/wonka-chat/odoo", text: "Odoo" },
      { href: "/integrations", text: "Integrations" },
      { href: "/ai-agents", text: "AI agents" },
    ],
    securityHeading: "Your data stays yours.",
    ctaHeading: "45 min diagnostic. 3 agents ready for your tools.",
    ctaBody: "Sector, tools, data, blocker, role. Two minutes. You see the result before talking to anyone.",
    ctaLabelFinal: "Start diagnostic",
  },
  fr: {
    path: "/fr/vs/langdock",
    title: "Alternative Langdock pour ETI : Odoo, Azure West Europe",
    description: "Des agents IA dans Odoo et SharePoint, pour ceux qui arbitrent le SI d'ETI qui évaluent Langdock. Données en Azure West Europe.",
    hero: {
      awardBadge: "#1 AI START-UP OF THE YEAR - BELGIUM STARTUP AWARDS 2026",
      title: "Des agents IA dans Odoo et SharePoint, pour ceux qui arbitrent le SI d'ETI qui évaluent Langdock",
      subtitle: "Données en Azure West Europe. ISO 27001, RGPD, NIS 2. Diagnostic 45 min avec Gabriel.",
    },
    problem: [
      { tag: "h2" as const, content: "Langdock est le terme de recherche. ChatGPT perso reste le vrai concurrent." },
      { tag: "p" as const, content: "Votre équipe utilise déjà ChatGPT sur des comptes personnels." },
      { tag: "p" as const, content: "Les directions informatiques d'ETI savent qu'elles ont besoin de gouvernance, de résidence européenne des données, et d'agents qui agissent dans vos outils métier réels." },
    ],
    ctaLabel: "Diagnostic 45 min",
    icpHeading: "Intégration Odoo native vs connecteurs génériques",
    icpBullets: [
      "Wonka se connecte nativement à Odoo comme ERP. Les agents lisent le contexte, préparent des actions, et laissent les équipes ops valider avant exécution.",
      "SharePoint via API Microsoft Graph avec vos credentials.",
      "Couverture connecteurs Langdock: vérifier le contenu existant sur wonka-ai.com et /fr/blog/wonka-vs-langdock pour les informations publiques actuelles.",
    ],
    certHeading: "Certifications que vous pouvez coller",
    certText: "Certifié ISO 27001. Conforme RGPD. Conforme NIS 2. SOC 2 Type II en cours. Hébergé en Azure West Europe (Microsoft Irlande).",
    proofHeading: "Prouvé avec des équipes ETI françaises",
    proofs: [
      { title: "Itzu", text: "100% des employés sur WonkaChat personnel pour RH et ops.", link: "/case-studies/itzu", linkText: "Lire le cas client →" },
      { title: "N-allo (Engie)", text: "Plus de 70 personnes, réduction de 50% du temps email support.", link: "/case-studies/n-allo", linkText: "Lire le cas client →" },
    ],
    awards: "#1 AI Start-up Belgium 2026 • Nvidia Inception • Microsoft for Startups • Environ 35 personnes",
    diagHeading: "Diagnostic de 45 minutes",
    diagText: "Diagnostic avec Gabriel identifie 3 agents prêts pour vos workflows Odoo et SharePoint. Agents de test dans la semaine.",
    faqHeading: "FAQ",
    faqs: [
      { q: "Wonka se connecte-t-il nativement à Odoo?", a: "Oui. Intégration native qui lit les enregistrements Odoo, prépare les actions, et laisse votre équipe valider avant exécution. Pas un wrapper API générique." },
      { q: "Où les données sont-elles hébergées?", a: "Azure West Europe (Microsoft Irlande). Certifié ISO 27001, conforme RGPD, conforme NIS 2, SOC 2 Type II en cours." },
      { q: "Combien de temps jusqu'au premier agent pour une entreprise de 50 personnes?", a: "Diagnostic de 45 minutes, 3 agents définis pour vos outils. Test en ligne dans la semaine. Déploiement complet 4-8 semaines selon validation." },
    ],
    linksHeading: "Liens internes",
    links: [
      { href: "/france", text: "France" },
      { href: "/security", text: "Sécurité" },
      { href: "/wonka-chat", text: "WonkaChat" },
      { href: "/fr/wonka-chat/odoo", text: "Odoo" },
      { href: "/fr/integrations", text: "Intégrations" },
      { href: "/ai-agents", text: "Agents IA" },
    ],
    securityHeading: "Vos données restent les vôtres.",
    ctaHeading: "Diagnostic 45 min. 3 agents prêts pour vos outils.",
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

export default async function LangdockVsPage({ params }: PageProps) {
  const { locale } = await params;
  const c = content[locale === "fr" ? "fr" : "en"];
  const diagnosticUrl = "/france/diagnostic?utm_campaign=france&utm_source=vs-langdock";
  const heroData: HeroData = c.hero;

  return (
    <>
      <Hero data={heroData} ctaHref={diagnosticUrl} ctaLabel={c.ctaLabel} />
      <Problem id="problem" items={c.problem} />

      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="mb-12 rounded-lg border border-border bg-mid-gray p-8">
          <h2 className="type-h4 mb-6">{c.icpHeading}</h2>
          <ul className="space-y-4 type-body">
            {c.icpBullets.map((bullet, i) => (
              <li key={i} className="flex gap-3">
                <span className={i === 2 ? "text-text/40" : "text-green-600"}>{i === 2 ? "~" : "✓"}</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-background p-8">
          <h2 className="type-h4 mb-6">{c.certHeading}</h2>
          <p className="type-body font-medium">{c.certText}</p>
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
          <div className="mt-6 flex flex-wrap gap-4 type-paragraph-m text-text/60">{c.awards}</div>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-mid-gray p-8">
          <h2 className="type-h4 mb-6">{c.diagHeading}</h2>
          <p className="type-body mb-4">{c.diagText}</p>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-background p-8">
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
