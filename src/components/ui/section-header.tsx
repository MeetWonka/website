import { MultilineText } from "@/lib/cms-text";
import { cn } from "@/lib/utils";
import { headingClass, type HeadingRole } from "@/lib/design-tokens";

interface SectionHeaderProps {
  eyebrow?: React.ReactNode;
  heading: string;
  body?: string;
  headingId?: string;
  headingAs?: "h1" | "h2";
  /** Section titles use type-h4; page heroes use type-h3 */
  headingRole?: HeadingRole;
  align?: "center" | "left";
  bordered?: boolean;
  className?: string;
  headingClassName?: string;
  bodyClassName?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  body,
  headingId,
  headingAs = "h2",
  headingRole = "section",
  align = "center",
  bordered = false,
  className,
  headingClassName,
  bodyClassName,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered && "items-center",
        bordered && "border-b border-dashed border-border pb-10",
        className,
      )}
    >
      {eyebrow ? (
        centered ? (
          eyebrow
        ) : (
          <>
            {eyebrow}
          </>
        )
      ) : null}
      <MultilineText
        text={heading}
        as={headingAs}
        id={headingId}
        className={cn(
          headingClass[headingRole],
          "text-text",
          centered && "max-w-[44.875rem] text-center",
          headingClassName,
        )}
      />
      {body ? (
        <MultilineText
          text={body}
          as="p"
          className={cn(
            "type-body text-text opacity-80",
            centered && "max-w-[44.875rem] text-center",
            !centered && "max-w-md text-text/65",
            bodyClassName,
          )}
        />
      ) : null}
    </div>
  );
}
