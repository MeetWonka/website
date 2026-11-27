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
const title = "Agents IA pour ETI françaises | Wonka AI";
const description = "Identifiez les agents IA à connecter à Odoo, SharePoint et vos processus métier, avec gouvernance et hébergement européen.";

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
  awardBadge: "Pour les DSI et RSSI d’ETI françaises",
  title: "Déployez des agents IA dans vos outils métier.",
  subtitle: "Repérez les premiers cas d’usage dans Odoo, SharePoint et vos processus, avec un cadre de gouvernance adapté à votre SI.",
};

const problemItems: ProblemItem[] = [
  {
    tag: "h2",
    content: "L’IA est déjà utilisée dans certaines équipes.",
  },
  {
    tag: "p",
    content: "Mais les usages et les résultats restent difficiles à généraliser.",
  },
  {
    tag: "p",
    content: "Les tâches répétitives continuent de mobiliser vos équipes.",
  },
  {
    tag: "p",
    content: "La DSI doit aussi savoir quelles données sont accessibles et quelles actions sont autorisées.",
  },
  {
    tag: "p",
    content: "Un agent doit s’intégrer au SI et respecter vos règles d’accès.",
  },
];

const solutionData: SolutionData = {
  eyebrow: "Pour les ETI françaises",
  heading: "Des agents ancrés dans vos processus et votre SI.",
  body: "Un premier déploiement commence par les tâches à valeur, les systèmes concernés et les validations nécessaires. Le diagnostic vous aide à cadrer ces choix avant de lancer un projet.",
  steps: [
    {
      _key: "step-1",
      title: "Ciblez les bons outils",
      body: "Indiquez les systèmes où se trouvent vos données et vos tâches récurrentes. Nous vérifions les connecteurs et les besoins d’intégration pendant le cadrage.",
    },
    {
      _key: "step-2",
      title: "Définissez vos exigences de déploiement",
      body: "Précisez vos attentes en matière d’hébergement, de sécurité et de conformité pour évaluer le cadre adapté à votre entreprise.",
    },
    {
      _key: "step-3",
      title: "Cadrez les accès et les validations",
      body: "Déterminez qui peut utiliser chaque agent, quelles données il peut consulter et quelles actions nécessitent une validation humaine.",
    },
    {
      _key: "step-4",
      title: "Commencez par un diagnostic court",
      body: "Répondez à cinq questions sur votre entreprise et vos outils pour recevoir trois pistes à examiner. Vous pourrez ensuite réserver un échange de cadrage.",
    },
  ],
};

export default async function AgentIaEntreprisePage() {
  const diagnosticUrl = "/france/diagnostic?utm_campaign=france&utm_source=agent-ia-entreprise";

  return (
    <>
      <Hero
        data={heroData}
        ctaHref={diagnosticUrl}
        ctaLabel="Voir mes pistes d’agents"
      />
      <Problem id="problem" items={problemItems} />
      <Solution id="solution" data={solutionData} />

      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="mb-12 rounded-lg border border-border bg-mid-gray p-8">
          <h2 className="type-h4 mb-4">Des agents dans vos outils, selon votre contexte</h2>
          <p className="type-body mb-6 text-text/70">
            Odoo et SharePoint peuvent faire partie du périmètre. Le diagnostic sert à repérer les tâches à étudier ; les connecteurs, les droits d’accès et les actions possibles sont confirmés pendant le cadrage.
          </p>
          <ul className="space-y-4 type-body">
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span><strong>Odoo :</strong> identifiez les tâches où un agent pourrait retrouver du contexte, préparer une mise à jour ou aider une équipe opérationnelle.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span><strong>SharePoint :</strong> repérez les recherches documentaires et les traitements récurrents à évaluer avec vos règles d’accès.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span><strong>Actions et validations :</strong> définissez ce que l’agent peut préparer, ce qu’une personne doit vérifier et ce qui reste hors périmètre.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span><strong>Intégration :</strong> confirmez les connecteurs, les accès et les contraintes techniques avant de fixer le périmètre de réalisation.</span>
            </li>
          </ul>
        </div>

        <div className="mb-12 rounded-lg border border-border bg-background p-8">
          <h2 className="type-h4 mb-4">Sécurité et conformité : à cadrer avec votre DSI</h2>
          <p className="type-paragraph-m text-text/60">
            Le traitement des données, les exigences d’hébergement et les documents nécessaires dépendent du périmètre retenu. Nous les examinons avec vos équipes avant tout déploiement ; nous ne présumons pas de la conformité de votre environnement.
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
              <h3 className="type-paragraph-m-bold mb-2">Pouvez-vous connecter un agent à Odoo ou SharePoint ?</h3>
              <p className="type-paragraph-m text-text/60">Ces outils peuvent être étudiés pendant le cadrage. La faisabilité dépend des données concernées, des connecteurs disponibles et des droits que votre entreprise peut accorder.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Comment les accès et les actions sont-ils définis ?</h3>
              <p className="type-paragraph-m text-text/60">Avec vos équipes, selon les tâches et les systèmes concernés. Le cadrage précise les données utiles, les permissions et les étapes qui demandent une validation humaine.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Où les données sont-elles traitées ?</h3>
              <p className="type-paragraph-m text-text/60">Cela dépend du produit et du périmètre de déploiement. Nous vérifions vos exigences d’hébergement et de traitement avec votre DSI avant de confirmer une architecture.</p>
            </div>
            <div>
              <h3 className="type-paragraph-m-bold mb-2">Que vais-je obtenir après le diagnostic ?</h3>
              <p className="type-paragraph-m text-text/60">Trois pistes d’agents générées à partir de vos réponses. Ce sont des propositions à examiner, pas des intégrations déjà configurées. Vous choisissez ensuite si vous souhaitez un échange de cadrage.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="type-h4 mb-4">Liens internes</h2>
          <div className="flex flex-wrap justify-center gap-4 type-paragraph-m">
            <a href="/france" className="text-accent hover:underline">France</a>
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
          locale="fr"
        />
      </div>
      <Cta
        id="get-started"
        data={{
          heading: "Trouvez trois pistes à étudier dans votre SI.",
          body: "Cinq questions sur vos outils et vos priorités. Consultez le résultat, puis décidez si vous souhaitez un échange de cadrage.",
        }}
        meetingUrl={diagnosticUrl}
        meetingLabel="Voir mes pistes d’agents"
        meetingTrackType="france"
        showImage={false}
      />
    </>
  );
}
