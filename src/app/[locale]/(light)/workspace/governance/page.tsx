import type { Metadata } from "next";

import type { Locale } from "@/i18n/config";

import { TRANSLATED_LOCALES } from "@/i18n/routes";

import {

  WorkspaceGovernanceView,

  workspaceGovernanceMetadata,

} from "@/views/workspace-governance";



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

  return workspaceGovernanceMetadata(locale as Locale);

}



export default async function LocalizedWorkspaceGovernancePage({ params }: PageProps) {

  const { locale } = await params;

  return <WorkspaceGovernanceView locale={locale as Locale} />;

}


