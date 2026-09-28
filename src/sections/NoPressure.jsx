import { motion } from 'framer-motion';

export default function NoPressure() {
  const lines = [
    "You don't have to reply right now.",
    "You don't have to forgive me immediately.",
    "You don't even have to say anything."
  ];

  return (
    <section className="bg-navy py-16 md:py-24 overflow-hidden relative">
      <div className="max-w-2xl mx-auto px-4 w-full relative z-10 flex flex-col">
        
        {lines.map((line, i) => (
          <div key={i} className="min-h-[30vh] flex items-center justify-center w-full">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-cream text-center px-4 break-words"
            >
              {line}
            </motion.p>
          </div>
        ))}
        
        <div className="min-h-[30vh] flex items-center justify-center w-full mt-10">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blush italic text-center px-4 break-words"
          >
            I just needed you to know that I'm sorry.
          </motion.p>
        </div>

      </div>
    </section>
  );
}
