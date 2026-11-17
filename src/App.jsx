import { useState, useEffect } from 'react'
import HeroSection from './HeroSection'
import Navbar from './Navbar'

function App() {
  const [uiVisible, setUiVisible] = useState(false)

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
    </main>
  )
}

export default App