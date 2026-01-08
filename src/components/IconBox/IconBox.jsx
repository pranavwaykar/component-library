import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './IconBox.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const IconBox = forwardRef(({
  icon,
  count,
  label,
  indicator = false,
  showIcon = true,
  showCount = true,
  showLabel = true,
  disabled = false,
  loading = false,
  onClick,
  as,
  className,
  style,
  hidden,
  ...rest
}, ref) => {
  const classNames = [
    'sb-iconbox',
    onClick ? 'is-clickable' : null,
    disabled ? 'is-disabled' : null,
    loading ? 'is-loading' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Component = as || 'div';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  let resolvedIcon = icon;
  if (!React.isValidElement(resolvedIcon) && resolvedIcon && typeof resolvedIcon === 'object') {
    const maybeType = resolvedIcon.type;
    const maybeProps = resolvedIcon.props || {};
    if (maybeType && (typeof maybeType === 'string' || typeof maybeType === 'function')) {
      try {
        resolvedIcon = React.createElement(maybeType, maybeProps, maybeProps?.children);
      } catch (_) {
      }
    }
  }
  const hasValidIcon =
    React.isValidElement(resolvedIcon) ||
    (typeof resolvedIcon === 'string' && resolvedIcon.trim() !== '') ||
    typeof resolvedIcon === 'number';
  const shouldRenderIconWrapper = showIcon && (hasValidIcon || indicator);
  const normalizedCount = typeof count === 'string'
    ? (count.trim() === '' ? undefined : Number(count))
    : count;
  const shouldShowCount = showCount && Number.isFinite(normalizedCount);
  return (
    <Component ref={ref} className={classNames} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} onClick={onClick} onKeyDown={(e) => {
      if (!onClick) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }} style={mergedStyle} {...rest}>
      {shouldRenderIconWrapper ? (
        <div className={`sb-iconbox__icon ${hasValidIcon ? 'has-icon' : ''}`} aria-hidden>
          {hasValidIcon ? resolvedIcon : null}
          {indicator ? <span className={ hasValidIcon ? 'sb-iconbox__dot' : 'sb-iconbox__indicator'} /> : null}
        </div>
      ) : null}
      {shouldShowCount ? (
        <div className="sb-iconbox__count">{normalizedCount}</div>
      ) : null}
      {showLabel && label ? <div className="sb-iconbox__label">{label}</div> : null}
    </Component>
  );
});

IconBox.propTypes = {
  icon: PropTypes.node,
  count: PropTypes.number,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  indicator: PropTypes.bool,
  showIcon: PropTypes.bool,
  showCount: PropTypes.bool,
  showLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  as: PropTypes.elementType,
};

export default IconBox;


