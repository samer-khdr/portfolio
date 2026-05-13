import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogsData from '../data/blogs.json';

export default function Blog() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = ['All', ...new Set(blogsData.map(blog => blog.category))];

  const filteredBlogs = selectedCategory && selectedCategory !== 'All'
    ? blogsData.filter(blog => blog.category === selectedCategory)
    : blogsData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const categoryColors = {
    'AI Agents': 'from-amber-500 to-orange-500',
    'Backend Systems': 'from-blue-500 to-cyan-500',
    'LLM Fundamentals': 'from-purple-500 to-pink-500',
    'Systems Design': 'from-emerald-500 to-teal-500',
    'AI Fundamentals': 'from-indigo-500 to-blue-500',
    'Debugging': 'from-red-500 to-orange-500',
  };

  const getCategoryGradient = (category) => {
    return categoryColors[category] || 'from-slate-400 to-slate-500';
  };

  return (
    <section id="blog" className="py-20 px-6 relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute top-40 right-0 w-96 h-96 bg-amber-500/3 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/3 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, delay: 2 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="h-1 w-12 bg-gradient-to-r from-amber-500 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
            <span className="text-sm font-semibold uppercase tracking-widest text-amber-400">
              Insights & Ideas
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight">
            Blog & Articles
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
            Exploring AI, systems design, and the intersection of modern software engineering. Thoughts on building intelligent systems at scale.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category === 'All' ? null : category)}
              variants={itemVariants}
              className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                (!selectedCategory && category === 'All') || selectedCategory === category
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Blog */}
        {filteredBlogs.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden p-8 md:p-12 hover:border-amber-400/30 transition-all"
              whileHover={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.1)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white bg-gradient-to-r ${getCategoryGradient(filteredBlogs[0].category)}`}>
                    {filteredBlogs[0].category}
                  </span>
                  <span className="text-xs text-slate-400">Featured</span>
                </div>

                <h3 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight text-white group-hover:text-amber-400 transition-colors">
                  {filteredBlogs[0].title}
                </h3>

                <p className="text-lg text-slate-300 mb-6 font-light leading-relaxed max-w-3xl">
                  {filteredBlogs[0].excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {filteredBlogs[0].tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-slate-400">
                  <div className="flex gap-4">
                    <span>{filteredBlogs[0].readTime} min read</span>
                    <span>•</span>
                    <span>{new Date(filteredBlogs[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <motion.button
                    onClick={() => navigate(`/article/${filteredBlogs[0].id}`)}
                    className="px-6 py-2 bg-amber-500 text-slate-950 font-medium rounded-lg hover:bg-amber-400 transition-all"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read Article
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredBlogs.slice(1).map((blog) => (
            <motion.article
              key={blog.id}
              onClick={() => navigate(`/article/${blog.id}`)}
              variants={itemVariants}
              className="group relative bg-gradient-to-br from-slate-800/20 to-slate-900/20 backdrop-blur-sm border border-slate-700/40 rounded-xl overflow-hidden p-6 hover:border-amber-400/50 transition-all cursor-pointer"
              whileHover={{
                borderColor: 'rgba(245, 158, 11, 0.5)',
                boxShadow: '0 0 30px rgba(245, 158, 11, 0.08)',
                y: -4,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-4">
                  <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${getCategoryGradient(blog.category)}`}>
                    {blog.category}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold mb-3 leading-tight text-white group-hover:text-amber-400 transition-colors flex-grow">
                  {blog.title}
                </h3>

                <p className="text-sm text-slate-300 mb-4 font-light line-clamp-2">
                  {blog.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {blog.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs bg-slate-700/30 text-slate-400 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                  {blog.tags.length > 2 && (
                    <span className="text-xs text-slate-500 px-2 py-1">+{blog.tags.length - 2}</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-700/30">
                  <span>{blog.readTime} min read</span>
                  <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filteredBlogs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-slate-400 text-lg">No articles in this category yet.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
