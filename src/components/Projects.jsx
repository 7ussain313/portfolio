import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { projects } from '../data/portfolioData'

const cardAnim = {
  hidden: { opacity: 0, y: 50 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function Projects() {
  return (
    <section id="projects" className="section-pad">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase gradient-text">What I've Built</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 dark:text-white text-slate-900">
            Projects
          </h2>
          <p className="mt-4 dark:text-slate-400 text-slate-600 max-w-xl mx-auto text-base">
            Real-world systems built during my training and university — more coming soon.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardAnim}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="glass-card overflow-hidden glow-hover group flex flex-col"
            >
              {/* Top gradient banner */}
              <div className={`h-2 bg-gradient-to-r ${project.accent}`} />

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Institute badge */}
                <span className="text-[10px] font-semibold tracking-widest uppercase dark:text-slate-500 text-slate-500 mb-3">
                  {project.institute}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold dark:text-white text-slate-900 mb-2 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed flex-1 mb-4">
                  {project.description}
                </p>

                {/* Tech stack */}
                {project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map(t => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md text-[11px] font-semibold dark:bg-white/[0.06] bg-slate-100 dark:text-slate-400 text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-3 mt-auto pt-2 border-t dark:border-white/[0.06] border-slate-100">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium dark:text-slate-400 text-slate-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                    >
                      <FiGithub size={14} /> Code
                    </a>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-medium dark:text-slate-600 text-slate-400 cursor-not-allowed">
                      <FiGithub size={14} /> Private
                    </span>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium dark:text-slate-400 text-slate-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                    >
                      <FiExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}

          {/* Placeholder card */}
          <motion.div
            custom={projects.length}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={cardAnim}
            className="glass-card p-6 flex flex-col items-center justify-center text-center min-h-[240px] border-dashed"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600/20 to-cyan-400/20 flex items-center justify-center mb-4 text-2xl">
              +
            </div>
            <p className="text-sm font-semibold dark:text-slate-400 text-slate-500">More projects coming soon</p>
            <p className="text-xs dark:text-slate-600 text-slate-400 mt-1">Currently in development</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
