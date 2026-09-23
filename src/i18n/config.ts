import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr', 'nl'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
  pathnames: {
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/connectors': {
      en: '/integrations',
      fr: '/integrations',
      nl: '/integrations',
    },
    '/connectors/[slug]': {
      en: '/integrations/[slug]',
      fr: '/integrations/[slug]',
      nl: '/integrations/[slug]',
    },
    '/glossary': {
      en: '/learn',
      fr: '/apprendre',
      nl: '/leren',
    },
    '/glossary/[slug]': {
      en: '/learn/[slug]',
      fr: '/apprendre/[slug]',
      nl: '/leren/[slug]',
    },
    '/comparisons': {
      en: '/vs',
      fr: '/vs',
      nl: '/vs',
    },
    '/comparisons/[slug]': {
      en: '/vs/[slug]',
      fr: '/vs/[slug]',
      nl: '/vs/[slug]',
    },
    '/case-studies': {
      en: '/case-studies',
      fr: '/cas-clients',
      nl: '/klantcases',
    },
    '/case-studies/[slug]': {
      en: '/case-studies/[slug]',
      fr: '/cas-clients/[slug]',
      nl: '/klantcases/[slug]',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
