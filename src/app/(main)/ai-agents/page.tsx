import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@sanity/lib/queries";
import { BreadcrumbSchema, FaqSchema, SoftwareAppSchema } from "@/components/json-ld";
import { Cta } from "@/components/sections/cta";
import { ButtonLink } from "@/components/ui/button";
import { getSiteUrl } from "@/lib/site-url";
import { resolveMeetingUrl } from "@/lib/resolve-meeting-url";
import { meetingTrackProps } from "@/lib/meeting-track";
import type { SiteSettings } from "@/lib/types";

export const dynamic = "force-static";

const pagePath = "/ai-agents";
const title = "Private Enterprise AI Agents | Wonka AI";
const description =
  "Wonka AI builds private enterprise AI agents connected to Odoo, SharePoint, Outlook, Teams, CRM, ERP and internal tools, with GDPR compliance. Hosted in Azure West Europe.";

const connectors = [
  { name: "Odoo", logo: "/images/solution/card-3/logos/odoo.svg" },
  { name: "SharePoint", logo: "/images/visual/sharepoint.svg" },
  { name: "Outlook", logo: "/images/solution/card-3/logos/outlook.svg" },
  { name: "Microsoft Teams", logo: "/images/solution/card-3/logos/teams.svg" },
  { name: "Salesforce", logo: "/images/solution/card-3/logos/salesforce.svg" },
  { name: "HubSpot", logo: "/images/solution/card-3/logos/hubspot.svg" },
  { name: "Jira", logo: "/images/solution/card-3/logos/jira.svg" },
  { name: "Notion", logo: "/images/solution/card-3/logos/notion.svg" },
  { name: "Google Drive", logo: "/images/solution/card-3/logos/googledrive.svg" },
  { name: "Slack", logo: "/images/solution/card-3/logos/slack.svg" },
];

const agentTypes = [
  {
    label: "Sales",
    title: "Lead qualification and CRM intelligence",
    body: "Score leads, enrich Odoo or CRM records, surface next actions and prepare follow-ups from real account context.",
  },
  {
    label: "Operations",
    title: "Workflow agents for repetitive business work",
    body: "Turn recurring processes into guided agents that read systems, ask for confirmation and write back only when approved.",
  },
  {
    label: "Finance",
    title: "Reporting, invoices and spend analysis",
    body: "Generate reports, reconcile supplier data, analyze accounting records and produce auditable summaries from ERP data.",
  },
  {
    label: "Support",
    title: "Knowledge and ticket assistance",
    body: "Route requests, answer from internal documentation and help agents resolve cases with the right context in front of them.",
  },
];

const steps = [
  "Map the business workflow and the systems that hold the truth.",
  "Expose the right data and actions through governed connectors or MCP servers.",
  "Design the agent behavior around confirmations, permissions and auditability.",
  "Deploy privately, test with real users and measure adoption on the workflow.",
];

