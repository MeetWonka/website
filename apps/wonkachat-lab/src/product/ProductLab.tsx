import { useState } from "react";
import {
  ProductTheme,
  captureScenarios,
  clampFrame,
} from "../../../../packages/product-ui/src";
import type {
  CaptureScenario,
  WorkspacePage,
} from "../../../../packages/product-ui/src";
import { ProductExperience } from "./ProductExperience";
import { CaptureExperience } from "./CaptureExperience";
import { ComponentExplorer } from "./ComponentExplorer";
import "../../../../packages/product-ui/src/styles.css";
import "./lab.css";
export function ProductLab() {
  const params = new URLSearchParams(window.location.search);
  const [mode, setMode] = useState(
    params.get("mode") === "capture"
      ? "capture"
      : params.get("mode") === "components"
        ? "components"
        : "product",
  );
  const [theme, setTheme] = useState<"light" | "dark">(
    params.get("theme") === "dark" ? "dark" : "light",
  );
  const scenarioParam = params.get("scenario");
  const [scenario, setScenario] = useState<CaptureScenario>(
    captureScenarios.includes(scenarioParam as CaptureScenario)
      ? (scenarioParam as CaptureScenario)
      : "creation",
  );
  const [frame, setFrame] = useState(
    clampFrame(Number(params.get("frame") ?? 0)),
  );
  const clean = params.get("clean") === "1" && mode === "capture";
  const pageParam = params.get("page");
  const initialPage: WorkspacePage = (
    [
      "chat",
      "agents",
      "templates",
      "connectors",
      "skills",
      "settings",
    ].includes(pageParam ?? "")
      ? pageParam
      : "templates"
  ) as WorkspacePage;
  return (
    <ProductTheme theme={theme} capture={mode === "capture"}>
      {!clean && (
        <header className="lab-toolbar">
          <a href="?">
            WonkaChat Product <span>Design system</span>
          </a>
          <nav aria-label="Mode du lab">
            {[
              ["product", "Produit"],
              ["components", "Composants"],
              ["capture", "Plans motion"],
            ].map(([id, name]) => (
              <button
                key={id}
                type="button"
                aria-pressed={mode === id}
                onClick={() => setMode(id)}
              >
                {name}
              </button>
            ))}
          </nav>
          <label>
            Thème
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as "light" | "dark")}
            >
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
            </select>
          </label>
        </header>
      )}
      {!clean && mode === "capture" && (
        <div className="lab-capture-controls">
          <label>
            Scène
            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value as CaptureScenario)}
            >
              {captureScenarios.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label>
            Frame {frame} / 150
            <input
              type="range"
              min={0}
              max={150}
              step={1}
              value={frame}
              onChange={(e) => setFrame(Number(e.target.value))}
            />
          </label>
          <div>
            {[0, 60, 150].map((f) => (
              <button type="button" key={f} onClick={() => setFrame(f)}>
                {f === 0 ? "Avant" : f === 60 ? "Action" : "Après"}
              </button>
            ))}
          </div>
          <a
            href={`?mode=capture&scenario=${scenario}&frame=${frame}&theme=${theme}`}
          >
            Lien de cette frame
          </a>
        </div>
      )}
      <div className={`lab-stage ${clean ? "lab-clean" : ""}`}>
        {mode === "product" ? (
          <ProductExperience
            initialPage={initialPage}
            initialBuilder={params.get("builder") === "1"}
          />
        ) : mode === "capture" ? (
          <CaptureExperience scenario={scenario} frame={frame} />
        ) : (
          <ComponentExplorer />
        )}
      </div>
      {!clean && (
        <footer className="lab-footer">
          Bibliothèque de préparation produit et motion. Les interactions
          utilisent des fixtures locales, sans connexion aux comptes. Catalogue
          public figé au 24 septembre 2026.
        </footer>
      )}
    </ProductTheme>
  );
}
