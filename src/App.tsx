import { useCallback, useEffect, useState } from 'react'
import { CITIES } from './cities'
import { VoxelCity } from './components/VoxelCity'
import { UI } from './components/UI'

const FADE_MS = 380

export default function App() {
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)

  const goTo = useCallback(
    (next: number) => {
      const wrapped = ((next % CITIES.length) + CITIES.length) % CITIES.length
      if (wrapped === index || fading) return
      setFading(true)
      window.setTimeout(() => {
        setIndex(wrapped)
        setFading(false)
      }, FADE_MS)
    },
    [index, fading],
  )

  const onPrev = useCallback(() => goTo(index - 1), [goTo, index])
  const onNext = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onPrev, onNext])

  const city = CITIES[index]!

  return (
    <div className="app">
      <VoxelCity city={city} fading={fading} />
      <UI
        cities={CITIES}
        index={index}
        onPrev={onPrev}
        onNext={onNext}
        onSelect={goTo}
        fading={fading}
      />
    </div>
  )
}
