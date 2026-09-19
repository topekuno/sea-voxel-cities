import { createRng, randInt, pick } from '../rng'
import { VoxelBuilder } from '../voxelHelpers'
import type { ColorGroup } from '../types'

const WARM = ['#c4a574', '#8b7355', '#6b5a4a', '#a09080'] as const
const MID = ['#5a6a78', '#4a5560', '#7a8a98', '#3d4852'] as const
const ACCENT = '#c45c26'
const GROUND = '#3a342c'
const ROAD = '#2a2824'

export function generateJakarta(): ColorGroup[] {
  const b = new VoxelBuilder()
  const rng = createRng(33)
  b.groundPlane(0, 0, 22, GROUND)

  // dense urban grid
  for (let gx = -16; gx <= 16; gx += 5) {
    for (let gz = -16; gz <= 16; gz += 5) {
      // roads
      for (let i = 0; i < 5; i++) {
        b.add(gx + i, -1, gz, ROAD)
        b.add(gx, -1, gz + i, ROAD)
      }
      if (rng() < 0.15) continue
      const w = randInt(rng, 2, 3)
      const d = randInt(rng, 2, 3)
      const h = randInt(rng, 4, 16)
      const palette = h > 10 ? MID : WARM
      b.box(gx + 1, 0, gz + 1, w, h, d, pick(rng, palette))
      if (rng() > 0.7 && h > 8) {
        b.add(gx + 1 + Math.floor(w / 2), h, gz + 1 + Math.floor(d / 2), ACCENT)
      }
    }
  }

  // a few landmark high-rises
  for (const [x, z, h] of [
    [-6, -4, 22],
    [4, 2, 20],
    [10, -8, 18],
    [-12, 6, 17],
  ] as const) {
    b.box(x, 0, z, 4, h, 4, pick(rng, MID))
    b.box(x, h, z, 4, 1, 4, ACCENT)
  }

  return b.build()
}
