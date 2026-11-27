import type { HubPopularLink } from "@/lib/hub-popular-links";

interface HubPopularLinksProps {
  title: string;
  links: HubPopularLink[];
}

export function HubPopularLinks({ title, links }: HubPopularLinksProps) {
  if (!links.length) return null;

  return (
    <section className="mt-14 rounded-lg border border-border p-6">
      <h2 className="type-h5">{title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="group rounded-md border border-border bg-mid-gray p-4 transition-colors hover:border-accent hover:bg-background">
            <h3 className="type-paragraph-m-bold group-hover:text-accent">{link.title}</h3>
            <p className="mt-2 type-paragraph-s leading-relaxed text-text/55">{link.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
