import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'

export default function FogCircle({
  color="#6A32D9",
  intensity = 1.0,
  radius = 9000,
  y = 1.5,
  inner = 1000, // no fog inside 30%
  outer = 5000, // fade out after 95%
  softness = 2.5 // how smooth the transition is
}) {
  const mesh = useRef()

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uIntensity: { value: intensity },
        uInner: { value: inner },
        uOuter: { value: outer },
        uSoftness: { value: softness }
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
        uniform float uInner;
        uniform float uOuter;
        uniform float uSoftness;

        void main() {
          float dist = length(vUv - 0.5) * 2.0; // 0 at center, 1 at edge
          float ringFog = smoothstep(uOuter, uInner, dist); // fade in
          ringFog *= pow(1.0 - abs(dist - (uInner + uOuter) * 0.5), uSoftness); // center peak
          gl_FragColor = vec4(uColor, ringFog * uIntensity);
        }
      `
    })
  }, [color, intensity, inner, outer, softness])

  return (
    <mesh
      ref={mesh}
      position={[0, y, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <circleGeometry args={[radius, 128]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}
