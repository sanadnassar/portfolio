import HeroSection from './HeroSection'
import Navbar from './Navbar'
import { useEffect } from 'react'

function App() {
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
        <Navbar />
        <HeroSection />
    </main>
  )
}

export default App