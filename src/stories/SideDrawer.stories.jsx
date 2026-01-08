import React, { useState } from 'react';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import Card from '../components/Card/Card';
import { commonArgTypes } from './helpers/controls';

export default {
  title: 'Side Drawer Component',
  component: SideDrawer,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    ...commonArgTypes,
    opened: { control: 'boolean', description: 'Whether the drawer is visible.' },
    position: { control: 'select', options: ['left','right'], description: 'Side of the screen the drawer anchors to.' },
    title: { control: 'text', description: 'Header title displayed in the drawer.' },
    overlayColor: { control: 'color' },
    overlayOpacity: { control: 'text', description: 'Opacity of the backdrop overlay (0–1 or CSS value).' },
    overlayBlur: { control: 'text', description: 'Backdrop blur applied to the overlay (e.g. 4px).' },
    panelBgColor: { control: 'color' },
    panelRadius: { control: 'text', description: 'Corner radius for the drawer panel.' },
    panelMinWidth: { control: 'text', description: 'Minimum width of the drawer panel.' },
    headerBgColor: { control: 'color' },
    headerBorderColor: { control: 'color' },
    titleColor: { control: 'color' },
    closeButtonColor: { control: 'color' },
    headerPadding: { control: 'text', description: 'Padding inside the header area.' },
    contentPadding: { control: 'text', description: 'Padding around the drawer content.' },
    titleFontSize: { control: 'text', description: 'Font size for the title text.' },
    titleFontWeight: { control: 'text', description: 'Font weight for the title text.' },
    closeButtonSize: { control: 'text', description: 'Font size of the close icon.' },
    draggable: { table: { disable: true } },
    size: { table: { disable: true } },
    variant: { table: { disable: true } },
    loading: { control: 'boolean', description: 'Show a loading overlay over the panel.' },
  },
};

export const Default = {
  name: 'Side Drawer',
  args: {
    opened: true,
    position: 'right',
    title: 'Details',
    loading: false,
    disabled: false,
    overlayColor: 'rgba(0,0,0,.35)',
    overlayOpacity: undefined,
    overlayBlur: undefined,
    panelBgColor: '#ffffff',
    panelRadius: undefined,
    panelMinWidth: '320px',
    headerBgColor: undefined,
    headerBorderColor: '#e6ebf2',
    titleColor: undefined,
    titleFontWeight: undefined,
    closeButtonColor: undefined,
    headerPadding: '12px 16px',
    contentPadding: '16px',
    titleFontSize: '14px',
    closeButtonSize: '22px',
    content: 'This is Drawer Content Which Is Replaceable',
  },
  render: (args) => (
    <div style={{ height: 400, width: 600, position: 'relative', border: '1px dashed #e6ebf2' }}>
      <SideDrawer {...args} />
    </div>
  ),
};


