import React from 'react';
import logo from '../assets/logo.png';

export default function Navbar({ activePage, setActivePage }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'music', label: 'Music & Stories' },
    { id: 'guestbook', label: 'Fan Guestbook' },
    { id: 'band', label: 'The Members' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '1200px',
      height: '70px',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px',
      borderRadius: '20px',
      background: 'rgba(18, 13, 12, 0.75)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 94, 0, 0.15)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
    }}>
      {/* Brand logo & title */}
      <div 
        onClick={() => setActivePage('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
        }}
      >
        <img 
          src={logo} 
          alt="Bonfire 15 Logo" 
          style={{
            height: '40px',
            width: '40px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 8px var(--color-pink-glow))',
          }} 
        />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.3rem',
          fontWeight: '700',
          background: 'linear-gradient(to right, var(--color-pink), #ff7300)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '1px',
        }}>
          BONFIRE 15
        </span>
      </div>

      {/* Nav Links */}
      <div style={{
        display: 'flex',
        gap: '24px',
      }}>
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                fontSize: '0.95rem',
                fontWeight: isActive ? '600' : '400',
                color: isActive ? 'var(--color-cream)' : 'var(--color-ash)',
                position: 'relative',
                padding: '8px 4px',
                transition: 'var(--transition-smooth)',
                letterSpacing: '0.5px',
              }}
            >
              {item.label}
              {/* Glowing active indicator dot or line */}
              {isActive && (
                <span style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'var(--color-pink)',
                  borderRadius: '2px',
                  boxShadow: '0 0 10px var(--color-pink), 0 0 2px var(--color-pink)',
                }} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
