import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { relative, resolve } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import { loadCsf } from "storybook/internal/csf-tools";
import {
  collectTokens,
  createResolver,
  repositoryRoot,
  writeArtifacts,
} from "./build.mjs";

function readJson(path) {
  return JSON.parse(readFileSync(resolve(repositoryRoot, path), "utf8"));
}

function fail(message) {
  throw new Error(message);
}

function createSchemaValidator() {
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
  });
  ajv.addFormat("date", {
    type: "string",
    validate(value) {
      const parsed = new Date(`${value}T00:00:00.000Z`);
      return (
        /^\d{4}-\d{2}-\d{2}$/.test(value) &&
        !Number.isNaN(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === value
      );
    },
  });
  ajv.addFormat("date-time", {
    type: "string",
    validate(value) {
      return (
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(value) &&
        !Number.isNaN(Date.parse(value))
      );
    },
  });
  return ajv;
}

function validateSchemas({
  manifest,
  components,
  assets,
  rules,
  exceptions,
  patterns,
  channels,
}) {
  const ajv = createSchemaValidator();

  const contracts = [
    {
      name: "manifest",
      schema: readJson("design-system/schemas/manifest.schema.json"),
      value: manifest,
    },
    {
      name: "components",
      schema: readJson("design-system/schemas/component-catalog.schema.json"),
      value: components,
    },
    {
      name: "assets",
      schema: readJson("design-system/schemas/asset-catalog.schema.json"),
      value: assets,
    },
    {
      name: "rules",
      schema: readJson("design-system/schemas/rule-catalog.schema.json"),
      value: rules,
    },
    {
      name: "exceptions",
      schema: readJson("design-system/schemas/rule-exceptions.schema.json"),
      value: exceptions,
    },
    {
      name: "patterns",
      schema: readJson("design-system/schemas/pattern-catalog.schema.json"),
      value: patterns,
    },
  ];
  const channelSchema = readJson("design-system/schemas/channel.schema.json");

  for (const contract of contracts) {
    const validate = ajv.compile(contract.schema);
    if (!validate(contract.value)) {
      fail(
        `${contract.name} schema validation failed:\n${ajv.errorsText(
          validate.errors,
          { separator: "\n" },
        )}`,
      );
    }
  }

  const validateChannel = ajv.compile(channelSchema);
  for (const channel of channels) {
    if (!validateChannel(channel)) {
      fail(
        `${channel.id ?? "channel"} schema validation failed:\n${ajv.errorsText(
          validateChannel.errors,
          { separator: "\n" },
        )}`,
      );
    }
  }
}

function validatePublishedSchemas() {
  const ajv = createSchemaValidator();
  const channelSchema = readJson("design-system/schemas/channel.schema.json");
  ajv.addSchema(channelSchema);

  const contracts = [
    {
      name: "published manifest",
      schema: readJson("design-system/schemas/manifest.schema.json"),
      value: readJson("public/design-system/manifest.json"),
    },
    {
      name: "published token catalog",
      schema: readJson("design-system/schemas/token-catalog.schema.json"),
      value: readJson("public/design-system/tokens.json"),
    },
    {
      name: "published component catalog",
      schema: readJson("design-system/schemas/component-catalog.schema.json"),
      value: readJson("public/design-system/components.json"),
    },
    {
      name: "published asset catalog",
      schema: readJson("design-system/schemas/asset-catalog.schema.json"),
      value: readJson("public/design-system/assets.json"),
    },
    {
      name: "published rule catalog",
      schema: readJson("design-system/schemas/rule-catalog.schema.json"),
      value: readJson("public/design-system/rules.json"),
    },
    {
      name: "published exception catalog",
      schema: readJson("design-system/schemas/rule-exceptions.schema.json"),
      value: readJson("public/design-system/exceptions.json"),
    },
    {
      name: "published pattern catalog",
      schema: readJson("design-system/schemas/pattern-catalog.schema.json"),
      value: readJson("public/design-system/patterns.json"),
    },
    {
      name: "published channel catalog",
      schema: readJson("design-system/schemas/channel-catalog.schema.json"),
      value: readJson("public/design-system/channels.json"),
    },
    {
      name: "published discovery",
      schema: readJson("design-system/schemas/discovery.schema.json"),
      value: readJson("public/.well-known/design-system.json"),
    },
  ];

  for (const contract of contracts) {
    const validate = ajv.compile(contract.schema);
    if (!validate(contract.value)) {
      fail(
        `${contract.name} schema validation failed:\n${ajv.errorsText(
          validate.errors,
          { separator: "\n" },
        )}`,
      );
    }
  }
}

