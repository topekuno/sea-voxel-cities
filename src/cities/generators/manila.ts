import { createRng, randInt, pick } from '../rng'
import { VoxelBuilder } from '../voxelHelpers'
import type { ColorGroup } from '../types'

const BAY = '#1a5a7a'
const DEEP = '#0d3a50'
const SKYLINE = ['#4a5a68', '#6a7a88', '#3a4550', '#8a9aaa', '#d0d5dc'] as const
const WARM = '#c4a060'
const GROUND = '#2a3540'
const SAND = '#c2b280'

export function generateManila(): ColorGroup[] {
  const b = new VoxelBuilder()
  const rng = createRng(66)
  b.groundPlane(0, 0, 22, GROUND)

  // Manila Bay (front)
  for (let x = -22; x <= 22; x++) {
    for (let z = 6; z <= 20; z++) {
      const color = z > 12 ? DEEP : BAY
      b.add(x, -1, z, color)
    }
  }
  // baywalk / sand edge
  for (let x = -18; x <= 18; x++) {
    b.add(x, 0, 5, SAND)
    b.add(x, 0, 4, SAND)
  }

  // bay-facing skyline silhouette — denser center, tapering sides
  const silhouette: { x: number; h: number; w: number }[] = []
  for (let x = -16; x <= 14; x += 3) {
    const dist = Math.abs(x) / 16
    const h = Math.floor(8 + (1 - dist) * 14 + rng() * 4)
    silhouette.push({ x, h, w: randInt(rng, 2, 4) })
  }
  for (const { x, h, w } of silhouette) {
    const d = randInt(rng, 2, 4)
    const color = pick(rng, SKYLINE)
    b.box(x, 0, -2, w, h, d, color)
    // rooftop lights
    if (h > 14) b.add(x + Math.floor(w / 2), h, -1, WARM)
  }

  // deeper city rows
  for (let i = 0; i < 35; i++) {
    const x = randInt(rng, -17, 15)
    const z = randInt(rng, -16, -4)
    const h = randInt(rng, 4, 14)
    b.box(x, 0, z, randInt(rng, 2, 3), h, randInt(rng, 2, 3), pick(rng, SKYLINE))
  }

  // a couple signature towers near bay
  b.box(-3, 0, 0, 3, 24, 3, '#d8dde4')
  b.box(5, 0, 1, 4, 20, 3, '#6a8090')
  for (let y = 24; y < 27; y++) b.add(-2, y, 1, WARM)

  return b.build()
}
