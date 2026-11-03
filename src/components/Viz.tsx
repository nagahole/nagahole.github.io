import { useId, type CSSProperties } from 'react'

// Small monochrome data-viz ornaments. Each seed always draws the same shape.

function hash(text: string) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function random(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Smoothed random walk with a gentle upward drift, normalised to 0..1
function walk(seed: string, n: number) {
  const next = random(hash(seed))
  const raw: number[] = []
  let v = 0
  let velocity = 0
  for (let i = 0; i < n; i++) {
    velocity = velocity * 0.72 + (next() - 0.46) * 0.9
    v += velocity
    raw.push(v)
  }
  const min = Math.min(...raw)
  const max = Math.max(...raw)
  return raw.map((r) => (r - min) / (max - min || 1))
}

// Catmull-Rom spline through the points, as SVG path segments
function curve(points: [number, number][]) {
  let d = ''
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[Math.max(i - 1, 0)]
    const [x1, y1] = points[i]
    const [x2, y2] = points[i + 1]
    const [x3, y3] = points[Math.min(i + 2, points.length - 1)]
    const c1 = `${(x1 + (x2 - x0) / 6).toFixed(1)},${(y1 + (y2 - y0) / 6).toFixed(1)}`
    const c2 = `${(x2 - (x3 - x1) / 6).toFixed(1)},${(y2 - (y3 - y1) / 6).toFixed(1)}`
    d += ` C${c1} ${c2} ${x2.toFixed(1)},${y2.toFixed(1)}`
  }
  return d
}

// An area chart of `values` (0..1), or a seeded random walk when there's no data
export function Spark({ values, seed }: { values?: number[]; seed: string }) {
  const id = useId()
  const series = values ?? walk(seed, 26)
  const points = series.map((v, i): [number, number] => [(i / (series.length - 1)) * 300, 66 - v * 50])
  const line = `M${points[0][0]},${points[0][1]}${curve(points)}`
  const [endX, endY] = points[points.length - 1]

  return (
    <svg className="spark" viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-stroke`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <line className="spark-base" x1="0" x2="300" y1="40" y2="40" vectorEffect="non-scaling-stroke" />
      <path d={`${line} L300,80 L0,80 Z`} fill={`url(#${id}-fill)`} />
      <path
        className="spark-line"
        d={line}
        pathLength={1}
        fill="none"
        stroke={`url(#${id}-stroke)`}
        vectorEffect="non-scaling-stroke"
      />
      <line className="spark-cursor" x1={endX} x2={endX} y1="0" y2="80" vectorEffect="non-scaling-stroke" />
      <circle className="spark-dot" cx={endX} cy={endY} r="2.5" />
    </svg>
  )
}

// A hairline rule with a short, quiet wiggle in it
export function Divider({ seed }: { seed: string }) {
  const values = walk(seed, 12)
  const start = 620
  const end = 880
  const wiggle: [number, number][] = [
    [start, 12],
    ...values.map((v, i): [number, number] => [start + ((i + 1) / (values.length + 1)) * (end - start), 12 - (v - 0.5) * 14]),
    [end, 12],
  ]
  const d = `M0,12 L${start},12${curve(wiggle)} L1000,12`

  return (
    <svg className="divider" viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden>
      <path d={d} pathLength={1} fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

type TickBarProps = {
  filled: number
  ticks?: number
  // Lit ticks from this index on are hatched, for a related but different kind
  hatchedFrom?: number
}

function tickClass(i: number, lit: number, hatchedFrom?: number) {
  if (i >= lit) return undefined
  return hatchedFrom !== undefined && i >= hatchedFrom ? 'is-hatched' : 'is-lit'
}

// A barcode-style progress bar: `filled` (0..1) of the ticks are lit
export function TickBar({ filled, ticks = 48, hatchedFrom }: TickBarProps) {
  const lit = Math.round(filled * ticks)

  return (
    <div className="tickbar" aria-hidden>
      {/* --t staggers the ticks lighting up in sequence */}
      {Array.from({ length: ticks }, (_, i) => (
        <span
          key={i}
          className={tickClass(i, lit, hatchedFrom)}
          style={{ '--t': i / ticks } as CSSProperties}
        />
      ))}
    </div>
  )
}
