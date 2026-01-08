export function expandStyleProps(props = {}) {
  const s = {};
  const set = (k, v) => {
    if (v !== undefined && v !== null) s[k] = v;
  };

  const {
    m,
    mx,
    my,
    p,
    px,
    py,
    w,
    h,
    color,
    backgroundColor,
  } = props;

  set("margin", m);
  set("marginTop", my);
  set("marginRight", mx);
  set("marginBottom", my);
  set("marginLeft", mx);
  set("padding", p);
  set("paddingTop", py);
  set("paddingRight", px);
  set("paddingBottom", py);
  set("paddingLeft", px);
  set("width", w);
  set("height", h);
  set("color", color);
  set("backgroundColor", backgroundColor );
  return s;
}
