import type { LocalePageDefaults } from "@/lib/page-defaults/localized";
import { getAiChatCapabilityClusters } from "@/lib/page-defaults/ai-chat-capability-grid";
import type { SecurityData } from "@/lib/types";
import type {
  IconFeatureGridData,
  ProblemBentoData,
  WorkflowStepResolved,
  WorkflowStepVisual,
} from "@/lib/types/page-sections";
import type { TestimonialsHeader } from "@/lib/testimonials-defaults";

/* ------------------------------------------------------------------ */
/* Helpers (mirroring the EN defaults files)                          */
/* ------------------------------------------------------------------ */

function bentoCard(
  _key: string,
  title: string,
  body: string,
): ProblemBentoData["largeCards"][number] {
  return { _key, title, body, image: null, fallbackImage: null };
}

function capabilityItem(
  _key: string,
  icon: string,
  title: string,
  body: string,
): IconFeatureGridData["items"][number] {
  return { _key, icon, title, body, image: null, fallbackImage: null };
}

const WORKFLOW_STEP_LAYOUT: Array<
  Pick<WorkflowStepResolved, "variant" | "mirror" | "svgFillClassName" | "divBgClassName">
> = [
  { variant: "trapezoid", mirror: false, svgFillClassName: "fill-light-gray", divBgClassName: "bg-light-gray" },
  { variant: "rectangle", mirror: false, svgFillClassName: "fill-mid-gray", divBgClassName: "bg-mid-gray" },
  { variant: "trapezoid", mirror: true, svgFillClassName: "fill-light-gray", divBgClassName: "bg-light-gray" },
];

function workflowStep(
  _key: string,
  title: string,
  body: string,
  visual: WorkflowStepVisual,
  index: number,
): WorkflowStepResolved {
  const layout = WORKFLOW_STEP_LAYOUT[index] ?? WORKFLOW_STEP_LAYOUT[0];
  return { _key, title, body, visual, image: null, fallbackImage: null, ...layout };
}

/* ------------------------------------------------------------------ */
/* Shared sections                                                    */
/* ------------------------------------------------------------------ */

const TESTIMONIALS_HEADER: TestimonialsHeader = {
  eyebrow: "Ce que disent nos clients",
  heading: "Des retours sincères\nde personnes précieuses.",
  body: "Les retours de dirigeants qui ont confié à Wonka la mission de transformer leur ambition IA en un plan concret, que leurs équipes pouvaient mettre en œuvre.",
};

const TESTIMONIALS_SECTION = {
  eyebrow: TESTIMONIALS_HEADER.eyebrow ?? null,
  heading: TESTIMONIALS_HEADER.heading ?? null,
  body: TESTIMONIALS_HEADER.body ?? null,
};

const SECURITY: SecurityData = {
  eyebrow: null,
  heading: "Vos données restent toujours les vôtres.",
  body: null,
};

const WONKA_CHAT_SECURITY: SecurityData = {
  eyebrow: "Sécurité",
  heading: "Vos données restent toujours les vôtres.",
  body: "WonkaChat est conçu pour les entreprises qui ont besoin d'une IA utile, encadrée et sécurisée. Votre équipe profite de la rapidité de l'IA avec les contrôles qu'attend votre organisation.",
};

const PROOF_LOGOS = [
  { src: "/images/hero/proof-1.svg", alt: "PwC, Engie, Buildwise, Xerius", width: 287, height: 24 },
  { src: "/images/hero/proof-2.svg", alt: "Luminus, Cambio, Zorgi, ODTH", width: 289, height: 24 },
];

const PROOF_LOGO_STRIP = {
  logos: null,
  proofLines: ["Partenaire Start AI n°1 en Belgique", "+150 Start AI réalisés"],
  fallbackLogos: PROOF_LOGOS,
};

const WHY_NOW = {
  header: {
    eyebrow: "Pourquoi maintenant",
    heading: "Aucune équipe laissée pour compte.",
    body: "L'IA ne doit pas seulement servir à ceux qui savent quel prompt écrire ou quel outil ouvrir. Elle doit aider toute l'organisation à travailler plus intelligemment, plus vite et avec plus de focus.",
  },
  cards: [
    {
      _key: "pioneers",
      title: "L'IA ne doit pas rester l'affaire des pionniers",
      body: "Dans beaucoup d'organisations, la valeur de l'IA reste entre les mains d'un petit groupe de early adopters. Ils trouvent de meilleures façons de travailler, mais celles-ci se diffusent rarement dans les équipes.\n\nStart AI crée la structure pour transformer des expériences individuelles en progrès pour toute l'organisation.",
    },
    {
      _key: "repetitive",
      title: "Vos équipes valent mieux que le travail répétitif",
      body: "Votre équipe ne devrait pas passer ses meilleures heures à copier des informations, chercher des documents, réécrire les mêmes réponses ou faire passer le travail d'un système à l'autre.\n\nStart AI identifie les tâches que vos collaborateurs devraient arrêter de faire — et là où l'IA peut les soutenir en premier.",
    },
    {
      _key: "governance",
      title: "Une IA responsable exige des règles communes",
      body: "Si chacun utilise l'IA à sa manière, l'organisation perd le contrôle. Si personne ne l'utilise, l'organisation perd son élan.\n\nStart AI vous aide à trouver l'équilibre : une gouvernance claire, des lignes directrices pratiques et une feuille de route qui rend l'IA utilisable par tous.",
    },
  ],
};

const PROMO_HEADING = "70 % de réduction pour les PME flamandes.";
const PROMO_BODY =
  "Wonka est un prestataire agréé KMO-portefeuille. La plupart des PME flamandes récupèrent jusqu'à 70 % du coût du programme. Nous vous aidons avec les formalités.";

const TALK_TO_US_HEADER = {
  eyebrow: "Parlons-en",
  heading: "Prêt à passer à l'action avec l'IA ?",
  body: "Réservez un appel découverte de 30 minutes. Pas de slides, pas de pitch, juste une vraie conversation sur votre activité.",
};

const FAQ_HEADER = {
  eyebrow: "FAQ",
  heading: "Questions fréquentes",
  body: null,
};

