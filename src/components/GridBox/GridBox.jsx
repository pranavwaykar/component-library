import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const GridBox = forwardRef(({
  columns = 'repeat(3, minmax(0, 1fr))',
  rows,
  gap = 12,
  className,
  style,
  hidden,
  disabled = false,
  loading = false,
  children,
  items,
  as,
  ...rest
}, ref) => {
  const merged = {
    display: 'grid',
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
    gap,
    ...expandStyleProps(rest),
    ...style,
  };
  if (hidden === true && merged.display === undefined) merged.display = 'none';
  const Component = as || 'div';
  const cls = `${className || ''} ${disabled ? 'is-disabled' : ''} ${loading ? 'is-loading' : ''}`.trim();
  const content = typeof children !== 'undefined'
    ? children
    : Array.isArray(items)
      ? items
          .filter((it) => it !== undefined && it !== null && it !== false)
          .map((it, i) => React.isValidElement(it) || typeof it === 'string' || typeof it === 'number' ? it : String(it))
      : undefined;
  return <Component ref={ref} className={cls} style={merged} {...rest}>{content}</Component>;
});

GridBox.propTypes = {
  columns: PropTypes.string,
  rows: PropTypes.string,
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  style: PropTypes.object,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.node,
  items: PropTypes.arrayOf(PropTypes.node),
  as: PropTypes.elementType,
};


