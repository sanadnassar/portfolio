import { useState } from 'react'
import { motion } from 'framer-motion'


const EMAIL = 'sanadnassar111@gmail.com'
const SOCIAL_LINKS = [
  { label: 'GITHUB', href: 'https://github.com/sanadnassar' },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/sanadnassar' },
  { label: 'RESUME', href: './resume.pdf' },
]

export default function ContactSection({ onOpenResume }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative w-full pt-36 md:pt-64 pb-6 bg-black flex flex-col items-center overflow-hidden scroll-mt-24"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center px-6 mb-12"
        >
          <div className="inline-flex items-center gap-2.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-[0.2em]">
              Open to Opportunities
            </span>
          </div>
          <div className="flex items-baseline gap-3 mb-4">
            <h2 className="text-4xl md:text-6xl font-thin text-gray-300 tracking-tight">
              Get in
            </h2>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Touch
            </h2>
          </div>

          <p className="max-w-md text-sm font-mono text-zinc-500 leading-relaxed">
            Have a role, project, or opportunity in mind? Feel free to reach out to me!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl px-4"
        >
          <div className="select-text cursor-text w-full bg-zinc-900/60 backdrop-blur-xl border border-white/15 hover:border-white/25 transition-colors duration-300 rounded-2xl sm:rounded-full p-2.5 sm:pl-7 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl">
            <span className="cursor-text selection:bg-white selection:text-black font-mono text-sm md:text-base text-gray-200 tracking-wide py-2 sm:py-0">
              {EMAIL}
            </span>
            <div className="select-none flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopy}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl sm:rounded-full bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/30 text-xs font-mono text-gray-200 transition-all duration-200"
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
              <a
                href={`mailto:${EMAIL}`}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl sm:rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-mono font-medium transition-colors duration-200 inline-flex items-center justify-center"
              >
                Send Email
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 w-full mt-16 flex flex-col md:flex-row items-center justify-center gap-6 px-6 md:px-10"
      >
        <div className="flex items-center justify-center gap-10 sm:gap-16">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              onClick={link.label === 'RESUME' ? onOpenResume : undefined}
              className="group relative pb-2.5 border-b border-white/[0.08] text-xs font-mono text-zinc-400 hover:text-white tracking-[0.22em] transition-colors duration-300"
            >
              <span>{link.label}</span>
              <span className="absolute left-0 right-0 -bottom-px h-[1.5px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.85)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ))}
        </div>
        <div className="md:absolute md:right-10 flex items-center gap-3 text-[11px] font-mono text-zinc-600 tracking-wider">
          <a
            href="https://github.com/sanadnassar/portfolio"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-300 transition-colors duration-200"
          >
            SOURCE CODE ↗
          </a>
          <span className="text-zinc-800">/</span>
          <span>© {new Date().getFullYear()} SANAD NASSAR</span>
        </div>
      </motion.div>
    </section>
  )
}