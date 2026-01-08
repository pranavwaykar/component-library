import React from "react";
import Card from "../components/Card/Card";
import { commonArgTypes } from "./helpers/controls";

export default {
  title: "Card Component",
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: "centered",
    docs: {
      source: {
        language: "jsx",
        code:
          `<Card title="Card Title">
            <p>This is a generic container. Place any JSX inside.</p>
          </Card>`,
      },
      description: {
        component:
          "Card is a container component used to display content. It accepts the full set of universal/style props so you can control spacing, layout and theming consistently across the library.",
      },
    },
  },
  args: { title: "Card Title", showHeader: true, padding: 16 },
  argTypes: {
    ...commonArgTypes,
    padding: { table: { disable: true } },
    showHeader: { control: "boolean", description: "Toggle visibility of the header area." },
    header: { control: "text", description: "Optional custom header node. Overrides `title` when provided." },
    title: { control: "text", description: "Header text when `header` content is not provided." },
    disabled: { control: "boolean", description: "Disable interactions and show a faint overlay." },
    loading: { control: "boolean", description: "Display an overlay with a spinner." },
  },
};

export const Basic = (args) => (
  <div style={{ width: 420 }}>
    <Card {...args}>
      <p>This is a generic container. Place any JSX inside.</p>
    </Card>
  </div>
);
