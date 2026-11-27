import type { SeoData } from "@/lib/types";
import type {
  ContactPageResolved,
  ContactPersonResolved,
  SectionHeaderData,
} from "@/lib/types/page-sections";

export const CONTACT_DEFAULTS: ContactPageResolved = {
  general: {
    header: {
      eyebrow: "Contact",
      heading: "Get in touch",
      body: "Questions about AI for your organisation? Reach us directly — we'll get back to you as soon as we can.",
    },
    details: [
      {
        _key: "email",
        label: "Email",
        value: "hello@wonka.ai",
        href: "mailto:hello@wonka.ai",
      },
      {
        _key: "office",
        label: "Office",
        value: "(re)space Airport\nDe Kleetlaan 2, 1831 Machelen, Belgium",
        href:
          "https://www.google.com/maps/search/?api=1&query=(re)space+Airport,+De+Kleetlaan+2,+1831+Machelen",
      },
    ],
  },
  team: {
    header: {
      eyebrow: "Team",
      heading: "Talk to someone directly",
      body: null,
    },
    people: [
      {
        _key: "jordy",
        portrait: null,
        name: "Jordy Callens",
        role: "Partner",
        email: "jordy@wonka.ai",
        fallbackPortrait: {
          src: "/images/wonka-build/jordy.jpg",
          alt: "Jordy Callens",
        },
      },
    ],
  },
  seo: {
    metaTitle: "Contact | Wonka",
    metaDescription:
      "Get in touch with Wonka. Email and direct contacts for your AI questions.",
    ogImage: null,
  },
};

export type ContactDefaults = typeof CONTACT_DEFAULTS;

export type ContactGeneralDefaults = ContactDefaults["general"];
export type ContactTeamDefaults = ContactDefaults["team"];

export type { ContactPersonResolved, SectionHeaderData, SeoData };
