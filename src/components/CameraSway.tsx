import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

/** Gentle orbit + vertical sway around the city. */
export function CameraSway({
  radius = 38,
  height = 18,
  speed = 0.08,
}: {
  radius?: number
  height?: number
  speed?: number
}) {
  const pivot = useRef<Group>(null)

  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime * speed
    const x = Math.sin(t) * radius
    const z = Math.cos(t) * radius
    const y = height + Math.sin(t * 0.7) * 2.5
    camera.position.set(x, y, z)
    camera.lookAt(0, 6, 0)
    if (pivot.current) pivot.current.rotation.y = t * 0.15
  })

  return <group ref={pivot} />
}
