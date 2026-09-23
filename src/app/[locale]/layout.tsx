import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getSiteUrl } from '@/lib/site-url';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  const siteUrl = getSiteUrl();

  const alternateLanguages: Record<string, string> = {};
  locales.forEach((l) => {
    alternateLanguages[l === 'en' ? 'en-US' : l === 'fr' ? 'fr-FR' : 'nl-BE'] =
      l === 'en' ? siteUrl : `${siteUrl}/${l}`;
  });

  return {
    alternates: {
      languages: {
        ...alternateLanguages,
        'x-default': siteUrl,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
