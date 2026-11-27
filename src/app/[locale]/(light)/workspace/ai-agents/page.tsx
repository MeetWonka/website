import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { TRANSLATED_LOCALES } from "@/i18n/routes";
import {
  WorkspaceAiAgentsView,
  workspaceAiAgentsMetadata,
} from "@/views/workspace-ai-agents";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return TRANSLATED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return workspaceAiAgentsMetadata(locale as Locale);
}

export default async function LocalizedWorkspaceAiAgentsPage({ params }: PageProps) {
  const { locale } = await params;
  return <WorkspaceAiAgentsView locale={locale as Locale} />;
}
