import { useState } from "react";
import {
  AgentBuilder,
  ApprovalCard,
  ConnectorCard,
  DeliverablePreview,
  ExecutionTrace,
  KnowledgeFiles,
  OnboardingChecklist,
  PromptLibrary,
  ScheduleEditor,
  SettingsPanel,
  SharingPanel,
  SkillCard,
  TemplateCard,
  WorkflowRuns,
} from "../../../../packages/product-ui/src";
import type {
  BuilderSectionId,
  ConnectionState,
  SaveState,
  ScheduleValue,
  SettingsTab,
} from "../../../../packages/product-ui/src";
import * as F from "./fixtures";
export function ComponentExplorer() {
  const [draft, setDraft] = useState(F.briefAgent),
    [expanded, setExpanded] = useState<BuilderSectionId[]>(["basics"]),
    [save, setSave] = useState<SaveState>("draft"),
    [grants, setGrants] = useState(F.grants),
    [approval, setApproval] = useState<"pending" | "approved" | "rejected">(
      "pending",
    ),
    [search, setSearch] = useState(""),
    [tab, setTab] = useState<SettingsTab>("general"),
    [values, setValues] = useState<Record<string, string | boolean>>({
      theme: "Clair",
      language: "Français",
    }),
    [schedule, setSchedule] = useState<ScheduleValue>({
      enabled: true,
      frequency: "weekly",
      time: "09:00",
      timezone: "Europe/Brussels",
      days: [0],
    }),
    [notice, setNotice] = useState("");
  const states: ConnectionState[] = [
    "disconnected",
    "configuring",
    "authorizing",
    "connecting",
    "connected",
    "error",
    "expired",
  ];
  return (
    <div className="lab-explorer">
      <h1>Composants & états</h1>
      <p>Chaque état reste accessible sans attendre un réseau ou un timer.</p>
      {notice && <p role="status">{notice}</p>}
      <section>
        <h2>Connecteurs</h2>
        <div className="wp-grid">
          {states.map((state) => (
            <ConnectorCard
              key={state}
              connector={{ ...F.connectors[0], state }}
              onAction={() => setNotice(`Action du connecteur : ${state}`)}
            />
          ))}
        </div>
      </section>
      <section>
        <h2>Templates</h2>
        <div className="wp-grid">
          {F.templates.slice(0, 4).map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              onSelect={(t) => setNotice(t.name)}
            />
          ))}
        </div>
      </section>
      <section>
        <h2>Agent builder</h2>
        <AgentBuilder
          draft={draft}
          onChange={(a) => {
            setDraft(a);
            setSave("draft");
          }}
          expanded={expanded}
          onExpandedChange={setExpanded}
          models={F.models}
          skills={F.skills}
          connectors={F.connectors}
          state={save}
          onSave={() => setSave("saved")}
        />
      </section>
      <section>
        <h2>Paramètres</h2>
        <div className="wp-chips">
          {(
            [
              "general",
              "account",
              "speech",
              "data",
              "security",
              "members",
              "api-keys",
              "tool-policies",
            ] as SettingsTab[]
          ).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={tab === t}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <SettingsPanel
          tab={tab}
          values={values}
          onChange={(k, v) => setValues((x) => ({ ...x, [k]: v }))}
          members={F.members}
          onAction={setNotice}
        />
      </section>
      <section>
        <h2>Skills & connaissances</h2>
        <div className="wp-grid">
          {F.skills.map((s) => (
            <SkillCard
              key={s.id}
              skill={s}
              onOpen={() => setNotice(s.instructions)}
              onToggle={() => setNotice("Activation contrôlée par le parent")}
            />
          ))}
        </div>
        <KnowledgeFiles
          files={[
            ...F.briefAgent.files,
            {
              id: "import",
              name: "Rapport.pdf",
              size: "1,2 Mo",
              state: "uploading",
              progress: 45,
            },
            {
              id: "failed",
              name: "Document.pdf",
              size: "320 Ko",
              state: "error",
            },
          ]}
        />
      </section>
      <section>
        <h2>Exécution & résultat</h2>
        <ExecutionTrace
          steps={F.steps.map((s, i) => ({
            ...s,
            state: i === 0 ? "complete" : i === 1 ? "running" : "pending",
          }))}
        />
        <DeliverablePreview
          title="Le périmètre est à confirmer."
          sections={F.outputSections}
          sources={["Email", "CRM"]}
        />
      </section>
      <section>
        <h2>Partage & validation</h2>
        <SharingPanel
          name={draft.name}
          grants={grants}
          onChange={setGrants}
          onShare={() => setNotice("Partage demandé au parent")}
        />
        <ApprovalCard
          tool="Outlook"
          action="Préparer un brouillon"
          details="Destinataire : morgan@example.com"
          state={approval}
          onApprove={() => setApproval("approved")}
          onReject={() => setApproval("rejected")}
        />
      </section>
      <section>
        <h2>Planification & exécutions</h2>
        <ScheduleEditor value={schedule} onChange={setSchedule} />
        <WorkflowRuns
          runs={[
            {
              id: "1",
              name: "Briefing quotidien",
              date: "24 septembre, 09:00",
              state: "complete",
            },
            {
              id: "2",
              name: "Synthèse équipe",
              date: "24 septembre, 10:00",
              state: "running",
            },
            {
              id: "3",
              name: "Revue commerciale",
              date: "23 septembre, 09:00",
              state: "error",
            },
          ]}
          onOpen={setNotice}
        />
      </section>
      <section>
        <h2>Prise en main & prompts</h2>
        <OnboardingChecklist
          steps={[
            {
              id: "connect",
              title: "Connecter vos outils",
              description: "Choisissez votre compte de travail.",
              complete: true,
            },
            {
              id: "agent",
              title: "Créer votre premier agent",
              description: "Décrivez un objectif métier.",
              complete: false,
            },
            {
              id: "share",
              title: "Partager avec votre équipe",
              description: "Définissez les accès.",
              complete: false,
            },
          ]}
          onOpen={setNotice}
        />
        <PromptLibrary
          prompts={[
            { id: "brief", title: "Préparer un rendez-vous", body: F.request },
            {
              id: "review",
              title: "Vérifier une proposition",
              body: "Relève les écarts entre cette proposition et la demande du client.",
            },
          ]}
          search={search}
          onSearchChange={setSearch}
          onUse={setNotice}
        />
      </section>
    </div>
  );
}