function validatePublishedTokenCssVariables() {
  const catalog = readJson("public/design-system/tokens.json");
  const css = readFileSync(
    resolve(repositoryRoot, "packages/tokens/src/generated/tokens.css"),
    "utf8",
  );

  for (const token of catalog.tokens) {
    if (token.cssVariable !== null && !css.includes(`${token.cssVariable}:`)) {
      fail(`${token.id} advertises missing CSS variable ${token.cssVariable}.`);
    }
  }
}

function validateTokens(tokenSource) {
  const tokens = collectTokens(tokenSource);
  const ids = new Set(tokens.map((token) => token.id));

  if (ids.size !== tokens.length) {
    fail("Token IDs must be unique.");
  }

  const references = [];

  function collectReferences(value, source) {
    if (typeof value === "string") {
      for (const match of value.matchAll(/\{([^}]+)\}/g)) {
        references.push({ source, target: match[1] });
      }
      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        collectReferences(item, source);
      }
      return;
    }

    if (value !== null && typeof value === "object") {
      for (const item of Object.values(value)) {
        collectReferences(item, source);
      }
    }
  }

  for (const token of tokens) {
    collectReferences(token.value, token.id);
    collectReferences(token.modes, token.id);

    if (token.id.startsWith("semantic.color.")) {
      if (!token.modes?.light || !token.modes?.dark) {
        fail(`${token.id} must define light and dark modes.`);
      }
    }
  }

  for (const reference of references) {
    if (!ids.has(reference.target)) {
      fail(`${reference.source} references unknown token ${reference.target}.`);
    }
  }

  const graph = new Map();
  for (const { source, target } of references) {
    graph.set(source, [...(graph.get(source) ?? []), target]);
  }

  function visit(id, stack = []) {
    if (stack.includes(id)) {
      fail(`Circular token reference: ${[...stack, id].join(" → ")}`);
    }
    for (const target of graph.get(id) ?? []) {
      visit(target, [...stack, id]);
    }
  }

  for (const id of ids) {
    visit(id);
  }

  return { ids, tokens };
}

function validateManifest(manifest) {
  if (manifest.id !== "wonka-design-system") {
    fail("Manifest id must remain wonka-design-system.");
  }
  if (!/^\d+\.\d+\.\d+$/.test(manifest.version)) {
    fail("Manifest version must use semantic versioning.");
  }
  if (!manifest.brandVersionId) {
    fail("Manifest requires an immutable brandVersionId.");
  }
  if (!manifest.governance?.humanApprovalRequired) {
    fail("Human approval must remain required.");
  }
  const approved =
    manifest.approval?.status === "approved" &&
    manifest.approval.approvedBy &&
    manifest.approval.approvedAt;
  if (manifest.approval?.status === "approved" && !approved) {
    fail("An approved manifest requires approval provenance.");
  }
  if (
    manifest.approval?.status !== "approved" &&
    (manifest.approval?.approvedBy || manifest.approval?.approvedAt)
  ) {
    fail("An unapproved manifest cannot carry approval provenance.");
  }
  if ((manifest.status === "stable" || manifest.releasedAt) && !approved) {
    fail("A stable or released manifest requires human approval.");
  }

  const themes = manifest.themes.map((theme) => theme.id).sort();
  if (themes.join(",") !== "dark,light") {
    fail("Generated token contracts currently support light and dark themes.");
  }

  const expectedSources = {
    tokens: "packages/tokens/src/wonka.tokens.json",
    components: "design-system/components.json",
    assets: "design-system/assets.json",
    rules: "design-system/rules/catalog.json",
    exceptions: "design-system/rules/exceptions.json",
    patterns: "design-system/patterns.json",
    channels: "design-system/channels",
  };
  const expectedGenerated = {
    css: "packages/tokens/src/generated/tokens.css",
    typescript: "packages/tokens/src/generated/tokens.ts",
    tokenCatalog: "public/design-system/tokens.json",
    componentCatalog: "public/design-system/components.json",
    assetCatalog: "public/design-system/assets.json",
    ruleCatalog: "public/design-system/rules.json",
    exceptionCatalog: "public/design-system/exceptions.json",
    patternCatalog: "public/design-system/patterns.json",
    channelCatalog: "public/design-system/channels.json",
    contractTypescript: "src/design-system/generated/contracts.ts",
    manifest: "public/design-system/manifest.json",
    agentGuide: "public/design-system/llms.txt",
    discovery: "public/.well-known/design-system.json",
  };
  if (JSON.stringify(manifest.sources) !== JSON.stringify(expectedSources)) {
    fail("Manifest source paths must match the build inputs.");
  }
  if (
    JSON.stringify(manifest.generated) !== JSON.stringify(expectedGenerated)
  ) {
    fail("Manifest generated paths must match the build outputs.");
  }
}

