import {
  resolveItems,
  resolveOptionalString,
  resolveSectionHeader,
} from "@/lib/resolve-cms";
import { CONTACT_DEFAULTS } from "@/lib/page-defaults/contact";
import type { SeoData } from "@/lib/types";
import type {
  ContactPageContent,
  ContactPageResolved,
  ContactPersonData,
  ContactPersonResolved,
} from "@/lib/types/page-sections";

function resolveSeo(
  cms: SeoData | null | undefined,
  defaults: SeoData | null,
): SeoData | null {
  if (!cms && !defaults) return null;
  return {
    metaTitle: resolveOptionalString(cms?.metaTitle, defaults?.metaTitle ?? null),
    metaDescription: resolveOptionalString(
      cms?.metaDescription,
      defaults?.metaDescription ?? null,
    ),
    ogImage: cms?.ogImage ?? defaults?.ogImage ?? null,
  };
}

function resolveContactPeople(
  cms: ContactPersonData[] | null | undefined,
  defaults: ContactPersonResolved[],
): ContactPersonResolved[] {
  const source = cms?.length ? cms : defaults;

  return source.map((person, index) => {
    const fallback = defaults[index] ?? defaults[0];

    return {
      _key: person._key,
      portrait: person.portrait,
      name: resolveOptionalString(person.name, fallback?.name ?? "") ?? "",
      role: resolveOptionalString(person.role, fallback?.role ?? null),
      email: resolveOptionalString(person.email, fallback?.email ?? "") ?? "",
      fallbackPortrait: fallback?.fallbackPortrait ?? null,
    };
  });
}

export function resolveContactPageContent(
  cms: ContactPageContent | null,
): ContactPageResolved {
  const d = CONTACT_DEFAULTS;

  return {
    general: {
      header: resolveSectionHeader(cms?.general?.header, d.general.header),
      details: resolveItems(cms?.general?.details, d.general.details ?? []),
    },
    team: {
      header: resolveSectionHeader(cms?.team?.header, d.team.header),
      people: resolveContactPeople(cms?.team?.people, d.team.people),
    },
    seo: resolveSeo(cms?.seo, d.seo),
  };
}
