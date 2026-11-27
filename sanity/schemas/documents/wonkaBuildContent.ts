import { defineType, defineField } from "sanity";

export const wonkaBuildContent = defineType({
  name: "wonkaBuildContent",
  title: "Wonka Build",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "logoStrip", title: "Logo strip" },
    { name: "phases", title: "Phases" },
    { name: "deliverables", title: "Deliverables" },
    { name: "industries", title: "Industries" },
    { name: "whyNow", title: "Why now" },
    { name: "promo", title: "Promo" },
    { name: "testimonials", title: "Testimonials" },
    { name: "contact", title: "Contact" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "productHero",
      group: "hero",
    }),
    defineField({
      name: "logoStrip",
      title: "Logo strip",
      type: "logoStrip",
      group: "logoStrip",
    }),
    defineField({
      name: "phases",
      title: "Phases",
      type: "numberedCardsSection",
      group: "phases",
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables",
      type: "deliverablesPanel",
      group: "deliverables",
    }),
    defineField({
      name: "industries",
      title: "Industries",
      type: "industriesSection",
      group: "industries",
    }),
    defineField({
      name: "whyNow",
      title: "Why now",
      type: "cardGridSection",
      group: "whyNow",
    }),
    defineField({
      name: "promo",
      title: "Promo panel",
      type: "promoPanel",
      group: "promo",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials header",
      type: "sectionHeader",
      group: "testimonials",
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "contactSection",
      group: "contact",
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "faqSection",
      group: "faq",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Wonka Build" }),
  },
});
