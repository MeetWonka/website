import { HtmlLang } from "@/components/html-lang";
import { PageLayout } from "@/components/layout/page-layout";

/** French-only landing pages that live outside the [locale] tree. */
export default function MainFrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageLayout locale="fr">
      <HtmlLang lang="fr" />
      {children}
    </PageLayout>
  );
}
