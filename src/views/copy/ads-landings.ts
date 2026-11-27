/**
 * French paid-search landing pages (`/fr/lp/<slug>`).
 *
 * One page per search intent so the headline repeats what the visitor typed
 * (Google Ads message match). Rules for this copy:
 * - prices come from `src/lib/pricing-calculator.ts` (20 € seat + 7 € AI
 *   models, annual −20 % → 21,60 € HT); never quote a competitor price;
 * - no "n°1", no "souverain", no French client we do not have, no em dashes;
 * - competitor names only to describe what the visitor searched for or what
 *   their product is built for, never to disparage it.
 */

export type AdsLandingSlug =
  | "ia-odoo"
  | "claude-odoo"
  | "chatgpt-odoo"
  | "alternative-copilot"
  | "ia-entreprise"
  | "chatgpt-equipe"
  | "ia-europeenne";

export type AdsLandingLogo =
  | "openai"
  | "claude"
  | "mistral"
  | "gemini"
  | "odoo"
  | "outlook"
  | "teams"
  | "sharepoint"
  | "hubspot"
  | "salesforce";

export interface AdsLandingCopy {
  seo: { title: string; description: string };
  hero: {
    tag: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    reassurance: string[];
    logos: AdsLandingLogo[];
  };
  prompts: {
    eyebrow: string;
    title: string;
    body: string;
    /**
     * `film` = basename of a short product film in `public/videos/lp/`
     * (`<film>.mp4` + `<film>.jpg`). When every item has one, the section
     * plays them as a playlist instead of static cards.
     */
    items: {
      tool: string;
      ask: string;
      result: string;
      film?: string;
      model?: string;
    }[];
  };
  fit: {
    eyebrow: string;
    title: string;
    left: { title: string; points: string[] };
    right: { title: string; points: string[] };
    note?: string;
  };
  steps: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  faq: { q: string; a: string }[];
  finalCta: { title: string; subtitle: string };
}

/* ───────────────────────── shared blocks ───────────────────────── */

const REASSURANCE = [
  "Essai gratuit 7 jours",
  "Sans carte bancaire",
  "Hébergé en Europe",
];

export const ADS_PRICING = {
  eyebrow: "Tarif",
  title: "Un prix simple, modèles IA inclus.",
  price: "21,60 €",
  unit: "HT par utilisateur et par mois",
  note: "Facturation annuelle. 27 € HT en mensuel. Tarif dégressif au-delà de 50 utilisateurs.",
  bullets: [
    "GPT, Claude, Mistral et Gemini inclus, sans facture à l'usage",
    "Connexions à vos outils et agents partagés",
    "Gouvernance, droits d'accès et journaux d'audit",
  ],
  trialTitle: "Essai gratuit 7 jours",
  trialBody: "Accès complet, 5 € d'usage IA offerts, sans carte bancaire.",
  detailsCta: "Voir le détail des tarifs",
};

const ODOO_PROMPTS: AdsLandingCopy["prompts"] = {
  eyebrow: "Dans Odoo",
  title: "Demandez, l'IA cherche et agit dans Odoo.",
  body: "Plus besoin de connaître le bon menu ou le bon filtre. Votre équipe écrit sa demande comme à un collègue, avec le modèle de son choix.",
  items: [
    {
      tool: "Ventes",
      ask: "Quels devis n'ont pas eu de réponse depuis 15 jours ?",
      result:
        "Les devis à relancer, et les relances prêtes dans Outlook. Vous validez.",
      film: "odoo-relances-claude-fr",
      model: "Claude",
    },
    {
      tool: "Ventes",
      ask: "Prépare un devis pour Martin SA, mêmes conditions que la dernière commande.",
      result:
        "Un brouillon de devis créé dans Odoo, que vous relisez avant envoi.",
      film: "odoo-devis-gemini-fr",
      model: "Gemini",
    },
    {
      tool: "Stock",
      ask: "Quels articles passent sous le stock minimum ce mois-ci ?",
      result:
        "Les articles à commander, et les demandes de prix prêtes dans Odoo.",
      film: "odoo-stock-gpt-fr",
      model: "GPT",
    },
    {
      tool: "Comptabilité",
      ask: "Quelles factures ont plus de 30 jours de retard ?",
      result: "Les factures en retard, et un brouillon de relance par client.",
      film: "odoo-factures-mistral-fr",
      model: "Mistral",
    },
  ],
};