function validatePackages(
  manifest,
  tokenSource,
  componentCatalog,
  assetCatalog,
  ruleCatalog,
  exceptionCatalog,
  patternCatalog,
  tokenPackage,
  reactPackage,
  rootPackage,
) {
  if (tokenPackage.name !== "@wonka/tokens") {
    fail("Token package must remain @wonka/tokens.");
  }
  if (reactPackage.name !== "@wonka/react") {
    fail("React package must remain @wonka/react.");
  }
  if (!tokenPackage.private || !reactPackage.private) {
    fail(
      "Design-system packages must remain private until publication approval.",
    );
  }
  if (tokenPackage.version !== tokenSource.$version) {
    fail(
      `@wonka/tokens ${tokenPackage.version} does not match token source ${tokenSource.$version}.`,
    );
  }
  if (reactPackage.version !== componentCatalog.version) {
    fail(
      `@wonka/react ${reactPackage.version} does not match component catalog ${componentCatalog.version}.`,
    );
  }
  for (const [name, version] of [
    ["token source", tokenSource.$version],
    ["component catalog", componentCatalog.version],
    ["asset catalog", assetCatalog.version],
    ["rule catalog", ruleCatalog.version],
    ["exception catalog", exceptionCatalog.version],
    ["pattern catalog", patternCatalog.version],
    ["@wonka/tokens", tokenPackage.version],
    ["@wonka/react", reactPackage.version],
  ]) {
    if (version !== manifest.version) {
      fail(
        `${name} version ${version} does not match manifest ${manifest.version}.`,
      );
    }
  }
  if (manifest.version !== reactPackage.version) {
    fail(
      `Manifest ${manifest.version} does not match @wonka/react ${reactPackage.version}.`,
    );
  }

  const requiredExports = new Map([
    [
      "@wonka/tokens",
      [".", "./tailwind.css", "./tokens.json", "./catalog.json"],
    ],
    [
      "@wonka/react",
      [
        ".",
        "./button",
        "./badge",
        "./eyebrow",
        "./section",
        "./surface",
        "./design-tokens",
      ],
    ],
  ]);

  for (const [packageName, packageJson, packageDirectory] of [
    ["@wonka/tokens", tokenPackage, "packages/tokens"],
    ["@wonka/react", reactPackage, "packages/react"],
  ]) {
    for (const exportName of requiredExports.get(packageName)) {
      const target = packageJson.exports?.[exportName];
      if (!target) {
        fail(`${packageName} is missing required export ${exportName}.`);
      }
      const paths =
        typeof target === "string" ? [target] : Object.values(target);
      for (const path of paths) {
        if (
          typeof path !== "string" ||
          !path.startsWith("./") ||
          !existsSync(resolve(repositoryRoot, packageDirectory, path.slice(2)))
        ) {
          fail(`${packageName} export ${exportName} has an invalid target.`);
        }
      }
    }
  }

  for (const packageName of ["@wonka/tokens", "@wonka/react"]) {
    if (rootPackage.dependencies?.[packageName] !== "workspace:*") {
      fail(`Root dependencies must link ${packageName} with workspace:*.`);
    }
  }

  for (const path of repositoryFiles().filter((candidate) =>
    candidate.startsWith("packages/react/src/"),
  )) {
    const source = readFileSync(resolve(repositoryRoot, path), "utf8");
    if (/from\s+["']next(?:\/|["'])/.test(source)) {
      fail(`@wonka/react must remain framework-neutral: ${path}.`);
    }
  }
}

function validateComponents(catalog, tokenIds, assetIds) {
  const ids = new Set();

  for (const component of catalog.components) {
    if (ids.has(component.id)) {
      fail(`Duplicate component id: ${component.id}`);
    }
    ids.add(component.id);

    const sourcePath = resolve(repositoryRoot, component.source);
    if (!existsSync(sourcePath)) {
      fail(`${component.id} source does not exist: ${component.source}`);
    }
    const source = readFileSync(sourcePath, "utf8");
    for (const exportName of component.exports) {
      const escapedName = exportName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const exportPattern = new RegExp(
        `export\\s+(?:function|const|class|type|interface)\\s+${escapedName}\\b`,
      );
      if (!exportPattern.test(source)) {
        fail(
          `${component.id} declares missing export ${exportName} in ${component.source}.`,
        );
      }
    }

    for (const tokenId of component.tokens) {
      if (!tokenIds.has(tokenId)) {
        fail(`${component.id} references unknown token ${tokenId}.`);
      }
    }
    for (const assetId of component.assets ?? []) {
      if (!assetIds.has(assetId)) {
        fail(`${component.id} references unknown asset ${assetId}.`);
      }
    }

    if (component.accessibility.length === 0) {
      fail(`${component.id} requires an accessibility contract.`);
    }
  }

  return ids;
}

function validateAssets(catalog) {
  const ids = new Set();

  for (const asset of catalog.assets) {
    if (ids.has(asset.id)) {
      fail(`Duplicate asset id: ${asset.id}`);
    }
    ids.add(asset.id);

    for (const file of asset.files) {
      if (!existsSync(resolve(repositoryRoot, file.path))) {
        fail(`${asset.id} file does not exist: ${file.path}`);
      }
    }

    if (
      ["approved", "active"].includes(asset.lifecycle) &&
      !["verified_internal", "verified_redistributable"].includes(
        asset.rights.license,
      )
    ) {
      fail(`${asset.id} cannot be approved before license verification.`);
    }
    if (
      ["approved", "active"].includes(asset.lifecycle) &&
      (!asset.provenance?.approvedBy || !asset.provenance?.approvedAt)
    ) {
      fail(`${asset.id} cannot be approved without human approval provenance.`);
    }
    if (
      ["verified_internal", "verified_redistributable"].includes(
        asset.rights.license,
      ) &&
      (!asset.provenance?.approvedBy || !asset.provenance?.approvedAt)
    ) {
      fail(
        `${asset.id} cannot have verified rights without approval provenance.`,
      );
    }
    if (
      asset.rights.expiresAt &&
      asset.rights.expiresAt < new Date().toISOString().slice(0, 10)
    ) {
      fail(`${asset.id} rights expired on ${asset.rights.expiresAt}.`);
    }
  }

  return ids;
}

function validateRules(catalog, exceptionCatalog, tokenIds) {
  const ruleIds = new Set();
  const ruleById = new Map();

  for (const rule of catalog.rules) {
    if (ruleIds.has(rule.id)) {
      fail(`Duplicate rule id: ${rule.id}`);
    }
    ruleIds.add(rule.id);
    ruleById.set(rule.id, rule);

    if (rule.lifecycle === "active") {
      if (!rule.provenance?.approvedBy || !rule.provenance?.approvedAt) {
        fail(`${rule.id} cannot be active without human approval provenance.`);
      }
    }

    if (["raw_color", "forbidden_pattern"].includes(rule.validator.kind)) {
      if (!rule.validator.pattern) {
        fail(`${rule.id} requires a validator pattern.`);
      }
      try {
        new RegExp(rule.validator.pattern, rule.validator.flags ?? "");
      } catch {
        fail(`${rule.id} contains an invalid validator pattern.`);
      }
    }

    if (rule.validator.kind === "contrast") {
      if (!rule.validator.pairs?.length) {
        fail(`${rule.id} requires at least one contrast pair.`);
      }
      for (const pair of rule.validator.pairs) {
        for (const tokenId of [pair.foreground, pair.background]) {
          if (!tokenIds.has(tokenId)) {
            fail(`${rule.id} references unknown token ${tokenId}.`);
          }
        }
      }
    }
  }

  const exceptionIds = new Set();
  const today = new Date().toISOString().slice(0, 10);

  for (const exception of exceptionCatalog.exceptions) {
    if (exceptionIds.has(exception.id)) {
      fail(`Duplicate exception id: ${exception.id}`);
    }
    exceptionIds.add(exception.id);

    const rule = ruleById.get(exception.ruleId);
    if (!rule) {
      fail(`${exception.id} references unknown rule ${exception.ruleId}.`);
    }
    if (!rule.exceptionsAllowed) {
      fail(`${exception.id} targets ${rule.id}, which forbids exceptions.`);
    }
    const exceptionPath = exception.scope.path;
    if (/[*?{}]/.test(exceptionPath)) {
      fail(
        `${exception.id} must name exact files; broad glob exceptions are not allowed.`,
      );
    }
    const resolvedPath = resolve(repositoryRoot, exceptionPath);
    if (
      relative(repositoryRoot, resolvedPath) !== exceptionPath ||
      !existsSync(resolvedPath)
    ) {
      fail(
        `${exception.id} targets an invalid or missing file: ${exceptionPath}.`,
      );
    }
    const include = rule.scope.include.map(globPattern);
    const exclude = rule.scope.exclude.map(globPattern);
    if (
      !include.some((candidate) => candidate.test(exceptionPath)) ||
      exclude.some((candidate) => candidate.test(exceptionPath))
    ) {
      fail(`${exception.id} falls outside ${rule.id} scope.`);
    }
    if (exception.lifecycle === "approved") {
      if (!exception.approvedBy || !exception.approvedAt) {
        fail(`${exception.id} cannot be approved without approval provenance.`);
      }
      if (rule.lifecycle !== "active") {
        fail(
          `${exception.id} cannot be approved for inactive rule ${rule.id}.`,
        );
      }
      const currentFingerprints = new Set(
        ruleFindings(rule, exceptionPath).map((finding) => finding.fingerprint),
      );
      if (!currentFingerprints.has(exception.scope.fingerprint)) {
        fail(`${exception.id} does not match a current ${rule.id} finding.`);
      }
    }
    if (exception.lifecycle === "approved" && exception.expiresAt < today) {
      fail(`${exception.id} expired on ${exception.expiresAt}.`);
    }
  }

  return { ruleById, ruleIds };
}

function validateChannels(channels, manifest, assetIds, ruleById) {
  const channelIds = new Set();
  const aliases = new Map();
  const themeIds = new Set(manifest.themes.map((theme) => theme.id));

  for (const channel of channels) {
    if (channelIds.has(channel.id)) {
      fail(`Duplicate channel id: ${channel.id}`);
    }
    channelIds.add(channel.id);

    if (!["internal", "external"].includes(channel.distribution)) {
      fail(`${channel.id} requires an explicit distribution scope.`);
    }

    if (channel.lifecycle === "active") {
      if (!channel.provenance?.approvedBy || !channel.provenance?.approvedAt) {
        fail(
          `${channel.id} cannot be active without human approval provenance.`,
        );
      }
    }

    for (const alias of channel.aliases) {
      if (aliases.has(alias)) {
        fail(
          `Channel alias ${alias} is claimed by ${aliases.get(alias)} and ${channel.id}.`,
        );
      }
      aliases.set(alias, channel.id);
    }

    for (const theme of channel.allowedThemes) {
      if (!themeIds.has(theme)) {
        fail(`${channel.id} references unknown theme ${theme}.`);
      }
    }
    for (const assetId of channel.compatibleAssetIds) {
      if (!assetIds.has(assetId)) {
        fail(`${channel.id} references unknown asset ${assetId}.`);
      }
    }
    for (const constraint of channel.constraints) {
      if (constraint.ruleId && !ruleById.has(constraint.ruleId)) {
        fail(
          `${channel.id}.${constraint.id} references unknown rule ${constraint.ruleId}.`,
        );
      }
    }
  }

  for (const alias of manifest.channels) {
    if (!aliases.has(alias)) {
      fail(`Manifest channel ${alias} has no channel contract.`);
    }
  }

  for (const rule of ruleById.values()) {
    for (const channelId of rule.channelIds) {
      if (!channelIds.has(channelId)) {
        fail(`${rule.id} references unknown channel ${channelId}.`);
      }
    }
  }

  const componentCatalog = readJson("design-system/components.json");
  for (const component of componentCatalog.components) {
    for (const alias of component.channels) {
      if (!aliases.has(alias)) {
        fail(`${component.id} references unknown channel ${alias}.`);
      }
    }
    for (const channel of channels.filter((candidate) =>
      component.channels.some((alias) => candidate.aliases.includes(alias)),
    )) {
      for (const tokenId of component.tokens) {
        if (
          !channel.tokenSets.some(
            (set) => tokenId === set || tokenId.startsWith(`${set}.`),
          )
        ) {
          fail(
            `${channel.id} exposes ${component.id} without required token ${tokenId}.`,
          );
        }
      }
      for (const assetId of component.assets ?? []) {
        if (!channel.compatibleAssetIds.includes(assetId)) {
          fail(
            `${channel.id} exposes ${component.id} without required asset ${assetId}.`,
          );
        }
      }
    }
  }

  return { channelIds, aliases };
}

function compareVersions(first, second) {
  const firstParts = first.split(".").map(Number);
  const secondParts = second.split(".").map(Number);

  for (let index = 0; index < 3; index += 1) {
    if (firstParts[index] !== secondParts[index]) {
      return firstParts[index] - secondParts[index];
    }
  }

  return 0;
}

function validatePatterns(
  catalog,
  manifest,
  tokenIds,
  componentIds,
  assetIds,
  ruleById,
  channels,
) {
  const traceabilityFields = [
    "designSystemVersion",
    "brandVersionId",
    "channel",
    "theme",
    "policyStatus",
    "tokens",
    "components",
    "assets",
    "patterns",
    "unresolvedDecisions",
  ];
  const ids = new Set();
  const channelById = new Map(channels.map((channel) => [channel.id, channel]));
  const componentById = new Map(
    readJson("design-system/components.json").components.map((component) => [
      component.id,
      component,
    ]),
  );

  if (catalog.brandVersionId !== manifest.brandVersionId) {
    fail(
      `Pattern catalog brand version ${catalog.brandVersionId} does not match manifest ${manifest.brandVersionId}.`,
    );
  }

  for (const pattern of catalog.patterns) {
    if (ids.has(pattern.id)) {
      fail(`Duplicate pattern id: ${pattern.id}`);
    }
    ids.add(pattern.id);

    if (compareVersions(pattern.introducedIn, manifest.version) > 0) {
      fail(
        `${pattern.id} cannot be introduced in future version ${pattern.introducedIn}.`,
      );
    }

    const sourcePath = resolve(repositoryRoot, pattern.source);
    if (
      relative(repositoryRoot, sourcePath) !== pattern.source ||
      !/^src\/.+\.stories\.(?:js|jsx|mjs|ts|tsx)$/.test(pattern.source) ||
      !existsSync(sourcePath)
    ) {
      fail(`${pattern.id} source does not exist: ${pattern.source}`);
    }
    const source = readFileSync(sourcePath, "utf8");
    let resolvedStoryIds;
    try {
      const csf = loadCsf(source, {
        fileName: pattern.source,
        makeTitle: (title) => title,
      }).parse();
      resolvedStoryIds = new Set(csf.stories.map((story) => story.id));
    } catch (error) {
      fail(
        `${pattern.id} source is not valid Storybook CSF: ${
          error instanceof Error ? error.message : error
        }`,
      );
    }
    if (!resolvedStoryIds.has(pattern.storyId)) {
      fail(
        `${pattern.id} story ${pattern.storyId} is not exported by ${pattern.source}.`,
      );
    }

    const slotIds = new Set();
    for (const slot of pattern.slots) {
      if (slotIds.has(slot.id)) {
        fail(`${pattern.id} has duplicate slot ${slot.id}.`);
      }
      slotIds.add(slot.id);
    }
    if (!pattern.slots.some((slot) => slot.required)) {
      fail(`${pattern.id} requires at least one required composition slot.`);
    }

    for (const tokenSet of pattern.requiredTokenSets) {
      if (
        ![...tokenIds].some(
          (tokenId) =>
            tokenId === tokenSet || tokenId.startsWith(`${tokenSet}.`),
        )
      ) {
        fail(`${pattern.id} references unknown token set ${tokenSet}.`);
      }
    }
    for (const componentId of pattern.requiredComponentIds) {
      if (!componentIds.has(componentId)) {
        fail(`${pattern.id} references unknown component ${componentId}.`);
      }
    }
    for (const assetId of pattern.requiredAssetIds) {
      if (!assetIds.has(assetId)) {
        fail(`${pattern.id} references unknown asset ${assetId}.`);
      }
    }
    for (const ruleId of pattern.requiredRuleIds) {
      if (!ruleById.has(ruleId)) {
        fail(`${pattern.id} references unknown rule ${ruleId}.`);
      }
    }
    if (pattern.requiredRuleIds.includes("rule.agent-traceability")) {
      for (const field of traceabilityFields) {
        if (!pattern.agent.requiredTraceFields.includes(field)) {
          fail(
            `${pattern.id} requires rule.agent-traceability but omits trace field ${field}.`,
          );
        }
      }
    }

    for (const channelId of pattern.channelIds) {
      const channel = channelById.get(channelId);
      if (!channel) {
        fail(`${pattern.id} references unknown channel ${channelId}.`);
      }

      for (const tokenSet of pattern.requiredTokenSets) {
        if (!channel.tokenSets.includes(tokenSet)) {
          fail(
            `${pattern.id} requires token set ${tokenSet}, unavailable in ${channelId}.`,
          );
        }
      }
      for (const componentId of pattern.requiredComponentIds) {
        const component = componentById.get(componentId);
        if (
          !component.channels.some((alias) => channel.aliases.includes(alias))
        ) {
          fail(
            `${pattern.id} requires ${componentId}, incompatible with ${channelId}.`,
          );
        }
      }
      for (const assetId of pattern.requiredAssetIds) {
        if (!channel.compatibleAssetIds.includes(assetId)) {
          fail(
            `${pattern.id} requires ${assetId}, unavailable in ${channelId}.`,
          );
        }
      }
      for (const ruleId of pattern.requiredRuleIds) {
        if (!ruleById.get(ruleId).channelIds.includes(channelId)) {
          fail(
            `${pattern.id} requires ${ruleId}, which does not govern ${channelId}.`,
          );
        }
      }
    }
  }

  return ids;
}

function globPattern(pattern) {
  let expression = "^";

  for (let index = 0; index < pattern.length; index += 1) {
    const character = pattern[index];

    if (character === "*" && pattern[index + 1] === "*") {
      if (pattern[index + 2] === "/") {
        expression += "(?:.*/)?";
        index += 2;
      } else {
        expression += ".*";
        index += 1;
      }
      continue;
    }

    if (character === "*") {
      expression += "[^/]*";
      continue;
    }

    if (character === "?") {
      expression += "[^/]";
      continue;
    }

    expression += /[\\^$.*+?()[\]{}|]/.test(character)
      ? `\\${character}`
      : character;
  }

  return new RegExp(`${expression}$`);
}

function repositoryFiles() {
  const ignoredDirectories = new Set([
    ".git",
    ".next",
    "node_modules",
    "storybook-static",
  ]);
  const files = [];

  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory() && ignoredDirectories.has(entry.name)) {
        continue;
      }

      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) {
        visit(path);
      } else if (entry.isFile()) {
        files.push(relative(repositoryRoot, path));
      }
    }
  }

  visit(repositoryRoot);
  return files;
}

