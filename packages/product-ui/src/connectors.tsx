"use client";
import {
  ActionButton,
  Field,
  Icon,
  Panel,
  SearchInput,
  StateNotice,
  Tag,
} from "./foundation";
import type { Connector, ViewState } from "./types";
export const connectionLabels = {
  disconnected: "Non connecté",
  configuring: "À configurer",
  authorizing: "Autorisation requise",
  connecting: "Connexion en cours",
  connected: "Connecté",
  error: "Connexion échouée",
  expired: "Session expirée",
} as const;
export function ConnectorCard({
  connector: c,
  onAction,
  onFavorite,
  onConfigure,
  onShare,
}: {
  connector: Connector;
  onAction?: (id: string) => void;
  onFavorite?: (id: string) => void;
  onConfigure?: (id: string) => void;
  onShare?: (id: string) => void;
}) {
  const busy = c.state === "connecting" || c.state === "authorizing";
  return (
    <article
      className="wp-connector"
      data-state={c.state}
      data-favorite={c.favorite || undefined}
      data-motion-id={`connector-${c.id}`}
    >
      <header>
        <span className="wp-connector-icon">
          {c.icon ? (
            <img src={c.icon} alt="" />
          ) : (
            <Icon name="plug" size={24} />
          )}
        </span>
        <div className="wp-grow">
          <h2 className="wp-card-title">{c.name}</h2>
          <small>{c.category}</small>
        </div>
        <ActionButton
          tone="quiet"
          aria-label={`Favori : ${c.name}`}
          aria-pressed={!!c.favorite}
          disabled={!onFavorite}
          onClick={() => onFavorite?.(c.id)}
        >
          <Icon name="star" />
        </ActionButton>
      </header>
      <p>{c.description}</p>
      <div className="wp-wrap">
        {c.managed && <Tag>Géré par l’organisation</Tag>}
        {c.consumeOnly && <Tag>Utilisation uniquement</Tag>}
        {c.tags?.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <footer>
        <Tag
          tone={
            c.state === "connected"
              ? "success"
              : c.state === "error"
                ? "error"
                : busy
                  ? "info"
                  : "neutral"
          }
        >
          {connectionLabels[c.state]}
        </Tag>
        <div className="wp-actions">
          {!c.consumeOnly && (
            <>
              <ActionButton
                tone="quiet"
                aria-label={`Configurer ${c.name}`}
                disabled={!onConfigure}
                onClick={() => onConfigure?.(c.id)}
              >
                <Icon name="settings" />
              </ActionButton>
              {c.managed && (
                <ActionButton
                  tone="quiet"
                  aria-label={`Partager ${c.name}`}
                  disabled={!onShare}
                  onClick={() => onShare?.(c.id)}
                >
                  <Icon name="user" />
                </ActionButton>
              )}
            </>
          )}
          <ActionButton
            disabled={busy || c.consumeOnly || !onAction}
            onClick={() => onAction?.(c.id)}
          >
            {busy
              ? "Connexion…"
              : c.state === "connected"
                ? "Déconnecter"
                : c.state === "error" || c.state === "expired"
                  ? "Reconnecter"
                  : c.state === "configuring"
                    ? "Configurer"
                    : "Se connecter"}
          </ActionButton>
        </div>
      </footer>
    </article>
  );
}
export function ConnectorConfiguration({
  connector,
  fields,
  values,
  onChange,
  onSubmit,
  error,
  saving = false,
}: {
  connector: Connector;
  fields: { id: string; label: string; secret?: boolean; required?: boolean }[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
  onSubmit: () => void;
  error?: string;
  saving?: boolean;
}) {
  return (
    <form
      className="wp-stack"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <p>Configurer {connector.name}</p>
      {fields.map((f) => (
        <Field key={f.id} label={f.label} required={f.required}>
          <input
            type={f.secret ? "password" : "text"}
            autoComplete="off"
            required={f.required}
            value={values[f.id] ?? ""}
            onChange={(e) => onChange(f.id, e.target.value)}
          />
        </Field>
      ))}
      {error && <p role="alert">{error}</p>}
      <ActionButton tone="primary" type="submit" disabled={saving}>
        {saving ? "Vérification…" : "Enregistrer la connexion"}
      </ActionButton>
    </form>
  );
}
export function ConnectorAuthorization({
  connector,
  onReturn,
  onCancel,
}: {
  connector: Connector;
  onReturn: () => void;
  onCancel: () => void;
}) {
  return (
    <Panel
      title={`Autoriser ${connector.name}`}
      description="La connexion se poursuit dans la fenêtre du fournisseur."
    >
      <p>Vérifiez le compte et les accès demandés, puis revenez dans Wonka.</p>
      <div className="wp-actions">
        <ActionButton onClick={onCancel}>Annuler</ActionButton>
        <ActionButton tone="primary" onClick={onReturn}>
          Revenir à Wonka
        </ActionButton>
      </div>
    </Panel>
  );
}
export function ConnectorCatalog({
  connectors,
  search,
  onSearchChange,
  category = "all",
  onCategoryChange,
  state = "ready",
  ...actions
}: {
  connectors: Connector[];
  search: string;
  onSearchChange: (s: string) => void;
  category?: string;
  onCategoryChange?: (s: string) => void;
  state?: ViewState;
} & Omit<Parameters<typeof ConnectorCard>[0], "connector">) {
  const cats = Array.from(new Set(connectors.map((c) => c.category)));
  const visible = connectors.filter(
    (c) =>
      (category === "all" || c.category === category) &&
      `${c.name} ${c.description} ${(c.tags ?? []).join(" ")}`
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()),
  );
  return (
    <div className="wp-stack">
      <header className="wp-page-heading">
        <div>
          <h1>Connecteurs</h1>
          <p>Connectez vos outils et gérez leurs accès.</p>
        </div>
        <Tag>
          {connectors.filter((c) => c.state === "connected").length} connectés
        </Tag>
      </header>
      <SearchInput
        label="Rechercher un connecteur"
        value={search}
        onChange={onSearchChange}
      />
      <div
        className="wp-chips"
        role="group"
        aria-label="Catégories de connecteurs"
      >
        {["all", ...cats].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => onCategoryChange?.(c)}
          >
            {c === "all" ? "Tous" : c}
          </button>
        ))}
      </div>
      {state !== "ready" ? (
        <StateNotice state={state} />
      ) : visible.length === 0 ? (
        <StateNotice state="empty">
          Aucun connecteur ne correspond à la recherche.
        </StateNotice>
      ) : (
        <div className="wp-grid">
          {visible.map((c) => (
            <ConnectorCard key={c.id} connector={c} {...actions} />
          ))}
        </div>
      )}
    </div>
  );
}
