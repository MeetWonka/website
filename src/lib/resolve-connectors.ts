import { urlFor } from "@sanity/lib/image";
import type { Locale } from "@/i18n/config";
import type { ConnectorPage, FaqItem, SeoData, UseCase } from "@/lib/types";
import {
  getCatalogIntegration,
  INTEGRATIONS_CATALOG,
  type CatalogIntegration,
  type IntegrationCategory,
} from "@/lib/page-defaults/integrations-catalog";
import { buildIntegrationDefaults, integrationCategoryLabel } from "@/lib/page-defaults/integrations-copy";

export interface ConnectorView {
  id: string;
  slug: string;
  toolName: string;
  tagline: string;
  description: string;
  useCases: UseCase[];
  tags: string[];
  faq: FaqItem[];
  seo: SeoData | null;
  logoSrc: string | null;
  logoAlt: string;
  category: IntegrationCategory | null;
  categoryLabel: string | null;
}

function sanityLogoUrl(doc: ConnectorPage | null): string | null {
  return doc?.toolLogo ? urlFor(doc.toolLogo).width(160).height(160).fit("max").url() : null;
}

function mergeConnector(
  doc: ConnectorPage | null,
  integration: CatalogIntegration | undefined,
  slug: string,
  locale: Locale,
): ConnectorView | null {
  if (!doc && !integration) return null;
  const defaults = integration ? buildIntegrationDefaults(integration, locale) : null;
  const toolName = doc?.toolName || integration?.name || slug;

  return {
    id: doc?._id ?? `catalog-${slug}-${locale}`,
    slug,
    toolName,
    tagline: doc?.tagline || defaults?.tagline || "",
    description: doc?.description || defaults?.description || "",
    useCases: doc?.useCases?.length ? doc.useCases : defaults?.useCases ?? [],
    tags: doc?.tags?.length ? doc.tags : defaults?.tags ?? [],
    faq: doc?.faq?.length ? doc.faq : defaults?.faq ?? [],
    seo: doc?.seo ?? null,
    logoSrc: sanityLogoUrl(doc) ?? integration?.logo ?? null,
    logoAlt: doc?.toolLogo?.alt || `${toolName} logo`,
    category: integration?.category ?? null,
    categoryLabel: integration ? integrationCategoryLabel(integration.category, locale) : null,
  };
}

export function resolveConnector(doc: ConnectorPage | null, slug: string, locale: Locale): ConnectorView | null {
  return mergeConnector(doc, getCatalogIntegration(slug), slug, locale);
}

export function resolveConnectorList(docs: ConnectorPage[], locale: Locale): ConnectorView[] {
  const bySlug = new Map(docs.map((doc) => [doc.slug.current, doc]));
  const slugs = new Set([...INTEGRATIONS_CATALOG.map((integration) => integration.slug), ...bySlug.keys()]);

  return [...slugs]
    .map((slug) => resolveConnector(bySlug.get(slug) ?? null, slug, locale))
    .filter((connector): connector is ConnectorView => connector !== null)
    .sort((a, b) => a.toolName.localeCompare(b.toolName));
}

export function relatedConnectors(all: ConnectorView[], current: ConnectorView, limit = 4): ConnectorView[] {
  return all
    .filter((connector) => connector.slug !== current.slug)
    .filter((connector) =>
      (current.category && connector.category === current.category) ||
      connector.tags.some((tag) => current.tags.includes(tag)),
    )
    .slice(0, limit);
}

export const CATALOG_SLUGS = INTEGRATIONS_CATALOG.map((integration) => integration.slug);
