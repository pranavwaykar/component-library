import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './Image.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const Image = ({
  src,
  alt,
  fallback,
  errorFallback,
  threshold = 0.1,
  rootMargin = '200px',
  as,
  className,
  style,
  hidden,
  ...rest
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const makeRootMargin = (rm) => {
      if (typeof rm === 'number') return `${rm}px`;
      const s = String(rm).trim();
      if (/^-?\d+(\.\d+)?(px|%)$/.test(s)) return s;
      if (/^-?\d+(\.\d+)?$/.test(s)) return `${s}px`;
      return '200px';
    };
    const opts = { root: null, rootMargin: makeRootMargin(rootMargin), threshold };
    let observer;
    try {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      }, opts);
      observer.observe(node);
    } catch (_) {
      setIsVisible(true);
    }
    return () => observer && observer.disconnect();
  }, [rootMargin, threshold]);

  useEffect(() => {
    if (!isVisible) return;
    setHasError(false);
  }, [isVisible, src]);

  useEffect(() => {
    if (!src || typeof src !== 'string' || !src.trim()) {
      setIsVisible(true);
      setHasError(true);
    }
  }, [src]);
  const classNames = [
    'sb-image',
    rest.disabled ? 'is-disabled' : null,
    rest.loading ? 'is-loading' : null,
    loaded ? 'is-loaded' : null,
    hasError ? 'is-error' : null,
    className,
  ].filter(Boolean).join(' ');

  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';

  const Container = as || 'div';
  return (
    <Container ref={containerRef} className={classNames} style={mergedStyle} {...rest}>
      {rest.loading ? <div className="sb-image__spinner" aria-hidden /> : null}
      {!isVisible && fallback ? (
        <div className="sb-image__fallback" aria-hidden="true">{fallback}</div>
      ) : null}

      {isVisible && !hasError && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {isVisible && hasError && (
        errorFallback ? (
          <div className="sb-image__error" role="img" aria-label="image failed">{errorFallback}</div>
        ) : (
          <div className="sb-image__error" role="img" aria-label="image failed">⚠️</div>
        )
      )}
    </Container>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  fallback: PropTypes.node,
  errorFallback: PropTypes.node,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
};

export default Image;


