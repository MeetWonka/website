import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { TRANSLATED_LOCALES } from "@/i18n/routes";
import {
  WorkspacePage,
  workspaceMetadata,
} from "@/components/pages/workspace-page";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return TRANSLATED_LOCALES.map((locale) => ({ locale }));
}

// Workspace product overview at `/{locale}/workspace`.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return workspaceMetadata(locale as Locale);
}

export default async function LocalizedWorkspacePage({ params }: PageProps) {
  const { locale } = await params;
  return <WorkspacePage locale={locale as Locale} />;
}
