import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Stars — twinkling dots
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.3,
      baseOpacity: Math.random() * 0.5 + 0.2,
      opacity: Math.random(),
      speed: Math.random() * 0.008 + 0.003,
      phase: Math.random() * Math.PI * 2,
    }));

    // Floating particles — soft blush pink drifters
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.25 + 0.05,
    }));

    // Hearts — very subtle, very few
    const hearts = Array.from({ length: 5 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * height * 0.5,
      size: Math.random() * 6 + 4,
      vy: -(Math.random() * 0.3 + 0.15),
      vx: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.12 + 0.04,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.015 + 0.005,
    }));

    let animationFrameId;
    let time = 0;

    const drawHeart = (x, y, size) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      // Left curve
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.5, x, y + size);
      // Right curve
      ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.5, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
    };

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Soft radial gradient center glow
      const grd = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.6);
      grd.addColorStop(0, 'rgba(20, 27, 45, 0.3)');
      grd.addColorStop(1, 'rgba(10, 14, 26, 0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);

      // Stars
      for (const star of stars) {
        if (!prefersReducedMotion) {
          star.opacity = star.baseOpacity + Math.sin(time * star.speed * 60 + star.phase) * 0.3;
          star.opacity = Math.max(0.05, Math.min(1, star.opacity));
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(254, 245, 236, ${star.opacity})`;
        ctx.fill();
      }

      // Particles
      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 160, 181, ${p.opacity})`;
        ctx.fill();
      }

      // Hearts
      for (const h of hearts) {
        if (!prefersReducedMotion) {
          h.y += h.vy;
          h.wobble += h.wobbleSpeed;
          h.x += Math.sin(h.wobble) * 0.3 + h.vx;

          if (h.y < -30) {
            h.y = height + 30;
            h.x = Math.random() * width;
            h.opacity = Math.random() * 0.12 + 0.04;
          }
        }
        ctx.fillStyle = `rgba(232, 117, 138, ${h.opacity})`;
        drawHeart(h.x, h.y, h.size);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, background: '#0a0e1a' }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
