import type { Locale } from '@/i18n/config';

const segments: Record<string, Record<Locale, string>> = {
  blog: { en: 'blog', fr: 'blog', nl: 'blog' },
  connectors: { en: 'integrations', fr: 'integrations', nl: 'integrations' },
  glossary: { en: 'learn', fr: 'apprendre', nl: 'leren' },
  comparisons: { en: 'vs', fr: 'vs', nl: 'vs' },
  'case-studies': { en: 'case-studies', fr: 'cas-clients', nl: 'klantcases' },
};

export function hubPath(section: keyof typeof segments, locale: Locale): string {
  const seg = segments[section][locale];
  return locale === 'en' ? `/${seg}` : `/${locale}/${seg}`;
}

export function itemPath(section: keyof typeof segments, locale: Locale, slug: string): string {
  const seg = segments[section][locale];
  return locale === 'en' ? `/${seg}/${slug}` : `/${locale}/${seg}/${slug}`;
}
