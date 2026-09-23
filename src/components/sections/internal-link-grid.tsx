import type { InternalLink } from "@/lib/internal-links";

interface InternalLinkGridProps {
  title: string;
  links: InternalLink[];
  className?: string;
}

export function InternalLinkGrid({ title, links, className = "" }: InternalLinkGridProps) {
  if (!links.length) return null;

  return (
    <section className={`border-t border-dashed border-border pt-12 ${className}`}>
      <h2 className="type-h5 mb-6">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="group flex min-h-full flex-col rounded-lg border border-border bg-mid-gray p-5 transition-colors hover:border-accent hover:bg-background"
          >
            <span className="type-eyebrow mb-3 text-text/35">{link.eyebrow}</span>
            <span className="type-paragraph-m-bold transition-colors group-hover:text-accent">{link.title}</span>
            <span className="mt-2 type-paragraph-s text-text/55">{link.description}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
