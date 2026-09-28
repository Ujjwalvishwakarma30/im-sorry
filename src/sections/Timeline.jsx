import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TimelineItem = ({ number, text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -40% 0px" });

  return (
    <div ref={ref} className="relative flex items-start gap-4 sm:gap-6 mb-16 sm:mb-24 last:mb-0 w-full">
      {/* Connector line dot */}
      <div 
        className={`absolute left-0 top-6 sm:top-8 w-2 h-2 rounded-full transition-all duration-700 ease-out transform -translate-x-1/2
          ${isInView ? 'bg-blush shadow-[0_0_10px_rgba(255,182,193,0.8)] scale-110' : 'bg-blush/20 scale-100'}
        `}
      />
      
      {/* Number */}
      <div className={`font-display text-4xl sm:text-5xl md:text-6xl transition-colors duration-700 w-16 sm:w-20 shrink-0
        ${isInView ? 'text-blush drop-shadow-[0_0_8px_rgba(255,182,193,0.5)]' : 'text-blush/20'}
      `}>
        {number}
      </div>

      {/* Text */}
      <div className={`mt-2 font-body text-sm sm:text-base md:text-lg transition-all duration-700 max-w-md break-words
        ${isInView ? 'text-cream opacity-100 translate-x-0' : 'text-cream/40 opacity-30 -translate-x-2'}
      `}>
        {text}
      </div>
    </div>
  );
};

export default function Timeline() {
  const items = [
    { num: "01", text: "That my 'jokes' weren't always as funny as I thought." },
    { num: "02", text: "That teasing someone repeatedly can actually hurt." },
    { num: "03", text: "That being the 'funny guy' doesn't excuse being careless." },
    { num: "04", text: "That a good friend protects your feelings, not pokes at them." },
  ];

  return (
    <section className="bg-midnight py-24 md:py-32 overflow-hidden relative min-h-screen">
      <div className="max-w-2xl mx-auto px-4 w-full relative z-10">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-display text-xl sm:text-2xl md:text-4xl text-cream text-center mb-24 md:mb-32 break-words"
        >
          Things I should have realized sooner...
        </motion.h2>

        <div className="relative pl-6 sm:pl-8">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blush/5 via-blush/20 to-blush/5" />
          
          {items.map((item) => (
            <TimelineItem 
              key={item.num} 
              number={item.num} 
              text={item.text} 
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
