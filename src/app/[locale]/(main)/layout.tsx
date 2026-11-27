import { PageLayout } from "@/components/layout/page-layout";
import type { Locale } from "@/i18n/config";

export default async function LocalizedMainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <PageLayout locale={locale as Locale}>
      {children}
    </PageLayout>
  );
}
