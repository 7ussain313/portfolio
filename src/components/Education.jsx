import { motion } from 'framer-motion'
import { education } from '../data/portfolioData'

export default function Education() {
  return (
    <section id="education" className="section-pad">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase gradient-text">My Journey</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 dark:text-white text-slate-900">
            Education & Training
          </h2>
          <p className="mt-4 dark:text-slate-400 text-slate-600 text-base max-w-lg mx-auto">
            Two parallel paths — formal university education and intensive hands-on engineering training.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ originY: 0 }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-600 via-purple-500 to-cyan-400 md:-translate-x-0.5"
          />

          <div className="flex flex-col gap-12">
            {education.map((item, i) => {
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Mobile line dot */}
                  <div className="md:hidden relative z-10 shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center text-xl shadow-lg shadow-violet-500/30">
                      {item.icon}
                    </div>
                  </div>

                  {/* Desktop: left content or spacer */}
                  <div className={`hidden md:flex md:w-1/2 ${isEven ? 'pr-12 justify-end' : 'pl-12 justify-start'}`}>
                    {isEven ? (
                      <EducationCard item={item} />
                    ) : (
                      <div />
                    )}
                  </div>

                  {/* Desktop: center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center text-xl shadow-lg shadow-violet-500/30"
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* Desktop: right content or spacer */}
                  <div className={`hidden md:flex md:w-1/2 ${isEven ? 'pl-12 justify-start' : 'pr-12 justify-end'}`}>
                    {!isEven ? (
                      <EducationCard item={item} />
                    ) : (
                      <div />
                    )}
                  </div>

                  {/* Mobile: card */}
                  <div className="md:hidden flex-1">
                    <EducationCard item={item} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function EducationCard({ item }) {
  return (
    <div className="glass-card p-6 max-w-sm w-full glow-hover transition-all duration-300">
      <span className="text-[10px] font-semibold tracking-widest uppercase text-violet-500 dark:text-violet-400">
        {item.period}
      </span>
      <h3 className="text-base font-bold dark:text-white text-slate-900 mt-1 mb-1">
        {item.degree}
      </h3>
      <p className="text-sm font-semibold dark:text-slate-300 text-slate-700 mb-3">
        {item.institution}
      </p>
      <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed">
        {item.description}
      </p>
    </div>
  )
}
