import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import type { SeoData } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/about";
const h1 = "About Wonka";
const title = "About Wonka | Wonka";
const description = "Learn about Wonka AI and our mission for enterprise AI.";

const seo: SeoData = {
  metaTitle: title,
  metaDescription: description,
  ogImage: null,
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, { path: pagePath, fallbackTitle: title });
}

export default function AboutPage() {
  return (
    <Section className="bg-background py-16 md:py-24" containerClassName="max-w-[48rem]">
      <header className="border-b border-dashed border-border pb-8">
        <h1 className="type-h3 text-text">{h1}</h1>
      </header>
    </Section>
  );
}
