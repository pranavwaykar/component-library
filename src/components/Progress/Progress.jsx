import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './Progress.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const ProgressBar = forwardRef(({ value, max = 100, indeterminate = false, label, showLabel = true, labelPlacement = 'bottom', labelColor, labelFontFamily, labelFontSize, labelFontWeight, labelGap, loading = false, disabled = false, barTrackColor, barFillColor, barWidth, barHeight, as, style, hidden, ...rest }, ref) => {
  const pct = Math.max(0, Math.min(100, (Number(value) / Number(max)) * 100));
  const Outer = as || 'div';
  const expanded = expandStyleProps(rest);
  const dimKeys = ['width','height','minWidth','maxWidth','minHeight','maxHeight'];
  const trackDims = {};
  const mergedStyle = { ...expanded, ...(style || {}) };
  dimKeys.forEach((k) => {
    if (mergedStyle[k] !== undefined) {
      trackDims[k] = mergedStyle[k];
      delete mergedStyle[k];
    }
  });
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  const bgStyle = barTrackColor ? { background: barTrackColor } : undefined;
  const trackStyle = { ...(bgStyle || {}), ...trackDims };
  if (barWidth) trackStyle.width = barWidth;
  if (barHeight) trackStyle.height = barHeight;
  const fillStyle = indeterminate
    ? undefined
    : { width: `${pct}%`, ...(barFillColor ? { background: barFillColor } : {}) };
  return (
    <Outer className={`sb-progress sb-progress--bar ${loading ? 'is-loading' : ''} ${disabled ? 'is-disabled' : ''}`.trim()} style={{ ...mergedStyle, gap: labelGap ?? mergedStyle.gap }} {...rest}>
      <div ref={ref} className="sb-progressbar" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={indeterminate ? undefined : Math.round(pct)} aria-label={label} style={trackStyle}>
        <div className={`sb-progressbar__fill ${indeterminate ? 'is-indeterminate' : ''}`} style={indeterminate ? (barFillColor ? { background: barFillColor } : undefined) : fillStyle} />
      </div>
      {showLabel && (
        <div className="sb-progress__label" style={{ color: labelColor, fontFamily: labelFontFamily, fontSize: labelFontSize, fontWeight: labelFontWeight, order: labelPlacement === 'top' ? -1 : 1 }}>
          {label}
        </div>
      )}
    </Outer>
  );
});

ProgressBar.propTypes = { value: PropTypes.number, max: PropTypes.number, indeterminate: PropTypes.bool, label: PropTypes.node, as: PropTypes.elementType };

export const ProgressRing = forwardRef(({ value, max = 100, size = 44, stroke = 4, indeterminate = false, label, showLabel = true, labelPlacement = 'bottom', labelColor, labelFontFamily, labelFontSize, labelFontWeight, labelGap, loading = false, disabled = false, ringBgColor, ringFgColor, as, style, hidden, ...rest }, ref) => {
  const Outer = as || 'div';
  const expanded = expandStyleProps(rest);
  const dimKeys = ['width','height','minWidth','maxWidth','minHeight','maxHeight'];
  const ringDims = {};
  const mergedStyle = { ...expanded, ...(style || {}) };
  // Move dimension props to the ring wrapper/SVG instead of the outer container
  dimKeys.forEach((k) => {
    if (mergedStyle[k] !== undefined) {
      ringDims[k] = mergedStyle[k];
      delete mergedStyle[k];
    }
  });
  // Resolve numeric size override from w/h if provided
  const parseSize = (v) => {
    if (typeof v === 'number') return v;
    if (typeof v === 'string') {
      const m = v.match(/([0-9]*\\.?[0-9]+)/);
      if (m) return Number(m[1]);
    }
    return undefined;
  };
  const widthOverride = parseSize(ringDims.width);
  const heightOverride = parseSize(ringDims.height);
  const computedSize = Number.isFinite(widthOverride) || Number.isFinite(heightOverride)
    ? (Number.isFinite(widthOverride) ? widthOverride : heightOverride)
    : size;
  const radius = (computedSize - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, (Number(value) / Number(max)) * 100));
  const dash = indeterminate ? circumference * 0.25 : (pct / 100) * circumference;
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  return (
    <Outer className={`sb-progress sb-progress--ring ${indeterminate ? 'is-indeterminate' : ''} ${loading ? 'is-loading' : ''} ${disabled ? 'is-disabled' : ''}`.trim()} style={{ ...mergedStyle, gap: labelGap ?? mergedStyle.gap }} {...rest}>
      <div className="sb-progressring__wrap" style={{ borderRadius: '50%', display: 'inline-block', ...ringDims }}>
        <svg ref={ref} className="sb-progressring" width={computedSize} height={computedSize} role="img" aria-label={label} style={ringDims}>
          <circle className="sb-progressring__bg" cx={computedSize/2} cy={computedSize/2} r={radius} strokeWidth={stroke} style={ringBgColor ? { stroke: ringBgColor } : undefined} />
          <circle className="sb-progressring__fg" cx={computedSize/2} cy={computedSize/2} r={radius} strokeWidth={stroke} strokeDasharray={`${dash} ${circumference}`} style={ringFgColor ? { stroke: ringFgColor } : undefined} />
        </svg>
      </div>
      {showLabel && (
        <div className="sb-progress__label" style={{ color: labelColor, fontFamily: labelFontFamily, fontSize: labelFontSize, fontWeight: labelFontWeight, order: labelPlacement === 'top' ? -1 : 1 }}>
          {label}
        </div>
      )}
    </Outer>
  );
});

ProgressRing.propTypes = { value: PropTypes.number, max: PropTypes.number, size: PropTypes.number, stroke: PropTypes.number, indeterminate: PropTypes.bool, label: PropTypes.node, as: PropTypes.elementType };

export default { ProgressBar, ProgressRing };


