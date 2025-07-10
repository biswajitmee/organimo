// src/components/WaterPlane.jsx
import React, { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water.js'

export default function WaterPlane({
  size = 1000,
  color = 0x001e0f,
  distortionScale = 5.7,
  position = [0, 0, 0],
  ...props
}) {
  const waterRef = useRef()
  const { scene } = useThree()

  useEffect(() => {
    // Make the water mesh once and add to the scene
    const waterGeometry = new THREE.PlaneGeometry(size, size)
    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        'https://threejs.org/examples/textures/waternormals.jpg',
        tex => {
          tex.wrapS = tex.wrapT = THREE.RepeatWrapping
        }
      ),
     waterColor: 0xffbcc9, // pastel pink
  sunColor: 0xfff4e8,   // warm sun
  sunDirection: new THREE.Vector3(0, 1, -0.2),
  distortionScale: 3.7,
  fog: false
    })
    water.rotation.x = -Math.PI / 2
    water.position.set(...position)
    scene.add(water)
    waterRef.current = water

    // Animate time
    let frame
    function animate() {
      if (waterRef.current) {
        waterRef.current.material.uniforms.time.value += 1.0 / 60.0
      }
      frame = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      scene.remove(water)
      cancelAnimationFrame(frame)
    }
  }, [scene, size, color, distortionScale, position])

  return null // No JSX mesh, it's added to the scene directly
}
