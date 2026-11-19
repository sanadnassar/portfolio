import { useState, useEffect } from 'react'
import HeroSection from './HeroSection'
import Navbar from './Navbar'
import ProjectCarousel from './ProjectCarousel'
import SkillsSection from './SkillsSection'
import ContactSection from './ContactSection'

function App() {
  const [uiVisible, setUiVisible] = useState(false)

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

  return (
    <main className="bg-black min-h-screen select-none cursor-default">
      <Navbar visible={uiVisible} />
      <HeroSection
        uiVisible={uiVisible}
        onRevealUI={() => setUiVisible(true)}
      />
      <ProjectCarousel />
      <SkillsSection />
      <ContactSection />
    </main>
  )
}

export default App