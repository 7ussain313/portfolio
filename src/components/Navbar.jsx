import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX, FiGithub } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'
import { personal } from '../data/portfolioData'

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact']

export default function Navbar() {
  const { isDark, setIsDark } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.35, rootMargin: '-80px 0px -40% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'dark:bg-[#0d0d1a]/80 bg-white/80 backdrop-blur-2xl shadow-lg dark:shadow-black/30 dark:border-b dark:border-white/[0.06] border-b border-slate-200/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="text-xl font-black tracking-tight">
          <span className="gradient-text">H.Ali</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => {
            const isActive = active === link.toLowerCase()
            return (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-violet-500 dark:text-violet-400'
                    : 'dark:text-slate-400 text-slate-600 hover:text-violet-500 dark:hover:text-violet-400'
                }`}
              >
                {link}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex w-9 h-9 rounded-full items-center justify-center dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200 border dark:text-slate-400 text-slate-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
          >
            <FiGithub size={16} />
          </a>

          <button
            onClick={() => setIsDark(!isDark)}
            className="w-9 h-9 rounded-full flex items-center justify-center dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200 border dark:text-slate-400 text-slate-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200 border dark:text-slate-400 text-slate-600"
            aria-label="Menu"
          >
            {menuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden dark:bg-[#0d0d1a]/95 bg-white/95 backdrop-blur-2xl border-b dark:border-white/[0.06] border-slate-200/60"
          >
            <nav className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-1">
              {navLinks.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 px-3 rounded-lg text-sm font-medium dark:text-slate-400 text-slate-600 hover:text-violet-500 dark:hover:text-violet-400 hover:dark:bg-white/5 hover:bg-violet-50 transition-all"
                >
                  {link}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
