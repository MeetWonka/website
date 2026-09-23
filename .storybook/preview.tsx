import type { Preview } from "@storybook/nextjs-vite";
import { fontVariables } from "../src/lib/fonts";
import "../src/styles/globals.css";
import "./preview.css";

const preview: Preview = {
  tags: ["autodocs"],
  initialGlobals: {
    theme: "light",
  },
  globalTypes: {
    theme: {
      description: "Wonka semantic color theme",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div
        className={`${fontVariables} sb-wonka-theme`}
        data-theme={context.globals.theme}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    options: {
      storySort: {
        order: [
          "Getting Started",
          "Foundations",
          "Governance",
          "Compositions",
          "Assets",
          "Actions",
          "Forms & Inputs",
          "Data Display",
          "Feedback & Status",
          "Navigation",
          "Layout",
          "*",
        ],
      },
    },
    docs: {
      toc: true,
    },
    a11y: {
      test: "error",
    },
  },
};

export default preview;
