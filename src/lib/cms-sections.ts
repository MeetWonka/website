import type { SecurityData, UseCasesData } from "@/lib/types";

export const DEFAULT_USE_CASES: UseCasesData = {
  eyebrow: "Use cases",
  heading: "The work that used to wait now doesn't. Across teams.",
  industries: [
    {
      _key: "sales",
      label: "Sales",
      workflows: [
        {
          _key: "sales-w0",
          title: "Lead follow-up",
          description:
            "A lead comes in. It's logged and answered before it goes cold.",
          bullets: [
            "Captured from form or email",
            "Opportunity created in CRM",
            "Follow-up sent with the right info or meeting link",
          ],
        },
        {
          _key: "sales-w1",
          title: "Sales order processing",
          description: "Order arrives. It's entered and confirmed without retyping.",
          bullets: [
            "Details extracted from email or attachment",
            "Order created in ERP, planning updated",
            "Team notified, confirmation sent",
          ],
        },
        {
          _key: "sales-w2",
          title: "Sales intelligence dashboard",
          description:
            "A custom application that gives the sales team live visibility into pipeline, account activity, and next best actions without switching between five tools.",
          bullets: [
            "Built around your CRM and data sources",
            "Surfaces priority accounts and signals",
            "Accessible to the whole team, not just the analysts",
          ],
        },
      ],
    },
    {
      _key: "ops",
      label: "Operations",
      workflows: [
        {
          _key: "ops-w0",
          title: "Order intake",
          description: "Incoming orders parsed and routed without manual entry.",
          bullets: [
            "Extracted from email or PDF",
            "Validated against rules",
            "Pushed into ERP automatically",
          ],
        },
        {
          _key: "ops-w1",
          title: "Planning updates",
          description: "Changes reflected across systems the moment they happen.",
          bullets: [
            "Status synced across tools",
            "Stakeholders notified",
            "Exceptions flagged for review",
          ],
        },
        {
          _key: "ops-w2",
          title: "Operations dashboard",
          description:
            "A single live view of throughput, blockers and next actions across teams.",
          bullets: [
            "Built on your operational data",
            "Surfaces bottlenecks in real time",
            "Shared across operations and leadership",
          ],
        },
      ],
    },
    {
      _key: "hr",
      label: "HR",
      workflows: [
        {
          _key: "hr-w0",
          title: "Policy answers",
          description:
            "Employees get accurate answers in seconds, sourced from your handbook.",
          bullets: [
            "Trained on internal HR documents",
            "Answers cite the source",
            "Escalates complex cases to HR",
          ],
        },
        {
          _key: "hr-w1",
          title: "Onboarding assistant",
          description:
            "New hires guided through their first weeks without manual handholding.",
          bullets: [
            "Personalised checklist per role",
            "Reminders for documents and trainings",
            "HR notified on progress",
          ],
        },
        {
          _key: "hr-w2",
          title: "People dashboard",
          description:
            "A custom view that gives HR live visibility into headcount, requests and key milestones.",
          bullets: [
            "Built around your HRIS data",
            "Surfaces upcoming reviews and contracts",
            "Accessible to managers and HR",
          ],
        },
      ],
    },
    {
      _key: "support",
      label: "Support",
      workflows: [
        {
          _key: "support-w0",
          title: "Ticket triage",
          description: "Every incoming request classified and routed in seconds.",
          bullets: [
            "Captured from email, chat or form",
            "Categorised and prioritised",
            "Assigned to the right team",
          ],
        },
        {
          _key: "support-w1",
          title: "Reply drafting",
          description: "Agents start from a draft, not a blank page.",
          bullets: [
            "Pulls answers from your knowledge base",
            "Matches tone and policy",
            "Reviewed before sending",
          ],
        },
        {
          _key: "support-w2",
          title: "Support insights dashboard",
          description:
            "A live view of volume, satisfaction and recurring issues across channels.",
          bullets: [
            "Built on your ticket data",
            "Surfaces top themes and trends",
            "Shared with support and product",
          ],
        },
      ],
    },
    {
      _key: "finance",
      label: "Finance",
      workflows: [
        {
          _key: "finance-w0",
          title: "Invoice processing",
          description: "Incoming invoices captured, validated and ready for approval.",
          bullets: [
            "Extracted from email or PDF",
            "Matched against orders",
            "Routed for approval automatically",
          ],
        },
        {
          _key: "finance-w1",
          title: "Expense reports",
          description: "Reports compiled and checked without chasing receipts.",
          bullets: [
            "Receipts parsed and categorised",
            "Policy checks applied",
            "Flagged items raised for review",
          ],
        },
        {
          _key: "finance-w2",
          title: "Finance dashboard",
          description:
            "A custom view that gives finance live visibility into cash, AR and key KPIs.",
          bullets: [
            "Built around your accounting data",
            "Surfaces overdue and risk items",
            "Accessible to finance and leadership",
          ],
        },
      ],
    },
  ],
};

export const DEFAULT_SECURITY: SecurityData = {
  eyebrow: null,
  heading: "Your data is always yours.",
  body: null,
};

export const DEFAULT_WONKA_CHAT_SECURITY: SecurityData = {
  eyebrow: "Security",
  heading: "Your data is always yours.",
  body: "WonkaChat is designed for companies that need AI to be useful, governed and secure. Your team gets the speed of AI with the controls your organisation expects.",
};

function hasUseCaseIndustries(data: UseCasesData | null | undefined): boolean {
  return (data?.industries?.length ?? 0) > 0;
}

export function resolveSecuritySection(
  cms: SecurityData | null | undefined,
  defaults: SecurityData = DEFAULT_SECURITY,
): SecurityData {
  return {
    eyebrow: cms?.eyebrow ?? defaults.eyebrow,
    heading: cms?.heading ?? defaults.heading,
    body: cms?.body ?? defaults.body,
  };
}

export function resolveUseCasesSection(
  pageCms: UseCasesData | null | undefined,
  homepageCms: UseCasesData | null | undefined,
  defaults: UseCasesData = DEFAULT_USE_CASES,
): UseCasesData {
  const source = hasUseCaseIndustries(pageCms)
    ? pageCms
    : hasUseCaseIndustries(homepageCms)
      ? homepageCms
      : null;

  return {
    eyebrow: source?.eyebrow ?? defaults.eyebrow,
    heading: source?.heading ?? defaults.heading,
    industries: hasUseCaseIndustries(source)
      ? source!.industries
      : defaults.industries,
  };
}
