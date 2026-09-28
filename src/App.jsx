import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import ParticleBackground from './components/ParticleBackground';
import CursorGlow from './components/CursorGlow';
import MusicControl from './components/MusicControl';
import EasterEgg from './components/EasterEgg';

// Sections
import IntroScreen from './sections/IntroScreen';
import Hero from './sections/Hero';
import ApologyCards from './sections/ApologyCards';
import Timeline from './sections/Timeline';
import Letter from './sections/Letter';
import NoPressure from './sections/NoPressure';
import SmileSection from './sections/SmileSection';
import FinalQuestion from './sections/FinalQuestion';
import Ending from './sections/Ending';

export default function App() {
  const [entered, setEntered] = useState(false);

  const handleEnter = useCallback(() => {
    setEntered(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 50);
  }, []);

  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setEntered(false);
  }, []);

  return (
    <div className="relative w-full max-w-[100vw] overflow-x-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Particle background */}
      <ParticleBackground />

      {/* Cursor glow (desktop only) */}
      <CursorGlow />

      {/* Music control */}
      <MusicControl />

      {/* Easter egg */}
      <EasterEgg />

      {/* Intro screen */}
      <AnimatePresence mode="wait">
        {!entered && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.95,
              filter: 'blur(12px)',
              transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            className="w-full"
          >
            <IntroScreen onEnter={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {entered && (
          <motion.main
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            className="relative w-full overflow-x-hidden"
          >
            <Hero />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blush/10 to-transparent" />
            <ApologyCards />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blush/10 to-transparent" />
            <Timeline />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-lavender/10 to-transparent" />
            <Letter />
            <NoPressure />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blush/10 to-transparent" />
            <SmileSection />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-lavender/10 to-transparent" />
            <FinalQuestion />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blush/5 to-transparent" />
            <Ending onReplay={handleReplay} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
