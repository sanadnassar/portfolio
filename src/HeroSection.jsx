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

      {/* Foreground UI Layer */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-24 pointer-events-none">
        <div className="max-w-2xl text-left">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Sanad Nassar
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Honors Computer Science & Software Engineering. Architecting scalable systems, AI-driven applications, and interactive digital experiences.
          </p>
        </div>
      </div>
      
    </section>
  )
}