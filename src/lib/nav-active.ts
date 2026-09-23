export function isNavLinkActive(
  pathname: string,
  href: string,
  siblingHrefs: string[] = [],
): boolean {
  if (href.startsWith("/#")) return false;
  if (pathname === href) return true;
  if (!pathname.startsWith(`${href}/`)) return false;

  const hasMoreSpecificMatch = siblingHrefs.some(
    (other) =>
      other !== href &&
      other.startsWith(`${href}/`) &&
      (pathname === other || pathname.startsWith(`${other}/`)),
  );

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
