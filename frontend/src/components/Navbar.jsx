import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

export default function Navbar({ activePage, setActivePage }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'music', label: 'Music & Stories' },
    { id: 'guestbook', label: 'Fan Guestbook' },
    { id: 'band', label: 'The Members' }
  ];

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (id) => {
    setActivePage(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '94%',
        maxWidth: '1200px',
        height: isMobile ? '58px' : '70px',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0 16px' : '0 30px',
        borderRadius: '16px',
        background: 'rgba(18, 13, 12, 0.88)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 94, 0, 0.15)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      }}>
        {/* Brand logo & title */}
        <div
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <img
            src={logo}
            alt="Bonfire 15 Logo"
            style={{
              height: isMobile ? '32px' : '40px',
              width: isMobile ? '32px' : '40px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 8px var(--color-pink-glow))',
            }}
          />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? '1.05rem' : '1.3rem',
            fontWeight: '700',
            background: 'linear-gradient(to right, var(--color-pink), #ff7300)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1px',
          }}>
            BONFIRE 15
          </span>
        </div>

        {/* Desktop Nav Links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '24px' }}>
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
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
                  {isActive && (
                    <span style={{
                      position: 'absolute', bottom: '0', left: '0',
                      width: '100%', height: '2px',
                      backgroundColor: 'var(--color-pink)',
                      borderRadius: '2px',
                      boxShadow: '0 0 10px var(--color-pink), 0 0 2px var(--color-pink)',
                    }} />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center',
              gap: '5px', padding: '8px',
              background: 'none', border: 'none',
              cursor: 'pointer',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: 'block',
                width: '22px', height: '2px',
                background: menuOpen
                  ? (i === 1 ? 'transparent' : 'var(--color-pink)')
                  : 'var(--color-cream)',
                borderRadius: '2px',
                transition: 'all 0.25s ease',
                transform: menuOpen
                  ? (i === 0 ? 'translateY(7px) rotate(45deg)' : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none')
                  : 'none',
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '3%',
          right: '3%',
          zIndex: 199,
          background: 'rgba(18, 13, 12, 0.97)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 94, 0, 0.15)',
          borderRadius: '16px',
          padding: '8px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)',
          animation: 'slideUp 0.2s ease-out',
        }}>
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 18px',
                  fontSize: '1rem',
                  fontWeight: isActive ? '700' : '400',
                  color: isActive ? 'var(--color-cream)' : 'var(--color-ash)',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(255, 0, 127, 0.08)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--color-pink)' : '3px solid transparent',
                  transition: 'var(--transition-smooth)',
                  letterSpacing: '0.3px',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
