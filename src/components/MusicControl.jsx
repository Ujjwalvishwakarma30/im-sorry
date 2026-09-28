import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';

const MusicControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    audio.addEventListener('canplaythrough', () => setIsLoaded(true));
    audio.addEventListener('error', () => setHasError(true));

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            setHasError(true);
            setIsPlaying(false);
          });
      }
    }
  };

  // Don't render if audio failed to load
  if (hasError) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200, damping: 20 }}
      onClick={togglePlay}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9997] w-10 h-10 sm:w-11 sm:h-11 rounded-full backdrop-blur-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
        isPlaying
          ? 'bg-blush/15 border border-blush/40 text-cream shadow-[0_0_20px_rgba(244,160,181,0.2)]'
          : 'bg-navy/60 border border-cream/10 text-blush/70 hover:bg-navy/80 hover:border-cream/20'
      }`}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <Music size={16} />
            <motion.div
              className="absolute -inset-1.5 rounded-full border border-blush/40"
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="paused"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <VolumeX size={16} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default MusicControl;
