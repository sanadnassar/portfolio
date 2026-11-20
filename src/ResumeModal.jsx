import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


const RESUME_URL = '/resume.pdf'

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl h-[88vh] bg-zinc-950/90 backdrop-blur-xl border border-white/15 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
              <span className="text-xs font-mono text-zinc-400 tracking-[0.18em] uppercase">
                Sanad_Nassar_Resume.pdf
              </span>

              <div className="flex items-center gap-2.5">
                <a
                  href={RESUME_URL}
                  download="Sanad_Nassar_Resume.pdf"
                  className="px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-mono font-medium transition-colors duration-200"
                >
                  Download PDF
                </a>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/25 text-xs font-mono text-gray-200 transition-all duration-200"
                >
                  New Tab ↗
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="ml-1 w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-zinc-400 hover:text-white text-xs font-mono flex items-center justify-center transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 w-full bg-zinc-900">
              <iframe
                src={`${RESUME_URL}#toolbar=0&navpanes=0`}
                title="Sanad Nassar Resume"
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}