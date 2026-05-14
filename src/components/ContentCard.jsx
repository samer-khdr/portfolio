import { motion } from 'framer-motion';

/**
 * Shared card shell used by Blog and Projects.
 * Provides the border, hover shadow, lift, and left accent line.
 * Pass content as children; pass onClick to make the whole card clickable.
 */
export default function ContentCard({ onClick, children, className = '' }) {
  return (
    <motion.article
      onClick={onClick}
      className={`group relative ${onClick ? 'cursor-pointer' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -4 }}
    >
      <div className="bg-slate-900/50 border border-amber-500/40 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-amber-500/80 group-hover:bg-slate-900/70 group-hover:shadow-lg group-hover:shadow-amber-500/10 h-full flex flex-col">
        {children}
      </div>
      {/* Left border accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500/0 via-amber-500/30 to-amber-500/0 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.article>
  );
}
