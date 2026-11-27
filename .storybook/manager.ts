import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Wonka Design System",
    brandUrl: "/?path=/docs/getting-started-introduction--docs",
    brandImage: "/images/brand/wonka-logo-black.svg",
    brandTarget: "_self",
    colorPrimary: "#082c72",
    colorSecondary: "#2f6de0",
    appBg: "#f7f7f7",
    appContentBg: "#ffffff",
    appBorderColor: "#d9d9d5",
    appBorderRadius: 8,
    fontBase: '"Inter Display", ui-sans-serif, system-ui, sans-serif',
    fontCode: '"Cascadia Mono", "Segoe UI Mono", ui-monospace, monospace',
    textColor: "#0e1a16",
    textInverseColor: "#ffffff",
    barTextColor: "#3b2929",
    barSelectedColor: "#1e54c2",
    barHoverColor: "#2f6de0",
    inputBg: "#ffffff",
    inputBorder: "#d9d9d5",
    inputTextColor: "#0e1a16",
    inputBorderRadius: 6,
  }),
});
