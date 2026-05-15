import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogsData from '../data/blogs.json';
import SectionTitle from './SectionTitle';
import ResourceCard from './ResourceCard';

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
    'Tooling': 'from-fuchsia-500 to-rose-500',
    'Model Releases': 'from-sky-500 to-violet-500',
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

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            eyebrow="Insights & Ideas"
            title="Blog & Articles"
            subtitle="Exploring AI, systems design, and the intersection of modern software engineering. Thoughts on building intelligent systems at scale."
            subtitleSize="lg"
          />
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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <ResourceCard
              key={blog.id}
              badgeId={`ART-${String(blog.id).padStart(3, '0')}`}
              pill={{ text: blog.category, gradient: getCategoryGradient(blog.category) }}
              title={blog.title}
              description={blog.excerpt}
              tagsLabel="Topics"
              tags={blog.tags}
              maxTagsShown={3}
              footerLeft={`${blog.readTime} MIN READ`}
              footerRight={new Date(blog.date)
                .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                .toUpperCase()}
              onClick={() => navigate(`/article/${blog.id}`)}
            />
          ))}
        </div>

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
