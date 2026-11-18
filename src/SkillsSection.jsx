import { motion } from 'framer-motion'

const BENTO_ASYMMETRIC = [
  {
    title: 'LANGUAGES',
    subtitle: 'Core systems & logic',
    skills: ['C++17', 'Python', 'Java 11/17/21', 'SQL', 'Bash / Zsh'],
    span: 'md:col-span-4'
  },
  {
    title: 'LIBRARIES & FRAMEWORKS',
    subtitle: 'Runtime, computation & vision pipelines',
    skills: ['React', 'Three.js / R3F', 'Qt 6', 'OpenCV', 'MediaPipe', 'Pandas', 'NumPy', 'Qiskit', 'PySCF', 'Tailwind CSS'],
    span: 'md:col-span-8'
  },
  {
    title: 'INFRASTRUCTURE & DATA',
    subtitle: 'Deployment, containers & persistence',
    skills: ['Docker', 'Docker Compose', 'PostgreSQL', 'Apache Maven', 'JUnit', 'REST APIs'],
    span: 'md:col-span-8'
  },
  {
    title: 'ENVIRONMENT',
    subtitle: 'OS, shell & IDE toolchain',
    skills: ['Linux (Ubuntu)', 'WSL', 'Git', 'GitHub', 'CLion', 'IntelliJ IDEA'],
    span: 'md:col-span-4'
  }
]

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full min-h-screen bg-black py-32 px-6 md:px-16 lg:px-24 flex flex-col justify-center items-center relative overflow-hidden">
      
      {/* Background ambient glow matching carousel style */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.3em]">
              Index // Architecture
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
            Technical Stack.
          </h2>
        </motion.div>

        {/* Asymmetrical Bento Grid using Exact Project Card Classes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {BENTO_ASYMMETRIC.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${group.span} bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 shadow-2xl relative overflow-hidden`}
            >
              {/* Optional ambient light reflection matching carousel card accents */}
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

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

                {/* Pill Tags matching Project Carousel tech stack pills exactly */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300 group-hover:border-white/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Footer Divider matching Project Carousel divider style */}
              <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <span>Status: Active</span>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-white transition-colors" />
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}