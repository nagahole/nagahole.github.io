import { useEffect, useRef } from 'react'
import { profile, sections } from '../data'
import { useActiveSection, useSfClock } from '../hooks'

const ids = sections.map((s) => s.id)
const pad = (n: number) => String(Math.round(n)).padStart(4, '0')

// A tmux-style status line: session, windows (the sections), cursor and clock
export default function StatusLine() {
  const active = useActiveSection(ids)
  const clock = useSfClock()
  const coords = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let raf = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (coords.current) coords.current.textContent = `x ${pad(e.clientX)}  y ${pad(e.clientY)}`
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <nav className="statusline" aria-label="Sections">
      <a className="sl-session" href="#about">
        {profile.handle}
      </a>
      <ol className="sl-windows">
        {sections.map((s, i) => {
          const isActive = s.id === active
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={isActive ? 'is-active' : undefined}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className="sl-num">{i + 1}</span>
                <span className="sl-name">:{s.label}</span>
                {isActive && <span className="sl-flag">*</span>}
              </a>
            </li>
          )
        })}
      </ol>
      <span className="sl-right">
        <span ref={coords} className="sl-coords" aria-hidden>
          x 0000 y 0000
        </span>
        <span className="sl-clock">SF {clock}</span>
      </span>
    </nav>
  )
}
