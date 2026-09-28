import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false);

  const lines = [
    "Hey,",
    "",
    "I know I've been that annoying friend who doesn't know when to stop teasing.",
    "",
    "And honestly, I feel terrible about it.",
    "",
    "I never wanted to make you feel bad. I think I just got too comfortable and forgot that my 'jokes' might actually be hurtful.",
    "",
    "You've always been such a good friend to me, and I repaid that by being careless with your feelings.",
    "",
    "I don't expect you to just forget about it. But I want you to know that I genuinely realize what I did, and I'm going to do better.",
    "",
    "No more stupid teasing. I promise.",
    "",
    "You deserve a friend who makes you smile, not one who makes you uncomfortable.",
    "",
    "I'm really, truly sorry."
  ];

  return (
    <section className="bg-deep min-h-screen py-24 flex flex-col items-center justify-center overflow-hidden relative">
      <div className="max-w-4xl w-full mx-auto px-4 flex flex-col items-center z-10">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-xl sm:text-2xl md:text-3xl text-cream mb-16 text-center break-words"
        >
          There's something I really want to say.
        </motion.h2>

        <motion.div 
          className="relative w-64 sm:w-72 md:w-80 lg:w-96 aspect-[4/3] bg-cream/10 rounded-lg border border-cream/20 shadow-xl cursor-pointer overflow-hidden group flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => setIsOpen(true)}
        >
          {/* Simple Envelope Flap styling */}
          <div className="absolute top-0 left-0 w-full h-1/2 border-b-2 border-cream/20 bg-cream/5 skew-y-12 origin-top-left group-hover:bg-cream/10 transition-colors" />
          <div className="absolute top-0 right-0 w-full h-1/2 border-b-2 border-cream/20 bg-cream/5 -skew-y-12 origin-top-right group-hover:bg-cream/10 transition-colors" />
          <div className="text-4xl">✉</div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          onClick={() => setIsOpen(true)}
          className="mt-10 px-8 py-3 rounded-full bg-cream/10 hover:bg-cream/20 border border-cream/30 text-cream font-body text-sm sm:text-base backdrop-blur-sm transition-all shadow-lg hover:shadow-cream/10"
        >
          Open the letter ✉
        </motion.button>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-midnight/85 backdrop-blur-sm cursor-pointer"
              onClick={() => setIsOpen(false)}
            />

            {/* Letter Content */}
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative w-[88vw] sm:w-[85vw] max-w-lg bg-[#f4f1eb] rounded-md shadow-2xl p-6 sm:p-8 md:p-10 max-h-[85vh] overflow-y-auto paper"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-midnight/5 hover:bg-midnight/10 text-[#3a3a3a] transition-colors"
                aria-label="Close letter"
              >
                ✕
              </button>

              <div className="font-body text-sm sm:text-base md:text-lg leading-relaxed text-[#3a3a3a] break-words">
                {lines.map((line, index) => (
                  <motion.p 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className={line === "" ? "h-4" : ""}
                  >
                    {line}
                  </motion.p>
                ))}
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + lines.length * 0.1 + 0.5, duration: 0.8 }}
                  className="mt-8 text-right italic font-medium pr-4"
                >
                  — Ujjwal
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
