import React from "react";
import { fn } from "storybook/test";

import { Button as ButtonComponent } from "../components/Button/Button";
import { commonArgTypes } from './helpers/controls';

export default {
  id: "example-button",
  title: "Button Component",
  component: ButtonComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button triggers an action or workflow. Variants cover common intents (primary, secondary, ghost, link, destructive, success, warning) with a consistent size scale (xsmall–xlarge). Supports loading/disabled states, count/indicator badges, and optional left/right icons. Buttons are polymorphic via `as` and expose full universal props (id, data-/aria-*, a11y events). Styling entry points: tokens for radius/elevation/shadow, and a rich shorthand style-system for spacing/layout/background/borders/effects/typography.",
      },
    },
  },

  tags: ["autodocs"],
  argTypes: {
    ...commonArgTypes,
    primary: { control: false, table: { disable: true } },
    backgroundColor: { control: "color", description: "Background color override for the button." },
    textColor: { control: "color", description: "Text (foreground) color override for the button." },
    size: { table: { disable: true } },
    fullWidth: { control: "boolean", description: "If true, stretches the button to fill its container width." },
    uppercase: { control: "boolean", description: "If true, transforms the label to uppercase." },
    disabled: { control: "boolean", description: "Disable user interaction and show a faint overlay." },
    loading: { control: "boolean", description: "Show a small spinner and block interactions." },
    leftIcon: { control: "text", description: "Optional icon content displayed before the label." },
    rightIcon: { control: "text", description: "Optional icon content displayed after the label." },
    indicator: { control: "boolean", description: "If true, show a small indicator badge." },
    count: { control: "number", description: "Numeric badge rendered inside the button." },
    type: { control: "radio", options: ["button", "submit", "reset"], description: "Native button type." },
    variant: { table: { disable: true } },
  },
  args: {
    onClick: fn(),
    as: 'button',
    id: "btn-1",
    tabIndex: 0,
    draggable: false,
    hidden: false,
    "aria-label": "Button",
    dir: "ltr",
    m: '0', w: 'auto',
  },
};

export const Primary = {
  name: "Button",
  render: (args) => React.createElement(ButtonComponent, { ...args }),
  args: {
    label: "Button",
    indicator: false,
    count: undefined,
    id: "button-1",
    tabIndex: 0,
    "data-testid": "button",
  },
};
