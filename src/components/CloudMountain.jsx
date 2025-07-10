import React from 'react'
 
import CloudShader from './CloudeShader'

 
function rand(min, max) {
  return Math.random() * (max - min) + min
}

export default function CloudMountain({
  position = [0, 8, 0],
  color = '#ecd8eb',
  opacity = 0.2,
  speed = 1.6,
  numPlanes = 200,
  xSpread = 1500,
  ySpread = 100,
  zSpread = 30,
  baseScale = 100
}) {
  // Layer config (generate only once)
  const layers = React.useMemo(() => (
    Array.from({ length: numPlanes }).map((_, i) => {
      const t = i / (numPlanes - 1) // bottom=0, top=1
      // Bell-curve for mountain
      const x = rand(-1, 1)
      const yBell = 1 - Math.pow(x, 2) // bell for Y shape
      const peak = Math.sin(Math.PI * (1 - t)) // sharper peak in center

      // Wider at bottom, tighter at top, bell curve for "mountain"
      const xSpreadCur = xSpread * (0.7 + 0.3 * yBell) * (1 - t * 0.72)
      const zSpreadCur = zSpread * (0.45 + 0.55 * t)

      return {
        key: i,
        position: [
          x * xSpreadCur,
          ySpread * yBell * peak + rand(-0.7, 0.7),
          rand(-zSpreadCur, zSpreadCur)
        ],
        scale: [
          baseScale * (1.13 - t * 0.8) * rand(0.84, 1.13) * (0.8 + 0.4 * yBell),
          baseScale * (0.59 + t * 1.19) * rand(0.82, 1.14) * (0.6 + 0.7 * yBell),
          1
        ],
        rotation: [0, 0, rand(-0.12, 0.12)],
        opacity: opacity * (1 - t * t) * (0.9 + 0.15 * yBell) * rand(0.82, 1.13),
        speed: speed * rand(0.88, 1.11)
      }
    })
  ), [numPlanes, xSpread, ySpread, zSpread, baseScale, opacity, speed])

  return (
    <group position={position}>
      {layers.map(cfg => (
        <CloudShader
          key={cfg.key}
          position={cfg.position}
          scale={cfg.scale}
          rotation={cfg.rotation}
          color={color}
          opacity={cfg.opacity}
          speed={cfg.speed}
        />
      ))}
    </group>
  )
}

