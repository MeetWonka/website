import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { CASE_STUDIES_QUERY } from "@sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { hubPath, itemPath } from "@/lib/locale-path";
import { HubPopularLinks } from "@/components/sections/hub-popular-links";
import { getHubPopularLinks } from "@/lib/hub-popular-links";
import type { Locale } from "@/i18n/config";
import type { CaseStudy } from "@/lib/types";

export const dynamic = "force-static";

interface PageProps { params: Promise<{ locale: Locale }> }

const copy = {
  en: {
    eyebrow: "Customer proof",
    title: "How teams deploy private AI with Wonka",
    subtitle: "Real workflows, connected systems and measurable outcomes from companies adopting private enterprise AI.",
    proof: "What we prove",
    all: "Customer stories",
    popular: "Deployment guides",
    empty: "Case studies are coming soon. In the meantime, explore integrations and AI agent workflows.",
    metrics: ["Private deployment", "Connected stack", "Measurable workflow", "Human oversight"],
    explainer: "Wonka case studies focus on practical enterprise deployments: the systems connected, the teams involved, the workflow automated and the measurable operational result. The goal is to show how private AI moves from experiment to repeatable production use. Each story should make the operating model visible: who owns the workflow, which data sources are trusted, how users validate answers and what changed once the AI workflow became part of daily work. This makes the case study useful for buyers and operators: it shows the deployment pattern, not only the outcome.",
    evaluationTitle: "How to read these customer stories",
    evaluationBody: "When reviewing an enterprise AI case study, look for the operational path behind the result. A strong deployment starts with a narrow workflow, connects the trusted source systems, defines who can validate an AI answer, then measures whether the workflow becomes faster, safer or easier to repeat. Wonka uses this structure to separate useful AI rollouts from generic demos.",
    adoptionBody: "The same lens applies before a project starts. If the workflow is unclear, the data source is disconnected or the owner cannot measure adoption, the AI system will struggle to become part of daily work. Case studies should therefore show the path from business problem to governed usage. They should also make clear which teams own the rollout, which permissions protect the data and which operational metric proves that the AI workflow is actually useful.",
    evaluationPoints: ["Which workflow changed?", "Which systems were connected?", "How was adoption measured?"],
    seo: {
      metaTitle: "Private AI Case Studies | Wonka AI",
      metaDescription: "Explore Wonka AI case studies showing private enterprise AI deployments, connected workflows and measurable business outcomes.",
      ogImage: null,
    },
  },
  fr: {
    eyebrow: "Preuve client",
    title: "Comment les équipes déploient l'IA privée avec Wonka",
    subtitle: "Workflows réels, systèmes connectés et résultats mesurables d'entreprises qui adoptent l'IA privée.",
    proof: "Ce que l'on prouve",
    all: "Cas clients",
    popular: "Guides de déploiement",
    empty: "Les cas clients arrivent bientôt. En attendant, explorez les intégrations et workflows d'agents IA.",
    metrics: ["Déploiement privé", "Stack connectée", "Workflow mesurable", "Validation humaine"],
    explainer: "Les cas clients Wonka montrent des déploiements IA enterprise concrets : systèmes connectés, équipes impliquées, workflow automatisé et résultat opérationnel mesurable. L'objectif est de montrer comment l'IA privée passe de l'expérimentation à un usage répété en production. Chaque histoire doit rendre le modèle opérationnel visible : qui porte le workflow, quelles sources de données sont fiables, comment les utilisateurs valident les réponses et ce qui change quand le workflow IA entre dans le travail quotidien. Cela rend le cas client utile pour les acheteurs comme pour les opérateurs : il montre le modèle de déploiement, pas seulement le résultat.",
    evaluationTitle: "Comment lire ces cas clients",
    evaluationBody: "Pour évaluer un cas client IA enterprise, regardez le chemin opérationnel derrière le résultat. Un bon déploiement part d'un workflow précis, connecte les systèmes sources fiables, définit qui peut valider une réponse IA, puis mesure si le travail devient plus rapide, plus sûr ou plus facile à répéter. Wonka utilise cette structure pour distinguer les vrais déploiements des simples démos.",
    adoptionBody: "La même grille s'applique avant de lancer un projet. Si le workflow est flou, si la source de données est déconnectée ou si le responsable ne peut pas mesurer l'adoption, le système IA aura du mal à entrer dans le travail quotidien. Un cas client doit donc montrer le passage du problème métier à l'usage gouverné. Il doit aussi clarifier quelles équipes portent le déploiement, quelles permissions protègent les données et quelle métrique opérationnelle prouve que le workflow IA est réellement utile.",
    evaluationPoints: ["Quel workflow a changé ?", "Quels systèmes ont été connectés ?", "Comment l'adoption a été mesurée ?"],
    seo: {
      metaTitle: "Cas clients IA privée | Wonka AI",
      metaDescription: "Découvrez des cas clients Wonka sur l'IA privée en entreprise, les workflows connectés et les résultats métier mesurables.",
      ogImage: null,
    },
  },
  nl: {
    eyebrow: "Customer proof",
    title: "Hoe teams private AI uitrollen met Wonka",
    subtitle: "Echte workflows, gekoppelde systemen en meetbare resultaten van bedrijven die private enterprise AI adopteren.",
    proof: "Wat we bewijzen",
    all: "Klantcases",
    popular: "Deploymentgidsen",
    empty: "Klantcases komen binnenkort. Bekijk intussen integraties en AI-agent workflows.",
    metrics: ["Private deployment", "Gekoppelde stack", "Meetbare workflow", "Menselijke controle"],
    explainer: "Wonka-klantcases tonen praktische enterprise deployments: de systemen die gekoppeld zijn, de teams die ermee werken, de workflow die geautomatiseerd wordt en het meetbare operationele resultaat. Zo wordt private AI herhaalbaar in productie. Elke case moet het operationele model zichtbaar maken: wie eigenaar is van de workflow, welke databronnen betrouwbaar zijn, hoe gebruikers antwoorden valideren en wat verandert zodra AI deel wordt van dagelijks werk. Daardoor is de case nuttig voor kopers en operators: ze toont het deploymentpatroon, niet alleen het resultaat.",
    evaluationTitle: "Hoe je deze klantcases leest",
    evaluationBody: "Bij een enterprise AI-klantcase is vooral het operationele pad achter het resultaat belangrijk. Een sterke deployment begint met een afgebakende workflow, koppelt betrouwbare bronsystemen, bepaalt wie een AI-antwoord kan valideren en meet daarna of het werk sneller, veiliger of beter herhaalbaar wordt. Wonka gebruikt dit kader om echte rollouts te onderscheiden van demo's.",
    adoptionBody: "Dezelfde lens geldt voordat een project start. Als de workflow onduidelijk is, de databron niet gekoppeld is of de eigenaar adoptie niet kan meten, wordt AI moeilijk onderdeel van dagelijks werk. Een klantcase moet daarom de stap tonen van bedrijfsprobleem naar beheerst gebruik. Ze moet ook duidelijk maken welke teams eigenaar zijn van de uitrol, welke permissies data beschermen en welke operationele metric bewijst dat de AI-workflow echt nuttig is.",
    evaluationPoints: ["Welke workflow veranderde?", "Welke systemen werden gekoppeld?", "Hoe werd adoptie gemeten?"],
    seo: {
      metaTitle: "Private AI-klantcases | Wonka AI",
      metaDescription: "Bekijk Wonka AI-klantcases over private enterprise AI, gekoppelde workflows en meetbare bedrijfsresultaten.",
      ogImage: null,
    },
  },
} satisfies Record<Locale, { eyebrow: string; title: string; subtitle: string; proof: string; all: string; popular: string; empty: string; metrics: string[]; explainer: string; evaluationTitle: string; evaluationBody: string; adoptionBody: string; evaluationPoints: string[]; seo: { metaTitle: string; metaDescription: string; ogImage: null } }>;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(copy[locale].seo, {
    path: hubPath("case-studies", locale),
    hreflang: "hub",
    fallbackTitle: "AI Case Studies | Wonka AI",
    locale,
  });
}

