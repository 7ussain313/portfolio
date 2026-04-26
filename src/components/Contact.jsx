import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import { personal } from '../data/portfolioData'

const contactItems = [
  { icon: FiMail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  { icon: FiGithub, label: 'GitHub', value: 'github.com/7ussain313', href: personal.github },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/hussain-ali', href: personal.linkedin },
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
    <section id="contact" className="section-pad">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase gradient-text">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 dark:text-white text-slate-900">
            Contact Me
          </h2>
          <p className="mt-4 dark:text-slate-400 text-slate-600 max-w-md mx-auto text-base">
            Have a project in mind or just want to connect? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="glass-card p-8 flex flex-col gap-6 h-full">
              <div>
                <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-2">
                  Let's work together
                </h3>
                <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed">
                  I'm currently available for freelance work and open to full-time opportunities. Let's build something great together.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-400/20 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-violet-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider dark:text-slate-500 text-slate-400">{label}</p>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm dark:text-slate-300 text-slate-700 hover:text-violet-500 dark:hover:text-violet-400 transition-colors break-all">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm dark:text-slate-300 text-slate-700">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-8 flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold dark:text-slate-400 text-slate-600 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="px-4 py-3 rounded-xl text-sm dark:bg-white/[0.04] bg-slate-50 dark:border-white/[0.08] border-slate-200 border dark:text-white text-slate-900 dark:placeholder-slate-600 placeholder-slate-400 focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold dark:text-slate-400 text-slate-600 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="px-4 py-3 rounded-xl text-sm dark:bg-white/[0.04] bg-slate-50 dark:border-white/[0.08] border-slate-200 border dark:text-white text-slate-900 dark:placeholder-slate-600 placeholder-slate-400 focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold dark:text-slate-400 text-slate-600 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's it about?"
                  className="px-4 py-3 rounded-xl text-sm dark:bg-white/[0.04] bg-slate-50 dark:border-white/[0.08] border-slate-200 border dark:text-white text-slate-900 dark:placeholder-slate-600 placeholder-slate-400 focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold dark:text-slate-400 text-slate-600 uppercase tracking-wider">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project or idea..."
                  className="px-4 py-3 rounded-xl text-sm dark:bg-white/[0.04] bg-slate-50 dark:border-white/[0.08] border-slate-200 border dark:text-white text-slate-900 dark:placeholder-slate-600 placeholder-slate-400 focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors resize-none"
                />
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <div className="flex items-center gap-2 text-sm text-emerald-500 dark:text-emerald-400">
                  <FiCheckCircle size={16} /> Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-sm text-rose-500 dark:text-rose-400">
                  <FiAlertCircle size={16} /> Something went wrong. Please try emailing me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:shadow-xl hover:shadow-violet-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              >
                {status === 'loading' ? (
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : (
                  <FiSend size={16} />
                )}
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
