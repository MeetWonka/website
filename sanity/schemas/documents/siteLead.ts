import { defineType, defineField } from "sanity";

const SOURCE_OPTIONS = [
  { title: "Start AI hero", value: "start-ai-hero" },
  { title: "Start AI Flanders hero", value: "start-ai-flanders-hero" },
  { title: "WonkaChat hero", value: "wonka-chat-hero" },
  { title: "WonkaChat Odoo hero", value: "wonka-chat-odoo-hero" },
  { title: "France diagnostic", value: "france-diagnostic" },
];

export const siteLead = defineType({
  name: "siteLead",
  title: "Site Lead",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "firstName",
      title: "First name",
      type: "string",
      readOnly: true,
      hidden: ({ document }) => !document?.firstName,
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      readOnly: true,
      hidden: ({ document }) => !document?.company,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Where the lead was captured on the site.",
      options: { list: SOURCE_OPTIONS },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientIp",
      title: "Client IP",
      type: "string",
      description: "Captured server-side for abuse prevention. Not shown publicly.",
      readOnly: true,
      hidden: ({ document }) => !document?.clientIp,
    }),
    defineField({
      name: "lifecycleStage",
      title: "Lifecycle stage",
      type: "string",
      options: { list: ["lead", "mql", "sql", "customer"] },
      readOnly: true,
    }),
    defineField({
      name: "qualificationScore",
      title: "Qualification score",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "qualificationSignals",
      title: "Qualification signals",
      type: "array",
      of: [{ type: "string" }],
      readOnly: true,
    }),
    defineField({
      name: "diagnosticAnswers",
      title: "Diagnostic answers",
      type: "object",
      fields: ["secteur", "outil", "donnees", "frein", "role"].map((name) => ({
        name,
        title: name,
        type: "string",
        readOnly: true,
      })),
      hidden: ({ document }) => !document?.diagnosticAnswers,
    }),
    defineField({
      name: "attribution",
      title: "Attribution",
      type: "object",
      fields: [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
        "fbclid",
        "gclid",
        "landing_page",
        "landing_path",
        "referrer",
        "posthog_distinct_id",
        "posthog_session_id",
        "journey_id",
      ].map((name) => ({ name, title: name, type: "string", readOnly: true })),
    }),
    defineField({
      name: "crmExportStatus",
      title: "CRM export status",
      type: "string",
      description: "Ready until a destination-specific CRM adapter is approved and configured.",
      options: { list: ["ready", "sent", "failed"] },
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
      title: "email",
      source: "source",
      submittedAt: "submittedAt",
    },
    prepare({ title, source, submittedAt }) {
      const sourceLabel =
        SOURCE_OPTIONS.find((option) => option.value === source)?.title ?? source;
      return {
        title: title ?? "Lead",
        subtitle: [
          sourceLabel,
          submittedAt
            ? new Date(submittedAt).toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              })
            : null,
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
