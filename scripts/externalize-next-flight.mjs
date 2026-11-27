import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const appDir = path.join(process.cwd(), ".next", "server", "app");
const flightDir = path.join(process.cwd(), ".next", "static", "flight");

async function collectHtmlFiles(dir, files = []) {
  const entries = await readdir(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const info = await stat(fullPath);
    if (info.isDirectory()) {
      await collectHtmlFiles(fullPath, files);
    } else if (entry.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
}

function fileNameForScript(contents) {
  const hash = createHash("sha256").update(contents).digest("hex").slice(0, 16);
  return `${hash}.js`;
}

async function externalizeFlightScripts(filePath) {
  const html = await readFile(filePath, "utf8");
  const scripts = [];
  const placeholderPrefix = "__WONKA_FLIGHT_SCRIPT_";

  let nextHtml = html.replace(/<script>((?:(?!<\/script>)[\s\S])*self\.__next_f(?:(?!<\/script>)[\s\S])*)<\/script>/g, (_match, contents) => {
    const index = scripts.push(contents) - 1;
    return `${placeholderPrefix}${index}__`;
  });

  if (!scripts.length) {
    return 0;
  }

  const bundledScript = scripts.join(";\n");
  const fileName = fileNameForScript(`${filePath}:${bundledScript}`);
  await writeFile(path.join(flightDir, fileName), bundledScript, "utf8");

  for (let index = 0; index < scripts.length; index += 1) {
    nextHtml = nextHtml.replace(
      `${placeholderPrefix}${index}__`,
      index === 0 ? `<script src="/_next/static/flight/${fileName}"></script>` : "",
    );
  }

  await writeFile(filePath, nextHtml, "utf8");
  return scripts.length;
}

await mkdir(flightDir, { recursive: true });

const htmlFiles = await collectHtmlFiles(appDir);
let totalScripts = 0;
let totalPages = 0;

for (const filePath of htmlFiles) {
  const extracted = await externalizeFlightScripts(filePath);
  if (extracted) {
    totalScripts += extracted;
    totalPages += 1;
  }
}

console.log(`Externalized ${totalScripts} Next flight scripts across ${totalPages} HTML pages.`);
