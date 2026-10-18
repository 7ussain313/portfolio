import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'
import { personal } from '../data/portfolioData'

const links = [
  ['Home', '#top'],
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['Terminal', '#terminal'],
  ['Archive', '#archive'],
  ['Stack', '#stack'],
  ['Contact', '#contact'],
]

const socials = [
  { icon: FiGithub, href: personal.github, label: 'GitHub' },
  { icon: FiLinkedin, href: personal.linkedin, label: 'LinkedIn' },
  { icon: FiMail, href: `mailto:${personal.email}`, label: 'Email' },
]

export default function Footer() {
  return (
    <div className="site-foot">
      <div className="wrap">
        <svg className="serrate" aria-hidden="true" preserveAspectRatio="none"><rect width="100%" height="16" fill="url(#tooth)" /></svg>
        <div className="sf-row">
          <div>
            <a href="#top" className="sf-brand">H.Ali<span style={{ color: 'var(--accent)' }}>.</span></a>
            <p className="mono">Full-Stack Developer · Bahrain</p>
          </div>
          <nav aria-label="Footer">
            {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          </nav>
          <div className="sf-soc">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target={label !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer" aria-label={label}>
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
        <p className="sf-end mono">Built with <FiHeart size={11} style={{ color: 'var(--accent)' }} /> by Hussain Ali · {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}
