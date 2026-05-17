import { profile } from '../data'
import StatusCard from './StatusCard'
import SystemInfoCard from './SystemInfoCard'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-left">
        <div className="eyebrow">
          <span className="bracket">//</span>
          {profile.tagline}
        </div>
        <h1 className="name">
          {profile.name}
          <span className="caret" aria-hidden>
            _
          </span>
        </h1>
        <p className="lede">
          Systems engineer. Former SWE intern at <em>Jane Street</em>. Looking
          for what's next in 2026/27.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">
            <span>View Projects</span>
            <span className="arrow">↗</span>
          </a>
          <a className="btn" href={`mailto:${profile.email}`}>
            <span>Contact</span>
          </a>
        </div>
      </div>

      <div className="hero-side">
        <StatusCard />
        <SystemInfoCard />
      </div>
    </section>
  )
}
