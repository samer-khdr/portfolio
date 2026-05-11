import { motion } from 'framer-motion';
import aboutData from '../data/about.json';
import skillsData from '../data/skills.json';

export default function About() {
  const { bio, bio2, languages } = aboutData;
  const { skillCategories } = skillsData;
  return (
    <section
      id="about"
      className="py-32 px-6 bg-slate-950"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">
              About
            </h2>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-amber-500 to-transparent"
              animate={{ width: [0, 80, 80] }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                {bio}
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                {bio2}
              </p>
            </div>

            <div className="space-y-6">
              {skillCategories.map((category, idx) => (
                <div key={idx}>
                  <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wide mb-3">
                    {category.category}
                  </h3>
                  <p className="text-slate-300">
                    {category.skills.join(', ')}
                  </p>
                </div>
              ))}
              <div>
                <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wide mb-3">
                  Languages
                </h3>
                <p className="text-slate-300">
                  {languages.map((lang) => `${lang.language} (${lang.proficiency})`).join(', ')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
