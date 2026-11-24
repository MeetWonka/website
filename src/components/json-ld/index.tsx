import type { FaqItem } from "@/lib/types";
import { getSiteUrl } from "@/lib/site-url";
import { JsonLd } from "./json-ld";

interface ArticleSchemaProps {
  title: string;
  description: string;
  publishedAt: string;
  /** Last edit date; falls back to publishedAt. */
  updatedAt?: string | null;
  url: string;
  imageUrl?: string;
  inLanguage?: string;
}

export function ArticleSchema({ title, description, publishedAt, updatedAt, url, imageUrl, inLanguage }: ArticleSchemaProps) {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    url,
    mainEntityOfPage: url,
    ...(inLanguage && { inLanguage }),
    author: {
      "@type": "Organization",
      name: "Wonka AI",
      url: siteUrl,
    },
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

export interface ProductOffer {
  name: string;
  price: number;
  description: string;
}

export function ProductOffersSchema({ name, description, url, offers }: {
  name: string;
  description: string;
  url: string;
  offers: ProductOffer[];
}) {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    brand: { "@type": "Organization", name: "Wonka AI", url: siteUrl },
    offers: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      description: offer.description,
      url,
      priceCurrency: "EUR",
      price: offer.price.toFixed(2),
      availability: "https://schema.org/OnlineOnly",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: offer.price.toFixed(2),
        priceCurrency: "EUR",
        valueAddedTaxIncluded: false,
        unitText: "per user per month",
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
      },
    })),
  };
  return <JsonLd id="schema-product-offers" data={schema} />;
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
