import React, { useMemo } from 'react';

export default function ParticlesBg() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 5 + 2; // 2px to 7px
      const left = Math.random() * 100; // 0% to 100%
      const duration = Math.random() * 12 + 8; // 8s to 20s
      const delay = Math.random() * -20; // negative delay so they start immediately at different phases
      const opacity = Math.random() * 0.5 + 0.2;
      const color = Math.random() > 0.4 ? 'var(--color-orange)' : 'var(--color-pink)';

      return {
        id: i,
        style: {
          position: 'absolute',
          bottom: '0',
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          backgroundColor: color,
          opacity: opacity,
          filter: 'blur(1px)',
          boxShadow: `0 0 8px ${color}`,
          animation: `float-ash ${duration}s infinite linear`,
          animationDelay: `${delay}s`,
          pointerEvents: 'none',
        }
      };
    });
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      background: 'radial-gradient(circle at 50% 90%, #1a0f0d 0%, #090605 80%)',
    }}>
      {particles.map(p => (
        <div key={p.id} style={p.style} />
      ))}
    </div>
  );
}
