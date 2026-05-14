import { motion } from 'framer-motion';
import aboutData from '../data/about.json';
import { scrollToSection } from '../utils/scroll';

export default function Hero() {
  const { title, tagline } = aboutData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 },
    },
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <motion.div
        className="max-w-4xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.h1
          variants={titleVariants}
          className="text-4xl md:text-7xl font-serif font-bold tracking-tight mb-6 leading-tight"
        >
          {title.split(' ').map((word, idx) => (
            <motion.span
              key={idx}
              className="inline-block mr-3"
              whileHover={{ color: '#f59e0b', scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          variants={taglineVariants}
          className="mb-8"
        >
          <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-2xl">
            {tagline}
          </p>
          <motion.div
            className="mt-2 h-1 w-24 bg-gradient-to-r from-amber-500 to-transparent"
            animate={{ width: [0, 96, 96] }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </motion.div>

        <motion.div
          variants={buttonVariants}
          className="flex gap-4 flex-wrap"
        >
          <motion.button
            onClick={() => scrollToSection('work')}
            className="px-8 py-3 bg-amber-500 text-slate-950 font-medium rounded-lg hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="View my work and projects"
          >
            View Work
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 border border-slate-500 text-slate-50 font-medium rounded-lg hover:border-amber-400 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
            whileHover={{
              scale: 1.08,
              borderColor: '#f59e0b',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Get in touch with me"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-slate-400 text-sm">
          <span>Scroll to explore</span>
          <motion.svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </motion.svg>
        </div>
      </motion.div>
    </section>
  );
}
