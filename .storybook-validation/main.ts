import config from "../.storybook/main";

// Validate both the main design system and the new product stories without
// duplicating product stories in the main Storybook navigation.
export default {
  ...config,
  stories: [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../apps/wonkachat-lab/src/product/stories/*.stories.tsx",
  ],
  staticDirs: [{ from: "../public", to: "/" }],
  refs: {},
};
