import type { Locale } from "@/i18n/config";



export interface WorkspaceAiAgentsCopy {

  seo: { title: string; description: string };

  hero: {

    eyebrow: string;

    title: string;

    subtitle: string;

    primaryCta: string;

    secondaryCta: string;

    imageAlt: string;

  };

  builtForWork: {

    title: string;

    cards: {

      instructions: { title: string; body: string; imageAlt: string };

      knowledgeTools: { title: string; body: string; imageAlt: string };

      share: { title: string; body: string; imageAlt: string };

    };

  };

  atWork: {

    eyebrow: string;

    title: string;

    body: string;

    steps: { label: string; text: string; quoted?: boolean }[];

    imageAlt: string;

  };

  governance: {

    eyebrow: string;

    title: string;

    body: string;

    imageAlt: string;

    exploreLink: string;

  };

  implementation: {

    eyebrow: string;

    title: string;

    body: string;

    cta: string;

  };

  finalCta: {

    title: string;

    subtitle: string;

    primaryCta: string;

    secondaryCta: string;

  };

}



const en: WorkspaceAiAgentsCopy = {

  seo: {

    title: "AI Agents for Your Team | Wonka AI",

    description:

      "Set up AI agents for everyday work: clear instructions, your company knowledge and tools, shared with the colleagues who need them.",

  },

  hero: {

    eyebrow: "AI Agents",

    title: "Build it once. Let your whole team use it.",

    subtitle:

      "Make recurring tasks easier to handle with agents that follow your processes and work with the information and tools you already use.",

    primaryCta: "Start free trial",

    secondaryCta: "Talk to a consultant",

    imageAlt: "Agent builder in Wonka Workspace",

  },

  builtForWork: {

    title: "Set up agents for everyday work.",

    cards: {

      instructions: {

        title: "Give agents clear instructions.",

        body: "Set out what needs to happen and how, so the same task doesn't need to be explained every time.",

        imageAlt: "Configuring agent instructions in Wonka Workspace",

      },

      knowledgeTools: {

        title: "Work with the tools and information you already have.",

        body: "Connect company knowledge and business tools, so agents have the information they need without your team gathering everything manually.",

        imageAlt: "Agent connected to company knowledge and business tools",

      },

      share: {

        title: "Keep your team working the same way.",

        body: "Share agents with the right colleagues, so everyone can follow the same process without starting from scratch.",

        imageAlt:
          "Sharing a follow-up agent with Sales, Marketing, Finance and Customer Service in Wonka Workspace",

      },

    },

  },

  atWork: {

    eyebrow: "Agents in action",

    title: "From request to result.",

    body: "See how an agent can gather information, prepare the next steps and let you review the result.",

    steps: [

      {

        label: "Ask",

        text: "Which leads need a follow-up?",

        quoted: true,

      },

      {

        label: "Check",

        text: "The agent looks at the connected CRM records.",

      },

      {

        label: "Prepare",

        text: "It drafts follow-up messages using the relevant customer information.",

      },

      {

        label: "Review",

        text: "Your team checks the messages before sending.",

      },

    ],

    imageAlt: "Sales agent checking CRM data and preparing follow-up messages",

  },

  governance: {

    eyebrow: "Agent control",

    title: "Know what your agents do. Stay in control.",

    body: "Audit how your agents are used, check their AI model and adjust them when needed. Update a shared agent once, and your whole team works with the updated version.",

    imageAlt: "Managing and sharing agents in Wonka Workspace",

    exploreLink: "Explore AI Governance →",

  },

  implementation: {

    eyebrow: "The Wonka team",

    title: "Build agents on your own, or with our team.",

    body: "We can help you choose the right tasks, connect your tools and get agents ready for everyday use.",

    cta: "Talk to a consultant",

  },

  finalCta: {

    title: "Start with one task your team repeats.",

    subtitle: "Try building an agent yourself, or talk to our team about where to start.",

    primaryCta: "Start free trial",

    secondaryCta: "Talk to a consultant",

  },

};



