import { motion } from 'framer-motion';
import aboutData from '../data/about.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { name, location, email, linkedIn, github } = aboutData;

  return (
    <footer className="py-12 px-6 border-t border-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-slate-500 text-sm">
              © {currentYear} {name}. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs mt-1">
              {location}
            </p>
          </div>

          <nav className="flex gap-6">
            <motion.a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-2 py-1 transition-colors text-sm"
              whileHover={{ y: -2 }}
              aria-label="LinkedIn profile (opens in new tab)"
            >
              LinkedIn
            </motion.a>
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-2 py-1 transition-colors text-sm"
              whileHover={{ y: -2 }}
              aria-label="GitHub profile (opens in new tab)"
            >
              GitHub
            </motion.a>
            <motion.a
              href={`mailto:${email}`}
              className="text-slate-400 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-2 py-1 transition-colors text-sm"
              whileHover={{ y: -2 }}
              aria-label={`Send email to ${email}`}
            >
              Email
            </motion.a>
          </nav>
        </motion.div>
      </div>
    </footer>
  );
}
