import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticButton = ({ children, onClick, className = '', ariaLabel }) => {
  const ref = useRef(null);
  const [isHoverable, setIsHoverable] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsHoverable(mediaQuery.matches);
  }, []);

  const handleMouseMove = (e) => {
    if (!isHoverable || !ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const displacementX = (clientX - centerX) * 0.15;
    const displacementY = (clientY - centerY) * 0.15;

    x.set(Math.max(Math.min(displacementX, 10), -10));
    y.set(Math.max(Math.min(displacementY, 10), -10));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // If children is a function or element, wrap in a motion div (not button)
  // This prevents nested <button> issues when wrapping a <button> child
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      aria-label={ariaLabel}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); } } : undefined}
      style={{
        x: isHoverable ? springX : 0,
        y: isHoverable ? springY : 0,
      }}
      whileHover={{ scale: isHoverable ? 1.03 : 1 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-block ${className}`}
    >
      {isHovered && isHoverable && (
        <motion.div 
          className="absolute inset-0 bg-blush/10 blur-md rounded-full -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default MagneticButton;
