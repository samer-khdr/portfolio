import { motion } from 'framer-motion';
import aboutData from '../data/about.json';
import skillsData from '../data/skills.json';
import SectionTitle from './SectionTitle';

export default function About() {
  const { bio, bio2, languages } = aboutData;
  const { skillCategories } = skillsData;
  return (
    <section
      id="about"
      className="py-32 px-6 bg-slate-950"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="mb-12">
            <SectionTitle title="About" />
          </div>

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
