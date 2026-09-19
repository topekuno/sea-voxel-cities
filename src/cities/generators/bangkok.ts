import { createRng, randInt, pick } from '../rng'
import { VoxelBuilder } from '../voxelHelpers'
import type { ColorGroup } from '../types'

const GOLD = '#d4a017'
const CREAM = '#f5e6c8'
const ORANGE = '#e07b39'
const TEAL = '#2a6b5a'
const WHITE = '#f0ebe3'
const ROOF = '#8b4513'
const GROUND = '#3d4a3a'
const BUILDING = ['#6b7b8a', '#4a5560', '#8a9aaa', '#5c6b5a'] as const

export function generateBangkok(): ColorGroup[] {
  const b = new VoxelBuilder()
  const rng = createRng(55)
  b.groundPlane(0, 0, 21, GROUND)

  // Central temple complex
  b.box(-3, 0, -3, 7, 4, 7, CREAM)
  // golden stupa / prang
  for (let y = 4; y < 16; y++) {
    const r = Math.max(0, 3 - Math.floor((y - 4) / 3))
    for (let x = -r; x <= r; x++) {
      for (let z = -r; z <= r; z++) {
        if (Math.abs(x) === r && Math.abs(z) === r && r > 0) continue
        b.add(x, y, z, GOLD)
      }
    }
  }
  for (let y = 16; y < 20; y++) b.add(0, y, 0, GOLD)

  // side chedis
  for (const cx of [-8, 8] as const) {
    for (let y = 0; y < 10; y++) {
      const r = y > 6 ? 0 : 1
      for (let x = cx - r; x <= cx + r; x++) {
        for (let z = -r; z <= r; z++) b.add(x, y, z, GOLD)
      }
    }
  }

  // temple walls accents
  for (let x = -4; x <= 4; x++) {
    b.add(x, 4, -3, ORANGE)
    b.add(x, 4, 3, ORANGE)
  }

  // mixed city around
  for (let i = 0; i < 45; i++) {
    const x = randInt(rng, -18, 16)
    const z = randInt(rng, -16, 16)
    if (Math.abs(x) < 10 && Math.abs(z) < 8) continue
    const h = randInt(rng, 3, 16)
    const w = randInt(rng, 2, 4)
    const d = randInt(rng, 2, 3)
    const color = rng() > 0.85 ? TEAL : pick(rng, BUILDING)
    b.box(x, 0, z, w, h, d, color)
    if (h <= 5 && rng() > 0.5) {
      b.box(x, h, z, w, 1, d, ROOF)
    }
  }

  // a few white modern towers
  for (let i = 0; i < 5; i++) {
    const x = randInt(rng, -17, 15)
    const z = randInt(rng, -15, 15)
    if (Math.abs(x) < 10 && Math.abs(z) < 8) continue
    b.box(x, 0, z, 3, randInt(rng, 12, 18), 3, WHITE)
  }

  return b.build()
}
