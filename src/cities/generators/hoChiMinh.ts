import { createRng, randInt, pick } from '../rng'
import { VoxelBuilder } from '../voxelHelpers'
import type { ColorGroup } from '../types'

const COLONIAL = ['#f5f0e6', '#e8dcc8', '#d4c4a8', '#c9b896'] as const
const MODERN = ['#5a7a8a', '#3d5a6a', '#7a9aaa', '#2a4048'] as const
const ROOF = '#8b3a3a'
const RIVER = '#2a6a6a'
const GROUND = '#4a5a48'
const TREE = '#2d5a3d'
const GOLD = '#c9a84c'

export function generateHoChiMinh(): ColorGroup[] {
  const b = new VoxelBuilder()
  const rng = createRng(88)
  b.groundPlane(0, 0, 21, GROUND)

  // Saigon River strip (flat watery feel)
  for (let x = -20; x <= 20; x++) {
    for (let z = 8; z <= 16; z++) {
      b.add(x, -1, z, RIVER)
      if ((x + z) % 5 === 0) b.add(x, -2, z, '#1a4a4a')
    }
  }
  // riverbank
  for (let x = -18; x <= 18; x++) {
    b.add(x, 0, 7, '#6a7a5a')
  }

  // colonial low-rises near river
  for (let i = 0; i < 20; i++) {
    const x = randInt(rng, -16, 14)
    const z = randInt(rng, 0, 5)
    const w = randInt(rng, 3, 5)
    const h = randInt(rng, 3, 6)
    b.box(x, 0, z, w, h, 3, pick(rng, COLONIAL))
    b.box(x, h, z, w, 1, 3, ROOF)
  }

  // Notre-Dame-ish twin spires suggestion
  b.box(-2, 0, -6, 5, 6, 4, '#e8e0d0')
  for (const cx of [-1, 2] as const) {
    for (let y = 6; y < 14; y++) {
      b.add(cx, y, -4, '#d0c8b0')
      if (y > 10) b.add(cx, y, -4, GOLD)
    }
  }

  // modern towers inland
  for (let i = 0; i < 30; i++) {
    const x = randInt(rng, -17, 15)
    const z = randInt(rng, -16, -2)
    const h = randInt(rng, 5, 18)
    b.box(x, 0, z, randInt(rng, 2, 4), h, randInt(rng, 2, 3), pick(rng, MODERN))
  }

  // trees / greenery accents
  for (let i = 0; i < 25; i++) {
    const x = randInt(rng, -15, 15)
    const z = randInt(rng, -10, 6)
    b.add(x, 0, z, TREE)
    b.add(x, 1, z, TREE)
  }

  return b.build()
}
