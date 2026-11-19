import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

const BENTO_ASYMMETRIC = [
  {
    title: 'LANGUAGES',
    subtitle: 'Core systems & logic',
    skills: ['Python', 'Java', 'C', 'C++', 'Assembly', 'Bash', 'SQL', 'JavaScript', 'HTML', 'CSS'],
    span: 'md:col-span-5',
  },
  {
    title: 'FRAMEWORKS & LIBRARIES',
    subtitle: 'Technologies I\'ve worked with',
    skills: ['React', 'Next.js', 'Flask', 'Tailwind CSS', 'OpenCV', 'MediaPipe', 'Pandas', 'NumPy', 'Qiskit', 'PySCF', 'Scikit-learn', 'Matplotlib', 'PyoDBC', 'Streamlit', 'XlsxWriter', 'JDBC', 'Mockito', 'Pytorch'],
    span: 'md:col-span-7',
  },
  {
    title: 'RELEVANT COURSEWORK',
    subtitle: 'Honors CS & Software Engineering | 3.9 GPA',
    skills: [
      'Data Structures & Algorithms',
      'Object-Oriented Design',
      'Operating Systems',
      'Database Management Systems',
      'Software Engineering',
      'Computer Networks',
      'Theory of Computation',
      'Computer Architecture',
      'Discrete Mathematics',
    ],
    span: 'md:col-span-8',
  },
  {
    title: 'INFRASTRUCTURE & DATA',
    subtitle: 'Deployment, containers & persistence',
    skills: ['Docker', 'Docker Compose', 'PostgreSQL', 'Apache Maven', 'JUnit', 'REST APIs'],
    span: 'md:col-span-4',
  },
  
]

function SkillCard({ group, index }) {
  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.09), transparent 80%)`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className={`${group.span} select-none bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col justify-between group hover:border-white/25 transition-colors duration-300 shadow-2xl relative overflow-hidden`}
    >
      {/* 1. Ambient drifting glow (moves slowly on its own) */}
      <motion.div
        animate={{
          x: ['-15%', '55%', '20%', '-15%'],
          y: ['-15%', '25%', '50%', '-15%'],
        }}
        transition={{
          duration: 14 + index * 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-24 -left-24 w-72 h-72 bg-white/[0.045] rounded-full blur-3xl pointer-events-none z-0"
      />

      {/* 2. Interactive cursor-tracking spotlight */}
      <motion.div
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 w-full h-full rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-[0.2em] mb-1">
              {group.title}
            </h3>
            <p className="text-[11px] font-light text-zinc-500">
              {group.subtitle}
            </p>
          </div>
          <span className="font-mono text-xs text-zinc-600">0{index + 1}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-white/15 hover:text-white hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  return (
    <section className="relative w-full py-28 bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background ambient glow matching carousel style */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Top Gradient Divider aligned with header padding */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full pl-8 md:pl-[200px] pr-8 md:pr-16 mb-20"
      >
        <div id="skills" className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </motion.div>

      {/* Section Header matching ProjectCarousel header alignment */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full pl-8 md:pl-[200px] pr-8 md:pr-16 mb-16 z-30 scroll-mt-24"
      >
        <div className="flex items-baseline gap-3">
          <h2 className="text-4xl md:text-5xl font-thin text-gray-300 tracking-tight">
            Technical
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Skills
          </h2>
        </div>
      </motion.div>

      {/* Bento Grid Container matching max-w-6xl structure */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-6xl px-4 md:px-6 z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {BENTO_ASYMMETRIC.map((group, index) => (
            <SkillCard key={group.title} group={group} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}