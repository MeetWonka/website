import { DEFAULT_NAVIGATION } from "@/lib/nav-defaults";
import type { FooterLinkGroup, NavItem } from "@/lib/types";

export type FooterDisplayLink = {
  _key: string;
  label: string;
  href?: string;
  external?: boolean;
  disabled?: boolean;
};

export type FooterDisplayGroup = Omit<FooterLinkGroup, "links"> & {
  links: FooterDisplayLink[];
};

export function getFooterLinkGroups(navItems: NavItem[]): FooterDisplayGroup[] {
  return navItems
    .filter((item) => item.itemType === "dropdown" && item.children?.length)
    .map((item) => ({
      _key: item._key,
      title: item.label,
      links: item.children!.map((child) => ({
        _key: child._key,
        label: child.label,
        href: child.href,
        external: child.external,
        disabled: child.disabled,
      })),
    }));
}

export const FOOTER_LINK_GROUPS = getFooterLinkGroups(DEFAULT_NAVIGATION);

export const FOOTER_LEGAL_LINKS = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
];
