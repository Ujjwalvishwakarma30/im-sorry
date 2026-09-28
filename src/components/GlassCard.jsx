import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`
        bg-[#141b2d]/50 
        backdrop-blur-[20px] 
        border border-[#f4a0b5]/10 
        rounded-2xl 
        p-6 md:p-8 
        shadow-[0_8px_32px_rgba(10,14,26,0.3)]
        hover:bg-[#141b2d]/60
        hover:border-[#f4a0b5]/20
        transition-all duration-500
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
