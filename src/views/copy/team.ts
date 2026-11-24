import type { Locale } from "@/i18n/config";

export interface TeamMember {
  name: string;
  role?: string;
  /** Path under /public; members without one render a brand-landscape monogram. */
  photo?: string;
  /** LinkedIn profile handle, the part after linkedin.com/in/. */
  linkedin?: string;
}

/** Roster validated by Gabriel (07/10/2026), ordered by seniority: founders, leadership, leads, then teams. */
export const TEAM: TeamMember[] = [
  {
    name: "Cédric Gilissen",
    role: "Co-founder & CEO",
    linkedin: "cedricgilissen",
    photo: "/images/team/cedric-gilissen.jpg",
  },
  {
    name: "Antoine Percy",
    role: "Co-founder & CTO",
    linkedin: "antoine-percy-889419180",
    photo: "/images/team/antoine-percy.jpg",
  },
  {
    name: "Florian De Boeck",
    role: "CPO",
    linkedin: "florian-de-boeck",
    photo: "/images/team/florian-de-boeck.jpg",
  },
  {
    name: "Bilal Errahil",
    role: "COO",
    linkedin: "bilal-errahil-0a8462186",
    photo: "/images/team/bilal-errahil.jpg",
  },
  {
    name: "Corentin Peyresblanques",
    role: "CISO",
    linkedin: "cpeyresblanques",
    photo: "/images/team/corentin-peyresblanques.jpg",
  },
  {
    name: "Nathan De Witte",
    role: "Head of Sales",
    linkedin: "nathan-de-witte-82566b1b5",
    photo: "/images/team/nathan-de-witte.jpg",
  },
  {
    name: "Younes Baghor",
    role: "Head of Agentic",
    linkedin: "webwizart",
    photo: "/images/team/younes-baghor-v2.jpg",
  },
  {
    name: "Adrien Van Den Branden",
    role: "Go-to-Market & Delivery",
    linkedin: "adrienvandenbranden",
    photo: "/images/team/adrien-van-den-branden-v2.jpg",
  },
  {
    name: "Gabriel Rance",
    role: "Country Manager France",
    linkedin: "gabriel-rance-ensam",
    photo: "/images/team/gabriel-rance.jpg",
  },
  {
    name: "Théau Lepouttre",
    role: "Country Manager Canada",
    linkedin: "theaulepouttre",
    photo: "/images/team/theau-lepouttre.jpg",
  },
  {
    name: "Jordy Callens",
    role: "Head of Marketing",
    linkedin: "jordy-callens",
    photo: "/images/team/jordy-callens-v2.jpg",
  },
  {
    name: "Maarten Mollie",
    role: "Account Executive Lead",
    linkedin: "maarten-mollie",
    photo: "/images/team/maarten-mollie-v2.jpg",
  },
  {
    name: "Foucauld Bellanger",
    role: "Tech Lead",
    linkedin: "foucauld-bellanger-49372229a",
    photo: "/images/team/foucauld-bellanger.jpg",
  },
  {
    name: "Rodolphe de Schaetzen",
    role: "Tech Lead",
    linkedin: "rodolphe-de-schaetzen",
    photo: "/images/team/rodolphe-de-schaetzen-v2.jpg",
  },
  {
    name: "Juliette Felix",
    role: "Project Manager",
    linkedin: "juliette-felix-215479198",
    photo: "/images/team/juliette-felix.jpg",
  },
  {
    name: "Léon De Landsheer",
    role: "Project Manager",
    linkedin: "leon-de-landsheer",
    photo: "/images/team/leon-de-landsheer.jpg",
  },
  {
    name: "Tom Van Nieuwenhuyse",
    role: "Business Analyst",
    linkedin: "tom-van-nieuwenhuyse-60b18b228",
    photo: "/images/team/tom-van-nieuwenhuyse.jpg",
  },
  {
    name: "Hugo Vandermosten",
    role: "Data & AI Engineer",
    linkedin: "hugovandermosten",
  },
  {
    name: "Julien Lamon",
    role: "Data & AI Engineer",
    linkedin: "julien-lamon-074276171",
    photo: "/images/team/julien-lamon.jpg",
  },
  {
    name: "Lucy Janssens",
    role: "Data & AI Engineer",
    linkedin: "lucy-guillaume-janssens-80b0b1176",
    photo: "/images/team/lucy-janssens.jpg",
  },
  {
    name: "Fozan Shahid",
    role: "Data & AI Engineer",
    linkedin: "fozanshahid",
    photo: "/images/team/fozan-shahid.jpg",
  },
  { name: "Jenya", role: "Full-Stack Developer" },
  {
    name: "Djager Al-Yussef",
    role: "Software Developer",
    linkedin: "djager-al-yussef",
    photo: "/images/team/djager-al-yussef.jpg",
  },
  {
    name: "Elsa Valet",
    role: "Customer Support Expert",
    linkedin: "elsa-valet",
  },
  {
    name: "Gilles Liger",
    role: "Business Developer",
    linkedin: "gilles-liger-7a89b4318",
    photo: "/images/team/gilles-liger.jpg",
  },
  {
    name: "Léopold Schaller",
    role: "Business Developer",
    linkedin: "léopold-schaller-217b84320",
    photo: "/images/team/leopold-schaller.jpg",
  },
  {
    name: "Céline Nagels",
    role: "HR Consultant",
    linkedin: "celine-nagels",
    photo: "/images/team/celine-nagels.jpg",
  },
  {
    name: "Florence Vanbelle",
    role: "Finance & Administration Consultant",
    linkedin: "florence-vanbelle",
    photo: "/images/team/florence-vanbelle.jpg",
  },
  {
    name: "Alex Gasser",
    linkedin: "alex-gasser-801709272",
  },
  {
    name: "Bilel Jellouli",
    linkedin: "bileljellouli",
    photo: "/images/team/bilel-jellouli.jpg",
  },
  {
    name: "Dylan Mendes",
    linkedin: "dylanmendes",
    photo: "/images/team/dylan-mendes.jpg",
  },
  {
    name: "Lucas Ogrodnik",
    linkedin: "lucas-ogrodnik",
    photo: "/images/team/lucas-ogrodnik.jpg",
  },
  {
    name: "Mattias Anderson",
    linkedin: "mattiasanderson",
    photo: "/images/team/mattias-anderson.jpg",
  },
  {
    name: "Raphaël Chauvier",
    linkedin: "raphael-chauvier",
    photo: "/images/team/raphael-chauvier.jpg",
  },
  {
    name: "Raphael Nguyen",
    linkedin: "raphael-nguyen-162974225",
    photo: "/images/team/raphael-nguyen.jpg",
  },
  { name: "Ritik" },
  {
    name: "Casper Colpaert",
    role: "Sales Intern",
    linkedin: "casper-colpaert",
    photo: "/images/team/casper-colpaert.jpg",
  },
  {
    name: "Raffe Vanderbeken Vancauwenberghe",
    role: "Sales & Marketing Intern",
    linkedin: "ralph-vdb-vcb",
    photo: "/images/team/raffe-vanderbeken-vancauwenbeghe.jpg",
  },
];

