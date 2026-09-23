import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Problem, type ProblemItem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { Stats } from "@/components/sections/stats";
import { Security } from "@/components/sections/security";
import { Cta } from "@/components/sections/cta";
import { buildMetadata } from "@/lib/seo";
import type { HeroData, SolutionData } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/fr/agent-ia-entreprise";
const title = "Agent IA entreprise pour ceux qui arbitrent le SI d'ETI | Wonka";
const description = "Agent IA entreprise pour les directions informatiques d'ETI. Agents qui agissent dans Odoo et SharePoint. Azure West Europe. ISO 27001, RGPD, NIS 2.";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(
    {
      metaTitle: title,
      metaDescription: description,
      ogImage: null,
    },
    { path: pagePath, fallbackTitle: title },
  );
}

const heroData: HeroData = {
  awardBadge: "#1 AI START-UP OF THE YEAR - BELGIUM STARTUP AWARDS 2026",
  title: "Agent IA entreprise pour ceux qui arbitrent le SI d'une ETI",
  subtitle: "Agents qui agissent dans Odoo et SharePoint. Gouvernance centralisée. Azure West Europe. ISO 27001, RGPD, NIS 2.",
};

const problemItems: ProblemItem[] = [
  {
    tag: "h2",
    content: "Votre ChatGPT perso marche très bien.",
  },
  {
    tag: "p",
    content: "Pour les 12 qui savent s'en servir.",
  },
  {
    tag: "p",
    content: "Pour tout le monde ailleurs, le travail avance encore à la main.",
  },
  {
    tag: "p",
    content: "La direction informatique n'a aucune visibilité sur ce qui sort de l'entreprise.",
  },
  {
    tag: "p",
    content: "Un agent dans vos outils, ça se gouverne.",
  },
];

const solutionData: SolutionData = {
  eyebrow: "Pour les ETI françaises",
  heading: "Des agents IA qui agissent dans vos outils métier.",
  body: "Les directions informatiques d'ETI savent qu'elles ont besoin d'agents qui se connectent à Odoo et SharePoint, de données hébergées en Europe, et de gouvernance sur qui fait quoi. Pas juste du chat.",
  steps: [
    {
      _key: "step-1",
      title: "Agents natifs Odoo et SharePoint",
      body: "Si vous utilisez Odoo comme ERP et SharePoint pour les documents, Wonka se connecte nativement. Les agents lisent le contexte, suggèrent des actions, et laissent les équipes ops valider avant exécution.",
    },
    {
      _key: "step-2",
      title: "Données en Azure West Europe",
      body: "Hébergé en Azure West Europe (Microsoft Irlande) par défaut. Vos données ne quittent jamais l'infrastructure européenne. Certifié ISO 27001, conforme RGPD, conforme NIS 2, SOC 2 Type II en cours.",
    },
    {
      _key: "step-3",
      title: "Gouvernance centralisée",
      body: "Visibilité complète sur qui utilise quels agents, quelles données sont accessibles, quelles actions sont suggérées. Les directions informatiques gardent le contrôle.",
    },
    {
      _key: "step-4",
      title: "Diagnostic 45 min avec Gabriel",
      body: "45 minutes pour identifier 3 agents prêts pour votre configuration Odoo et SharePoint. Agents de test livrés dans la semaine suivant le diagnostic.",
    },
  ],
};

