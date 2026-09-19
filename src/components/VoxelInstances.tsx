import { useLayoutEffect, useMemo, useRef } from 'react'
import { InstancedMesh, Object3D } from 'three'
import type { ColorGroup } from '../cities'

const _dummy = new Object3D()

type Props = {
  groups: ColorGroup[]
  voxelSize?: number
}

function ColorInstances({
  color,
  positions,
  voxelSize,
}: {
  color: string
  positions: ColorGroup['positions']
  voxelSize: number
}) {
  const ref = useRef<InstancedMesh>(null)

  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    for (let i = 0; i < positions.length; i++) {
      const [x, y, z] = positions[i]!
      _dummy.position.set(x, y + 0.5, z)
      _dummy.scale.setScalar(1)
      _dummy.updateMatrix()
      mesh.setMatrixAt(i, _dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
    mesh.computeBoundingSphere()
  }, [positions])

  const gap = voxelSize * 0.92

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, positions.length]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[gap, gap, gap]} />
      <meshStandardMaterial color={color} roughness={0.65} metalness={0.15} />
    </instancedMesh>
  )
}

export function VoxelInstances({ groups, voxelSize = 1 }: Props) {
  const stable = useMemo(() => groups, [groups])

  return (
    <group>
      {stable.map((g) => (
        <ColorInstances
          key={g.color}
          color={g.color}
          positions={g.positions}
          voxelSize={voxelSize}
        />
      ))}
    </group>
  )
}
