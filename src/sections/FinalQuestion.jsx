import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fireCelebration } from '../animations/confetti';

export default function FinalQuestion() {
  const [response, setResponse] = useState(null);

  const handleResponse = (type) => {
    setResponse(type);
    if (type === 'yes') {
      fireCelebration();
    }
  };

  return (
    <section className="min-h-screen overflow-hidden flex items-center justify-center bg-midnight relative px-4 py-20">
      <div className="max-w-xl sm:max-w-2xl mx-auto w-full text-center flex flex-col items-center gap-12">
        <div className="space-y-8 flex flex-col items-center w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl text-cream break-words"
          >
            So…
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="font-display text-2xl sm:text-3xl md:text-5xl text-blush break-words"
          >
            Are we still friends?
          </motion.h3>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 3 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full"
        >
          <button 
            onClick={() => handleResponse('maybe')}
            className="px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl bg-cream/5 backdrop-blur-md border border-cream/10 text-sm sm:text-base md:text-lg font-body text-cream hover:bg-cream/10 transition-colors"
          >
            Maybe 🤍
          </button>
          <button 
            onClick={() => handleResponse('time')}
            className="px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl bg-cream/5 backdrop-blur-md border border-cream/10 text-sm sm:text-base md:text-lg font-body text-cream hover:bg-cream/10 transition-colors"
          >
            Give me some time 🌙
          </button>
          <button 
            onClick={() => handleResponse('yes')}
            className="px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl bg-cream/5 backdrop-blur-md border border-blush/30 text-sm sm:text-base md:text-lg font-body text-cream hover:bg-cream/10 transition-colors"
          >
            Of course we are ✨
          </button>
        </motion.div>

        <div className="h-24 w-full flex flex-col items-center justify-center mt-4">
          <AnimatePresence mode="wait">
            {response && (
              <motion.div
                key={response}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-3 w-full"
              >
                <p className={`font-body text-base sm:text-lg md:text-xl break-words px-4 ${response === 'yes' ? 'text-blush drop-shadow-[0_0_15px_rgba(255,182,193,0.5)]' : 'text-cream/80'}`}>
                  {response === 'maybe' && "That's okay. I'll take that as a tiny bit of hope. 🤍"}
                  {response === 'time' && "Take all the time you need. I'm not going anywhere."}
                  {response === 'yes' && "You have no idea how happy that makes me. 🤍"}
                </p>
                <p className="text-xs sm:text-sm text-cream/25">
                  (you can pick again if you change your mind)
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
