import type { Locale } from "@/i18n/config";



export interface WorkspaceGovernanceCopy {

  seo: { title: string; description: string };

  hero: {

    eyebrow: string;

    title: string;

    subtitle: string;

    cta: string;

    imageAlt: string;

  };

  features: {

    heading: string;

    cards: {

      access: { title: string; body: string; imageAlt: string };

      usage: { title: string; body: string; imageAlt: string };

      agents: { title: string; body: string; imageAlt: string };

      sharedRules: { title: string; body: string; imageAlt: string };

    };

  };

  deployment: {
    eyebrow: string;
    title: string;
    options: {
      id: string;
      headline: string;
      body: string;
      tier: string;
      featured?: boolean;
      visual: "azure" | "dedicated-azure" | "multi-cloud" | "on-prem";
    }[];
  };

  finalCta: {

    title: string;

    subtitle: string;

    primaryCta: string;

    secondaryCta: string;

  };

}



const en: WorkspaceGovernanceCopy = {

  seo: {

    title: "AI Governance for Teams | Wonka AI",

    description:

      "Manage who can use AI, track usage and costs, keep agents under control and share the same company rules across Wonka Workspace.",

  },

  hero: {

    eyebrow: "AI Governance",

    title: "Keep AI under control as your team grows.",

    subtitle:

      "Manage who can use what, track AI usage and keep your agents under control, all from one place.",

    cta: "Talk to a consultant",

    imageAlt: "Wonka Workspace admin settings",

  },

  features: {

    heading: "Governance built into everyday work",

    cards: {

      access: {

        title: "The right access for the right people.",

        body: "Manage users, create teams and decide which features, tools and company data each person can access. Not everyone needs access to everything.",

        imageAlt: "Team and access settings in Wonka Workspace",

      },

      usage: {

        title: "Know where your AI usage goes.",

        body: "Track AI usage, token consumption and costs across teams and individual employees. Set usage limits to keep spending under control.",

        imageAlt: "Wonka Workspace overview with connected tools",

      },

      agents: {

        title: "Keep your agents in check.",

        body: "Audit your AI agents, review their usage and adjust their configuration or AI model when needed. Changes to a shared agent are reflected for everyone using it.",

        imageAlt: "Agent configuration in Wonka Workspace",

      },

      sharedRules: {

        title: "Keep everyone working with the same rules.",

        body: "Set shared company instructions and knowledge, so teams work with consistent information and follow the same guidelines.",

        imageAlt: "Shared company knowledge in Wonka Workspace",

      },

    },

  },

  deployment: {
    eyebrow: "Hosting",
    title: "Deployment options that fit your security and scale needs.",
    options: [
      {
        id: "shared-eu",
        headline: "Shared EU cloud",
        body: "Wonka Workspace on multi-tenant infrastructure in Azure West Europe, with EU data residency by default.",
        tier: "Standard",
        featured: true,
        visual: "azure",
      },
      {
        id: "dedicated-saas",
        headline: "Dedicated environment",
        body: "A single-tenant deployment operated by Wonka, isolated from other customers while we run updates for you.",
        tier: "Enterprise",
        visual: "dedicated-azure",
      },
      {
        id: "byoc",
        headline: "Your cloud account",
        body: "Run Wonka in AWS, Azure or Google Cloud under your subscription, with Wonka managing the application layer.",
        tier: "Enterprise (custom)",
        visual: "multi-cloud",
      },
      {
        id: "on-prem",
        headline: "On your infrastructure",
        body: "Private Kubernetes clusters with Wonka-supported Helm charts when data must stay entirely in your datacenter.",
        tier: "Enterprise (custom)",
        visual: "on-prem",
      },
    ],
  },

  finalCta: {

    title: "Give your team AI. Keep the control.",

    subtitle:

      "Start using Wonka, or talk to our team about setting up AI safely across your company.",

    primaryCta: "Start free trial",

    secondaryCta: "Talk to a consultant",

  },

};



