import { Canvas } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { Model } from './Model'

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden">
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

      <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-24 pointer-events-none">
        <div className="max-w-2xl text-left pointer-events-auto">

          <p className="text-gray-400 font-mono text-sm md:text-base tracking-wide mb-2">
            Hi there, I'm
          </p>

          <div className="flex flex-col mb-5">
            <h1 className="text-5xl md:text-[120px] ml-[-16px] font-light font-thin tracking-tight text-gray-300">
              Sanad
            </h1>
            <h1 className="text-5xl md:text-[120px] mt-[-18px] -ml-[10px] font-bold tracking-tight text-white">
              Nassar
            </h1>
          </div>

          <div className="inline-flex items-center px-3 py-1.5 mb-2 ml[-2px] rounded-none bg-white/5 border border-white/10 text-xs font-mono text-gray-400 backdrop-blur-sm">
            CS & SOFTWARE ENGINEERING
          </div>

          <p className="text-gray-400 w-[470px] font-mono text-sm md:text-base tracking-wide mb-3">
            I build and deploy full-stack applications, focusing on backend development and artificial intelligence. I'm currently studying Computer Science at Western University.
          </p>
          
          <div className="flex flex-wrap items-center ml-[-6px] gap-4">
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