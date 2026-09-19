import type { CityDefinition } from './types'
import { generateKualaLumpur } from './generators/kualaLumpur'
import { generateGeorgeTown } from './generators/georgeTown'
import { generateSingapore } from './generators/singapore'
import { generateBangkok } from './generators/bangkok'
import { generateJakarta } from './generators/jakarta'
import { generateHoChiMinh } from './generators/hoChiMinh'
import { generateManila } from './generators/manila'

export type { CityDefinition, ColorGroup, CityPalette, Vec3 } from './types'

export const CITIES: CityDefinition[] = [
  {
    id: 'kuala-lumpur',
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    flavor: 'Twin towers pierce a neon-tinged tropical night.',
    palette: {
      skyTop: '#0a1628',
      skyBottom: '#1a3a4a',
      fog: '#0d2030',
      ground: '#1e2830',
      ambient: '#4a7080',
      sun: '#e8c87a',
    },
    generate: generateKualaLumpur,
  },
  {
    id: 'george-town',
    name: 'George Town',
    country: 'Penang, Malaysia',
    flavor: 'Heritage shophouses in a wash of tropical pastels.',
    palette: {
      skyTop: '#87b8d8',
      skyBottom: '#f5d6a8',
      fog: '#c8d8e0',
      ground: '#c4a882',
      ambient: '#fff5e6',
      sun: '#ffe0a0',
    },
    generate: generateGeorgeTown,
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    flavor: 'Garden city steel — Marina lights on the bay.',
    palette: {
      skyTop: '#0c1a2e',
      skyBottom: '#1a4060',
      fog: '#0a2038',
      ground: '#2a3038',
      ambient: '#5a8098',
      sun: '#f0d090',
    },
    generate: generateSingapore,
  },
  {
    id: 'bangkok',
    name: 'Bangkok',
    country: 'Thailand',
    flavor: 'Golden spires rise above a restless megacity.',
    palette: {
      skyTop: '#2a1a40',
      skyBottom: '#e07840',
      fog: '#4a2840',
      ground: '#3d4a3a',
      ambient: '#d4a060',
      sun: '#ffc060',
    },
    generate: generateBangkok,
  },
  {
    id: 'jakarta',
    name: 'Jakarta',
    country: 'Indonesia',
    flavor: 'A dense grid of warm concrete and restless energy.',
    palette: {
      skyTop: '#1a2438',
      skyBottom: '#d47840',
      fog: '#3a3030',
      ground: '#3a342c',
      ambient: '#c09070',
      sun: '#ffb070',
    },
    generate: generateJakarta,
  },
  {
    id: 'ho-chi-minh',
    name: 'Ho Chi Minh City',
    country: 'Vietnam',
    flavor: 'River light, colonial cream, and glass towers.',
    palette: {
      skyTop: '#4a7a9a',
      skyBottom: '#c8e0d0',
      fog: '#8ab0b8',
      ground: '#4a5a48',
      ambient: '#e8f0e8',
      sun: '#ffe8a0',
    },
    generate: generateHoChiMinh,
  },
  {
    id: 'manila',
    name: 'Manila',
    country: 'Philippines',
    flavor: 'A bay-facing skyline against deep Pacific blue.',
    palette: {
      skyTop: '#0a2040',
      skyBottom: '#3a80a0',
      fog: '#1a4060',
      ground: '#2a3540',
      ambient: '#70a0b8',
      sun: '#f0c878',
    },
    generate: generateManila,
  },
]
