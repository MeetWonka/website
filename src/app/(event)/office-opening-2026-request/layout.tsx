import { PageLayout } from "@/components/layout/page-layout";

export default function OfficeOpeningRequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout headerVariant="overlay-dark">{children}</PageLayout>;
}
