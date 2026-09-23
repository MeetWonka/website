import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const redirects = async () => [
  // EN: old → new
  { source: '/glossary', destination: '/learn', permanent: true },
  { source: '/glossary/:slug*', destination: '/learn/:slug*', permanent: true },
  { source: '/comparisons', destination: '/vs', permanent: true },
  { source: '/comparisons/:slug*', destination: '/vs/:slug*', permanent: true },
  { source: '/connectors', destination: '/integrations', permanent: true },
  { source: '/connectors/:slug*', destination: '/integrations/:slug*', permanent: true },
  // FR: old → new
  { source: '/fr/glossaire', destination: '/fr/apprendre', permanent: true },
  { source: '/fr/glossaire/:slug*', destination: '/fr/apprendre/:slug*', permanent: true },
  { source: '/fr/comparaisons', destination: '/fr/vs', permanent: true },
  { source: '/fr/comparaisons/:slug*', destination: '/fr/vs/:slug*', permanent: true },
  { source: '/fr/connecteurs', destination: '/fr/integrations', permanent: true },
  { source: '/fr/connecteurs/:slug*', destination: '/fr/integrations/:slug*', permanent: true },
  // NL: old → new
  { source: '/nl/woordenlijst', destination: '/nl/leren', permanent: true },
  { source: '/nl/woordenlijst/:slug*', destination: '/nl/leren/:slug*', permanent: true },
  { source: '/nl/vergelijkingen', destination: '/nl/vs', permanent: true },
  { source: '/nl/vergelijkingen/:slug*', destination: '/nl/vs/:slug*', permanent: true },
  { source: '/nl/connectoren', destination: '/nl/integrations', permanent: true },
  { source: '/nl/connectoren/:slug*', destination: '/nl/integrations/:slug*', permanent: true },
  // Legacy meetwonka.com paths — the meetwonka 301s preserve the old path,
  // so each one must land on its closest equivalent here (not a 404)
  { source: '/services/ai-strategy', destination: '/start-ai', permanent: true },
  { source: '/services/start-ai', destination: '/start-ai', permanent: true },
  { source: '/services/start-ai-en', destination: '/start-ai', permanent: true },
  { source: '/services/start-ai-nl', destination: '/start-ai', permanent: true },
  { source: '/services/start-ai-old', destination: '/start-ai', permanent: true },
  { source: '/products/wonka-chat-odoo', destination: '/wonka-chat/odoo', permanent: true },
  { source: '/products/wonka-chat', destination: '/wonka-chat', permanent: true },
  { source: '/products/:slug*', destination: '/ai-agents', permanent: true },
  { source: '/product/enterprise', destination: '/', permanent: true },
  { source: '/resources/itzu-enhances-hr-services-with-wonkas-ai-solutions', destination: '/case-studies', permanent: true },
  { source: '/resources/ima-benelux-revolutionizing-customer-assistance-with-ai-powered-solutions', destination: '/case-studies', permanent: true },
  { source: '/resources/luminus-embracing-ai-at-all-levels-of-the-organisation', destination: '/case-studies', permanent: true },
  { source: '/resources/crf-wallonie-reimagining-public-sector-hr-with-ai', destination: '/case-studies', permanent: true },
  { source: '/resources/ingenium-co-creation-of-a-practical-people-first-approach-to-ai-adoption', destination: '/case-studies', permanent: true },
  { source: '/resources/how-ais-channel-is-using-ai-to-democratise-surgical-education', destination: '/case-studies', permanent: true },
  { source: '/resources/:slug*', destination: '/blog', permanent: true },
  { source: '/resources', destination: '/blog', permanent: true },
  { source: '/post/:slug*', destination: '/blog', permanent: true },
  { source: '/team', destination: '/', permanent: true },
  { source: '/fr/contact', destination: '/contact', permanent: true },
  { source: '/book-a-meeting', destination: '/', permanent: true },
  // Blog posts → short comparison pages (DISABLED until /vs/dust and /vs/langdock confirmed 200)
  // { source: '/blog/wonka-vs-dust', destination: '/vs/dust', permanent: true },
  // { source: '/fr/blog/fr-wonka-vs-dust', destination: '/fr/vs/dust', permanent: true },
  // { source: '/blog/wonka-vs-langdock', destination: '/vs/langdock', permanent: true },
  // { source: '/fr/blog/fr-wonka-vs-langdock', destination: '/fr/vs/langdock', permanent: true },
];

const headers = async () => [
  {
    source: '/fr/:path*',
    headers: [{ key: 'Content-Language', value: 'fr-FR' }],
  },
  {
    source: '/nl/:path*',
    headers: [{ key: 'Content-Language', value: 'nl-BE' }],
  },
];

const config: NextConfig = {
  redirects,
  headers,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'img.logo.dev' },
      { protocol: 'https', hostname: 'stwonkachatpweu001.blob.core.windows.net' },
    ],
    qualities: [75, 90],
  },
};

export default withNextIntl(config);