const ODOO_FIT: AdsLandingCopy["fit"] = {
  eyebrow: "Odoo et WonkaChat",
  title: "L'IA d'Odoo travaille dans Odoo. WonkaChat relie Odoo au reste.",
  left: {
    title: "Ce que vous gardez dans Odoo",
    points: [
      "Vos données, vos droits et vos processus restent dans Odoo",
      "Aucun module à installer, aucun développement",
      "Les actions sensibles restent à valider par un humain",
    ],
  },
  right: {
    title: "Ce que WonkaChat ajoute",
    points: [
      "Le modèle de votre choix : Claude, GPT, Mistral ou Gemini",
      "Odoo croisé avec vos e-mails, documents, CRM et autres outils",
      "Des agents partagés avec toute l'équipe, pas un outil par personne",
      "Une équipe qui vous aide à mettre les bons cas d'usage en production",
    ],
  },
};

const ODOO_STEPS: AdsLandingCopy["steps"] = {
  eyebrow: "Mise en place",
  title: "Opérationnel sur votre Odoo en trois étapes.",
  items: [
    {
      title: "Connectez Odoo",
      body: "L'adresse de votre Odoo, votre base, votre utilisateur et une clé API : vous le faites vous-même depuis WonkaChat, ou avec nous pendant la démo.",
    },
    {
      title: "Choisissez vos premiers usages",
      body: "Relances, devis, stock, reporting : partez des tâches qui prennent le plus de temps à vos équipes.",
    },
    {
      title: "Ouvrez à l'équipe",
      body: "Partagez les agents, réglez les droits par rôle et suivez l'adoption.",
    },
  ],
};

const ODOO_FAQ: AdsLandingCopy["faq"] = [
  {
    q: "Quelles versions d'Odoo sont compatibles ?",
    a: "Odoo Online, Odoo.sh et les instances hébergées chez vous ou chez votre intégrateur, en Community comme en Enterprise, des versions 16 à 19. WonkaChat passe par l'API externe d'Odoo.",
  },
  {
    q: "Faut-il installer un module ou développer quelque chose ?",
    a: "Non. Vous connectez Odoo vous-même depuis WonkaChat, avec l'adresse de votre Odoo, votre base, votre utilisateur et une clé API. Rien n'est installé dans Odoo.",
  },
  {
    q: "L'IA peut-elle modifier mes données Odoo ?",
    a: "Seulement si vous l'autorisez. Vous choisissez ce que chaque agent peut lire, créer ou modifier, et les actions sensibles restent soumises à validation.",
  },
  {
    q: "Où sont traitées mes données ?",
    a: "Sur Microsoft Azure West Europe (Irlande). Wonka AI est certifiée ISO 27001.",
  },
  {
    q: "Combien ça coûte ?",
    a: "21,60 € HT par utilisateur et par mois en facturation annuelle, modèles IA inclus. L'essai de 7 jours est gratuit, sans carte bancaire.",
  },
];

const ODOO_FINAL: AdsLandingCopy["finalCta"] = {
  title: "Voyez WonkaChat sur votre Odoo.",
  subtitle:
    "Testez gratuitement pendant 7 jours, ou réservez 30 minutes avec l'équipe France pour une démo sur vos cas d'usage.",
};

const WORKSPACE_PROMPTS: AdsLandingCopy["prompts"] = {
  eyebrow: "Au quotidien",
  title: "Ce que vos équipes demandent à WonkaChat.",
  body: "Chaque demande s'appuie sur vos documents et vos outils, avec le modèle le plus adapté à la tâche.",
  items: [
    {
      tool: "Ventes",
      ask: "Prépare une proposition pour ce prospect à partir de notre modèle et de nos dernières offres.",
      result: "Un premier jet dans votre format, à partir de vos documents.",
    },
    {
      tool: "Support",
      ask: "Réponds à ce client en t'appuyant sur nos conditions générales et l'historique du ticket.",
      result: "Une réponse sourcée, que l'agent relit avant envoi.",
    },
    {
      tool: "Finance",
      ask: "Compare les dépenses du trimestre avec le budget et explique les écarts.",
      result: "Un tableau des écarts et un commentaire prêt pour le comité.",
    },
    {
      tool: "RH",
      ask: "Quelles sont les règles de télétravail pour un nouvel arrivant en CDD ?",
      result: "La réponse issue de vos documents internes, avec la source.",
    },
  ],
};

