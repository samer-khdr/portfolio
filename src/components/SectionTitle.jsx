import { motion } from 'framer-motion';

export default function SectionTitle({ eyebrow, title, subtitle, subtitleSize = 'sm' }) {
  return (
    <div>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 leading-tight">
        {title}
      </h2>
      <motion.div
        className="h-1 w-20 bg-gradient-to-r from-amber-500 to-transparent"
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
      {subtitle && (
        <p className={`mt-4 ${
          subtitleSize === 'lg'
            ? 'text-xl text-slate-300 max-w-2xl font-light leading-relaxed'
            : 'text-sm text-slate-400'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
