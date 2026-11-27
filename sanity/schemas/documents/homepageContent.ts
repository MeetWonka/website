import { defineType, defineField } from "sanity";

const sectionHeaderFields = [
  defineField({
    name: "eyebrow",
    title: "Eyebrow",
    type: "string",
  }),
  defineField({
    name: "heading",
    title: "Heading",
    type: "text",
    rows: 2,
    description: "Use a new line for a line break in the heading.",
  }),
  defineField({
    name: "body",
    title: "Body",
    type: "text",
    rows: 4,
    description: "Use a new line for a line break in the body.",
  }),
];

export const homepageContent = defineType({
  name: "homepageContent",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "solution", title: "Solution" },
    { name: "whatWeDo", title: "What we do" },
    { name: "howToStart", title: "How to start" },
    { name: "security", title: "Security" },
    { name: "cta", title: "CTA" },
    { name: "useCases", title: "Use cases" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "awardBadge",
          title: "Award badge",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "object",
      group: "solution",
      options: { collapsible: true, collapsed: false },
      fields: [
        ...sectionHeaderFields,
        defineField({
          name: "steps",
          title: "Steps",
          description:
            "Each step shows as a list item on the left and a card on the right. The list highlights the step whose card is in view. Exactly 4 steps.",
          type: "array",
          validation: (Rule) => Rule.max(4),
          of: [
            {
              type: "object",
              name: "solutionStep",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "body",
                  title: "Body",
                  type: "text",
                  rows: 3,
                }),
              ],
              preview: {
                select: { title: "title", subtitle: "body" },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "whatWeDo",
      title: "What we do",
      type: "object",
      group: "whatWeDo",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "text",
          rows: 2,
          description: "Use a new line for a line break in the heading.",
        }),
        defineField({
          name: "cards",
          title: "Cards",
          type: "array",
          validation: (Rule) => Rule.max(3),
          of: [
            {
              type: "object",
              name: "whatWeDoCard",
              fields: [
                defineField({
                  name: "tagline",
                  title: "Tagline",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "body",
                  title: "Body",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "cta",
                  title: "CTA button",
                  type: "ctaButton",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: { title: "tagline", subtitle: "body" },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "howToStart",
      title: "How to start",
      type: "object",
      group: "howToStart",
      options: { collapsible: true, collapsed: false },
      fields: [
        ...sectionHeaderFields,
        defineField({
          name: "calloutHeading",
          title: "Callout heading",
          type: "text",
          rows: 2,
          description: "Heading inside the dark callout card. Use a new line for a line break.",
        }),
        defineField({
          name: "outcomes",
          title: "Outcomes",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "outcomesHeading",
          title: "Outcomes heading",
          type: "string",
          description: 'Heading above the outcomes list (e.g. "You walk away with").',
        }),
      ],
    }),
    defineField({
      name: "security",
      title: "Security",
      type: "securitySection",
      group: "security",
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: "cta",
      title: "Footer CTA",
      type: "object",
      group: "cta",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 2,
        }),
      ],
    }),
    defineField({
      name: "useCases",
      title: "Use cases",
      type: "useCasesSection",
      group: "useCases",
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
