import type { Preview } from "@storybook/react";
import { GlobalStyles, StyleProvider } from "../src/styles";
import React from "react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <StyleProvider>
        <GlobalStyles />
        <Story />
      </StyleProvider>
    ),
  ],
};

export default preview;
