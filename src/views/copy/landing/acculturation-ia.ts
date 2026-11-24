import type { Locale } from "@/i18n/config";
import type { LandingCopy } from "@/views/copy/landing-types";

/**
 * France landing page: /fr/acculturation-ia.
 * Angle: AI adoption fails on people, not tech. Start AI "Comprendre & inspirer"
 * (half-day kick-off + prompting workshop), shared rules / AI policy, then
 * everyone on a safe AI workspace (WonkaChat). Mentions AI Act art. 4 (AI literacy).
 * Sister page /fr/audit-ia covers assessment & prioritisation — keep them distinct.
 * No certified training claims (no "formation certifiante", no Qualiopi).
 */
export const ACCULTURATION_IA_COPY: Partial<Record<Locale, LandingCopy>> = {
  fr: {
    meetingContext: "default",
    seo: {
      title: "Acculturation IA : embarquer direction et équipes | Wonka",
      description:
        "Acculturation IA pour dirigeants et équipes : atelier IA, règles communes et un espace de travail IA sécurisé pour tous. Parlez à l'équipe France.",
    },
    breadcrumb: "Acculturation IA",
    schema: {
      serviceName: "Acculturation IA Start AI",
      serviceType: "Acculturation et adoption de l'IA en entreprise",
    },
    hero: {
      eyebrow: "Acculturation IA · PME et ETI en France",
      title: "Acculturation IA : embarquer toute l'équipe, pas seulement les 12 qui savent.",
      subtitle:
        "La plupart des projets IA échouent sur l'adoption, pas sur la technologie. Wonka aligne la direction, forme les équipes à bien utiliser l'IA lors d'un atelier concret, pose des règles communes, puis met tout le monde sur un espace de travail IA sécurisé.",
      primaryCta: { label: "Parler à l'équipe France", href: "meeting" },
      secondaryCta: { label: "Faire le diagnostic gratuit", href: "/france/diagnostic" },
      facts: [
        ["Lancement", "Demi-journée avec atelier de prompting"],
        ["Règles communes", "Politique IA et gouvernance"],
        ["Au quotidien", "WonkaChat, espace de travail IA sécurisé"],
        ["Preuve", "Itzu : 100 % des salariés sur WonkaChat"],
      ],
    },
    answer: {
      heading: "Qu'est-ce que l'acculturation IA en entreprise ?",
      paragraphs: [
        "L'acculturation IA est la démarche qui donne à chaque collaborateur, de la direction aux équipes opérationnelles, une compréhension commune de l'intelligence artificielle : ce qu'elle sait faire, ce qu'elle ne doit pas faire et comment l'utiliser dans son travail. Son objectif n'est pas la curiosité, mais l'adoption réelle.",
        "Dans beaucoup d'organisations, la valeur de l'IA reste entre les mains d'un petit groupe de pionniers. Ils ont leur ChatGPT personnel, ils trouvent de meilleures façons de travailler, mais celles-ci se diffusent rarement. Pendant ce temps, le reste du travail avance encore à la main, et le RSSI n'a aucune visibilité sur ce qui sort de l'entreprise. Une sensibilisation IA ponctuelle ne change pas cela : il faut un cadre et un outil que tout le monde utilise.",
        "C'est aussi devenu une obligation. Le règlement européen sur l'IA (AI Act), entré en vigueur le 1er août 2024, impose depuis le 2 février 2025 à son article 4 que les fournisseurs et les déployeurs de systèmes d'IA prennent des mesures pour garantir un niveau suffisant de maîtrise de l'IA chez leur personnel. Une entreprise qui utilise l'IA doit donc s'assurer que ses équipes savent s'en servir.",
        "Chez Wonka, l'acculturation fait partie de Start AI, dans la phase « Comprendre & Inspirer » : une demi-journée de lancement avec un atelier de prompting sur des outils comme ChatGPT et Claude, des règles communes via une politique IA, puis un espace de travail IA sécurisé, WonkaChat, pour que l'usage continue après l'atelier. Le but : une IA utilisée par toute l'équipe, pas seulement par ceux qui savent déjà s'en servir.",
      ],
    },
    benefits: {
      eyebrow: "Pourquoi l'acculturation",
      heading: "Pourquoi l'adoption de l'IA se joue sur les personnes",
      items: [
        {
          title: "L'IA ne doit pas rester aux pionniers",
          body: "L'acculturation transforme des expériences individuelles en progrès pour toute l'organisation. Les bonnes pratiques des early adopters deviennent celles de toutes les équipes.",
        },
        {
          title: "La direction donne le cap",
          body: "Quand la direction n'est pas alignée, chaque équipe avance dans son coin. Nous mettons dirigeants et équipes clés sur la même longueur d'onde sur ce que l'IA doit apporter à votre organisation.",
        },
        {
          title: "Des règles communes plutôt que du shadow IT",
          body: "Si chacun utilise l'IA à sa manière, l'organisation perd le contrôle. Si personne ne l'utilise, elle perd son élan. Une politique IA claire trouve l'équilibre et rassure le RSSI.",
        },
        {
          title: "Un atelier IA concret, pas une conférence",
          body: "L'atelier de prompting se fait sur des outils comme ChatGPT et Claude, pendant la demi-journée de lancement. On y pratique, on n'y écoute pas seulement.",
        },
        {
          title: "Un outil que tout le monde peut utiliser",
          body: "Sans outil sûr, l'acculturation retombe. WonkaChat donne à chaque collaborateur un espace de travail IA connecté aux outils de l'entreprise, avec contrôle des accès et hébergement dans Azure West Europe.",
        },
        {
          title: "Une réponse pratique à l'article 4 de l'AI Act",
          body: "Former ses équipes à l'IA, poser des règles et encadrer les usages contribue à la maîtrise de l'IA que le règlement européen demande aux entreprises qui déploient des systèmes d'IA.",
        },
      ],
    },
    useCases: {
      eyebrow: "Le programme",
      heading: "Acculturation IA entreprise : ce que Wonka met en place",
      items: [
        {
          title: "Une demi-journée de lancement pour la direction et les équipes",
          body: "Les bases et les possibilités des outils d'IA comme ChatGPT et Claude, avec des exemples concrets et une projection de ce que l'IA peut signifier pour votre organisation.",
          link: { label: "Découvrir Start AI", href: "/fr/start-ai" },
        },
        {
          title: "Un atelier de prompting",
          body: "Un atelier IA pratique pendant le lancement, pour que chacun apprenne à formuler ses demandes à l'IA plutôt que d'en entendre parler.",
        },
        {
          title: "Une politique IA et des règles communes",
          body: "Ce qui est autorisé, avec quelles données et dans quels outils. Une charte que tout le monde comprend, pour que l'usage de l'IA reste sous contrôle.",
          link: { label: "Rédiger une charte IA d'entreprise", href: "/fr/charte-ia-entreprise" },
        },
        {
          title: "Un espace de travail IA sécurisé pour tous",
          body: "WonkaChat réunit l'IA de toute l'équipe au même endroit : le modèle de votre choix, les droits d'accès que vous définissez et une validation humaine pour les actions importantes.",
          link: { label: "Découvrir WonkaChat", href: "/fr/wonka-chat" },
        },
        {
          title: "Des quick wins dès le premier jour",
          body: "Des opportunités immédiatement actionnables, que vos équipes peuvent lancer dès le premier jour, pour que l'IA serve tout de suite et pas seulement dans une feuille de route.",
          link: { label: "Voir des cas clients", href: "/fr/cas-clients" },
        },
      ],
    },
    process: {
      eyebrow: "Déroulement",
      heading: "Comment embarquer vos équipes dans l'adoption de l'IA",
      steps: [
        {
          title: "Un appel de 30 minutes",
          body: "Vous nous dites où en sont vos équipes : ChatGPT personnel, Copilot, rien de structuré. Nous vous disons par où commencer, sans slides ni pitch.",
        },
        {
          title: "Préparer",
          body: "Nous clarifions les attentes et identifions les bonnes personnes à impliquer dès le départ : direction, directions métiers, DSI, RSSI et relais dans les équipes.",
        },
        {
          title: "Comprendre et inspirer",
          body: "La demi-journée de lancement, avec l'atelier de prompting, construit une compréhension commune de l'IA et de la place qu'elle doit prendre chez vous.",
        },
        {
          title: "Poser les règles",
          body: "Nous formalisons une politique IA et un cadre de gouvernance adaptés à votre organisation, pour que chacun sache ce qui est permis.",
        },
        {
          title: "Déployer pour tous",
          body: "Toute l'équipe passe sur WonkaChat. Nous restons jusqu'à ce que les gens l'utilisent vraiment, pas seulement jusqu'à la mise en ligne.",
        },
      ],
    },
    faq: {
      heading: "Acculturation IA : questions fréquentes",
      items: [
        {
          question: "Quelle différence entre acculturation IA et sensibilisation IA ?",
          answer:
            "La sensibilisation IA informe : elle explique ce qu'est l'IA et ses risques, souvent en une session. L'acculturation va plus loin : elle aligne la direction, apprend aux équipes à utiliser l'IA sur leurs propres tâches, pose des règles communes et donne un outil pour que l'usage devienne quotidien. L'objectif est l'adoption, pas seulement la compréhension.",
        },
        {
          question: "Qu'impose l'article 4 de l'AI Act sur la maîtrise de l'IA ?",
          answer:
            "L'article 4 du règlement européen sur l'IA demande aux fournisseurs et aux déployeurs de systèmes d'IA de prendre des mesures pour garantir un niveau suffisant de maîtrise de l'IA (AI literacy) chez leur personnel. Cette obligation s'applique depuis le 2 février 2025. Elle concerne donc aussi les entreprises qui utilisent l'IA au quotidien, pas seulement celles qui la développent.",
        },
        {
          question: "Comment former ses équipes à l'IA sans y passer des semaines ?",
          answer:
            "En commençant par une demi-journée de lancement avec un atelier de prompting sur des outils comme ChatGPT et Claude. Ensuite, l'apprentissage se fait dans l'usage : chaque collaborateur dispose d'un espace de travail IA sécurisé, avec des règles claires, plutôt que d'un cours à retenir.",
        },
        {
          question: "Wonka propose-t-il une formation IA certifiante ?",
          answer:
            "Non. Wonka ne délivre pas de formation certifiante. Notre acculturation fait partie du programme Start AI : lancement, atelier de prompting, politique IA et déploiement d'un espace de travail IA sécurisé. L'objectif est que vos équipes utilisent l'IA correctement dans leur travail, pas l'obtention d'un certificat.",
        },
        {
          question: "Que contient un atelier IA pour une équipe de direction ?",
          answer:
            "Les bases et les possibilités des outils d'IA actuels, des exemples concrets, une projection de ce que l'IA peut signifier pour votre organisation et un atelier de prompting. Le but est que la direction puisse arbitrer : où l'IA doit créer de la valeur, avec quelles règles et quels moyens.",
        },
        {
          question: "Faut-il une charte IA pour réussir l'acculturation ?",
          answer:
            "Oui. Sans règles communes, chacun utilise l'IA à sa manière et l'organisation perd le contrôle de ses données. La politique IA fait partie des livrables de Start AI : outils autorisés, données utilisables, validation humaine sur les actions importantes. Elle donne aussi au RSSI la visibilité qui lui manque.",
        },
        {
          question: "Comment savoir si l'acculturation IA a fonctionné ?",
          answer:
            "Au nombre de personnes qui utilisent vraiment l'IA dans leur travail, pas au nombre de participants à un atelier. Chez Itzu, 100 % des salariés ont leur WonkaChat personnel. Si vous voulez d'abord mesurer votre point de départ, un audit IA évalue votre maturité IA et priorise les cas d'usage.",
        },
      ],
    },
    related: {
      heading: "Pour aller plus loin",
      links: [
        { label: "Audit IA", href: "/fr/audit-ia", description: "Évaluer votre maturité IA et prioriser les cas d'usage." },
        { label: "Charte IA d'entreprise", href: "/fr/charte-ia-entreprise", description: "Les règles communes pour utiliser l'IA en sécurité." },
        { label: "Programme Start AI", href: "/fr/start-ai", description: "Stratégie IA, acculturation et feuille de route en 6 semaines." },
        { label: "WonkaChat", href: "/fr/wonka-chat", description: "L'espace de travail IA sécurisé pour toute l'équipe." },
        { label: "ChatGPT pour entreprise", href: "/fr/chatgpt-entreprise", description: "Passer des ChatGPT personnels à un outil d'entreprise." },
        { label: "Chatbot d'entreprise", href: "/fr/chatbot-entreprise", description: "Un assistant IA connecté à vos documents et outils." },
        { label: "Diagnostic IA gratuit", href: "/france/diagnostic", description: "5 questions, 2 minutes, 3 agents adaptés à vos outils." },
        { label: "Shadow AI : définition et risques", href: "/fr/shadow-ai", description: "Reprendre la main sur les usages d'IA non encadrés, sans les interdire." },
      ],
    },
    cta: {
      heading: "Prêt à embarquer toute votre équipe ?",
      body: "Réservez 30 minutes avec l'équipe France. Nous regardons où en sont vos équipes avec l'IA et comment les amener, ensemble, à l'utiliser vraiment.",
    },
  },
};