const WORKSPACE_STEPS: AdsLandingCopy["steps"] = {
  eyebrow: "Démarrage",
  title: "De l'essai à toute l'équipe.",
  items: [
    {
      title: "Créez votre espace",
      body: "Inscription en ligne, essai gratuit de 7 jours, sans carte bancaire.",
    },
    {
      title: "Connectez vos outils",
      body: "Microsoft 365, Google Workspace, CRM, ERP : plus de 70 connecteurs disponibles.",
    },
    {
      title: "Déployez par équipe",
      body: "Partagez des agents, réglez les droits et suivez l'usage. Nos consultants vous accompagnent si besoin.",
    },
  ],
};

const SECURITY_FAQ = {
  q: "Où sont traitées nos données ?",
  a: "Sur Microsoft Azure West Europe (Irlande), avec des modèles IA hébergés dans l'Union européenne. Wonka AI est certifiée ISO 27001, conforme RGPD et NIS 2.",
};

const PRICE_FAQ = {
  q: "Combien ça coûte ?",
  a: "21,60 € HT par utilisateur et par mois en facturation annuelle (27 € HT en mensuel), modèles IA inclus. Tarif dégressif au-delà de 50 utilisateurs. Essai gratuit de 7 jours, sans carte bancaire.",
};

const WORKSPACE_FINAL: AdsLandingCopy["finalCta"] = {
  title: "Faites fonctionner l'IA pour toute votre équipe.",
  subtitle:
    "Testez gratuitement pendant 7 jours, ou réservez 30 minutes avec l'équipe France.",
};

/* ───────────────────────── pages ───────────────────────── */

