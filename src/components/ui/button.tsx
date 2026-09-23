import Link from "next/link";
import {
  ButtonLink as PortableButtonLink,
  type ButtonLinkProps as PortableButtonLinkProps,
} from "@wonka/react/button";

export {
  ArrowIcon,
  Button,
  buttonVariants,
  type ButtonProps,
  type ButtonVariant,
} from "@wonka/react/button";

export type ButtonLinkProps = Omit<
  PortableButtonLinkProps,
  "linkComponent"
>;

/** Next.js navigation adapter for the portable design-system primitive. */
export function ButtonLink(props: ButtonLinkProps) {
  return <PortableButtonLink {...props} linkComponent={Link} />;
}
