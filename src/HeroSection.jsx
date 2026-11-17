import { Canvas } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { Model } from './Model'

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden">
      
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <Environment preset="city" />
          
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
            <Model position={[2.25, -0.8, 0]} scale={3.85} rotation={[0, -0.5, 0]}/>
          </Float>
        </Canvas>
      </div>

      {/* Foreground Hero Content Layer */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-24 pointer-events-none">
        <div className="max-w-2xl text-left pointer-events-auto">
          
          {/* Greeting */}
          <p className="text-gray-400 font-mono text-lg md:text-xl tracking-wide mb-2">
            Hi there, I'm
          </p>

          {/* Main Name */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Sanad Nassar
          </h1>

          {/* Subtitle / Bio */}
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 max-w-xl">
            I build and deploy full-stack applications, focusing on backend development and artifical intelligence.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
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