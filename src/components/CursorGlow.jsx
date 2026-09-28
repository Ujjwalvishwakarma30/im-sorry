import { useEffect, useRef, useState } from 'react';

const CursorGlow = () => {
  const glowRef = useRef(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [isHoverable, setIsHoverable] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsHoverable(mediaQuery.matches);

    const handleMediaChange = (e) => setIsHoverable(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isHoverable) return;

    const handleMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const render = () => {
      const pos = position.current;
      const tgt = target.current;
      pos.x += (tgt.x - pos.x) * 0.1;
      pos.y += (tgt.y - pos.y) * 0.1;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.x - 200}px, ${pos.y - 200}px)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHoverable]);

  if (!isHoverable) return null;

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
      aria-hidden="true"
      style={{
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(244,160,181,0.08) 0%, rgba(244,160,181,0) 70%)',
        willChange: 'transform',
      }}
    />
  );
};

export default CursorGlow;
