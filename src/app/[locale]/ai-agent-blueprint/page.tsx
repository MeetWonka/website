import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgentBlueprintExperience } from "@/components/agent-blueprint/agent-blueprint-experience";
import {
  BlueprintFaq,
  BlueprintSteps,
  BlueprintToWonkaChat,
  BlueprintTrust,
  BlueprintValueStack,
} from "@/components/agent-blueprint/blueprint-sections";
import { Problem } from "@/components/sections/problem";
import { Stats } from "@/components/sections/stats";
import { BreadcrumbSchema } from "@/components/json-ld";
import { PageLayout } from "@/components/layout/page-layout";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

const localized = {
  fr: {
    path: "/fr/ai-agent-blueprint",
    title: "Plan gratuit d’agents IA pour votre entreprise | Wonka AI",
    description: "Obtenez des pistes d’agents IA anonymisées, adaptées à votre activité et comparées à 570 cas d’usage réels.",
    home: "Accueil",
    breadcrumb: "Plan d’agents IA",
    problemLabel: "Problème",
    awardBadge: "Plan gratuit d’agents IA",
  },
  nl: {
    path: "/nl/ai-agent-blueprint",
    title: "Gratis AI-agentplan voor je bedrijf | Wonka AI",
    description: "Ontvang anonieme voorstellen voor AI-agents, afgestemd op je bedrijfswerking en vergeleken met 570 echte usecases.",
    home: "Home",
    breadcrumb: "AI-agentplan",
    problemLabel: "Het probleem",
    awardBadge: "Gratis AI-agentplan",
  },
} satisfies Record<"fr" | "nl", {
  path: string;
  title: string;
  description: string;
  home: string;
  breadcrumb: string;
  problemLabel: string;
  awardBadge: string;
}>;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "nl" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "fr" && locale !== "nl") notFound();

  const page = localized[locale];
  const siteUrl = getSiteUrl();
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: {
      canonical: `${siteUrl}${page.path}`,
      languages: {
        "en-US": `${siteUrl}/ai-agent-blueprint`,
        "fr-FR": `${siteUrl}/fr/ai-agent-blueprint`,
        "nl-BE": `${siteUrl}/nl/ai-agent-blueprint`,
        "x-default": `${siteUrl}/ai-agent-blueprint`,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteUrl}${page.path}`,
      type: "website",
      siteName: "Wonka AI",
      locale: locale === "fr" ? "fr_FR" : "nl_BE",
      images: [
        {
          url: "/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: "Wonka AI",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/opengraph-image.jpg"],
    },
  };
}

export default async function LocalizedAgentBlueprintPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (rawLocale !== "fr" && rawLocale !== "nl") notFound();
  const locale: "fr" | "nl" = rawLocale;
  const page = localized[locale];
  const siteUrl = getSiteUrl();
  const meetingUrl =
    "https://bookings.cloud.microsoft/book/WonkaAI@meetwonka.com/?ismsaljsauthenabled";
  const wonkaChatUrl = "https://wonka.chat";
  const problemItems = locale === "fr"
    ? [
        { tag: "h2" as const, content: "L’IA aide déjà certaines personnes." },
        { tag: "p" as const, content: "Mais les bonnes méthodes restent individuelles." },
        { tag: "p" as const, content: "Le reste de l’équipe cherche encore, vérifie et recopie les mêmes informations." },
        { tag: "p" as const, content: "Les agents IA peuvent prendre en charge une partie de ce travail." },
        { tag: "p" as const, content: "À condition de les concevoir autour de vos vrais processus." },
      ]
    : [
        { tag: "h2" as const, content: "AI helpt sommige collega’s al." },
        { tag: "p" as const, content: "Maar goede werkwijzen blijven vaak individueel." },
        { tag: "p" as const, content: "De rest van het team zoekt, controleert en kopieert dezelfde informatie." },
        { tag: "p" as const, content: "AI-agents kunnen een deel van dat werk overnemen." },
        { tag: "p" as const, content: "Als je ze bouwt rond echte bedrijfsprocessen." },
      ];

  return (
    <PageLayout locale={locale}>
      <div lang={locale}>
        <BreadcrumbSchema
          items={[
            { name: page.home, url: siteUrl },
            { name: page.breadcrumb, url: `${siteUrl}${page.path}` },
          ]}
        />
        <AgentBlueprintExperience
          locale={locale}
          meetingUrl={meetingUrl}
          wonkaChatUrl={wonkaChatUrl}
          awardBadge={page.awardBadge}
        >
          <Problem id="problem" items={problemItems} />
          <BlueprintValueStack locale={locale} />
          <BlueprintSteps locale={locale} />
          <BlueprintToWonkaChat
            locale={locale}
            wonkaChatUrl={wonkaChatUrl}
            meetingUrl={meetingUrl}
          />
          <div className="flex flex-col gap-10 py-10 md:gap-16 md:py-16">
            <Stats />
            <BlueprintTrust locale={locale} />
          </div>
          <BlueprintFaq locale={locale} />
        </AgentBlueprintExperience>
      </div>
    </PageLayout>
  );
}
