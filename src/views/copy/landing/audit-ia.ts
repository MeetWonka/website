import type { Locale } from "@/i18n/config";
import type { LandingCopy } from "@/views/copy/landing-types";

/**
 * France landing page: /fr/audit-ia.
 * Angle: Start AI as a structured AI audit (maturity assessment, opportunity
 * analysis with ROI, priority business cases, roadmap, 90-day plan).
 * Sister page /fr/acculturation-ia covers people & adoption — keep them distinct.
 * French only. Belgian KMO subsidy does not apply in France: never mention it.
 */
export const AUDIT_IA_COPY: Partial<Record<Locale, LandingCopy>> = {
  fr: {
    meetingContext: "default",
    seo: {
      title: "Audit IA : maturité, priorités et feuille de route | Wonka",
      description:
        "Audit IA pour PME et ETI : maturité IA, cas d'usage priorisés avec ROI, feuille de route et plan à 90 jours. Commencez par le diagnostic gratuit.",
    },
    breadcrumb: "Audit IA",
    schema: {
      serviceName: "Audit IA Start AI",
      serviceType: "Audit de maturité IA et feuille de route IA pour entreprise",
    },
    hero: {
      eyebrow: "Audit IA · PME et ETI en France",
      title: "Un audit IA qui débouche sur un plan, pas sur un rapport.",
      subtitle:
        "Tout le monde vous dit de « faire de l'IA ». Un audit IA vous dit où, dans quel ordre et pour quel retour. Avec Start AI, Wonka évalue votre maturité IA, analyse vos processus, priorise les cas d'usage et vous remet une feuille de route avec un plan d'exécution à 90 jours.",
      primaryCta: { label: "Faire le diagnostic gratuit", href: "/france/diagnostic" },
      secondaryCta: { label: "Parler à l'équipe France", href: "meeting" },
      facts: [
        ["Diagnostic gratuit", "5 questions, 2 minutes"],
        ["Audit complet", "Start AI, 6 semaines"],
        ["Expérience", "+150 Start AI réalisés"],
        ["Sécurité", "ISO 27001 · RGPD · NIS 2"],
      ],
    },
    answer: {
      heading: "Qu'est-ce qu'un audit IA ?",
      paragraphs: [
        "Un audit IA est une évaluation structurée de la place que l'intelligence artificielle peut prendre dans votre entreprise. Il mesure votre maturité IA, cartographie vos processus, identifie les cas d'usage réalistes, estime leur retour sur investissement et les classe par priorité dans une feuille de route exécutable.",
        "Un bon audit intelligence artificielle ne part pas des outils. Il part de la façon dont vos équipes travaillent aujourd'hui : où le temps se perd, quelles tâches se répètent, où l'information est éparpillée entre la messagerie, SharePoint, l'ERP et le CRM. Il regarde aussi ce qui existe déjà : des ChatGPT personnels, un Copilot peu utilisé, ou rien de structuré. C'est ce point de départ qui détermine la suite, pas la dernière tendance. Un bon audit dit aussi où l'IA ne ferait pas la différence.",
        "Chez Wonka, l'audit IA s'appelle Start AI. En six semaines, nos experts passent de l'alignement de la direction à l'analyse de vos flux de travail, puis évaluent chaque opportunité selon son impact, sa faisabilité, votre niveau de maturité et sa pertinence stratégique. Vous repartez avec une évaluation de maturité IA, des business cases prioritaires, une feuille de route IA, une politique IA et un plan d'exécution à 90 jours.",
        "Vous n'êtes pas prêt à lancer un audit complet ? Commencez par le diagnostic IA gratuit : cinq questions, deux minutes, et vous voyez trois agents adaptés à vos outils avant de parler à quelqu'un. C'est une première lecture, pas un audit. Elle sert à savoir si un Start AI a du sens pour vous.",
      ],
    },
    comparison: {
      eyebrow: "Diagnostic ou audit",
      heading: "Diagnostic IA gratuit ou audit IA complet : quelle différence ?",
      columns: ["", "Diagnostic IA gratuit", "Audit IA Start AI"],
      rows: [
        ["Durée", "2 minutes, en ligne", "6 semaines, avec nos experts"],
        ["Ce que vous donnez", "5 réponses : secteur, outils, données, frein, rôle", "Environ une demi-journée par semaine pour 2 à 3 personnes clés"],
        ["Ce que vous obtenez", "3 exemples d'agents adaptés à vos outils", "Maturité IA, business cases priorisés, feuille de route, politique IA, plan à 90 jours"],
        ["Analyse de vos processus", "Non", "Oui : entretiens approfondis et analyse des workflows"],
        ["Coût", "Gratuit", "À partir de 15 000 €"],
      ],
      footnote: "Le diagnostic est un point de départ. Il ne remplace pas l'analyse de vos processus réels.",
    },
    benefits: {
      eyebrow: "Pourquoi un audit",
      heading: "Pourquoi faire un audit IA avant d'investir",
      items: [
        {
          title: "Des priorités plutôt qu'une liste de souhaits",
          body: "Chaque direction a ses idées d'IA. L'audit les passe toutes au même filtre (impact, faisabilité, maturité, pertinence stratégique) pour que vous investissiez d'abord là où le retour est le plus clair.",
        },
        {
          title: "Un ROI estimé avant de construire",
          body: "Les business cases prioritaires chiffrent ce que chaque cas d'usage peut rapporter. Vous arrivez en comité de direction avec des arguments, pas avec une intuition.",
        },
        {
          title: "Une photo honnête de votre maturité IA",
          body: "L'évaluation de maturité IA montre où vous en êtes : processus, données, outils et disposition des équipes à travailler avec l'IA. C'est la base de toute décision sérieuse.",
        },
        {
          title: "Des quick wins dès le premier jour",
          body: "L'audit ne se contente pas du long terme. Il identifie des opportunités immédiatement actionnables que votre équipe peut lancer pendant que la feuille de route se met en place.",
        },
        {
          title: "Un cadre avant les usages",
          body: "Politique IA et cadre de gouvernance font partie des livrables. Le RSSI et le DSI savent ce qui est autorisé, avec quelles données et dans quels outils, avant que l'IA ne se diffuse.",
        },
        {
          title: "La même équipe pour exécuter",
          body: "Les experts qui mènent l'audit peuvent ensuite construire les agents et déployer l'espace de travail IA. Les business cases deviennent directement le plan de votre projet.",
        },
      ],
    },
    useCases: {
      eyebrow: "Les livrables",
      heading: "Ce que contient un audit de maturité IA Start AI",
      items: [
        {
          title: "Une évaluation de maturité IA",
          body: "Une vision claire de la position actuelle de votre organisation : usages existants, données, outils, gouvernance et capacité des équipes à adopter l'IA.",
        },
        {
          title: "Une analyse des opportunités avec ROI",
          body: "Les cas d'usage repérés dans vos processus, évalués selon leur impact et leur faisabilité, avec une estimation du retour pour chacun.",
          link: { label: "L'IA pour entreprise, par où commencer", href: "/fr/ia-pour-entreprise" },
        },
        {
          title: "Des business cases IA prioritaires",
          body: "Les opportunités au meilleur retour, prêtes à être concrétisées, et des concepts d'agents IA là où un assistant sur mesure apportera le plus de valeur.",
          link: { label: "Ce qu'un agent IA peut faire", href: "/fr/agent-ia-entreprise" },
        },
        {
          title: "Une feuille de route et un plan à 90 jours",
          body: "Quoi mettre en place, dans quel ordre et pourquoi, avec un plan d'exécution pour les 90 premiers jours et une présentation prête pour la direction.",
          link: { label: "Découvrir Start AI", href: "/fr/start-ai" },
        },
        {
          title: "Une politique IA et un cadre de gouvernance",
          body: "Des lignes directrices pour que tout ce qui suit s'inscrive dans le bon cadre : données autorisées, outils validés, validation humaine sur les actions importantes.",
          link: { label: "Rédiger une charte IA d'entreprise", href: "/fr/charte-ia-entreprise" },
        },
      ],
    },
    process: {
      eyebrow: "Déroulement",
      heading: "Comment se déroule un diagnostic IA entreprise avec Wonka",
      steps: [
        {
          title: "Diagnostic gratuit ou appel de 30 minutes",
          body: "Vous faites le diagnostic en ligne ou vous parlez directement à l'équipe France. Pas de slides, pas de pitch : on regarde si un audit complet a du sens pour vous.",
        },
        {
          title: "Préparer",
          body: "Nous définissons le contexte stratégique, clarifions les attentes et impliquons les bonnes personnes. La plupart des équipes démarrent dans les 2 semaines suivant le premier appel.",
        },
        {
          title: "Comprendre et aligner",
          body: "Une demi-journée de lancement met la direction et les équipes clés sur la même longueur d'onde, avec un atelier de prompting. Elle est suivie d'entretiens approfondis sur vos processus.",
        },
        {
          title: "Analyser et valider",
          body: "Nous analysons vos workflows et goulots d'étranglement, puis évaluons chaque opportunité selon son impact, sa faisabilité, votre maturité et sa pertinence stratégique.",
        },
        {
          title: "Activer et livrer",
          body: "Vous recevez la feuille de route priorisée, le plan à 90 jours, la politique IA et la présentation pour la direction. Ensuite, vous avancez seul ou avec la même équipe.",
        },
      ],
    },
    faq: {
      heading: "Audit IA : questions fréquentes",
      items: [
        {
          question: "Combien coûte un audit IA ?",
          answer:
            "Chez Wonka, l'audit IA complet prend la forme du programme Start AI, qui démarre à 15 000 €. Le périmètre dépend de la taille de votre organisation et du nombre de processus analysés. Le diagnostic IA en ligne, lui, est gratuit : cinq questions, deux minutes, et un premier résultat avant tout échange commercial.",
        },
        {
          question: "Quelle est la différence entre un diagnostic IA et un audit IA ?",
          answer:
            "Le diagnostic IA gratuit est une première lecture en deux minutes : à partir de votre secteur, vos outils, vos données, votre frein principal et votre rôle, il propose trois agents adaptés. L'audit IA analyse vos processus réels avec vos équipes pendant six semaines et livre une feuille de route priorisée, des business cases et un plan à 90 jours.",
        },
        {
          question: "Combien de temps dure un audit de maturité IA ?",
          answer:
            "Le programme Start AI dure six semaines. De votre côté, comptez environ une demi-journée par semaine pour 2 à 3 personnes clés ; nous faisons le gros du travail entre les sessions. La plupart des équipes démarrent dans les 2 semaines suivant le premier appel.",
        },
        {
          question: "Comment mesurer la maturité IA de son entreprise ?",
          answer:
            "On regarde quatre choses : les usages actuels (ChatGPT personnel, Copilot, outil d'entreprise ou rien de structuré), l'état et l'emplacement des données, les processus où le temps se perd et la capacité des équipes à adopter l'IA. L'évaluation de maturité IA de Start AI rassemble ces éléments en une vision claire de votre point de départ.",
        },
        {
          question: "Que livre un audit intelligence artificielle à la fin ?",
          answer:
            "Une évaluation de maturité IA, des business cases IA prioritaires, une feuille de route concrète, une politique IA et un cadre de gouvernance, des quick wins et des concepts d'agents IA. Vous recevez aussi un plan d'exécution à 90 jours et une présentation pour la direction, prête à être partagée.",
        },
        {
          question: "Existe-t-il des diagnostics IA publics, comme le Diag Data IA de Bpifrance ?",
          answer:
            "Oui, certaines entreprises commencent par un diagnostic proposé par un organisme public. Wonka n'est pas prestataire de ces dispositifs. Si vous en avez déjà réalisé un, il constitue un bon point de départ : l'audit Start AI peut s'appuyer sur ses conclusions pour aller jusqu'aux business cases et au plan d'exécution.",
        },
        {
          question: "Faut-il un audit IA avant de déployer ChatGPT ou un agent IA ?",
          answer:
            "Pas toujours. Si vous savez déjà quel processus vous coûte du temps, vous pouvez démarrer directement un projet sur mesure. L'audit devient utile quand les idées partent dans tous les sens, que le RSSI bloque faute de cadre, ou que la direction veut prioriser avant d'investir.",
        },
        {
          question: "Que se passe-t-il après l'audit IA ?",
          answer:
            "Vous choisissez. Vous pouvez exécuter la feuille de route en interne, ou confier à la même équipe la construction des premiers agents avec Wonka Build et le déploiement de WonkaChat, l'espace de travail IA sécurisé, pour toute l'organisation. Pour embarquer les équipes, voyez aussi notre approche de l'acculturation IA.",
        },
      ],
    },
    related: {
      heading: "Pour aller plus loin",
      links: [
        { label: "Diagnostic IA gratuit", href: "/france/diagnostic", description: "5 questions, 2 minutes, 3 agents adaptés à vos outils." },
        { label: "Programme Start AI", href: "/fr/start-ai", description: "Stratégie IA et feuille de route en 6 semaines." },
        { label: "Acculturation IA", href: "/fr/acculturation-ia", description: "Embarquer la direction et les équipes dans l'adoption de l'IA." },
        { label: "Charte IA d'entreprise", href: "/fr/charte-ia-entreprise", description: "Les règles communes pour utiliser l'IA en sécurité." },
        { label: "L'IA pour entreprise", href: "/fr/ia-pour-entreprise", description: "Ce que l'IA peut faire pour votre entreprise." },
        { label: "Agence IA", href: "/fr/agence-ia", description: "De la stratégie IA aux agents en production." },
        { label: "Wonka Build", href: "/fr/wonka-build", description: "Construire les cas d'usage prioritaires de votre feuille de route." },
        { label: "Wonka AI en France", href: "/france", description: "Notre offre pour les entreprises françaises." },
        { label: "Shadow AI : définition et risques", href: "/fr/shadow-ai", description: "Reprendre la main sur les usages d'IA non encadrés, sans les interdire." },
        { label: "Comparatif IA entreprise", href: "/fr/comparatif-ia-entreprise", description: "ChatGPT, Claude, Gemini, Copilot et Le Chat comparés pour les PME et ETI." },
      ],
    },
    cta: {
      heading: "Par où commencer votre audit IA ?",
      body: "Faites le diagnostic gratuit en deux minutes, ou réservez 30 minutes avec l'équipe France pour voir si un audit Start AI a du sens pour votre organisation.",
    },
  },
};
