import { motion } from 'framer-motion';
import projectsData from '../data/projects.json';

export default function Projects() {
  const { projects } = projectsData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const statusMap = {
    1: { text: 'DEPLOYED', color: 'text-emerald-400' },
    2: { text: 'DEPLOYED', color: 'text-emerald-400' },
    3: { text: 'DEPLOYED', color: 'text-emerald-400' },
    4: { text: 'RESEARCH', color: 'text-blue-400' },
    5: { text: 'SHIPPED', color: 'text-amber-400' },
  };

  return (
    <section id="work" className="py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">
            Work
          </h2>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-amber-500 to-transparent"
            animate={{ width: [0, 80, 80] }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <p className="text-slate-400 text-sm mt-4">
            Projects and systems I've built and shipped.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 grid-cols-1 md:grid-cols-2"
        >
          {projects.map((project) => {
            const status = statusMap[project.id];
            return (
              <motion.article
                key={project.id}
                variants={cardVariants}
                className="group relative"
                whileHover={{ y: -4 }}
              >
                {/* Card container */}
                <div className="bg-slate-900/50 border border-amber-500/40 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-amber-500/80 group-hover:bg-slate-900/70 group-hover:shadow-lg group-hover:shadow-amber-500/10">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <span className="text-xs font-mono text-slate-400 tracking-widest">
                        AGT-{String(project.id).padStart(3, '0')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.span
                        className="inline-block w-2 h-2 rounded-full bg-emerald-500"
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className={`text-xs font-mono font-semibold ${status.color}`}>
                        {status.text}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-serif font-bold text-slate-50 mb-2 group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Company */}
                  {project.company && (
                    <p className="text-amber-400/80 text-xs font-mono mb-3">
                      ENV: <span className="text-amber-300">{project.company}</span>
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Capabilities Section */}
                  <div className="mb-4 pt-4 border-t border-slate-700/30">
                    <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">
                      Capabilities
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-slate-800/50 text-slate-300 rounded border border-slate-700/30 group-hover:border-amber-500/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-700/20">
                    <span className="text-xs text-slate-500 font-mono">
                      DEPLOYED: {project.year}
                    </span>
                  </div>
                </div>

                {/* Left border accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500/0 via-amber-500/30 to-amber-500/0 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
