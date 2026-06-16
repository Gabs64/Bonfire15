import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function Music({ 
  songs, 
  setSongs, 
  activeSongIndex, 
  setActiveSongIndex, 
  isPlaying, 
  setIsPlaying 
}) {
  const [likeLoading, setLikeLoading] = useState({});

  const handlePlaySong = (index) => {
    if (activeSongIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveSongIndex(index);
      setIsPlaying(true);
    }
  };

  const handleLikeSong = async (id, e) => {
    e.stopPropagation(); // prevent playing when clicking like
    if (likeLoading[id]) return;

    setLikeLoading(prev => ({ ...prev, [id]: true }));

    try {
      const response = await fetch(`${API_URL}/api/songs/${id}/like`, {
        method: 'POST',
      });
      if (response.ok) {
        const updatedSong = await response.json();
        // Update song list local state
        setSongs(prevSongs => prevSongs.map(song => song.id === id ? updatedSong : song));
      }
    } catch (err) {
      console.error("Error liking song: ", err);
    } finally {
      setLikeLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  if (songs.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontFamily: 'var(--font-display)',
            marginBottom: '10px',
            background: 'linear-gradient(to right, var(--color-pink), var(--color-orange))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Camp Session Tapes
          </h1>
          <p style={{ color: 'var(--color-ash)', maxWidth: '500px', margin: '0 auto' }}>
            Explore the music we created at Cabin 15. Check back soon for our first release.
          </p>
        </div>
        
        <div className="glass-panel" style={{ 
          padding: '60px 40px', 
          textAlign: 'center', 
          maxWidth: '600px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <span style={{ fontSize: '3rem' }}>🔒</span>
          <h2 style={{ color: 'var(--color-pink)', fontSize: '1.5rem' }}>Tapes Coming Soon</h2>
          <p style={{ color: 'var(--color-ash)', lineHeight: '1.6', fontSize: '0.95rem' }}>
            The members of Cabin 15 are currently in the studio recording and editing new tracks. 
            Check back soon for our first official campfire session release!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontFamily: 'var(--font-display)',
          marginBottom: '10px',
          background: 'linear-gradient(to right, var(--color-pink), var(--color-orange))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Camp Session Tapes
        </h1>
        <p style={{ color: 'var(--color-ash)', maxWidth: '500px', margin: '0 auto' }}>
          Explore the music we created at Cabin 15. Click play to listen and read the backstory behind each tape's recording session.
        </p>
      </div>

      {/* Songs Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        width: '100%',
      }}>
        {songs.map((song, index) => {
          const isActive = activeSongIndex === index;
          const isCurrentPlaying = isActive && isPlaying;

          return (
            <div 
              key={song.id} 
              className="glass-panel"
              onClick={() => handlePlaySong(index)}
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
                cursor: 'pointer',
                border: isActive ? '1px solid var(--color-pink)' : '1px solid var(--color-border)',
                background: isActive ? 'rgba(255, 0, 127, 0.03)' : 'var(--bg-card)',
                boxShadow: isActive ? '0 8px 32px 0 rgba(255, 0, 127, 0.08)' : 'none',
              }}
            >
              {/* Top part: Title and Duration */}
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '6px',
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    color: isActive ? 'var(--color-pink)' : 'var(--color-cream)',
                    fontWeight: '600',
                  }}>
                    {song.title}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-ash)' }}>
                    {song.duration}
                  </span>
                </div>
                <p style={{ 
                  fontSize: '0.8rem', 
                  color: 'var(--color-yellow)', 
                  fontWeight: '500',
                  marginBottom: '12px'
                }}>
                  {song.artist}
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-ash)',
                  lineHeight: '1.5',
                  height: '110px',
                  overflowY: 'auto',
                  paddingRight: '4px',
                }}>
                  {song.description}
                </p>
              </div>

              {/* Bottom part: Controls & Likes */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '10px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                paddingTop: '16px',
              }}>
                {/* Play Button Indicator */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: isActive ? 'var(--color-pink)' : 'var(--color-cream)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? 'var(--color-pink)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'var(--transition-smooth)',
                  }}>
                    {isCurrentPlaying ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '1px' }}>
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </div>
                  <span>{isActive ? (isCurrentPlaying ? 'Playing Session' : 'Paused') : 'Listen Tape'}</span>
                </div>

                {/* Like Button */}
                <button
                  onClick={(e) => handleLikeSong(song.id, e)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    color: song.likesCount > 0 ? 'var(--color-pink)' : 'var(--color-ash)',
                    fontSize: '0.85rem',
                    transition: 'var(--transition-smooth)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-pink-glow)';
                    e.currentTarget.style.color = 'var(--color-pink)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    if (song.likesCount === 0) e.currentTarget.style.color = 'var(--color-ash)';
                  }}
                >
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill={song.likesCount > 0 ? 'var(--color-pink)' : 'none'} 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                  <span>{song.likesCount}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
