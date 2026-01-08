import React from "react";
import { IconBox } from "../components/IconBox/IconBox";
import { commonArgTypes } from "./helpers/controls";

export default {
  id: "example-iconbox",
  title: "Icon Box Component",
  component: IconBox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "IconBox pairs an icon with an optional label, count badge, and attention indicator. Useful for navigation shortcuts, metrics, and notifications. Variants control visual emphasis; size adjusts tap targets. Fully clickable (keyboard accessible) and supports universal props and the shorthand style-system for layout and spacing.",
      },
    },
  },
  argTypes: {
    ...commonArgTypes,
    iconText: {
      control: "text",
      description: "Replace the icon with text (or leave empty to use default)",
    },
    rounded: { table: { disable: true } },
    tone: { table: { disable: true } },
  },
};

const bell = React.createElement("span", { "aria-hidden": "true" }, "🔔");
const flaticon = React.createElement("i", { className: "fi fi-rr-bell" });

export const Primary = {
  name: "Icon Box",
  args: {
    as: "div",
    id: "iconbox-1",
    "data-testid": "iconbox",
    tabIndex: 0,
    dir: "ltr",
    hidden: false,
    icon: flaticon,
    iconText: "",
    count: '',
    label: "Notifications",
    indicator: true,
    m: "0",
    px: "10px",
    py: "8px",
  },
  render: (args) => {
    const icon = args.iconText
      ? React.createElement("span", { "aria-hidden": "true" }, args.iconText)
      : args.icon;
    return React.createElement(IconBox, { ...args, icon });
  },
};