export interface TeamPageCopy {
  seo: { title: string; description: string };
  eyebrow: string;
  title: string;
  body: string;
  countLabel: string;
  ctaTitle: string;
  ctaBody: string;
  cta: string;
  linkedinLabel: (name: string) => string;
}

export const TEAM_PAGE_COPY: Record<Locale, TeamPageCopy> = {
  en: {
    seo: {
      title: "Team",
      description:
        "The AI consultants, engineers and product people behind WonkaChat.",
    },
    eyebrow: "The team",
    title: "The people who put AI to work in your company.",
    body: "Consultants, engineers and product people based in Belgium and France.",
    countLabel: "people",
    ctaTitle: "Talk to one of them about your use case.",
    ctaBody:
      "A first conversation is enough to find the agent that will save your teams the most time.",
    cta: "Talk to a consultant",
    linkedinLabel: (name) => `${name} on LinkedIn`,
  },
  fr: {
    seo: {
      title: "Équipe",
      description:
        "Les consultants IA, ingénieurs et product builders derrière WonkaChat.",
    },
    eyebrow: "L'équipe",
    title: "Les personnes qui mettent l'IA au travail dans votre entreprise.",
    body: "Consultants, ingénieurs et product builders basés en Belgique et en France.",
    countLabel: "personnes",
    ctaTitle: "Parlez de votre cas d'usage à l'un d'entre eux.",
    ctaBody:
      "Une première conversation suffit pour trouver l'agent qui fera gagner le plus de temps à vos équipes.",
    cta: "Parler à un consultant",
    linkedinLabel: (name) => `${name} sur LinkedIn`,
  },
  nl: {
    seo: {
      title: "Team",
      description:
        "De AI-consultants, engineers en productmensen achter WonkaChat.",
    },
    eyebrow: "Het team",
    title: "De mensen die AI aan het werk zetten in uw bedrijf.",
    body: "Consultants, engineers en productmensen in België en Frankrijk.",
    countLabel: "mensen",
    ctaTitle: "Bespreek uw use case met een van hen.",
    ctaBody:
      "Eén eerste gesprek volstaat om de agent te vinden die uw teams de meeste tijd bespaart.",
    cta: "Spreek een consultant",
    linkedinLabel: (name) => `${name} op LinkedIn`,
  },
};
