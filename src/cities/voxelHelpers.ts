import type { ColorGroup, Vec3 } from './types'

/** Mutable map from color hex → positions (for efficient InstancedMesh grouping). */
export class VoxelBuilder {
  private map = new Map<string, Vec3[]>()

  add(x: number, y: number, z: number, color: string): void {
    let list = this.map.get(color)
    if (!list) {
      list = []
      this.map.set(color, list)
    }
    list.push([x, y, z])
  }

  box(
    x0: number,
    y0: number,
    z0: number,
    w: number,
    h: number,
    d: number,
    color: string,
  ): void {
    for (let y = y0; y < y0 + h; y++) {
      for (let x = x0; x < x0 + w; x++) {
        for (let z = z0; z < z0 + d; z++) {
          this.add(x, y, z, color)
        }
      }
    }
  }

  /** Column / tower with optional tapering tip. */
  column(
    cx: number,
    cz: number,
    h: number,
    size: number,
    color: string,
  ): void {
    const half = Math.floor(size / 2)
    for (let y = 0; y < h; y++) {
      for (let x = cx - half; x <= cx - half + size - 1; x++) {
        for (let z = cz - half; z <= cz - half + size - 1; z++) {
          this.add(x, y, z, color)
        }
      }
    }
  }

  groundPlane(cx: number, cz: number, radius: number, color: string, y = -1): void {
    for (let x = cx - radius; x <= cx + radius; x++) {
      for (let z = cz - radius; z <= cz + radius; z++) {
        if ((x - cx) * (x - cx) + (z - cz) * (z - cz) <= radius * radius) {
          this.add(x, y, z, color)
        }
      }
    }
  }

  build(): ColorGroup[] {
    return Array.from(this.map.entries()).map(([color, positions]) => ({
      color,
      positions,
    }))
  }
}
