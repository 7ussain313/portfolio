import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMapPin, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'
import { personal } from '../data/portfolioData'

const stats = [
  { end: 2, suffix: '+', label: 'Years of Training' },
  { end: 5, suffix: '+', label: 'Projects Built' },
  { end: 15, suffix: '+', label: 'Technologies' },
  { end: 2, suffix: '', label: 'Institutions' },
]

function AnimatedCounter({ end, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1500
    const step = Math.ceil(end / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])

  return <span ref={ref}>{count}{suffix}</span>
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function About() {
  return (
    <section id="about" className="section-pad max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase gradient-text">Who I Am</span>
        <h2 className="text-4xl md:text-5xl font-black mt-2 dark:text-white text-slate-900">
          About Me
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Avatar side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center gap-8"
        >
          {/* Avatar */}
          <div className="relative">
            <div className="w-52 h-52 rounded-3xl bg-gradient-to-br from-violet-600 to-cyan-400 p-1 rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full rounded-[22px] overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Hussain Ali"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -right-4 px-3 py-2 rounded-xl glass-card text-sm font-semibold dark:text-white text-slate-800 shadow-lg"
            >
              Full Stack Dev
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {stats.map(({ end, suffix, label }) => (
              <div key={label} className="glass-card p-4 text-center glow-hover transition-all duration-300 hover:border-violet-500/30 dark:hover:border-violet-500/30">
                <div className="text-3xl font-black gradient-text">
                  <AnimatedCounter end={end} suffix={suffix} />
                </div>
                <div className="text-xs dark:text-slate-400 text-slate-600 mt-1 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col gap-6"
        >
          <div>
            <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-4">
              Hey there! I'm{' '}
              <span className="gradient-text">Hussain Ali</span>
            </h3>
            <p className="dark:text-slate-400 text-slate-600 leading-relaxed text-base">
              {personal.bio}
            </p>
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 dark:text-slate-400 text-slate-600 text-sm">
              <FiMapPin size={16} className="text-violet-500 shrink-0" />
              {personal.location}
            </div>
            <div className="flex items-center gap-3 dark:text-slate-400 text-slate-600 text-sm">
              <FiMail size={16} className="text-violet-500 shrink-0" />
              <a href={`mailto:${personal.email}`} className="hover:text-violet-500 transition-colors">
                {personal.email}
              </a>
            </div>
            <div className="flex items-center gap-3 dark:text-slate-400 text-slate-600 text-sm">
              <FiGithub size={16} className="text-violet-500 shrink-0" />
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-violet-500 transition-colors">
                github.com/7ussain313
              </a>
            </div>
            <div className="flex items-center gap-3 dark:text-slate-400 text-slate-600 text-sm">
              <FiLinkedin size={16} className="text-violet-500 shrink-0" />
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-violet-500 transition-colors">
                linkedin.com/in/hussain-ali
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4 pt-2">
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105 transition-all duration-300 text-sm"
            >
              Hire Me
            </a>
            <a
              href={personal.cvUrl}
              download
              className="px-6 py-3 rounded-xl font-semibold text-sm dark:border-white/20 border-slate-300 border-2 dark:text-white text-slate-700 hover:border-violet-500 hover:text-violet-600 dark:hover:border-violet-400 dark:hover:text-violet-400 transition-all duration-300"
            >
              Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
