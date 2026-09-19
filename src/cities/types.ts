export type Vec3 = [number, number, number]

export type ColorGroup = {
  color: string
  positions: Vec3[]
}

export type CityPalette = {
  skyTop: string
  skyBottom: string
  fog: string
  ground: string
  ambient: string
  sun: string
}

export type CityDefinition = {
  id: string
  name: string
  country: string
  flavor: string
  palette: CityPalette
  generate: () => ColorGroup[]
}
