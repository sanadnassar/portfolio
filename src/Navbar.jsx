export default function Navbar({ visible }) {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 flex items-center justify-center px-8 md:px-16 py-6 backdrop-blur-md bg-black/30 transition-all duration-1000 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}
    >
      <nav className="hidden md:flex items-center space-x-8 tracking-widest text-zinc-400 font-medium text-[11px]">
        <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
        <a href="#projects" className="hover:text-white transition-colors">PROJECTS</a>
        <a href="#skills" className="hover:text-white transition-colors">SKILLS</a>
        <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
        <a href="/Sanad_Nassar_Resume.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
          RESUME
          <svg className="w-3 h-3 opacity-60 mb-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
          </svg>
        </a>
      </nav>
    </header>
  )
}