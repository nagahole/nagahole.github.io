import { useRef } from 'react'
import { stats, type Stat } from '../data'
import { stagger, useCountUp, useSeen } from '../hooks'
import { TickBar } from './Viz'

function StatValue({ stat, run }: { stat: Stat; run: boolean }) {
  const numeric = typeof stat.value === 'number'
  const value = useCountUp(numeric ? (stat.value as number) : 0, run && numeric)
  const shown = numeric ? value.toFixed(stat.decimals ?? 0) : stat.value

  return (
    <p className={`stat-value${numeric ? '' : ' is-text'}`}>
      {/* Screen readers get the final value, not the animation */}
      <span aria-hidden>
        {shown}
        {stat.suffix}
      </span>
      <span className="sr-only">
        {stat.value}
        {stat.suffix} {stat.label}
      </span>
    </p>
  )
}

function StatCell({ stat, index, run }: { stat: Stat; index: number; run: boolean }) {
  return (
    <li className="stat reveal" style={stagger(index)}>
      <p className="stat-top label">{stat.label}</p>
      <StatValue stat={stat} run={run} />
      {stat.ticks ? (
        <TickBar filled={stat.filled ?? 1} ticks={stat.ticks} hatchedFrom={stat.hatched?.from} />
      ) : (
        <div className="tickbar is-empty" aria-hidden />
      )}
      {stat.hatched ? (
        // A two-line legend matching the solid and hatched segments
        <p className="stat-note label">
          <span className="stat-note-line">
            <span className="swatch is-solid" aria-hidden />
            {stat.note}
          </span>
          <span className="stat-note-line">
            <span className="swatch" aria-hidden />
            {stat.hatched.label}
          </span>
        </p>
      ) : (
        <p className="stat-note label">{stat.note}</p>
      )}
    </li>
  )
}

export default function Stats() {
  const ref = useRef<HTMLUListElement>(null)
  const seen = useSeen(ref)

  return (
    <ul ref={ref} className="panel stats" aria-label="Highlights">
      {stats.map((stat, i) => (
        <StatCell key={stat.label} stat={stat} index={i} run={seen} />
      ))}
    </ul>
  )
}
