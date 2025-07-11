import * as THREE from 'three'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect } from 'react'
import { Gltf, ScrollControls, useScroll, Scroll } from '@react-three/drei'
import gsap from 'gsap'
import { getProject, val } from '@theatre/core'
import theatreState from './theatreState.json'

import { RockStone } from './components/RockStone'
import { Product } from './components/Product'
import WaterScene from './components/WaterScene'

import WaterPlane from './WaterPlane'
import SkyBg from './SkyBg'
import { Sky } from '@react-three/drei'

import {
  editable as e,
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet
} from '@theatre/r3f'
import MilkBottle from './components/MilkBottle'

import CloudMountain from './components/CloudMountain'
import CloudVolumetric from './components/CloudVolumetric'
import FogCircle from './components/FogCircle'



export default function ScrollSection () {
  useEffect(() => {
    if (import.meta.env.DEV) {
      import('@theatre/studio').then(studio => {
        studio.default.initialize()
        import('@theatre/r3f/dist/extension').then(ext => {
          studio.default.extend(ext.default)
        })
      })
    }
  }, [])

  const sheet = getProject('myProject', { state: theatreState }).sheet('Scene')
  const isMobile = window.innerWidth <= 768 // Adjust the width breakpoint as needed
  const pages = isMobile ? 4 : 4

  return (
    <div style={{}}>
      <Canvas   camera={{ position: [20, 10, 20], fov: 30 }}
        //  onCreated={({ scene }) => {
        //     scene.fog = new THREE.Fog('#2714F3', 800, 3000)
        //   }}

        style={{ width: '100vw', height: '100vh' }}
        gl={{ preserveDrawingBuffer: true }}
      >
 {/* <fog attach="fog" color="#D6C1FF" near={2000} far={5500} /> */}
<FogCircle
  color="#6A32D9"
  intensity={5.0}
  radius={8000}
  y={0.1}
  inner={0.85}
  outer={0.95}
  softness={3}
/>



      <Sky
  distance={450000}
  sunPosition={[0.5, 0.6, 1]} // soft backlight
  inclination={0.49}
  azimuth={0.25}
  turbidity={10}
  rayleigh={2}
  mieCoefficient={0.005}
  mieDirectionalG={0.99}
/>


        {/* <fog attach="fog" color="#010101" near={1000} far={3000} /> */}

        {/* <hemisphereLight
          skyColor={0xD6C1FF} // soft pink
          groundColor={0xfbe5e3}
          intensity={0.6}
        /> */}

        <WaterScene />
        <ScrollControls pages={pages} distance={2} damping={0.5}>
          <SheetProvider sheet={sheet}>
            <Scene />
          </SheetProvider>
          <Scroll html style={{ width: '100vw' }}></Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}

function Scene () {
  const sheet = useCurrentSheet()
  const scroll = useScroll()

  useFrame(() => {
    const sequenceLength = val(sheet.sequence.pointer.length)
    sheet.sequence.position = scroll.offset * sequenceLength
  })

  return (
    <>
      <directionalLight
        position={[20, 100, 50]}
        intensity={1}
        color={0xffc7b5} // Soft warm
        castShadow
      />
      <ambientLight intensity={0.4} color={0xf6c5df} />

      <e.group theatreKey='RockStone' position={[0, 0, -1]}>
        <RockStone scale={25} />
      </e.group>
      <e.group theatreKey='Product' position={[0, 0, -1]}>
        <Product />
      </e.group>
      <e.group theatreKey='CloudMountain1' position={[0, 0, -1]}>
        <CloudMountain
          numPlanes={200}
          xSpread={1500}
          ySpread={100}
          zSpread={30}
          baseScale={100}
          color='#ecd8eb'
          opacity={0.2}
          speed={1.6}
        />
      </e.group>

      <PerspectiveCamera
        position={[0, 0, 30]}
        theatreKey='Camera'
        makeDefault
        near={5}
        far={6000}
        fov={15}
      />

      <directionalLight
        position={[5, 10, 5]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  )
}
