import { defineArrayMember, defineField, defineType } from "sanity";

export const agentBlueprintAssessment = defineType({
  name: "agentBlueprintAssessment",
  title: "Agent Blueprint Assessment",
  type: "document",
  fields: [
    defineField({
      name: "targetDomain",
      title: "Target domain",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "submittedEmail",
      title: "Submitted email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "anonymous",
      title: "Anonymous output",
      type: "boolean",
      initialValue: true,
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Processing", value: "processing" },
          { title: "Completed", value: "completed" },
          { title: "Failed", value: "failed" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sector",
      title: "Anonymous sector",
      type: "string",
    }),
    defineField({
      name: "headline",
      title: "Blueprint headline",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Blueprint summary",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "agents",
      title: "Recommended agents",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string" }),
            defineField({ name: "tier", type: "string" }),
            defineField({ name: "mission", type: "text", rows: 3 }),
            defineField({
              name: "tools",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({ name: "expectedImpact", type: "string" }),
            defineField({
              name: "weeklyHoursSaved",
              type: "object",
              fields: [
                defineField({ name: "min", type: "number" }),
                defineField({ name: "max", type: "number" }),
              ],
            }),
            defineField({ name: "effort", type: "string" }),
          ],
          preview: {
            select: { title: "name", subtitle: "tier" },
          },
        }),
      ],
    }),
    defineField({
      name: "sources",
      title: "Public research sources",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "url", type: "url" }),
          ],
          preview: {
            select: { title: "title", subtitle: "url" },
          },
        }),
      ],
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
    }),
    defineField({
      name: "completedAt",
      title: "Completed at",
      type: "datetime",
    }),
    defineField({
      name: "emailCapturedAt",
      title: "Email captured at",
      type: "datetime",
    }),
    defineField({
      name: "demoClickedAt",
      title: "Demo clicked at",
      type: "datetime",
    }),
    defineField({
      name: "clientIp",
      title: "Client IP",
      type: "string",
      readOnly: true,
      hidden: ({ document }) => !document?.clientIp,
    }),
    defineField({
      name: "requestyModel",
      title: "Requesty model",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "requestyResponseIds",
      title: "Requesty response IDs",
      type: "array",
      of: [{ type: "string" }],
      readOnly: true,
    }),
    defineField({
      name: "requestCost",
      title: "Request cost",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "errorCode",
      title: "Error code",
      type: "string",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      domain: "targetDomain",
      sector: "sector",
      status: "status",
      submittedAt: "submittedAt",
    },
    prepare({ domain, sector, status, submittedAt }) {
      return {
        title: domain ?? "Agent blueprint",
        subtitle: [
          sector,
          status,
          submittedAt && new Date(submittedAt).toLocaleString("en-GB"),
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
