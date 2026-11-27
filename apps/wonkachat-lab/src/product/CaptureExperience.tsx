import {
  AgentBuilder,
  ChatComposer,
  ChatMessage,
  ConnectorAuthorization,
  ConnectorCard,
  DeliverablePreview,
  ExecutionTrace,
  MotionStage,
  SharingPanel,
  resolveCaptureFrame,
} from "../../../../packages/product-ui/src";
import type {
  BuilderSectionId,
  CaptureScenario,
} from "../../../../packages/product-ui/src";
import * as F from "./fixtures";
const noop = () => {};
export function CaptureExperience({
  scenario = "creation",
  frame = 0,
}: {
  scenario?: CaptureScenario;
  frame?: number;
}) {
  const f = resolveCaptureFrame(scenario, frame);
  return (
    <MotionStage frame={f.frame}>
      <div className="lab-capture" data-scenario={scenario}>
        {scenario === "creation" ? (
          <div className="lab-capture-grid">
            <div className="lab-capture-copy">
              <h1>
                Votre savoir-faire
                <br />
                devient un agent.
              </h1>
              <p>Décrivez la tâche. Ajoutez votre méthode.</p>
              <ChatComposer
                value={F.prompt.slice(
                  0,
                  Math.floor(F.prompt.length * f.promptProgress),
                )}
                onChange={noop}
                onSend={noop}
                connectedCount={3}
              />
            </div>
            <div className="lab-capture-builder">
              <AgentBuilder
                visibleSections={
                  f.frame < 35
                    ? ["basics"]
                    : f.frame < 75
                      ? ["behavior"]
                      : ["tools"]
                }
                draft={F.briefAgent}
                onChange={noop}
                expanded={
                  f.frame < 35
                    ? ["basics"]
                    : f.frame < 75
                      ? ["behavior"]
                      : ["tools"]
                }
                onExpandedChange={noop}
                models={F.models}
                skills={F.skills}
                connectors={F.connectors.slice(0, 3)}
                state={f.save}
                onSave={noop}
                highlight={f.builderHighlight as BuilderSectionId | undefined}
              />
            </div>
          </div>
        ) : scenario === "connection" ? (
          <>
            <header className="lab-capture-heading">
              <h1>Vos outils. Connectés.</h1>
              <p>Le contexte existe déjà. Donnez-lui le bon accès.</p>
            </header>
            <div className="wp-grid">
              {F.connectors.slice(0, 3).map((c, i) => (
                <ConnectorCard
                  key={c.id}
                  connector={{
                    ...c,
                    state: i === 0 ? f.connection : "connected",
                  }}
                  onAction={noop}
                />
              ))}
            </div>
            {f.connection === "authorizing" && (
              <div className="lab-auth-plate">
                <ConnectorAuthorization
                  connector={F.connectors[0]}
                  onReturn={noop}
                  onCancel={noop}
                />
              </div>
            )}
          </>
        ) : scenario === "execution" ? (
          <div className="lab-capture-grid">
            <div>
              <h1>
                Le contexte
                <br />
                se rassemble.
              </h1>
              <ChatMessage
                message={{ id: "demo", role: "user", content: F.request }}
              />
              <ExecutionTrace
                steps={F.steps.map((s, i) => ({
                  ...s,
                  state:
                    i < f.completedSteps
                      ? "complete"
                      : i === f.completedSteps
                        ? "running"
                        : "pending",
                }))}
              />
            </div>
            <div>
              {f.completedSteps === 3 ? (
                <DeliverablePreview
                  title="Le périmètre est à confirmer."
                  sections={F.outputSections}
                  sources={["Email client", "CRM"]}
                />
              ) : (
                <div className="lab-result-wait">
                  <p>Le briefing se prépare.</p>
                  <span>CRM · Emails · Méthode</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="lab-capture-grid">
            <div className="lab-capture-copy">
              <h1>
                Le savoir-faire
                <br />
                se partage.
              </h1>
              <p>Une méthode utile à toute l’équipe.</p>
            </div>
            <div className="wp-panel">
              <SharingPanel
                name="Brief client"
                grants={F.grants.map((g) => ({
                  ...g,
                  selected: f.frame > 35 && g.id === "sales",
                }))}
                onChange={noop}
                onShare={noop}
                state={f.save}
              />
            </div>
          </div>
        )}
        <small className="lab-data-disclosure">
          Données de démonstration · {f.frame}/150 images
        </small>
      </div>
    </MotionStage>
  );
}
