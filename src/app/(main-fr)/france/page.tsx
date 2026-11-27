import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { Problem, type ProblemItem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { Stats } from "@/components/sections/stats";
import { Security } from "@/components/sections/security";
import { TrustedBy } from "@/components/sections/trusted-by";
import { buildMetadata } from "@/lib/seo";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { cn } from "@/lib/utils";
import { headingClass } from "@/lib/design-tokens";
import type { SiteSettings, HeroData, SolutionData } from "@/lib/types";
import { FranceHero, FranceCta } from "./france-page-client";

export const dynamic = "force-static";

const pagePath = "/france";
const title = "Wonka AI France | Agents IA connectés à vos outils métier";
const description = "Identifiez les agents IA à déployer dans vos outils et processus. Un diagnostic court pour faire émerger trois pistes adaptées à votre entreprise.";

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

async function getSiteSettings() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data as SiteSettings | null;
}

const heroData: HeroData = {
  awardBadge: "Agents IA adaptés à vos outils métier",
  title: "Trouvez les agents IA utiles à votre entreprise.",
  subtitle: "En cinq questions, repérez trois pistes d’agents à partir de vos outils, de vos données et de vos priorités. Vous voyez le résultat avant de réserver un échange.",
};

const problemItems: ProblemItem[] = [
  {
    tag: "h2",
    content: "L’IA est déjà utilisée dans votre entreprise.",
  },
  { tag: "p", content: "Mais les usages restent souvent individuels." },
  {
    tag: "p",
    content: "Les équipes continuent à chercher, recopier et traiter les mêmes tâches à la main.",
  },
  { tag: "p", content: "Et la direction manque de visibilité sur les données utilisées et les actions lancées.",
  },
  {
    tag: "p",
    content: "Un agent utile doit s’intégrer aux outils métier et rester sous contrôle.",
  },
];

const solutionData: SolutionData = {
  eyebrow: "Du cas d’usage au déploiement",
  heading: "Partez de votre travail réel, pas d’une démo d’IA.",
  body: "Nous partons des tâches répétitives, des outils déjà en place et des contraintes de vos équipes. Le diagnostic vous aide à prioriser les premiers agents à étudier.",
  steps: [
    {
      _key: "step-1",
      title: "Repérez les tâches qui reviennent.",
      body: "Nous examinons vos activités, vos outils et les tâches où vos équipes cherchent, vérifient ou recopient souvent des informations.",
    },
    {
      _key: "step-2",
      title: "Choisissez les bons premiers agents.",
      body: "Nous priorisons les pistes selon leur valeur attendue, les données disponibles et le niveau de contrôle requis.",
    },
    {
      _key: "step-3",
      title: "Connectez-les à vos outils.",
      body: "Les agents peuvent s’appuyer sur vos outils et données existants, selon les connecteurs disponibles et les accès validés avec votre entreprise.",
    },
    {
      _key: "step-4",
      title: "Gardez la maîtrise des actions.",
      body: "Définissez les permissions, les validations humaines et les indicateurs qui permettront de suivre l’usage une fois l’agent déployé.",
    },
  ],
};

export default async function FrancePage() {
  const settings = await getSiteSettings();
  const franceMeetingUrl = resolveMeetingUrl(settings?.sharedLinks, "france");

  return (
    <>
      <FranceHero data={heroData} />
      <Problem id="problem" items={problemItems} />
      <Solution id="solution" data={solutionData} />
      <Stats id="stats" />
      <TrustedBy id="trusted-by" />
      
      <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <h2 className={cn(headingClass.section, "mb-12 text-center")}>Des résultats obtenus chez nos clients</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-sm border border-border bg-background p-8">
            <h3 className={cn(headingClass.card, "mb-4")}>N-allo (Engie)</h3>
            <p className="type-body text-text/70">
              -50 % de temps sur les mails de support, équipe de +70 personnes.
            </p>
            <a
              href="/case-studies/n-allo"
              className="mt-4 inline-block type-paragraph-m-bold text-accent hover:underline"
            >
              Lire le cas client →
            </a>
          </div>
          <div className="rounded-sm border border-border bg-background p-8">
            <h3 className={cn(headingClass.card, "mb-4")}>Itzu</h3>
            <p className="type-body text-text/70">
              100 % des salariés ont leur WonkaChat personnel. Plusieurs heures gagnées chaque semaine.
            </p>
            <a
              href="/case-studies/itzu"
              className="mt-4 inline-block type-paragraph-m-bold text-accent hover:underline"
            >
              Lire le cas client →
            </a>
          </div>
        </div>
      </section>
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
      <FranceCta
        data={{
          heading: "Recevez trois pistes d’agents pour votre entreprise.",
          body: "Cinq questions sur vos outils et vos priorités. Le résultat s’affiche avant toute prise de rendez-vous.",
        }}
      />
    </>
  );
}
