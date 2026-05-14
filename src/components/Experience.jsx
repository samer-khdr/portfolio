import { motion } from 'framer-motion';
import experienceData from '../data/experience.json';
import SectionTitle from './SectionTitle';

export default function Experience() {
  const { experience } = experienceData;

  const versionMap = {
    1: 'v4.0',
    2: 'v3.0',
    3: 'v2.0',
    4: 'v1.0',
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="experience" className="py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <SectionTitle title="Experience" subtitle="My professional journey and roles." />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8 relative"
        >
          {/* Timeline line (desktop) */}
          <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/30 via-slate-700/30 to-slate-800/30" />

          {experience.map((exp, idx) => {
            const version = versionMap[exp.id];
            const isActive = idx === 0;

            return (
              <motion.article
                key={exp.id}
                variants={itemVariants}
                className="relative"
              >
                <div className="sm:pl-20 flex gap-4 sm:gap-0">
                  {/* Timeline node (desktop) */}
                  <div className="hidden sm:flex sm:absolute left-6 top-1.5 items-center justify-center">
                    <motion.div
                      className={`w-4 h-4 rounded-full border-2 ${
                        isActive
                          ? 'border-amber-400 bg-amber-400/20'
                          : 'border-slate-600 bg-slate-800'
                      }`}
                      animate={
                        isActive
                          ? {
                              scale: [1, 1.3, 1],
                              boxShadow: [
                                '0 0 0 0 rgba(251, 146, 60, 0)',
                                '0 0 0 6px rgba(251, 146, 60, 0.3)',
                                '0 0 0 0 rgba(251, 146, 60, 0)',
                              ],
                            }
                          : {}
                      }
                      transition={
                        isActive ? { duration: 2, repeat: Infinity } : {}
                      }
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 p-6 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-slate-900/60 border-amber-500/60 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-900/45 border-amber-500/35 hover:border-amber-500/50 hover:bg-slate-900/55'
                    }`}
                  >
                    {/* Version Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono text-amber-400 font-bold tracking-widest">
                        {version}
                      </span>
                      {isActive && (
                        <span className="text-xs font-mono text-emerald-400">
                          ACTIVE
                        </span>
                      )}
                    </div>

                    {/* Position */}
                    <h3 className="text-lg font-serif font-bold text-slate-50 mb-2">
                      {exp.position}
                    </h3>

                    {/* Meta row */}
                    <div className="text-xs text-slate-400 font-mono space-y-1 mb-3 pb-3 border-b border-slate-700/20">
                      <div>
                        ENV: <span className="text-amber-400">{exp.company}</span>
                      </div>
                      <div>
                        UPTIME:{' '}
                        <span className="text-slate-300">{exp.duration}</span>
                      </div>
                      <div>
                        LOC: <span className="text-slate-300">{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Capabilities */}
                    <div>
                      <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">
                        Capabilities
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.keySkills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-2 py-1 bg-slate-800/50 text-slate-300 rounded border border-slate-700/30 hover:border-amber-500/30 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