const WONKA_CHAT_HERO_IMAGE = {
  src: "/images/wonka-chat/wonka-hero-flow-v2.png",
  alt: "WonkaChat transforme les documents et e-mails entrants en actions validées dans vos outils",
  width: 1920,
  height: 694,
};

const WONKA_CHAT_CONTACT = {
  header: {
    eyebrow: "Réserver une démo",
    heading: "Envie de voir ce que Wonka Workspace\npeut faire pour votre équipe ?",
    body: "Réservez une courte démo : nous vous montrerons comment Wonka Workspace se connecte à vos outils, soutient vos workflows et rend l'IA accessible dans toute votre organisation.",
  },
  portrait: null,
  personName: "Jordy Callens",
  personRole: "Partner, Wonka",
  fallbackPortrait: { src: "/images/start-ai/jordy.jpg", alt: "Jordy Callens" },
};

const WONKA_CHAT_FEATURES = {
  header: {
    eyebrow: "Fonctionnalités",
    heading: "Tout ce dont votre équipe a besoin\npour travailler avec l'IA.",
    body: "WonkaChat est conçu pour rendre l'IA utile dans toute l'organisation : assez simple pour chaque collaborateur, assez puissant pour de vrais workflows et assez flexible pour se connecter aux outils que vous utilisez déjà.",
  },
  showCta: true,
  features: [
    {
      _key: "chat",
      title: "Un chat pour votre entreprise",
      description:
        "Offrez à vos collaborateurs un endroit simple pour poser leurs questions, trouver l'information et obtenir l'aide de l'IA. WonkaChat fonctionne comme un chat familier, mais avec le contexte et les workflows de votre entreprise intégrés.",
      image: null,
      link: null,
      fallbackImage: {
        src: "/images/wonka-chat/create-ai-agents-for-specific-tasks.png",
        alt: "Créer des agents IA pour des tâches précises dans WonkaChat",
        width: 1200,
        height: 800,
      },
    },
    {
      _key: "models",
      title: "Choisissez votre modèle d'IA",
      description:
        "WonkaChat offre de la flexibilité à votre entreprise. Utilisez le modèle d'IA adapté à vos besoins, vos préférences et vos exigences de sécurité.",
      image: null,
      link: null,
      fallbackImage: {
        src: "/images/wonka-chat/feature-models.png",
        alt: "Choisir parmi les principaux modèles d'IA",
        width: 1200,
        height: 800,
      },
    },
    {
      _key: "tools",
      title: "Connecté à vos outils",
      description:
        "WonkaChat se connecte aux systèmes que votre équipe utilise déjà, pour accéder à l'information et déclencher des actions sans jongler entre les outils.",
      image: null,
      link: {
        label: "Découvrir toutes les intégrations",
        href: "/fr/integrations",
      },
      fallbackImage: {
        src: "/images/wonka-chat/feature-tools.png",
        alt: "Connecté aux outils de votre équipe",
        width: 1200,
        height: 800,
      },
    },
    {
      _key: "agents",
      title: "Créez des agents IA pour des tâches précises",
      description:
        "Créez des agents qui comprennent un rôle, une tâche ou un workflow. Du suivi commercial aux contrôles financiers en passant par les synthèses support, les agents aident vos collaborateurs à accomplir un travail précis plus rapidement.",
      image: null,
      link: null,
      fallbackImage: {
        src: "/images/wonka-chat/wonka-vis-10.png",
        alt: "Créer des agents IA pour des tâches précises",
        width: 1200,
        height: 800,
      },
    },
    {
      _key: "employee",
      title: "Pensé pour chaque collaborateur",
      description:
        "WonkaChat est conçu pour que toute l'organisation puisse travailler avec l'IA, pas seulement les équipes techniques ou les early adopters. Vos collaborateurs utilisent un langage simple, des agents partagés et des workflows guidés.",
      image: null,
      link: null,
      fallbackImage: {
        src: "/images/wonka-chat/feature-employee.png",
        alt: "Pensé pour chaque collaborateur",
        width: 1200,
        height: 800,
      },
    },
  ],
};

/* ------------------------------------------------------------------ */
/* FR page defaults                                                   */
/* ------------------------------------------------------------------ */

