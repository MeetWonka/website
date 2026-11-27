"use client";
import {
  ActionButton,
  Icon,
  IdentityAvatar,
  SearchInput,
  StateNotice,
  Tag,
} from "./foundation";
import type { AgentTemplate, SaveState, ViewState } from "./types";
export function localizedTemplate(t: AgentTemplate, locale = "fr") {
  return {
    name: t.translations?.title[locale] || t.name,
    description: t.translations?.description[locale] || t.description,
  };
}
export function templateConnectors(t: AgentTemplate) {
  return Array.from(
    new Set([
      ...t.mcp,
      ...(t.mcpServerNames ?? []),
      ...t.tools.filter((x) => !x.includes("_mcp_")),
    ]),
  )
    .filter((x) => x !== "file_search")
    .slice(0, 6);
}
export function filterTemplates(
  templates: AgentTemplate[],
  query: string,
  category = "all",
  locale = "fr",
) {
  const q = query.trim().toLocaleLowerCase();
  return templates.filter((t) => {
    const l = localizedTemplate(t, locale);
    return (
      (category === "all" || t.category === category) &&
      `${l.name} ${l.description} ${(t.tags ?? []).join(" ")}`
        .toLocaleLowerCase()
        .includes(q)
    );
  });
}
export function TemplateCard({
  template: t,
  onSelect,
  locale = "fr",
  compact = false,
}: {
  template: AgentTemplate;
  onSelect: (template: AgentTemplate) => void;
  locale?: string;
  compact?: boolean;
}) {
  const l = localizedTemplate(t, locale);
  let hash = 0;
  for (const c of t.id) hash = (hash * 31 + c.charCodeAt(0)) | 0;
  return (
    <button
      type="button"
      className="wp-template"
      data-compact={compact}
      data-motion-id={`template-${t.id}`}
      onClick={() => onSelect(t)}
    >
      <div className="wp-template-cover" data-palette={Math.abs(hash) % 3}>
        {t.templateMeta?.imageUrl && (
          <img src={t.templateMeta.imageUrl} alt="" loading="lazy" />
        )}
      </div>
      <div className="wp-template-body">
        <IdentityAvatar name={l.name} />
        <h2 className="wp-card-title">{l.name}</h2>
        <p>{l.description}</p>
        <div className="wp-wrap">
          {templateConnectors(t).map((n) => (
            <Tag key={n}>{n.replace(/_v\d+$/, "").replaceAll("_", " ")}</Tag>
          ))}
        </div>
        <small>Par Wonka</small>
      </div>
    </button>
  );
}
export function TemplateGallery({
  templates,
  search,
  onSearchChange,
  category = "all",
  onCategoryChange,
  onSelect,
  locale = "fr",
  state = "ready",
}: {
  templates: AgentTemplate[];
  search: string;
  onSearchChange: (v: string) => void;
  category?: string;
  onCategoryChange: (v: string) => void;
  onSelect: (t: AgentTemplate) => void;
  locale?: string;
  state?: ViewState;
}) {
  const visible = filterTemplates(templates, search, category, locale),
    cats = Array.from(new Set(templates.map((t) => t.category))).sort();
  return (
    <div className="wp-stack">
      <header className="wp-page-heading">
        <div>
          <p>Agents / Templates</p>
          <h1>Un point de départ pour chaque métier.</h1>
          <p>
            Choisissez un template, puis adaptez-le à vos outils et à votre
            méthode.
          </p>
        </div>
        <Tag>{templates.length} templates</Tag>
      </header>
      <SearchInput
        label="Rechercher un template"
        value={search}
        onChange={onSearchChange}
      />
      <div
        className="wp-chips"
        role="group"
        aria-label="Catégories de templates"
      >
        {["all", ...cats].map((c) => (
          <button
            type="button"
            key={c}
            aria-pressed={c === category}
            onClick={() => onCategoryChange(c)}
          >
            {c === "all" ? "Tous" : c}{" "}
            <span>
              {c === "all"
                ? templates.length
                : templates.filter((t) => t.category === c).length}
            </span>
          </button>
        ))}
      </div>
      {state !== "ready" ? (
        <StateNotice state={state} />
      ) : visible.length ? (
        <div className="wp-grid wp-template-grid">
          {visible.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              locale={locale}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <StateNotice state="empty">
          Aucun template ne correspond à votre recherche.
        </StateNotice>
      )}
    </div>
  );
}
export function TemplateDetail({
  template: t,
  locale = "fr",
  onUse,
  canUse = true,
  state = "draft",
}: {
  template: AgentTemplate;
  locale?: string;
  onUse: () => void;
  canUse?: boolean;
  state?: SaveState;
}) {
  const l = localizedTemplate(t, locale);
  return (
    <div className="wp-stack" data-motion-id="template-detail">
      <div className="wp-identity">
        <IdentityAvatar name={l.name} large />
        <div>
          <Tag>{t.category}</Tag>
          <h2>{l.name}</h2>
          <p>Par Wonka</p>
        </div>
      </div>
      <p>{l.description}</p>
      <div className="wp-wrap">
        {templateConnectors(t).map((n) => (
          <Tag key={n}>{n}</Tag>
        ))}
      </div>
      <section>
        <h3>Instructions</h3>
        <pre className="wp-prose">
          {t.instructions ||
            "Les instructions détaillées ne sont pas incluses dans la projection publique du catalogue."}
        </pre>
      </section>
      {t.capabilities.conversation_starters.length > 0 && (
        <section>
          <h3>Pour commencer</h3>
          <ul>
            {t.capabilities.conversation_starters.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </section>
      )}
      <ActionButton
        tone="primary"
        disabled={!canUse || state === "saving" || state === "saved"}
        onClick={onUse}
      >
        <Icon name={state === "saved" ? "check" : "plus"} />
        {state === "saving"
          ? "Création…"
          : state === "saved"
            ? "Ajouté à mes agents"
            : "Utiliser ce template"}
      </ActionButton>
      {!canUse && (
        <p role="status">
          La création d’agents n’est pas autorisée pour votre rôle.
        </p>
      )}
      {state === "error" && (
        <p role="alert">Le template n’a pas pu être ajouté. Réessayez.</p>
      )}
    </div>
  );
}
