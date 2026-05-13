import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import blogsData from '../data/blogs.json';

const categoryColors = {
  'AI Agents': 'from-amber-500 to-orange-500',
  'Backend Systems': 'from-blue-500 to-cyan-500',
  'LLM Fundamentals': 'from-purple-500 to-pink-500',
  'Systems Design': 'from-emerald-500 to-teal-500',
  'AI Fundamentals': 'from-indigo-500 to-blue-500',
  'Debugging': 'from-red-500 to-orange-500',
  'Tooling': 'from-fuchsia-500 to-rose-500',
  'Model Releases': 'from-sky-500 to-violet-500',
};

const getCategoryGradient = (category) =>
  categoryColors[category] || 'from-slate-400 to-slate-500';

function hostOf(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

// Strip the trailing "## References" section from the markdown body
// so we can render it as a custom designed component using article.sources.
function splitContent(content) {
  if (!content) return { body: '', refsMarkdown: '' };
  const idx = content.search(/\n#{1,3}\s+References\s*\n/i);
  if (idx === -1) return { body: content, refsMarkdown: '' };
  return {
    body: content.slice(0, idx).trimEnd(),
    refsMarkdown: content.slice(idx).trim(),
  };
}

// Turn inline [N] citations into clickable anchors that jump to #ref-N.
// Skip occurrences that are part of a markdown link "[text](url)".
function linkifyCitations(text) {
  return text.replace(/\[(\d+)\](?!\()/g, (_m, n) => `[\\[${n}\\]](#ref-${n})`);
}

// Markdown component overrides — styled to match the portfolio aesthetic.
const mdComponents = {
  h1: ({ children }) => (
    <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold text-white mt-12 mb-6 tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif text-xl sm:text-2xl md:text-4xl font-bold text-white mt-10 sm:mt-14 mb-4 sm:mb-5 tracking-tight relative pb-3 before:absolute before:bottom-0 before:left-0 before:h-px before:w-12 sm:before:w-16 before:bg-gradient-to-r before:from-amber-400 before:to-transparent">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-white mt-8 sm:mt-10 mb-3 sm:mb-4 tracking-tight">
      <span className="text-amber-400 mr-2 font-normal">§</span>
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-serif text-base sm:text-lg md:text-xl font-semibold text-slate-100 mt-6 sm:mt-8 mb-3">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-slate-300 text-[0.975rem] sm:text-[1.0625rem] leading-[1.8] sm:leading-[1.85] mb-5 sm:mb-6">{children}</p>
  ),
  a: ({ href, children }) => {
    const isCitation = typeof href === 'string' && href.startsWith('#ref-');
    if (isCitation) {
      return (
        <a
          href={href}
          className="inline-flex items-baseline align-super text-[0.7rem] font-semibold text-amber-400 hover:text-amber-300 no-underline px-[3px] -ml-[1px] rounded-sm hover:bg-amber-400/10 transition-colors"
        >
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-amber-400 hover:text-amber-300 underline decoration-amber-400/30 hover:decoration-amber-300 underline-offset-[3px] transition-colors"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="my-6 space-y-2.5 pl-1 [&>li]:relative [&>li]:pl-6 text-slate-300 text-[1.0625rem] leading-[1.85]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 space-y-2.5 pl-1 list-decimal list-inside marker:text-amber-400 marker:font-semibold text-slate-300 text-[1.0625rem] leading-[1.85]">
      {children}
    </ol>
  ),
  li: ({ children, ordered }) =>
    ordered ? (
      <li className="pl-2">{children}</li>
    ) : (
      <li className="before:content-[''] before:absolute before:left-0 before:top-[0.85em] before:w-2 before:h-px before:bg-amber-400/70">
        {children}
      </li>
    ),
  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  em: ({ children }) => <em className="text-slate-100 italic">{children}</em>,
  code: ({ inline, className, children }) => {
    const text = String(children).replace(/\n$/, '');
    if (inline) {
      return (
        <code className="font-mono text-[0.9em] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-200 border border-amber-400/20">
          {text}
        </code>
      );
    }
    const lang = (className || '').replace('language-', '');
    return (
      <div className="my-7 group">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border border-b-0 border-slate-700/50 rounded-t-lg">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></span>
          </div>
          {lang && (
            <span className="text-[0.65rem] font-mono uppercase tracking-widest text-slate-500">
              {lang}
            </span>
          )}
        </div>
        <pre className="bg-slate-950/80 border border-slate-700/50 rounded-b-lg overflow-x-auto p-4 text-sm leading-relaxed font-mono text-slate-200 m-0">
          <code className={className}>{text}</code>
        </pre>
      </div>
    );
  },
  pre: ({ children }) => <>{children}</>,
  blockquote: ({ children }) => (
    <blockquote className="my-7 pl-5 pr-4 py-3 border-l-2 border-amber-400/60 bg-amber-400/[0.03] rounded-r-lg italic text-slate-200">
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="my-12 h-px border-0 bg-gradient-to-r from-transparent via-slate-700/70 to-transparent" />
  ),
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-900/40">
      <table className="w-full text-sm text-left border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-slate-800/60 text-slate-100 [&_th]:font-semibold [&_th]:tracking-wide">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 border-b border-slate-700/50 text-xs uppercase tracking-widest text-amber-300/90">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 border-b border-slate-800/70 text-slate-300 align-top">
      {children}
    </td>
  ),
  img: ({ src, alt }) => (
    <img src={src} alt={alt} className="my-8 rounded-xl border border-slate-700/40" />
  ),
};

function References({ sources }) {
  if (!sources || sources.length === 0) return null;
  return (
    <section className="mt-12">
      <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-slate-700/40">
        <h2 className="font-serif text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
          References
        </h2>
        <span className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-slate-500">
          {sources.length} {sources.length === 1 ? 'source' : 'sources'}
        </span>
      </div>
      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {sources.map((s, i) => {
          const n = i + 1;
          return (
            <li
              key={s.url || n}
              id={`ref-${n}`}
              className="scroll-mt-28 group"
            >
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 px-2.5 py-2 rounded-md hover:bg-slate-800/40 border border-transparent hover:border-slate-700/50 transition-colors no-underline"
              >
                <span
                  aria-hidden
                  className="flex-shrink-0 font-mono text-[0.7rem] font-semibold text-amber-400/90 group-hover:text-amber-300 mt-[3px] tabular-nums"
                >
                  [{n}]
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.8125rem] leading-snug text-slate-200 group-hover:text-amber-300 transition-colors line-clamp-2">
                    {s.title}
                  </span>
                  <span className="block text-[0.65rem] font-mono text-slate-500 group-hover:text-slate-400 mt-0.5 truncate">
                    {hostOf(s.url)}
                  </span>
                </span>
                <svg
                  className="w-3 h-3 flex-shrink-0 mt-1 text-slate-600 group-hover:text-amber-400 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-9 9M19 14v5H5V5h5" />
                </svg>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = blogsData.find(blog => blog.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { bodyMd, hasInlineRefs } = useMemo(() => {
    if (!article) return { bodyMd: '', hasInlineRefs: false };
    const { body } = splitContent(article.content || '');
    return {
      bodyMd: linkifyCitations(body),
      hasInlineRefs: /\[\d+\](?!\()/.test(body),
    };
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Article Not Found</h1>
          <motion.button
            onClick={() => navigate('/#blog')}
            className="px-6 py-3 bg-amber-500 text-slate-950 font-medium rounded-lg hover:bg-amber-400"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Blog
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-50 min-h-screen relative overflow-hidden pt-24 pb-20">
      {/* Background elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, delay: 2 }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/#blog')}
          className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors mb-12"
          whileHover={{ x: -4 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7 7l-7-7 7-7" />
          </svg>
          Back to Blog
        </motion.button>

        {/* Article Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full text-white bg-gradient-to-r ${getCategoryGradient(article.category)}`}>
              {article.category}
            </span>
            <span className="text-sm text-slate-400">
              {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-300">{article.author}</span>
            </div>
            <span>•</span>
            <span>{article.readTime} min read</span>
            <span>•</span>
            <span>{article.tags.length} topics</span>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-3xl">
            {article.excerpt}
          </p>
        </motion.div>

        {/* Article Tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {article.tags.map(tag => (
            <span key={tag} className="text-sm bg-slate-800/50 text-slate-300 px-4 py-2 rounded-full border border-slate-700/50">
              #{tag}
            </span>
          ))}
        </motion.div>

        {/* Article Content */}
        <motion.article
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-slate-700/40 rounded-2xl p-7 md:p-12">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {bodyMd}
            </ReactMarkdown>

            {/* References — rendered from structured sources when available */}
            {article.sources && article.sources.length > 0 && (
              <References sources={article.sources} />
            )}
          </div>

          {hasInlineRefs && article.sources && (
            <p className="text-center text-xs text-slate-500 mt-4 font-mono tracking-wider">
              ↑ click any [n] in the text to jump to its source
            </p>
          )}
        </motion.article>

        {/* Article Footer */}
        <motion.div
          className="border-t border-slate-800 pt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-slate-700/40 rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-950">SA</span>
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-white">{article.author}</h3>
                <p className="text-sm text-slate-400">AI/ML Engineer • System Designer</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              Full-stack engineer passionate about building intelligent systems at scale. Specializing in AI agents, microservices architecture, and production systems.
            </p>
            <motion.button
              className="px-6 py-3 bg-amber-500 text-slate-950 font-medium rounded-lg hover:bg-amber-400 transition-all"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              Follow Author
            </motion.button>
          </div>
        </motion.div>

        {/* Related Articles */}
        <motion.div
          className="mt-20 pt-12 border-t border-slate-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-serif font-bold mb-8">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogsData
              .filter(b => b.id !== article.id)
              .slice(0, 2)
              .map(relatedArticle => (
                <motion.button
                  key={relatedArticle.id}
                  onClick={() => navigate(`/article/${relatedArticle.id}`)}
                  className="text-left group bg-gradient-to-br from-slate-800/20 to-slate-900/20 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6 hover:border-amber-400/50 transition-all"
                  whileHover={{
                    borderColor: 'rgba(245, 158, 11, 0.5)',
                    boxShadow: '0 0 30px rgba(245, 158, 11, 0.08)',
                    y: -4,
                  }}
                >
                  <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${getCategoryGradient(relatedArticle.category)} inline-block mb-4`}>
                    {relatedArticle.category}
                  </span>
                  <h3 className="text-lg font-serif font-bold mb-2 leading-tight text-white group-hover:text-amber-400 transition-colors">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-sm text-slate-300 font-light line-clamp-2">
                    {relatedArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-4 pt-4 border-t border-slate-700/30">
                    <span>{relatedArticle.readTime} min read</span>
                    <span className="text-amber-400">Read →</span>
                  </div>
                </motion.button>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
