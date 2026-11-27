/** Read-only browser capture of the local product lab, through gstack browse. */
import { spawnSync } from "node:child_process";
import { readFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const manifest = JSON.parse(
  readFileSync(resolve(root, "design-system/product/manifest.json"), "utf8"),
);
const base = process.env.PRODUCT_LAB_URL ?? "http://127.0.0.1:5187";
if (!["127.0.0.1", "localhost"].includes(new URL(base).hostname))
  throw new Error("Capture only a local demo server.");
const browse = process.env.BROWSE_BIN ?? "browse";
const output = resolve(
  process.argv[2] ?? resolve(root, "design-system/product/previews"),
);
mkdirSync(output, { recursive: true });
const { width, height, scale } = manifest.size;
for (const [scene, definition] of Object.entries(manifest.scenes)) {
  const chain = [["viewport", `${width}x${height}`, "--scale", String(scale)]];
  for (const theme of ["light", "dark"])
    for (const frame of theme === "light" ? [0, 60, 150] : [150]) {
      const url = new URL(
        definition.capturePath
          .replace("{frame}", String(frame))
          .replace("{theme}", theme),
        base,
      ).href;
      chain.push(
        ["goto", url],
        ["wait", manifest.captureSelector],
        [
          "js",
          `document.fonts.ready.then(()=>document.body.append(Object.assign(document.createElement('div'),{id:'capture-fonts-ready',textContent:'Ready'})))`,
        ],
        ["wait", "#capture-fonts-ready"],
        [
          "screenshot",
          "--selector",
          manifest.captureSelector,
          resolve(
            output,
            `${scene}-${theme}-${String(frame).padStart(3, "0")}.png`,
          ),
        ],
      );
    }
  const result = spawnSync(browse, ["chain"], {
    input: JSON.stringify(chain),
    encoding: "utf8",
    maxBuffer: 4 * 1024 * 1024,
    timeout: 60000,
  });
  if (result.status !== 0 || /\bERROR:/.test(result.stdout ?? ""))
    throw new Error(result.error?.message ?? result.stderr ?? result.stdout);
  console.log(`${scene}: 4 poses captured`);
}
