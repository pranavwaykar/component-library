import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import "../../index.scss";
import "./Badge.scss";
import { expandStyleProps } from "../../utils/styleSystem";

export const Badge = forwardRef(
  (
    {
      as,
      label,
      children,
      variant,
      size,
      tone,
      elevation,
      dot = false,
      pill = true,
      className,
      color,
      disabled = false,
      loading = false,
      indicator,
      icon,
      onClick,
      onKeyDown,
      style,
      tabIndex,
      title,
      draggable,
      contentEditable,
      dir,
      lang,
      role,
      hidden,
      ...rest
    },
    ref
  ) => {
    const Component = as || "span";
    const allowedColors = ["neutral","primary","success","warning","error","info"];

    const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
    if (draggable && mergedStyle.cursor === undefined && !disabled && !loading) mergedStyle.cursor = 'grab';
    if (!allowedColors.includes(color) && typeof color === 'string' && color.trim() !== '') {
      mergedStyle.color = color;
    }
    if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
    if (disabled || loading) {
      if (mergedStyle.pointerEvents === undefined) mergedStyle.pointerEvents = 'none';
      if (mergedStyle.cursor === undefined) mergedStyle.cursor = 'not-allowed';
    }
    // Ensure we can place an overlay for disabled state
    if ((disabled || loading) && mergedStyle.position === undefined) mergedStyle.position = 'relative';

    const showIndicator = (indicator ?? dot) === true;
    const isInteractive = typeof onClick === 'function' && !disabled;
    const computedRole = role || (isInteractive ? 'button' : undefined);
    const computedTabIndex = tabIndex ?? (isInteractive ? 0 : undefined);
    const isNativeButton = (Component === 'button');
    const isLoading = !!loading;
    const handleKeyDown = (e) => {
      if (typeof onKeyDown === 'function') onKeyDown(e);
      if (e.defaultPrevented) return;
      if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.(e);
      }
    };

    const spinnerEl = (
      <span
        aria-hidden
        style={{
          display: 'inline-block',
          width: 14,
          height: 14,
          marginRight: 6,
          borderRadius: '50%',
          border: '2px solid rgba(0,0,0,.2)',
          borderTopColor: 'rgba(0,0,0,.6)',
          animation: 'sbspin 700ms linear infinite',
        }}
      />
    );
    return (
      <Component
        ref={ref}
        className={`sb-badge ${className}`}
        style={mergedStyle}
        role={computedRole}
        tabIndex={computedTabIndex}
        aria-disabled={disabled || undefined}
        aria-busy={isLoading || undefined}
        disabled={isNativeButton && disabled ? true : undefined}
        title={title}
        draggable={draggable}
        contentEditable={contentEditable}
        dir={dir}
        lang={lang}
        hidden={hidden}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {isLoading ? (
          spinnerEl
        ) : icon ? (
          <span className="sb-badge__icon" aria-hidden>{icon}</span>
        ) : (
          showIndicator ? <span className="sb-badge__dot" /> : null
        )}
        {children ?? label}
        {disabled ? (
          <span
            aria-hidden
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
  }
);

Badge.propTypes = {
  as: PropTypes.elementType,
  label: PropTypes.string,
  children: PropTypes.node,
  // color: PropTypes.oneOf(["neutral","primary","success","warning","error","info"]),
  color: PropTypes.oneOfType([
    PropTypes.oneOf(["neutral","primary","success","warning","error","info"]),
    PropTypes.string
  ]),
  dot: PropTypes.bool,
  pill: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  indicator: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  tabIndex: PropTypes.number,
  title: PropTypes.string,
  draggable: PropTypes.bool,
  hidden: PropTypes.bool,
};

export default Badge;


