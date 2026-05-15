import { motion } from 'framer-motion';
import ContentCard from './ContentCard';

function StatusBadge({ text, color, pulse }) {
  return (
    <div className="flex items-center gap-2">
      {pulse && (
        <motion.span
          className="inline-block w-2 h-2 rounded-full bg-emerald-500"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <span className={`text-xs font-mono font-semibold ${color}`}>{text}</span>
    </div>
  );
}

function CategoryPill({ text, gradient }) {
  return (
    <span
      className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${gradient}`}
    >
      {text}
    </span>
  );
}

export default function ResourceCard({
  badgeId,
  status,
  pill,
  title,
  metaLine,
  description,
  tagsLabel = 'Tags',
  tags = [],
  maxTagsShown,
  footerLeft,
  footerRight,
  onClick,
}) {
  const visibleTags = maxTagsShown ? tags.slice(0, maxTagsShown) : tags;
  const overflow = maxTagsShown ? tags.length - maxTagsShown : 0;

  return (
    <ContentCard onClick={onClick}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <span className="text-xs font-mono text-slate-400 tracking-widest">
          {badgeId}
        </span>
        {status && <StatusBadge {...status} />}
        {pill && <CategoryPill {...pill} />}
      </div>

      <h3 className="text-lg font-serif font-bold text-slate-50 mb-2 group-hover:text-amber-400 transition-colors">
        {title}
      </h3>

      {metaLine && (
        <p className="text-amber-400/80 text-xs font-mono mb-3">
          {metaLine.label}:{' '}
          <span className="text-amber-300">{metaLine.value}</span>
        </p>
      )}

      <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
        {description}
      </p>

      {tags.length > 0 && (
        <div className="mb-4 pt-4 border-t border-slate-700/30">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">
            {tagsLabel}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-slate-800/50 text-slate-300 rounded border border-slate-700/30 group-hover:border-amber-500/30 transition-colors"
              >
                {tag}
              </span>
            ))}
            {overflow > 0 && (
              <span className="text-xs text-slate-500 px-2 py-1">
                +{overflow}
              </span>
            )}
          </div>
        </div>
      )}

      {(footerLeft || footerRight) && (
        <div className="flex justify-between items-center pt-2 border-t border-slate-700/20 mt-auto">
          <span className="text-xs text-slate-500 font-mono">{footerLeft}</span>
          <span className="text-xs text-slate-500 font-mono">{footerRight}</span>
        </div>
      )}
    </ContentCard>
  );
}
