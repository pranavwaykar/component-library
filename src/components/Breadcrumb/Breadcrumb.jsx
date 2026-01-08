import React from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './Breadcrumb.scss';
import { expandStyleProps } from '../../utils/styleSystem';

const Breadcrumb = ({
  items = [],
  separator = '›',
  customProps,
  variant,
  size,
  elevation,
  disabled = false,
  loading = false,
  color,
  colorScheme,
  as,
  className,
  style,
  hidden,
  role = 'navigation',
  draggable,
  onItemClick,
  ...rest
}) => {
  const Component = as || 'nav';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  // Ensure borderStyle updates the existing border instead of being ignored
  if (mergedStyle.borderStyle && mergedStyle.border === undefined) {
    if (mergedStyle.borderWidth === undefined) mergedStyle.borderWidth = '1px';
    if (mergedStyle.borderColor === undefined) mergedStyle.borderColor = '#e5e7eb';
  }
  if (draggable && mergedStyle.cursor === undefined && !disabled && !loading) mergedStyle.cursor = 'grab';
  if (disabled || loading) {
    if (mergedStyle.pointerEvents === undefined) mergedStyle.pointerEvents = 'none';
    if (mergedStyle.cursor === undefined) mergedStyle.cursor = 'not-allowed';
    if (mergedStyle.opacity === undefined) mergedStyle.opacity = 0.6;
  }
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  return (
    <Component
      className={`breadcrumb ${className}`}
      style={mergedStyle}
      role={role}
      draggable={draggable}
      aria-disabled={disabled || undefined}
      aria-busy={loading || undefined}
      {...rest}
      {...(customProps || {})}
    >
      {loading ? (
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: 16,
            height: 16,
            marginRight: 8,
            borderRadius: '50%',
            border: '2px solid rgba(0,0,0,.2)',
            borderTopColor: 'rgba(0,0,0,.6)',
            animation: 'sbspin 700ms linear infinite',
            verticalAlign: 'middle',
          }}
        />
      ) : null}
      {items.map((rawItem, idx) => {
        // Normalize item to a consistent shape
        const isObjectItem = rawItem && typeof rawItem === 'object' && !React.isValidElement(rawItem);
        const label = isObjectItem ? (rawItem.label ?? rawItem.text ?? rawItem.title ?? null) : rawItem;
        const href = isObjectItem ? rawItem.href : undefined;
        const itemClick = isObjectItem ? rawItem.onClick : undefined;
        const target = isObjectItem ? rawItem.target : undefined;
        const rel = isObjectItem ? rawItem.rel : undefined;
        const key = isObjectItem && (rawItem.key || rawItem.id) ? (rawItem.key || rawItem.id) : idx;
        const isLast = idx === items.length - 1;
        const hasItemClick = (typeof itemClick === 'function' || typeof href === 'string');
        const hasGlobalClick = (typeof onItemClick === 'function');
        // Allow per-item onClick/href even for the last crumb; global click applies to non-last crumbs
        const clickable = (!disabled && !loading) && (hasItemClick || (hasGlobalClick && !isLast));
        const fireClick = (e) => {
          if (typeof itemClick === 'function') itemClick(rawItem, idx, e);
          else if (typeof onItemClick === 'function') onItemClick(rawItem, idx, e);
        };
        const handleClick = (e) => {
          if (!clickable) return;
          if (!href) {
            e.preventDefault();
            fireClick(e);
          }
        };
        const handleKey = (e) => {
          if (!clickable) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fireClick(e);
          }
        };
        const content = label != null ? label : null;
        // If the item is an actual React element, render as-is within a wrapper
        const renderInner = () => {
          if (React.isValidElement(rawItem)) return rawItem;
          return content;
        };
        if (href && clickable) {
          return (
            <a
              key={key}
              className={`crumb ${clickable ? 'is-clickable' : ''}`.trim()}
              href={href}
              target={target}
              rel={rel}
              onClick={handleClick}
              onKeyDown={handleKey}
              style={ color ? { color } : undefined }
            >
              {renderInner()}
              {!isLast && <span className="sep">{separator}</span>}
            </a>
          );
        }
        if (clickable) {
          return (
            <button
              key={key}
              type="button"
              className={`crumb ${clickable ? 'is-clickable' : ''}`.trim()}
              onClick={handleClick}
              onKeyDown={handleKey}
              style={ color ? { color } : undefined }
            >
              {renderInner()}
              {!isLast && <span className="sep">{separator}</span>}
            </button>
          );
        }
        return (
          <span
            key={key}
            className="crumb"
            style={ color ? { color } : undefined }
          >
            {renderInner()}
            {!isLast && <span className="sep">{separator}</span>}
          </span>
        );
      })}
    </Component>
  );
};

export default Breadcrumb;

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      href: PropTypes.string,
      onClick: PropTypes.func,
      target: PropTypes.string,
      rel: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ])),
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onItemClick: PropTypes.func,
  variant: PropTypes.oneOf(['solid','ghost']),
  size: PropTypes.oneOf(['sm','md','lg']),
  elevation: PropTypes.oneOf([0,1,2,3,4,5]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};


