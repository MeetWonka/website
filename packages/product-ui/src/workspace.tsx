"use client";
import type { ReactNode } from "react";
import {
  ActionButton,
  Icon,
  IdentityAvatar,
  SearchInput,
  StateNotice,
  Tag,
} from "./foundation";
import type {
  AgentDraft,
  ExecutionStep,
  Message,
  PermissionGrant,
  SaveState,
  ViewState,
} from "./types";
export type WorkspacePage =
  | "chat"
  | "agents"
  | "templates"
  | "connectors"
  | "skills"
  | "settings";
export function ProductShell({
  page,
  onNavigate,
  children,
  aside,
  collapsed = false,
  onCollapsedChange,
  user = { name: "Utilisateur", workspace: "Mon espace" },
  history = [],
}: {
  page: WorkspacePage;
  onNavigate: (page: WorkspacePage) => void;
  children: ReactNode;
  aside?: ReactNode;
  collapsed?: boolean;
  user?: { name: string; workspace: string };
  history?: { id: string; title: string; onOpen: () => void }[];
  onCollapsedChange?: (v: boolean) => void;
}) {
  const routes: { id: WorkspacePage; label: string; icon: string }[] = [
    { id: "chat", label: "Nouveau chat", icon: "plus" },
    { id: "agents", label: "Mes agents", icon: "grid" },
    { id: "templates", label: "Templates", icon: "book" },
    { id: "connectors", label: "Connecteurs", icon: "plug" },
    { id: "skills", label: "Skills", icon: "book" },
    { id: "settings", label: "Paramètres", icon: "settings" },
  ];
  return (
    <div className="wp-shell" data-collapsed={collapsed}>
      <aside className="wp-nav">
        <header>
          <span className="wp-wordmark" role="img" aria-label="Wonka" />
          <ActionButton
            tone="quiet"
            aria-label={
              collapsed ? "Déployer la navigation" : "Réduire la navigation"
            }
            onClick={() => onCollapsedChange?.(!collapsed)}
          >
            <Icon name="grid" />
          </ActionButton>
        </header>
        <nav aria-label="Navigation principale">
          {routes.map((r) => (
            <button
              type="button"
              key={r.id}
              aria-current={page === r.id ? "page" : undefined}
              aria-label={r.label}
              onClick={() => onNavigate(r.id)}
            >
              <Icon name={r.icon} />
              <span>{r.label}</span>
            </button>
          ))}
        </nav>
        {history.length > 0 && (
          <section className="wp-history">
            <small>Conversations récentes</small>
            {history.map((item) => (
              <button key={item.id} type="button" onClick={item.onOpen}>
                {item.title}
              </button>
            ))}
          </section>
        )}
        <footer>
          <IdentityAvatar name={user.name} />
          <span>
            {user.name}
            <small>{user.workspace}</small>
          </span>
        </footer>
      </aside>
      <main className="wp-main" id="product-main">
        {children}
      </main>
      {aside && (
        <aside className="wp-sidepanel" aria-label="Configuration de l’agent">
          {aside}
        </aside>
      )}
    </div>
  );
}
export function ProductAgentCard({
  agent,
  onChat,
  onEdit,
  canEdit = true,
  selected = false,
  author,
}: {
  agent: AgentDraft;
  onChat: () => void;
  onEdit?: () => void;
  canEdit?: boolean;
  selected?: boolean;
  author?: string;
}) {
  return (
    <article
      className="wp-agent-card"
      data-selected={selected}
      data-motion-id={`agent-${agent.id}`}
    >
      <div className="wp-identity">
        <IdentityAvatar name={agent.name} />
        <div>
          <h2 className="wp-card-title">{agent.name}</h2>
          {author && <small>Par {author}</small>}
        </div>
      </div>
      <p>{agent.description}</p>
      <div className="wp-wrap">
        {agent.tools.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <footer>
        <ActionButton onClick={onChat}>
          Discuter <Icon name="arrow" />
        </ActionButton>
        <ActionButton
          disabled={!canEdit || !onEdit}
          tone="quiet"
          onClick={onEdit}
          aria-label={`Configurer ${agent.name}`}
        >
          <Icon name="settings" />
        </ActionButton>
      </footer>
    </article>
  );
}
export function AgentLibrary({
  agents,
  search,
  onSearchChange,
  onChat,
  onEdit,
  onCreate,
  onTemplates,
  state = "ready",
}: {
  agents: AgentDraft[];
  search: string;
  onSearchChange: (v: string) => void;
  onChat: (id: string) => void;
  onEdit: (id: string) => void;
  onCreate: () => void;
  onTemplates: () => void;
  state?: ViewState;
}) {
  const visible = agents.filter((a) =>
    `${a.name} ${a.description}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="wp-stack">
      <header className="wp-page-heading">
        <div>
          <h1>Mes agents</h1>
          <p>Votre savoir-faire, prêt à travailler.</p>
        </div>
        <div className="wp-actions">
          <ActionButton onClick={onTemplates}>
            Explorer les templates
          </ActionButton>
          <ActionButton tone="primary" onClick={onCreate}>
            <Icon name="plus" />
            Créer un agent
          </ActionButton>
        </div>
      </header>
      <SearchInput
        value={search}
        onChange={onSearchChange}
        label="Rechercher un agent"
      />
      {state !== "ready" ? (
        <StateNotice state={state} />
      ) : visible.length ? (
        <div className="wp-grid">
          {visible.map((a) => (
            <ProductAgentCard
              key={a.id}
              agent={a}
              onChat={() => onChat(a.id)}
              onEdit={() => onEdit(a.id)}
            />
          ))}
        </div>
      ) : (
        <StateNotice state="empty">
          Créez un agent ou choisissez un template pour commencer.
        </StateNotice>
      )}
    </div>
  );
}
export function ChatComposer({
  value,
  onChange,
  onSend,
  disabled = false,
  busy = false,
  agentName = "Wonka",
  connectedCount = 0,
  attachments = [],
  onAttach,
  onTools,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
  busy?: boolean;
  agentName?: string;
  connectedCount?: number;
  attachments?: string[];
  onAttach?: () => void;
  onTools?: () => void;
}) {
  return (
    <form
      className="wp-composer"
      data-motion-id="composer"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim() && !disabled && !busy) onSend();
      }}
    >
      <div className="wp-wrap">
        {attachments.map((a) => (
          <Tag key={a}>{a}</Tag>
        ))}
      </div>
      <textarea
        aria-label="Message"
        placeholder={`Écrivez à ${agentName}…`}
        rows={3}
        value={value}
        disabled={disabled || busy}
        onChange={(e) => onChange(e.target.value)}
      />
      <footer>
        <div className="wp-actions">
          <ActionButton
            tone="quiet"
            disabled={disabled || !onAttach}
            aria-label="Joindre un fichier"
            onClick={onAttach}
          >
            <Icon name="plus" />
          </ActionButton>
          <ActionButton tone="quiet" onClick={onTools} disabled={!onTools}>
            {connectedCount} outils connectés
          </ActionButton>
        </div>
        <ActionButton
          tone="primary"
          type="submit"
          disabled={disabled || busy || !value.trim()}
          aria-label="Envoyer le message"
          showArrow={false}
        >
          {busy ? "En cours…" : <Icon name="send" />}
        </ActionButton>
      </footer>
    </form>
  );
}
export function ExecutionTrace({
  steps,
  onRetry,
}: {
  steps: ExecutionStep[];
  onRetry?: (id: string) => void;
}) {
  return (
    <ol className="wp-trace" aria-label="Activité de l’agent">
      {steps.map((s) => (
        <li key={s.id} data-state={s.state} data-motion-id={`step-${s.id}`}>
          <span className="wp-trace-symbol">
            {s.state === "complete" ? (
              <Icon name="check" />
            ) : s.state === "running" ? (
              <span className="wp-spinner" />
            ) : (
              <Icon name={s.state === "error" ? "close" : "clock"} />
            )}
          </span>
          <div className="wp-grow">
            <strong>{s.name}</strong>
            <small>
              {s.source}
              {s.detail ? ` · ${s.detail}` : ""}
            </small>
          </div>
          <span>
            {
              {
                pending: "En attente",
                running: "En cours",
                complete: "Terminé",
                error: "Échec",
              }[s.state]
            }
          </span>
          {s.state === "error" && onRetry && (
            <ActionButton onClick={() => onRetry(s.id)}>Réessayer</ActionButton>
          )}
        </li>
      ))}
    </ol>
  );
}
export function SourceCitation({
  label,
  excerpt,
  expanded,
  onToggle,
}: {
  label: string;
  excerpt: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="wp-source">
      <button type="button" aria-expanded={expanded} onClick={onToggle}>
        <Icon name="file" />
        {label}
      </button>
      {expanded && <blockquote>{excerpt}</blockquote>}
    </div>
  );
}
export function ChatMessage({
  message,
  visibleCharacters,
  children,
  author,
}: {
  message: Message;
  visibleCharacters?: number;
  children?: ReactNode;
  author?: string;
}) {
  const content =
    visibleCharacters === undefined
      ? message.content
      : message.content.slice(0, Math.max(0, visibleCharacters));
  return (
    <article
      className="wp-message"
      data-role={message.role}
      data-motion-id={`message-${message.id}`}
    >
      <IdentityAvatar
        name={author ?? (message.role === "user" ? "Vous" : "Wonka")}
      />
      <div className="wp-grow">
        <strong>
          {author ?? (message.role === "user" ? "Vous" : "Wonka")}
        </strong>
        <div className="wp-prose">{content}</div>
        {children}
      </div>
    </article>
  );
}
export function DeliverablePreview({
  title,
  sections,
  sources,
  onExport,
}: {
  title: string;
  sections: { title: string; body: string }[];
  sources: string[];
  onExport?: () => void;
}) {
  return (
    <article className="wp-document" data-motion-id="deliverable">
      <header>
        <Tag>Brief client</Tag>
        {onExport && <ActionButton onClick={onExport}>Exporter</ActionButton>}
      </header>
      <h2>{title}</h2>
      {sections.map((s) => (
        <section key={s.title}>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </section>
      ))}
      <footer>
        {sources.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </footer>
    </article>
  );
}
export function SharingPanel({
  name,
  grants,
  onChange,
  onShare,
  state = "draft",
  canShare = true,
}: {
  name: string;
  grants: PermissionGrant[];
  onChange: (v: PermissionGrant[]) => void;
  onShare: () => void;
  state?: SaveState;
  canShare?: boolean;
}) {
  return (
    <section className="wp-stack" data-motion-id="sharing">
      <h2>Partager {name}</h2>
      <p>Choisissez les personnes ou équipes et leur niveau d’accès.</p>
      {grants.map((g) => (
        <div className="wp-grant" key={g.id}>
          <label>
            <input
              type="checkbox"
              checked={g.selected}
              disabled={!canShare || state === "saving"}
              onChange={(e) =>
                onChange(
                  grants.map((x) =>
                    x.id === g.id ? { ...x, selected: e.target.checked } : x,
                  ),
                )
              }
            />
            <Icon name="user" />
            {g.name}
          </label>
          <select
            value={g.role}
            aria-label={`Accès de ${g.name}`}
            disabled={!canShare || !g.selected || state === "saving"}
            onChange={(e) =>
              onChange(
                grants.map((x) =>
                  x.id === g.id
                    ? { ...x, role: e.target.value as PermissionGrant["role"] }
                    : x,
                ),
              )
            }
          >
            <option value="use">Peut utiliser</option>
            <option value="edit">Peut modifier</option>
          </select>
        </div>
      ))}
      {state === "saved" && (
        <p role="status">Accès accordé aux destinataires sélectionnés.</p>
      )}
      {state === "error" && (
        <p role="alert">
          Le partage a échoué. Les accès n’ont pas été modifiés.
        </p>
      )}
      <ActionButton
        tone="primary"
        disabled={
          !canShare || state === "saving" || !grants.some((g) => g.selected)
        }
        onClick={onShare}
      >
        {state === "saving" ? "Partage…" : "Partager"}
      </ActionButton>
      {!canShare && <Tag>Vous ne pouvez pas gérer les accès de cet agent.</Tag>}
    </section>
  );
}
