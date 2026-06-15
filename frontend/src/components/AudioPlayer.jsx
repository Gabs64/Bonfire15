import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';

export default function AudioPlayer({ 
  songs, 
  activeSongIndex, 
  setActiveSongIndex, 
  isPlaying, 
  setIsPlaying,
  onAnalyserCreated 
}) {
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const sourceRef = useRef(null);
  const analyserRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showLyrics, setShowLyrics] = useState(false);

  const currentSong = songs[activeSongIndex];

  // Set up Web Audio API on first user interaction (Play)
  const initAudioContext = () => {
    if (!audioCtxRef.current && audioRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;

      try {
        const source = ctx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(ctx.destination);

        audioCtxRef.current = ctx;
        sourceRef.current = source;
        analyserRef.current = analyser;

        // Send analyser node up to App.jsx
        if (onAnalyserCreated) {
          onAnalyserCreated(analyser);
        }
      } catch (err) {
        console.warn("Audio source already connected or context error: ", err);
      }
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Handle Play/Pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      initAudioContext();
      audioRef.current.play().catch(err => {
        console.warn("Autoplay blocked or play interrupted: ", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, activeSongIndex]);

  // Handle source changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Format time (e.g. 0:15)
  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePlayPause = () => {
    initAudioContext();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleNext = () => {
    if (songs.length === 0) return;
    setActiveSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (songs.length === 0) return;
    setActiveSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleAudioEnded = () => {
    handleNext();
  };

  if (!currentSong) return null;

  // Build the complete local file URL based on Spring Boot's API
  // Using relative path so it hits http://localhost:8080 during dev proxying
  const audioSrcUrl = `http://localhost:8080${currentSong.audioUrl}`;

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '1200px',
        height: '85px',
        zIndex: 99,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        borderRadius: '20px',
        background: 'rgba(24, 18, 16, 0.82)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 0, 127, 0.15)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5), var(--shadow-neon-pink)',
      }}>
        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={audioSrcUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />

        {/* Left: Song Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '30%',
          minWidth: '180px',
        }}>
          <div style={{
            position: 'relative',
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            overflow: 'hidden',
            backgroundColor: '#1d1513',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255, 94, 0, 0.3)',
            animation: isPlaying ? 'pulse-pink 2s infinite ease-in-out' : 'none',
          }}>
            <img 
              src={logo} 
              alt="Song Art" 
              style={{
                width: '32px',
                height: '32px',
                objectFit: 'contain',
              }}
            />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            <span style={{
              fontWeight: '600',
              fontSize: '0.95rem',
              color: 'var(--color-cream)',
            }}>{currentSong.title}</span>
            <span style={{
              fontSize: '0.8rem',
              color: 'var(--color-ash)',
            }}>{currentSong.artist}</span>
          </div>
        </div>

        {/* Center: Controls & Slider */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          width: '40%',
        }}>
          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}>
            <button 
              onClick={handlePrev} 
              style={{
                color: 'var(--color-ash)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-orange)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-ash)'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>

            <button 
              onClick={handlePlayPause}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-pink)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px var(--color-pink-glow)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}>
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            <button 
              onClick={handleNext}
              style={{
                color: 'var(--color-ash)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-orange)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-ash)'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>

          {/* Time & Progress bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-ash)' }}>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              style={{
                flex: 1,
                accentColor: 'var(--color-pink)',
                height: '4px',
                borderRadius: '2px',
                background: 'rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
              }}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--color-ash)' }}>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Volume & Lyrics Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '16px',
          width: '30%',
        }}>
          {/* Volume Control */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-ash)" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              {volume > 0 && <path d="M15.54 8.46a5 5 0 010 7.07"/>}
              {volume > 0.5 && <path d="M19.07 4.93a10 10 0 010 14.14"/>}
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{
                width: '70px',
                accentColor: 'var(--color-orange)',
                height: '3px',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Lyrics Toggle Button */}
          <button
            onClick={() => setShowLyrics(!showLyrics)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: `1px solid ${showLyrics ? 'var(--color-pink)' : 'rgba(255, 255, 255, 0.1)'}`,
              fontSize: '0.8rem',
              fontWeight: '600',
              backgroundColor: showLyrics ? 'rgba(255, 0, 127, 0.15)' : 'transparent',
              color: showLyrics ? 'var(--color-pink)' : 'var(--color-cream)',
              transition: 'var(--transition-smooth)',
              boxShadow: showLyrics ? '0 0 10px rgba(255, 0, 127, 0.2)' : 'none',
            }}
          >
            Lyrics
          </button>
        </div>
      </div>

      {/* Slide-Up Lyrics Overlay */}
      {showLyrics && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: 'calc(100vh - 110px)',
          zIndex: 98,
          background: 'rgba(9, 6, 5, 0.95)',
          backdropFilter: 'blur(30px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.3s ease',
          padding: '40px 20px',
        }}>
          {/* Close Header */}
          <div style={{
            position: 'absolute',
            top: '30px',
            width: '100%',
            maxWidth: '800px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
          }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--color-pink)' }}>{currentSong.title}</h2>
              <p style={{ color: 'var(--color-ash)', fontSize: '0.9rem' }}>{currentSong.artist}</p>
            </div>
            <button
              onClick={() => setShowLyrics(false)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: 'var(--color-cream)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Lyrics Content */}
          <div style={{
            maxWidth: '600px',
            height: '70%',
            overflowY: 'auto',
            textAlign: 'center',
            paddingRight: '10px',
            marginTop: '40px',
            maskImage: 'linear-gradient(to bottom, transparent, white 15%, white 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, white 15%, white 85%, transparent)',
          }}>
            <pre style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.25rem',
              lineHeight: '2.2',
              color: 'var(--color-cream)',
              whiteSpace: 'pre-wrap',
              padding: '60px 0',
            }}>
              {currentSong.lyrics}
            </pre>
          </div>
        </div>
      )}
    </>
  );
}
