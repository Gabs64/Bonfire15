import React, { useState } from 'react';
import jedImg from '../assets/members/jed.jpg';
import mejiImg from '../assets/members/meji.jpg';
import jdImg from '../assets/members/jd.png';
import cattoImg from '../assets/members/catto.jpg';
import shonImg from '../assets/members/shon.jpg';

export default function Band() {
  const [selectedMember, setSelectedMember] = useState(null);

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
      name: 'Mochs',
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
          animation: 'fadeIn 0.25s ease-out',
          padding: '20px',
        }}
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="glass-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '620px',
              padding: '40px',
              background: 'rgba(24, 18, 16, 0.95)',
              border: '1px solid var(--color-pink)',
              boxShadow: '0 8px 32px 0 rgba(255, 0, 127, 0.25), var(--shadow-neon-pink)',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Overlay Large Logo/Emoji behind modal */}
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              right: '-30px',
              fontSize: '10rem',
              opacity: '0.03',
              userSelect: 'none',
              pointerEvents: 'none',
            }}>
              {selectedMember.emoji}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--color-cream)',
                transition: 'var(--transition-smooth)',
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-pink)';
                e.currentTarget.style.color = 'var(--color-pink)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 0, 127, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = 'var(--color-cream)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Split panel details */}
            <div style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'center',
              flexWrap: 'wrap',
              position: 'relative',
              zIndex: 1,
            }}>
              {/* Left Side: Photo */}
              {selectedMember.image ? (
                <div style={{
                  width: '180px',
                  height: '180px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid var(--color-pink)',
                  boxShadow: '0 0 15px var(--color-pink-glow)',
                  flexShrink: 0,
                  margin: '0 auto',
                }}>
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div style={{
                  width: '180px',
                  height: '180px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #ff007f 0%, #ff5e00 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4.5rem',
                  border: '2px solid var(--color-pink)',
                  boxShadow: '0 0 15px var(--color-pink-glow)',
                  flexShrink: 0,
                  margin: '0 auto',
                }}>
                  {selectedMember.emoji}
                </div>
              )}

              {/* Right Side: Text Details */}
              <div style={{ flex: 1, minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h2 style={{
                    fontSize: '2.2rem',
                    fontWeight: '800',
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-cream)',
                    lineHeight: '1.1',
                    marginBottom: '6px',
                  }}>
                    {selectedMember.name}
                  </h2>
                  <span style={{
                    color: 'var(--color-pink)',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    fontSize: '0.85rem',
                    textShadow: '0 0 8px var(--color-pink-glow)',
                    background: 'rgba(255, 0, 127, 0.08)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 0, 127, 0.2)',
                  }}>
                    {selectedMember.role}
                  </span>
                </div>

                {/* Description (Bio) */}
                {selectedMember.bio ? (
                  <p style={{
                    fontSize: '0.96rem',
                    lineHeight: '1.65',
                    color: 'var(--color-cream)',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {selectedMember.bio}
                  </p>
                ) : (
                  <p style={{
                    fontSize: '0.9rem',
                    fontStyle: 'italic',
                    color: 'var(--color-ash)',
                  }}>
                    No description added yet. Stay tuned for further campfire logs from this member!
                  </p>
                )}
              </div>
            </div>

            {/* Quote Panel */}
            <div style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '20px',
              position: 'relative',
              marginTop: '10px',
              zIndex: 1,
            }}>
              {/* Quote Mark */}
              <span style={{
                position: 'absolute',
                top: '10px',
                left: '-5px',
                fontSize: '3.5rem',
                fontFamily: 'serif',
                color: 'var(--color-orange-glow)',
                lineHeight: '1',
                pointerEvents: 'none',
                opacity: '0.3',
              }}>“</span>

              <p style={{
                fontStyle: 'italic',
                fontSize: '1rem',
                color: 'var(--color-yellow)',
                paddingLeft: '22px',
                lineHeight: '1.5',
              }}>
                {selectedMember.quote}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
