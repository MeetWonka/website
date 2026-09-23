import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieConsentProvider } from "@/components/cookie-consent/cookie-consent-provider";
import { InlineScript } from "@/components/inline-script";
import { JsonLd } from "@/components/json-ld/json-ld";
import { MetaPixel } from "@/components/meta-pixel";
import { ApolloTracker } from "@/components/apollo-tracker";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { gtSectra, interDisplay } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { getSiteUrl } from "@/lib/site-url";
import "@/styles/globals.css";

const GTM_ID = "GTM-5LCPHCRF";
const SITE_URL = getSiteUrl();

const priorityPages = [
  {
    name: "AI Agents",
    url: `${SITE_URL}/ai-agents`,
    description: "Private AI agents connected to the business tools your company already uses.",
  },
  {
    name: "Integrations",
    url: `${SITE_URL}/integrations`,
    description: "Connect Wonka AI to Odoo, Microsoft 365, CRM, ERP and internal knowledge systems.",
  },
  {
    name: "Start AI",
    url: `${SITE_URL}/start-ai`,
    description: "A practical program to identify, prioritize and launch enterprise AI use cases.",
  },
  {
    name: "Wonka Build",
    url: `${SITE_URL}/wonka-build`,
    description: "Custom AI applications built for your systems and day-to-day workflows.",
  },
  {
    name: "Case Studies",
    url: `${SITE_URL}/case-studies`,
    description: "Customer stories and examples of private enterprise AI deployments.",
  },
  {
    name: "Blog",
    url: `${SITE_URL}/blog`,
    description: "Insights on enterprise AI, private LLMs, automation and AI agents.",
  },
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Wonka AI",
  alternateName: ["Wonka", "WonkaChat"],
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  hasPart: priorityPages.map((page) => ({
    "@type": "WebPage",
    name: page.name,
    url: page.url,
    description: page.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
  })),
};

const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/#site-navigation`,
  name: "Wonka AI primary pages",
  itemListElement: priorityPages.map((page, index) => ({
    "@type": "SiteNavigationElement",
    position: index + 1,
    name: page.name,
    url: page.url,
    description: page.description,
  })),
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Wonka AI",
  url: SITE_URL,
  logo: `${SITE_URL}/opengraph-image.jpg`,
  sameAs: [
    "https://www.linkedin.com/company/wonka-ai",
  ],
  description:
    "Wonka AI deploys private enterprise AI agents connected to your existing tools. ISO 27001 certified. GDPR compliant. NIS 2 compliant. SOC 2 Type II in progress. Hosted in Azure West Europe (Microsoft Ireland).",
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: "Wonka AI - Private Enterprise AI Agents",
      template: "%s – Wonka AI",
    },
    description:
      "Deploy private AI agents inside your company. Connected to Odoo, SharePoint, Salesforce and Slack, with GDPR compliance. Hosted in Azure West Europe (Microsoft Ireland).",
    robots: {
      index: true,
      follow: true,
    },
    // No canonical here — each page sets its own via buildMetadata
    // No hreflang here — [locale]/layout.tsx and buildMetadata handle it per-page
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={cn(interDisplay.variable, gtSectra.variable)}>
      <body className="font-sans antialiased">
        {GTM_ID && (
          <>
            <InlineScript
              id="gtm-consent-default"
              html={`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`}
            />
            <InlineScript
              id="gtm-script"
              html={`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
            />
          </>
        )}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <CookieConsentProvider>
          <AnalyticsProvider />
          {children}
          <ApolloTracker />
          <MetaPixel />
        </CookieConsentProvider>
        <Analytics />
        <JsonLd id="schema-website" data={websiteSchema} />
        <JsonLd id="schema-site-navigation" data={siteNavigationSchema} />
        <JsonLd id="schema-organization" data={organizationSchema} />
        <SpeedInsights />
      </body>
    </html>
  );
}
