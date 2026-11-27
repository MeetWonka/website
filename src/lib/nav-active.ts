/** Locale roots: only ever active on an exact match. */
const ROOT_HREFS = new Set(["/", "/fr", "/nl"]);

function normalizePath(path: string): string {
  const clean = path.split(/[?#]/)[0] || "/";
  return clean.length > 1 && clean.endsWith("/") ? clean.slice(0, -1) : clean;
}

/**
 * Nav hrefs are localized (`/fr/wonka-chat`) and compared against the raw
 * pathname (`/fr/wonka-chat/odoo`), so the locale prefix matches naturally.
 */
export function isNavLinkActive(
  pathname: string,
  href: string,
  siblingHrefs: string[] = [],
): boolean {
  if (href.startsWith("/#") || !href.startsWith("/")) return false;
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  if (current === target) return true;
  if (ROOT_HREFS.has(target)) return false;
  if (!current.startsWith(`${target}/`)) return false;

  const hasMoreSpecificMatch = siblingHrefs.some((raw) => {
    const other = normalizePath(raw);
    return (
      other !== target &&
      other.startsWith(`${target}/`) &&
      (current === other || current.startsWith(`${other}/`))
    );
  });

  return !hasMoreSpecificMatch;
}

export function isNavItemActive(
  pathname: string,
  item: {
    href?: string;
    children?: { href: string }[];
  },
): boolean {
  const childHrefs = item.children?.map((child) => child.href) ?? [];

  if (
    item.href &&
    isNavLinkActive(pathname, item.href, childHrefs)
  ) {
    return true;
  }

  return childHrefs.some((href) =>
    isNavLinkActive(pathname, href, childHrefs),
  );
}
