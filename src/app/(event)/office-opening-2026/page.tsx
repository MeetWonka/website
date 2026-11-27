import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { OfficeOpeningPage } from "./office-opening-page";

export const dynamic = "force-static";

export const REGISTRATION_FORM_URL =
  "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=tGoxC5TIu0qHSju9xicnP-YH6sqoFalFry_jngs4Pe1UNzNIMFFYNVozRVFMVEJEMUhWRVkxUkVaRi4u";

export type ScrollPanelType =
  | "highlights"
  | "speaker"
  | "programme"
  | "experience"
  | "register";

export interface OfficeOpeningContent {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  };
  hero: {
    title: string;
    subtitle: string;
    supportingLines: string[];
    ctaLabel: string;
    deadlineNote: string;
    image: string;
    imageAlt: string;
    imageInitials: string;
  };
  highlights: Array<{
    id: "date" | "time" | "location" | "spots";
    label: string;
    value: string;
  }>;
  scrollSteps: Array<{
    id: string;
    title: string;
    body: string;
    panel: ScrollPanelType;
  }>;
  guestSpeaker: {
    label: string;
    name: string;
    role: string;
    image: string;
    initials: string;
  };
  programme: Array<{
    time: string;
    title: string;
    speakers?: Array<{
      name: string;
      image: string;
      initials: string;
    }>;
  }>;
  experiences: Array<{
    title: string;
    text: string;
  }>;
  practical: {
    items: Array<{ label: string; value: string }>;
    guestNote: string;
    mapsLabel: string;
    mapsUrl: string;
  };
  closing: {
    title: string;
    subline: string;
    ctaLabel: string;
    contactName: string;
    contactEmail: string;
  };
  sticky: {
    ctaLabel: string;
    deadline: string;
  };
}