const faqItems = [
  {
    question: "What does Wonka AI build?",
    answer:
      "Wonka AI builds private enterprise AI agents connected to the tools a company already uses, such as Odoo, SharePoint, Outlook, Teams, CRM systems, ERP systems and internal APIs.",
  },
  {
    question: "How is Wonka different from a generic chatbot?",
    answer:
      "A generic chatbot mostly answers questions. A Wonka agent is designed around a business workflow: it can read approved company data, reason over it, ask for confirmation and trigger controlled actions in existing systems.",
  },
  {
    question: "Is Wonka relevant for Odoo users?",
    answer:
      "Yes. Wonka can act as an AI layer over Odoo, helping teams query CRM, sales, accounting, projects, inventory and support data in natural language and automate repeatable ERP workflows.",
  },
  {
    question: "Where does company data go?",
    answer:
      "Wonka is hosted in Azure West Europe (Microsoft Ireland) by default, with GDPR compliance, role-based access control and audit logs. Customer data is not used to train public AI models. A Data Processing Agreement is available on request.",
  },
];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${getSiteUrl()}${pagePath}` },
  openGraph: {
    title,
    description,
    url: `${getSiteUrl()}${pagePath}`,
    type: "website",
    siteName: "Wonka AI",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default async function AiAgentsPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${pagePath}`;
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const meetingUrl = resolveMeetingUrl(
    (settings as SiteSettings | null)?.sharedLinks,
    "default",
  );

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "AI Agents", url: pageUrl },
        ]}
      />
      <SoftwareAppSchema
        name="Wonka AI private enterprise agents"
        description={description}
        url={pageUrl}
        features={agentTypes.map((agent) => agent.title)}
      />
      <FaqSchema items={faqItems} />

      <main className="bg-background text-text">
        <section className="relative overflow-hidden border-b border-dashed border-border bg-black text-white">
          <div className="absolute inset-x-0 top-0 h-px bg-white/40" />
          <div className="absolute right-[-10%] top-24 hidden h-[28rem] w-[28rem] rotate-12 border border-white/10 md:block" />
          <div className="absolute right-[6%] top-40 hidden h-[16rem] w-[16rem] rotate-12 border border-white/15 md:block" />

          <div className="mx-auto grid max-w-[1200px] gap-12 px-6 pb-18 pt-32 md:grid-cols-[1.05fr_0.95fr] md:pb-24 md:pt-40">
            <div>
              <p className="type-eyebrow text-white/45">Private enterprise AI agents</p>
              <h1 className="mt-6 max-w-3xl type-h2 text-white">
                AI agents for the tools your company already runs on.
              </h1>
              <p className="mt-6 max-w-2xl type-body text-white/68">
                Wonka connects private AI agents to your ERP, CRM, documents, emails and internal
                APIs, so teams can ask, analyze and act without sending sensitive work into generic AI tools.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <ButtonLink
                  href={meetingUrl ?? "#contact"}
                  variant="primary"
                  {...meetingTrackProps("general")}
                >
                  Map an agent workflow
                </ButtonLink>
                <Link href="https://www.wonka-ai.com/integrations" className="type-paragraph-m-bold text-white underline underline-offset-4">
                  Explore integrations
                </Link>
              </div>
            </div>

            <div className="self-end border border-white/16 bg-white/[0.04] p-6 backdrop-blur md:p-8">
              <p className="type-eyebrow text-white/38">Short answer</p>
              <p className="mt-5 type-body text-white/78">
                Wonka AI helps European companies deploy private AI agents connected to existing
                tools and data, with GDPR compliance and enterprise access control. Hosted in Azure West Europe (Microsoft Ireland).
              </p>
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden bg-white/12">
                {[
                  ["Data", "Private by design"],
                  ["Systems", "ERP, CRM, docs"],
                  ["Actions", "Confirmed writes"],
                  ["Fit", "EU companies"],
                ].map(([kicker, value]) => (
                  <div key={kicker} className="bg-black/70 p-4">
                    <p className="type-eyebrow text-white/35">{kicker}</p>
                    <p className="mt-2 type-paragraph-m-bold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-6 py-18 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:items-start">
            <div className="md:sticky md:top-24">
              <p className="type-eyebrow text-text/45">What they connect to</p>
              <h2 className="mt-5 type-h4">The agent sits on top of your real operating system.</h2>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border md:grid-cols-5">
              {connectors.map((connector) => (
                <div key={connector.name} className="group flex h-28 items-center justify-center bg-background p-6 md:h-32">
                  <Image
                    src={connector.logo}
                    alt={connector.name}
                    width={92}
                    height={34}
                    className="max-h-9 w-auto max-w-[7rem] object-contain grayscale transition duration-300 group-hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-dashed border-border bg-mid-gray">
          <div className="mx-auto max-w-[1200px] px-6 py-18 md:py-24">
            <div className="max-w-2xl">
              <p className="type-eyebrow text-text/45">Agent patterns</p>
              <h2 className="mt-5 type-h4">Not one assistant. A set of controlled business agents.</h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-4">
              {agentTypes.map((agent) => (
                <article key={agent.title} className="rounded-lg bg-background p-6 md:p-7">
                  <p className="type-eyebrow text-text/35">{agent.label}</p>
                  <h3 className="mt-4 type-h6">{agent.title}</h3>
                  <p className="mt-4 type-paragraph-m text-text/62">{agent.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1200px] gap-12 px-6 py-18 md:grid-cols-[1fr_1fr] md:py-24">
          <div>
            <p className="type-eyebrow text-text/45">Odoo example</p>
            <h2 className="mt-5 type-h4">Ask Odoo what happened. Then let the agent prepare the next move.</h2>
          </div>
          <div className="border-l border-dashed border-border pl-6 md:pl-10">
            <p className="type-body text-text/70">
              A Wonka Odoo agent can inspect CRM opportunities, invoices, purchase orders, project
              records or stock levels, then return a clear answer with the underlying business context.
              When an action is needed, it can propose the write-back and wait for human validation.
            </p>
            <div className="mt-8 bg-black p-6 text-white">
              <p className="type-eyebrow text-white/35">Example prompt</p>
              <p className="mt-4 type-body text-white/78">
                Which Odoo opportunities have had no activity for 30 days, what is the revenue at risk,
                and what follow-up should each sales rep send?
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-dashed border-border">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-18 md:grid-cols-[0.75fr_1.25fr] md:py-24">
            <div>
              <p className="type-eyebrow text-text/45">Deployment path</p>
              <h2 className="mt-5 type-h4">From messy workflow to governed agent.</h2>
            </div>
            <ol className="grid gap-4">
              {steps.map((step, index) => (
                <li key={step} className="grid gap-4 rounded-lg bg-mid-gray p-5 md:grid-cols-[5rem_1fr] md:p-6">
                  <span className="type-h5 text-text/24">{String(index + 1).padStart(2, "0")}</span>
                  <p className="type-body text-text/68">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-[900px] px-6 py-18 md:py-24">
          <p className="type-eyebrow text-text/45">FAQ</p>
          <h2 className="mt-5 type-h4">What answer engines should understand about Wonka.</h2>
          <div className="mt-10 divide-y divide-dashed divide-border">
            {faqItems.map((item) => (
              <article key={item.question} className="py-6">
                <h3 className="type-body font-medium">{item.question}</h3>
                <p className="mt-3 type-paragraph-m text-text/62">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Cta id="contact" meetingUrl={meetingUrl} meetingTrackType="general" />
    </>
  );
}
