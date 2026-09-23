import type { FaqItem } from "@/lib/types";
import { getSiteUrl } from "@/lib/site-url";
import { JsonLd } from "./json-ld";

interface ArticleSchemaProps {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
}

export function ArticleSchema({ title, description, publishedAt, url, imageUrl }: ArticleSchemaProps) {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: publishedAt,
    url,
    publisher: {
      "@type": "Organization",
      name: "Wonka AI",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/opengraph-image.jpg` },
    },
    ...(imageUrl && { image: imageUrl }),
  };
  return <JsonLd id="schema-article" data={schema} />;
}

export function FaqSchema({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return <JsonLd id="schema-faq" data={schema} />;
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLd id="schema-breadcrumb" data={schema} />;
}

export function DefinedTermSchema({ term, definition, url }: { term: string; definition: string; url: string }) {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description: definition,
    url,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Wonka AI Glossary",
      url: `${siteUrl}/learn`,
    },
  };
  return <JsonLd id="schema-defined-term" data={schema} />;
}

export function SoftwareAppSchema({ name, description, url, features }: {
  name: string; description: string; url: string; features: string[];
}) {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType: "Private enterprise AI integration",
    provider: {
      "@type": "Organization",
      name: "Wonka AI",
      url: siteUrl,
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Enterprise teams",
    },
    areaServed: ["European Union", "United Kingdom"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${name} capabilities`,
      itemListElement: features.map((feature) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: feature,
        },
      })),
    },
    offers: {
      "@type": "Offer",
      url,
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/OnlineOnly",
    },
  };
  return <JsonLd id="schema-service" data={schema} />;
}
