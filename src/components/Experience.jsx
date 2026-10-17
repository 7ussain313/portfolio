import { motion } from 'framer-motion'
import { FiBriefcase } from 'react-icons/fi'
import { experience } from '../data/portfolioData'

export default function Experience() {
  return (
    <section id="experience" className="section-pad">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase gradient-text">Where I've Worked</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 dark:text-white text-slate-900">
            Experience
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {experience.map((job, i) => (
            <motion.article
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center text-white shrink-0">
                    <FiBriefcase size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold dark:text-white text-slate-900 leading-snug">{job.role}</h3>
                    <p className="text-sm font-semibold dark:text-slate-300 text-slate-700">
                      {job.company} · {job.location}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold tracking-widest uppercase text-violet-500 dark:text-violet-400 md:pt-1 shrink-0">
                  {job.period}
                </span>
              </div>
              <ul className="list-disc pl-5 flex flex-col gap-2 text-sm dark:text-slate-400 text-slate-600 leading-relaxed">
                {job.points.map(point => <li key={point}>{point}</li>)}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
