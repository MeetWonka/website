import type { Locale } from "@/i18n/config";

export type ModelsSectionModelId = "openai" | "claude" | "gemini" | "mistral";

export interface ModelsSectionCopy {
  eyebrow: string;
  title: string;
  body: string;
  auto: string;
  light: string;
  advanced: string;
  tasks: {
    task: string;
    model: ModelsSectionModelId;
    tier: "light" | "advanced";
  }[];
  savings: {
    sliderLeft: string;
    sliderRight: string;
    outcomeUpTo: string;
    outcomeSuffix: string;
    supportingLine: string;
    source: string;
  };
}

const en: ModelsSectionCopy = {
  eyebrow: "Smarter model use",
  title: "Don't build your AI strategy around one model.",
  body: "Different tasks need different models, and not every task needs the most powerful one. Use the right AI for each job, without paying for power you don't need.",
  auto: "Auto",
  light: "Light model",
  advanced: "Advanced model",
  tasks: [
    { task: "Sort 2,000 incoming emails", model: "openai", tier: "light" },
    { task: "Summarise a meeting", model: "gemini", tier: "light" },
    { task: "Write a commercial offer", model: "claude", tier: "advanced" },
    { task: "Summarise HR files", model: "mistral", tier: "light" },
  ],
  savings: {
    sliderLeft: "Everything on the strongest model",
    sliderRight: "Every suitable task on a lighter model",
    outcomeUpTo: "Up to",
    outcomeSuffix: "lower model costs",
    supportingLine:
      "Use premium models where they add value, and lighter models where they get the job done.",
    source:
      "Illustrative estimate based on Wonka Workspace token rates: Claude Opus 5.5 at $5.50 input / $27.50 output per million tokens versus GPT-5.6 Luna at $0.22 / $1.32, assuming 3 input tokens for every 1 output token.",
  },
};

const fr: ModelsSectionCopy = {
  eyebrow: "Usage plus intelligent des modèles",
  title: "Ne basez pas votre stratégie IA sur un seul modèle.",
  body: "Chaque tâche demande un modèle adapté, et toutes n'ont pas besoin du plus puissant. Utilisez la bonne IA pour chaque travail, sans payer pour une puissance dont vous n'avez pas besoin.",
  auto: "Auto",
  light: "Modèle léger",
  advanced: "Modèle avancé",
  tasks: [
    { task: "Trier 2 000 mails entrants", model: "openai", tier: "light" },
    { task: "Résumer une réunion", model: "gemini", tier: "light" },
    {
      task: "Rédiger une offre commerciale",
      model: "claude",
      tier: "advanced",
    },
    { task: "Synthétiser des dossiers RH", model: "mistral", tier: "light" },
  ],
  savings: {
    sliderLeft: "Tout sur le modèle le plus puissant",
    sliderRight: "Chaque tâche adaptée sur un modèle plus léger",
    outcomeUpTo: "Jusqu'à",
    outcomeSuffix: "de coûts modèles en moins",
    supportingLine:
      "Utilisez les modèles premium là où ils apportent de la valeur, et des modèles plus légers là où ils suffisent.",
    source:
      "Estimation illustrative basée sur les tarifs Wonka Workspace par million de tokens : Claude Opus 5.5 à 5,50 $ en entrée / 27,50 $ en sortie contre GPT-5.6 Luna à 0,22 $ / 1,32 $, en supposant 3 tokens d'entrée pour 1 token de sortie.",
  },
};

const nl: ModelsSectionCopy = {
  eyebrow: "Slimmer modelgebruik",
  title: "Bouw uw AI-strategie niet rond één model.",
  body: "Verschillende taken vragen verschillende modellen, en niet elke taak heeft het krachtigste nodig. Gebruik de juiste AI per klus, zonder te betalen voor kracht die u niet nodig hebt.",
  auto: "Auto",
  light: "Licht model",
  advanced: "Geavanceerd model",
  tasks: [
    {
      task: "2.000 inkomende mails sorteren",
      model: "openai",
      tier: "light",
    },
    { task: "Een vergadering samenvatten", model: "gemini", tier: "light" },
    {
      task: "Een commerciële offerte schrijven",
      model: "claude",
      tier: "advanced",
    },
    { task: "HR-dossiers samenvatten", model: "mistral", tier: "light" },
  ],
  savings: {
    sliderLeft: "Alles op het krachtigste model",
    sliderRight: "Elke geschikte taak op een lichter model",
    outcomeUpTo: "Tot",
    outcomeSuffix: "lagere modelkosten",
    supportingLine:
      "Zet premium modellen in waar ze waarde toevoegen, en lichtere modellen waar ze het werk doen.",
    source:
      "Illustratieve schatting op basis van Wonka Workspace-tokens: Claude Opus 5.5 aan $5,50 input / $27,50 output per miljoen tokens versus GPT-5.6 Luna aan $0,22 / $1,32, uitgaande van 3 inputtokens per 1 outputtoken.",
  },
};

export const MODELS_SECTION_COPY: Record<Locale, ModelsSectionCopy> = {
  en,
  fr,
  nl,
};

export function getModelsSectionCopy(locale: Locale): ModelsSectionCopy {
  return MODELS_SECTION_COPY[locale];
}