export default async function AgentIaEntreprisePage() {
  const diagnosticUrl = "/france/diagnostic?utm_campaign=france&utm_source=agent-ia-entreprise";
  const registerUrl = "https://wonka.chat/register";

  return (
    <>
      <Hero
        data={heroData}
        ctaHref={diagnosticUrl}
        ctaLabel="Diagnostic 45 min"
      />
      <Problem id="problem" items={problemItems} />
      <Solution id="solution" data={solutionData} />

      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="mb-12 rounded-lg border border-border bg-mid-gray p-8">
          <h2 className="type-h4 mb-6">Pour les ETI françaises avec Odoo et SharePoint</h2>
          <ul className="space-y-4 type-body">
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>Odoo: intégration native. Les agents lisent les enregistrements, préparent les actions (créer devis, mettre à jour livraison), laissent les ops valider.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>SharePoint: connexion via Microsoft Graph API avec vos credentials. Accès aux documents sans duplication.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>MCP: protocole Model Context Protocol pour connecter des outils personnalisés. Les agents agissent dans votre SI, pas juste du chat.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>AIPD: Analyse d'Impact sur la Protection des Données disponible pour les directions informatiques qui doivent justifier auprès de leur DPO.</span>
            </li>
          </ul>
          <p className="mt-6 type-paragraph-m text-text/60">
            MCP: Model Context Protocol. Standard pour connecter des agents IA à des systèmes externes. AIPD: Analyse d'Impact sur la Protection des Données (Data Protection Impact Assessment). ERP: Enterprise Resource Planning (Planification des Ressources d'Entreprise).
          </p>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-background p-8">
          <h2 className="type-h4 mb-6">Certifications et conformité</h2>
          <p className="type-body font-medium mb-4">
            Certifié ISO 27001. Conforme RGPD. Conforme NIS 2. SOC 2 Type II en cours. Hébergé en Azure West Europe (Microsoft Irlande).
          </p>
          <p className="type-paragraph-m text-text/60">
            Les directions informatiques peuvent coller cette ligne dans leurs dossiers de conformité. AIPD disponible sur demande.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="type-h4 mb-6">Preuves avec des ETI françaises et belges</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="type-h6 mb-3">Itzu</h3>
              <p className="type-paragraph-m text-text/70">100% des employés sur WonkaChat personnel. Heures économisées par personne chaque semaine sur les workflows RH et ops.</p>
              <a href="/case-studies/itzu" className="mt-4 inline-block type-paragraph-m-bold text-accent hover:underline">Lire le cas client →</a>
            </div>
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="type-h6 mb-3">N-allo (filiale Engie)</h3>
              <p className="type-paragraph-m text-text/70">Équipe de plus de 70 personnes. Réduction de 50% du temps de traitement des emails support. N'a jamais opéré à 70% de capacité.</p>
              <a href="/case-studies/n-allo" className="mt-4 inline-block type-paragraph-m-bold text-accent hover:underline">Lire le cas client →</a>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 type-paragraph-m text-text/60">
            <span>#1 AI Start-up Belgium 2026</span>
            <span>•</span>
            <span>Nvidia Inception</span>
            <span>•</span>
            <span>Microsoft for Startups</span>
            <span>•</span>
            <span>Environ 35 personnes</span>
          </div>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-mid-gray p-8">
          <h2 className="type-h4 mb-6">FAQ pour les directions informatiques</h2>
          <div className="space-y-6">
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Qu'est-ce que MCP et pourquoi c'est important?</h3>
              <p className="type-paragraph-m text-text/60">MCP (Model Context Protocol) est un standard pour connecter des agents IA à des systèmes externes. Pour les ETI, ça signifie que les agents peuvent agir dans Odoo, SharePoint, votre CRM, votre ERP personnalisé, sans développement lourd.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Avez-vous une AIPD disponible?</h3>
              <p className="type-paragraph-m text-text/60">Oui. L'AIPD (Analyse d'Impact sur la Protection des Données) est disponible pour les directions informatiques qui doivent justifier le déploiement auprès de leur DPO ou RSSI.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Où les données sont-elles traitées?</h3>
              <p className="type-paragraph-m text-text/60">Azure West Europe (Microsoft Irlande) par défaut. Vos données ne quittent jamais l'infrastructure européenne. Certifié ISO 27001, conforme RGPD, conforme NIS 2, SOC 2 Type II en cours.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Combien de temps pour déployer?</h3>
              <p className="type-paragraph-m text-text/60">Diagnostic de 45 minutes, 3 agents définis pour vos workflows Odoo et SharePoint. Agents de test en ligne dans la semaine. Déploiement complet selon cycles de validation, typiquement 4-8 semaines pour une ETI de 50-100 personnes.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="type-h4 mb-4">Liens internes</h2>
          <div className="flex flex-wrap justify-center gap-4 type-paragraph-m">
            <a href="/france" className="text-accent hover:underline">France</a>
            <span className="text-text/30">•</span>
            <a href="/security" className="text-accent hover:underline">Sécurité</a>
            <span className="text-text/30">•</span>
            <a href="/wonka-chat" className="text-accent hover:underline">WonkaChat</a>
            <span className="text-text/30">•</span>
            <a href="/fr/wonka-chat/odoo" className="text-accent hover:underline">WonkaChat pour Odoo</a>
            <span className="text-text/30">•</span>
            <a href="/fr/integrations/odoo" className="text-accent hover:underline">Intégration Odoo</a>
            <span className="text-text/30">•</span>
            <a href="/fr/integrations/sharepoint" className="text-accent hover:underline">Intégration SharePoint</a>
            <span className="text-text/30">•</span>
            <a href="/ai-agents" className="text-accent hover:underline">Agents IA</a>
          </div>
        </div>
      </section>

      <Stats id="stats" />
      <div className="pb-20 md:pb-24">
        <Security
          id="security"
          data={{
            eyebrow: null,
            heading: "Vos données restent les vôtres.",
            body: null,
          }}
        />
      </div>
      <Cta
        id="get-started"
        data={{
          heading: "En 5 questions, 3 agents prêts pour vos outils.",
          body: "Secteur, outils, données, frein, rôle. Deux minutes. Vous voyez le résultat avant de parler à quelqu'un.",
        }}
        meetingUrl={diagnosticUrl}
        meetingLabel="Voir les 3 agents"
        meetingTrackType="france"
        showImage={false}
      />
    </>
  );
}
