import { motion } from 'framer-motion';
import aboutData from '../data/about.json';

export default function Contact() {
  const { email, linkedIn, github } = aboutData;
  return (
    <section
      id="contact"
      className="py-32 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">
              Let's Connect
            </h2>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-amber-500 to-transparent"
              animate={{ width: [0, 80, 80] }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </motion.div>

          <div>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Open to discussing AI/ML architecture, backend systems, and interesting technical challenges.
            </p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.a
              href={`mailto:${email}`}
              className="px-8 py-4 bg-amber-500 text-slate-950 font-medium rounded-lg hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Send email to ${email}`}
            >
              Send Email
            </motion.a>
            <motion.a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-slate-500 text-slate-50 font-medium rounded-lg hover:border-amber-400 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Visit LinkedIn profile (opens in new tab)"
            >
              LinkedIn
            </motion.a>
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-slate-500 text-slate-50 font-medium rounded-lg hover:border-amber-400 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Visit GitHub profile (opens in new tab)"
            >
              GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
