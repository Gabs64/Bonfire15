import React from 'react';
import logo from '../assets/logo.png';
import FlameVisualizer from '../components/FlameVisualizer';

export default function Home({ analyser, isPlaying, songs, activeSongIndex, setActiveSongIndex, setIsPlaying }) {
  const currentSong = songs[activeSongIndex];

  const handleQuickPlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
      {/* Hero Banner Section */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        padding: '20px 0',
      }}>
        {/* Glow behind the logo */}
        <div style={{
          position: 'absolute',
          top: '0',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 0, 127, 0.2) 0%, rgba(255, 94, 0, 0.1) 60%, transparent 100%)',
          filter: 'blur(30px)',
          zIndex: -1,
        }} />

        <img 
          src={logo} 
          alt="Bonfire 15 Logo" 
          style={{
            height: '180px',
            width: '180px',
            objectFit: 'contain',
            marginBottom: '24px',
            filter: 'drop-shadow(0 0 20px rgba(255, 0, 127, 0.5)) drop-shadow(0 0 10px rgba(255, 94, 0, 0.3))',
            animation: isPlaying ? 'pulse-pink 3s infinite ease-in-out' : 'none',
          }}
        />

        <h1 style={{
          fontSize: '3.5rem',
          fontFamily: 'var(--font-display)',
          marginBottom: '16px',
          background: 'linear-gradient(to right, #ffffff, #ffd2bd, var(--color-orange))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.1',
        }}>
          BONFIRE 15
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: 'var(--color-ash)',
          maxWidth: '650px',
          lineHeight: '1.6',
          marginBottom: '30px',
        }}>
          We are a music collective originating from the heart of <strong style={{ color: 'var(--color-yellow)' }}>The Camp</strong>. 
          We blend organic outdoor recordings with warm synthesizers and acoustic melodies around the fire.
        </p>

        {/* Call to action */}
        {songs.length > 0 && (
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={handleQuickPlay}
              style={{
                padding: '14px 28px',
                borderRadius: '30px',
                backgroundColor: 'var(--color-pink)',
                color: 'white',
                fontWeight: '700',
                fontSize: '1rem',
                boxShadow: '0 4px 15px var(--color-pink-glow)',
                transition: 'var(--transition-smooth)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(255, 0, 127, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px var(--color-pink-glow)';
              }}
            >
              {isPlaying ? 'Pause Session' : 'Start campfire session'}
            </button>
          </div>
        )}
      </section>

      {/* Main Core Stage - Visualizer and Story */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {/* Visualizer Side */}
        <div className="glass-panel" style={{
          height: '350px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'rgba(14, 10, 9, 0.7)',
        }}>
          <div style={{
            position: 'absolute',
            top: '15px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 5,
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isPlaying ? 'var(--color-pink)' : 'var(--color-orange)',
              boxShadow: isPlaying ? '0 0 8px var(--color-pink)' : 'none',
              animation: isPlaying ? 'pulse-pink 1s infinite' : 'none',
            }} />
            <span style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--color-ash)',
              fontWeight: '600',
            }}>
              {isPlaying && currentSong ? `Playing: ${currentSong.title}` : 'Cozy Ember Loop'}
            </span>
          </div>

          <div style={{ width: '100%', height: '100%' }}>
            <FlameVisualizer analyser={analyser} />
          </div>
        </div>

        {/* Story Side */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          <h2 style={{
            fontSize: '2rem',
            background: 'linear-gradient(to right, var(--color-orange), var(--color-yellow))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            The Echoes of The Camp
          </h2>
          <p style={{ color: 'var(--color-ash)', fontSize: '1rem', lineHeight: '1.7' }}>
            Every summer, deep in the wood-sheltered valley of The Camp, we gather. 
            We bring acoustic guitars, analog synthesizers, field microphones, and notebooks. 
            Our tracks are written, mixed, and recorded live around the fire, catching the natural rustle of leaves, the whistle of the mountain wind, and the crackle of dry pine logs.
          </p>
          <p style={{ color: 'var(--color-ash)', fontSize: '1rem', lineHeight: '1.7' }}>
            The number <strong style={{ color: 'var(--color-pink)' }}>15</strong> represents the specific cabin where we set up our solar-powered audio workstation. 
            It is a space of pure creation—where electronic synthesis meets organic wilderness.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '10px',
            padding: '12px 18px',
            background: 'rgba(255, 94, 0, 0.05)',
            borderLeft: '3px solid var(--color-orange)',
            borderRadius: '0 8px 8px 0',
          }}>
            <span style={{ fontSize: '1.5rem' }}>🔥</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-cream)' }}>
              <strong>Campfire Pro-Tip:</strong> Play any track from the Music page and watch the flames jump, flicker, and color-shift to the rhythm of the synthesizers!
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