function validatePatternRules(ruleCatalog, exceptionCatalog) {
  const files = repositoryFiles();
  const approvedExceptions = exceptionCatalog.exceptions.filter(
    (exception) => exception.lifecycle === "approved",
  );

  for (const rule of ruleCatalog.rules) {
    if (
      !["raw_color", "forbidden_pattern"].includes(rule.validator.kind) ||
      rule.lifecycle !== "active"
    ) {
      continue;
    }

    const include = rule.scope.include.map(globPattern);
    const exclude = rule.scope.exclude.map(globPattern);
    const exceptions = new Map();
    for (const exception of approvedExceptions.filter(
      (candidate) => candidate.ruleId === rule.id,
    )) {
      const fingerprints = exceptions.get(exception.scope.path) ?? new Set();
      fingerprints.add(exception.scope.fingerprint);
      exceptions.set(exception.scope.path, fingerprints);
    }

    for (const path of files) {
      if (
        !include.some((candidate) => candidate.test(path)) ||
        exclude.some((candidate) => candidate.test(path))
      ) {
        continue;
      }

      for (const finding of ruleFindings(rule, path)) {
        if (exceptions.get(path)?.has(finding.fingerprint)) {
          continue;
        }
        fail(
          `${rule.id} failed at ${path}:${finding.line}:${finding.column}: ${finding.match}\nFingerprint: ${finding.fingerprint}`,
        );
      }
    }
  }
}

