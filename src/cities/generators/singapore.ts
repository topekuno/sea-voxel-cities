import { createRng, randInt, pick } from '../rng'
import { VoxelBuilder } from '../voxelHelpers'
import type { ColorGroup } from '../types'

const STEEL = '#d0d5dc'
const GLASS = '#6b8fa3'
const DARK = '#2c333a'
const GOLD = '#c9a84c'
const WATER = '#1a4a5c'
const GROUND = '#2a3038'
const GREEN = '#3d6b4f'

export function generateSingapore(): ColorGroup[] {
  const b = new VoxelBuilder()
  const rng = createRng(99)
  b.groundPlane(0, 0, 22, GROUND)

  // Marina water front
  for (let x = -20; x <= 20; x++) {
    for (let z = 10; z <= 18; z++) {
      b.add(x, -1, z, WATER)
      if (rng() > 0.7) b.add(x, -2, z, WATER)
    }
  }

  // Marina Bay Sands–like triple towers + sky park
  const bases = [-6, 0, 6] as const
  const towerH = 22
  for (const cx of bases) {
    for (let y = 0; y < towerH; y++) {
      for (let x = cx - 2; x <= cx + 2; x++) {
        for (let z = 2; z <= 6; z++) {
          b.add(x, y, z, y % 5 === 0 ? DARK : STEEL)
        }
      }
    }
  }
  // sky park slab on top
  for (let x = -9; x <= 9; x++) {
    for (let z = 1; z <= 7; z++) {
      b.add(x, towerH, z, GOLD)
      b.add(x, towerH + 1, z, GREEN)
    }
  }
  // slight cantilever tip
  for (let x = 9; x <= 12; x++) {
    for (let z = 2; z <= 6; z++) {
      b.add(x, towerH, z, GOLD)
    }
  }

  // dense CBD behind
  const palette = [STEEL, GLASS, DARK, '#8a9aaa', '#4a5a68'] as const
  for (let i = 0; i < 55; i++) {
    const x = randInt(rng, -18, 18)
    const z = randInt(rng, -16, 0)
    const w = randInt(rng, 2, 4)
    const d = randInt(rng, 2, 4)
    const h = randInt(rng, 6, 20)
    b.box(x, 0, z, w, h, d, pick(rng, palette))
  }

  return b.build()
}