export default async function CasClientsPage({ params }: PageProps) {
  const { locale } = await params;
  const { data } = await sanityFetch({ query: CASE_STUDIES_QUERY, params: { language: locale } });
  const cases = (data ?? []) as CaseStudy[];
  const l = copy[locale];

  return (
    <main className="bg-background">
      <section className="border-b border-dashed border-border">
        <div className="mx-auto max-w-[1200px] px-6 pb-14 pt-32 md:pt-36">
          <p className="type-eyebrow text-text/40">{l.eyebrow}</p>
          <h1 className="mt-4 type-h2 max-w-4xl">{l.title}</h1>
          <p className="mt-5 max-w-3xl type-body leading-relaxed text-text/60">{l.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="mb-14 rounded-lg border border-border bg-mid-gray p-6">
          <h2 className="type-h5 mb-5">{l.proof}</h2>
          <p className="mb-6 max-w-3xl type-paragraph-m leading-relaxed text-text/60">{l.explainer}</p>
          <div className="grid gap-3 md:grid-cols-4">
            {l.metrics.map((metric) => (
              <div key={metric} className="rounded-md border border-border bg-background p-4">
                <span className="mb-4 block size-2 rounded-full bg-text" aria-hidden />
                <p className="type-paragraph-m-bold">{metric}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-14 grid gap-6 rounded-lg border border-border p-6 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="type-h5">{l.evaluationTitle}</h2>
            <p className="mt-4 type-paragraph-m leading-relaxed text-text/65">{l.evaluationBody}</p>
            <p className="mt-4 type-paragraph-m leading-relaxed text-text/65">{l.adoptionBody}</p>
          </div>
          <div className="grid gap-3">
            {l.evaluationPoints.map((point) => (
              <p key={point} className="rounded-md border border-border bg-mid-gray p-4 type-paragraph-m-bold">{point}</p>
            ))}
          </div>
        </div>

        {!cases.length ? (
          <>
            <h2 className="type-h5 mb-6">{l.all}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <a
                href={itemPath("case-studies", "en", "itzu")}
                className="group flex min-h-72 flex-col rounded-lg border border-border p-6 transition-colors hover:border-accent"
              >
                <span className="type-eyebrow text-text/40">Recruitment & HR</span>
                <h3 className="mt-4 type-h5 group-hover:text-accent">Itzu</h3>
                <p className="mt-3 type-body text-text/65">How Itzu empowers every employee with personal AI assistants</p>
                <ul className="mt-auto flex flex-col gap-2 pt-6">
                  <li className="type-paragraph-s text-accent">100% employee adoption</li>
                  <li className="type-paragraph-s text-accent">Multiple hours saved per employee weekly</li>
                </ul>
              </a>
              <a
                href={itemPath("case-studies", "en", "n-allo")}
                className="group flex min-h-72 flex-col rounded-lg border border-border p-6 transition-colors hover:border-accent"
              >
                <span className="type-eyebrow text-text/40">Energy & Utilities</span>
                <h3 className="mt-4 type-h5 group-hover:text-accent">N-allo (Engie)</h3>
                <p className="mt-3 type-body text-text/65">N-allo cuts support email time by 50% with AI agents</p>
                <ul className="mt-auto flex flex-col gap-2 pt-6">
                  <li className="type-paragraph-s text-accent">50% time reduction on support emails</li>
                  <li className="type-paragraph-s text-accent">Team of +70 employees</li>
                </ul>
              </a>
            </div>
            <HubPopularLinks title={l.popular} links={getHubPopularLinks(locale)} />
          </>
        ) : (
          <>
            <h2 className="type-h5 mb-6">{l.all}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {cases.map((caseStudy) => (
                <a
                  key={caseStudy._id}
                  href={itemPath("case-studies", locale, caseStudy.slug.current)}
                  className="group flex min-h-72 flex-col rounded-lg border border-border p-6 transition-colors hover:border-accent"
                >
                  <span className="type-eyebrow text-text/40">{caseStudy.sector}</span>
                  <h3 className="mt-4 type-h5 group-hover:text-accent">{caseStudy.clientName}</h3>
                  <p className="mt-3 type-body text-text/65">{caseStudy.headline}</p>
                  {caseStudy.results?.length ? (
                    <ul className="mt-auto flex flex-col gap-2 pt-6">
                      {caseStudy.results.slice(0, 3).map((result) => (
                        <li key={result} className="type-paragraph-s text-accent">{result}</li>
                      ))}
                    </ul>
                  ) : null}
                </a>
              ))}
            </div>
            <HubPopularLinks title={l.popular} links={getHubPopularLinks(locale)} />
          </>
        )}
      </section>
    </main>
  );
}
