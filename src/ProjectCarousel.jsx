import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { PROJECTS_DATA, EXPERIENCE_DATA } from './projectsData'

export default function ProjectCarousel() {
  const [activeTab, setActiveTab] = useState('projects')
  const [currentIndex, setCurrentIndex] = useState(0)
  const stageRef = useRef(null)
  const isInView = useInView(stageRef, { once: true, amount: 0.2 })

  const items = activeTab === 'projects' ? PROJECTS_DATA : EXPERIENCE_DATA

  const handleTabChange = (tab) => {
    if (tab === activeTab) return
    setActiveTab(tab)
    setCurrentIndex(0)
  }

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % items.length)
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)

  const getCardPosition = (index) => {
    if (index === currentIndex) return 'active'
    if (index === (currentIndex - 1 + items.length) % items.length) return 'prev'
    if (index === (currentIndex + 1) % items.length) return 'next'
    return 'hidden'
  }

  const cardVariants = {
    active: { x: '0%', y: 0, scale: 1, opacity: 1, zIndex: 20, filter: 'none' },
    prev: { x: '-65%', y: 0, scale: 0.88, opacity: 0.45, zIndex: 10, filter: 'blur(1px)' },
    next: { x: '65%', y: 0, scale: 0.88, opacity: 0.45, zIndex: 10, filter: 'blur(1px)' },
    hidden: { y: 32, scale: 0.85, opacity: 0, zIndex: 0, filter: 'blur(10px)' },
    exit: { scale: 0.85, opacity: 0, zIndex: 0, filter: 'blur(10px)' },
  }

  return (
    <section className="relative w-full py-28 bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle Top Gradient Divider aligned with header padding */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full pl-8 md:pl-[200px] pr-8 md:pr-16 mb-20"
      >
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </motion.div>

      {/* Header anchored for Navbar clicks */}
      <motion.div
        id="projects"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full pl-8 md:pl-[200px] pr-8 md:pr-60 flex flex-col sm:flex-row sm:items-end justify-between mb-16 z-30 scroll-mt-24"
      >
        <div>
          {/* Interactive HUD Track Tabs */}
          <div className="inline-flex items-center gap-6 mb-5 border-b border-white/[0.08]">
            {['projects', 'experience'].map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`relative pb-2.5 text-[11px] font-mono uppercase tracking-[0.22em] transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {tab}
                  {isActive && (
                    <motion.span
                      layoutId="workCategoryLine"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute left-0 right-0 -bottom-px h-[1.5px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.85)]"
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex items-baseline ml-[-6px] gap-3">
            <h2 className="text-4xl md:text-5xl font-thin text-gray-300 tracking-tight">
              Recent
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Work
            </h2>
          </div>
        </div>

        {/* Minimalist Pill Navigation */}
        <div className="flex items-center gap-3 mt-6 sm:mt-0">
          <button
            onClick={handlePrev}
            aria-label="Previous item"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white hover:text-black transition-all flex items-center justify-center"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            aria-label="Next item"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white hover:text-black transition-all flex items-center justify-center"
          >
            →
          </button>
        </div>
      </motion.div>

      {/* Carousel Stage — uses useInView to animate cards directly without parent opacity */}
      <div
        ref={stageRef}
        className="relative w-full max-w-6xl h-[430px] flex items-center justify-center z-10 px-4"
      >
        <AnimatePresence mode="wait">
          {items.map((item, index) => {
            const position = getCardPosition(index)
            const isSideCard = position === 'prev' || position === 'next'

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? position : 'hidden'}
                exit="exit"
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => isSideCard && setCurrentIndex(index)}
                className={`absolute top-0 w-full max-w-2xl h-full select-none bg-zinc-900/60 backdrop-blur-md border border-white/15 rounded-2xl p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl ${
                  isSideCard ? 'cursor-pointer hover:border-white/25' : ''
                }`}
              >
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono text-gray-300">
                    {item.subtitle}
                  </span>
                  <span className="font-mono text-xs text-gray-500">
                    0{index + 1} / 0{items.length}
                  </span>
                </div>
                <div className="relative z-10 mb-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 font-mono text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="relative z-10 grid grid-cols-3 gap-3 p-4 mb-8 bg-black/40 border border-white/[0.07] rounded-xl">
                  {item.metrics.map((metric) => (
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
                    {item.tech.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {item.github && activeTab === 'projects' && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors shrink-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        </AnimatePresence>
      </div>
    </section>
  )
}