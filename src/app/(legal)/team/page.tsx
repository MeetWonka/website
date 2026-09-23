import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import type { SeoData } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/team";
const h1 = "Team";
const title = "Team | Wonka";
const description = "Meet the team behind Wonka AI.";

const seo: SeoData = {
  metaTitle: title,
  metaDescription: description,
  ogImage: null,
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, { path: pagePath, fallbackTitle: title });
}

export default function TeamPage() {
  return (
    <Section className="bg-background py-16 md:py-24" containerClassName="max-w-[48rem]">
      <header className="border-b border-dashed border-border pb-8">
        <h1 className="type-h3 text-text">{h1}</h1>
      </header>
    </Section>
  );
}
