"use client";
import type { ReactNode } from "react";
import {
  ActionButton,
  Field,
  Icon,
  IdentityAvatar,
  Panel,
  Tag,
  Toggle,
} from "./foundation";
import type { Member, SaveState } from "./types";
export type SettingsTab =
  | "general"
  | "account"
  | "speech"
  | "data"
  | "memories"
  | "api-keys"
  | "files"
  | "onboarding"
  | "my-stats"
  | "org-stats"
  | "llm-ops"
  | "organization"
  | "members"
  | "security"
  | "system-prompt"
  | "groups"
  | "tool-policies"
  | "tags"
  | "subscription"
  | "organizations";
export const settingsLabels: Record<SettingsTab, string> = {
  general: "Général",
  account: "Compte",
  speech: "Voix",
  data: "Données",
  memories: "Mémoires",
  "api-keys": "Clés API",
  files: "Fichiers",
  onboarding: "Prise en main",
  "my-stats": "Mon utilisation",
  "org-stats": "Utilisation de l’organisation",
  "llm-ops": "Activité des agents",
  organization: "Organisation",
  members: "Membres",
  security: "Sécurité",
  "system-prompt": "Instructions de l’organisation",
  groups: "Groupes",
  "tool-policies": "Politiques des outils",
  tags: "Tags",
  subscription: "Abonnement",
  organizations: "Organisations",
};
export interface SettingsAccess {
  orgAdmin: boolean;
  superAdmin: boolean;
  memories: boolean;
  apiKeys: boolean;
  audit: boolean;
  groups: boolean;
  toolPolicies: boolean;
  subscription: boolean;
}
export const defaultSettingsAccess: SettingsAccess = {
  orgAdmin: false,
  superAdmin: false,
  memories: true,
  apiKeys: false,
  audit: false,
  groups: true,
  toolPolicies: true,
  subscription: false,
};
// Presentation of the gates in WonkaChat/Nav/settingsNavConfig.ts. Authorization remains server-side.
export function settingsSections(a: SettingsAccess) {
  return [
    {
      id: "personal",
      label: "Personnel",
      items: [
        "general",
        "account",
        "speech",
        "data",
        ...(a.memories ? ["memories"] : []),
        ...(a.apiKeys ? ["api-keys"] : []),
        "files",
        "onboarding",
      ] as SettingsTab[],
    },
    {
      id: "analytics",
      label: "Activité",
      items: [
        "my-stats",
        ...(a.orgAdmin || a.superAdmin ? ["org-stats"] : []),
        ...(a.audit ? ["llm-ops"] : []),
      ] as SettingsTab[],
    },
    {
      id: "organization",
      label: "Organisation",
      items: [
        ...(a.orgAdmin
          ? ["organization", "members", "security", "system-prompt", "tags"]
          : []),
        ...((a.orgAdmin || a.superAdmin) && a.groups ? ["groups"] : []),
        ...((a.orgAdmin || a.superAdmin) && a.toolPolicies
          ? ["tool-policies"]
          : []),
        ...(a.orgAdmin && a.subscription ? ["subscription"] : []),
      ] as SettingsTab[],
    },
    {
      id: "admin",
      label: "Administration",
      items: (a.superAdmin ? ["organizations"] : []) as SettingsTab[],
    },
  ].filter((s) => s.items.length);
}
export function SettingsNavigation({
  active,
  onChange,
  access = defaultSettingsAccess,
}: {
  active: SettingsTab;
  onChange: (tab: SettingsTab) => void;
  access?: SettingsAccess;
}) {
  return (
    <nav className="wp-settings-nav" aria-label="Paramètres">
      {settingsSections(access).map((s) => (
        <section key={s.id}>
          <h3>{s.label}</h3>
          {s.items.map((tab) => (
            <button
              key={tab}
              type="button"
              aria-current={active === tab ? "page" : undefined}
              onClick={() => onChange(tab)}
            >
              {settingsLabels[tab]}
            </button>
          ))}
        </section>
      ))}
    </nav>
  );
}
export function MembersTable({
  members,
  onRoleChange,
  onInvite,
  canManage = false,
}: {
  members: Member[];
  onRoleChange?: (id: string, role: Member["role"]) => void;
  onInvite?: () => void;
  canManage?: boolean;
}) {
  return (
    <Panel
      title="Membres de l’organisation"
      action={
        <ActionButton tone="primary" disabled={!canManage} onClick={onInvite}>
          Inviter un membre
        </ActionButton>
      }
    >
      <div className="wp-table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Membre</th>
              <th scope="col">Rôle</th>
              <th scope="col">Statut</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td>
                  <div className="wp-identity">
                    <IdentityAvatar name={m.name} />
                    <span>
                      {m.name}
                      <small>{m.email}</small>
                    </span>
                  </div>
                </td>
                <td>
                  {canManage ? (
                    <select
                      value={m.role}
                      aria-label={`Rôle de ${m.name}`}
                      onChange={(e) =>
                        onRoleChange?.(m.id, e.target.value as Member["role"])
                      }
                    >
                      <option>Admin</option>
                      <option>Membre</option>
                    </select>
                  ) : (
                    m.role
                  )}
                </td>
                <td>
                  <Tag tone={m.status === "Actif" ? "success" : "neutral"}>
                    {m.status}
                  </Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
export interface ResourceRow {
  id: string;
  name: string;
  detail: string;
  status?: string;
  value?: string;
}
export function ResourceTable({
  rows,
  actionLabel,
  onAction,
  empty = "Aucune donnée.",
}: {
  rows: ResourceRow[];
  actionLabel?: string;
  onAction?: (id: string) => void;
  empty?: string;
}) {
  return (
    <div className="wp-resource-list">
      {rows.length === 0 && <p>{empty}</p>}
      {rows.map((r) => (
        <div className="wp-list-row" key={r.id}>
          <Icon name="file" />
          <div className="wp-grow">
            <strong>{r.name}</strong>
            <small>{r.detail}</small>
          </div>
          {r.value && <span>{r.value}</span>}
          {r.status && <Tag>{r.status}</Tag>}
          {actionLabel && (
            <ActionButton disabled={!onAction} onClick={() => onAction?.(r.id)}>
              {actionLabel}
            </ActionButton>
          )}
        </div>
      ))}
    </div>
  );
}
export function UsageOverview({
  metrics,
  rows,
}: {
  metrics: { label: string; value: string }[];
  rows: ResourceRow[];
}) {
  return (
    <div className="wp-stack">
      <div className="wp-metrics">
        {metrics.map((m) => (
          <section key={m.label}>
            <p>{m.label}</p>
            <strong>{m.value}</strong>
          </section>
        ))}
      </div>
      <ResourceTable rows={rows} />
    </div>
  );
}
export function SettingsPanel({
  tab,
  values,
  onChange,
  onAction,
  state = "draft",
  members = [],
  resources = [],
  canManage = false,
  onRoleChange,
}: {
  tab: SettingsTab;
  values: Record<string, string | boolean>;
  onChange: (key: string, value: string | boolean) => void;
  onAction?: (action: string) => void;
  state?: SaveState;
  members?: Member[];
  resources?: ResourceRow[];
  canManage?: boolean;
  onRoleChange?: (id: string, role: Member["role"]) => void;
}) {
  const restricted =
    [
      "organization",
      "members",
      "security",
      "system-prompt",
      "groups",
      "tool-policies",
      "tags",
      "subscription",
      "organizations",
    ].includes(tab) && !canManage;
  const text = (key: string) => String(values[key] ?? "");
  const field = (key: string, label: string, type = "text") => (
    <Field label={label}>
      <input
        type={type}
        value={text(key)}
        onChange={(e) => onChange(key, e.target.value)}
      />
    </Field>
  );
  const select = (key: string, label: string, options: string[]) => (
    <Field label={label}>
      <select value={text(key)} onChange={(e) => onChange(key, e.target.value)}>
        {options.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </select>
    </Field>
  );
  const toggle = (key: string, label: string, description?: string) => (
    <Toggle
      label={label}
      description={description}
      checked={!!values[key]}
      onChange={(v) => onChange(key, v)}
    />
  );
  const list = (action?: string) => (
    <ResourceTable
      rows={resources}
      actionLabel={action}
      onAction={onAction ? (id) => onAction(`${action}:${id}`) : undefined}
    />
  );
  let body: ReactNode;
  switch (tab) {
    case "general":
      body = (
        <>
          {select("theme", "Apparence", ["Système", "Clair", "Sombre"])}
          {select("language", "Langue", ["Français", "English", "Nederlands"])}
          {toggle("enterSend", "Envoyer avec Entrée")}
          {toggle("showTools", "Afficher l’activité des outils")}
          {toggle("markdown", "Afficher la mise en forme Markdown")}
        </>
      );
      break;
    case "account":
      body = (
        <>
          <div className="wp-identity">
            <IdentityAvatar
              name={text("name")}
              src={text("avatar") || undefined}
              large
            />
            <ActionButton
              onClick={() => onAction?.("avatar")}
              disabled={!onAction}
            >
              Changer l’avatar
            </ActionButton>
          </div>
          {field("name", "Nom")}
          {field("email", "Adresse email", "email")}
          <ActionButton
            onClick={() => onAction?.("password")}
            disabled={!onAction}
          >
            Modifier le mot de passe
          </ActionButton>
          {toggle("twoFactor", "Authentification à deux facteurs")}
        </>
      );
      break;
    case "speech":
      body = (
        <>
          {toggle("stt", "Transcription vocale")}
          {select("speechLanguage", "Langue de transcription", [
            "Français",
            "English",
            "Nederlands",
          ])}
          {toggle(
            "autoTranscribe",
            "Transcrire automatiquement les enregistrements",
          )}
          {toggle("tts", "Lecture vocale des réponses")}
          {select("voice", "Voix", ["Voix par défaut", "Voix 1", "Voix 2"])}
        </>
      );
      break;
    case "data":
      body = (
        <>
          <p>Gérez les conversations et les données de votre compte.</p>
          <div className="wp-actions">
            <ActionButton
              onClick={() => onAction?.("export")}
              disabled={!onAction}
            >
              Exporter les conversations
            </ActionButton>
            <ActionButton
              onClick={() => onAction?.("import")}
              disabled={!onAction}
            >
              Importer
            </ActionButton>
          </div>
          {list("Révoquer")}
          <ActionButton
            tone="danger"
            onClick={() => onAction?.("clear-conversations")}
            disabled={!onAction}
          >
            Supprimer les conversations
          </ActionButton>
        </>
      );
      break;
    case "organization":
      body = (
        <>
          {field("organization", "Nom de l’organisation")}
          {field("domain", "Domaine")}
          {select("orgLanguage", "Langue par défaut", [
            "Français",
            "English",
            "Nederlands",
          ])}
          {toggle("allowInvites", "Autoriser les invitations par les membres")}
        </>
      );
      break;
    case "security":
      body = (
        <>
          {toggle("requireMfa", "Exiger l’authentification à deux facteurs")}
          {toggle("sso", "Authentification unique SSO")}
          {field("allowedDomains", "Domaines email autorisés")}
          {select("sessionDuration", "Durée de session", [
            "8 heures",
            "24 heures",
            "7 jours",
          ])}
        </>
      );
      break;
    case "system-prompt":
      body = (
        <Field
          label="Instructions communes à l’organisation"
          hint="Ces instructions s’appliquent aux agents dans le périmètre défini par le produit."
        >
          <textarea
            rows={12}
            value={text("systemPrompt")}
            onChange={(e) => onChange("systemPrompt", e.target.value)}
          />
        </Field>
      );
      break;
    case "members":
      body = (
        <MembersTable
          members={members}
          canManage={canManage}
          onInvite={() => onAction?.("invite")}
          onRoleChange={onRoleChange}
        />
      );
      break;
    case "api-keys":
      body = (
        <>
          <p>Les clés secrètes ne sont affichées qu’à leur création.</p>
          {list("Révoquer")}
          <ActionButton
            tone="primary"
            disabled={!onAction}
            onClick={() => onAction?.("create-api-key")}
          >
            Créer une clé API
          </ActionButton>
        </>
      );
      break;
    case "tool-policies":
      body = (
        <>
          {select("policy", "Politique par défaut", [
            "Demander confirmation",
            "Lecture seule",
            "Bloquer",
          ])}
          <p>
            Les actions sensibles demandent une validation selon la politique
            appliquée.
          </p>
          {list("Configurer")}
        </>
      );
      break;
    case "subscription":
      body = (
        <>
          <h3>{text("plan") || "Plan de l’organisation"}</h3>
          <p>{text("billing")}</p>
          {list()}
          <ActionButton
            disabled={!onAction}
            onClick={() => onAction?.("manage-subscription")}
          >
            Gérer l’abonnement
          </ActionButton>
        </>
      );
      break;
    case "my-stats":
    case "org-stats":
    case "llm-ops":
      body = (
        <UsageOverview
          metrics={[
            { label: "Conversations", value: text("conversations") || "0" },
            { label: "Exécutions", value: text("runs") || "0" },
            { label: "Utilisateurs actifs", value: text("activeUsers") || "0" },
          ]}
          rows={resources}
        />
      );
      break;
    case "memories":
      body = (
        <>
          {toggle("memory", "Mémoire activée")}
          {list("Supprimer")}
        </>
      );
      break;
    case "onboarding":
      body = (
        <>
          {list("Ouvrir")}
          <p>Les étapes terminées restent consultables.</p>
        </>
      );
      break;
    case "files":
      body = (
        <>
          {list("Retirer")}
          <ActionButton
            disabled={!onAction}
            onClick={() => onAction?.("upload-file")}
          >
            Ajouter un fichier
          </ActionButton>
        </>
      );
      break;
    case "groups":
    case "tags":
    case "organizations":
      body = (
        <>
          {list("Modifier")}
          <ActionButton
            disabled={!onAction}
            onClick={() => onAction?.(`create-${tab}`)}
          >
            Ajouter
          </ActionButton>
        </>
      );
      break;
  }
  return (
    <Panel title={settingsLabels[tab]}>
      <div className="wp-stack">
        <fieldset
          className="wp-builder-fields wp-stack"
          disabled={restricted || state === "saving"}
        >
          {body}
        </fieldset>
        <div className="wp-settings-save">
          <span role="status">
            {state === "saved"
              ? "Modifications enregistrées"
              : state === "saving"
                ? "Enregistrement…"
                : state === "error"
                  ? "L’enregistrement a échoué."
                  : ""}
          </span>
          <ActionButton
            tone="primary"
            disabled={restricted || !onAction || state === "saving"}
            onClick={() => onAction?.("save-settings")}
          >
            Enregistrer
          </ActionButton>
        </div>
      </div>
    </Panel>
  );
}
export function SettingsWorkspace({
  active,
  onTabChange,
  access,
  children,
}: {
  active: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
  access: SettingsAccess;
  children: ReactNode;
}) {
  const allowed = settingsSections(access).some((s) =>
    s.items.includes(active),
  );
  return (
    <div className="wp-settings">
      <SettingsNavigation
        active={active}
        onChange={onTabChange}
        access={access}
      />
      <div className="wp-settings-body">
        {allowed ? (
          children
        ) : (
          <p role="alert">Ce panneau n’est pas disponible pour votre rôle.</p>
        )}
      </div>
    </div>
  );
}
