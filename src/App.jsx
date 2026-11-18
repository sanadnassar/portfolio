import { useState, useEffect } from 'react'
import HeroSection from './HeroSection'
import Navbar from './Navbar'
import ProjectCarousel from './ProjectCarousel'
import SkillsSection from './SkillsSection'

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
    const handleSelectStart = () => document.body.classList.add('selecting-text')
    const handleMouseUp = () => document.body.classList.remove('selecting-text')

    document.addEventListener('selectstart', handleSelectStart)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('selectstart', handleSelectStart)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <main className="bg-black min-h-screen">
      <Navbar visible={uiVisible} />
      <HeroSection
        uiVisible={uiVisible}
        onRevealUI={() => setUiVisible(true)}
      />
      <ProjectCarousel />
      <SkillsSection />
    </main>
  )
}

export default App