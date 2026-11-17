import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Model(props) {
  const { nodes, materials } = useGLTF('/model.glb')
  const headRef = useRef()

  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      mousePos.current = { x, y }
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useFrame(() => {
    if (!headRef.current) return

    if (headRef.current.rotation.order !== 'YXZ') {
      headRef.current.rotation.order = 'YXZ'
    }

    const pointerX = mousePos.current.x
    const pointerY = mousePos.current.y

    const targetY = pointerX < 0 ? pointerX * 0.7 : pointerX * 0.3
    const targetX = -(pointerY * 0.4)

    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetY, 0.1)
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetX, 0.1)
  })

  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.237, 0.145]}>
        
        {/* STATIC BASE: Black glossy neck and shoulders stay locked in place */}
        <mesh geometry={nodes.Object_5.geometry} material={materials['Material.Black']} />

        {/* ROTATING HEAD: Pivots smoothly on top of the neck */}
        <group ref={headRef}>
          <group position={[0.018, 0.112, 0.033]}>
            <group position={[-0.056, -0.034, 0.038]} rotation={[1.098, 0.024, 0.082]} scale={0.004}>
              <mesh geometry={nodes.Object_13.geometry} material={materials.sy_cutter} />
              <mesh geometry={nodes.Object_15.geometry} material={materials.sy_dark_annodized_shiny} position={[0, -0.355, 0]} />
            </group>
            <group position={[-0.038, 0.049, -0.064]} rotation={[0.105, 0.024, 0.082]} scale={0.004}>
              <mesh geometry={nodes.Object_17.geometry} material={materials.sy_cutter} />
              <mesh geometry={nodes.Object_19.geometry} material={materials.sy_dark_annodized_shiny} position={[0, -0.355, 0]} />
            </group>
            <group position={[-0.012, 0.052, -0.064]} rotation={[0.105, 0.024, 0.082]} scale={0.004}>
              <mesh geometry={nodes.Object_21.geometry} material={materials.sy_cutter} />
              <mesh geometry={nodes.Object_23.geometry} material={materials.sy_dark_annodized_shiny} position={[0, -0.355, 0]} />
            </group>
            <mesh geometry={nodes.Object_9.geometry} material={materials['Material.001']} />
            <mesh geometry={nodes.Object_10.geometry} material={materials['Material.Black']} />
            <mesh geometry={nodes.Object_11.geometry} material={materials.sy_cutter} />
          </group>

          <group position={[-0.001, -0.003, 0.002]}>
            <group position={[-0.04, -0.008, 0.061]} rotation={[1.698, 0.262, 1.111]} scale={0.004}>
              <mesh geometry={nodes.Object_28.geometry} material={materials.sy_cutter} />
              <mesh geometry={nodes.Object_30.geometry} material={materials.sy_dark_annodized_shiny} position={[0, -0.355, 0]} />
            </group>
            <group position={[-0.043, 0.018, 0.064]} rotation={[1.698, 0.262, 1.111]} scale={0.004}>
              <mesh geometry={nodes.Object_32.geometry} material={materials.sy_cutter} />
              <mesh geometry={nodes.Object_34.geometry} material={materials.sy_dark_annodized_shiny} position={[0, -0.827, 0]} />
            </group>
            <group position={[-0.053, -0.03, 0.028]} rotation={[1.698, 0.262, 1.111]} scale={0.004}>
              <mesh geometry={nodes.Object_36.geometry} material={materials.sy_cutter} />
              <mesh geometry={nodes.Object_38.geometry} material={materials.sy_dark_annodized_shiny} position={[0, -0.355, 0]} />
            </group>
            <group position={[-0.067, 0.051, 0.033]} rotation={[1.698, 0.262, 1.111]} scale={0.004}>
              <mesh geometry={nodes.Object_40.geometry} material={materials.sy_cutter} />
              <mesh geometry={nodes.Object_42.geometry} material={materials.sy_dark_annodized_shiny} position={[0, -0.355, 0]} />
            </group>
            <group position={[-0.08, 0.058, -0.035]} rotation={[1.698, 0.262, 1.111]} scale={0.004}>
              <mesh geometry={nodes.Object_44.geometry} material={materials.sy_cutter} />
              <mesh geometry={nodes.Object_46.geometry} material={materials.sy_dark_annodized_shiny} position={[0, -0.355, 0]} />
            </group>
            <group position={[-0.068, -0.006, -0.016]} rotation={[1.698, 0.262, 1.111]} scale={0.004}>
              <mesh geometry={nodes.Object_48.geometry} material={materials.sy_cutter} />
              <mesh geometry={nodes.Object_50.geometry} material={materials.sy_dark_annodized_shiny} position={[0, -0.355, 0]} />
            </group>
            <mesh geometry={nodes.Object_25.geometry} material={materials['Material.001']} />
            <mesh geometry={nodes.Object_26.geometry} material={materials['Material.Black']} />
          </group>

          <group position={[0.038, 0.045, 0.059]} rotation={[0.046, -0.155, 0.05]} scale={0.058}>
            <mesh geometry={nodes.Object_52.geometry} material={materials['MI_EyeRefractive_Inst_L.IRIS']} />
            <mesh geometry={nodes.Object_53.geometry} material={materials.MI_EyeRefractive_Inst_L} />
          </group>

          <group position={[-0.036, 0.046, 0.058]} rotation={[0.162, 0.22, 0.021]} scale={0.058}>
            <mesh geometry={nodes.Object_55.geometry} material={materials['MI_EyeRefractive_Inst_L.IRIS']} />
            <mesh geometry={nodes.Object_56.geometry} material={materials.MI_EyeRefractive_Inst_L} />
          </group>

          <mesh geometry={nodes.Object_4.geometry} material={materials['Material.001']} />
          <mesh geometry={nodes.Object_6.geometry} material={materials['Material.Grey']} />
          <mesh geometry={nodes.Object_7.geometry} material={materials.material_0} />
          <mesh geometry={nodes.Object_58.geometry} material={materials['Material.001']} position={[0, 0, 0.001]} />
          <mesh geometry={nodes.Object_60.geometry} material={materials['Material.001']} />
        </group>

      </group>
    </group>
  )
}

useGLTF.preload('/model.glb')