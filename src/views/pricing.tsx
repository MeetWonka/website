import type { Metadata } from "next";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import {
  FaqSchema,
  ProductOffersSchema,
  type ProductOffer,
} from "@/components/json-ld";
import { FaqSection } from "@/components/sections/faq-section";
import { PricingClosingCta } from "@/components/sections/pricing-closing-cta";
import { PricingLogoMarquee } from "@/components/sections/pricing-logo-marquee";
import { PricingModels } from "@/components/sections/pricing-models";
import { PricingPage } from "@/components/sections/pricing-page";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/routes";
import {
  PLAN_ORDER,
  PLANS,
  PRICING_COPY,
  PRICING_FAQ,
  type Billing,
} from "@/lib/pricing.config";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { buildCommercialMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import type { FaqItem, SeoData, SiteSettings } from "@/lib/types";

const BILLINGS: Billing[] = ["monthly", "annual"];

function getOffers(): ProductOffer[] {
  return PLAN_ORDER.flatMap((planId) => {
    const plan = PLANS[planId];
    return BILLINGS.flatMap((billing) => {
      const period = billing === "annual" ? "annual billing" : "monthly billing";
      return [
        {
          name: `${plan.name}, Standard seat, ${period}`,
          price: plan.standardBands[0][billing],
          description: `Price per user per month for the first ${plan.standardBands[0].to} seats, AI models included`,
        },
        ...(plan.powerSeat
          ? [
              {
                name: `${plan.name}, Power seat, ${period}`,
                price: plan.powerSeat[billing],
                description: "Price per user per month, AI models included",
              },
            ]
          : []),
      ];
    });
  });
}

function getFaqItems(locale: Locale): FaqItem[] {
  return PRICING_FAQ.flatMap((item) =>
    item.answer
      ? [
          {
            question: item.question,
            answer: item.answer,
            link: item.link
              ? { ...item.link, href: localizeHref(item.link.href, locale) }
              : undefined,
          },
        ]
      : [],
  );
}

export async function pricingMetadata(locale: Locale): Promise<Metadata> {
  const seo: SeoData = {
    metaTitle: PRICING_COPY.seo.title,
    metaDescription: PRICING_COPY.seo.description,
    ogImage: null,
  };
  return buildCommercialMetadata(seo, "pricing", locale, PRICING_COPY.seo.title);
}

export async function PricingView({ locale }: { locale: Locale }) {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const settings = data as SiteSettings | null;
  const bookingHref = resolveMeetingUrl(settings?.sharedLinks, "wonka-chat", locale);
  const faqItems = getFaqItems(locale);

  return (
    <main className="bg-background text-text">
      <ProductOffersSchema
        name={PRICING_COPY.seo.productName}
        description={PRICING_COPY.seo.description}
        url={`${getSiteUrl()}${localizeHref("/pricing", locale)}`}
        offers={getOffers()}
      />
      <FaqSchema items={faqItems} />

      <PricingPage bookingHref={bookingHref} />

      <PricingLogoMarquee />

      <PricingModels />

      <PricingClosingCta bookingHref={bookingHref} locale={locale} />

      <FaqSection
        data={{
          header: { eyebrow: null, heading: PRICING_COPY.faq.title, body: null },
          items: faqItems,
        }}
      />
    </main>
  );
}
