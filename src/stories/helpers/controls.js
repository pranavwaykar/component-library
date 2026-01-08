export const universalArgTypes = {
  as: {
    control: "select",
    options: ["label", "div", "span", "p", "section", "fieldset"],
    description: "Polymorphic element to render. Choose the root tag for the component.",
  },
  className: { control: "text", description: "CSS class names to attach to the root element." },
  id: { control: "text", description: "Stable DOM id. Useful for a11y or targeting in tests." },
  role: { control: "text", description: "ARIA role to override the implicit role of the element." },
  tabIndex: { control: "number", description: "Keyboard tab order override. 0 makes element focusable." },
  title: { control: "text", description: "Native title attribute. Shown as a tooltip in browsers." },
  hidden: { control: "boolean", description: "If true, hides the element from layout and a11y tree." },
  draggable: { control: "boolean", description: "Enable native drag interaction on the root element." },
  dir: { control: "select", options: ["ltr", "rtl", "auto"], description: "Text direction. Inherits by default." },
  "aria-label": { control: "text", name: "aria-label", description: "Accessible label for screen readers." },
  "data-testid": { control: "text", name: "data-testid", description: "Testing id attribute for selectors in tests." },
  style: { control: "object", description: "Inline style object merged after style-system shorthands." },
  onClick: { action: "click", description: "Mouse/keyboard click on the component." },
  onDoubleClick: { action: "doubleClick", description: "Double-click on the component." },
  onFocus: { action: "focus", description: "Component receives keyboard focus." },
  onBlur: { action: "blur", description: "Component loses keyboard focus." },
  onKeyDown: { action: "keyDown", description: "Key is pressed while the component is focused." },
  onKeyUp: { action: "keyUp", description: "Pressed key is released while focused." },
  onMouseEnter: { action: "mouseEnter", description: "Mouse pointer enters the component bounds." },
  onMouseLeave: { action: "mouseLeave", description: "Mouse pointer leaves the component bounds." },
  onPointerDown: { action: "pointerDown", description: "Pointer (mouse/pen/touch) goes down on the component." },
  onPointerUp: { action: "pointerUp", description: "Pointer (mouse/pen/touch) is released." },
  onTouchStart: { action: "touchStart", description: "Touch starts on touch-enabled devices." },
  onTouchEnd: { action: "touchEnd", description: "Touch ends on touch-enabled devices." },
  onChange: { action: "change", description: "Value change for inputs/selectors." },
  onInput: { action: "input", description: "Low-level input event for text-entry components." },
  onSubmit: { action: "submit", description: "Form submission event (when applicable)." },
  onWheel: { action: "wheel", description: "Mouse wheel or trackpad scroll over the component." },
  onDragStart: { action: "dragStart", description: "Native drag start event." },
  onDragEnd: { action: "dragEnd", description: "Native drag end event." },
};

export const styleSystemArgTypes = {
  m: { control: "text", description: "Margin shorthand. Accepts any CSS margin value (e.g. 8px, 1rem)." },
  mx: { control: "text", description: "Horizontal margin (left and right)." },
  my: { control: "text", description: "Vertical margin (top and bottom)." },
  p: { control: "text", description: "Padding shorthand. Accepts any CSS padding value." },
  px: { control: "text", description: "Horizontal padding (left and right)." },
  py: { control: "text", description: "Vertical padding (top and bottom)." },
  w: { control: "text", description: "Width of the component (e.g. 240px, 100%, auto)." },
  h: { control: "text", description: "Height of the component (e.g. 32px, 2rem, auto)." },
  color: { control: "color", description: "Text color." },
  backgroundColor: { control: "color", description: "Background color." },
};

export const visualCommonArgTypes = {
  disabled: { control: "boolean", description: "Disable user interactions. A faint overlay is applied when supported." },
  loading: { control: "boolean", description: "Show a busy state and block interactions where applicable." },
};

export const commonArgTypes = {
  ...universalArgTypes,
  ...styleSystemArgTypes,
  ...visualCommonArgTypes,
  customProps: { control: "object", description: "Extra attributes to spread onto the component root (e.g. {\"data-qa\":\"foo\"})." },
};