const fr: WorkspaceGovernanceCopy = {

  seo: {

    title: "Gouvernance IA pour vos équipes | Wonka AI",

    description:

      "Gérez qui utilise l'IA, suivez l'usage et les coûts, gardez vos agents sous contrôle et partagez les mêmes règles dans Wonka Workspace.",

  },

  hero: {

    eyebrow: "Gouvernance IA",

    title: "Gardez l'IA sous contrôle quand vos équipes grandissent.",

    subtitle:

      "Gérez qui peut utiliser quoi, suivez l'usage de l'IA et gardez vos agents sous contrôle, depuis un seul endroit.",

    cta: "Parler à un consultant",

    imageAlt: "Paramètres d'administration Wonka Workspace",

  },

  features: {

    heading: "Une gouvernance intégrée au travail quotidien",

    cards: {

      access: {

        title: "Le bon accès pour les bonnes personnes.",

        body: "Gérez les utilisateurs, créez des équipes et décidez quelles fonctionnalités, outils et données chaque personne peut utiliser. Tout le monde n'a pas besoin de tout.",

        imageAlt: "Paramètres d'équipe et d'accès dans Wonka Workspace",

      },

      usage: {

        title: "Sachez où va votre usage IA.",

        body: "Suivez l'usage de l'IA, la consommation de tokens et les coûts par équipe et par personne. Fixez des limites pour maîtriser les dépenses.",

        imageAlt: "Vue d'ensemble Wonka Workspace avec outils connectés",

      },

      agents: {

        title: "Gardez vos agents sous contrôle.",

        body: "Auditez vos agents IA, consultez leur usage et ajustez leur configuration ou modèle IA si nécessaire. Les changements sur un agent partagé s'appliquent à toute l'équipe.",

        imageAlt: "Configuration d'agent dans Wonka Workspace",

      },

      sharedRules: {

        title: "Les mêmes règles pour toute l'entreprise.",

        body: "Définissez des consignes et une connaissance partagées, pour que les équipes s'appuient sur les mêmes informations et suivent les mêmes lignes directrices.",

        imageAlt: "Connaissance d'entreprise partagée dans Wonka Workspace",

      },

    },

  },

  deployment: {
    eyebrow: "Hébergement",
    title: "Des options de déploiement adaptées à votre sécurité et à votre échelle.",
    options: [
      {
        id: "shared-eu",
        headline: "Cloud UE partagé",
        body: "Wonka Workspace en infrastructure multi-locataire dans Azure West Europe, avec résidence des données dans l'UE par défaut.",
        tier: "Standard",
        featured: true,
        visual: "azure",
      },
      {
        id: "dedicated-saas",
        headline: "Environnement dédié",
        body: "Un déploiement mono-locataire opéré par Wonka, isolé des autres clients, avec mises à jour gérées par nos équipes.",
        tier: "Enterprise",
        visual: "dedicated-azure",
      },
      {
        id: "byoc",
        headline: "Votre cloud",
        body: "Wonka dans AWS, Azure ou Google Cloud sous votre abonnement, Wonka gère la couche applicative.",
        tier: "Enterprise (sur mesure)",
        visual: "multi-cloud",
      },
      {
        id: "on-prem",
        headline: "Sur votre infrastructure",
        body: "Clusters Kubernetes privés avec charts Helm pris en charge par Wonka lorsque les données doivent rester dans votre datacenter.",
        tier: "Enterprise (sur mesure)",
        visual: "on-prem",
      },
    ],
  },

  finalCta: {

    title: "Donnez l'IA à vos équipes. Gardez le contrôle.",

    subtitle:

      "Commencez avec Wonka, ou échangez avec nous pour déployer l'IA en toute sécurité dans votre entreprise.",

    primaryCta: "Essai gratuit",

    secondaryCta: "Parler à un consultant",

  },

};



const nl: WorkspaceGovernanceCopy = {

  seo: {

    title: "AI-governance voor teams | Wonka AI",

    description:

      "Beheer wie AI gebruikt, volg usage en kosten, houd agents onder controle en deel dezelfde bedrijfsregels in Wonka Workspace.",

  },

  hero: {

    eyebrow: "AI-governance",

    title: "Houd AI onder controle terwijl uw team groeit.",

    subtitle:

      "Beheer wie wat mag gebruiken, volg AI-usage en houd uw agents onder controle, vanuit één plek.",

    cta: "Spreek een consultant",

    imageAlt: "Wonka Workspace-beheerinstellingen",

  },

  features: {

    heading: "Governance ingebouwd in dagelijks werk",

    cards: {

      access: {

        title: "De juiste toegang voor de juiste mensen.",

        body: "Beheer gebruikers, maak teams aan en bepaal welke functies, tools en bedrijfsdata elke persoon mag gebruiken. Niet iedereen heeft overal toegang toe nodig.",

        imageAlt: "Team- en toegangsinstellingen in Wonka Workspace",

      },

      usage: {

        title: "Weet waar uw AI-usage naartoe gaat.",

        body: "Volg AI-usage, tokenverbruik en kosten per team en per medewerker. Stel limieten in om uitgaven onder controle te houden.",

        imageAlt: "Wonka Workspace-overzicht met gekoppelde tools",

      },

      agents: {

        title: "Houd uw agents in toom.",

        body: "Audit uw AI-agents, bekijk hun usage en pas configuratie of AI-model aan wanneer nodig. Wijzigingen aan een gedeelde agent gelden voor iedereen die hem gebruikt.",

        imageAlt: "Agentconfiguratie in Wonka Workspace",

      },

      sharedRules: {

        title: "Dezelfde regels voor iedereen.",

        body: "Stel gedeelde bedrijfsinstructies en kennis in, zodat teams met consistente informatie werken en dezelfde richtlijnen volgen.",

        imageAlt: "Gedeelde bedrijfskennis in Wonka Workspace",

      },

    },

  },

  deployment: {
    eyebrow: "Hosting",
    title: "Deploy-opties die passen bij uw security en schaal.",
    options: [
      {
        id: "shared-eu",
        headline: "Gedeelde EU-cloud",
        body: "Wonka Workspace op multi-tenant infrastructuur in Azure West Europe, met EU-dataresidency standaard.",
        tier: "Standard",
        featured: true,
        visual: "azure",
      },
      {
        id: "dedicated-saas",
        headline: "Dedicated omgeving",
        body: "Single-tenant deployment beheerd door Wonka, gescheiden van andere klanten, met updates door ons team.",
        tier: "Enterprise",
        visual: "dedicated-azure",
      },
      {
        id: "byoc",
        headline: "Uw cloudaccount",
        body: "Wonka in AWS, Azure of Google Cloud onder uw abonnement; Wonka beheert de applicatielaag.",
        tier: "Enterprise (maatwerk)",
        visual: "multi-cloud",
      },
      {
        id: "on-prem",
        headline: "Op uw infrastructuur",
        body: "Private Kubernetes-clusters met Wonka-ondersteunde Helm charts wanneer data in uw datacenter moet blijven.",
        tier: "Enterprise (maatwerk)",
        visual: "on-prem",
      },
    ],
  },

  finalCta: {

    title: "Geef uw team AI. Behoud de controle.",

    subtitle:

      "Begin met Wonka, of bespreek met ons team hoe u AI veilig inzet in uw bedrijf.",

    primaryCta: "Gratis proberen",

    secondaryCta: "Spreek een consultant",

  },

};



export const WORKSPACE_GOVERNANCE_COPY: Record<Locale, WorkspaceGovernanceCopy> = {

  en,

  fr,

  nl,

};


