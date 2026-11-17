import { useState } from 'react'
import { motion } from 'framer-motion'
import { PROJECTS_DATA } from './projectsData'

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % PROJECTS_DATA.length)
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length)

  const getCardPosition = (index) => {
    if (index === currentIndex) return 'active'
    if (index === (currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length) return 'prev'
    if (index === (currentIndex + 1) % PROJECTS_DATA.length) return 'next'
    return 'hidden'
  }

  const cardVariants = {
    active: { x: '0%', scale: 1, opacity: 1, zIndex: 20, filter: 'blur(0px)' },
    prev: { x: '-65%', scale: 0.88, opacity: 0.35, zIndex: 10, filter: 'blur(2px)' },
    next: { x: '65%', scale: 0.88, opacity: 0.35, zIndex: 10, filter: 'blur(2px)' },
    hidden: { x: '0%', scale: 0.7, opacity: 0, zIndex: 0, filter: 'blur(4px)' },
  }

  return (
    <section
      id="projects"
      className="relative w-full py-28 bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-20"
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-6xl px-8 flex flex-col sm:flex-row sm:items-end justify-between mb-16 z-30"
      >
        <div className="ml-[-80px]">
          <div className="inline-block px-3 py-1 mb-4 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400">
            ENGINEERING
          </div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-300 tracking-tight">
              Recent
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Projects
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6 sm:mt-0">
          <button
            onClick={handlePrev}
            aria-label="Previous project"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white hover:text-black transition-all flex items-center justify-center"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            aria-label="Next project"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white hover:text-black transition-all flex items-center justify-center"
          >
            →
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-6xl h-[430px] flex items-center justify-center z-10 px-4"
      >
        {PROJECTS_DATA.map((project, index) => {
          const position = getCardPosition(index)
          const isSideCard = position === 'prev' || position === 'next'

          return (
            <motion.div
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              animate={position}
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => isSideCard && setCurrentIndex(index)}
              className={`absolute top-0 w-full max-w-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl ${
                isSideCard ? 'cursor-pointer hover:border-white/20' : ''
              }`}
            >
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono text-gray-300">
                  {project.subtitle}
                </span>
                <span className="font-mono text-xs text-gray-500">
                  0{index + 1} / 0{PROJECTS_DATA.length}
                </span>
              </div>
              <div className="relative z-10 mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="relative z-10 grid grid-cols-3 gap-3 p-4 mb-8 bg-black/40 border border-white/[0.07] rounded-xl">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1">
                      {metric.label}
                    </span>
                    <span className="text-sm font-medium text-white truncate">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors shrink-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.6c0 5.77 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 9.5 18v4" />
                      <path d="M9 20c-5 1.5-5-2.5-7-3" />
                    </svg>
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}