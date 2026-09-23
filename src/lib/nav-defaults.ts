import type { NavItem } from "@/lib/types";

export const HEADER_CTA_LABEL = "Get started";

/** Toggle when locale switching is ready to ship. */
export const SHOW_LANGUAGE_SWITCHER = false;

export const DEFAULT_NAVIGATION: NavItem[] = [
  {
    _key: "ai-workspace",
    itemType: "dropdown",
    label: "AI Workspace",
    href: "/wonka-chat",
    children: [
      {
        _key: "overview",
        label: "Overview",
        href: "/wonka-chat",
        description: "Discover Wonka Workspace",
      },
      {
        _key: "ai-chat",
        label: "AI Chat",
        href: "/workspace/ai-chat",
        description: "Chat with your data, safely",
      },
      {
        _key: "ai-agents",
        label: "AI Agents",
        href: "/workspace/ai-agents",
        description: "Delegate recurring tasks to AI",
        disabled: true,
      },
      {
        _key: "ai-apps",
        label: "AI Apps",
        href: "/workspace/ai-apps",
        description: "Complex workflows as simple applications",
        disabled: true,
      },
      {
        _key: "ai-automations",
        label: "AI Automations",
        href: "/workspace/ai-automations",
        description: "Let AI start and finish the job",
        disabled: true,
      },
      {
        _key: "governance",
        label: "Governance",
        href: "/workspace/governance",
        disabled: true,
      },
      {
        _key: "integrations",
        label: "Integrations",
        href: "/integrations",
        disabled: true,
      },
    ],
  },
  {
    _key: "ai-services",
    itemType: "dropdown",
    label: "AI Services",
    href: "/services",
    children: [
      {
        _key: "ai-strategy",
        label: "AI Strategy",
        href: "/start-ai",
        description: "Become AI native in four weeks",
      },
      {
        _key: "ai-agent-development",
        label: "AI Agent Development",
        href: "/services/ai-agent-development",
        description: "We build your agents and ship them",
        disabled: true,
      },
      {
        _key: "ai-app-development",
        label: "AI App Development",
        href: "/services/ai-app-development",
        description: "Custom AI applications on your systems",
        disabled: true,
      },
      {
        _key: "ai-training",
        label: "AI Training",
        href: "/services/ai-training",
        description: "For your developers and your teams",
        disabled: true,
      },
    ],
  },
  {
    _key: "resources",
    itemType: "dropdown",
    label: "Resources",
    children: [
      {
        _key: "use-cases",
        label: "Use cases",
        href: "/use-cases",
        description: "The work AI already takes over",
        disabled: true,
      },
      {
        _key: "clients",
        label: "Clients",
        href: "/clients",
        description: "What we built at 200 organisations",
        disabled: true,
      },
      {
        _key: "blog",
        label: "Blog",
        href: "/blog",
        disabled: true,
      },
    ],
  },
  {
    _key: "company",
    itemType: "dropdown",
    label: "Company",
    children: [
      {
        _key: "about",
        label: "About Wonka",
        href: "/about",
        disabled: true,
      },
      { _key: "team", label: "Team", href: "/team", disabled: true },
      {
        _key: "jobs",
        label: "Jobs",
        href: "https://wonka-ai.odoo.com/jobs",
        external: true,
      },
      { _key: "contact", label: "Contact", href: "/contact" },
    ],
  },
  {
    _key: "pricing",
    itemType: "link",
    label: "Pricing",
    href: "/pricing",
  },
];

export function resolveNavigation(
  cms: NavItem[] | null | undefined,
): NavItem[] {
  void cms;
  return DEFAULT_NAVIGATION;
}
