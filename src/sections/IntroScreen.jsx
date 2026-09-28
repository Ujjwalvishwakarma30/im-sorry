import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroScreen({ onEnter }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 500);
    const timer2 = setTimeout(() => setStep(2), 2000);
    const timer3 = setTimeout(() => setStep(3), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight overflow-hidden">
      {/* Animated gradient orb */}
      <motion.div
        className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full blur-[100px] pointer-events-none"
        animate={{
          backgroundColor: [
            'rgba(244,160,181,0.25)',
            'rgba(196,181,224,0.25)',
            'rgba(244,160,181,0.25)',
          ],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 w-full max-w-lg mx-auto px-4 flex flex-col items-center justify-center text-center">
        <AnimatePresence>
          {step >= 1 && (
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-6xl font-display italic text-cream mb-6 break-words"
            >
              Hey… wait<span className="cursor-blink">.</span>
            </motion.h1>
          )}

          {step >= 2 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-lg sm:text-xl md:text-2xl font-body text-cream/70 mb-12 break-words"
            >
              I need to tell you something.
            </motion.p>
          )}

          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={onEnter}
                className="shimmer-btn group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-cream font-body tracking-wider transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Enter <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(244,160,181,0.3)] group-hover:shadow-[0_0_30px_rgba(244,160,181,0.5)] transition-shadow duration-300 pointer-events-none" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step >= 3 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 text-xs sm:text-sm text-cream/25 font-body break-words"
        >
          Best experienced with sound on 🎧
        </motion.p>
      )}
    </div>
  );
}
