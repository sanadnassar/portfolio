import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer, useProgress } from '@react-three/drei'
import * as THREE from 'three'
import { Model } from './Model'

const END_POS = new THREE.Vector3(0, 0, 5.5)
const END_LOOK = new THREE.Vector3(0, 0, 0)

function CameraIntroRig({ started, onRevealUI }) {
  const elapsed = useRef(0)
  const revealed = useRef(false)
  const calibrated = useRef(false)
  const startPos = useRef(new THREE.Vector3(1.75, 0.58, 0.25))
  const startLook = useRef(new THREE.Vector3(1.75, 0.58, 0))
  const currentPos = useRef(new THREE.Vector3(1.75, 0.58, 0.25))
  const currentLookAt = useRef(new THREE.Vector3(1.75, 0.58, 0))

  useFrame((state, delta) => {
    if (!calibrated.current) {
      state.scene.updateMatrixWorld(true)
      const robotBox = new THREE.Box3()
      state.scene.traverse((obj) => {
        if (obj.isMesh) robotBox.expandByObject(obj)
      })

      if (!robotBox.isEmpty()) {
        const robotSize = new THREE.Vector3()
        robotBox.getSize(robotSize)

        const headBox = new THREE.Box3()
        const meshBox = new THREE.Box3()
        const meshCenter = new THREE.Vector3()

        state.scene.traverse((obj) => {
          if (obj.isMesh) {
            meshBox.setFromObject(obj)
            meshBox.getCenter(meshCenter)
            if (meshCenter.y > robotBox.max.y - robotSize.y * 0.22) {
              headBox.union(meshBox)
            }
          }
        })

        const targetBox = headBox.isEmpty() ? robotBox : headBox
        const headCenter = new THREE.Vector3()
        targetBox.getCenter(headCenter)

        // Park 0.025 units in front of the visor center so only the dark center fills the screen
        startPos.current.set(headCenter.x, headCenter.y + 0.02, targetBox.max.z + 0.025)
        startLook.current.set(headCenter.x, headCenter.y + 0.02, headCenter.z)
        currentPos.current.copy(startPos.current)
        currentLookAt.current.copy(startLook.current)
        calibrated.current = true
      }
    }

    if (!started || !calibrated.current) {
      state.scene.environmentIntensity = 0
      state.camera.position.copy(startPos.current)
      state.camera.lookAt(startLook.current)
      return
    }

    elapsed.current = Math.min(elapsed.current + Math.min(delta, 0.05), 4.0)
    const t = elapsed.current

    // Hold pure black for 0.45s, then zoom out smoothly over 3.1s
    const raw = THREE.MathUtils.clamp((t - 0.45) / 1.5, 0, 1)
    const ease =
      raw < 0.5
        ? 4 * raw * raw * raw
        : 1 - Math.pow(-2 * raw + 2, 3) / 2

    // Fade studio softbox reflections in from 0 -> 1 as the camera begins pulling back
    state.scene.environmentIntensity = THREE.MathUtils.smoothstep(raw, 0.0, 0.35)

    if (raw >= 0.58 && !revealed.current) {
      revealed.current = true
      onRevealUI()
    }

    currentPos.current.lerpVectors(startPos.current, END_POS, ease)
    currentLookAt.current.lerpVectors(startLook.current, END_LOOK, ease)

    state.camera.position.copy(currentPos.current)
    state.camera.lookAt(currentLookAt.current)
  })

  return null
}

export default function HeroSection({ uiVisible, onRevealUI }) {
  const { progress } = useProgress()
  const [zoomStarted, setZoomStarted] = useState(false)

  useEffect(() => {
    if (progress === 100) {
      setZoomStarted(true)
    }
  }, [progress])

  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [1.75, 0.58, 0.35], fov: 42, near: 0.01 }}>
          <CameraIntroRig
            started={zoomStarted}
            onRevealUI={onRevealUI}
          />

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

      {/* Foreground Hero Content Layer */}
      <div className="relative z-10 h-full flex flex-col justify-start px-8 md:px-24 pt-[20vh] pointer-events-none">
        <div className="max-w-2xl text-left pointer-events-auto">
          <p
            style={{ animationDelay: '0ms' }}
            className={`text-gray-400 font-mono text-sm md:text-base tracking-wide mb-2 ${
              uiVisible ? 'animate-hero-up' : 'opacity-0'
            }`}
          >
            Hi there, I'm
          </p>

          <div
            style={{ animationDelay: '120ms' }}
            className={`flex flex-col mb-5 ${uiVisible ? 'animate-hero-up' : 'opacity-0'}`}
          >
            <h1 className="text-5xl md:text-[120px] ml-[-16px] font-thin tracking-tight text-gray-300">
              Sanad
            </h1>
            <h1 className="text-5xl md:text-[120px] mt-[-18px] -ml-[10px] font-bold tracking-tight text-white">
              Nassar
            </h1>
          </div>

          <div
            style={{ animationDelay: '240ms' }}
            className={`inline-flex items-center px-3 py-1.5 mb-2 ml-[-2px] rounded-none bg-white/5 border border-white/10 text-xs font-mono text-gray-400 backdrop-blur-sm ${
              uiVisible ? 'animate-hero-up' : 'opacity-0'
            }`}
          >
            CS & SOFTWARE ENGINEERING
          </div>

          <p
            style={{ animationDelay: '340ms' }}
            className={`text-gray-400 max-w-[470px] font-mono text-sm md:text-base tracking-wide mb-3 ${
              uiVisible ? 'animate-hero-up' : 'opacity-0'
            }`}
          >
            I build and deploy full-stack applications, focusing on backend development and artificial intelligence. I'm currently studying Computer Science at Western University.
          </p>

          <div
            style={{ animationDelay: '440ms' }}
            className={`flex flex-wrap items-center ml-[-6px] gap-4 ${
              uiVisible ? 'animate-hero-up' : 'opacity-0'
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