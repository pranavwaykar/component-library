import React from "react";
import PropTypes from "prop-types";
import "../../index.scss";
import "./Button.scss";
import { expandStyleProps } from "../../utils/styleSystem";

export const Button = ({
  primary = false,
  // removed props (ignored): variant, size, tone, elevation, shadow
  variant,
  backgroundColor = null,
  textColor = null,
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  uppercase = false,
  leftIcon = "",
  rightIcon = "",
  type = "button",
  indicator = false,
  count,
  label,
  className,
  as,
  style,

  tabIndex,
  title,
  draggable,
  hidden,
  dir,
  lang,
  tone,
  elevation,
  ...props
}) => {
  // variant/size/tone/elevation/shadow are ignored

  const inlineStyle = { ...expandStyleProps(props), ...(style || {}) };
  if (backgroundColor) inlineStyle.backgroundColor = backgroundColor;
  if (textColor) inlineStyle.color = textColor;
  if (draggable && inlineStyle.cursor === undefined && !disabled && !loading) inlineStyle.cursor = 'grab';
  if (hidden === true && inlineStyle.display === undefined) inlineStyle.display = 'none';
  if (disabled || loading) {
    if (inlineStyle.pointerEvents === undefined) inlineStyle.pointerEvents = 'none';
    if (inlineStyle.cursor === undefined) inlineStyle.cursor = 'not-allowed';
  }
  if ((disabled || loading) && inlineStyle.position === undefined) inlineStyle.position = 'relative';

  const Component = as || "button";
  const isNativeButton = Component === 'button';
  const isDisabled = disabled || loading;
  return (
    <Component
      type={type}
      className={`storybook-button ${className}`}
      style={inlineStyle}
      disabled={isNativeButton ? isDisabled : undefined}
      aria-disabled={!isNativeButton && isDisabled ? "true" : undefined}
      aria-busy={loading ? "true" : undefined}
      tabIndex={tabIndex}
      title={title}
      draggable={draggable}
      hidden={hidden}
      dir={dir}
      lang={lang}
      {...props}
      onClick={isDisabled ? undefined : props.onClick}
    >
      {loading ? (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: 16,
            height: 16,
            marginRight: 8,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,.35)',
            borderTopColor: 'rgba(255,255,255,.95)',
            animation: 'sbspin 700ms linear infinite',
            verticalAlign: 'middle',
          }}
        />
      ) : (leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null)}
      {label && <span>{label}</span>}
      {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
      {typeof count === "number" ? <span aria-label={`count ${count}`}>{count}</span> : null}
      {disabled ? (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,.55)',
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ) : null}
    </Component>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  variant: PropTypes.oneOf(["primary","secondary","ghost","link","destructive","success","warning"]),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  size: PropTypes.oneOf(["xsmall","small","medium","large","xlarge"]),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  uppercase: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  type: PropTypes.oneOf(["button","submit","reset"]),
  indicator: PropTypes.bool,
  count: PropTypes.number,
  as: PropTypes.elementType,
  style: PropTypes.object,
};

export default Button;


