import React, { useRef, useMemo, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { CubeTextureLoader } from 'three'
import waterVertexShader from '../assets/shaders/water.vert?raw'
import waterFragmentShader from '../assets/shaders/water.frag?raw'

export default function Water({ timeSpeed = 1, reflectionTexture = null }) {
  const ref = useRef()
  const { gl, scene } = useThree()

  const envMap = useMemo(() => {
    const loader = new CubeTextureLoader()
    const texture = loader.load([
      '/env/px.png', '/env/nx.png',
      '/env/py.png', '/env/ny.png',
      '/env/pz.png', '/env/nz.png',
    ])
    texture.encoding = gl.outputEncoding
    return texture
  }, [gl])

  useEffect(() => {
    scene.environment = envMap
  }, [envMap, scene])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uWavesAmplitude: { value: 0.025 },
    uWavesSpeed: { value: 0.40 },
    uWavesFrequency: { value: 1.07 },
    uWavesPersistence: { value: 0.30 },
    uWavesLacunarity: { value: 2.18 },
    uWavesIterations: { value: 8 },

    uOpacity: { value: 0.8 },
    uPeakColor: { value: [0.50, 0.69, 0.75] },
    uSurfaceColor: { value: [0.33, 0.69, 0.53] },
    uTroughColor: { value: [0.01, 0.13, 0.28] },

    uPeakThreshold: { value: 0.08 },
    uPeakTransition: { value: 0.05 },
    uTroughThreshold: { value: -0.01 },
    uTroughTransition: { value: 0.15 },

    uFresnelScale: { value: 0.80 },
    uFresnelPower: { value: 0.50 },

    uEnvironmentMap: { value: envMap },
    uReflectionTexture: { value: reflectionTexture },
  }), [envMap, reflectionTexture])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.uTime.value += delta * timeSpeed
    }
  })

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[2000, 1000, 512, 512]} />
      <shaderMaterial
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}