export const OFFICE_OPENING_CONTENT: OfficeOpeningContent = {
  meta: {
    title: "Discover Belgium's leading AI lab | 28 September",
    description:
      "Opening of Wonka AI's first hub in Diegem. A talk by Vincent Van Peteghem, a live look at European AI built in Belgium, and an evening of food, drinks and conversation.",
    ogTitle: "Discover Belgium's leading AI lab, 28 September",
    ogDescription:
      "Official opening of Wonka AI's first hub with Vincent Van Peteghem. See how agents take over busy work while people move up instead of out. Doors at 16:30.",
    ogImage: "/images/office-opening/og.jpg",
  },
  hero: {
    title: "Discover the lab behind Belgium's AI adoption.",
    subtitle: "You're invited for the opening of our first AI hub.",
    supportingLines: [
      "Official opening with Deputy Prime Minister Vincent Van Peteghem.",
      "A first look at how AI agents take over busy work, by a fully Belgian AI platform.",
    ],
    ctaLabel: "Save your spot",
    deadlineNote:
      "Limited spots. Registration closes Sunday 27 September at 23:00.",
    image: "/images/office-opening/office-hero.png",
    imageAlt: "Wonka AI office lounge with logo wall",
    imageInitials: "WA",
  },
  highlights: [
    {
      id: "date",
      label: "Date",
      value: "Monday 28 September 2026",
    },
    {
      id: "time",
      label: "Time",
      value: "16:30 to 20:00, talks from 17:00",
    },
    {
      id: "location",
      label: "Location",
      value: "(re)space Airport, De Kleetlaan 2, Diegem",
    },
    {
      id: "spots",
      label: "Spots",
      value: "Limited. Register before Sunday 27 September, 23:00",
    },
  ],
  scrollSteps: [
    {
      id: "intro",
      title: "A Belgian AI lab, opening its first hub.",
      body: "Wonka is a Belgian AI lab. We help organisations put AI to work for everyone, not just for the handful of people who already know how.\n\nOn Monday 28 September we open our first AI hub in Diegem. Deputy Prime Minister Vincent Van Peteghem opens it with us, and we show what we are building: a European AI workspace where agents take over the busy work and the people around them move up instead of out.",
      panel: "highlights",
    },
    {
      id: "takeaways",
      title: "What you leave with.",
      body: "Three things you take home from the afternoon, whether you work in government, in a large company, or are meeting Wonka AI for the first time.",
      panel: "experience",
    },
    {
      id: "speaker",
      title: "Vincent Van Peteghem opens the afternoon.",
      body: "Belgium's Deputy Prime Minister joins us for a short, concrete talk on the challenges the country is facing, and where AI can genuinely help.",
      panel: "speaker",
    },
    {
      id: "programme",
      title: "We'll show you what the future of work will look like.",
      body: "Cédric Gilissen on what 200 organisations taught us about AI at work. Antoine Percy and Florian De Boeck on the Wonka Workspace. Then we open the office and keep the evening going.",
      panel: "programme",
    },
    {
      id: "register",
      title: "Save your spot before Sunday 27 September, 23:00.",
      body: "Registration is free but limited. We confirm by mail and send practical details right after.",
      panel: "register",
    },
  ],
  guestSpeaker: {
    label: "Guest speaker",
    name: "Vincent Van Peteghem",
    role: "Deputy Prime Minister",
    image: "/images/office-opening/vincent-van-peteghem.jpg",
    initials: "VV",
  },
  programme: [
    { time: "16:30", title: "Doors open. Welcome drink." },
    {
      time: "17:00",
      title:
        "Vincent Van Peteghem on the challenges facing the country, and where AI fits in.",
    },
    {
      time: "17:30",
      title:
        "Keynote by Cédric Gilissen, CEO. What we learned at 200 organisations, and what AI really changes about the work people do.",
      speakers: [
        {
          name: "Cédric Gilissen",
          image: "/images/office-opening/cedric.jpg",
          initials: "CG",
        },
      ],
    },
    {
      time: "18:00",
      title:
        "Antoine Percy (CTO) and Florian De Boeck (CPO). The Wonka Workspace today, and where we are taking it.",
      speakers: [
        {
          name: "Antoine Percy",
          image: "/images/office-opening/antoine.jpg",
          initials: "AP",
        },
        {
          name: "Florian De Boeck",
          image: "/images/office-opening/florian.jpg",
          initials: "FD",
        },
      ],
    },
    {
      time: "18:30",
      title: "Office tour. We open the new floor and you get to look around.",
    },
    { time: "19:00", title: "Networking, drinks and DJ." },
  ],
  experiences: [
    {
      title: "Proof from 200 companies",
      text: "We will show how we helped 200 organisations become AI native, what actually worked, and what did not.",
    },
    {
      title: "Built in Belgium, for Europe",
      text: "Vincent Van Peteghem on the challenges the country is facing, and where AI can carry part of the load. A Belgian company, a European alternative, and data that stays here.",
    },
    {
      title: "See what the future of work looks like",
      text: "We will show you what the future of work looks like. Agents doing the repetitive work, and the people around them getting better work back.",
    },
  ],
  practical: {
    items: [
      { label: "Date", value: "Monday 28 September 2026" },
      {
        label: "Time",
        value: "Doors at 16:30, talks from 17:00, end at 20:00",
      },
      {
        label: "Location",
        value: "(re)space Airport, De Kleetlaan 2, 1831 Diegem",
      },
      {
        label: "Getting there",
        value:
          "300+ parking spots on site. Diegem station is a five minute walk.",
      },
      { label: "Price", value: "Free, registration required" },
      {
        label: "Register before",
        value: "Sunday 27 September, 23:00",
      },
      { label: "Spots", value: "Limited, we confirm by mail" },
    ],
    guestNote:
      "Bringing someone along? Send them this page. Everyone registers separately through the form, so we know who is coming.",
    mapsLabel: "Open in Google Maps",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=(re)space+Airport,+De+Kleetlaan+2,+1831+Diegem",
  },
  closing: {
    title: "See you on the 28th.",
    subline:
      "Limited spots. Register before Sunday 27 September at 23:00 and we send the practical details right after.",
    ctaLabel: "Save your spot",
    contactName: "Tom Van Nieuwenhuyse",
    contactEmail: "tom@meetwonka.com",
  },
  sticky: {
    ctaLabel: "Save your spot",
    deadline: "Register before Sunday 27 September, 23:00",
  },
};

const { meta } = OFFICE_OPENING_CONTENT;
const siteUrl = getSiteUrl();
const pagePath = "/office-opening-2026";

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

export default function OfficeOpening2026Page() {
  return (
    <OfficeOpeningPage
      content={OFFICE_OPENING_CONTENT}
      registrationUrl={REGISTRATION_FORM_URL}
    />
  );
}
