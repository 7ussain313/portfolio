import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiStar } from 'react-icons/fi'
import { projects } from '../data/portfolioData'

const categories = ['All', 'Featured', 'Full Stack', 'Mobile', 'Web', 'Systems', 'Java']

const cardAnim = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

export default function Projects() {
  const [active, setActive] = useState('All')

  const filtered = projects.filter(p => {
    if (active === 'All') return true
    if (active === 'Featured') return p.featured
    return p.category === active
  })

  return (
    <section id="projects" className="section-pad">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase gradient-text">What I've Built</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 dark:text-white text-slate-900">
            Projects
          </h2>
          <p className="mt-4 dark:text-slate-400 text-slate-600 max-w-xl mx-auto text-base">
            18 projects across web, mobile, systems programming, and more.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === cat
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/30 scale-105'
                  : 'dark:bg-white/[0.04] bg-slate-100 dark:text-slate-400 text-slate-600 dark:border-white/[0.08] border-slate-200 border hover:border-violet-400/40 dark:hover:border-violet-500/40'
              }`}
            >
              {cat}
              {cat === 'Featured' && <FiStar size={11} className="inline ml-1 mb-0.5" />}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                custom={i}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={cardAnim}
                layout
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="glass-card overflow-hidden glow-hover group flex flex-col relative"
              >
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-[10px] font-bold">
                    <FiStar size={9} /> Featured
                  </div>
                )}

                {/* Top gradient bar */}
                <div className={`h-1.5 bg-gradient-to-r ${project.accent}`} />

                <div className="p-5 flex flex-col flex-1">
                  {/* Meta */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold tracking-widest uppercase dark:text-slate-500 text-slate-400">
                      {project.institute}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${project.accent} bg-opacity-10 dark:text-slate-300 text-slate-600 dark:bg-white/5 bg-slate-100`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold dark:text-white text-slate-900 mb-2 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors leading-snug">
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
                  <div className="flex gap-3 pt-3 border-t dark:border-white/[0.06] border-slate-100">
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold dark:text-slate-400 text-slate-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                      >
                        <FiExternalLink size={13} /> Live Demo
                      </a>
                    ) : (
                      <span className="text-xs dark:text-slate-600 text-slate-400 font-medium">
                        Private Repo
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8 text-sm dark:text-slate-600 text-slate-400"
        >
          Showing {filtered.length} of {projects.length} projects
        </motion.p>
      </div>
    </section>
  )
}
