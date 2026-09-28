import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fireConfetti, fireEmojis } from '../animations/confetti';
import MagneticButton from '../components/MagneticButton';

export default function SmileSection() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    fireConfetti();
    fireEmojis();
    setTimeout(() => {
      setClicked(true);
    }, 1200);
  };

  return (
    <section className="min-h-screen overflow-hidden flex items-center justify-center bg-midnight relative px-4">
      <div className="max-w-xl sm:max-w-2xl mx-auto w-full text-center">
        <AnimatePresence mode="wait">
          {!clicked ? (
            <motion.div
              key="before"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-cream break-words">
                  Okay… enough emotional stuff.
                </h2>
                <p className="font-body text-base sm:text-lg md:text-xl text-cream/60 break-words">
                  I have one tiny request though.
                </p>
              </div>

              <MagneticButton>
                <button
                  onClick={handleClick}
                  className="px-8 py-4 rounded-full bg-cream/10 border border-cream/20 text-cream font-body text-lg backdrop-blur-md shimmer-btn hover:bg-cream/20 transition-colors"
                >
                  Make me smile 😌
                </button>
              </MagneticButton>
            </motion.div>
          ) : (
            <motion.div
              key="after"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, staggerChildren: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-xl sm:text-2xl md:text-3xl text-cream break-words"
              >
                Thank you for making it this far.
              </motion.h2>
              
              <div className="space-y-4 flex flex-col items-center">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="font-body text-sm sm:text-base md:text-lg text-cream/60 break-words"
                >
                  Congratulations, you survived Ujjwal's dramatic apology website.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="font-body text-cream/60 break-words"
                >
                  Honestly, I spent an embarrassing amount of time on this.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.0 }}
                  className="font-body text-base sm:text-lg text-blush font-medium break-words mt-2"
                >
                  But you're worth every second of it. ✨
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
