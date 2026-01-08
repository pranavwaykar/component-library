import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './skeleton.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const Skeleton = forwardRef(({ circle = false, loading = false, disabled = false, skeletonStartColor, skeletonMidColor, skeletonEndColor, skeletonRadius, as, style, hidden, onClick, ...rest }, ref) => {
  const Component = as || 'span';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  const gradient = (skeletonStartColor || skeletonMidColor || skeletonEndColor)
    ? { background: `linear-gradient(90deg, ${skeletonStartColor || '#f3f4f6'} 25%, ${skeletonMidColor || '#e5e7eb'} 37%, ${skeletonEndColor || '#f3f4f6'} 63%)`, backgroundSize: '400% 100%' }
    : undefined;
  return (
    <Component ref={ref} onClick={onClick} className={`sb-skel ${circle ? 'sb-skel--circle' : ''} ${loading ? 'is-loading' : ''} ${disabled ? 'is-disabled' : ''}`.trim()} style={{ ...mergedStyle, ...(gradient || {}), ...(skeletonRadius ? { borderRadius: skeletonRadius } : {}) }} {...rest} />
  );
});

Skeleton.propTypes = {
  circle: PropTypes.bool,
  as: PropTypes.elementType,
  // Accept both number and string so SB controls don't flag invalid
  w: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  h: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  skeletonStartColor: PropTypes.string,
  skeletonMidColor: PropTypes.string,
  skeletonEndColor: PropTypes.string,
  skeletonRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};


