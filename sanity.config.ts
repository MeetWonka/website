"use client";

import type { ComponentType } from "react";
import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import {
  BookIcon,
  CogIcon,
  CommentIcon,
  ComposeIcon,
  DocumentsIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  HomeIcon,
  LinkIcon,
  LockIcon,
  UsersIcon,
} from "@sanity/icons";
import { documentInternationalization } from "@sanity/document-internationalization";
import { schemaTypes } from "./sanity/schemas";

/**
 * Page singletons exist once per locale: EN at `<id>`, FR/NL at `<id>-fr` /
 * `<id>-nl` (see src/lib/localized-content.ts).
 */
const PAGE_LOCALES = [
  { title: "English", suffix: "" },
  { title: "Français", suffix: "-fr" },
  { title: "Nederlands", suffix: "-nl" },
] as const;

function localizedSingleton(
  S: StructureBuilder,
  title: string,
  icon: ComponentType,
  schemaType: string,
) {
  return S.listItem()
    .id(schemaType)
    .title(title)
    .icon(icon)
    .child(
      S.list()
        .id(`${schemaType}-locales`)
        .title(title)
        .items(
          PAGE_LOCALES.map(({ title: localeTitle, suffix }) =>
            S.listItem()
              .id(`${schemaType}${suffix}`)
              .title(localeTitle)
              .icon(icon)
              .child(
                S.document()
                  .schemaType(schemaType)
                  .documentId(`${schemaType}${suffix}`)
                  .title(`${title} (${localeTitle})`),
              ),
          ),
        ),
    );
}

export default defineConfig({
  name: "wonka",
  title: "Wonka Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Pages")
              .icon(DocumentsIcon)
              .child(
                S.list()
                  .title("Pages")
                  .items([
                    localizedSingleton(S, "Homepage", HomeIcon, "homepageContent"),
                    localizedSingleton(S, "WonkaChat", HomeIcon, "wonkaChatContent"),
                    localizedSingleton(
                      S,
                      "WonkaChat · Odoo",
                      HomeIcon,
                      "wonkaChatOdooContent",
                    ),
                    localizedSingleton(S, "Start AI", HomeIcon, "startAiContent"),
                    localizedSingleton(S, "Wonka Build", HomeIcon, "wonkaBuildContent"),
                    localizedSingleton(
                      S,
                      "Contact",
                      DocumentTextIcon,
                      "contactPageContent",
                    ),
                    S.divider(),
                    S.listItem()
                      .title("Terms of Use")
                      .icon(DocumentTextIcon)
                      .child(
                        S.document()
                          .schemaType("legalPage")
                          .documentId("termsPage"),
                      ),
                    S.listItem()
                      .title("Privacy Policy")
                      .icon(LockIcon)
                      .child(
                        S.document()
                          .schemaType("legalPage")
                          .documentId("privacyPage"),
                      ),
                    S.listItem()
                      .title("Cookie Policy")
                      .icon(DocumentTextIcon)
                      .child(
                        S.document()
                          .schemaType("legalPage")
                          .documentId("cookiePolicyPage"),
                      ),
                  ]),
              ),
            S.listItem()
              .title("Testimonials")
              .icon(CommentIcon)
              .schemaType("testimonial")
              .child(
                S.documentTypeList("testimonial")
                  .title("Testimonials")
                  .defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
            S.listItem()
              .title("Leads")
              .icon(EnvelopeIcon)
              .child(
                S.list()
                  .title("Leads")
                  .items([
                    S.listItem()
                      .title("All leads")
                      .child(
                        S.documentTypeList("siteLead")
                          .title("All leads")
                          .filter('_type in ["siteLead", "startAiLead"]')
                          .defaultOrdering([
                            { field: "submittedAt", direction: "desc" },
                          ]),
                      ),
                    S.listItem()
                      .title("MQL")
                      .child(
                        S.documentTypeList("siteLead")
                          .title("Marketing qualified leads")
                          .filter(
                            '_type == "siteLead" && lifecycleStage == "mql"',
                          )
                          .defaultOrdering([
                            { field: "submittedAt", direction: "desc" },
                          ]),
                      ),
                    S.listItem()
                      .title("France diagnostic")
                      .child(
                        S.documentTypeList("siteLead")
                          .title("France diagnostic leads")
                          .filter(
                            '_type == "siteLead" && source == "france-diagnostic"',
                          )
                          .defaultOrdering([
                            { field: "submittedAt", direction: "desc" },
                          ]),
                      ),
                    S.divider(),
                    S.listItem()
                      .title("Start AI")
                      .child(
                        S.documentTypeList("siteLead")
                          .title("Start AI Leads")
                          .filter(
                            '(_type == "siteLead" || _type == "startAiLead") && (source == "start-ai-hero" || !defined(source))',
                          )
                          .defaultOrdering([
                            { field: "submittedAt", direction: "desc" },
                          ]),
                      ),
                    S.listItem()
                      .title("WonkaChat")
                      .child(
                        S.documentTypeList("siteLead")
                          .title("WonkaChat Leads")
                          .filter(
                            '_type == "siteLead" && source in ["wonka-chat-hero", "wonka-chat-odoo-hero"]',
                          )
                          .defaultOrdering([
                            { field: "submittedAt", direction: "desc" },
                          ]),
                      ),
                    S.listItem()
                      .title("Agent Blueprints")
                      .child(
                        S.documentTypeList("agentBlueprintAssessment")
                          .title("Agent Blueprint Assessments")
                          .defaultOrdering([
                            { field: "submittedAt", direction: "desc" },
                          ]),
                      ),
                  ]),
              ),
            S.divider(),
            S.listItem()
              .title("Blog")
              .icon(DocumentTextIcon)
              .child(
                S.documentTypeList("blogPost")
                  .title("Blog Posts")
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
              ),
            S.listItem()
              .title("Glossary")
              .icon(BookIcon)
              .child(
                S.documentTypeList("glossaryTerm").title("Glossary Terms"),
              ),
            S.listItem()
              .title("Comparisons")
              .icon(ComposeIcon)
              .child(
                S.documentTypeList("comparisonPage").title("Comparison Pages"),
              ),
            S.listItem()
              .title("Connectors")
              .icon(LinkIcon)
              .child(
                S.documentTypeList("connectorPage").title("Connector Pages"),
              ),
            S.listItem()
              .title("Case Studies")
              .icon(UsersIcon)
              .child(
                S.documentTypeList("caseStudy").title("Case Studies"),
              ),
            S.divider(),
            S.listItem()
              .title("Site Settings")
              .icon(CogIcon)
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
          ]),
    }),
    documentInternationalization({
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "fr", title: "Français" },
        { id: "nl", title: "Nederlands" },
      ],
      schemaTypes: [
        "blogPost",
        "glossaryTerm",
        "comparisonPage",
        "connectorPage",
        "caseStudy",
      ],
    }),
  ],
  schema: { types: schemaTypes },
});
