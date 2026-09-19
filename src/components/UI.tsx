import type { CityDefinition } from '../cities'

type Props = {
  cities: CityDefinition[]
  index: number
  onPrev: () => void
  onNext: () => void
  onSelect: (i: number) => void
  fading: boolean
}

export function UI({ cities, index, onPrev, onNext, onSelect, fading }: Props) {
  const city = cities[index]!

  return (
    <div className={`ui-overlay${fading ? ' ui-fading' : ''}`}>
      <header className="ui-header">
        <p className="ui-kicker">SEA Voxel Cities</p>
        <h1 className="ui-title">{city.name}</h1>
        <p className="ui-country">{city.country}</p>
        <p className="ui-flavor">{city.flavor}</p>
      </header>

      <nav className="ui-nav" aria-label="City navigation">
        <button type="button" className="nav-btn" onClick={onPrev} aria-label="Previous city">
          <span className="nav-arrow" aria-hidden>
            ‹
          </span>
          <span className="nav-label">Prev</span>
        </button>

        <div className="dots" role="tablist" aria-label="Cities">
          {cities.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={c.name}
              className={`dot${i === index ? ' active' : ''}`}
              onClick={() => onSelect(i)}
            />
          ))}
        </div>

        <button type="button" className="nav-btn" onClick={onNext} aria-label="Next city">
          <span className="nav-label">Next</span>
          <span className="nav-arrow" aria-hidden>
            ›
          </span>
        </button>
      </nav>

      <p className="ui-hint">Use ← → arrow keys</p>
    </div>
  )
}
