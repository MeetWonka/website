import type { Locale } from "@/i18n/config";



type CardCopy = {
  title: string;
  body: string;
  alt: string;
  footerLink?: string;
};



/** Page-level copy for the Workspace page (`/workspace`, `/fr/workspace`, `/nl/workspace`). */

export interface WorkspaceCopy {

  hero: {

    eyebrow: string;

    title: string;

    subtitle: string;

    imageAlt: string;

    talkToSales: string;

  };

  proofLines: string[];

  products: {

    heading: string;

    aiChat: CardCopy & { ctaLabel: string };

    aiAgents: CardCopy & { ctaLabel: string };

  };

  capabilities: {

    heading: string;

    cards: Record<

      | "connected-tools"

      | "set-up-per-team"

      | "human-approves"

      | "your-model-choice"

      | "workflow-templates",

      CardCopy

    >;

  };

  contactHeading: string;

  contactBody: string;

}



const en: WorkspaceCopy = {

  hero: {

    eyebrow: "AI Workspace",

    title: "One place for your whole team to work with AI.",

    subtitle:

      "Give everyone a secure place to find answers, work with company knowledge and get repetitive tasks done with AI.",

    imageAlt: "Wonka Workspace product screenshot",

    talkToSales: "Talk to a consultant",

  },

  proofLines: [

    "Trusted by Belgian teams of every size",

    "European data storage",

  ],

  products: {

    heading: "Explore Wonka Workspace.",

    aiChat: {

      title: "AI Chat",

      body: "Find answers faster with AI that understands your company knowledge.",

      ctaLabel: "Discover AI Chat →",

      alt: "AI Chat in Wonka Workspace",

    },

    aiAgents: {

      title: "AI Agents",

      body: "Take repetitive work off your team's plate with agents built around your processes.",

      ctaLabel: "Discover AI Agents →",

      alt: "AI Agents in Wonka Workspace",

    },

  },

  capabilities: {

    heading: "Make AI fit the way you work.",

    cards: {

      "connected-tools": {

        title: "Work with the tools you already use.",

        body: "Connect your business systems so AI can use the information your teams work with every day.",

        alt: "Business tool integrations in Wonka Workspace",

      },

      "set-up-per-team": {

        title: "Give every team the right access.",

        body: "Manage who can use which tools, features and company information, all from one place.",

        alt: "Team access settings in Wonka Workspace",

        footerLink: "More about governance →",

      },

      "human-approves": {

        title: "Keep people in control.",

        body: "Let AI prepare the work, while your team reviews and approves important actions.",

        alt: "Human approval in Wonka Workspace",

      },

      "your-model-choice": {

        title: "The right AI for every task.",

        body: "Use different AI models depending on what the work requires.",

        alt: "AI model selection in Wonka Workspace",

      },

      "workflow-templates": {

        title: "Useful agents, ready for your team.",

        body: "Find and share agents that help your colleagues get recurring work done.",

        alt: "Shared agents in Wonka Workspace",

      },

    },

  },

  contactHeading: "Want to see what Wonka Workspace\ncould do for your team?",

  contactBody:
    "Book a short demo and we'll show how Wonka Workspace can connect to your tools, support your workflows and make AI accessible across your organisation.",

};



