import { createRng, randInt, pick } from '../rng'
import { VoxelBuilder } from '../voxelHelpers'
import type { ColorGroup } from '../types'

const SILVER = '#a8b4c4'
const TEAL = '#1a6b6b'
const DARK = '#2a3540'
const GLASS = '#4a90a4'
const ACCENT = '#c9a227'
const GROUND = '#1e2830'

export function generateKualaLumpur(): ColorGroup[] {
  const b = new VoxelBuilder()
  const rng = createRng(42)
  b.groundPlane(0, 0, 22, GROUND)

  // Petronas twin towers
  const towerH = 28
  for (const cx of [-4, 4] as const) {
    for (let y = 0; y < towerH; y++) {
      const taper = y > 20 ? 1 : y > 12 ? 2 : 3
      for (let x = cx - taper; x <= cx + taper; x++) {
        for (let z = -taper; z <= taper; z++) {
          // octagon-ish: skip corners for mid levels
          if (taper >= 2 && Math.abs(x - cx) === taper && Math.abs(z) === taper) continue
          const color = y % 4 === 3 ? TEAL : y > 22 ? ACCENT : SILVER
          b.add(x, y, z, color)
        }
      }
    }
    // spire
    for (let y = towerH; y < towerH + 6; y++) {
      b.add(cx, y, 0, ACCENT)
    }
  }
  // skybridge
  for (let x = -3; x <= 3; x++) {
    b.add(x, 14, 0, GLASS)
    b.add(x, 15, 0, GLASS)
    b.add(x, 14, 1, DARK)
    b.add(x, 14, -1, DARK)
  }

  // surrounding modern skyline
  const greys = [DARK, '#3a4550', GLASS, '#5a6a78', TEAL] as const
  for (let i = 0; i < 40; i++) {
    const x = randInt(rng, -18, 18)
    const z = randInt(rng, -16, 16)
    if (Math.abs(x) < 9 && Math.abs(z) < 6) continue
    const w = randInt(rng, 2, 4)
    const d = randInt(rng, 2, 4)
    const h = randInt(rng, 4, 18)
    const color = pick(rng, greys)
    b.box(x, 0, z, w, h, d, color)
  }

  return b.build()
}
