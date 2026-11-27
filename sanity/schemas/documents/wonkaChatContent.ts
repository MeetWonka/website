import { defineType, defineField } from "sanity";

export const wonkaChatContent = defineType({
  name: "wonkaChatContent",
  title: "WonkaChat",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "logoStrip", title: "Logo strip" },
    { name: "problem", title: "Problem" },
    { name: "overview", title: "Overview" },
    { name: "features", title: "Features" },
    { name: "useCases", title: "Use cases" },
    { name: "security", title: "Security" },
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
      name: "problem",
      title: "Problem",
      type: "splitContentSection",
      group: "problem",
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "sectionHeader",
      group: "overview",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "stickyFeaturesSection",
      group: "features",
    }),
    defineField({
      name: "useCases",
      title: "Use cases",
      type: "useCasesSection",
      group: "useCases",
    }),
    defineField({
      name: "security",
      title: "Security",
      type: "securitySection",
      group: "security",
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
    prepare: () => ({ title: "WonkaChat" }),
  },
});
