import { defineType, defineField } from "sanity";

export const wonkaChatOdooContent = defineType({
  name: "wonkaChatOdooContent",
  title: "WonkaChat · Odoo",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "logoStrip", title: "Logo strip" },
    { name: "problem", title: "Problem" },
    { name: "features", title: "Features" },
    { name: "workflowSteps", title: "Workflow steps" },
    { name: "capabilities", title: "Capabilities" },
    { name: "security", title: "Security" },
    { name: "contact", title: "Contact" },
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
      type: "problemBentoSection",
      group: "problem",
    }),
    defineField({
      name: "features",
      title: "Product features",
      type: "stickyFeaturesSection",
      group: "features",
    }),
    defineField({
      name: "workflowSteps",
      title: "Workflow steps",
      type: "workflowStepsSection",
      group: "workflowSteps",
    }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "iconFeatureGridSection",
      group: "capabilities",
    }),
    defineField({
      name: "security",
      title: "Security",
      type: "securitySection",
      group: "security",
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "contactSection",
      group: "contact",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "WonkaChat · Odoo" }),
  },
});
