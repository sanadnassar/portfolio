import React, { useRef, useEffect, useMemo } from 'react'
import { useGLTF, useAnimations, Center, Resize } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Fine diagonal carbon-fiber weave for the matte charcoal Body armor
function createCarbonFiberTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 16
  canvas.height = 16
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#808080'
  ctx.fillRect(0, 0, 16, 16)

  ctx.fillStyle = '#ffffff'
  for (let i = 0; i < 16; i += 4) {
    ctx.fillRect(i, i, 4, 2)
    ctx.fillRect((i + 8) % 16, i, 4, 2)
  }

  ctx.fillStyle = '#303030'
  for (let i = 0; i < 16; i += 4) {
    ctx.fillRect(i, (i + 2) % 16, 4, 2)
    ctx.fillRect((i + 8) % 16, (i + 2) % 16, 4, 2)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(60, 60)
  return texture
}

export function Model(props) {
  const groupRef = useRef()
  const rigRefs = useRef({
    head: null,
    torso: null,
    leftArm: null,
    rightArm: null,
    leftForearm: null,
    rightForearm: null,
  })

  const mouseState = useRef({
    x: 0,
    y: 0,
    velX: 0,
    velY: 0,
    energy: 0,
  })

  const { scene, animations } = useGLTF('/model.glb')
  const { actions, names } = useAnimations(animations, groupRef)

  // Multi-Tier Monochrome Materials
  const customMaterials = useMemo(() => {
    const carbonTex = createCarbonFiberTexture()

    // 1. HEAD: Seamless liquid-black mirror chrome dome ONLY
    const head = new THREE.MeshPhysicalMaterial({
      name: 'Head',
      color: new THREE.Color('#020202'),
      metalness: 1.0,
      roughness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 1.0,
      envMapIntensity: 2.2,
    })

    // 2. PARTS: Dark machined joints, pistons, and hands
    const parts = new THREE.MeshPhysicalMaterial({
      name: 'Parts',
      color: new THREE.Color('#050505'),
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 0.8,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.3,
    })

    // 3. BODY: Satin Dark Carbon-Fiber Armor (Torso, Shoulders, Arms, Forearms, Legs)
    const body = new THREE.MeshPhysicalMaterial({
      name: 'Body',
      color: new THREE.Color('#141416'), 
      metalness: 0.55,
      roughness: 0.42,
      clearcoat: 0.22,
      clearcoatRoughness: 0.38,
      bumpMap: carbonTex,
      bumpScale: 0.0025,
      envMapIntensity: 1.2,
    })

    return { head, parts, body }
  }, [])

  useEffect(() => {
    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1

      const dx = x - mouseState.current.x
      const dy = y - mouseState.current.y
      const speed = Math.min(Math.hypot(dx, dy) * 8, 1.5)

      mouseState.current.velX = dx
      mouseState.current.velY = dy
      mouseState.current.energy = Math.min(mouseState.current.energy + speed * 0.35, 1.2)
      mouseState.current.x = x
      mouseState.current.y = y
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useEffect(() => {
    scene.updateMatrixWorld(true)
    const invSceneMatrix = scene.matrixWorld.clone().invert()

    rigRefs.current = {
      head: null,
      torso: null,
      leftArm: null,
      rightArm: null,
      leftForearm: null,
      rightForearm: null,
    }

    const getHierarchyPath = (obj) => {
      const path = []
      let curr = obj
      while (curr) {
        if (curr.name) path.push(curr.name.toLowerCase())
        curr = curr.parent
      }
      return path.join(' ')
    }

    const getSceneBox = (obj) => {
      const box = new THREE.Box3()
      obj.traverse((c) => {
        if (c.isMesh && c.geometry) {
          if (!c.geometry.boundingBox) c.geometry.computeBoundingBox()
          const meshBox = c.geometry.boundingBox.clone()
          const toScene = invSceneMatrix.clone().multiply(c.matrixWorld)
          meshBox.applyMatrix4(toScene)
          box.union(meshBox)
        }
      })
      return box
    }

    const fullRobotBox = getSceneBox(scene)
    const robotSize = new THREE.Vector3()
    const robotCenter = new THREE.Vector3()
    fullRobotBox.getSize(robotSize)
    fullRobotBox.getCenter(robotCenter)

    // PASS 1: MAP SKELETON
    scene.traverse((child) => {
      if (!child.userData.initRot) {
        child.userData.initRot = child.rotation.clone()
      }
      child.userData.mirrorSign = child.scale.x < 0 ? -1 : 1

      const nameLower = (child.name || '').toLowerCase()

      if (!rigRefs.current.head && /\b(head|skull|helmet|visor)\b/i.test(nameLower)) {
        rigRefs.current.head = child
      }
      if (!rigRefs.current.torso && /\b(torso|chest|spine|upper.*body)\b/i.test(nameLower)) {
        rigRefs.current.torso = child
      }

      if (/\b(arm|shoulder|clavicle|upper.*arm|forearm)\b/i.test(nameLower)) {
        const partBox = getSceneBox(child)
        if (!partBox.isEmpty()) {
          const partCenter = new THREE.Vector3()
          partBox.getCenter(partCenter)
          const isLeft = /\b(left|l)\b|_l\b|^l_/i.test(nameLower) || partCenter.x < robotCenter.x - robotSize.x * 0.1
          const isRight = /\b(right|r)\b|_r\b|^r_/i.test(nameLower) || partCenter.x > robotCenter.x + robotSize.x * 0.1
          const isLower = /forearm|lower|elbow/i.test(nameLower)

          if (isLeft) {
            if (isLower && !rigRefs.current.leftForearm && child !== rigRefs.current.leftArm) rigRefs.current.leftForearm = child
            else if (!isLower && !rigRefs.current.leftArm) rigRefs.current.leftArm = child
          } else if (isRight) {
            if (isLower && !rigRefs.current.rightForearm && child !== rigRefs.current.rightArm) rigRefs.current.rightForearm = child
            else if (!isLower && !rigRefs.current.rightArm) rigRefs.current.rightArm = child
          }
        }
      }
    })

    // PASS 2: BULLETPROOF PRIORITY MATERIAL ASSIGNMENT
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true

        const path = getHierarchyPath(child)
        const nameLower = (child.name || '').toLowerCase()
        const matName = (child.material?.name || '').toLowerCase()

        // Explicit check: Is this mesh part of an arm, forearm, hand, or body?
        const isArmOrBody = 
          /\b(arm|forearm|hand|finger|shoulder|torso|chest|body|leg|thigh|shin|foot|boot|shoe|hip|pelvis)\b/.test(path) || 
          /\b(arm|forearm|hand|finger|shoulder|torso|chest|body|leg|thigh|shin|foot|boot|shoe|hip|pelvis)\b/.test(nameLower)

        const isJoint = 
          /\b(part|parts|joint|joints|neck|collar|piston|elbow|wrist|ankle)\b/.test(path) || 
          matName.includes('part')

        const isHead = 
          /\b(head|visor|helmet|skull|face|dome)\b/.test(path) || 
          matName.includes('head')

        // PRIORITY OVERRIDE: Arms/Body are handled FIRST so rogue material tags can never hijack them
        if (isArmOrBody) {
          child.material = customMaterials.body
        } else if (isJoint) {
          child.material = customMaterials.parts
        } else if (isHead) {
          child.material = customMaterials.head
        } else {
          child.material = customMaterials.body
        }
      }
    })

    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().fadeIn(0.5).play()
    }
  }, [scene, customMaterials, actions, names])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const { x: pointerX, y: pointerY } = mouseState.current

    mouseState.current.energy = THREE.MathUtils.lerp(mouseState.current.energy, 0, 0.04)
    mouseState.current.velX = THREE.MathUtils.lerp(mouseState.current.velX, 0, 0.1)
    mouseState.current.velY = THREE.MathUtils.lerp(mouseState.current.velY, 0, 0.1)
    const energy = mouseState.current.energy

    const { head, torso, leftArm, rightArm, leftForearm, rightForearm } = rigRefs.current

    if (head) {
      const init = head.userData.initRot
      const targetY = init.y + (pointerX < 0 ? pointerX * 0.55 : pointerX * 0.4)
      const targetX = init.x - pointerY * 0.35
      const targetZ = init.z - pointerX * 0.08
      head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, targetY, 0.1)
      head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetX, 0.1)
      head.rotation.z = THREE.MathUtils.lerp(head.rotation.z, targetZ, 0.08)
    }

    if (torso && torso !== head) {
      const init = torso.userData.initRot
      const targetY = init.y + pointerX * 0.16
      const targetX = init.x - pointerY * 0.08 + Math.sin(t * 1.8) * 0.015
      torso.rotation.y = THREE.MathUtils.lerp(torso.rotation.y, targetY, 0.06)
      torso.rotation.x = THREE.MathUtils.lerp(torso.rotation.x, targetX, 0.06)
    }

    const fastSwing = Math.sin(t * 6.5) * energy * 0.08

    if (leftArm) {
      const init = leftArm.userData.initRot
      const mirror = leftArm.userData.mirrorSign || 1
      const pitchX = init.x + Math.sin(t * 1.6) * 0.035 - pointerY * 0.12 - energy * 0.16 + fastSwing
      const yawY = init.y + pointerX * 0.08 * mirror
      const flareZ = init.z - (Math.abs(pointerX) * 0.04 + energy * 0.1) * mirror

      leftArm.rotation.x = THREE.MathUtils.lerp(leftArm.rotation.x, pitchX, 0.06)
      leftArm.rotation.y = THREE.MathUtils.lerp(leftArm.rotation.y, yawY, 0.06)
      leftArm.rotation.z = THREE.MathUtils.lerp(leftArm.rotation.z, flareZ, 0.06)
    }

    if (rightArm) {
      const init = rightArm.userData.initRot
      const mirror = rightArm.userData.mirrorSign || 1
      const pitchX = init.x - Math.sin(t * 1.6) * 0.035 - pointerY * 0.12 - energy * 0.16 - fastSwing
      const yawY = init.y + pointerX * 0.08 * mirror
      const flareZ = init.z + (Math.abs(pointerX) * 0.04 + energy * 0.1) * mirror

      rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, pitchX, 0.06)
      rightArm.rotation.y = THREE.MathUtils.lerp(rightArm.rotation.y, yawY, 0.06)
      rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, flareZ, 0.06)
    }

    if (leftForearm && leftForearm !== leftArm) {
      const init = leftForearm.userData.initRot
      leftForearm.rotation.x = THREE.MathUtils.lerp(
        leftForearm.rotation.x,
        init.x - Math.max(0, pointerY) * 0.14 - energy * 0.18,
        0.07
      )
    }

    if (rightForearm && rightForearm !== rightArm) {
      const init = rightForearm.userData.initRot
      rightForearm.rotation.x = THREE.MathUtils.lerp(
        rightForearm.rotation.x,
        init.x - Math.max(0, pointerY) * 0.14 - energy * 0.18,
        0.07
      )
    }

    if (groupRef.current) {
      const bodyTurnY = pointerX * (head ? 0.15 : 0.4) + mouseState.current.velX * 0.2
      const bodyTurnX = -pointerY * (head ? 0.07 : 0.22) - mouseState.current.velY * 0.12
      const bodyRollZ = -mouseState.current.velX * 0.1

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, bodyTurnY, 0.06)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, bodyTurnX, 0.06)
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, bodyRollZ, 0.06)
    }
  })

  return (
    <group {...props} dispose={null}>
      <group ref={groupRef}>
        <Resize scale={4.8}>
          <Center>
            <primitive object={scene} />
          </Center>
        </Resize>
      </group>
    </group>
  )
}

useGLTF.preload('/model.glb')