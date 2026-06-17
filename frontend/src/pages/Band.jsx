import React, { useState, useEffect, useRef } from 'react';
import jedImg from '../assets/members/jed.jpg';
import mejiImg from '../assets/members/meji.jpg';
import jdImg from '../assets/members/jd.png';
import cattoImg from '../assets/members/catto.jpg';
import shonImg from '../assets/members/shon.jpg';

export default function Band() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const [isClosing, setIsClosing] = useState(false);
  const nameRef = useRef(null);

  // Auto-shrink name font size to fit the column without wrapping
  useEffect(() => {
    if (!nameRef.current || !selectedMember) return;
    const el = nameRef.current;
    let size = 72; // start at 4.5rem (72px)
    el.style.fontSize = `${size}px`;
    while (el.scrollWidth > el.offsetWidth && size > 20) {
      size -= 2;
      el.style.fontSize = `${size}px`;
    }
  }, [selectedMember]);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedMember(null);
      setIsClosing(false);
    }, 280);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const members = [
    {
      name: 'Jed',
      role: 'Vocalist',
      bio: '',
      instrument: '',
      quote: 'Quote',
      emoji: '🎤',
      image: jedImg
    },
    {
      name: 'Meji',
      role: 'Vocalist',
      bio: "Hey y'all! MEJI here, 23 years old, fun-sized, and powered almost entirely by music. If there's a song playing, chances are I'm already singing along (whether people like it or not). I'm passionate about growing as an artist, chasing big dreams, and seeing where this crazy journey leads me. One thing I know for sure: talent isn't built overnight. It takes heart, hard work, and a whole lot of showing up and I'm here for all of it.",
      instrument: '',
      quote: 'Quote',
      emoji: '🎤',
      image: mejiImg
    },
    {
      name: 'JD',
      role: 'Vocalist, Instrumentalist',
      bio: '',
      instrument: '',
      quote: 'Quote',
      emoji: '🎸',
      image: jdImg
    },
    {
      name: 'Mox',
      role: 'Vocalist, Rapper',
      bio: "Hello! I'm Mochs.\n\nI like to be playful with my vocals, and I have a heart for soul music and corridos tumbados. Outside of music, I love sports - specifically boxing and MMA.",
      instrument: '',
      quote: 'Quote',
      emoji: '🎤',
      image: null
    },
    {
      name: 'Shon',
      role: 'Vocalist',
      bio: "I am Shon, a man with a deep voice but can reach high ass notes, I specialize on opm songs and I love playing the guitar",
      instrument: '',
      quote: 'Quote',
      emoji: '🎤',
      image: shonImg
    },
    {
      name: 'Catto',
      role: 'Rapper',
      bio: '',
      instrument: '',
      quote: 'Quote',
      emoji: '🎤',
      image: cattoImg
    },
    {
      name: 'Gab',
      role: 'Manager',
      bio: '',
      instrument: '',
      quote: 'Quote',
      emoji: '💼',
      image: null
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontFamily: 'var(--font-display)',
          marginBottom: '10px',
          background: 'linear-gradient(to right, var(--color-orange), var(--color-pink))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Meet The Members
        </h1>
        <p style={{ color: 'var(--color-ash)', maxWidth: '500px', margin: '0 auto' }}>
          The creative voices and producers of Cabin 15 who bring the campfire sessions to life. Click any member to read their log details.
        </p>
      </div>

      {/* Members Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        width: '100%',
      }}>
        {members.map((member) => (
          <div
            key={member.name}
            className="glass-panel"
            onClick={() => setSelectedMember(member)}
            style={{
              height: '240px',
              borderRadius: '20px',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--color-border)',
              transition: 'var(--transition-smooth)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'var(--color-pink)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 0, 127, 0.25), var(--shadow-neon-pink)';
              const img = e.currentTarget.querySelector('.member-bg-img');
              if (img) img.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.boxShadow = 'none';
              const img = e.currentTarget.querySelector('.member-bg-img');
              if (img) img.style.transform = 'scale(1.0)';
            }}
          >
            {/* Background Image with Tint Overlay */}
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="member-bg-img"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            ) : (
              // fallback gradient matching the theme
              <div
                className="member-bg-img"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #24120f 0%, #0c0908 100%)',
                  zIndex: 0,
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            )}

            {/* Dark gradient overlay for text readability */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(9, 6, 5, 0.1) 0%, rgba(9, 6, 5, 0.9) 90%)',
              zIndex: 1,
            }} />

            {/* Foreground Content */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}>
              {!member.image && (
                <div style={{
                  fontSize: '2.5rem',
                  filter: 'drop-shadow(0 0 8px var(--color-pink-glow))',
                  marginBottom: '4px',
                }}>
                  {member.emoji}
                </div>
              )}

              <h3 style={{
                fontSize: '1.65rem',
                fontWeight: '800',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.5px',
                color: 'var(--color-cream)',
                textShadow: '0 2px 10px rgba(0,0,0,0.85)',
              }}>
                {member.name}
              </h3>

              <span style={{
                fontSize: '0.7rem',
                color: 'var(--color-pink)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '700',
                opacity: '0.95',
                textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                background: 'rgba(9, 6, 5, 0.75)',
                padding: '4px 10px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 94, 0, 0.15)',
              }}>
                View profile
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Glassmorphic Details Modal Overlay */}
      {selectedMember && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(9, 6, 5, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: isClosing ? 'fadeOut 0.28s ease-in forwards' : 'fadeIn 0.25s ease-out',
          padding: '20px',
        }}
          onClick={closeModal}
        >
          {isMobile ? (
            /* ── MOBILE BOTTOM SHEET ── */
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxHeight: '92dvh',
                overflowY: 'auto',
                background: 'rgba(18, 13, 11, 0.99)',
                border: '1px solid var(--color-pink)',
                boxShadow: '0 -4px 40px rgba(255, 0, 127, 0.3)',
                borderRadius: '20px 20px 0 0',
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                animation: isClosing ? 'slideDownSheet 0.28s cubic-bezier(0.4, 0, 1, 1) forwards' : 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                paddingBottom: '40px',
              }}
            >
              {/* Drag handle */}
              <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 8px' }}>
                <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.2)' }} />
              </div>

              {/* Close button row */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 20px 4px' }}>
                <button
                  onClick={closeModal}
                  style={{
                    width: '36px', height: '36px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    color: 'var(--color-cream)',
                    cursor: 'pointer',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Photo */}
              <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 24px 20px', animation: isClosing ? 'none' : 'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.15s both' }}>
                <div style={{
                  width: '110px', height: '110px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid var(--color-pink)',
                  boxShadow: '0 0 20px var(--color-pink-glow)',
                }}>
                  {selectedMember.image ? (
                    <img src={selectedMember.image} alt={selectedMember.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#ff007f,#ff5e00)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem' }}>
                      {selectedMember.emoji}
                    </div>
                  )}
                </div>
              </div>

              {/* Name + Roles */}
              <div style={{ padding: '0 24px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', animation: isClosing ? 'none' : 'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.25s both' }}>
                <div style={{ background: 'rgba(94,173,209,0.28)', border: '1px solid rgba(94,173,209,0.5)', borderRadius: '10px', padding: '10px 24px', width: '100%', boxSizing: 'border-box', textAlign: 'center' }}>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--color-cream)', margin: 0 }}>
                    {selectedMember.name}
                  </h2>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {selectedMember.role.split(',').map((r) => (
                    <span key={r.trim()} style={{ background: 'rgba(94,173,209,0.18)', border: '1px solid rgba(94,173,209,0.4)', color: 'var(--color-cream)', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', padding: '5px 12px', borderRadius: '8px' }}>
                      {r.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div style={{ padding: '0 20px 14px', animation: isClosing ? 'none' : 'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.35s both' }}>
                <div style={{ background: 'rgba(139,79,46,0.22)', border: '1px solid rgba(139,79,46,0.38)', borderRadius: '14px', padding: '16px' }}>
                  {selectedMember.bio ? (
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--color-cream)', whiteSpace: 'pre-wrap', margin: 0 }}>{selectedMember.bio}</p>
                  ) : (
                    <p style={{ fontSize: '0.87rem', fontStyle: 'italic', color: 'var(--color-ash)', margin: 0 }}>No description added yet. Stay tuned for further campfire logs from this member!</p>
                  )}
                </div>
              </div>

              {/* Quote */}
              <div style={{ padding: '0 20px', animation: isClosing ? 'none' : 'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.45s both' }}>
                <div style={{ background: 'rgba(139,79,46,0.14)', border: '1px solid rgba(139,79,46,0.3)', borderRadius: '14px', padding: '14px 16px 14px 28px', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '2px', left: '8px', fontSize: '2.6rem', fontFamily: 'serif', color: 'var(--color-orange)', lineHeight: '1', opacity: '0.35', pointerEvents: 'none' }}>"</span>
                  <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--color-yellow)', lineHeight: '1.5', margin: 0 }}>{selectedMember.quote}</p>
                </div>
              </div>
            </div>
          ) : (
            /* ── DESKTOP LAYOUT ── */
            <div
              className="glass-panel"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '820px',
                padding: '36px 52px 52px',
                background: 'rgba(24, 18, 16, 0.97)',
                border: '1px solid var(--color-pink)',
                boxShadow: '0 8px 32px 0 rgba(255, 0, 127, 0.25), var(--shadow-neon-pink)',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                animation: isClosing ? 'slideDown 0.28s cubic-bezier(0.4, 0, 1, 1) forwards' : 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Subtle emoji watermark */}
              <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', fontSize: '10rem', opacity: '0.03', userSelect: 'none', pointerEvents: 'none' }}>
                {selectedMember.emoji}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                style={{
                  position: 'absolute', top: '20px', right: '20px',
                  width: '36px', height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: 'var(--color-cream)',
                  transition: 'var(--transition-smooth)',
                  zIndex: 10, cursor: 'pointer',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-pink)'; e.currentTarget.style.color = 'var(--color-pink)'; e.currentTarget.style.backgroundColor = 'rgba(255,0,127,0.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--color-cream)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Main two-column layout */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', position: 'relative', zIndex: 1, paddingTop: '48px' }}>

                {/* LEFT COLUMN: Description + Quote */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Description Box */}
                  <div style={{ background: 'rgba(139,79,46,0.25)', border: '1px solid rgba(139,79,46,0.4)', borderRadius: '14px', padding: '20px', flex: 1, minHeight: '240px', animation: isClosing ? 'none' : 'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.2s both' }}>
                    {selectedMember.bio ? (
                      <p style={{ fontSize: '0.92rem', lineHeight: '1.7', color: 'var(--color-cream)', whiteSpace: 'pre-wrap', margin: 0, textAlign: 'justify' }}>{selectedMember.bio}</p>
                    ) : (
                      <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--color-ash)', margin: 0, textAlign: 'justify' }}>No description added yet. Stay tuned for further campfire logs from this member!</p>
                    )}
                  </div>
                  {/* Quote Box */}
                  <div style={{ background: 'rgba(139,79,46,0.18)', border: '1px solid rgba(139,79,46,0.35)', borderRadius: '14px', padding: '18px 20px', position: 'relative', minHeight: '70px', animation: isClosing ? 'none' : 'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.3s both' }}>
                    <span style={{ position: 'absolute', top: '6px', left: '10px', fontSize: '3rem', fontFamily: 'serif', color: 'var(--color-orange)', lineHeight: '1', pointerEvents: 'none', opacity: '0.35' }}>"</span>
                    <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--color-yellow)', paddingLeft: '20px', lineHeight: '1.5', margin: 0 }}>{selectedMember.quote}</p>
                  </div>
                </div>

                {/* RIGHT COLUMN: Name + Role Pills + Photo */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', width: '170px', flexShrink: 0 }}>
                  {/* Member Name */}
                  <h2
                    ref={nameRef}
                    style={{ fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--color-cream)', margin: 0, lineHeight: '1.0', textAlign: 'left', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', animation: isClosing ? 'none' : 'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.15s both' }}
                  >
                    {selectedMember.name}
                  </h2>
                  {/* Role Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', width: '100%', animation: isClosing ? 'none' : 'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.25s both' }}>
                    {selectedMember.role.split(',').map((r) => (
                      <span key={r.trim()} style={{ background: 'rgba(94,173,209,0.25)', border: '1px solid rgba(94,173,209,0.45)', color: 'var(--color-cream)', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 10px', borderRadius: '8px' }}>
                        {r.trim()}
                      </span>
                    ))}
                  </div>
                  {/* Photo */}
                  <div style={{ width: '140px', height: '140px', borderRadius: '14px', overflow: 'hidden', border: '2px solid var(--color-pink)', boxShadow: '0 0 18px var(--color-pink-glow)', flexShrink: 0, marginTop: 'auto', animation: isClosing ? 'none' : 'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.35s both' }}>
                    {selectedMember.image ? (
                      <img src={selectedMember.image} alt={selectedMember.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#ff007f,#ff5e00)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>
                        {selectedMember.emoji}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

