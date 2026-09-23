import { Fragment, type ElementType } from "react";

/** Renders text with `\n` converted to `<br />` line breaks. */
export function MultilineText({
  text,
  className,
  as: Tag = "span",
  id,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  id?: string;
}) {
  const lines = text.split("\n");

  return (
    <Tag className={className} id={id}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </Tag>
  );
}

export const DEFAULT_MEETING_LABEL = "Book a 30 min call";
