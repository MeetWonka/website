import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/config';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Locale-prefixed paths (fr/nl)
    '/fr',
    '/fr/:path*',
    '/nl',
    '/nl/:path*',
    // English content hub paths
    '/(blog|integrations|learn|vs|case-studies)(.*)',
    // Localized path variants
    '/(apprendre|leren|cas-clients|klantcases)(.*)',
  ],
};
