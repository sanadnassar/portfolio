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
        <a href="#projects" className="hover:text-white transition-colors">EXPERIENCE</a>
        <a href="#skills" className="hover:text-white transition-colors">SKILLS</a>
        <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
      </nav>
    </header>
  )
}