const fr: WorkspaceAiAgentsCopy = {

  seo: {

    title: "Agents IA pour vos équipes | Wonka AI",

    description:

      "Configurez des agents IA pour le quotidien : consignes claires, connaissance et outils de l'entreprise, partagés avec les bonnes équipes.",

  },

  hero: {

    eyebrow: "Agents IA",

    title: "Construisez une fois. Toute l'équipe en profite.",

    subtitle:

      "Facilitez les tâches récurrentes avec des agents qui respectent vos processus et s'appuient sur les informations et outils que vous utilisez déjà.",

    primaryCta: "Essai gratuit",

    secondaryCta: "Parler à un consultant",

    imageAlt: "Création d'agent dans Wonka Workspace",

  },

  builtForWork: {

    title: "Configurez des agents pour le travail du quotidien.",

    cards: {

      instructions: {

        title: "Donnez des consignes claires à vos agents.",

        body: "Décrivez ce qui doit se passer et comment, pour ne pas réexpliquer la même tâche à chaque fois.",

        imageAlt: "Configuration des consignes d'un agent dans Wonka Workspace",

      },

      knowledgeTools: {

        title: "Travaillez avec les outils et informations que vous avez déjà.",

        body: "Connectez la connaissance de l'entreprise et vos outils métier, pour que les agents disposent des informations sans que vos équipes doivent tout rassembler à la main.",

        imageAlt: "Agent connecté à la connaissance et aux outils métier",

      },

      share: {

        title: "Gardez les mêmes habitudes dans vos équipes.",

        body: "Partagez les agents avec les bons collègues, pour que chacun suive le même processus sans repartir de zéro.",

        imageAlt:
          "Partage d'un agent de relance avec Sales, Marketing, Finance et Customer Service dans Wonka Workspace",

      },

    },

  },

  atWork: {

    eyebrow: "Agents en action",

    title: "De la demande au résultat.",

    body: "Voyez comment un agent peut rassembler les informations, préparer la suite et vous laisser valider le résultat.",

    steps: [

      {

        label: "Demander",

        text: "Quels leads méritent une relance ?",

        quoted: true,

      },

      {

        label: "Vérifier",

        text: "L'agent consulte les fiches du CRM connecté.",

      },

      {

        label: "Préparer",

        text: "Il rédige des messages de relance à partir des informations client pertinentes.",

      },

      {

        label: "Valider",

        text: "Votre équipe relit les messages avant envoi.",

      },

    ],

    imageAlt: "Agent commercial consultant le CRM et préparant des relances",

  },

  governance: {

    eyebrow: "Contrôle des agents",

    title: "Sachez ce que font vos agents. Gardez la main.",

    body: "Auditez l'usage de vos agents, vérifiez leur modèle IA et ajustez-les si nécessaire. Mettez à jour un agent partagé une fois, toute l'équipe travaille avec la même version.",

    imageAlt: "Gestion et partage d'agents dans Wonka Workspace",

    exploreLink: "Découvrir la gouvernance IA →",

  },

  implementation: {

    eyebrow: "L'équipe Wonka",

    title: "Créez des agents seul, ou avec nous.",

    body: "Nous pouvons vous aider à choisir les bonnes tâches, connecter vos outils et rendre les agents utiles au quotidien.",

    cta: "Parler à un consultant",

  },

  finalCta: {

    title: "Commencez par une tâche que votre équipe répète souvent.",

    subtitle:

      "Essayez de créer un agent vous-même, ou échangez avec nous pour savoir par où commencer.",

    primaryCta: "Essai gratuit",

    secondaryCta: "Parler à un consultant",

  },

};



const nl: WorkspaceAiAgentsCopy = {

  seo: {

    title: "AI-agents voor uw team | Wonka AI",

    description:

      "Zet AI-agents in voor dagelijks werk: duidelijke instructies, uw bedrijfskennis en tools, gedeeld met de collega's die ze nodig hebben.",

  },

  hero: {

    eyebrow: "AI-agents",

    title: "Bouw het één keer. Laat uw hele team er gebruik van maken.",

    subtitle:

      "Maak terugkerende taken eenvoudiger met agents die uw processen volgen en werken met de informatie en tools die u al gebruikt.",

    primaryCta: "Gratis proberen",

    secondaryCta: "Spreek een consultant",

    imageAlt: "Agent bouwen in Wonka Workspace",

  },

  builtForWork: {

    title: "Zet agents in voor dagelijks werk.",

    cards: {

      instructions: {

        title: "Geef agents duidelijke instructies.",

        body: "Leg vast wat er moet gebeuren en hoe, zodat u dezelfde taak niet telkens opnieuw moet uitleggen.",

        imageAlt: "Agent-instructies instellen in Wonka Workspace",

      },

      knowledgeTools: {

        title: "Werk met de tools en informatie die u al hebt.",

        body: "Koppel bedrijfskennis en bedrijfstools, zodat agents de informatie hebben zonder dat uw team alles handmatig moet verzamelen.",

        imageAlt: "Agent gekoppeld aan bedrijfskennis en bedrijfstools",

      },

      share: {

        title: "Laat uw team op dezelfde manier werken.",

        body: "Deel agents met de juiste collega's, zodat iedereen hetzelfde proces volgt zonder opnieuw te beginnen.",

        imageAlt:
          "Follow-up-agent delen met Sales, Marketing, Finance en Customer Service in Wonka Workspace",

      },

    },

  },

  atWork: {

    eyebrow: "Agents in actie",

    title: "Van vraag tot resultaat.",

    body: "Zie hoe een agent informatie verzamelt, vervolgstappen voorbereidt en u het resultaat laat nakijken.",

    steps: [

      {

        label: "Vragen",

        text: "Welke leads hebben een follow-up nodig?",

        quoted: true,

      },

      {

        label: "Controleren",

        text: "De agent bekijkt de gekoppelde CRM-records.",

      },

      {

        label: "Voorbereiden",

        text: "Hij stelt follow-upberichten op met de relevante klantinformatie.",

      },

      {

        label: "Nakijken",

        text: "Uw team controleert de berichten vóór ze verstuurd worden.",

      },

    ],

    imageAlt: "Sales-agent bekijkt CRM-gegevens en bereidt follow-ups voor",

  },

  governance: {

    eyebrow: "Agentcontrole",

    title: "Weet wat uw agents doen. Blijf in controle.",

    body: "Audit hoe uw agents worden gebruikt, controleer hun AI-model en pas ze aan wanneer nodig. Werk een gedeelde agent één keer bij, en uw hele team gebruikt dezelfde versie.",

    imageAlt: "Agents beheren en delen in Wonka Workspace",

    exploreLink: "Ontdek AI-governance →",

  },

  implementation: {

    eyebrow: "Het Wonka-team",

    title: "Bouw agents alleen, of samen met ons.",

    body: "We helpen u de juiste taken kiezen, tools koppelen en agents klaarzetten voor dagelijks gebruik.",

    cta: "Spreek een consultant",

  },

  finalCta: {

    title: "Begin met één taak die uw team vaak herhaalt.",

    subtitle:

      "Probeer zelf een agent te bouwen, of bespreek met ons team waar u het best start.",

    primaryCta: "Gratis proberen",

    secondaryCta: "Spreek een consultant",

  },

};



export const WORKSPACE_AI_AGENTS_COPY: Record<Locale, WorkspaceAiAgentsCopy> = {

  en,

  fr,

  nl,

};


