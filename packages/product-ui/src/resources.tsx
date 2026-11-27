"use client";
import {
  ActionButton,
  Field,
  Icon,
  Panel,
  SearchInput,
  StateNotice,
  Tag,
  Toggle,
} from "./foundation";
import type { Skill, ViewState } from "./types";
import { ResourceTable } from "./settings";
export function SkillCard({
  skill,
  onOpen,
  onToggle,
}: {
  skill: Skill;
  onOpen: () => void;
  onToggle: (enabled: boolean) => void;
}) {
  return (
    <article className="wp-skill-card">
      <Icon name="book" size={26} />
      <h2 className="wp-card-title">{skill.name}</h2>
      <p>{skill.description}</p>
      <Toggle
        label={`Activer ${skill.name}`}
        checked={skill.enabled}
        onChange={onToggle}
      />
      <ActionButton onClick={onOpen}>Voir le skill</ActionButton>
    </article>
  );
}
export function SkillLibrary({
  skills,
  search,
  onSearchChange,
  onOpen,
  onToggle,
  state = "ready",
}: {
  skills: Skill[];
  search: string;
  onSearchChange: (v: string) => void;
  onOpen: (id: string) => void;
  onToggle: (id: string, v: boolean) => void;
  state?: ViewState;
}) {
  const visible = skills.filter((s) =>
    `${s.name} ${s.description}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="wp-stack">
      <header className="wp-page-heading">
        <div>
          <h1>Skills</h1>
          <p>Les méthodes que vos agents peuvent appliquer.</p>
        </div>
      </header>
      <SearchInput
        value={search}
        onChange={onSearchChange}
        label="Rechercher un skill"
      />
      {state !== "ready" ? (
        <StateNotice state={state} />
      ) : visible.length ? (
        <div className="wp-grid">
          {visible.map((s) => (
            <SkillCard
              key={s.id}
              skill={s}
              onOpen={() => onOpen(s.id)}
              onToggle={(v) => onToggle(s.id, v)}
            />
          ))}
        </div>
      ) : (
        <StateNotice state="empty" />
      )}
    </div>
  );
}
export function SkillDetail({
  skill,
  onChange,
  readOnly = false,
}: {
  skill: Skill;
  onChange: (s: Skill) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="wp-stack">
      <Field label="Nom">
        <input
          disabled={readOnly}
          value={skill.name}
          onChange={(e) => onChange({ ...skill, name: e.target.value })}
        />
      </Field>
      <Field label="Description">
        <textarea
          disabled={readOnly}
          value={skill.description}
          onChange={(e) => onChange({ ...skill, description: e.target.value })}
        />
      </Field>
      <Field label="Instructions du skill">
        <textarea
          rows={14}
          disabled={readOnly}
          value={skill.instructions}
          onChange={(e) => onChange({ ...skill, instructions: e.target.value })}
        />
      </Field>
    </div>
  );
}
export function OnboardingChecklist({
  steps,
  onOpen,
}: {
  steps: {
    id: string;
    title: string;
    description: string;
    complete: boolean;
  }[];
  onOpen: (id: string) => void;
}) {
  const count = steps.filter((s) => s.complete).length;
  return (
    <Panel
      title="Votre espace, prêt à travailler."
      description={`${count} étapes terminées sur ${steps.length}`}
    >
      <progress
        value={count}
        max={Math.max(1, steps.length)}
        aria-label="Progression de la prise en main"
      />
      {steps.map((s) => (
        <div className="wp-list-row" key={s.id}>
          <Icon name={s.complete ? "check" : "clock"} />
          <div className="wp-grow">
            <strong>{s.title}</strong>
            <small>{s.description}</small>
          </div>
          <ActionButton onClick={() => onOpen(s.id)}>
            {s.complete ? "Revoir" : "Commencer"}
          </ActionButton>
        </div>
      ))}
    </Panel>
  );
}
export function ApprovalCard({
  tool,
  action,
  details,
  state,
  onApprove,
  onReject,
}: {
  tool: string;
  action: string;
  details: string;
  state: "pending" | "approved" | "rejected";
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <Panel
      title="Votre accord est nécessaire"
      description={`${tool} · ${action}`}
    >
      <pre className="wp-prose">{details}</pre>
      {state === "pending" ? (
        <div className="wp-actions">
          <ActionButton onClick={onReject}>Refuser</ActionButton>
          <ActionButton tone="primary" onClick={onApprove}>
            Autoriser cette action
          </ActionButton>
        </div>
      ) : (
        <Tag tone={state === "approved" ? "success" : "warning"}>
          {state === "approved" ? "Action autorisée" : "Action refusée"}
        </Tag>
      )}
    </Panel>
  );
}
export function WorkflowRuns({
  runs,
  onOpen,
}: {
  runs: {
    id: string;
    name: string;
    date: string;
    state: "queued" | "running" | "complete" | "error";
  }[];
  onOpen: (id: string) => void;
}) {
  return (
    <Panel title="Exécutions planifiées">
      <ResourceTable
        rows={runs.map((r) => ({
          id: r.id,
          name: r.name,
          detail: r.date,
          status: {
            queued: "En attente",
            running: "En cours",
            complete: "Terminée",
            error: "Échec",
          }[r.state],
        }))}
        actionLabel="Voir"
        onAction={onOpen}
      />
    </Panel>
  );
}
export function PromptLibrary({
  prompts,
  search,
  onSearchChange,
  onUse,
}: {
  prompts: { id: string; title: string; body: string }[];
  search: string;
  onSearchChange: (v: string) => void;
  onUse: (id: string) => void;
}) {
  const visible = prompts.filter((p) =>
    `${p.title} ${p.body}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="wp-stack">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        label="Rechercher un prompt"
      />
      {visible.map((p) => (
        <Panel
          key={p.id}
          title={p.title}
          action={
            <ActionButton onClick={() => onUse(p.id)}>Utiliser</ActionButton>
          }
        >
          <p>{p.body}</p>
        </Panel>
      ))}
      {!visible.length && <StateNotice state="empty" />}
    </div>
  );
}
export function NotificationToast({
  message,
  tone = "success",
  onDismiss,
}: {
  message: string;
  tone?: "success" | "error";
  onDismiss: () => void;
}) {
  return (
    <div
      className="wp-toast"
      role={tone === "error" ? "alert" : "status"}
      data-tone={tone}
    >
      <Icon name={tone === "error" ? "close" : "check"} />
      <span>{message}</span>
      <ActionButton
        tone="quiet"
        aria-label="Fermer la notification"
        onClick={onDismiss}
      >
        <Icon name="close" />
      </ActionButton>
    </div>
  );
}
