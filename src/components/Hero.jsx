import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi'
import { personal } from '../data/portfolioData'

function useTypewriter(text, speed = 75, startDelay = 1400) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const delay = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(delay)
  }, [startDelay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [started, text, speed])

  return displayed
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
}

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

const socials = [
  { icon: FiGithub, href: personal.github, label: 'GitHub' },
  { icon: FiLinkedin, href: personal.linkedin, label: 'LinkedIn' },
  { icon: FiMail, href: `mailto:${personal.email}`, label: 'Email' },
]

export default function Hero() {
  const typed = useTypewriter('Full Stack Developer')

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 dark:bg-[#0d0d1a] bg-slate-50" />

        {/* Orbs */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-cyan-400/20 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-purple-500/10 blur-[80px]"
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 dark:opacity-[0.035] opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #7c3aed 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div variants={item} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium dark:border-violet-500/30 border-violet-300 dark:bg-violet-500/10 bg-violet-50 dark:text-violet-300 text-violet-700 border">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 dark:text-white text-slate-900 leading-none"
        >
          Hussain Ali
        </motion.h1>

        {/* Title — typewriter */}
        <motion.div variants={item} className="mb-6 h-10 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-semibold gradient-text">
            {typed}
          </span>
          <span className="ml-0.5 w-[3px] h-8 bg-violet-500 rounded-full animate-pulse inline-block" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {personal.tagline} Based in{' '}
          <span className="dark:text-slate-300 text-slate-700 font-medium">Bahrain</span>.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:shadow-xl hover:shadow-violet-500/30 hover:scale-105 transition-all duration-300"
          >
            View My Work
          </a>
          <a
            href={personal.cvUrl}
            download
            className="px-8 py-3 rounded-full font-semibold flex items-center gap-2 dark:border-white/20 border-slate-300 border-2 dark:text-white text-slate-700 hover:border-violet-500 hover:text-violet-600 dark:hover:border-violet-400 dark:hover:text-violet-400 hover:scale-105 transition-all duration-300"
          >
            <FiDownload size={16} />
            Download CV
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div variants={item} className="flex items-center justify-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 rounded-full flex items-center justify-center dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200 border dark:text-slate-400 text-slate-600 hover:text-violet-500 dark:hover:text-violet-400 dark:hover:bg-white/10 hover:bg-violet-50 hover:scale-110 transition-all duration-300"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </motion.div>

    </section>
  )
}
