import { motion } from 'framer-motion';
import projectsData from '../data/projects.json';
import SectionTitle from './SectionTitle';
import ResourceCard from './ResourceCard';

const STATUS_BY_ID = {
  1: { text: 'DEPLOYED', color: 'text-emerald-400' },
  2: { text: 'DEPLOYED', color: 'text-emerald-400' },
  3: { text: 'DEPLOYED', color: 'text-emerald-400' },
  4: { text: 'RESEARCH', color: 'text-blue-400' },
  5: { text: 'SHIPPED', color: 'text-amber-400' },
};

export default function Projects() {
  const { projects } = projectsData;

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
          <SectionTitle title="Work" subtitle="Projects and systems I've built and shipped." />
        </motion.div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {projects.map((project) => {
            const status = STATUS_BY_ID[project.id] ?? {
              text: 'SHIPPED',
              color: 'text-amber-400',
            };
            return (
              <ResourceCard
                key={project.id}
                badgeId={`AGT-${String(project.id).padStart(3, '0')}`}
                status={{ ...status, pulse: true }}
                title={project.title}
                metaLine={project.company ? { label: 'ENV', value: project.company } : undefined}
                description={project.description}
                tagsLabel="Capabilities"
                tags={project.tags}
                footerLeft={`DEPLOYED: ${project.year}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