function ruleFindings(rule, path) {
  const source = readFileSync(resolve(repositoryRoot, path), "utf8");
  const pattern = new RegExp(
    rule.validator.pattern,
    `${rule.validator.flags ?? ""}g`,
  );
  const findings = [];

  for (const match of source.matchAll(pattern)) {
    const index = match.index ?? 0;
    const lineStart = source.lastIndexOf("\n", index - 1) + 1;
    const lineEnd = source.indexOf("\n", index);
    const lineText = source
      .slice(lineStart, lineEnd === -1 ? source.length : lineEnd)
      .trim();
    const normalizedMatch = match[0].trim().replace(/\s+/g, " ");
    const line = source.slice(0, index).split("\n").length;
    const column = index - lineStart + 1;
    const fingerprint = createHash("sha256")
      .update(
        [
          rule.id,
          path,
          String(line),
          String(column),
          normalizedMatch,
          lineText,
        ].join("\0"),
      )
      .digest("hex");

    findings.push({
      fingerprint: `sha256:${fingerprint}`,
      line,
      column,
      match: match[0],
    });
  }

  return findings;
}

function relativeLuminance(hex) {
  const normalized = hex.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(normalized)) {
    fail(
      `DS008 contrast validation requires a six-digit hex color, got ${hex}.`,
    );
  }

  const channels = [0, 2, 4].map((offset) => {
    const channel =
      Number.parseInt(normalized.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(first, second) {
  const lighter = Math.max(relativeLuminance(first), relativeLuminance(second));
  const darker = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

function validateContrasts(tokens, pairs) {
  const { resolveToken } = createResolver(tokens);

  for (const pair of pairs) {
    for (const theme of ["light", "dark"]) {
      const foreground = resolveToken(pair.foreground, theme);
      const background = resolveToken(pair.background, theme);
      const ratio = contrastRatio(foreground, background);

      if (ratio < pair.minimum) {
        fail(
          `DS008 ${pair.id} contrast is ${ratio.toFixed(2)}:1 in ${theme}; expected at least ${pair.minimum}:1.`,
        );
      }
    }
  }
}

try {
  const tokenSource = readJson("packages/tokens/src/wonka.tokens.json");
  const manifest = readJson("design-system/manifest.json");
  const components = readJson("design-system/components.json");
  const assets = readJson("design-system/assets.json");
  const rules = readJson("design-system/rules/catalog.json");
  const exceptions = readJson("design-system/rules/exceptions.json");
  const patterns = readJson("design-system/patterns.json");
  const channels = [
    readJson("design-system/channels/product.json"),
    readJson("design-system/channels/website.json"),
    readJson("design-system/channels/campaign.json"),
    readJson("design-system/channels/presentation.json"),
  ];
  const tokenPackage = readJson("packages/tokens/package.json");
  const reactPackage = readJson("packages/react/package.json");
  const rootPackage = readJson("package.json");

  const { ids: tokenIds, tokens } = validateTokens(tokenSource);
  validateSchemas({
    manifest,
    components,
    assets,
    rules,
    exceptions,
    patterns,
    channels,
  });
  validateManifest(manifest);
  validatePackages(
    manifest,
    tokenSource,
    components,
    assets,
    rules,
    exceptions,
    patterns,
    tokenPackage,
    reactPackage,
    rootPackage,
  );
  const assetIds = validateAssets(assets);
  const componentIds = validateComponents(components, tokenIds, assetIds);
  const { ruleById, ruleIds } = validateRules(rules, exceptions, tokenIds);
  validateChannels(channels, manifest, assetIds, ruleById);
  const patternIds = validatePatterns(
    patterns,
    manifest,
    tokenIds,
    componentIds,
    assetIds,
    ruleById,
    channels,
  );
  validatePatternRules(rules, exceptions);
  const contrastRules = [...ruleById.values()].filter(
    (rule) => rule.validator.kind === "contrast" && rule.lifecycle === "active",
  );
  if (
    ![...ruleById.values()].some((rule) => rule.validator.kind === "contrast")
  ) {
    fail("A contrast validation rule is required.");
  }
  for (const contrastRule of contrastRules) {
    validateContrasts(tokens, contrastRule.validator.pairs);
  }
  writeArtifacts({ check: true });
  validatePublishedSchemas();
  validatePublishedTokenCssVariables();

  if (!process.argv.includes("--quiet")) {
    console.log(
      `Design system valid: ${tokenIds.size} tokens, ${componentIds.size} components, ${assetIds.size} assets, ${ruleIds.size} rules, ${patternIds.size} patterns, ${channels.length} channels, version ${manifest.version}.`,
    );
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
