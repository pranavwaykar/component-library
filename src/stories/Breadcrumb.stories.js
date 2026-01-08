import React from "react";
import "../index.scss";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { commonArgTypes } from "./helpers/controls";

export default {
  id: "breadcrumb",
  title: "Breadcrumb Component",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      source: { state: "none" },
      description: {
        component: `Breadcrumb communicates the user's location in the app hierarchy. Provide items as an ordered array of labels or objects. The container supports universal/style props for spacing and placement within headers or pages. Example using objects (links and per-item clicks):
        
        [
        { "label": "Home", "href": "/" },
        { "label": "Section", "href": "/section" },
        { "label": "Current Page", "onClick": "() => console.log('clicked current')" }
        ]
        `,
      },
    },
  },

  argTypes: {
    ...commonArgTypes,
    items: {
      control: "object",
      description:
        'Array of strings/nodes or objects: { "label": node, "href?": string, "onClick?": func }',
    },
    separator: { control: "text" },
    tone: { table: { disable: true } },
    colorScheme: { table: { disable: true } },
    onItemClick: { action: "onItemClick" },
  },
};

export const Default = {
  name: "Default",
  args: {
    items: [
      "ADVANCITY4009",
      "TEST MUAMELAT 06",
      "MUAMELE DETAY SAYFASI",
      "KÜNYE BİLGİLERİ",
    ],
  },
};