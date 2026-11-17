import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, Lightformer, useProgress } from '@react-three/drei'
import { Model } from './Model'

export default function HeroSection() {
  const { progress } = useProgress()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setIsReady(true), 250)
      return () => clearTimeout(timer)
    }
  }, [progress])

  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Minimal Monochrome Page Loader Curtain */}
      <div
        className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity duration-700 ${
          isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="w-40 h-[1px] bg-white/15 overflow-hidden mb-3">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>
        <span className="font-loader font-light tabular-nums text-base tracking-[0.2em] text-zinc-300">
          {Math.round(progress)}%
        </span>
      </div>

      {/* 3D Scene Layer (Fades smoothly out of black once ready) */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-out ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Canvas camera={{ position: [0, 0, 5.5], fov: 42 }}>
          <ambientLight intensity={0.35} />

          {/* Pure white/silver key & rim lights */}
          <directionalLight position={[-5, 5, 4]} intensity={3} color="#ffffff" />
          <directionalLight position={[5, 5, 4]} intensity={3} color="#ffffff" />
          <directionalLight position={[0, 6, -5]} intensity={4} color="#f8fafc" />

          {/* Studio Softboxes */}
          <Environment resolution={512}>
            <Lightformer form="rect" intensity={5} color="#ffffff" position={[0, 7, 1]} rotation={[Math.PI / 2.2, 0, 0]} scale={[8, 1.2, 1]} />
            <Lightformer form="rect" intensity={4.5} color="#f8fafc" position={[-6, 0, 1]} rotation={[0, Math.PI / 2.3, 0]} scale={[6, 10, 1]} />
            <Lightformer form="rect" intensity={4.5} color="#f8fafc" position={[6, 0, 1]} rotation={[0, -Math.PI / 2.3, 0]} scale={[6, 10, 1]} />
            <Lightformer form="rect" intensity={2.5} color="#e2e8f0" position={[0, -5, 2]} rotation={[-Math.PI / 2.5, 0, 0]} scale={[8, 4, 1]} />
          </Environment>

          <Float speed={1.8} rotationIntensity={0.05} floatIntensity={0.18}>
            <Model position={[1.75, -1.1, 0]} rotation={[0, -0.3, 0]} />
          </Float>
        </Canvas>
      </div>

      {/* Foreground Hero Content Layer (Staggered Reveal) */}
      <div className="relative z-10 h-full flex flex-col justify-start px-8 md:px-24 pt-[20vh] pointer-events-none">
        <div className="max-w-2xl text-left pointer-events-auto">
          <p
            style={{ animationDelay: '100ms' }}
            className={`text-gray-400 font-mono text-sm md:text-base tracking-wide mb-2 ${
              isReady ? 'animate-hero-up' : 'opacity-0'
            }`}
          >
            Hi there, I'm
          </p>

          <div
            style={{ animationDelay: '220ms' }}
            className={`flex flex-col mb-5 ${isReady ? 'animate-hero-up' : 'opacity-0'}`}
          >
            <h1 className="text-5xl md:text-[120px] ml-[-16px] font-thin tracking-tight text-gray-300">
              Sanad
            </h1>
            <h1 className="text-5xl md:text-[120px] mt-[-18px] -ml-[10px] font-bold tracking-tight text-white">
              Nassar
            </h1>
          </div>

          <div
            style={{ animationDelay: '340ms' }}
            className={`inline-flex items-center px-3 py-1.5 mb-2 ml-[-2px] rounded-none bg-white/5 border border-white/10 text-xs font-mono text-gray-400 backdrop-blur-sm ${
              isReady ? 'animate-hero-up' : 'opacity-0'
            }`}
          >
            CS & SOFTWARE ENGINEERING
          </div>

          <p
            style={{ animationDelay: '440ms' }}
            className={`text-gray-400 max-w-[470px] font-mono text-sm md:text-base tracking-wide mb-3 ${
              isReady ? 'animate-hero-up' : 'opacity-0'
            }`}
          >
            I build and deploy full-stack applications, focusing on backend development and artificial intelligence. I'm currently studying Computer Science at Western University.
          </p>

          <div
            style={{ animationDelay: '540ms' }}
            className={`flex flex-wrap items-center ml-[-6px] gap-4 ${
              isReady ? 'animate-hero-up' : 'opacity-0'
            }`}
          >
            <a
              href="#projects"
              className="px-6 py-3 bg-white text-black font-medium text-sm rounded-full hover:bg-gray-200 transition-all flex items-center group"
            >
              View My Work
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-white/10 text-white border border-white/20 font-medium text-sm rounded-full hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}