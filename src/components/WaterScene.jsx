// src/WaterScene.jsx
import * as THREE from 'three'
import { useRef, useEffect, useMemo } from 'react'
import { useFrame, extend, useThree } from '@react-three/fiber'
import { OrbitControls, Stats, Sky } from '@react-three/drei'
import { Water } from 'three/examples/jsm/objects/Water.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import HorizonGlow from './HorizonGlow'
import FogCircle from './FogCircle'

extend({ Water })

export default function WaterScene () {
  const waterRef = useRef()
  const meshRef = useRef()
  const { scene, camera, gl } = useThree()

  const sun = useMemo(() => new THREE.Vector3(), [])
  const pmremGenerator = useMemo(() => new THREE.PMREMGenerator(gl), [gl])
  const sceneEnv = useMemo(() => new THREE.Scene(), [])

  useEffect(() => {
    // Add water
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000)
    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        'https://threejs.org/examples/textures/waternormals.jpg',
        texture => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        }
      ),
      sunDirection: sun.clone(),
      waterColor: 0xD6C1FF,
      sunColor: 0xD6C1FF,
      distortionScale: 3.7,
      fog: true,
      time: 50,
    })
    water.rotation.x = -Math.PI / 2
    scene.add(water)
    waterRef.current = water

    // Add GUI
    const gui = new GUI()

    const parameters = {
      elevation: 2,
      azimuth: 0,
      distortionScale: 3.7,
      size: 1.0
    }

    const updateSun = () => {
      const phi = THREE.MathUtils.degToRad(90 - parameters.elevation)
      const theta = THREE.MathUtils.degToRad(parameters.azimuth)

      sun.setFromSphericalCoords(1, phi, theta)
      sky.material.uniforms.sunPosition.value.copy(sun)
      water.material.uniforms.sunDirection.value.copy(sun).normalize()

      if (scene.environment) scene.environment.dispose()
      sceneEnv.add(sky)
      const renderTarget = pmremGenerator.fromScene(sceneEnv)
      scene.environment = renderTarget.texture
    }

    gui.add(parameters, 'elevation', 0, 90).onChange(updateSun)
    gui.add(parameters, 'azimuth', -180, 180).onChange(updateSun)

    // ✅ New: Water controls
    gui.add(parameters, 'distortionScale', 0, 8).onChange(value => {
      water.material.uniforms.distortionScale.value = value
    })

    gui.add(parameters, 'size', 0.1, 10).onChange(value => {
      water.material.uniforms.size.value = value
    })

    updateSun()
  }, [scene, sun, pmremGenerator, sceneEnv])

  useFrame(() => {
    const t = performance.now() * 0.001
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t) * 20 + 5
      meshRef.current.rotation.x = t * 0.5
      meshRef.current.rotation.z = t * 0.51
    }
    if (waterRef.current) {
      waterRef.current.material.uniforms.time.value += 2.0 / 60.0
    }
  })

  return (
    <>
      <Sky ref={r => (window.sky = r)} scale={10000} />
   

      <mesh ref={meshRef}>
        {/* <boxGeometry args={[30, 30, 30]} /> */}
        <meshStandardMaterial roughness={0} />
      </mesh>

      <Stats />
    </>
  )
}
