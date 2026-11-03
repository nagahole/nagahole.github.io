import { useState } from 'react'
import { now, sideProject } from '../data'
import { stagger } from '../hooks'
import { TickBar } from './Viz'

// The side project stays folded away until hovered, or tapped on touch screens
function SideRow() {
  const [hovered, setHovered] = useState(false)
  const [pinned, setPinned] = useState(false)
  const open = hovered || pinned
  const { progress } = sideProject

  return (
    <div
      className={`now-side${open ? ' is-open' : ''}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
    >
      <button
        type="button"
        className="now-side-toggle"
        aria-expanded={open}
        aria-controls="now-side-body"
        onClick={() => setPinned((p) => !p)}
      >
        <span className="label faint">On the side</span>
        <span className="now-side-summary">{sideProject.summary}</span>
        <span className="now-side-icon" aria-hidden>
          +
        </span>
      </button>
      <div id="now-side-body" className="now-side-body" inert={!open}>
        <div>
          <p className="now-side-detail">{sideProject.detail}</p>
          <div className="now-progress">
            <TickBar filled={progress.lit / progress.of} ticks={progress.of} />
            <span className="label faint">{progress.label}</span>
            <a className="link label now-side-link" href={sideProject.href} target="_blank" rel="noreferrer">
              Code ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// A quiet readout of what I'm doing at the moment
export default function NowPanel() {
  return (
    <aside className="pane now reveal" style={stagger(3)} aria-label="Now">
      <dl className="now-rows">
        {now.map((row) => (
          <div key={row.key}>
            <dt className="label faint">{row.key}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      <SideRow />
    </aside>
  )
}
