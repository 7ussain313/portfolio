import { motion } from 'framer-motion'
import { skillGroups } from '../data/portfolioData'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

const pillAnim = {
  hidden: { opacity: 0, scale: 0.8 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.05 },
  }),
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase gradient-text">What I Know</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 dark:text-white text-slate-900">
            Skills & Technologies
          </h2>
          <p className="mt-4 dark:text-slate-400 text-slate-600 max-w-xl mx-auto text-base">
            A full-spectrum toolkit — from low-level systems programming to modern frontend frameworks.
          </p>
        </motion.div>

        {/* Skill groups grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              custom={gi}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className="glass-card p-6 glow-hover transition-all duration-300 group"
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-lg shadow-lg`}>
                  {group.icon}
                </div>
                <h3 className="font-bold dark:text-white text-slate-900">{group.label}</h3>
              </div>

              {/* Skills pills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    custom={si}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={pillAnim}
                    className="px-3 py-1 rounded-lg text-xs font-semibold dark:bg-white/[0.06] bg-slate-100 dark:text-slate-300 text-slate-700 dark:border-white/[0.06] border-slate-200 border dark:hover:border-violet-500/50 hover:border-violet-400/50 dark:hover:text-violet-300 hover:text-violet-700 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
