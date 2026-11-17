import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations, Center, Resize } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Model(props) {
  const groupRef = useRef()
  const targetRef = useRef()
  const mousePos = useRef({ x: 0, y: 0 })

  const { scene, animations } = useGLTF('/model.glb')
  const { actions, names } = useAnimations(animations, groupRef)

  // 1. Track mouse coordinates across the window
  useEffect(() => {
    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      mousePos.current = { x, y }
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  // 2. Inspect the new GLB hierarchy & play built-in animations if any exist
  useEffect(() => {
    let foundHead = null
    console.group('New model.glb Hierarchy')
    scene.traverse((child) => {
      if (child.name) {
        console.log(`${child.type}: "${child.name}"`)
      }
      // Automatically hook onto the Head node if the model has one named "Head"
      if (!foundHead && /head/i.test(child.name)) {
        foundHead = child
      }
    })
    console.groupEnd()

    targetRef.current = foundHead || groupRef.current

    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().fadeIn(0.5).play()
    }
  }, [scene, actions, names])

  // 3. Smoothly rotate toward the cursor every frame
  useFrame(() => {
    const activeTarget = targetRef.current || groupRef.current
    if (!activeTarget) return

    if (activeTarget.rotation.order !== 'YXZ') {
      activeTarget.rotation.order = 'YXZ'
    }

    const pointerX = mousePos.current.x
    const pointerY = mousePos.current.y

    const targetY = pointerX < 0 ? pointerX * 0.6 : pointerX * 0.35
    const targetX = -(pointerY * 0.35)

    activeTarget.rotation.y = THREE.MathUtils.lerp(activeTarget.rotation.y, targetY, 0.1)
    activeTarget.rotation.x = THREE.MathUtils.lerp(activeTarget.rotation.x, targetX, 0.1)
  })

  return (
    <group {...props} dispose={null}>
      <group ref={groupRef}>
        <Resize scale={3.2}>
          <Center>
            <primitive object={scene} />
          </Center>
        </Resize>
      </group>
    </group>
  )
}

useGLTF.preload('/model.glb')