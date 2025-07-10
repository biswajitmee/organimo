// src/HorizonGlow.jsx
import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'

export default function HorizonGlow({
  color = '#7A7395',
  intensity = 2.5,
  radius = 5000,
  y = 2,
  fade = 1.8,
  distance = -2500 // distance in front of camera
}) {
  const mesh = useRef()
  const { camera } = useThree() // This is your Theatre.js camera

  useFrame(() => {
    if (mesh.current) {
      // Use world position of the Theatre camera
      const cameraWorldPos = new THREE.Vector3()
      camera.getWorldPosition(cameraWorldPos)

      // Place the glow disc ahead of camera at fixed Z offset
      mesh.current.position.set(0, y, cameraWorldPos.z + distance)
    }
  })

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uIntensity: { value: intensity },
        uFade: { value: fade }
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec2 vUv;
        uniform vec3 uColor;
        uniform float uIntensity;
        uniform float uFade;

        void main() {
          float dist = length(vUv - 0.5) * 2.0;
          float strength = pow(1.0 - dist, uFade);
          gl_FragColor = vec4(uColor, strength * uIntensity);
        }
      `
    })
  }, [color, intensity, fade])

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[radius, 128]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}
