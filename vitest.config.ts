import { playwright } from "@vitest/browser-playwright";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const repositoryDirectory = dirname(fileURLToPath(import.meta.url));

function storybookProject(theme: "light" | "dark") {
  return {
    extends: true as const,
    plugins: [
      storybookTest({
        configDir: join(repositoryDirectory, ".storybook-validation"),
        initialGlobals: { theme },
      }),
    ],
    test: {
      name: `storybook-${theme}`,
      browser: {
        enabled: true,
        headless: true,
        provider: playwright({}),
        instances: [
          {
            browser: "chromium" as const,
            viewport: { width: 1280, height: 720 },
          },
        ],
      },
    },
  };
}

export default defineConfig({
  // Homepage stories load next-intl lazily; prebundle it before browser tests
  // so Vite cannot invalidate running stories during a cold-cache run.
  optimizeDeps: { include: ["next-intl"] },
  test: {
    projects: [
      storybookProject("light"),
      storybookProject("dark"),
    ],
  },
});
