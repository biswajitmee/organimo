// src/components/SkyBg.jsx
import { Sky } from '@react-three/drei'
import React from 'react'

export default function SkyBg({
  sunPosition = [0, 60, 30], // [x, y, z]
  turbidity = 12,
  rayleigh = 0.95,
  mieCoefficient = 0.005,
  mieDirectionalG = 0.75,
  inclination = 0.49,
  azimuth = 0.25,
  exposure = 0.6,
  ...props
}) {
  return (
    <Sky
      distance={4000}
      sunPosition={sunPosition}
      turbidity={turbidity}
      rayleigh={rayleigh}
      mieCoefficient={mieCoefficient}
      mieDirectionalG={mieDirectionalG}
      inclination={inclination}
      azimuth={azimuth}
      {...props}
    />
  )
}
