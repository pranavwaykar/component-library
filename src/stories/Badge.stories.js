import React from "react";
import { Badge } from "../components/Badge/Badge";
import { commonArgTypes } from "./helpers/controls";

export default {
  id: "example-badge",
  title: "Badge Component",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Badge is a compact label used to annotate UI elements with status or metadata. It supports semantic color tokens, variants (solid, outline, ghost, link), size scale (xs–xl), tone (mapped to opacity), and design tokens for radius and elevation. Badges are polymorphic via `as` and accept the full universal prop set (a11y, events, data-/aria-*). Styling entry points include `className`, `style`, and a comprehensive shorthand style-system for spacing/layout/typography/background/borders/effects/transforms.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    ...commonArgTypes,
    color: { control: "color", description: "Text color. Accepts any valid CSS color value." },
    pill: { control: "boolean", description: "If true, rounds the badge to a pill shape." },
    dot: { control: "boolean", description: "If true, shows a small dot indicator when no icon is provided." },
    indicator: { control: "boolean", description: "Convenience alias to toggle the dot indicator." },
    icon: { control: "text", description: "Optional icon content rendered before the label." },
    label: { control: "text", description: "Badge text when children are not provided." },
    as: { control: "select", options: ["span", "a", "button", "div"], description: "Root element to render for the badge." },
    bgColor: { table: { disable: true } },
    borderColor: { table: { disable: true } },
  },
};

export const Primary = {
  name: "Badge",
  render: (args) => React.createElement(Badge, { ...args }),
  args: {
    id: "badge-1",
    className: "badge-story",
    label: "Active",
    color: "#a00028",
    backgroundColor: "#ff8b8b",
    indicator: true,
    icon: undefined,
    pill: true,
    tabIndex: 0,
    draggable: false,
    hidden: false,
    dir: "ltr",
    "data-testid": "badge",
    title: "Active",
    children: "Active",
    style: { fontWeight: "bold" },
    m: "0",
    px: "8px",
    py: "2px",
    w: "auto",
    h: "auto",
    as: "span",
    bgColor: undefined,
    borderColor: undefined,
  },
};
