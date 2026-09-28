import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';

export default function Hero() {
  const scrollToCards = () => {
    document.getElementById('apology-cards')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center pt-20 pb-10">
      {/* Glowing orb behind heading */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full blur-[120px] pointer-events-none"
        animate={{
          backgroundColor: [
            'rgba(196,181,224,0.15)',
            'rgba(244,160,181,0.15)',
            'rgba(196,181,224,0.15)',
          ],
          y: ['-50%', '-55%', '-50%'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-cream leading-tight break-words"
        >
          I owe you an apology.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-base sm:text-lg md:text-xl text-cream/70 font-body max-w-2xl mx-auto break-words"
        >
          And this time… I didn't want to just send a boring text.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="text-sm sm:text-base md:text-lg text-cream/50 font-body max-w-xl mx-auto mb-8 break-words"
        >
          So I built this little corner of the internet just for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="pt-8"
        >
          <MagneticButton>
            <button
              onClick={scrollToCards}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-cream/90 font-body text-sm sm:text-base transition-colors flex items-center gap-2"
            >
              Okay… show me <span>→</span>
            </button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
