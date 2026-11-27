import type { Decorator } from "@storybook/react-vite";
import { ProductTheme } from "../../../../../packages/product-ui/src";
import "../../../../../packages/product-ui/src/styles.css";
import "../lab.css";
export const productDecorator: Decorator = (Story, context) => (
  <ProductTheme theme={context.globals.theme === "dark" ? "dark" : "light"}>
    <div style={{ padding: 28 }}>
      <Story />
    </div>
  </ProductTheme>
);
