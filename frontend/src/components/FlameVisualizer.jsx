import React, { useEffect, useRef } from 'react';

export default function FlameVisualizer({ analyser }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    const particles = [];
    const maxParticles = 80;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 300;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Audio Analysis Array
    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    class FireParticle {
      constructor(x, y, intensity) {
        this.x = x + (Math.random() - 0.5) * 30;
        this.y = y;
        this.baseX = x;
        // Upward speed boosted by audio intensity
        this.vy = -(Math.random() * 2 + 1.5) * (1 + intensity * 1.5);
        this.vx = (Math.random() - 0.5) * 1.2;
        this.maxLife = Math.random() * 30 + 20;
        this.life = this.maxLife;
        // Particle size dependent on life and audio volume
        this.startSize = Math.random() * 12 + 8 + intensity * 10;
        this.size = this.startSize;
        
        // Color interpolation: hot white -> orange/yellow -> pink/magenta -> ash grey
        // Driven by audio intensity: higher intensity = more pink/magenta particles
        const pinkRatio = Math.random() < (0.15 + intensity * 0.6);
        if (pinkRatio) {
          this.r = 255;
          this.g = 0;
          this.b = 127 + Math.floor(Math.random() * 128); // magenta
        } else {
          this.r = 255;
          this.g = 50 + Math.floor(Math.random() * 100);  // orange/yellow
          this.b = 0;
        }
      }

      update() {
        this.y += this.vy;
        // Sway gently in the wind
        this.x += this.vx + Math.sin(this.life * 0.1) * 0.5;
        this.life--;
        // Shrink particle as it dies
        this.size = (this.life / this.maxLife) * this.startSize;
      }

      draw(context) {
        const opacity = this.life / this.maxLife;
        context.beginPath();
        // Create glowing radial gradients for realistic fire look
        const gradient = context.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        
        gradient.addColorStop(0, `rgba(${this.r}, ${this.g}, ${this.b}, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(${this.r}, ${this.g - 50 > 0 ? this.g - 50 : 0}, ${this.b}, ${opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(18, 13, 12, 0)`);
        
        context.fillStyle = gradient;
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get audio data
      let intensity = 0; // scale 0 to 1
      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        // Average volume of mid-bass range (indices 2 to 15)
        let sum = 0;
        const count = 15;
        for (let i = 2; i < 2 + count; i++) {
          sum += dataArray[i];
        }
        intensity = sum / (count * 255); // normalized 0 to 1
      }

      // Draw bonfire wood logs at the bottom center
      const centerX = canvas.width / 2;
      const centerY = canvas.height - 30;

      // Draw glowing ember bed below the logs
      const bedGlow = ctx.createRadialGradient(
        centerX, centerY, 5,
        centerX, centerY, 80 + intensity * 60
      );
      bedGlow.addColorStop(0, 'rgba(255, 94, 0, 0.45)');
      bedGlow.addColorStop(0.3, 'rgba(255, 0, 127, 0.2)');
      bedGlow.addColorStop(1, 'rgba(9, 6, 5, 0)');
      ctx.fillStyle = bedGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80 + intensity * 60, 0, Math.PI * 2);
      ctx.fill();

      // Spawn new fire particles
      // Higher audio intensity = spawn rate boost
      const spawnRate = Math.floor(2 + intensity * 4);
      for (let s = 0; s < spawnRate; s++) {
        if (particles.length < maxParticles) {
          particles.push(new FireParticle(centerX, centerY - 10, intensity));
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.life <= 0 || p.size <= 0.1) {
          particles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      // Draw the Logs (crisp pixel art vectors)
      ctx.fillStyle = '#3a2016'; // dark log brown
      ctx.strokeStyle = '#1d0d08';
      ctx.lineWidth = 3;

      // Left log
      ctx.beginPath();
      ctx.ellipse(centerX - 25, centerY + 5, 8, 28, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Right log
      ctx.beginPath();
      ctx.ellipse(centerX + 25, centerY + 5, 8, 28, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Center cross log
      ctx.fillStyle = '#4f2b1d';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + 10, 6, 32, Math.PI / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Hot embers on the wood logs
      ctx.fillStyle = intensity > 0.4 ? 'var(--color-pink)' : 'var(--color-orange)';
      ctx.beginPath();
      ctx.arc(centerX - 10, centerY, 3 + intensity * 2, 0, Math.PI * 2);
      ctx.arc(centerX + 8, centerY + 2, 2 + intensity * 2, 0, Math.PI * 2);
      ctx.arc(centerX, centerY + 6, 3 + intensity * 1, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [analyser]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
      }} 
    />
  );
}
