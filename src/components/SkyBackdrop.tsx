import { useMemo } from 'react'
import { BackSide, Color, ShaderMaterial } from 'three'
import type { CityPalette } from '../cities'

const vert = /* glsl */ `
varying vec3 vWorldPosition;
void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const frag = /* glsl */ `
uniform vec3 topColor;
uniform vec3 bottomColor;
varying vec3 vWorldPosition;
void main() {
  float h = normalize(vWorldPosition).y;
  float t = smoothstep(-0.2, 0.65, h);
  gl_FragColor = vec4(mix(bottomColor, topColor, t), 1.0);
}
`

export function SkyBackdrop({ palette }: { palette: CityPalette }) {
  const material = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        topColor: { value: new Color(palette.skyTop) },
        bottomColor: { value: new Color(palette.skyBottom) },
      },
      vertexShader: vert,
      fragmentShader: frag,
      side: BackSide,
      depthWrite: false,
    })
  }, [palette.skyTop, palette.skyBottom])

  return (
    <mesh material={material}>
      <sphereGeometry args={[120, 32, 16]} />
    </mesh>
  )
}
