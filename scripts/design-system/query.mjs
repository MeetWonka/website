import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { repositoryRoot } from "./build.mjs";

function readJson(path) {
  return JSON.parse(readFileSync(resolve(repositoryRoot, path), "utf8"));
}

function output(value) {
  console.log(JSON.stringify(value, null, 2));
}

function argumentValue(flag) {
  const index = process.argv.indexOf(flag);
  if (index < 0) {
    return null;
  }
  const value = process.argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

const manifest = readJson("public/design-system/manifest.json");
const tokenCatalog = readJson("public/design-system/tokens.json");
const componentCatalog = readJson("public/design-system/components.json");
const assetCatalog = readJson("public/design-system/assets.json");
const ruleCatalog = readJson("public/design-system/rules.json");
const exceptionCatalog = readJson("public/design-system/exceptions.json");
const patternCatalog = readJson("public/design-system/patterns.json");
const channelCatalog = readJson("public/design-system/channels.json");
const [command = "manifest", target, ...rest] = process.argv.slice(2);

function findChannel(value) {
  return channelCatalog.channels.find(
    (channel) =>
      channel.id === value ||
      channel.id === `channel.${value}` ||
      channel.aliases.includes(value),
  );
}

function isExceptionEffective(exception, activeRuleIds) {
  const today = new Date().toISOString().slice(0, 10);
  return (
    exception.lifecycle === "approved" &&
    Boolean(exception.approvedBy) &&
    Boolean(exception.approvedAt) &&
    exception.expiresAt >= today &&
    activeRuleIds.has(exception.ruleId)
  );
}

switch (command) {
  case "manifest":
    output(manifest);
    break;

  case "tokens":
    output(tokenCatalog.tokens);
    break;

  case "token": {
    const token = tokenCatalog.tokens.find((item) => item.id === target);
    if (!token) {
      throw new Error(`Unknown token: ${target}`);
    }
    const theme = argumentValue("--theme");
    if (theme && !tokenCatalog.themes.includes(theme)) {
      throw new Error(
        `Unknown theme: ${theme}. Use ${tokenCatalog.themes.join(" or ")}.`,
      );
    }
    output(
      theme
        ? {
            ...token,
            value: token.values[theme],
            theme,
          }
        : token,
    );
    break;
  }

  case "components":
    output(componentCatalog.components);
    break;

  case "component": {
    const component = componentCatalog.components.find(
      (item) => item.id === target || item.id === `component.${target}`,
    );
    if (!component) {
      throw new Error(`Unknown component: ${target}`);
    }
    output(component);
    break;
  }

  case "assets":
    output(assetCatalog.assets);
    break;

  case "asset": {
    const asset = assetCatalog.assets.find(
      (item) => item.id === target || item.id === `asset.${target}`,
    );
    if (!asset) {
      throw new Error(`Unknown asset: ${target}`);
    }
    output(asset);
    break;
  }

  case "rules": {
    const requestedChannel = argumentValue("--channel");
    if (!requestedChannel) {
      output(ruleCatalog.rules);
      break;
    }
    const channel = findChannel(requestedChannel);
    if (!channel) {
      throw new Error(`Unknown channel: ${requestedChannel}`);
    }
    output(
      ruleCatalog.rules.filter((rule) => rule.channelIds.includes(channel.id)),
    );
    break;
  }

  case "rule": {
    const rule = ruleCatalog.rules.find(
      (item) => item.id === target || item.id === `rule.${target}`,
    );
    if (!rule) {
      throw new Error(`Unknown rule: ${target}`);
    }
    output(rule);
    break;
  }

  case "exceptions": {
    const requestedRule = argumentValue("--rule");
    const activeRuleIds = new Set(
      ruleCatalog.rules
        .filter((rule) => rule.lifecycle === "active")
        .map((rule) => rule.id),
    );
    const exceptions = requestedRule
      ? exceptionCatalog.exceptions.filter(
          (exception) =>
            exception.ruleId === requestedRule ||
            exception.ruleId === `rule.${requestedRule}`,
        )
      : exceptionCatalog.exceptions;
    output(
      exceptions.map((exception) => ({
        ...exception,
        effective: isExceptionEffective(exception, activeRuleIds),
      })),
    );
    break;
  }

  case "patterns": {
    const requestedChannel = argumentValue("--channel");
    if (!requestedChannel) {
      output(patternCatalog.patterns);
      break;
    }
    const channel = findChannel(requestedChannel);
    if (!channel) {
      throw new Error(`Unknown channel: ${requestedChannel}`);
    }
    output(
      patternCatalog.patterns.filter((pattern) =>
        pattern.channelIds.includes(channel.id),
      ),
    );
    break;
  }

  case "pattern": {
    const pattern = patternCatalog.patterns.find(
      (item) => item.id === target || item.id === `pattern.${target}`,
    );
    if (!pattern) {
      throw new Error(`Unknown pattern: ${target}`);
    }
    output(pattern);
    break;
  }

  case "channels":
    output(channelCatalog.channels);
    break;

  case "channel": {
    const channel = findChannel(target);
    if (!channel) {
      throw new Error(`Unknown channel: ${target}`);
    }
    output(channel);
    break;
  }

  case "policy": {
    const requestedChannel = argumentValue("--channel") ?? target;
    const channel = findChannel(requestedChannel);
    if (!channel) {
      throw new Error(`Unknown channel: ${requestedChannel}`);
    }

    const channelRules = ruleCatalog.rules.filter((rule) =>
      rule.channelIds.includes(channel.id),
    );
    const approved =
      manifest.approval.status === "approved" && channel.lifecycle === "active";
    const rules = channelRules.filter(
      (rule) => approved && rule.lifecycle === "active",
    );
    const effectiveRuleIds = new Set(rules.map((rule) => rule.id));
    const candidateRules = channelRules.filter(
      (rule) =>
        !effectiveRuleIds.has(rule.id) &&
        !["deprecated", "retired"].includes(rule.lifecycle),
    );
    const ruleIds = new Set(rules.map((rule) => rule.id));
    const compatibleComponentIds = new Set(channel.compatibleComponentIds);
    const compatibleAssetIds = new Set(channel.compatibleAssetIds);
    const compatibleAssets = assetCatalog.assets.filter((asset) =>
      compatibleAssetIds.has(asset.id),
    );
    const today = new Date().toISOString().slice(0, 10);
    const rightsExpired = (asset) =>
      Boolean(asset.rights.expiresAt && asset.rights.expiresAt < today);
    const rightsCoverChannel = (asset) =>
      asset.rights.license === "verified_redistributable" ||
      (channel.distribution === "internal" &&
        asset.rights.license === "verified_internal");
    const assetIsBlocked = (asset) =>
      asset.lifecycle === "superseded" ||
      rightsExpired(asset) ||
      !rightsCoverChannel(asset);
    const independentlyUsableAsset = (asset) =>
      asset.lifecycle === "active" && !assetIsBlocked(asset);
    const effectiveAssets = approved
      ? compatibleAssets.filter(independentlyUsableAsset)
      : [];
    const effectiveAssetIds = new Set(effectiveAssets.map((asset) => asset.id));
    const blockedAssetIds = new Set(
      compatibleAssets.filter(assetIsBlocked).map((asset) => asset.id),
    );
    const compatibleComponents = componentCatalog.components.filter(
      (component) => compatibleComponentIds.has(component.id),
    );
    const componentIsBlocked = (component) =>
      ["deprecated", "retired"].includes(component.status) ||
      (component.assets ?? []).some((assetId) => blockedAssetIds.has(assetId));
    const effectiveComponents = compatibleComponents.filter(
      (component) =>
        approved &&
        component.status === "stable" &&
        !componentIsBlocked(component) &&
        (component.assets ?? []).every((assetId) =>
          effectiveAssetIds.has(assetId),
        ),
    );
    const effectiveComponentIds = new Set(
      effectiveComponents.map((component) => component.id),
    );
    const compatiblePatterns = patternCatalog.patterns.filter(
      (pattern) =>
        pattern.kind === "artifact" && pattern.channelIds.includes(channel.id),
    );
    const blockedRuleIds = new Set(
      channelRules
        .filter((rule) => ["deprecated", "retired"].includes(rule.lifecycle))
        .map((rule) => rule.id),
    );
    const patternIsBlocked = (pattern) =>
      ["deprecated", "retired"].includes(pattern.status) ||
      pattern.requiredAssetIds.some((assetId) =>
        blockedAssetIds.has(assetId),
      ) ||
      pattern.requiredRuleIds.some(
        (ruleId) =>
          blockedRuleIds.has(ruleId) ||
          !channelRules.some((rule) => rule.id === ruleId),
      ) ||
      pattern.requiredComponentIds.some((componentId) => {
        const component = compatibleComponents.find(
          (candidate) => candidate.id === componentId,
        );
        return !component || componentIsBlocked(component);
      });
    const effectivePatterns = compatiblePatterns.filter(
      (pattern) =>
        approved &&
        pattern.status === "stable" &&
        !patternIsBlocked(pattern) &&
        pattern.requiredComponentIds.every((componentId) =>
          effectiveComponentIds.has(componentId),
        ) &&
        pattern.requiredAssetIds.every((assetId) =>
          effectiveAssetIds.has(assetId),
        ) &&
        pattern.requiredRuleIds.every((ruleId) => effectiveRuleIds.has(ruleId)),
    );
    const effectivePatternIds = new Set(
      effectivePatterns.map((pattern) => pattern.id),
    );
    const allowedTokens = tokenCatalog.tokens.filter((token) =>
      channel.tokenSets.some(
        (set) => token.id === set || token.id.startsWith(`${set}.`),
      ),
    );
    output({
      designSystemVersion: manifest.version,
      brandVersionId: manifest.brandVersionId,
      tokenCatalogVersion: tokenCatalog.version,
      policyStatus: approved ? "effective" : "review_required",
      channel,
      tokenSets: channel.tokenSets,
      tokens: approved ? allowedTokens : [],
      candidateTokens: approved ? [] : allowedTokens,
      rules,
      candidateRules,
      blockedRules: channelRules.filter((rule) => blockedRuleIds.has(rule.id)),
      components: effectiveComponents,
      candidateComponents: compatibleComponents.filter(
        (component) =>
          !effectiveComponentIds.has(component.id) &&
          !componentIsBlocked(component),
      ),
      blockedComponents: compatibleComponents.filter(componentIsBlocked),
      assets: effectiveAssets,
      candidateAssets: compatibleAssets.filter(
        (asset) => !effectiveAssetIds.has(asset.id) && !assetIsBlocked(asset),
      ),
      blockedAssets: compatibleAssets.filter(assetIsBlocked),
      patterns: effectivePatterns,
      candidatePatterns: compatiblePatterns.filter(
        (pattern) =>
          !effectivePatternIds.has(pattern.id) &&
          !patternIsBlocked(pattern) &&
          !["deprecated", "retired"].includes(pattern.status),
      ),
      blockedPatterns: compatiblePatterns.filter(patternIsBlocked),
      effectiveExceptions: exceptionCatalog.exceptions.filter((exception) =>
        isExceptionEffective(exception, ruleIds),
      ),
      manifestApproval: manifest.approval,
      humanApprovalRequired: manifest.governance.humanApprovalRequired,
    });
    break;
  }

  case "search": {
    const query = [target, ...rest].filter(Boolean).join(" ").toLowerCase();
    if (!query) {
      throw new Error("Search requires a query.");
    }

    const tokens = tokenCatalog.tokens.filter((token) =>
      JSON.stringify(token).toLowerCase().includes(query),
    );
    const components = componentCatalog.components.filter((component) =>
      JSON.stringify(component).toLowerCase().includes(query),
    );
    const assets = assetCatalog.assets.filter((asset) =>
      JSON.stringify(asset).toLowerCase().includes(query),
    );
    const rules = ruleCatalog.rules.filter((rule) =>
      JSON.stringify(rule).toLowerCase().includes(query),
    );
    const patterns = patternCatalog.patterns.filter((pattern) =>
      JSON.stringify(pattern).toLowerCase().includes(query),
    );
    const channels = channelCatalog.channels.filter((channel) =>
      JSON.stringify(channel).toLowerCase().includes(query),
    );

    output({ query, tokens, components, assets, rules, patterns, channels });
    break;
  }

  default:
    throw new Error(
      `Unknown command: ${command}. Use manifest, tokens, token, components, component, assets, asset, rules, rule, exceptions, patterns, pattern, channels, channel, policy, or search.`,
    );
}
