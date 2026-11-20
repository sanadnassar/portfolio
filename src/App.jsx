import { useState, useEffect } from 'react'
import HeroSection from './HeroSection'
import Navbar from './Navbar'
import ProjectCarousel from './ProjectCarousel'
import SkillsSection from './SkillsSection'
import ContactSection from './ContactSection'
import ResumeModal from './ResumeModal'


function App() {
  const [uiVisible, setUiVisible] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!uiVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [uiVisible])

  const handleOpenResume = (e) => {
    if (window.innerWidth >= 768) {
      e.preventDefault()
      setIsResumeOpen(true)
    }
  }

  return (
    <main className="bg-black min-h-screen select-none cursor-default">
      <Navbar visible={uiVisible} onOpenResume={handleOpenResume} />
      <HeroSection
        uiVisible={uiVisible}
        onRevealUI={() => setUiVisible(true)}
      />
      <ProjectCarousel />
      <SkillsSection />
      <ContactSection onOpenResume={handleOpenResume} />
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </main>
  )
}

export default App