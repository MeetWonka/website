import type { Locale } from "@/i18n/config";

export type ArchivedPlatformChapterId = "team" | "triggers" | "analytics";

export interface ArchivedPlatformChaptersCopy {
  eyebrow: string;
  title: string;
  chapters: {
    id: ArchivedPlatformChapterId;
    title: string;
    body: string;
  }[];
}

const en: ArchivedPlatformChaptersCopy = {
  eyebrow: "What changes",
  title: "When AI actually works, three things happen.",
  chapters: [
    {
      id: "team",
      title: "More people use it.",
      body: "AI becomes useful for entire teams, not just the people who already know how to prompt.",
    },
    {
      id: "triggers",
      title: "More work gets done.",
      body: "AI moves beyond answering questions and starts taking repetitive work off your team's plate.",
    },
    {
      id: "analytics",
      title: "You stay in control.",
      body: "Scale AI across teams, tools and processes without losing control of access, data or spend.",
    },
  ],
};

const fr: ArchivedPlatformChaptersCopy = {
  eyebrow: "Ce qui change",
  title: "Quand l'IA fonctionne vraiment, trois choses se passent.",
  chapters: [
    {
      id: "team",
      title: "Plus de monde l'utilise.",
      body: "L'IA devient utile pour des équipes entières, pas seulement pour ceux qui savent déjà prompter.",
    },
    {
      id: "triggers",
      title: "Plus de travail avance.",
      body: "L'IA dépasse les réponses aux questions et commence à retirer le travail répétitif de vos équipes.",
    },
    {
      id: "analytics",
      title: "Vous gardez le contrôle.",
      body: "Déployez l'IA dans les équipes, les outils et les processus sans perdre le contrôle des accès, des données ou des dépenses.",
    },
  ],
};

const nl: ArchivedPlatformChaptersCopy = {
  eyebrow: "Wat er verandert",
  title: "Wanneer AI echt werkt, gebeuren drie dingen.",
  chapters: [
    {
      id: "team",
      title: "Meer mensen gebruiken het.",
      body: "AI wordt nuttig voor hele teams, niet alleen voor wie al weet hoe te prompten.",
    },
    {
      id: "triggers",
      title: "Er gebeurt meer werk.",
      body: "AI blijft niet bij vragen beantwoorden en neemt repetitief werk uit handen van uw team.",
    },
    {
      id: "analytics",
      title: "U houdt controle.",
      body: "Schaal AI over teams, tools en processen zonder controle over toegang, data of spend te verliezen.",
    },
  ],
};

export const ARCHIVED_HOME_V2_PLATFORM_CHAPTERS_COPY: Record<
  Locale,
  ArchivedPlatformChaptersCopy
> = { en, fr, nl };
