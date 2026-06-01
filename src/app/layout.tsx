import type { Metadata } from "next";
import Script from "next/script";
import { fontVariables } from "@/lib/fonts";
import { CookieConsentProvider } from "@/components/cookie-consent/cookie-consent-provider";
import { getSiteUrl } from "@/lib/site-url";
import "@/styles/globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const SITE_URL = "https://wonka-ai.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wonka AI",
  url: SITE_URL,
  logo: `${SITE_URL}/opengraph-image.jpg`,
  sameAs: [
    "https://www.linkedin.com/company/wonka-ai",
    "https://twitter.com/wonka_ai",
  ],
  description:
    "Wonka AI automates LinkedIn prospecting and sales outreach with AI, helping sales teams book more meetings and close more deals.",
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Wonka AI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "AI-powered LinkedIn prospecting and sales automation platform. Automate outreach, personalize messages at scale, and let your whole team prospect smarter.",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    availability: "https://schema.org/OnlineOnly",
  },
  featureList: [
    "AI LinkedIn prospecting",
    "Automated sales outreach",
    "Personalized message generation",
    "Sales pipeline automation",
    "Team collaboration for sales",
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: "Wonka AI – AI-Powered LinkedIn Prospecting & Sales Automation",
      template: "%s – Wonka AI",
    },
    description:
      "Wonka AI automates LinkedIn prospecting and sales outreach with AI. Help your whole team prospect smarter, book more meetings, and close more deals.",
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fontVariables}>
        {GTM_ID && (
          <>
            <Script
              id="gtm-consent-default"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`,
              }}
            />
            <Script
              id="gtm-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
              }}
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
        <CookieConsentProvider>{children}</CookieConsentProvider>
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="schema-software-application"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
      </body>
    </html>
  );
}
