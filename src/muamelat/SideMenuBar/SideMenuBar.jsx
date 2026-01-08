import React from 'react';
import './SideMenuBar.scss';
import PropTypes from 'prop-types';

const defaultMenus = [ { label: 'Menu 1' }, { label: 'Menu 2' }, { label: 'Menu 3' } ];

const SideMenuBar = ({
  menus = defaultMenus,
  onMenuClick = () => {},
  notificationCount = '99+',
  avatarSrc = '',
  logo = null,
  style = {},
  loading = false,
  disabled = false,
}) => {
  const rootStyle = {
    position: 'relative',
    ...style,
    ...(disabled ? { pointerEvents: 'none', opacity: style?.opacity ?? 0.7 } : {}),
    ...(loading ? { pointerEvents: 'none' } : {}),
  };
  return (
    <aside className="side-menubar" style={rootStyle} aria-busy={loading || undefined} aria-disabled={disabled || undefined}>
      <div className="logo">{logo || <div className="logo-mark" />}</div>
      <div className="menu">
        {menus.map((m, i) => (
          <div key={i} className="menu-item" onClick={() => { if (!disabled && !loading) onMenuClick(m, i); }}>
            <div className="icon" />
            <div className="label">{m.label}</div>
          </div>
        ))}
      </div>
      <div className="bottom">
        <div className="notify">{notificationCount}</div>
        {avatarSrc ? <img className="avatar" src={avatarSrc} alt="profile" /> : <div className="avatar" />}
      </div>
      {loading ? (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '3px solid rgba(255,255,255,.35)',
              borderTopColor: 'rgba(255,255,255,.95)',
              animation: 'sbspin 700ms linear infinite',
            }}
          />
        </div>
      ) : null}
    </aside>
  );
};

export default SideMenuBar;

SideMenuBar.propTypes = {
  menus: PropTypes.array,
  onMenuClick: PropTypes.func,
  notificationCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  avatarSrc: PropTypes.string,
  logo: PropTypes.node,
  style: PropTypes.object,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};