export const ADS_LANDINGS: Record<AdsLandingSlug, AdsLandingCopy> = {
  "ia-odoo": {
    seo: {
      title: "IA pour Odoo : un copilote pour toute l'équipe | WonkaChat",
      description:
        "Interrogez Odoo, préparez devis et relances en langage naturel avec Claude, GPT ou Mistral. Sans module, hébergé en Europe. Essai gratuit 7 jours.",
    },
    hero: {
      tag: "Pour les entreprises sur Odoo",
      title: "Un copilote IA pour toute votre équipe Odoo.",
      subtitle:
        "Posez vos questions à Odoo, préparez devis et relances en langage naturel. Avec Claude, GPT ou Mistral, sans module ni développement.",
      primaryCta: "Essai gratuit",
      secondaryCta: "Voir une démo sur Odoo",
      reassurance: REASSURANCE,
      logos: ["odoo", "claude", "openai", "mistral", "gemini"],
    },
    prompts: ODOO_PROMPTS,
    fit: ODOO_FIT,
    steps: ODOO_STEPS,
    faq: ODOO_FAQ,
    finalCta: ODOO_FINAL,
  },

  "claude-odoo": {
    seo: {
      title: "Claude connecté à Odoo, pour toute l'équipe | WonkaChat",
      description:
        "Utilisez Claude sur vos données Odoo : devis, relances, stock, comptabilité. Sans module, hébergé en Europe. Essai gratuit 7 jours.",
    },
    hero: {
      tag: "Claude + Odoo",
      title: "Claude, connecté à votre Odoo.",
      subtitle:
        "Votre équipe interroge Odoo, prépare devis et relances avec Claude, directement sur vos données. Sans module, sans développement, hébergé en Europe.",
      primaryCta: "Essai gratuit",
      secondaryCta: "Voir une démo sur Odoo",
      reassurance: REASSURANCE,
      logos: ["claude", "odoo"],
    },
    prompts: ODOO_PROMPTS,
    fit: ODOO_FIT,
    steps: ODOO_STEPS,
    faq: [
      {
        q: "Est-ce vraiment Claude ?",
        a: "Oui : WonkaChat donne accès aux modèles Claude d'Anthropic, ainsi qu'à GPT, Mistral et Gemini. Vous choisissez le modèle à chaque conversation ou pour chaque agent.",
      },
      ...ODOO_FAQ,
    ],
    finalCta: ODOO_FINAL,
  },

  "chatgpt-odoo": {
    seo: {
      title: "ChatGPT pour Odoo : GPT connecté à vos données | WonkaChat",
      description:
        "Les modèles GPT de ChatGPT, connectés à votre Odoo pour toute l'équipe. Claude et Mistral inclus. Sans module, hébergé en Europe. Essai gratuit.",
    },
    hero: {
      tag: "Vous cherchez ChatGPT pour Odoo ?",
      title: "Les modèles de ChatGPT, connectés à votre Odoo.",
      subtitle:
        "GPT, mais aussi Claude et Mistral, branchés sur vos données Odoo pour toute l'équipe. Devis, relances, stock : sans copier-coller, sans module.",
      primaryCta: "Essai gratuit",
      secondaryCta: "Voir une démo sur Odoo",
      reassurance: REASSURANCE,
      logos: ["openai", "odoo", "claude", "mistral"],
    },
    prompts: ODOO_PROMPTS,
    fit: ODOO_FIT,
    steps: ODOO_STEPS,
    faq: [
      {
        q: "Est-ce ChatGPT ?",
        a: "WonkaChat n'est pas ChatGPT : c'est un espace d'équipe qui donne accès aux mêmes modèles GPT d'OpenAI, ainsi qu'à Claude, Mistral et Gemini, connectés à vos outils.",
      },
      ...ODOO_FAQ,
    ],
    finalCta: ODOO_FINAL,
  },

  "alternative-copilot": {
    seo: {
      title: "Alternative à Microsoft Copilot pour l'entreprise | WonkaChat",
      description:
        "Une IA d'équipe connectée à Microsoft 365, mais aussi à votre ERP et votre CRM. GPT, Claude, Mistral et Gemini. Hébergé en Europe. Essai gratuit.",
    },
    hero: {
      tag: "Vous comparez avec Microsoft Copilot ?",
      title: "L'IA qui travaille dans tous vos outils, pas seulement Office.",
      subtitle:
        "WonkaChat se connecte à Outlook, Teams et SharePoint, mais aussi à Odoo, HubSpot ou Salesforce. Et vous choisissez le modèle selon la tâche : GPT, Claude, Mistral ou Gemini.",
      primaryCta: "Essai gratuit",
      secondaryCta: "Comparer avec un expert",
      reassurance: REASSURANCE,
      logos: [
        "outlook",
        "teams",
        "sharepoint",
        "odoo",
        "hubspot",
        "salesforce",
      ],
    },
    prompts: WORKSPACE_PROMPTS,
    fit: {
      eyebrow: "Copilot ou WonkaChat ?",
      title: "Deux outils, deux usages différents.",
      left: {
        title: "Microsoft Copilot est pensé pour",
        points: [
          "Rédiger et résumer dans Word, Outlook et PowerPoint",
          "Résumer les réunions Teams",
          "Analyser le fichier Excel que vous avez ouvert",
        ],
      },
      right: {
        title: "WonkaChat est pensé pour",
        points: [
          "Interroger et mettre à jour vos logiciels métier : ERP, CRM, support",
          "Choisir le modèle le plus adapté à chaque tâche",
          "Partager des agents prêts à l'emploi avec toute l'équipe",
          "Être accompagné par des consultants jusqu'à la mise en production",
        ],
      },
      note: "Beaucoup d'équipes gardent Microsoft 365 et ajoutent WonkaChat : il se connecte à Outlook, Teams, SharePoint et OneDrive.",
    },
    steps: WORKSPACE_STEPS,
    faq: [
      {
        q: "WonkaChat remplace-t-il Microsoft 365 ?",
        a: "Non. WonkaChat se connecte à Outlook, Teams, SharePoint et OneDrive, et ajoute vos autres outils (ERP, CRM, support) dans le même espace IA.",
      },
      {
        q: "Est-ce moins cher que Copilot ?",
        a: "Pas forcément, et ce n'est pas l'argument. WonkaChat coûte 21,60 € HT par utilisateur et par mois en annuel, modèles IA inclus. Le bon choix dépend surtout des outils dans lesquels vos équipes travaillent : si une grande partie du travail se passe hors d'Office, WonkaChat couvre ce que Copilot ne voit pas.",
      },
      {
        q: "Peut-on se connecter avec nos comptes Microsoft ?",
        a: "Oui, l'authentification unique avec Entra ID est disponible.",
      },
      SECURITY_FAQ,
      {
        q: "Peut-on tester sur nos vrais cas d'usage ?",
        a: "Oui. L'essai de 7 jours donne un accès complet avec 5 € d'usage IA offerts, sans carte bancaire. Vous pouvez aussi réserver 30 minutes avec l'équipe France pour comparer sur vos cas d'usage.",
      },
    ],
    finalCta: {
      title: "Comparez sur vos propres cas d'usage.",
      subtitle:
        "Testez WonkaChat gratuitement pendant 7 jours, ou réservez 30 minutes avec l'équipe France.",
    },
  },

  "ia-entreprise": {
    seo: {
      title:
        "IA pour entreprise : un espace sécurisé pour toute l'équipe | WonkaChat",
      description:
        "GPT, Claude, Mistral et Gemini pour toute l'équipe, connectés à vos outils et documents. Hébergé en Europe, ISO 27001. Essai gratuit 7 jours.",
    },
    hero: {
      tag: "L'IA pour les entreprises",
      title: "Faites fonctionner l'IA pour toute votre équipe.",
      subtitle:
        "Un espace sécurisé où vos équipes utilisent GPT, Claude, Mistral et Gemini sur vos documents et vos outils. Hébergé en Europe.",
      primaryCta: "Essai gratuit",
      secondaryCta: "Parler à l'équipe France",
      reassurance: REASSURANCE,
      logos: ["openai", "claude", "mistral", "gemini"],
    },
    prompts: WORKSPACE_PROMPTS,
    fit: {
      eyebrow: "Pourquoi un espace d'équipe",
      title: "L'IA est déjà là. Elle n'est pas encore organisée.",
      left: {
        title: "Sans espace commun",
        points: [
          "Chacun son outil, son compte et ses prompts",
          "Des documents copiés-collés dans des outils non validés",
          "Aucune vue sur l'usage ni sur les coûts",
        ],
      },
      right: {
        title: "Avec WonkaChat",
        points: [
          "Un espace pour toute l'équipe, avec les meilleurs modèles",
          "Des réponses ancrées dans vos documents et vos outils",
          "Des agents partagés pour les tâches qui reviennent",
          "Droits, usage et dépenses visibles par l'administrateur",
        ],
      },
    },
    steps: WORKSPACE_STEPS,
    faq: [
      {
        q: "Quels modèles d'IA sont inclus ?",
        a: "GPT d'OpenAI, Claude d'Anthropic, Mistral et Gemini, inclus dans la licence. Vous choisissez le modèle selon la tâche.",
      },
      {
        q: "À quels outils WonkaChat se connecte-t-il ?",
        a: "Plus de 70 connecteurs : Microsoft 365, Google Workspace, Odoo, HubSpot, Salesforce, Notion et d'autres. Si un outil manque, notre équipe peut mettre en place la connexion.",
      },
      SECURITY_FAQ,
      PRICE_FAQ,
    ],
    finalCta: WORKSPACE_FINAL,
  },

  "chatgpt-equipe": {
    seo: {
      title:
        "ChatGPT pour votre entreprise ? GPT, Claude et Mistral en équipe | WonkaChat",
      description:
        "Les modèles de ChatGPT, Claude et Mistral dans un seul espace d'équipe, connecté à vos outils. Hébergé en Europe. Essai gratuit 7 jours.",
    },
    hero: {
      tag: "Vous cherchez ChatGPT pour votre entreprise ?",
      title: "GPT, Claude et Mistral pour toute votre équipe.",
      subtitle:
        "Un seul espace, plusieurs modèles : vos équipes choisissent le meilleur selon la tâche, sur vos documents et vos outils, avec des données hébergées en Europe.",
      primaryCta: "Essai gratuit",
      secondaryCta: "Parler à l'équipe France",
      reassurance: REASSURANCE,
      logos: ["openai", "claude", "mistral", "gemini"],
    },
    prompts: WORKSPACE_PROMPTS,
    fit: {
      eyebrow: "Plusieurs modèles",
      title: "Un modèle pour chaque tâche, un seul espace pour l'équipe.",
      left: {
        title: "Un seul modèle",
        points: [
          "Le même modèle pour rédiger, analyser et coder",
          "Un abonnement de plus à chaque nouvel outil d'IA",
          "Des connexions limitées à l'écosystème de l'éditeur",
        ],
      },
      right: {
        title: "WonkaChat",
        points: [
          "GPT, Claude, Mistral et Gemini inclus dans une seule licence",
          "Connecté à Microsoft 365, Google Workspace, ERP et CRM",
          "Des agents partagés avec toute l'équipe",
          "Données traitées en Europe, ISO 27001",
        ],
      },
    },
    steps: WORKSPACE_STEPS,
    faq: [
      {
        q: "Est-ce ChatGPT ?",
        a: "WonkaChat n'est pas ChatGPT : c'est un espace d'équipe qui donne accès aux modèles GPT d'OpenAI, ainsi qu'à Claude, Mistral et Gemini, connectés à vos outils.",
      },
      SECURITY_FAQ,
      PRICE_FAQ,
      {
        q: "Peut-on tester avant de s'engager ?",
        a: "Oui : 7 jours d'accès complet, 5 € d'usage IA offerts, sans carte bancaire.",
      },
    ],
    finalCta: WORKSPACE_FINAL,
  },

  "ia-europeenne": {
    seo: {
      title:
        "IA européenne pour l'entreprise : vos données restent en Europe | WonkaChat",
      description:
        "GPT, Claude, Mistral et Gemini hébergés en Europe, jamais entraînés sur vos données. Équipes à Paris, Lille et Bruxelles. ISO 27001. Essai gratuit 7 jours.",
    },
    hero: {
      tag: "Une IA européenne pour l'entreprise",
      title: "Les meilleurs modèles d'IA. Vos données restent en Europe.",
      subtitle:
        "Mistral, GPT, Claude ou Gemini pour toute votre équipe, hébergés en Europe et jamais entraînés sur vos données. Une équipe à Paris, Lille et Bruxelles pour vous accompagner.",
      primaryCta: "Essai gratuit",
      secondaryCta: "Parler à l'équipe France",
      reassurance: [
        "Essai gratuit 7 jours",
        "Hébergé en Europe",
        "Jamais utilisé pour l'entraînement",
      ],
      logos: ["mistral", "openai", "claude", "gemini"],
    },
    prompts: WORKSPACE_PROMPTS,
    fit: {
      eyebrow: "Vos données",
      title: "Ce qui change avec une IA européenne pour l'entreprise.",
      left: {
        title: "Avec un outil d'IA grand public",
        points: [
          "Vos conversations peuvent servir à entraîner les modèles",
          "Des données souvent traitées et conservées hors d'Europe",
          "Chacun son compte, sans contrôle de l'entreprise",
        ],
      },
      right: {
        title: "Avec WonkaChat",
        points: [
          "Vos données ne servent jamais à entraîner les modèles",
          "Aucune conservation de vos données par les fournisseurs d'IA",
          "Traitement sur Azure West Europe, modèles hébergés dans l'Union européenne",
          "Chiffrement au repos et en transit, ISO 27001, conforme RGPD et NIS 2",
          "Droits d'accès, journaux d'audit et SSO Entra ID",
        ],
      },
      note: "Des équipes à Paris, Lille et Bruxelles, pour vous accompagner sur place.",
    },
    steps: WORKSPACE_STEPS,
    faq: [
      {
        q: "Nos données servent-elles à entraîner les modèles ?",
        a: "Non. Les données de vos équipes ne sont jamais utilisées pour entraîner des modèles d'IA, et les fournisseurs de modèles ne les conservent pas.",
      },
      SECURITY_FAQ,
      {
        q: "Qui est derrière WonkaChat ?",
        a: "Wonka AI, certifiée ISO 27001, avec des équipes à Paris, Lille et Bruxelles qui accompagnent la mise en place.",
      },
      PRICE_FAQ,
    ],
    finalCta: {
      title: "Une IA pour toute l'équipe, des données qui restent en Europe.",
      subtitle:
        "Testez gratuitement pendant 7 jours, ou réservez 30 minutes avec l'équipe France.",
    },
  },
};

export const ADS_LANDING_SLUGS = Object.keys(ADS_LANDINGS) as AdsLandingSlug[];
