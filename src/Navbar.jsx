export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-center px-8 md:px-16 py-6 border-b border-white/10 backdrop-blur-md bg-black/30">
      <nav className="hidden md:flex items-center space-x-8 tracking-widest text-gray-400 font-medium text-[11px]">
        <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
        <a href="#skills" className="hover:text-white transition-colors">SKILLS</a>
        <a href="#experience" className="hover:text-white transition-colors">EXPERIENCE</a>
        <a href="#projects" className="hover:text-white transition-colors">PROJECTS</a>
        <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
      </nav>
    </header>
  )
}