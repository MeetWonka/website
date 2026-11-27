interface JsonLdProps {
  id: string;
  data: Record<string, unknown>;
}

/** JSON-LD structured data — server-safe; type application/ld+json is not executed as JS. */
export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
