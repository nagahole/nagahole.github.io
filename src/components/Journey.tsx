import { useState } from 'react'
import { journey, type Stop } from '../data'
import { map } from '../mapData'

const CELL = 10
const WIDTH = map.cols * CELL
const HEIGHT = map.rows.length * CELL

// Land as one path of small squares, so the whole map is a single SVG element
const landPath = (() => {
  let d = ''
  map.rows.forEach((hex, r) => {
    for (let c = 0; c < map.cols; c++) {
      const nibble = parseInt(hex[c >> 2], 16)
      if (nibble & (8 >> (c & 3))) d += `M${c * CELL + 3.4} ${r * CELL + 3.4}h3.2v3.2h-3.2z`
    }
  })
  return d
})()

// Map a coordinate into the Pacific-centred window (longitudes past 180 unwrap)
function project(lat: number, lon: number) {
  const unwrapped = lon < 0 ? lon + 360 : lon
  const x = ((unwrapped - map.lonMin) / (map.lonMax - map.lonMin)) * WIDTH
  const y = ((map.latMax - lat) / (map.latMax - map.latMin)) * HEIGHT
  return { x, y }
}

const points = journey.map((stop) => ({ stop, ...project(stop.lat, stop.lon) }))

// A gentle arc between consecutive stops, always bowing upwards
const arcs = points.slice(1).map((to, i) => {
  const from = points[i]
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.hypot(dx, dy)
  let nx = -dy / length
  let ny = dx / length
  if (ny > 0) {
    nx = -nx
    ny = -ny
  }
  const bow = length * 0.22
  return { to: to.stop.id, d: `M${from.x} ${from.y} Q${mx + nx * bow} ${my + ny * bow} ${to.x} ${to.y}` }
})

const pct = (v: number, total: number) => `${(v / total) * 100}%`

// The card docks in the empty south-east Pacific, clear of every marker
function Card({ stop }: { stop: Stop }) {
  return (
    <div className="journey-card" aria-live="polite">
      <p className="label">
        {stop.code} <span className="faint">· {stop.period}</span>
      </p>
      <h3 className="journey-card-title">
        {stop.title}
        <span className="faint"> — {stop.place}</span>
      </h3>
      <p className="journey-card-blurb">{stop.blurb}</p>
    </div>
  )
}

export default function Journey() {
  const [activeId, setActiveId] = useState(journey[journey.length - 1].id)
  const active = points.find((p) => p.stop.id === activeId) ?? points[points.length - 1]

  return (
    <div className="panel journey reveal">
      {/* The card floats over the map on wide screens and sits below it on phones */}
      <div className="journey-stage">
        <div className="journey-map">
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden>
            <path className="journey-land" d={landPath} />
            {arcs.map((arc) => (
              <g key={arc.d} className={arc.to === activeId ? 'is-active' : undefined}>
                <path className="journey-arc" d={arc.d} pathLength={1} />
                <path className="journey-flow" d={arc.d} />
              </g>
            ))}
          </svg>

          {points.map(({ stop, x, y }, i) => {
            const classes = [
              'journey-pin',
              stop.id === activeId && 'is-active',
              i === points.length - 1 && 'is-current',
              // Near the right edge the code label goes on the dot's left
              x / WIDTH > 0.85 && 'is-flipped',
            ]
            return (
              <button
                key={stop.id}
                type="button"
                className={classes.filter(Boolean).join(' ')}
                style={{ left: pct(x, WIDTH), top: pct(y, HEIGHT) }}
                onPointerEnter={() => setActiveId(stop.id)}
                onFocus={() => setActiveId(stop.id)}
                onClick={() => setActiveId(stop.id)}
                aria-label={`${stop.place}, ${stop.period}`}
                aria-pressed={stop.id === activeId}
              >
                <span className="journey-pin-dot" aria-hidden />
                <span className="journey-pin-code label">{stop.code}</span>
              </button>
            )
          })}
        </div>
        <Card key={active.stop.id} stop={active.stop} />
      </div>

      <ol className="journey-list">
        {journey.map((stop) => (
          <li key={stop.id}>
            <button
              type="button"
              className={`journey-stop${stop.id === activeId ? ' is-active' : ''}`}
              onPointerEnter={() => setActiveId(stop.id)}
              onFocus={() => setActiveId(stop.id)}
              onClick={() => setActiveId(stop.id)}
            >
              <span className="label">{stop.code}</span>
              <span className="journey-stop-place">{stop.place}</span>
              <span className="label faint">{stop.period}</span>
              <span className="journey-stop-title">{stop.title}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
