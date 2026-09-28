import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EasterEgg() {
  const [clicks, setClicks] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (clicks >= 5) {
      setIsOpen(true);
      setClicks(0);
    }
  }, [clicks]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <button
        onClick={() => setClicks(c => c + 1)}
        className="fixed top-6 left-6 w-6 h-6 z-50 text-cream opacity-[0.12] hover:opacity-25 transition-opacity flex items-center justify-center text-xl cursor-pointer"
        aria-label="Secret star"
      >
        ★
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-midnight/85 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-[9999] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 max-w-sm sm:max-w-md w-[90vw] text-center overflow-hidden flex flex-col items-center gap-4"
            >
              <h3 className="font-display text-lg sm:text-xl text-cream break-words">
                Okay, you found the secret.
              </h3>
              
              <p className="font-body text-sm sm:text-base text-cream/70 break-words mb-2">
                Fine. One more thing…
              </p>
              
              <h2 className="font-display text-xl sm:text-2xl text-blush break-words">
                I promise I'll stop teasing you.
              </h2>
              
              <div className="flex items-center gap-2 mt-4 text-xs sm:text-sm text-cream/50">
                <p className="font-body break-words">
                  (okay maybe just a little. But lovingly.)
                </p>
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="inline-block text-base"
                >
                  🥲
                </motion.span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
