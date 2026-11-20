import React, { useRef, useEffect, useMemo } from 'react'
import { useGLTF, useAnimations, Center, Resize } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'


const _qForward = new THREE.Quaternion()
const _qOutward = new THREE.Quaternion()
const _qTarget = new THREE.Quaternion()
const _worldPos = new THREE.Vector3()


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
  const trackingClock = useRef(0)
  const rigRefs = useRef({
    head: null,
    torso: null,
    leftArm: null,
    rightArm: null,
    leftForearm: null,
    rightForearm: null,
    leftHand: null,
    rightHand: null,
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

  const customMaterials = useMemo(() => {
    const carbonTex = createCarbonFiberTexture()
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

    const parts = new THREE.MeshPhysicalMaterial({
      name: 'Parts',
      color: new THREE.Color('#050505'),
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 0.8,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.3,
    })

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
      leftHand: null,
      rightHand: null,
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

    const isDescendantOf = (child, potentialParent) => {
      if (!child || !potentialParent) return false
      let curr = child.parent
      while (curr) {
        if (curr === potentialParent) return true
        curr = curr.parent
      }
      return false
    }

    const fullRobotBox = getSceneBox(scene)
    const robotSize = new THREE.Vector3()
    const robotCenter = new THREE.Vector3()
    fullRobotBox.getSize(robotSize)
    fullRobotBox.getCenter(robotCenter)

    scene.traverse((child) => {
      if (!child.userData.initRot) {
        child.userData.initRot = child.rotation.clone()
      }
      if (!child.userData.initQuat) {
        child.userData.initQuat = child.quaternion.clone()
      }

      const nameLower = (child.name || '').toLowerCase()

      if (!rigRefs.current.head && /(head|skull|helmet|visor)/i.test(nameLower)) {
        rigRefs.current.head = child
      }
      if (!rigRefs.current.torso && /(torso|chest|spine|upper.*body)/i.test(nameLower)) {
        rigRefs.current.torso = child
      }

      if (/(arm|shoulder|clavicle|bicep|forearm|elbow|hand|wrist|palm)/i.test(nameLower)) {
        if (/finger|thumb|index|middle|ring|pinky/i.test(nameLower)) return

        const partBox = getSceneBox(child)

        if (partBox.isEmpty()) return

        const partCenter = new THREE.Vector3()
        partBox.getCenter(partCenter)
        const isScreenLeft = partCenter.x < robotCenter.x - robotSize.x * 0.06
        const isScreenRight = partCenter.x > robotCenter.x + robotSize.x * 0.06

        if (!isScreenLeft && !isScreenRight) return
        
        const isHand = /hand|wrist|palm/i.test(nameLower)
        const isForearm = !isHand && /forearm|lower.*arm|arm.*lower|elbow/i.test(nameLower)
        const isUpperArm = !isHand && !isForearm

        if (isScreenLeft) {
          if (isUpperArm && !rigRefs.current.leftArm) {
            rigRefs.current.leftArm = child
          } else if (isForearm && !rigRefs.current.leftForearm && child !== rigRefs.current.leftArm) {
            rigRefs.current.leftForearm = child
          } else if (isHand && !rigRefs.current.leftHand && child !== rigRefs.current.leftForearm) {
            rigRefs.current.leftHand = child
          }
        } else if (isScreenRight) {
          if (isUpperArm && !rigRefs.current.rightArm) {
            rigRefs.current.rightArm = child
          } else if (isForearm && !rigRefs.current.rightForearm && child !== rigRefs.current.rightArm) {
            rigRefs.current.rightForearm = child
          } else if (isHand && !rigRefs.current.rightHand && child !== rigRefs.current.rightForearm) {
            rigRefs.current.rightHand = child
          }
        }
      }
    })

    ;['left', 'right'].forEach((side) => {
      const sideSign = side === 'left' ? -1 : 1
      const armKey = `${side}Arm`
      const forearmKey = `${side}Forearm`
      const handKey = `${side}Hand`

      if (!rigRefs.current[armKey]) {
        scene.traverse((child) => {
          if (rigRefs.current[armKey] || child === scene || isDescendantOf(child, rigRefs.current.head)) return
          const box = getSceneBox(child)
          if (box.isEmpty()) return
          const size = new THREE.Vector3()
          const center = new THREE.Vector3()
          box.getSize(size)
          box.getCenter(center)

          const onCorrectSide = sideSign < 0
            ? center.x < robotCenter.x - robotSize.x * 0.16
            : center.x > robotCenter.x + robotSize.x * 0.16
          const isArmSized = size.y > robotSize.y * 0.16 && size.y < robotSize.y * 0.55 && size.x < robotSize.x * 0.35
          const isUpperBody = center.y > robotCenter.y - robotSize.y * 0.08 && center.y < robotCenter.y + robotSize.y * 0.35

          if (onCorrectSide && isArmSized && isUpperBody) {
            rigRefs.current[armKey] = child
          }
        })
      }

      const armNode = rigRefs.current[armKey]
      if (armNode) {
        const armBox = getSceneBox(armNode)
        const armCenter = new THREE.Vector3()
        const armSize = new THREE.Vector3()
        armBox.getCenter(armCenter)
        armBox.getSize(armSize)

        armNode.traverse((child) => {
          if (child === armNode) return
          const box = getSceneBox(child)
          if (box.isEmpty()) return
          const center = new THREE.Vector3()
          const size = new THREE.Vector3()
          box.getCenter(center)
          box.getSize(size)

          if (
            !rigRefs.current[forearmKey] &&
            child.children.length > 0 &&
            center.y < armCenter.y &&
            size.y > armSize.y * 0.28 &&
            size.y < armSize.y * 0.78
          ) {
            rigRefs.current[forearmKey] = child
          } else if (
            !rigRefs.current[handKey] &&
            center.y < armBox.min.y + armSize.y * 0.32 &&
            size.y > armSize.y * 0.08 &&
            size.y < armSize.y * 0.35
          ) {
            rigRefs.current[handKey] = child
          }
        })
      }
    })

    const calibrateLimbAxes = (node, sideSign) => {
      if (!node) return
      node.updateWorldMatrix(true, true)

      const box = getSceneBox(node)
      const centerScene = new THREE.Vector3()
      box.getCenter(centerScene)

      const pivotScene = new THREE.Vector3()
        .setFromMatrixPosition(node.matrixWorld)
        .applyMatrix4(invSceneMatrix)

      const testPointScene = centerScene.clone()
      if (testPointScene.distanceTo(pivotScene) < 0.02) {
        testPointScene.y -= 0.2
      }
      const localTip = node.worldToLocal(testPointScene.clone().applyMatrix4(scene.matrixWorld))

      const initQ = node.userData.initQuat.clone()
      const restScene = localTip.clone().applyMatrix4(node.matrixWorld).applyMatrix4(invSceneMatrix)

      const basis = [
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 1),
      ]
      const deltas = []
      const eps = 0.05

      basis.forEach((axis) => {
        const qTest = new THREE.Quaternion().setFromAxisAngle(axis, eps)
        node.quaternion.copy(initQ).multiply(qTest)
        node.updateMatrixWorld(true)
        const movedScene = localTip.clone().applyMatrix4(node.matrixWorld).applyMatrix4(invSceneMatrix)
        deltas.push(movedScene.sub(restScene).divideScalar(eps))
      })

      node.quaternion.copy(initQ)
      node.updateMatrixWorld(true)

      const desiredForward = new THREE.Vector3(0, 0.2, 1).normalize()
      const desiredOutward = new THREE.Vector3(sideSign, 0.15, 0).normalize()

      const forwardAxis = new THREE.Vector3(
        deltas[0].dot(desiredForward),
        deltas[1].dot(desiredForward),
        deltas[2].dot(desiredForward)
      )
      const outwardAxis = new THREE.Vector3(
        deltas[0].dot(desiredOutward),
        deltas[1].dot(desiredOutward),
        deltas[2].dot(desiredOutward)
      )

      node.userData.forwardAxis = forwardAxis.lengthSq() > 1e-6 ? forwardAxis.normalize() : new THREE.Vector3(-1, 0, 0)
      node.userData.outwardAxis = outwardAxis.lengthSq() > 1e-6 ? outwardAxis.normalize() : new THREE.Vector3(0, 0, -sideSign)
    }

    calibrateLimbAxes(rigRefs.current.leftArm, -1)
    calibrateLimbAxes(rigRefs.current.leftForearm, -1)
    calibrateLimbAxes(rigRefs.current.leftHand, -1)
    calibrateLimbAxes(rigRefs.current.rightArm, 1)
    calibrateLimbAxes(rigRefs.current.rightForearm, 1)
    calibrateLimbAxes(rigRefs.current.rightHand, 1)

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true

        const path = getHierarchyPath(child)
        const nameLower = (child.name || '').toLowerCase()
        const matName = (child.material?.name || '').toLowerCase()

        const isArmOrBody =
          /\b(arm|forearm|hand|finger|shoulder|torso|chest|body|leg|thigh|shin|foot|boot|shoe|hip|pelvis)\b/.test(path) ||
          /\b(arm|forearm|hand|finger|shoulder|torso|chest|body|leg|thigh|shin|foot|boot|shoe|hip|pelvis)\b/.test(nameLower)

        const isJoint =
          /\b(part|parts|joint|joints|neck|collar|piston|elbow|wrist|ankle)\b/.test(path) ||
          matName.includes('part')

        const isHead =
          /\b(head|visor|helmet|skull|face|dome)\b/.test(path) ||
          matName.includes('head')

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

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    
    trackingClock.current = Math.min(trackingClock.current + Math.min(delta, 0.05), 3.0)
    const trackWeight = THREE.MathUtils.smoothstep(trackingClock.current, 2.0, 2.6)

    const mouseX = mouseState.current.x
    const mouseY = mouseState.current.y

    const pointerX = mouseX * trackWeight
    const pointerY = mouseY * trackWeight

    mouseState.current.energy = THREE.MathUtils.lerp(mouseState.current.energy, 0, 0.04)
    mouseState.current.velX = THREE.MathUtils.lerp(mouseState.current.velX, 0, 0.1)
    mouseState.current.velY = THREE.MathUtils.lerp(mouseState.current.velY, 0, 0.1)
    const energy = mouseState.current.energy

    const {
      head,
      torso,
      leftArm,
      rightArm,
      leftForearm,
      rightForearm,
      leftHand,
      rightHand,
    } = rigRefs.current

    const applyFrontAndSidePose = (node, forwardRad, outwardRad, maxForward = 0.38, maxOutward = 0.24, smooth = 0.07) => {
      if (!node || !node.userData.initQuat || !node.userData.forwardAxis) return

      const clampedForward = THREE.MathUtils.clamp(forwardRad, 0.0, maxForward)
      const clampedOutward = THREE.MathUtils.clamp(outwardRad, 0.015, maxOutward)

      _qForward.setFromAxisAngle(node.userData.forwardAxis, clampedForward)
      _qOutward.setFromAxisAngle(node.userData.outwardAxis, clampedOutward)
      _qTarget.copy(node.userData.initQuat).multiply(_qForward).multiply(_qOutward)

      node.quaternion.slerp(_qTarget, smooth)
    }

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
      const targetY = init.y + pointerX * 0.14
      const targetX = init.x - pointerY * 0.06 + Math.sin(t * 1.8) * 0.015
      torso.rotation.y = THREE.MathUtils.lerp(torso.rotation.y, targetY, 0.06)
      torso.rotation.x = THREE.MathUtils.lerp(torso.rotation.x, targetX, 0.06)
    }

    let robotNdcX = 0.35
    if (groupRef.current) {
      groupRef.current.getWorldPosition(_worldPos)
      _worldPos.project(state.camera)
      robotNdcX = _worldPos.x
    }

    const relX = THREE.MathUtils.clamp((pointerX - robotNdcX) / 0.85, -1, 1)
    const leftFocus = Math.max(0, -relX) // 0..1 on screen-left
    const rightFocus = Math.max(0, relX) // 0..1 on screen-right

    const leftInfluence = 0.45 + leftFocus * 0.9
    const rightInfluence = 0.45 + rightFocus * 0.9

    const breatheA = (Math.sin(t * 1.7) + 1) * 0.5
    const breatheB = (Math.sin(t * 1.7 + 1.2) + 1) * 0.5
    const liftFromCursorY = Math.max(0, (pointerY + 0.5) * 0.08)
    const activePulse = (Math.sin(t * 5.5) + 1) * 0.5 * energy * 0.1
    const sharedMotion = liftFromCursorY + energy * 0.12 + activePulse

    const leftArmForward = 0.03 + breatheA * 0.03 + (leftFocus * 0.14 + sharedMotion) * leftInfluence
    const leftArmOutward = 0.025 + breatheA * 0.02 + (leftFocus * 0.08 + energy * 0.07) * leftInfluence
    applyFrontAndSidePose(leftArm, leftArmForward, leftArmOutward, 0.38, 0.24, 0.07)

    const rightArmForward = 0.03 + breatheB * 0.03 + (rightFocus * 0.14 + sharedMotion) * rightInfluence
    const rightArmOutward = 0.025 + breatheB * 0.02 + (rightFocus * 0.08 + energy * 0.07) * rightInfluence
    applyFrontAndSidePose(rightArm, rightArmForward, rightArmOutward, 0.38, 0.24, 0.07)

    if (leftForearm && leftForearm !== leftArm) {
      const leftElbowBend =
        0.06 + breatheA * 0.03 + (0.05 + liftFromCursorY * 1.1 + leftFocus * 0.12 + energy * 0.15) * leftInfluence
      applyFrontAndSidePose(leftForearm, leftElbowBend, 0.02 + breatheA * 0.015 * leftInfluence, 0.42, 0.14, 0.08)
    }
    if (rightForearm && rightForearm !== rightArm) {
      const rightElbowBend =
        0.06 + breatheB * 0.03 + (0.05 + liftFromCursorY * 1.1 + rightFocus * 0.12 + energy * 0.15) * rightInfluence
      applyFrontAndSidePose(rightForearm, rightElbowBend, 0.02 + breatheB * 0.015 * rightInfluence, 0.42, 0.14, 0.08)
    }

    const handWaveL = (Math.sin(t * 2.4) + 1) * 0.5 * 0.06
    const handWaveR = (Math.sin(t * 2.4 + 1.5) + 1) * 0.5 * 0.06

    if (leftHand && leftHand !== leftForearm && leftHand !== leftArm) {
      applyFrontAndSidePose(
        leftHand,
        0.04 + (handWaveL + leftFocus * 0.08 + energy * 0.13) * leftInfluence,
        0.02 + leftFocus * 0.05 * leftInfluence,
        0.34,
        0.16,
        0.09
      )
    }
    if (rightHand && rightHand !== rightForearm && rightHand !== rightArm) {
      applyFrontAndSidePose(
        rightHand,
        0.04 + (handWaveR + rightFocus * 0.08 + energy * 0.13) * rightInfluence,
        0.02 + rightFocus * 0.05 * rightInfluence,
        0.34,
        0.16,
        0.09
      )
    }

    if (groupRef.current) {
      const bodyTurnY = pointerX * (head ? 0.15 : 0.4) + mouseState.current.velX * 0.2
      const bodyTurnX = -pointerY * (head ? 0.06 : 0.2) - mouseState.current.velY * 0.1
      const bodyRollZ = -mouseState.current.velX * 0.08

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