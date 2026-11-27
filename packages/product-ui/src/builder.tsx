"use client";
import { useId } from "react";
import type { ReactNode } from "react";
import {
  ActionButton,
  Field,
  Icon,
  IdentityAvatar,
  Tag,
  Toggle,
} from "./foundation";
import type {
  AgentDraft,
  BuilderSectionId,
  Connector,
  KnowledgeFile,
  SaveState,
  Skill,
} from "./types";
export const builderSections: {
  id: BuilderSectionId;
  title: string;
  description: string;
}[] = [
  {
    id: "basics",
    title: "Identité",
    description: "Un nom et un objectif clairs pour retrouver votre agent.",
  },
  {
    id: "model",
    title: "Modèle",
    description: "Choisissez le modèle adapté à cette tâche.",
  },
  {
    id: "behavior",
    title: "Comportement",
    description: "Vos instructions et votre savoir-faire métier.",
  },
  {
    id: "conversation",
    title: "Conversation",
    description: "Les premières demandes à proposer à votre équipe.",
  },
  {
    id: "knowledge",
    title: "Connaissances",
    description: "Les documents que l’agent peut consulter.",
  },
  {
    id: "tools",
    title: "Outils",
    description: "Les connecteurs et les actions autorisés.",
  },
  {
    id: "schedule",
    title: "Planification",
    description: "Déclenchez cet agent à un moment défini.",
  },
  {
    id: "advanced",
    title: "Paramètres avancés",
    description: "Capacités et historique des versions.",
  },
];
export function BuilderSection({
  id,
  title,
  description,
  expanded,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const uid = useId();
  return (
    <section className="wp-builder-section" data-motion-id={`builder-${id}`}>
      <button
        className="wp-section-toggle"
        type="button"
        aria-expanded={expanded}
        aria-controls={uid}
        onClick={onToggle}
      >
        <div>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
        <span data-expanded={expanded}>
          <Icon name="chevron" />
        </span>
      </button>
      <div id={uid} hidden={!expanded} className="wp-section-content">
        {children}
      </div>
    </section>
  );
}
export function AgentBuilderHeader({
  name,
  state,
  onSave,
  canSave = true,
}: {
  name: string;
  state: SaveState;
  onSave: () => void;
  canSave?: boolean;
}) {
  return (
    <header className="wp-builder-header" data-motion-id="builder-header">
      <div className="wp-identity">
        <IdentityAvatar name={name || "Agent"} large />
        <div>
          <h2>{name || "Nouvel agent"}</h2>
          <small role="status">
            {state === "saving"
              ? "Enregistrement…"
              : state === "saved"
                ? "Toutes les modifications sont enregistrées"
                : state === "error"
                  ? "Échec de l’enregistrement"
                  : "Modifications non enregistrées"}
          </small>
        </div>
      </div>
      <ActionButton
        tone="primary"
        onClick={onSave}
        disabled={!canSave || state === "saving"}
      >
        {state === "saving" ? "Enregistrement…" : "Enregistrer"}
      </ActionButton>
    </header>
  );
}
export function ModelPicker({
  value,
  models,
  onChange,
  disabled = false,
}: {
  value: string;
  models: { id: string; name: string; provider: string }[];
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const groups = Array.from(new Set(models.map((m) => m.provider)));
  return (
    <Field label="Modèle" required>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">Sélectionner un modèle</option>
        {groups.map((g) => (
          <optgroup key={g} label={g}>
            {models
              .filter((m) => m.provider === g)
              .map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
    </Field>
  );
}
export function SkillPicker({
  skills,
  selected,
  onChange,
}: {
  skills: Skill[];
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  return (
    <fieldset className="wp-picker">
      <legend>Skills</legend>
      {skills.map((s) => (
        <label key={s.id}>
          <input
            type="checkbox"
            checked={selected.includes(s.id)}
            disabled={!s.enabled}
            onChange={(e) =>
              onChange(
                e.target.checked
                  ? [...selected, s.id]
                  : selected.filter((v) => v !== s.id),
              )
            }
          />
          <span>
            <strong>{s.name}</strong>
            <small>{s.description}</small>
          </span>
        </label>
      ))}
    </fieldset>
  );
}
export function ToolPicker({
  connectors,
  selected,
  onChange,
}: {
  connectors: Connector[];
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  return (
    <fieldset className="wp-picker">
      <legend>Connecteurs autorisés</legend>
      {connectors.map((c) => (
        <label key={c.id}>
          <input
            type="checkbox"
            checked={selected.includes(c.id)}
            disabled={c.state !== "connected" && !selected.includes(c.id)}
            onChange={(e) =>
              onChange(
                e.target.checked
                  ? [...selected, c.id]
                  : selected.filter((v) => v !== c.id),
              )
            }
          />
          <span>
            <strong>{c.name}</strong>
            <small>
              {c.state === "connected"
                ? c.description
                : "Connectez cet outil avant de l’ajouter."}
            </small>
          </span>
        </label>
      ))}
    </fieldset>
  );
}
export function KnowledgeFiles({
  files,
  onRemove,
  onAdd,
  disabled = false,
}: {
  files: KnowledgeFile[];
  onRemove?: (id: string) => void;
  onAdd?: (files: File[]) => void;
  disabled?: boolean;
}) {
  return (
    <div className="wp-stack">
      <label className="wp-dropzone">
        <Icon name="file" />
        <span>Ajouter des documents</span>
        <small>PDF, texte ou document de travail</small>
        <input
          aria-label="Ajouter des documents"
          type="file"
          multiple
          disabled={disabled}
          onChange={(e) => {
            onAdd?.(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
        />
      </label>
      {files.length === 0 && <p className="wp-muted">Aucun document ajouté.</p>}
      {files.map((f) => (
        <div className="wp-list-row" key={f.id} data-motion-id={`file-${f.id}`}>
          <Icon name="file" />
          <div className="wp-grow">
            <strong>{f.name}</strong>
            <small>
              {f.size} ·{" "}
              {f.state === "uploading"
                ? "Importation"
                : f.state === "error"
                  ? "Importation échouée"
                  : "Prêt"}
            </small>
            {f.state === "uploading" && (
              <progress
                value={f.progress ?? 0}
                max={100}
                aria-label={`Importation de ${f.name}`}
              />
            )}
          </div>
          <ActionButton
            tone="quiet"
            aria-label={`Retirer ${f.name}`}
            onClick={() => onRemove?.(f.id)}
            disabled={disabled}
          >
            <Icon name="close" />
          </ActionButton>
        </div>
      ))}
    </div>
  );
}
export interface ScheduleValue {
  enabled: boolean;
  frequency: "daily" | "weekly" | "monthly";
  time: string;
  timezone: string;
  days: number[];
}
export function ScheduleEditor({
  value,
  onChange,
}: {
  value: ScheduleValue;
  onChange: (v: ScheduleValue) => void;
}) {
  return (
    <div className="wp-stack">
      <Toggle
        label="Exécution planifiée"
        checked={value.enabled}
        onChange={(enabled) => onChange({ ...value, enabled })}
      />
      <div className="wp-form-grid">
        <Field label="Fréquence">
          <select
            disabled={!value.enabled}
            value={value.frequency}
            onChange={(e) =>
              onChange({
                ...value,
                frequency: e.target.value as ScheduleValue["frequency"],
              })
            }
          >
            <option value="daily">Chaque jour</option>
            <option value="weekly">Chaque semaine</option>
            <option value="monthly">Chaque mois</option>
          </select>
        </Field>
        <Field label="Heure">
          <input
            type="time"
            disabled={!value.enabled}
            value={value.time}
            onChange={(e) => onChange({ ...value, time: e.target.value })}
          />
        </Field>
        <Field label="Fuseau horaire">
          <select
            disabled={!value.enabled}
            value={value.timezone}
            onChange={(e) => onChange({ ...value, timezone: e.target.value })}
          >
            <option>Europe/Brussels</option>
            <option>Europe/Paris</option>
            <option>UTC</option>
          </select>
        </Field>
      </div>
      {value.frequency === "weekly" && (
        <div className="wp-chips" role="group" aria-label="Jours d’exécution">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d, i) => (
            <button
              key={d}
              type="button"
              disabled={!value.enabled}
              aria-pressed={value.days.includes(i)}
              onClick={() =>
                onChange({
                  ...value,
                  days: value.days.includes(i)
                    ? value.days.filter((v) => v !== i)
                    : [...value.days, i],
                })
              }
            >
              {d}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
export function VersionHistory({
  versions,
  onRestore,
}: {
  versions: { id: string; label: string; date: string; current: boolean }[];
  onRestore?: (id: string) => void;
}) {
  return (
    <div className="wp-stack">
      {versions.map((v) => (
        <div className="wp-list-row" key={v.id}>
          <Icon name="clock" />
          <div className="wp-grow">
            <strong>{v.label}</strong>
            <small>{v.date}</small>
          </div>
          {v.current ? (
            <Tag>Version actuelle</Tag>
          ) : (
            <ActionButton
              disabled={!onRestore}
              onClick={() => onRestore?.(v.id)}
            >
              Restaurer
            </ActionButton>
          )}
        </div>
      ))}
    </div>
  );
}
export function AgentBuilder({
  draft,
  onChange,
  expanded,
  onExpandedChange,
  models,
  skills,
  connectors,
  state = "draft",
  onSave,
  canEdit = true,
  highlight,
  knowledgeSlot,
  scheduleSlot,
  versionSlot,
  visibleSections,
}: {
  draft: AgentDraft;
  onChange: (draft: AgentDraft) => void;
  expanded: BuilderSectionId[];
  onExpandedChange: (ids: BuilderSectionId[]) => void;
  models: Parameters<typeof ModelPicker>[0]["models"];
  skills: Skill[];
  connectors: Connector[];
  state?: SaveState;
  onSave: () => void;
  canEdit?: boolean;
  highlight?: BuilderSectionId;
  knowledgeSlot?: ReactNode;
  scheduleSlot?: ReactNode;
  versionSlot?: ReactNode;
  visibleSections?: BuilderSectionId[];
}) {
  const patch = (p: Partial<AgentDraft>) => onChange({ ...draft, ...p });
  const canSave =
    canEdit &&
    !!draft.name.trim() &&
    !!draft.model &&
    draft.tools.every((id) =>
      connectors.some((c) => c.id === id && c.state === "connected"),
    );
  const content: Record<BuilderSectionId, ReactNode> = {
    basics: (
      <>
        <Field
          label="Nom"
          required
          error={!draft.name.trim() ? "Le nom est obligatoire." : undefined}
        >
          <input
            maxLength={100}
            value={draft.name}
            aria-invalid={!draft.name.trim()}
            onChange={(e) => patch({ name: e.target.value })}
          />
        </Field>
        <Field label="Description">
          <textarea
            rows={3}
            maxLength={500}
            value={draft.description}
            onChange={(e) => patch({ description: e.target.value })}
          />
        </Field>
      </>
    ),
    model: (
      <ModelPicker
        value={draft.model}
        models={models}
        onChange={(model) => patch({ model })}
      />
    ),
    behavior: (
      <>
        <Field
          label="Instructions"
          hint={`${draft.instructions.length} caractères`}
        >
          <textarea
            rows={9}
            value={draft.instructions}
            onChange={(e) => patch({ instructions: e.target.value })}
          />
        </Field>
        <SkillPicker
          skills={skills}
          selected={draft.skills}
          onChange={(skills) => patch({ skills })}
        />
      </>
    ),
    conversation: (
      <>
        <Field
          label="Suggestions de conversation"
          hint="Une suggestion par ligne."
        >
          <textarea
            rows={4}
            value={draft.starters.join("\n")}
            onChange={(e) => patch({ starters: e.target.value.split("\n") })}
          />
        </Field>
      </>
    ),
    knowledge: knowledgeSlot ?? (
      <KnowledgeFiles
        files={draft.files}
        disabled={!canEdit}
        onRemove={(id) =>
          patch({ files: draft.files.filter((f) => f.id !== id) })
        }
      />
    ),
    tools: (
      <ToolPicker
        connectors={connectors}
        selected={draft.tools}
        onChange={(tools) => patch({ tools })}
      />
    ),
    schedule: scheduleSlot ?? <p>Aucune exécution planifiée.</p>,
    advanced: (
      <>
        {(["artifacts", "web", "code"] as const).map((k) => (
          <Toggle
            key={k}
            label={
              {
                artifacts: "Artifacts",
                web: "Recherche web",
                code: "Exécution de code",
              }[k]
            }
            checked={draft.capabilities[k]}
            onChange={(v) =>
              patch({ capabilities: { ...draft.capabilities, [k]: v } })
            }
          />
        ))}
        {versionSlot}
      </>
    ),
  };
  return (
    <div className="wp-builder">
      <AgentBuilderHeader
        name={draft.name}
        state={state}
        onSave={onSave}
        canSave={canSave}
      />
      {!canEdit && <Tag>Lecture seule</Tag>}
      {draft.tools.some(
        (id) => !connectors.some((c) => c.id === id && c.state === "connected"),
      ) && (
        <p role="status">
          Connectez les outils sélectionnés ou retirez-les avant d’enregistrer.
        </p>
      )}
      <div className="wp-builder-fields">
        {builderSections
          .filter((s) => !visibleSections || visibleSections.includes(s.id))
          .map((s) => (
            <div key={s.id} data-highlight={highlight === s.id || undefined}>
              <BuilderSection
                {...s}
                expanded={expanded.includes(s.id)}
                onToggle={() =>
                  onExpandedChange(
                    expanded.includes(s.id)
                      ? expanded.filter((id) => id !== s.id)
                      : [...expanded, s.id],
                  )
                }
              >
                <fieldset
                  disabled={!canEdit || state === "saving"}
                  className="wp-builder-fields"
                >
                  {content[s.id]}
                </fieldset>
              </BuilderSection>
            </div>
          ))}
      </div>
    </div>
  );
}
