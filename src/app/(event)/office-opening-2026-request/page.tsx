import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import {
  OFFICE_OPENING_CONTENT,
  type OfficeOpeningContent,
} from "../office-opening-2026/page";
import { OfficeOpeningPage } from "../office-opening-2026/office-opening-page";

export const dynamic = "force-static";

/** Spot request form — submissions are reviewed before confirmation. */
export const REGISTRATION_FORM_URL =
  "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=tGoxC5TIu0qHSju9xicnP-YH6sqoFalFry_jngs4Pe1UN0haRlhORTg2V04yRkFWR1VKQUFBQ0hPSi4u";

export const OFFICE_OPENING_REQUEST_CONTENT: OfficeOpeningContent = {
  ...OFFICE_OPENING_CONTENT,
  hero: {
    ...OFFICE_OPENING_CONTENT.hero,
    ctaLabel: "Request a spot",
    deadlineNote:
      "Limited spots. Request yours before Friday 25 September at 22:00.",
  },
  highlights: OFFICE_OPENING_CONTENT.highlights.map((item) =>
    item.id === "spots"
      ? {
          ...item,
          value: "Limited. Request a spot before Friday 25 September, 22:00",
        }
      : item,
  ),
  scrollSteps: OFFICE_OPENING_CONTENT.scrollSteps.map((step) =>
    step.id === "register"
      ? {
          ...step,
          title: "Request a spot before Friday 25 September, 22:00.",
          body: "Spot requests are free but limited. We review every request and confirm by mail with practical details.",
        }
      : step,
  ),
  practical: {
    ...OFFICE_OPENING_CONTENT.practical,
    items: OFFICE_OPENING_CONTENT.practical.items.map((item) => {
      if (item.label === "Price") {
        return { ...item, value: "Free, spot request required" };
      }
      if (item.label === "Register before") {
        return { label: "Request before", value: item.value };
      }
      if (item.label === "Spots") {
        return {
          ...item,
          value: "Limited, we review requests and confirm by mail",
        };
      }
      return item;
    }),
    guestNote:
      "Bringing someone along? Send them this page. Everyone requests a spot separately through the form, so we know who is coming.",
  },
  closing: {
    ...OFFICE_OPENING_CONTENT.closing,
    subline:
      "Limited spots. Request yours before Friday 25 September at 22:00 and we confirm by mail.",
    ctaLabel: "Request a spot",
  },
  sticky: {
    ctaLabel: "Request a spot",
    deadline: "Request before Friday 25 September, 22:00",
  },
};

const { meta } = OFFICE_OPENING_REQUEST_CONTENT;
const siteUrl = getSiteUrl();
const pagePath = "/office-opening-2026-request";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Wonka AI",
    title: meta.ogTitle,
    description: meta.ogDescription,
    url: `${siteUrl}${pagePath}`,
    locale: "en_US",
    images: [{ url: meta.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.ogTitle,
    description: meta.ogDescription,
    images: [meta.ogImage],
  },
};

export default function OfficeOpening2026RequestPage() {
  return (
    <OfficeOpeningPage
      content={OFFICE_OPENING_REQUEST_CONTENT}
      registrationUrl={REGISTRATION_FORM_URL}
    />
  );
}