const fr: WorkspaceCopy = {

  hero: {

    eyebrow: "Espace de travail IA",

    title: "Un seul endroit pour que toute votre équipe travaille avec l'IA.",

    subtitle:

      "Offrez à chacun un espace sécurisé pour trouver des réponses, utiliser la connaissance de l'entreprise et traiter les tâches répétitives avec l'IA.",

    imageAlt: "Capture d'écran de Wonka Workspace",

    talkToSales: "Parler à un consultant",

  },

  proofLines: [

    "La confiance d'équipes belges de toutes tailles",

    "Données stockées en Europe",

  ],

  products: {

    heading: "Découvrez Wonka Workspace.",

    aiChat: {

      title: "Chat IA",

      body: "Trouvez des réponses plus vite avec une IA qui comprend la connaissance de votre entreprise.",

      ctaLabel: "Découvrir le Chat IA →",

      alt: "Chat IA dans Wonka Workspace",

    },

    aiAgents: {

      title: "Agents IA",

      body: "Allégez le travail répétitif de vos équipes avec des agents alignés sur vos processus.",

      ctaLabel: "Découvrir les Agents IA →",

      alt: "Agents IA dans Wonka Workspace",

    },

  },

  capabilities: {

    heading: "Faites entrer l'IA dans votre façon de travailler.",

    cards: {

      "connected-tools": {

        title: "Travaillez avec les outils que vous utilisez déjà.",

        body: "Connectez vos systèmes métier pour que l'IA s'appuie sur les informations avec lesquelles vos équipes travaillent chaque jour.",

        alt: "Intégrations d'outils métier dans Wonka Workspace",

      },

      "set-up-per-team": {

        title: "Donnez à chaque équipe le bon accès.",

        body: "Gérez qui peut utiliser quels outils, fonctionnalités et informations de l'entreprise, depuis un seul endroit.",

        alt: "Paramètres d'accès par équipe dans Wonka Workspace",

        footerLink: "En savoir plus sur la gouvernance →",

      },

      "human-approves": {

        title: "Gardez les personnes aux commandes.",

        body: "L'IA prépare le travail, vos équipes relisent et valident les actions importantes.",

        alt: "Validation humaine dans Wonka Workspace",

      },

      "your-model-choice": {

        title: "La bonne IA pour chaque tâche.",

        body: "Utilisez différents modèles d'IA selon ce que le travail exige.",

        alt: "Choix de modèle d'IA dans Wonka Workspace",

      },

      "workflow-templates": {

        title: "Des agents utiles, prêts pour vos équipes.",

        body: "Trouvez et partagez des agents qui aident vos collègues à traiter le travail récurrent.",

        alt: "Agents partagés dans Wonka Workspace",

      },

    },

  },

  contactHeading: "Envie de voir ce que Wonka Workspace\npeut faire pour votre équipe ?",

  contactBody:
    "Réservez une courte démo : nous vous montrerons comment Wonka Workspace se connecte à vos outils, soutient vos workflows et rend l'IA accessible dans toute votre organisation.",

};



const nl: WorkspaceCopy = {

  hero: {

    eyebrow: "AI-werkruimte",

    title: "Eén plek waar uw hele team met AI werkt.",

    subtitle:

      "Geef iedereen een veilige plek om antwoorden te vinden, met bedrijfskennis te werken en repetitieve taken met AI te doen.",

    imageAlt: "Screenshot van Wonka Workspace",

    talkToSales: "Spreek een consultant",

  },

  proofLines: [

    "Vertrouwd door Belgische teams van elke omvang",

    "Europese dataopslag",

  ],

  products: {

    heading: "Ontdek Wonka Workspace.",

    aiChat: {

      title: "AI-chat",

      body: "Vind sneller antwoorden met AI die uw bedrijfskennis begrijpt.",

      ctaLabel: "Ontdek AI-chat →",

      alt: "AI-chat in Wonka Workspace",

    },

    aiAgents: {

      title: "AI-agents",

      body: "Neem repetitief werk weg bij uw team met agents rond uw processen.",

      ctaLabel: "Ontdek AI-agents →",

      alt: "AI-agents in Wonka Workspace",

    },

  },

  capabilities: {

    heading: "Laat AI aansluiten op de manier waarop u werkt.",

    cards: {

      "connected-tools": {

        title: "Werk met de tools die u al gebruikt.",

        body: "Koppel uw bedrijfssystemen zodat AI de informatie kan gebruiken waarmee uw teams dagelijks werken.",

        alt: "Integraties met bedrijfstools in Wonka Workspace",

      },

      "set-up-per-team": {

        title: "Geef elk team de juiste toegang.",

        body: "Beheer wie welke tools, functies en bedrijfsinformatie mag gebruiken, vanuit één plek.",

        alt: "Teamtoegang in Wonka Workspace",

        footerLink: "Meer over governance →",

      },

      "human-approves": {

        title: "Houd mensen aan het stuur.",

        body: "Laat AI het werk voorbereiden, terwijl uw team belangrijke acties nakijkt en goedkeurt.",

        alt: "Menselijke goedkeuring in Wonka Workspace",

      },

      "your-model-choice": {

        title: "De juiste AI voor elke taak.",

        body: "Gebruik verschillende AI-modellen afhankelijk van wat het werk vraagt.",

        alt: "AI-modelkeuze in Wonka Workspace",

      },

      "workflow-templates": {

        title: "Handige agents, klaar voor uw team.",

        body: "Vind en deel agents die collega's helpen terugkerend werk af te handelen.",

        alt: "Gedeelde agents in Wonka Workspace",

      },

    },

  },

  contactHeading: "Benieuwd wat Wonka Workspace\nvoor uw team kan doen?",

  contactBody:
    "Boek een korte demo en wij tonen hoe Wonka Workspace aansluit op uw tools, uw workflows ondersteunt en AI toegankelijk maakt in heel uw organisatie.",

};



export const WORKSPACE_COPY: Record<Locale, WorkspaceCopy> = { en, fr, nl };


