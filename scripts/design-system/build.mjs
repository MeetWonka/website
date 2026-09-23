import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
export const repositoryRoot = resolve(scriptDirectory, "../..");

const sourcePaths = {
  tokens: resolve(repositoryRoot, "packages/tokens/src/wonka.tokens.json"),
  manifest: resolve(repositoryRoot, "design-system/manifest.json"),
  components: resolve(repositoryRoot, "design-system/components.json"),
  assets: resolve(repositoryRoot, "design-system/assets.json"),
  rules: resolve(repositoryRoot, "design-system/rules/catalog.json"),
  exceptions: resolve(repositoryRoot, "design-system/rules/exceptions.json"),
  patterns: resolve(repositoryRoot, "design-system/patterns.json"),
  channels: [
    resolve(repositoryRoot, "design-system/channels/product.json"),
    resolve(repositoryRoot, "design-system/channels/website.json"),
    resolve(repositoryRoot, "design-system/channels/campaign.json"),
    resolve(repositoryRoot, "design-system/channels/presentation.json"),
  ],
  agentGuide: resolve(repositoryRoot, "design-system/llms.txt"),
  manifestSchema: resolve(
    repositoryRoot,
    "design-system/schemas/manifest.schema.json",
  ),
  componentSchema: resolve(
    repositoryRoot,
    "design-system/schemas/component-catalog.schema.json",
  ),
  assetSchema: resolve(
    repositoryRoot,
    "design-system/schemas/asset-catalog.schema.json",
  ),
  discoverySchema: resolve(
    repositoryRoot,
    "design-system/schemas/discovery.schema.json",
  ),
  tokenCatalogSchema: resolve(
    repositoryRoot,
    "design-system/schemas/token-catalog.schema.json",
  ),
  ruleSchema: resolve(
    repositoryRoot,
    "design-system/schemas/rule-catalog.schema.json",
  ),
  exceptionSchema: resolve(
    repositoryRoot,
    "design-system/schemas/rule-exceptions.schema.json",
  ),
  patternSchema: resolve(
    repositoryRoot,
    "design-system/schemas/pattern-catalog.schema.json",
  ),
  channelSchema: resolve(
    repositoryRoot,
    "design-system/schemas/channel.schema.json",
  ),
  channelCatalogSchema: resolve(
    repositoryRoot,
    "design-system/schemas/channel-catalog.schema.json",
  ),
};

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function isToken(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    Object.hasOwn(value, "$value")
  );
}

export function collectTokens(root) {
  const tokens = [];

  function visit(node, segments = [], inheritedType) {
    if (isToken(node)) {
      tokens.push({
        id: segments.join("."),
        type: node.$type ?? inheritedType ?? "unknown",
        value: node.$value,
        description: node.$description ?? null,
        modes: node.$extensions?.["com.wonka.modes"] ?? null,
      });
      return;
    }

    if (node === null || typeof node !== "object" || Array.isArray(node)) {
      return;
    }

    const nextType = node.$type ?? inheritedType;
    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith("$")) {
        continue;
      }
      visit(value, [...segments, key], nextType);
    }
  }

  visit(root);
  return tokens;
}

function tokenCssVariable(tokenId) {
  const segments = tokenId.split(".");

  if (segments[0] === "color") {
    const colorName =
      segments[1] === "neutral" ? segments.slice(2) : segments.slice(1);
    return `--color-${colorName.join("-")}`;
  }

  if (segments[0] === "radius" || segments[0] === "shadow") {
    return `--${segments.join("-")}`;
  }

  if (segments[0] === "semantic" && segments[1] === "color") {
    return `--color-${segments.slice(2).join("-")}`;
  }

  return `--ds-${segments.join("-")}`;
}

function internalSemanticVariable(tokenId) {
  return `--ds-${tokenId.replaceAll(".", "-")}`;
}

function referenceId(value) {
  if (typeof value !== "string") {
    return null;
  }
  const match = value.match(/^\{([^}]+)\}$/);
  return match?.[1] ?? null;
}

