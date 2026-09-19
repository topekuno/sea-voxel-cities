import { createRng, randInt, pick } from '../rng'
import { VoxelBuilder } from '../voxelHelpers'
import type { ColorGroup } from '../types'

const PASTELS = [
  '#e07a5f',
  '#f2cc8f',
  '#81b29a',
  '#3d405b',
  '#f4f1de',
  '#e8a87c',
  '#85c1e9',
  '#c39bd3',
] as const
const ROOF = '#5c4033'
const GROUND = '#c4a882'
const STREET = '#8a7a6a'

export function generateGeorgeTown(): ColorGroup[] {
  const b = new VoxelBuilder()
  const rng = createRng(77)
  b.groundPlane(0, 0, 20, GROUND)

  // street grid
  for (let x = -16; x <= 16; x++) {
    for (let z of [-1, 0, 1, 8, 9]) {
      b.add(x, -1, z, STREET)
    }
  }

  // rows of colorful shophouses
  for (let row = 0; row < 4; row++) {
    const zBase = row < 2 ? -10 + row * 4 : 4 + (row - 2) * 4
    let x = -14
    while (x < 14) {
      const w = randInt(rng, 2, 3)
      const h = randInt(rng, 3, 6)
      const d = 3
      const wall = pick(rng, PASTELS)
      b.box(x, 0, zBase, w, h, d, wall)
      // roof ridge
      for (let rx = x; rx < x + w; rx++) {
        b.add(rx, h, zBase + 1, ROOF)
      }
      // shutter accent
      if (h >= 3) {
        b.add(x + Math.floor(w / 2), 1, zBase, '#2c2c2c')
      }
      x += w + 1
    }
  }

  // a few taller colonial corners
  for (let i = 0; i < 6; i++) {
    const x = randInt(rng, -15, 12)
    const z = randInt(rng, -14, 14)
    if (z > -2 && z < 3) continue
    b.box(x, 0, z, 3, randInt(rng, 5, 8), 3, pick(rng, PASTELS))
  }

  return b.build()
}
