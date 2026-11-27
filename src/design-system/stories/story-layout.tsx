export function FoundationHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="sb-wonka-prose mb-12">
      <p className="sb-wonka-kicker mb-4">{eyebrow}</p>
      <h1 className="type-h4 mb-5">{title}</h1>
      <p className="text-text/70">{description}</p>
    </header>
  );
}

export function TokenMeta({
  id,
  value,
  description,
}: {
  id: string;
  value: unknown;
  description?: string | null;
}) {
  return (
    <div className="sb-wonka-token-meta">
      <code className="sb-wonka-token-id">{id}</code>
      <code className="sb-wonka-token-value">
        {typeof value === "string" || typeof value === "number"
          ? value
          : JSON.stringify(value)}
      </code>
      {description ? (
        <p className="type-paragraph-s text-text/60">{description}</p>
      ) : null}
    </div>
  );
}
