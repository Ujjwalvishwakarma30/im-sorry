import { motion } from 'framer-motion';

const cards = [
  "I know I went too far with the teasing.",
  "I know what I thought was funny probably wasn't for you.",
  "I know saying 'sorry' doesn't undo the moments I made you uncomfortable.",
  "And I know you deserved a friend who's more thoughtful."
];

export default function ApologyCards() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="apology-cards" 
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center py-20"
    >
      <div className="w-full max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-display text-2xl sm:text-3xl md:text-5xl text-cream text-center mb-12 sm:mb-16 break-words"
        >
          I know.
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full flex flex-col gap-4 sm:gap-6"
        >
          {cards.map((text, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="w-full bg-[rgba(20,27,45,0.5)] backdrop-blur-xl rounded-2xl p-5 sm:p-6 md:p-8 border border-white/5 border-l-2 border-l-blush/30 shadow-xl overflow-hidden"
            >
              <p className={`font-body text-base sm:text-lg md:text-xl ${index === cards.length - 1 ? 'text-cream/90' : 'text-cream/80'} break-words leading-relaxed`}>
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
