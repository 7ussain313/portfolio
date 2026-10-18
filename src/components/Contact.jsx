import { useState, useRef } from 'react'
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import { personal } from '../data/portfolioData'

const contactItems = [
  { icon: FiMail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  { icon: FiGithub, label: 'GitHub', value: 'github.com/7ussain313', href: personal.github },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/hussainali04', href: personal.linkedin },
  { icon: FiMapPin, label: 'Location', value: personal.location, href: null },
]

export default function Contact() {
  const formRef = useRef()
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      // EmailJS not configured — open default mail client as fallback
      const mailto = `mailto:${personal.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`
      window.location.href = mailto
      setStatus('idle')
      return
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey })
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <span className="label">Get In Touch</span>
        <h2 className="ct-title"><span className="pearl-text">Contact</span> <em className="serif" style={{ color: 'var(--accent)' }}>Me</em></h2>
        <p className="lead">Have a project in mind or just want to connect? My inbox is always open.</p>

        <div className="ct-grid">
          <div className="ct-card">
            <h3>Let's work together</h3>
            <p className="ct-sub">I'm currently available for freelance work and open to full-time opportunities. Let's build something great together.</p>
            <ul className="ct-list">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <span className="ct-ic"><Icon size={16} /></span>
                  <div>
                    <span className="label">{label}</span>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer">{value}</a>
                    ) : (
                      <p>{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="ct-card ct-form">
            <div className="ct-row">
              <div className="ct-field">
                <label htmlFor="contact-name">Name</label>
                <input type="text" id="contact-name" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
              </div>
              <div className="ct-field">
                <label htmlFor="contact-email">Email</label>
                <input type="email" id="contact-email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
              </div>
            </div>
            <div className="ct-field">
              <label htmlFor="contact-subject">Subject</label>
              <input type="text" id="contact-subject" name="subject" value={form.subject} onChange={handleChange} required placeholder="What's it about?" />
            </div>
            <div className="ct-field">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell me about your project or idea..." />
            </div>

            {status === 'success' && (
              <p className="ct-status ok" role="status"><FiCheckCircle size={16} /> Message sent successfully! I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="ct-status bad" role="alert"><FiAlertCircle size={16} /> Something went wrong. Please try emailing me directly.</p>
            )}

            <button type="submit" disabled={status === 'loading'} className="btn btn-hot">
              <FiSend size={16} />
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
