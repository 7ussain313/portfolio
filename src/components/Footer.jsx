import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'
import { personal } from '../data/portfolioData'

const links = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact']

const socials = [
  { icon: FiGithub, href: personal.github, label: 'GitHub' },
  { icon: FiLinkedin, href: personal.linkedin, label: 'LinkedIn' },
  { icon: FiMail, href: `mailto:${personal.email}`, label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="dark:border-t dark:border-white/[0.06] border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a href="#home" className="text-xl font-black">
              <span className="gradient-text">H.Ali</span>
            </a>
            <p className="text-sm dark:text-slate-500 text-slate-500 mt-1">Full Stack Developer · Bahrain</p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-5">
            {links.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm dark:text-slate-500 text-slate-500 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center dark:bg-white/5 bg-slate-100 dark:border-white/[0.08] border-slate-200 border dark:text-slate-500 text-slate-500 hover:text-violet-500 dark:hover:text-violet-400 hover:scale-110 transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 dark:border-t dark:border-white/[0.04] border-t border-slate-100 text-center">
          <p className="text-xs dark:text-slate-600 text-slate-400 flex items-center justify-center gap-1">
            Built with <FiHeart size={11} className="text-rose-500" /> by Hussain Ali · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
