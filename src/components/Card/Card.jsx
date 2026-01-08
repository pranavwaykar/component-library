import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';
import { expandStyleProps } from '../../utils/styleSystem';

const Card = ({ as, className, style, title, header, showHeader = true, children, padding = 16, hidden, disabled = false, loading = false, ...rest }) => {
  const Container = as || 'div';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  if (disabled || loading) {
    if (mergedStyle.pointerEvents === undefined) mergedStyle.pointerEvents = 'none';
    if (mergedStyle.cursor === undefined) mergedStyle.cursor = 'not-allowed';
  }
  return (
    <Container className={`card ${className || ''}`} style={{ position: 'relative', ...mergedStyle }} aria-disabled={disabled || undefined} aria-busy={loading || undefined} {...rest}>
      {showHeader && (header || title) ? (
        <div className="card-header">{header || title}</div>
      ) : null}
      <div className="card-body" style={{ padding }}>{children}</div>
      {(loading || disabled) ? (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: loading ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          {loading ? (
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: '2px solid rgba(0,0,0,.2)',
                borderTopColor: 'rgba(0,0,0,.6)',
                animation: 'sbspin 700ms linear infinite',
              }}
            />
          ) : null}
        </div>
      ) : null}
    </Container>
  );
};

export default Card;

Card.propTypes = {
  title: PropTypes.string,
  header: PropTypes.node,
  showHeader: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};


