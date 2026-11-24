import { useState } from "react";
import {
  AgentBuilder,
  AgentLibrary,
  ChatComposer,
  ChatMessage,
  ConnectorAuthorization,
  ConnectorCatalog,
  ConnectorConfiguration,
  DeliverablePreview,
  ExecutionTrace,
  KnowledgeFiles,
  NotificationToast,
  ProductDialog,
  ProductShell,
  ScheduleEditor,
  SharingPanel,
  SkillDetail,
  SkillLibrary,
  TemplateDetail,
  TemplateGallery,
  VersionHistory,
} from "../../../../packages/product-ui/src";
import type {
  AgentDraft,
  AgentTemplate,
  BuilderSectionId,
  Connector,
  SaveState,
  ScheduleValue,
  WorkspacePage,
} from "../../../../packages/product-ui/src";
import * as F from "./fixtures";
import { SettingsDemo } from "./SettingsDemo";
export function ProductExperience({
  initialPage = "templates",
  initialBuilder = false,
}: {
  initialPage?: WorkspacePage;
  initialBuilder?: boolean;
}) {
  const [page, setPage] = useState<WorkspacePage>(initialPage),
    [collapsed, setCollapsed] = useState(false),
    [search, setSearch] = useState(""),
    [category, setCategory] = useState("all");
  const [connectorItems, setConnectors] = useState(F.connectors),
    [agentItems, setAgents] = useState(F.agents),
    [skillItems, setSkills] = useState(F.skills),
    [draft, setDraft] = useState<AgentDraft>(F.briefAgent),
    [builder, setBuilder] = useState(initialBuilder),
    [expanded, setExpanded] = useState<BuilderSectionId[]>([
      "basics",
      "behavior",
      "tools",
    ]),
    [save, setSave] = useState<SaveState>("draft");
  const [template, setTemplate] = useState<AgentTemplate | null>(null),
    [cloneState, setCloneState] = useState<SaveState>("draft"),
    [connector, setConnector] = useState<Connector | null>(null),
    [connectionFields, setConnectionFields] = useState<Record<string, string>>(
      {},
    ),
    [authorization, setAuthorization] = useState<Connector | null>(null),
    [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [message, setMessage] = useState(""),
    [sentMessage, setSentMessage] = useState(""),
    [shareTarget, setShareTarget] = useState<string | null>(null),
    [sent, setSent] = useState(false),
    [run, setRun] = useState(0),
    [share, setShare] = useState(false),
    [grants, setGrants] = useState(F.grants),
    [shareState, setShareState] = useState<SaveState>("draft"),
    [toast, setToast] = useState("");
  const [schedule, setSchedule] = useState<ScheduleValue>({
    enabled: false,
    frequency: "weekly",
    time: "09:00",
    timezone: "Europe/Brussels",
    days: [0],
  });
  const navigate = (p: WorkspacePage) => {
    setPage(p);
    setSearch("");
    setCategory("all");
    setBuilder(false);
  };
  const saveDraft = () => {
    setAgents((items) =>
      items.some((a) => a.id === draft.id)
        ? items.map((a) => (a.id === draft.id ? draft : a))
        : [draft, ...items],
    );
    setSave("saved");
    setToast("Agent enregistré dans cette démonstration.");
  };
  const updateDraft = (a: AgentDraft) => {
    setDraft(a);
    setSave("draft");
  };
  const connect = (id: string) => {
    const c = connectorItems.find((c) => c.id === id);
    if (!c) return;
    if (c.state === "connected") {
      setConnectors((v) =>
        v.map((x) => (x.id === id ? { ...x, state: "disconnected" } : x)),
      );
      return;
    }
    if (c.state === "configuring") setConnector(c);
    else setAuthorization(c);
  };
  const onFiles = (files: File[]) =>
    updateDraft({
      ...draft,
      files: [
        ...draft.files,
        ...files.map((f, i) => ({
          id: `local-${draft.files.length + i}`,
          name: f.name,
          size: `${Math.ceil(f.size / 1024)} Ko`,
          state: "ready" as const,
        })),
      ],
    });
  let view;
  if (page === "templates")
    view = (
      <TemplateGallery
        templates={F.templates}
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        onSelect={(t) => {
          setTemplate(t);
          setCloneState("draft");
        }}
      />
    );
  else if (page === "connectors")
    view = (
      <ConnectorCatalog
        connectors={connectorItems}
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        onAction={connect}
        onConfigure={(id) =>
          setConnector(connectorItems.find((c) => c.id === id) ?? null)
        }
        onFavorite={(id) =>
          setConnectors((v) =>
            v.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)),
          )
        }
        onShare={(id) => {
          setShareTarget(connectorItems.find((c) => c.id === id)?.name ?? null);
          setShareState("draft");
          setShare(true);
        }}
      />
    );
  else if (page === "agents")
    view = (
      <AgentLibrary
        agents={agentItems}
        search={search}
        onSearchChange={setSearch}
        onChat={(id) => {
          setDraft(agentItems.find((a) => a.id === id)!);
          navigate("chat");
        }}
        onEdit={(id) => {
          setDraft(agentItems.find((a) => a.id === id)!);
          setBuilder(true);
          setSave("saved");
        }}
        onCreate={() => {
          setDraft({
            ...F.briefAgent,
            id: `lab-agent-${agentItems.length}`,
            name: "",
            description: "",
            instructions: "",
            tools: [],
            skills: [],
            files: [],
            starters: [],
          });
          setBuilder(true);
          setExpanded(["basics", "model", "behavior"]);
          setSave("draft");
        }}
        onTemplates={() => navigate("templates")}
      />
    );
  else if (page === "skills")
    view = (
      <SkillLibrary
        skills={skillItems}
        search={search}
        onSearchChange={setSearch}
        onOpen={setSelectedSkill}
        onToggle={(id, enabled) =>
          setSkills((v) => v.map((s) => (s.id === id ? { ...s, enabled } : s)))
        }
      />
    );
  else if (page === "settings")
    view = <SettingsDemo onNavigate={navigate} onNotice={setToast} />;
  else
    view = (
      <div className="wp-stack">
        <header className="wp-page-heading">
          <div>
            <h1>{draft.name}</h1>
            <p>Un rendez-vous mieux préparé.</p>
          </div>
          <div className="wp-actions">
            <button
              type="button"
              className="lab-link"
              onClick={() => setBuilder(!builder)}
            >
              Configurer l’agent
            </button>
            <button
              type="button"
              className="lab-link"
              onClick={() => {
                setShareTarget(null);
                setShareState("draft");
                setShare(true);
              }}
            >
              Partager
            </button>
          </div>
        </header>
        {!sent ? (
          <div className="lab-welcome">
            <h2>Sur quoi travaillons-nous ?</h2>
            <p>Votre contexte et votre méthode, dans un même espace.</p>
            <button
              type="button"
              className="lab-suggestion"
              onClick={() => setMessage(F.request)}
            >
              Préparer mon rendez-vous avec Northstar
            </button>
          </div>
        ) : (
          <>
            <ChatMessage
              message={{
                id: "request",
                role: "user",
                content: sentMessage || F.request,
              }}
            />
            <ChatMessage
              message={{
                id: "response",
                role: "assistant",
                content: run === 3 ? "Votre briefing est prêt." : "",
              }}
            >
              <ExecutionTrace
                steps={F.steps.map((s, i) => ({
                  ...s,
                  state:
                    i < run ? "complete" : i === run ? "running" : "pending",
                }))}
              />
              {run < 3 && (
                <button
                  type="button"
                  className="lab-link"
                  onClick={() => setRun((v) => v + 1)}
                >
                  Avancer l’étape de démonstration
                </button>
              )}
            </ChatMessage>
            {run === 3 && (
              <DeliverablePreview
                title="Le périmètre est à confirmer."
                sections={F.outputSections}
                sources={["Email client · Northstar", "CRM · Odoo"]}
                onExport={() =>
                  setToast("Aperçu du document prêt pour la capture.")
                }
              />
            )}
          </>
        )}
        <ChatComposer
          value={message}
          onChange={setMessage}
          agentName={draft.name}
          connectedCount={
            connectorItems.filter((c) => c.state === "connected").length
          }
          onSend={() => {
            setSentMessage(message);
            setMessage("");
            setSent(true);
            setRun(0);
          }}
          onTools={() => navigate("connectors")}
          onAttach={() => {
            setBuilder(true);
            setExpanded(["knowledge"]);
          }}
        />
      </div>
    );
  const builderPanel = builder ? (
    <AgentBuilder
      draft={draft}
      onChange={updateDraft}
      expanded={expanded}
      onExpandedChange={setExpanded}
      models={F.models}
      skills={skillItems}
      connectors={connectorItems}
      state={save}
      onSave={saveDraft}
      knowledgeSlot={
        <KnowledgeFiles
          files={draft.files}
          onAdd={onFiles}
          onRemove={(id) =>
            updateDraft({
              ...draft,
              files: draft.files.filter((f) => f.id !== id),
            })
          }
        />
      }
      scheduleSlot={
        <ScheduleEditor
          value={schedule}
          onChange={(v) => {
            setSchedule(v);
            setSave("draft");
          }}
        />
      }
      versionSlot={
        <VersionHistory
          versions={[
            {
              id: "v2",
              label: "Version 2",
              date: "24 septembre 2026",
              current: true,
            },
            {
              id: "v1",
              label: "Version 1",
              date: "23 septembre 2026",
              current: false,
            },
          ]}
          onRestore={() => {
            updateDraft(F.briefAgent);
            setToast("Version de démonstration restaurée.");
          }}
        />
      }
    />
  ) : undefined;
  return (
    <>
      <ProductShell
        user={{ name: "Camille Martin", workspace: "Wonka Demo" }}
        history={[
          {
            id: "northstar",
            title: "Rendez-vous Northstar",
            onOpen: () => navigate("chat"),
          },
        ]}
        page={page}
        onNavigate={navigate}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        aside={builderPanel}
      >
        {view}
      </ProductShell>
      <ProductDialog
        open={!!template}
        onClose={() => setTemplate(null)}
        title="Aperçu du template"
      >
        {template && (
          <TemplateDetail
            template={template}
            state={cloneState}
            onUse={() => {
              const next = F.agentFromTemplate(
                template,
                `lab-template-${agentItems.length}`,
              );
              setDraft(next);
              setAgents((v) => [next, ...v]);
              setCloneState("saved");
              setTemplate(null);
              navigate("agents");
              setBuilder(true);
              setSave("draft");
              setToast(
                "Template ajouté. Adaptez les instructions et les accès.",
              );
            }}
          />
        )}
      </ProductDialog>
      <ProductDialog
        open={!!connector}
        onClose={() => {
          setConnector(null);
          setConnectionFields({});
        }}
        title="Configuration du connecteur"
      >
        {connector && (
          <ConnectorConfiguration
            connector={connector}
            fields={[
              { id: "url", label: "URL de l’instance", required: true },
              {
                id: "key",
                label: "Clé de démonstration",
                secret: true,
                required: true,
              },
            ]}
            values={connectionFields}
            onChange={(id, v) =>
              setConnectionFields((x) => ({ ...x, [id]: v }))
            }
            onSubmit={() => {
              setConnectors((v) =>
                v.map((c) =>
                  c.id === connector.id ? { ...c, state: "connected" } : c,
                ),
              );
              setConnectionFields({});
              setConnector(null);
              setToast("Connexion de démonstration configurée.");
            }}
          />
        )}
      </ProductDialog>
      <ProductDialog
        open={!!authorization}
        onClose={() => setAuthorization(null)}
        title="Connexion à votre outil"
      >
        {authorization && (
          <ConnectorAuthorization
            connector={authorization}
            onCancel={() => setAuthorization(null)}
            onReturn={() => {
              setConnectors((v) =>
                v.map((c) =>
                  c.id === authorization.id ? { ...c, state: "connected" } : c,
                ),
              );
              setAuthorization(null);
            }}
          />
        )}
      </ProductDialog>
      <ProductDialog
        open={share}
        onClose={() => setShare(false)}
        title="Gérer les accès"
      >
        <SharingPanel
          name={shareTarget ?? draft.name}
          grants={grants}
          onChange={(v) => {
            setGrants(v);
            setShareState("draft");
          }}
          onShare={() => setShareState("saved")}
          state={shareState}
        />
      </ProductDialog>
      <ProductDialog
        open={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        title="Skill métier"
      >
        {selectedSkill && (
          <SkillDetail
            skill={skillItems.find((s) => s.id === selectedSkill)!}
            onChange={(skill) =>
              setSkills((v) => v.map((s) => (s.id === skill.id ? skill : s)))
            }
          />
        )}
      </ProductDialog>

      {toast && (
        <div className="lab-toast">
          <NotificationToast message={toast} onDismiss={() => setToast("")} />
        </div>
      )}
    </>
  );
}
