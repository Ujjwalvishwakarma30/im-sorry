import { motion } from 'framer-motion';

export default function Ending({ onReplay }) {
  return (
    <section className="min-h-screen overflow-hidden flex flex-col items-center justify-center bg-midnight relative px-4 py-20">
      <div className="max-w-3xl mx-auto w-full text-center flex-1 flex flex-col justify-center gap-12">
        <div className="space-y-16 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-cream break-words">
              Whatever happens…
            </h2>
            <p className="font-body text-lg sm:text-xl md:text-2xl text-cream/70 break-words">
              I'm genuinely glad you're in my life.
            </p>
          </motion.div>

          <div className="h-12 sm:h-24" /> {/* Spacer */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 2.5 }}
            className="space-y-4 w-full flex flex-col items-center"
          >
            <p className="font-body text-base sm:text-lg text-cream/50 break-words">
              And once again…
            </p>
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 3.5, ease: "easeOut" }}
              className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-cream uppercase glow-text break-words w-full"
            >
              I'M SORRY. 🤍
            </motion.h1>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 6 }}
        className="mt-auto pt-20 w-full flex flex-col items-center gap-6"
      >
        <p className="text-xs sm:text-sm text-cream/30 text-center px-4 break-words max-w-md">
          Made with a little regret, a lot of effort, and hopefully one smile.
        </p>
        
        {onReplay && (
          <button 
            onClick={onReplay}
            className="text-xs sm:text-sm text-cream/40 hover:text-cream/70 transition-colors cursor-pointer tracking-wider"
          >
            Replay the whole thing ↻
          </button>
        )}
        
        <p className="text-xs text-cream/20 mt-4 font-serif italic">
          — with love, Ujjwal
        </p>
      </motion.div>
    </section>
  );
}
