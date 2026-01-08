import "../src/index.css";
import "../src/App.css";
import "../src/index.scss";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
};

export default preview;
