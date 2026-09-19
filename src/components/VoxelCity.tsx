import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { SoftShadows } from '@react-three/drei'
import type { CityDefinition } from '../cities'
import { VoxelInstances } from './VoxelInstances'
import { CameraSway } from './CameraSway'
import { SkyBackdrop } from './SkyBackdrop'

type Props = {
  city: CityDefinition
  fading?: boolean
}

function Scene({ city }: { city: CityDefinition }) {
  const groups = useMemo(() => city.generate(), [city])
  const { palette } = city

  return (
    <>
      <color attach="background" args={[palette.skyBottom]} />
      <fog attach="fog" args={[palette.fog, 45, 95]} />
      <SkyBackdrop palette={palette} />
      <ambientLight intensity={0.55} color={palette.ambient} />
      <directionalLight
        position={[30, 40, 20]}
        intensity={1.15}
        color={palette.sun}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight
        args={[palette.skyTop, palette.ground, 0.35]}
      />
      <CameraSway />
      <group position={[0, 0, 0]}>
        <VoxelInstances groups={groups} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.02, 0]} receiveShadow>
          <circleGeometry args={[24, 48]} />
          <meshStandardMaterial color={palette.ground} roughness={0.9} />
        </mesh>
      </group>
      <SoftShadows size={12} samples={8} focus={0.5} />
    </>
  )
}

export function VoxelCity({ city, fading = false }: Props) {
  return (
    <div className={`canvas-wrap${fading ? ' is-fading' : ''}`}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [38, 18, 38], fov: 42, near: 0.5, far: 200 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Scene city={city} />
      </Canvas>
    </div>
  )
}