export function createResolver(tokens) {
  const registry = new Map(tokens.map((token) => [token.id, token]));

  function resolveValue(value, mode, stack) {
    if (typeof value === "string") {
      const exactReference = referenceId(value);
      if (exactReference) {
        return resolveToken(exactReference, mode, stack);
      }

      return value.replaceAll(/\{([^}]+)\}/g, (_, id) => {
        const resolved = resolveToken(id, mode, stack);
        return typeof resolved === "string"
          ? resolved
          : JSON.stringify(resolved);
      });
    }

    if (Array.isArray(value)) {
      return value.map((item) => resolveValue(item, mode, stack));
    }

    if (value !== null && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [
          key,
          resolveValue(item, mode, stack),
        ]),
      );
    }

    return value;
  }

  function resolveToken(id, mode = "light", stack = []) {
    if (stack.includes(id)) {
      throw new Error(
        `Circular token reference: ${[...stack, id].join(" → ")}`,
      );
    }

    const token = registry.get(id);
    if (!token) {
      throw new Error(`Unknown token reference: ${id}`);
    }

    const rawValue = token.modes?.[mode] ?? token.value;
    return resolveValue(rawValue, mode, [...stack, id]);
  }

  return { registry, resolveToken };
}

function formatCssValue(value, type) {
  if (Array.isArray(value)) {
    if (type === "fontFamily") {
      return value
        .map((family) =>
          family.includes(" ") && !family.startsWith("ui-")
            ? `"${family}"`
            : family,
        )
        .join(", ");
    }
    if (type === "cubicBezier") {
      return `cubic-bezier(${value.join(", ")})`;
    }
    return value.join(", ");
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (typeof value === "string") {
    return value;
  }

  return null;
}

function formatSourceValueForCss(rawValue, tokenById, type) {
  const id = referenceId(rawValue);
  if (id) {
    const referencedToken = tokenById.get(id);
    if (!referencedToken) {
      throw new Error(`Unknown token reference: ${id}`);
    }
    return `var(${tokenCssVariable(id)})`;
  }

  return formatCssValue(rawValue, type);
}

const TYPOGRAPHY_PROPERTIES = {
  fontFamily: "font-family",
  fontWeight: "font-weight",
  fontSize: "font-size",
  lineHeight: "line-height",
  letterSpacing: "letter-spacing",
  textTransform: "text-transform",
};

function typographyPropertyValue(rawValue, tokenById) {
  const id = referenceId(rawValue);
  if (id) {
    if (!tokenById.has(id)) {
      throw new Error(`Unknown typography token reference: ${id}`);
    }
    if (id.startsWith("font.family.")) {
      const family = id.slice("font.family.".length);
      return `var(--font-${family}, var(${tokenCssVariable(id)}))`;
    }
    return `var(${tokenCssVariable(id)})`;
  }
  return formatCssValue(rawValue);
}

function generateTypographyUtilities(tokens, tokenById) {
  const lines = [
    "",
    "/* Typography utilities generated from canonical composite tokens. */",
  ];

  for (const token of tokens.filter((candidate) =>
    candidate.id.startsWith("typography."),
  )) {
    lines.push("", `@utility type-${token.id.slice("typography.".length)} {`);

    for (const [property, cssProperty] of Object.entries(
      TYPOGRAPHY_PROPERTIES,
    )) {
      const rawValue = token.value[property];
      if (rawValue === undefined) {
        continue;
      }
      const baseValue =
        rawValue !== null &&
        typeof rawValue === "object" &&
        !Array.isArray(rawValue)
          ? rawValue.mobile
          : rawValue;
      lines.push(
        `  ${cssProperty}: ${typographyPropertyValue(baseValue, tokenById)};`,
      );
    }

    for (const [breakpoint, width] of [
      ["tablet", "48rem"],
      ["desktop", "64rem"],
    ]) {
      const responsiveProperties = Object.entries(TYPOGRAPHY_PROPERTIES).filter(
        ([property]) => {
          const rawValue = token.value[property];
          return (
            rawValue !== null &&
            typeof rawValue === "object" &&
            !Array.isArray(rawValue) &&
            rawValue[breakpoint] !== undefined
          );
        },
      );
      if (responsiveProperties.length === 0) {
        continue;
      }
      lines.push("", `  @media (width >= ${width}) {`);
      for (const [property, cssProperty] of responsiveProperties) {
        lines.push(
          `    ${cssProperty}: ${typographyPropertyValue(
            token.value[property][breakpoint],
            tokenById,
          )};`,
        );
      }
      lines.push("  }");
    }

    lines.push("}");
  }

  return lines;
}

function generateCss(tokens) {
  const tokenById = new Map(tokens.map((token) => [token.id, token]));
  const primitiveThemeTokens = tokens.filter(
    (token) =>
      token.id.startsWith("color.") ||
      token.id.startsWith("radius.") ||
      token.id.startsWith("shadow."),
  );
  const semanticColors = tokens.filter((token) =>
    token.id.startsWith("semantic.color."),
  );
  const rootTokens = tokens.filter(
    (token) =>
      token.id.startsWith("font.") ||
      token.id.startsWith("motion.") ||
      token.id.startsWith("component."),
  );

  const lines = [
    "/* This file is generated by `bun run ds:build`. Do not edit directly. */",
    "",
    "@theme {",
    "  --color-*: initial;",
    "  --color-transparent: transparent;",
    "  --color-current: currentColor;",
    "  --color-inherit: inherit;",
  ];

  for (const token of primitiveThemeTokens) {
    const value = formatSourceValueForCss(token.value, tokenById, token.type);
    if (value !== null) {
      lines.push(`  ${tokenCssVariable(token.id)}: ${value};`);
    }
  }

  lines.push("}", "", "@theme inline {");
  for (const token of semanticColors) {
    lines.push(
      `  ${tokenCssVariable(token.id)}: var(${internalSemanticVariable(token.id)});`,
    );
  }
  lines.push("}", "", ':root, [data-theme="light"] {');

  for (const token of semanticColors) {
    const rawValue = token.modes?.light ?? token.value;
    const value = formatSourceValueForCss(rawValue, tokenById, token.type);
    lines.push(`  ${internalSemanticVariable(token.id)}: ${value};`);
    lines.push(
      `  ${tokenCssVariable(token.id)}: var(${internalSemanticVariable(token.id)});`,
    );
  }

  for (const key of ["background", "text", "border", "accent", "accent-dark"]) {
    lines.push(`  --${key}: var(--ds-semantic-color-${key});`);
  }

  lines.push("}", "", '[data-theme="dark"] {');
  for (const token of semanticColors) {
    const rawValue = token.modes?.dark ?? token.value;
    const value = formatSourceValueForCss(rawValue, tokenById, token.type);
    lines.push(`  ${internalSemanticVariable(token.id)}: ${value};`);
    lines.push(
      `  ${tokenCssVariable(token.id)}: var(${internalSemanticVariable(token.id)});`,
    );
  }
  for (const key of ["background", "text", "border", "accent", "accent-dark"]) {
    lines.push(`  --${key}: var(--ds-semantic-color-${key});`);
  }
  lines.push("}", "", ":root {");

  for (const token of rootTokens) {
    const value = formatSourceValueForCss(token.value, tokenById, token.type);
    if (value !== null) {
      lines.push(`  ${tokenCssVariable(token.id)}: ${value};`);
    }
  }
  lines.push("}");
  lines.push(...generateTypographyUtilities(tokens, tokenById), "");

  return lines.join("\n");
}

function hasGeneratedCssVariable(token) {
  return [
    "color.",
    "radius.",
    "shadow.",
    "font.",
    "motion.",
    "semantic.color.",
    "component.",
  ].some((prefix) => token.id.startsWith(prefix));
}

function publicManifest(manifest) {
  return {
    ...manifest,
    $schema: "/design-system/schemas/manifest.schema.json",
  };
}

function publicComponents(catalog) {
  return {
    ...catalog,
    $schema: "/design-system/schemas/component-catalog.schema.json",
  };
}

function publicAssets(catalog) {
  return {
    ...catalog,
    $schema: "/design-system/schemas/asset-catalog.schema.json",
    assets: catalog.assets.map((asset) => ({
      ...asset,
      files: asset.files.map((file) => {
        const bytes = readFileSync(resolve(repositoryRoot, file.path));
        return {
          ...file,
          bytes: bytes.byteLength,
          sha256: createHash("sha256").update(bytes).digest("hex"),
          publicUrl: file.path.startsWith("public/")
            ? `/${file.path.slice("public/".length)}`
            : null,
        };
      }),
    })),
  };
}

function publicRules(catalog) {
  return {
    ...catalog,
    $schema: "/design-system/schemas/rule-catalog.schema.json",
  };
}

function publicExceptions(catalog) {
  return {
    ...catalog,
    $schema: "/design-system/schemas/rule-exceptions.schema.json",
  };
}

function publicPatterns(catalog) {
  return {
    ...catalog,
    $schema: "/design-system/schemas/pattern-catalog.schema.json",
  };
}

function publicChannels(channels, manifest, components) {
  return {
    $schema: "/design-system/schemas/channel-catalog.schema.json",
    schemaVersion: "1.0.0",
    version: manifest.version,
    brandVersionId: manifest.brandVersionId,
    channels: channels.map((channel) => ({
      ...channel,
      $schema: "/design-system/schemas/channel.schema.json",
      compatibleComponentIds: components.components
        .filter((component) =>
          component.channels.some((alias) => channel.aliases.includes(alias)),
        )
        .map((component) => component.id),
    })),
  };
}

function json(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export function createArtifacts() {
  const tokenSource = readJson(sourcePaths.tokens);
  const manifest = readJson(sourcePaths.manifest);
  const components = readJson(sourcePaths.components);
  const assets = readJson(sourcePaths.assets);
  const rules = readJson(sourcePaths.rules);
  const exceptions = readJson(sourcePaths.exceptions);
  const patterns = readJson(sourcePaths.patterns);
  const channels = sourcePaths.channels.map(readJson);
  const tokens = collectTokens(tokenSource);
  const { resolveToken } = createResolver(tokens);

  const publicTokenCatalog = {
    $schema: "/design-system/schemas/token-catalog.schema.json",
    schemaVersion: "1.0.0",
    version: tokenSource.$version,
    brandVersionId: manifest.brandVersionId,
    source: "packages/tokens/src/wonka.tokens.json",
    themes: manifest.themes.map((theme) => theme.id),
    tokens: tokens.map((token) => ({
      id: token.id,
      type: token.type,
      description: token.description,
      cssVariable: hasGeneratedCssVariable(token)
        ? tokenCssVariable(token.id)
        : null,
      values: {
        light: resolveToken(token.id, "light"),
        dark: resolveToken(token.id, "dark"),
      },
    })),
  };

  const generatedTypescript = [
    "/* This file is generated by `bun run ds:build`. Do not edit directly. */",
    "",
    `export const tokenCatalog = ${JSON.stringify(publicTokenCatalog, null, 2)} as const;`,
    "",
    'export type TokenId = (typeof tokenCatalog.tokens)[number]["id"];',
    "export type DesignSystemTheme = (typeof tokenCatalog.themes)[number];",
    "",
  ].join("\n");
  const compatibilityTypescript = [
    "/* This file is generated by `bun run ds:build`. Do not edit directly. */",
    "",
    'export { tokenCatalog } from "@wonka/tokens";',
    'export type { DesignSystemTheme, TokenId } from "@wonka/tokens";',
    "",
  ].join("\n");

  const publicRuleCatalog = publicRules(rules);
  const publicExceptionCatalog = publicExceptions(exceptions);
  const publicPatternCatalog = publicPatterns(patterns);
  const publicChannelCatalog = publicChannels(channels, manifest, components);
  const generatedContracts = [
    "/* This file is generated by `bun run ds:build`. Do not edit directly. */",
    "",
    `export const designSystemManifest = ${JSON.stringify(publicManifest(manifest), null, 2)} as const;`,
    "",
    `export const ruleCatalog = ${JSON.stringify(publicRuleCatalog, null, 2)} as const;`,
    "",
    `export const exceptionCatalog = ${JSON.stringify(publicExceptionCatalog, null, 2)} as const;`,
    "",
    `export const patternCatalog = ${JSON.stringify(publicPatternCatalog, null, 2)} as const;`,
    "",
    `export const channelCatalog = ${JSON.stringify(publicChannelCatalog, null, 2)} as const;`,
    "",
    'export type RuleId = (typeof ruleCatalog.rules)[number]["id"];',
    'export type PatternId = (typeof patternCatalog.patterns)[number]["id"];',
    'export type ChannelId = (typeof channelCatalog.channels)[number]["id"];',
    'export type ChannelAlias = (typeof channelCatalog.channels)[number]["aliases"][number];',
    "",
  ].join("\n");

  return new Map([
    [
      resolve(repositoryRoot, "src/styles/generated/tokens.css"),
      generateCss(tokens),
    ],
    [
      resolve(repositoryRoot, "packages/tokens/src/generated/tokens.css"),
      generateCss(tokens),
    ],
    [
      resolve(repositoryRoot, "packages/tokens/src/generated/tokens.ts"),
      generatedTypescript,
    ],
    [
      resolve(repositoryRoot, "src/design-system/generated/tokens.ts"),
      compatibilityTypescript,
    ],
    [
      resolve(repositoryRoot, "src/design-system/generated/contracts.ts"),
      generatedContracts,
    ],
    [
      resolve(repositoryRoot, "public/design-system/tokens.json"),
      json(publicTokenCatalog),
    ],
    [
      resolve(repositoryRoot, "packages/tokens/src/generated/catalog.json"),
      json(publicTokenCatalog),
    ],
    [
      resolve(repositoryRoot, "public/design-system/manifest.json"),
      json(publicManifest(manifest)),
    ],
    [
      resolve(repositoryRoot, "public/design-system/components.json"),
      json(publicComponents(components)),
    ],
    [
      resolve(repositoryRoot, "public/design-system/assets.json"),
      json(publicAssets(assets)),
    ],
    [
      resolve(repositoryRoot, "public/design-system/rules.json"),
      json(publicRuleCatalog),
    ],
    [
      resolve(repositoryRoot, "public/design-system/exceptions.json"),
      json(publicExceptionCatalog),
    ],
    [
      resolve(repositoryRoot, "public/design-system/patterns.json"),
      json(publicPatternCatalog),
    ],
    [
      resolve(repositoryRoot, "public/design-system/channels.json"),
      json(publicChannelCatalog),
    ],
    [
      resolve(repositoryRoot, "public/design-system/llms.txt"),
      readFileSync(sourcePaths.agentGuide, "utf8"),
    ],
    [
      resolve(
        repositoryRoot,
        "public/design-system/schemas/token-catalog.schema.json",
      ),
      readFileSync(sourcePaths.tokenCatalogSchema, "utf8"),
    ],
    [
      resolve(
        repositoryRoot,
        "public/design-system/schemas/manifest.schema.json",
      ),
      readFileSync(sourcePaths.manifestSchema, "utf8"),
    ],
    [
      resolve(
        repositoryRoot,
        "public/design-system/schemas/component-catalog.schema.json",
      ),
      readFileSync(sourcePaths.componentSchema, "utf8"),
    ],
    [
      resolve(
        repositoryRoot,
        "public/design-system/schemas/asset-catalog.schema.json",
      ),
      readFileSync(sourcePaths.assetSchema, "utf8"),
    ],
    [
      resolve(
        repositoryRoot,
        "public/design-system/schemas/discovery.schema.json",
      ),
      readFileSync(sourcePaths.discoverySchema, "utf8"),
    ],
    [
      resolve(
        repositoryRoot,
        "public/design-system/schemas/rule-catalog.schema.json",
      ),
      readFileSync(sourcePaths.ruleSchema, "utf8"),
    ],
    [
      resolve(
        repositoryRoot,
        "public/design-system/schemas/rule-exceptions.schema.json",
      ),
      readFileSync(sourcePaths.exceptionSchema, "utf8"),
    ],
    [
      resolve(
        repositoryRoot,
        "public/design-system/schemas/pattern-catalog.schema.json",
      ),
      readFileSync(sourcePaths.patternSchema, "utf8"),
    ],
    [
      resolve(
        repositoryRoot,
        "public/design-system/schemas/channel.schema.json",
      ),
      readFileSync(sourcePaths.channelSchema, "utf8"),
    ],
    [
      resolve(
        repositoryRoot,
        "public/design-system/schemas/channel-catalog.schema.json",
      ),
      readFileSync(sourcePaths.channelCatalogSchema, "utf8"),
    ],
    [
      resolve(repositoryRoot, "public/.well-known/design-system.json"),
      json({
        $schema: "/design-system/schemas/discovery.schema.json",
        schemaVersion: "1.0.0",
        id: manifest.id,
        manifest: "/design-system/manifest.json",
        llms: "/design-system/llms.txt",
        humanDocs: "/design-system",
        catalogs: {
          tokens: "/design-system/tokens.json",
          components: "/design-system/components.json",
          assets: "/design-system/assets.json",
          rules: "/design-system/rules.json",
          exceptions: "/design-system/exceptions.json",
          patterns: "/design-system/patterns.json",
          channels: "/design-system/channels.json",
        },
      }),
    ],
  ]);
}

export function writeArtifacts({ check = false } = {}) {
  const mismatches = [];

  for (const [path, content] of createArtifacts()) {
    const current = existsSync(path) ? readFileSync(path, "utf8") : null;

    if (current === content) {
      continue;
    }

    if (check) {
      mismatches.push(path.replace(`${repositoryRoot}/`, ""));
      continue;
    }

    mkdirSync(dirname(path), { recursive: true });
    const temporaryPath = `${path}.${process.pid}.tmp`;
    writeFileSync(temporaryPath, content);
    renameSync(temporaryPath, path);
  }

  if (check && mismatches.length > 0) {
    throw new Error(
      `Generated design-system files are stale:\n${mismatches
        .map((path) => `- ${path}`)
        .join("\n")}\nRun \`bun run ds:build\`.`,
    );
  }

  return mismatches;
}

const invokedDirectly =
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (invokedDirectly) {
  try {
    const check = process.argv.includes("--check");
    writeArtifacts({ check });
    console.log(
      check
        ? "Design-system generated files are current."
        : "Design-system artifacts generated.",
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
