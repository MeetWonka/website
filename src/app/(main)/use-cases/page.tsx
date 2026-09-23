import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { headingClass } from "@/lib/design-tokens";
import { buildMetadata } from "@/lib/seo";
import type { SeoData } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/use-cases";
const h1 = "Use cases";
const title = "Use cases | Wonka";
const description = "The work AI already takes over in enterprise organisations.";

const seo: SeoData = {
  metaTitle: title,
  metaDescription: description,
  ogImage: null,
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, { path: pagePath, fallbackTitle: title });
}

export default function UseCasesPage() {
  return (
    <main className="bg-background text-text">
      <Section
        className="py-16 pt-32 md:py-24 md:pt-40"
        containerClassName="max-w-[48rem]"
      >
        <h1 className={headingClass.hero}>{h1}</h1>
      </Section>
    </main>
  );
}
