import { useEffect, useState } from 'react'
import { profile } from '../data'

function formatUtc(d: Date) {
  const h = String(d.getUTCHours()).padStart(2, '0')
  const m = String(d.getUTCMinutes()).padStart(2, '0')
  const s = String(d.getUTCSeconds()).padStart(2, '0')
  return `${h}:${m}:${s}Z`
}

function useUtcClock() {
  const [time, setTime] = useState(() => formatUtc(new Date()))
  useEffect(() => {
    const id = setInterval(() => setTime(formatUtc(new Date())), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

const navItems = [
  { label: 'projects', href: '#projects' },
  { label: 'experience', href: '#experience' },
  { label: 'stack', href: '#stack' },
  { label: 'contact', href: '#contact' },
]

export default function Nav() {
  const clock = useUtcClock()

  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="brand" href="#top">
          <span className="brand-bracket">[</span>
          <span className="brand-text">{profile.handle}</span>
          <span className="brand-bracket">]</span>
          <span className="brand-version">{profile.version}</span>
        </a>
        <nav className="nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a
            className="nav-resume"
            href={profile.resumeHref}
            target="_blank"
            rel="noreferrer"
          >
            resume <span className="arrow">↓</span>
          </a>
        </nav>
        <span className="status-clock">{clock}</span>
      </div>
    </header>
  )
}