export const FR_PAGE_DEFAULTS: LocalePageDefaults = {
  /* ---------------------------- Start AI ---------------------------- */
  startAi: {
    hero: {
      eyebrow: "Start AI",
      title: "Faites passer votre entreprise à l'IA, vite.",
      subtitle:
        "Nous évaluons vos opérations, concevons votre stratégie IA et vous remettons le plan d'exécution, pour que toute votre équipe puisse exploiter son plein potentiel.",
      secondaryText: null,
      theme: "dark",
      backgroundImage: null,
      heroImage: null,
      secondaryLink: null,
      fallbackBackground: { src: "/images/start-ai/wonka-waterfall.png", alt: "" },
      fallbackHero: null,
    },
    logoStrip: PROOF_LOGO_STRIP,
    phases: {
      header: {
        eyebrow: "La méthode",
        heading: "Une méthode éprouvée\npour adopter l'IA.",
        body: "Start AI repose sur une conviction simple : une adoption réussie de l'IA ne commence pas par les outils. Elle commence par la clarté, l'alignement et les bonnes priorités.",
      },
      items: [
        {
          _key: "prepare",
          number: "01",
          title: "Préparer",
          subtitle: "Créer l'alignement avant d'agir",
          body: "Nous définissons le contexte stratégique, clarifions les attentes et veillons à impliquer les bonnes personnes dès le départ. Le programme n'est donc pas une exploration générique de l'IA, mais une trajectoire ciblée, construite autour de la réalité de votre organisation.",
        },
        {
          _key: "understand",
          number: "02",
          title: "Comprendre & Inspirer",
          subtitle: "Construire une compréhension commune de l'IA",
          body: "Nous mettons la direction, les équipes et les parties prenantes clés sur la même longueur d'onde. Par l'inspiration, des exemples et une projection de votre vision future, nous définissons ce que l'IA peut signifier pour votre organisation et où elle doit créer de la valeur.",
        },
        {
          _key: "analyse",
          number: "03",
          title: "Analyser & Valider",
          subtitle: "Distinguer les vraies opportunités du bruit",
          body: "Nous analysons vos workflows, processus et goulots d'étranglement pour identifier les opportunités IA à la fois utiles et réalistes. Chaque opportunité est évaluée selon son impact, sa faisabilité, votre niveau de maturité et sa pertinence stratégique.",
        },
        {
          _key: "activate",
          number: "04",
          title: "Activer & Livrer",
          subtitle: "Transformer la stratégie en feuille de route concrète",
          body: "Nous traduisons les opportunités validées en une feuille de route concrète, appuyée par des bases de gouvernance et des recommandations pratiques. Le résultat : une voie claire — quoi faire, pourquoi c'est important et comment commencer.",
        },
      ],
    },
    deliverables: {
      heading: "Ce que vous obtenez.",
      items: [
        {
          _key: "readiness",
          title: "Évaluation de maturité IA",
          body: "Une vision claire de la position actuelle de votre organisation.",
        },
        {
          _key: "cases",
          title: "Business cases IA prioritaires",
          body: "Les opportunités au meilleur retour, prêtes à être concrétisées.",
        },
        {
          _key: "roadmap",
          title: "Feuille de route IA concrète",
          body: "Quoi mettre en place, dans quel ordre, et pourquoi.",
        },
        {
          _key: "policy",
          title: "Politique IA & cadre de gouvernance",
          body: "Des lignes directrices pour que tout ce qui suit s'inscrive dans le bon cadre.",
        },
        {
          _key: "quickwin",
          title: "Identification des quick wins",
          body: "Des opportunités immédiatement actionnables, que votre équipe peut lancer dès le premier jour.",
        },
        {
          _key: "agents",
          title: "Concepts d'agents IA",
          body: "Là où des assistants IA sur mesure vous apporteront le plus de valeur.",
        },
      ],
    },
    industries: {
      header: {
        eyebrow: "Nos secteurs",
        heading: "Là où Start AI\ncrée de la valeur.",
        body: "Start AI s'appuie sur une expérience multisectorielle. Nous ne partons pas des tendances IA génériques, mais de la réalité opérationnelle de votre organisation : là où le temps se perd, où la qualité est sous pression et où les équipes ont besoin de meilleurs outils pour grandir.",
      },
      industries: [
        {
          _key: "logistics",
          label: "Logistique & Transport",
          body: "Les équipes transport et logistique travaillent souvent sous forte pression, et la croissance révèle vite les goulots d'étranglement dans la planification, le traitement et la communication.",
          bullets: [
            "Identifier les goulots d'étranglement qui freinent la croissance",
            "Explorer l'appui de l'IA pour la planification, le traitement et la communication interne",
            "Réduire les relances manuelles et la coordination répétitive",
            "Gagner en scalabilité sans complexité inutile",
          ],
          clients: ["ODTH", "Katoen Natie"],
        },
        {
          _key: "healthcare",
          label: "Santé",
          body: "Les organisations de santé traitent des informations sensibles, subissent une forte pression administrative et leurs équipes ont besoin d'un accès rapide à une information fiable.",
          bullets: [
            "Identifier les tâches administratives où l'IA peut alléger la charge",
            "Explorer un appui IA sûr pour la documentation et l'accès aux connaissances",
            "Définir des règles d'IA responsable pour les environnements sensibles",
            "Gagner en efficacité en gardant la sécurité et le contrôle des données au centre",
          ],
          clients: ["Zorgi", "Cambio"],
        },
        {
          _key: "finance",
          label: "Finance",
          body: "Les équipes finance évoluent dans des environnements riches en documents, rythmés par le reporting et soumis à la conformité, où précision et contrôle sont essentiels.",
          bullets: [
            "Cartographier les workflows de reporting, de revue et de conformité",
            "Explorer l'appui de l'IA pour l'analyse documentaire et l'exploitation des connaissances internes",
            "Identifier où accélérer le travail d'expertise répétitif",
            "Définir une gouvernance pour une adoption de l'IA sûre et responsable",
          ],
          clients: ["PwC", "Xerius"],
        },
        {
          _key: "legal",
          label: "Juridique",
          body: "Les équipes juridiques perdent un temps précieux en recherches, rédactions, relectures et workflows documentaires répétitifs, alors que le jugement humain doit rester central.",
          bullets: [
            "Identifier les recherches et tâches documentaires répétitives",
            "Explorer l'appui de l'IA pour la synthèse, la rédaction et la relecture",
            "Fixer des limites claires pour un usage responsable de l'IA",
            "Libérer les experts pour un travail plus stratégique et à plus forte valeur",
          ],
          clients: ["Eubelius", "Monard Law"],
        },
        {
          _key: "manufacturing",
          label: "Industrie",
          body: "Les environnements industriels reposent souvent sur le savoir-faire process, les contrôles manuels, les flux de reporting et les décisions opérationnelles entre équipes.",
          bullets: [
            "Identifier les goulots d'étranglement qualité, reporting et process",
            "Explorer l'appui de l'IA pour la documentation et le partage du savoir opérationnel",
            "Réduire les contrôles manuels et le reporting répétitif",
            "Prioriser les opportunités IA selon leur impact et leur faisabilité",
          ],
          clients: ["Buildwise", "Engie"],
        },
        {
          _key: "public",
          label: "Secteur public",
          body: "Les organisations publiques peuvent utiliser l'IA pour améliorer leur efficacité interne et le service rendu, tout en préservant transparence, gouvernance et confiance du public.",
          bullets: [
            "Identifier les goulots d'étranglement administratifs et dans le service aux citoyens",
            "Explorer l'appui de l'IA pour l'accès aux connaissances internes et les flux documentaires",
            "Définir des règles d'usage responsable et des principes de gouvernance",
            "Prioriser les opportunités IA à faible risque et à forte valeur pour le public",
          ],
          clients: ["Stad Gent", "VLAIO"],
        },
        {
          _key: "all",
          label: "Tous secteurs",
          body: "Les opportunités de l'IA ne se limitent pas à un secteur. Partout où les équipes font face à du travail répétitif, un savoir éparpillé, des processus lents ou une information complexe, Start AI aide à révéler de la valeur.",
          bullets: [
            "Découvrir où l'IA peut créer un impact mesurable",
            "Valider les opportunités avant d'investir dans la mise en œuvre",
            "Choisir la bonne plateforme et la bonne approche de gouvernance",
            "Construire une feuille de route adaptée à votre organisation",
          ],
          clients: ["Luminus", "Wonka"],
        },
      ],
    },
    whyNow: WHY_NOW,
    promo: {
      eyebrow: "VLAIO KMO-portefeuille",
      heading: PROMO_HEADING,
      body: PROMO_BODY,
      variant: "darkImage",
      backgroundImage: null,
      showCta: true,
      ctaHref: "/services/start-ai-subsidized-flanders",
      ctaLabel: "En savoir plus sur la subvention",
      fallbackBackground: { src: "/images/how-to-start/how-to-start-bg.avif", alt: "" },
    },
    testimonials: TESTIMONIALS_SECTION,
    contact: {
      header: TALK_TO_US_HEADER,
      portrait: null,
      personName: "Jordy Callens",
      personRole: "Partner, Wonka",
      fallbackPortrait: { src: "/images/start-ai/jordy.jpg", alt: "Jordy Callens" },
    },
    faq: {
      header: FAQ_HEADER,
      items: [
        {
          _key: "who",
          question: "À qui s'adresse Start AI ?",
          answer:
            "Aux PME et scale-ups belges qui veulent passer des expérimentations IA à une stratégie claire, à l'échelle de l'entreprise, en quelques semaines.",
        },
        {
          _key: "cost",
          question: "Combien cela coûte-t-il ?",
          answer:
            "Les programmes démarrent à 15 000 €. Les PME flamandes peuvent récupérer jusqu'à 70 % via le KMO-portefeuille de VLAIO.",
        },
        {
          _key: "time",
          question: "Combien de temps cela nous demande-t-il ?",
          answer:
            "Environ une demi-journée par semaine pour 2 à 3 personnes clés. Nous faisons le gros du travail entre les sessions.",
        },
        {
          _key: "deliverables",
          question: "Qu'obtenons-nous à la fin ?",
          answer:
            "Une feuille de route IA priorisée, un plan d'exécution à 90 jours et une présentation pour la direction, prête à être partagée.",
        },
        {
          _key: "start",
          question: "Quand pouvons-nous commencer ?",
          answer: "La plupart des équipes démarrent dans les 2 semaines suivant le premier appel.",
        },
      ],
    },
    seo: {
      metaTitle: "Start AI | Stratégie IA et feuille de route pour entreprise",
      metaDescription:
        "Un programme de 6 semaines pour rendre votre PME AI-native : identifiez les bonnes opportunités IA, bâtissez votre stratégie, obtenez des résultats vite.",
      ogImage: null,
    },
  },

  /* --------------------------- Wonka Build -------------------------- */
  wonkaBuild: {
    hero: {
      eyebrow: "Wonka Build",
      title: "Une IA sur mesure. Conçue et livrée par notre équipe.",
      subtitle:
        "Quand l'IA dont vous avez besoin n'existe pas sur étagère, nous la construisons, pensée autour de votre activité et mise en production.",
      secondaryText: null,
      theme: "dark",
      backgroundImage: null,
      heroImage: null,
      secondaryLink: null,
      fallbackBackground: { src: "/images/wonka-build/hero-bg.png", alt: "" },
      fallbackHero: null,
    },
    logoStrip: PROOF_LOGO_STRIP,
    phases: {
      header: {
        eyebrow: "Comment ça marche",
        heading: "De votre processus\nà la production.",
        body: "Une mission Build se déroule en quatre phases connectées. Cadrée comme un projet d'ingénierie, pas comme un atelier. Livrée dans vos opérations, pas dans un slide deck.",
      },
      items: [
        {
          _key: "map",
          number: "01",
          title: "Cartographier",
          subtitle: "Partir de vos opérations, pas d'un modèle",
          body: "Nous nous immergeons dans vos opérations et cartographions le fonctionnement actuel du travail, puis définissons précisément quoi construire et pourquoi cela mérite sa place.",
        },
        {
          _key: "connect",
          number: "02",
          title: "Connecter",
          subtitle: "S'appuyer sur les systèmes que vous utilisez déjà",
          body: "Nous nous connectons aux systèmes que vous utilisez déjà : e-mail, ERP, CRM, documents, bases de données. La fondation sur laquelle repose la solution.",
        },
        {
          _key: "build-ship",
          number: "03",
          title: "Construire & livrer",
          subtitle: "De la production, pas un pilote en bac à sable",
          body: "Nous développons vos agents et applications et les mettons en production. De vrais workflows, de vrais cas limites, gérés de bout en bout. Pas un pilote en bac à sable.",
        },
        {
          _key: "tune-handover",
          number: "04",
          title: "Ajuster & transmettre",
          subtitle: "L'autonomie fait partie du livrable",
          body: "Nous restons après la mise en production pour stabiliser, ajuster et former, et faire monter en compétence une personne de votre équipe qui en prendra la responsabilité. Vous ne dépendez jamais de nous pour le faire tourner.",
        },
      ],
    },
    deliverables: {
      heading: "Un système qui tourne.",
      items: [
        {
          _key: "applications",
          title: "Applications IA sur mesure",
          body: "Construites autour de vos données et de votre équipe, pas d'un modèle générique.",
        },
        {
          _key: "agents",
          title: "Agents IA prêts pour la production",
          body: "Actifs dans vos opérations, ils traitent du vrai travail de bout en bout.",
        },
        {
          _key: "integrations",
          title: "Intégrations profondes",
          body: "Connectées aux outils, données et infrastructures que vous utilisez déjà.",
        },
        {
          _key: "owner",
          title: "Un responsable dans votre équipe",
          body: "Nous formons une personne en interne jusqu'à ce qu'elle puisse l'exploiter et le faire évoluer.",
        },
        {
          _key: "governance",
          title: "Gouvernance intégrée",
          body: "Garde-fous, contrôle des accès et politique IA adaptés à votre organisation.",
        },
        {
          _key: "hypercare",
          title: "Hypercare après le lancement",
          body: "Nous restons mobilisés après la mise en production pour stabiliser et affiner.",
        },
      ],
    },
    industries: {
      header: {
        eyebrow: "Ce que nous construisons",
        heading: "De votre processus le plus complexe\nà la production.",
        body: "Chaque mission Wonka Build est cadrée selon votre activité. Voici le type de systèmes que nous livrons habituellement : agents, applications et l'infrastructure qui leur permet de traiter du vrai travail.",
      },
      industries: [
        {
          _key: "applications",
          label: "Applications internes sur mesure",
          body: "Tableaux de bord, portails et outils construits autour de vos données, pour offrir à votre équipe visibilité et contrôle en temps réel, au même endroit.",
          bullets: ["Applications", "Chats IA"],
          clients: [],
        },
      ],
    },
    whyNow: WHY_NOW,
    promo: {
      eyebrow: "VLAIO KMO-portefeuille",
      heading: PROMO_HEADING,
      body: PROMO_BODY,
      variant: "darkImage",
      backgroundImage: null,
      showCta: true,
      ctaHref: null,
      ctaLabel: null,
      fallbackBackground: { src: "/images/wonka-build/promo-bg.avif", alt: "" },
    },
    testimonials: TESTIMONIALS_SECTION,
    contact: {
      header: TALK_TO_US_HEADER,
      portrait: null,
      personName: "Jordy Callens",
      personRole: "Partner, Wonka",
      fallbackPortrait: { src: "/images/wonka-build/jordy.jpg", alt: "Jordy Callens" },
    },
    faq: {
      header: FAQ_HEADER,
      items: [
        {
          _key: "wonka-chat-vs-build",
          question: "Quelle est la différence entre Wonka Build et WonkaChat ?",
          answer:
            "WonkaChat est notre plateforme : un espace de travail IA sécurisé que toute votre équipe utilise au quotidien. Wonka Build est notre offre d'ingénierie sur mesure : nous concevons et développons des agents, applications et systèmes propres à votre activité, et les mettons en production. Beaucoup de clients utilisent les deux.",
        },
        {
          _key: "agents-or-apps",
          question: "Que pouvez-vous construire : des agents, des applications, ou les deux ?",
          answer:
            "Les deux. Des agents IA ciblés qui gèrent un workflow de bout en bout jusqu'aux applications complètes sur mesure, avec les intégrations et l'infrastructure en dessous.",
        },
        {
          _key: "strategy-first",
          question: "Faut-il d'abord une stratégie IA finalisée ?",
          answer:
            "Non. Si vous savez quel processus vous coûte cher, c'est suffisant pour démarrer. Sinon, Start AI vous apporte d'abord la clarté, et ses business cases deviennent le plan de votre projet.",
        },
        {
          _key: "on-premise",
          question: "Est-ce que cela peut tourner sur nos propres serveurs ?",
          answer:
            "Oui. Wonka Build peut fonctionner entièrement on-premise, dans votre réseau, sans que rien ne sorte de chez vous, ou dans un environnement européen sécurisé.",
        },
        {
          _key: "independence",
          question: "Dépendrons-nous de Wonka pour le faire fonctionner ?",
          answer:
            "Non. Nous formons une personne de votre équipe pour prendre en charge, exploiter et faire évoluer ce que nous construisons. L'autonomie fait partie du livrable.",
        },
        {
          _key: "after-golive",
          question: "Que se passe-t-il après la mise en production ?",
          answer:
            "Nous restons mobilisés pendant une période d'hypercare pour stabiliser, affiner et former votre équipe, avant de vous transmettre l'entière responsabilité.",
        },
      ],
    },
    seo: {
      metaTitle: "Wonka Build · Applications IA sur mesure pour entreprise",
      metaDescription:
        "Nous développons des applications et agents IA sur mesure, intégrés à vos systèmes et utilisés dans votre travail au quotidien.",
      ogImage: null,
    },
  },

  /* ---------------------------- WonkaChat --------------------------- */
  wonkaChat: {
    hero: {
      eyebrow: "WonkaChat",
      title: "L'espace de travail IA que toute votre équipe peut vraiment utiliser.",
      subtitle:
        "WonkaChat se connecte aux outils de votre entreprise, comprend vos workflows et aide votre équipe à avancer, par une simple conversation.",
      secondaryText: null,
      theme: "light",
      backgroundImage: null,
      heroImage: null,
      secondaryLink: null,
      fallbackBackground: null,
      fallbackHero: WONKA_CHAT_HERO_IMAGE,
    },
    logoStrip: {
      logos: null,
      proofLines: [
        "Adopté par des équipes belges de toutes tailles",
        "Stockage des données en Europe",
      ],
      fallbackLogos: [
        { src: "/images/wonka-chat/logos/luminus.svg", alt: "Luminus", width: 120, height: 32 },
        { src: "/images/wonka-chat/logos/pwc.svg", alt: "PwC", width: 120, height: 32 },
        { src: "/images/france/logos/itzu.svg", alt: "Itzu", width: 120, height: 32 },
        { src: "/images/france/logos/engie.svg", alt: "Engie", width: 120, height: 32 },
        { src: "/images/france/logos/buildwise.svg", alt: "Buildwise", width: 120, height: 32 },
        { src: "/images/france/logos/xerius.png", alt: "Xerius", width: 120, height: 32 },
      ],
    },
    problem: {
      header: {
        eyebrow: "Le problème aujourd'hui",
        heading: "Votre IA fonctionne.\nMais pas pour tout le monde.",
        body: "La plupart des outils IA créent de la valeur pour ceux qui savent déjà s'en servir. Les autres continuent à faire le travail répétitif à la main — copier-coller des données, transférer des demandes, vérifier des documents et mettre à jour des systèmes.\n\nWonkaChat change la donne. Il donne à toute votre équipe accès à l'IA, d'une manière simple, pratique et pensée pour le travail quotidien.",
      },
      image: null,
      fallbackImage: {
        src: "/images/wonka-chat/wonka-problem-people.png",
        alt: "Des collaborateurs et les tâches répétitives que WonkaChat supprime",
        width: 1650,
        height: 1920,
      },
    },
    overview: {
      eyebrow: "Qu'est-ce que WonkaChat ?",
      heading: "Un seul espace de travail IA\npour toute votre entreprise.",
      body: "WonkaChat réunit l'IA, les agents, les connaissances de l'entreprise et les connexions à vos outils dans un espace de travail sécurisé. Votre équipe peut poser des questions, obtenir de l'aide et faire avancer le travail — sans devoir devenir experte en IA.",
    },
    features: WONKA_CHAT_FEATURES,
    security: WONKA_CHAT_SECURITY,
    testimonials: TESTIMONIALS_SECTION,
    contact: WONKA_CHAT_CONTACT,
    faq: {
      header: FAQ_HEADER,
      items: [
        {
          _key: "technical",
          question: "WonkaChat est-il réservé aux équipes techniques ?",
          answer:
            "Non. WonkaChat est conçu pour chaque collaborateur. Chacun peut utiliser l'IA via un simple chat, des agents partagés et des workflows guidés.",
        },
        {
          _key: "tools",
          question: "WonkaChat peut-il se connecter à nos outils existants ?",
          answer:
            "Oui. WonkaChat peut se connecter aux outils de l'entreprise comme le CRM, l'ERP, l'e-mail, les documents, les outils de gestion de projet et les bases de données internes.",
        },
        {
          _key: "model",
          question: "Devons-nous choisir un seul modèle d'IA ?",
          answer:
            "Non. WonkaChat est conçu pour être flexible : votre organisation peut travailler avec le modèle d'IA adapté à ses besoins.",
        },
        {
          _key: "access",
          question: "Pouvons-nous contrôler ce à quoi l'IA a accès ?",
          answer:
            "Oui. Vous gérez les accès, les autorisations et les agents disponibles pour chaque utilisateur ou équipe.",
        },
        {
          _key: "approval",
          question: "Les actions peuvent-elles nécessiter une validation humaine ?",
          answer:
            "Oui. WonkaChat prend en charge les workflows human-in-the-loop : les actions importantes peuvent être vérifiées avant d'être exécutées.",
        },
        {
          _key: "replacement",
          question: "WonkaChat remplace-t-il ChatGPT ou Copilot ?",
          answer:
            "WonkaChat est différent. C'est un espace de travail IA d'entreprise, connecté à vos outils, vos agents, vos workflows et votre gouvernance.",
        },
      ],
    },
    seo: {
      metaTitle: "WonkaChat | Espace de travail IA pour toute l'entreprise",
      metaDescription:
        "WonkaChat connecte vos outils, comprend vos besoins et exécute les tâches avec des agents IA. Une IA pour entreprise sécurisée et encadrée, pas un chatbot.",
      ogImage: null,
    },
  },

  /* ------------------------- WonkaChat · Odoo ----------------------- */
  wonkaChatOdoo: {
    hero: {
      eyebrow: "WonkaChat · Odoo",
      title: "Des agents IA qui agissent dans Odoo, pour les équipes IT et ops déjà sur Odoo",
      subtitle:
        "WonkaChat se connecte à Odoo pour que votre équipe puisse interroger les données CRM, ventes, stock et comptabilité — et préparer la prochaine action sans naviguer dans les modules.",
      secondaryText: null,
      theme: "light",
      backgroundImage: null,
      heroImage: null,
      secondaryLink: null,
      fallbackBackground: null,
      fallbackHero: WONKA_CHAT_HERO_IMAGE,
    },
    logoStrip: PROOF_LOGO_STRIP,
    problem: {
      header: {
        eyebrow: "Le problème",
        heading: "Odoo ne devrait-il pas être plus simple que ça ?",
        body: "Les ERP comme Odoo sont conçus pour simplifier les opérations... mais la partie « simple » se perd souvent quelque part entre l'implémentation et l'adoption.",
      },
      largeCards: [
        bentoCard(
          "navigation",
          "La navigation est complexe",
          "Votre responsable d'entrepôt connaît son métier sur le bout des doigts. Mais vérifier les niveaux de stock signifie naviguer vers Inventaire -> Produits -> Stock -> Filtrer par emplacement. Elle sait ce dont elle a besoin. C'est l'interface qui complique tout.",
        ),
        bentoCard(
          "experts",
          "Goulots d'étranglement experts",
          "Seules 2-3 personnes comprennent vraiment Odoo. Tout le monde les interrompt. Une question simple prend 30 minutes et empêche votre responsable IT de se concentrer sur des activités à plus forte valeur.",
        ),
      ],
      smallCards: [
        bentoCard(
          "consultants",
          "Dépendance aux consultants",
          "100-200 €/heure à chaque fois que vous avez besoin d'un workflow personnalisé. Les coûts augmentent plus vite que la valeur obtenue. Et pas parce que vous avez besoin d'une personnalisation complexe, juste pour obtenir des rapports qui devraient être simples.",
        ),
        bentoCard(
          "ai-tools",
          "Trop d'outils IA",
          "Les outils IA génériques créent plus de confusion que de valeur. Des informations sensibles éparpillées dans des endroits que votre direction informatique ne contrôle pas. Et l'IA intégrée d'Odoo est trop simple pour vos workflows.",
        ),
        bentoCard(
          "adoption",
          "Faibles taux d'adoption",
          "Tout le monde s'en tient aux bases apprises en formation. Le reste reste inutilisé, non pas parce que ce n'est pas utile, mais parce que le trouver demande du travail.",
        ),
      ],
    },
    features: WONKA_CHAT_FEATURES,
    workflowSteps: {
      header: {
        eyebrow: "Comment ça marche",
        heading: "De la demande au résultat.\nPas une suggestion.",
        body: null,
      },
      steps: [
        workflowStep(
          "step-1",
          "Dites-le.",
          "Écrivez ce qui doit être fait. Comme vous le feriez à un collègue. « Crée une opportunité dans Odoo. Ajoute ce résumé. Crée un bon de commande. »",
          "step1",
          0,
        ),
        workflowStep(
          "step-2",
          "WonkaChat agit.",
          "WonkaChat récupère les données, voit ce qui doit être fait, et le fait. CRM mis à jour. Notes ajoutées. Commandes enregistrées.",
          "step2",
          1,
        ),
        workflowStep(
          "step-3",
          "Ça devient votre façon de travailler.",
          "Faites-le une fois. Ça tourne à chaque fois. Le travail n'attend plus que quelqu'un le fasse avancer.",
          "step3",
          2,
        ),
      ],
    },
    capabilities: {
      header: {
        eyebrow: null,
        heading: "Faites d'Odoo la colonne vertébrale de votre entreprise",
        body: "Quelques exemples de la façon dont WonkaChat peut booster votre configuration Odoo :",
      },
      items: [
        capabilityItem(
          "reconcile-bank",
          "bank",
          "Rapprocher les comptes bancaires",
          "Surveillance automatique, rappels intelligents et escalade, pour une conformité à 100 % des feuilles de temps sans suivi manuel ni intervention d'un manager.",
        ),
        capabilityItem(
          "sales-quotes",
          "quote",
          "Générer des devis",
          "Capture automatiquement les leads, fait progresser les opportunités, assigne les tâches et signale les affaires qui demandent de l'attention, éliminant complètement le travail CRM manuel.",
        ),
        capabilityItem(
          "ask-odoo",
          "chat",
          "Interroger Odoo",
          "Répond instantanément aux questions, explique les fonctionnalités et vous oriente automatiquement vers le bon workflow, rendant Odoo intuitif pour tout le monde.",
        ),
        capabilityItem(
          "customer-tickets",
          "ticket",
          "Résoudre les tickets clients",
          "Récupère, analyse et priorise automatiquement les tickets support de JIRA et Odoo, en signalant instantanément les informations manquantes et les tendances.",
        ),
        capabilityItem(
          "instant-quotes",
          "document",
          "Créer des devis instantanés",
          "Les demandes de devis entrantes deviennent instantanément des devis complets et chiffrés, avec les bons produits, remises et conditions appliqués automatiquement.",
        ),
        capabilityItem(
          "seo-content",
          "search",
          "Rédiger du contenu SEO",
          "Génère automatiquement des descriptions optimisées pour la recherche, des balises méta et des textes orientés conversion, selon les bonnes pratiques de Google, pour chaque produit.",
        ),
        capabilityItem(
          "new-leads",
          "userPlus",
          "Créer de nouveaux leads",
          "Recherche automatiquement les entreprises, enrichit les contacts et crée des fiches CRM complètes, éliminant la saisie manuelle et le travail de recherche.",
        ),
        capabilityItem(
          "stock-levels",
          "boxes",
          "Surveiller les niveaux de stock",
          "Surveillance, ajustements et alertes automatisés avec contrôles de sécurité intégrés, pour prévenir les erreurs coûteuses avant qu'elles ne se produisent.",
        ),
        capabilityItem(
          "crm-data",
          "database",
          "Mettre à jour les données CRM",
          "Transforme les conversations en documentation CRM structurée, en extrayant les décisions et les actions, et fait progresser automatiquement les opportunités le cas échéant.",
        ),
        capabilityItem(
          "gitlab-tasks",
          "gitBranch",
          "Synchroniser les tâches GitLab",
          "Les commits deviennent instantanément des mises à jour de projet, reliant le travail de développement aux tâches sans suivi manuel ni reporting de statut.",
        ),
        capabilityItem(
          "financial-reconciliation",
          "scale",
          "Automatiser le rapprochement financier",
          "Identifie automatiquement les transactions correspondantes, signale les exceptions et organise le rapprochement quotidien ; les comptables n'ont plus qu'à valider les correspondances.",
        ),
      ],
    },
    contact: WONKA_CHAT_CONTACT,
    seo: {
      metaTitle: "WonkaChat pour Odoo | Agents IA qui agissent dans l'ERP",
      metaDescription:
        "Connectez WonkaChat à Odoo pour interroger CRM, stock, comptabilité et ventes en langage naturel. IA privée pour Odoo SaaS et auto-hébergé.",
      ogImage: null,
    },
  },

  /* ----------------------------- Contact ---------------------------- */
  contact: {
    general: {
      header: {
        eyebrow: "Contact",
        heading: "Contactez-nous",
        body: "Des questions sur l'IA pour votre organisation ? Contactez-nous directement — nous vous répondrons dans les plus brefs délais.",
      },
      details: [
        { _key: "email", label: "E-mail", value: "hello@wonka.ai", href: "mailto:hello@wonka.ai" },
        {
          _key: "office",
          label: "Bureau",
          value: "(re)space Airport\nDe Kleetlaan 2, 1831 Machelen, Belgique",
          href:
            "https://www.google.com/maps/search/?api=1&query=(re)space+Airport,+De+Kleetlaan+2,+1831+Machelen",
        },
      ],
    },
    team: {
      header: {
        eyebrow: "Équipe",
        heading: "Parlez directement à quelqu'un",
        body: null,
      },
      people: [
        {
          _key: "jordy",
          portrait: null,
          name: "Jordy Callens",
          role: "Partner",
          email: "jordy@wonka.ai",
          fallbackPortrait: { src: "/images/wonka-build/jordy.jpg", alt: "Jordy Callens" },
        },
      ],
    },
    seo: {
      metaTitle: "Contact | Wonka",
      metaDescription:
        "Contactez Wonka : e-mail et interlocuteurs directs pour toutes vos questions sur l'IA en entreprise.",
      ogImage: null,
    },
  },

  /* ---------------------------- Use cases --------------------------- */
  useCases: {
    eyebrow: "Cas d'usage",
    heading: "Le travail qui attendait n'attend plus. Dans toutes les équipes.",
    industries: [
      {
        _key: "sales",
        label: "Ventes",
        workflows: [
          {
            _key: "sales-w0",
            title: "Suivi des leads",
            description: "Un lead arrive. Il est enregistré et traité avant de refroidir.",
            bullets: [
              "Capté depuis un formulaire ou un e-mail",
              "Opportunité créée dans le CRM",
              "Relance envoyée avec la bonne info ou le lien de rendez-vous",
            ],
          },
          {
            _key: "sales-w1",
            title: "Traitement des commandes",
            description: "Une commande arrive. Elle est saisie et confirmée sans ressaisie.",
            bullets: [
              "Détails extraits de l'e-mail ou de la pièce jointe",
              "Commande créée dans l'ERP, planning mis à jour",
              "Équipe prévenue, confirmation envoyée",
            ],
          },
          {
            _key: "sales-w2",
            title: "Tableau de bord commercial",
            description:
              "Une application sur mesure qui donne à l'équipe commerciale une vue en temps réel du pipeline, de l'activité des comptes et des prochaines actions, sans jongler entre cinq outils.",
            bullets: [
              "Construit autour de votre CRM et de vos sources de données",
              "Met en avant les comptes et signaux prioritaires",
              "Accessible à toute l'équipe, pas seulement aux analystes",
            ],
          },
        ],
      },
      {
        _key: "ops",
        label: "Opérations",
        workflows: [
          {
            _key: "ops-w0",
            title: "Réception des commandes",
            description: "Les commandes entrantes sont analysées et routées sans saisie manuelle.",
            bullets: [
              "Extraites d'un e-mail ou d'un PDF",
              "Validées selon vos règles",
              "Poussées automatiquement dans l'ERP",
            ],
          },
          {
            _key: "ops-w1",
            title: "Mises à jour du planning",
            description: "Les changements sont répercutés dans tous les systèmes dès qu'ils ont lieu.",
            bullets: [
              "Statuts synchronisés entre les outils",
              "Parties prenantes prévenues",
              "Exceptions signalées pour vérification",
            ],
          },
          {
            _key: "ops-w2",
            title: "Tableau de bord des opérations",
            description:
              "Une vue unique et en temps réel du débit, des blocages et des prochaines actions dans toutes les équipes.",
            bullets: [
              "Construit sur vos données opérationnelles",
              "Fait ressortir les goulots d'étranglement en temps réel",
              "Partagé entre les opérations et la direction",
            ],
          },
        ],
      },
      {
        _key: "hr",
        label: "RH",
        workflows: [
          {
            _key: "hr-w0",
            title: "Réponses sur les politiques internes",
            description:
              "Vos collaborateurs obtiennent des réponses exactes en quelques secondes, tirées de votre règlement interne.",
            bullets: [
              "Basé sur vos documents RH internes",
              "Les réponses citent leur source",
              "Les cas complexes sont transmis aux RH",
            ],
          },
          {
            _key: "hr-w1",
            title: "Assistant d'onboarding",
            description:
              "Les nouveaux collaborateurs sont guidés pendant leurs premières semaines, sans accompagnement manuel.",
            bullets: [
              "Checklist personnalisée par fonction",
              "Rappels pour les documents et les formations",
              "RH informées de l'avancement",
            ],
          },
          {
            _key: "hr-w2",
            title: "Tableau de bord RH",
            description:
              "Une vue sur mesure qui donne aux RH une visibilité en temps réel sur les effectifs, les demandes et les échéances clés.",
            bullets: [
              "Construit autour de vos données SIRH",
              "Met en avant les évaluations et contrats à venir",
              "Accessible aux managers et aux RH",
            ],
          },
        ],
      },
      {
        _key: "support",
        label: "Support",
        workflows: [
          {
            _key: "support-w0",
            title: "Tri des tickets",
            description: "Chaque demande entrante est classée et routée en quelques secondes.",
            bullets: [
              "Captée par e-mail, chat ou formulaire",
              "Catégorisée et priorisée",
              "Attribuée à la bonne équipe",
            ],
          },
          {
            _key: "support-w1",
            title: "Rédaction des réponses",
            description: "Vos agents partent d'un brouillon, pas d'une page blanche.",
            bullets: [
              "Réponses tirées de votre base de connaissances",
              "Respect du ton et des règles",
              "Vérifiées avant envoi",
            ],
          },
          {
            _key: "support-w2",
            title: "Tableau de bord support",
            description:
              "Une vue en temps réel des volumes, de la satisfaction et des problèmes récurrents sur tous les canaux.",
            bullets: [
              "Construit sur vos données de tickets",
              "Fait ressortir les thèmes et tendances principaux",
              "Partagé entre le support et le produit",
            ],
          },
        ],
      },
      {
        _key: "finance",
        label: "Finance",
        workflows: [
          {
            _key: "finance-w0",
            title: "Traitement des factures",
            description: "Les factures entrantes sont captées, validées et prêtes à être approuvées.",
            bullets: [
              "Extraites d'un e-mail ou d'un PDF",
              "Rapprochées des commandes",
              "Envoyées automatiquement en approbation",
            ],
          },
          {
            _key: "finance-w1",
            title: "Notes de frais",
            description: "Les notes de frais sont compilées et vérifiées sans courir après les justificatifs.",
            bullets: [
              "Justificatifs analysés et catégorisés",
              "Contrôles de conformité appliqués",
              "Éléments suspects signalés pour vérification",
            ],
          },
          {
            _key: "finance-w2",
            title: "Tableau de bord financier",
            description:
              "Une vue sur mesure qui donne à la finance une visibilité en temps réel sur la trésorerie, les créances et les KPI clés.",
            bullets: [
              "Construit autour de vos données comptables",
              "Met en avant les retards et les risques",
              "Accessible à la finance et à la direction",
            ],
          },
        ],
      },
    ],
  },

  security: SECURITY,
  wonkaChatSecurity: WONKA_CHAT_SECURITY,
  testimonialsHeader: TESTIMONIALS_HEADER,

  aiChatCapabilities: getAiChatCapabilityClusters("fr"),
};
