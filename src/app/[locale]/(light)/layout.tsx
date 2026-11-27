import { PageLayout } from "@/components/layout/page-layout";
import type { Locale } from "@/i18n/config";

export default async function LocalizedLightLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <PageLayout locale={locale as Locale} headerVariant="inline-light">
      {children}
    </PageLayout>
  );
}
