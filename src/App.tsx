import { useEffect, useState } from 'react'
import './App.css'

type Project = {
  id: string
  name: string
  role: string
  desc: string
  stack: string[]
  year: string
  href: string
  type: string
}

type ExperienceEntry = {
  id: string
  org: string
  role: string
  loc: string
  period: string
  desc: string
}

const projects: Project[] = [
  {
    id: '01',
    name: 'Byte Blasters',
    role: 'Topdown shooter',
    desc: 'Arcade-style rogue-lite bullet-hell built solo over 15k+ lines of C#. Playable alpha on itch.io',
    stack: ['Unity', 'C#'],
    year: '2023',
    href: 'https://nagahole.itch.io/byte-blasters-alpha-testing',
    type: 'Game · Solo',
  },
  {
    id: '02',
    name: 'PocketWise',
    role: 'Mobile finance tracker',
    desc: 'Budget tracking with Google & Apple SSO, real-time persistence, and spending-trend analytics. Built end-to-end as a solo project.',
    stack: ['React Native', 'Firebase', 'JavaScript'],
    year: '2023',
    href: 'https://github.com/nagahole/pocketwise',
    type: 'Mobile · Solo',
  },
  {
    id: '03',
    name: 'CS Capstone (Advanced)',
    role: 'ML image synthesis',
    desc: 'Collaborative software project synthesising CT from MRI scans. Full SDLC under industry mentorship',
    stack: ['Python', 'Machine Learning', 'GCP', 'Team'],
    year: '2025',
    href: 'https://github.com/COMP3988/COMP3988_F12_01',
    type: 'Capstone · Team',
  },
  {
    id: '04',
    name: 'Scope',
    role: 'Aim trainer',
    desc: 'Solo-built indie aim trainer published on itch.io. Focused on tight feel and clean design.',
    stack: ['Unity', 'C#'],
    year: '2020',
    href: 'https://nagahole.itch.io/scope',
    type: 'Game · Solo',
  },
]

const experience: ExperienceEntry[] = [
  {
    id: '01',
    org: 'Jane Street',
    role: 'Software Engineer Intern',
    loc: 'Hong Kong',
    period: 'Dec 2025 — Jan 2026',
    desc: 'Backend systems in OCaml — RPC servers within latency-sensitive trading infrastructure. Contributed to a parallelisation initiative for internal computational throughput. Worked within strict code-review, testing, and reliability standards.',
  },
  {
    id: '02',
    org: 'University of Sydney',
    role: 'Tutor — COMP2017 / COMP3221',
    loc: 'Sydney',
    period: 'Feb 2025 — Jul 2025',
    desc: 'Weekly tutorials in Systems Programming (C) and Distributed Systems. Memory management, low-level addressing, threading, synchronisation, routing, consensus protocols, and blockchain security.',
  },
  {
    id: '03',
    org: 'SoleAgents',
    role: 'Web Developer',
    loc: 'Remote',
    period: 'Jan 2025 — Present',
    desc: 'Designed and deployed a WordPress real estate platform with subscription mailing lists, dynamic property filtering, and automated inquiry routing.',
  },
  {
    id: '04',
    org: 'University of Sydney',
    role: 'Software Developer',
    loc: 'Sydney',
    period: 'Mar 2024 — Dec 2024',
    desc: 'Built interactive chemistry simulations in Unity (C#) with biochemistry faculty — liquid transfer modelling pH/volume/concentration changes, with real-time 3D visual feedback.',
  },
]

const stackGroups: { label: string; items: string[] }[] = [
  {
    label: 'languages',
    items: ['OCaml', 'C', 'Python', 'C#', 'JavaScript', 'Java'],
  },
  {
    label: 'systems',
    items: [
      'RPC',
      'Distributed Systems',
      'Multithreading',
      'Synchronisation',
      'Networking',
      'Parallelisation',
    ],
  },
  {
    label: 'frameworks',
    items: ['React', 'React Native', 'Firebase', 'Unity', 'WordPress'],
  },
]

function useUtcClock() {
  const [time, setTime] = useState(() => formatUtc(new Date()))
  useEffect(() => {
    const id = setInterval(() => setTime(formatUtc(new Date())), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function formatUtc(d: Date) {
  const h = String(d.getUTCHours()).padStart(2, '0')
  const m = String(d.getUTCMinutes()).padStart(2, '0')
  const s = String(d.getUTCSeconds()).padStart(2, '0')
  return `${h}:${m}:${s}Z`
}

function SectionHead({
  num,
  title,
  hint,
}: {
  num: string
  title: string
  hint: string
}) {
  return (
    <header className="section-head">
      <span className="section-num">[{num}]</span>
      <span className="section-bar" aria-hidden />
      <h2 className="section-title">{title}</h2>
      <span className="section-hint">// {hint}</span>
    </header>
  )
}

function App() {
  const clock = useUtcClock()

  return (
    <div className="app">
      <div className="grid-bg" aria-hidden />
      <div className="scanlines" aria-hidden />

      <header className="nav">
        <div className="nav-inner">
          <a className="brand" href="#top">
            <span className="brand-bracket">[</span>
            <span className="brand-text">NAGAHOLE</span>
            <span className="brand-bracket">]</span>
            <span className="brand-version">v2026.1</span>
          </a>
          <nav className="nav-links">
            <a href="#projects">projects</a>
            <a href="#experience">experience</a>
            <a href="#stack">stack</a>
            <a href="#contact">contact</a>
            <a
              className="nav-resume"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              resume <span className="arrow">↓</span>
            </a>
          </nav>
          <span className="status-clock">{clock}</span>
        </div>
      </header>

      <main className="main">
        <section id="top" className="hero">
          <div className="hero-left">
            <div className="eyebrow">
              <span className="bracket">//</span>
              SOFTWARE ENGINEER · AUCKLAND / SYDNEY
            </div>
            <h1 className="name">
              Rick Wang
              <span className="caret" aria-hidden>
                _
              </span>
            </h1>
            <p className="lede">
              Systems engineer. Former SWE intern at <em>Jane Street</em>.
              Looking for what's next in 2026/27.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects">
                <span>View Projects</span>
                <span className="arrow">↗</span>
              </a>
              <a className="btn" href="mailto:rickwang121@gmail.com">
                <span>Contact</span>
              </a>
            </div>
          </div>

          <div className="hero-side">
            <aside className="status-card" aria-label="Availability">
              <div className="card-head card-head-accent">
                <span className="dot" aria-hidden />
                <span>STATUS.log</span>
                <span className="card-head-spacer">0x00</span>
              </div>
              <p className="status-body">open to '26/27 new grad</p>
            </aside>

            <aside className="hero-card" aria-label="System info">
              <div className="card-head">
                <span className="dot dot-amber" aria-hidden />
                <span>SYSTEM_INFO.log</span>
                <span className="card-head-spacer">0x01</span>
              </div>
              <dl className="kv">
                <div>
                  <dt>last</dt>
                  <dd>SWE Intern @ Jane Street</dd>
                </div>
                <div>
                  <dt>focus</dt>
                  <dd>systems · distributed · fintech</dd>
                </div>
                <div>
                  <dt>edu</dt>
                  <dd>USyd · CS Major / Cybersec Minor</dd>
                </div>
                <div>
                  <dt>awards</dt>
                  <dd>GS Caird · High Honour · Dean's List</dd>
                </div>
                <div>
                  <dt>wam</dt>
                  <dd>86.63 / HD avg</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section id="projects" className="section">
          <SectionHead num="01" title="PROJECTS" hint="selected_builds" />
          <div className="projects">
            {projects.map((p) => (
              <a
                key={p.id}
                className="project"
                href={p.href}
                target="_blank"
                rel="noreferrer"
              >
                <div className="project-head">
                  <span className="project-id">{p.id}</span>
                  <span className="project-type">{p.type}</span>
                  <span className="project-year">{p.year}</span>
                </div>
                <h3 className="project-name">{p.name}</h3>
                <p className="project-role">{p.role}</p>
                <p className="project-desc">{p.desc}</p>
                <ul className="project-stack">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <div className="project-cta">
                  <span>VIEW</span>
                  <span className="arrow">↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <SectionHead num="02" title="EXPERIENCE" hint="recent_first" />
          <ol className="exp">
            {experience.map((e) => (
              <li key={e.id} className="exp-item">
                <div className="exp-marker">
                  <span className="exp-id">{e.id}</span>
                </div>
                <div className="exp-body">
                  <div className="exp-head">
                    <h3 className="exp-role">{e.role}</h3>
                    <span className="exp-period">{e.period}</span>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-org">{e.org}</span>
                    <span className="exp-sep">·</span>
                    <span className="exp-loc">{e.loc}</span>
                  </div>
                  <p className="exp-desc">{e.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="stack" className="section">
          <SectionHead num="03" title="STACK" hint="tools_of_the_trade" />
          {stackGroups.map((g) => (
            <div key={g.label} className="stack-group">
              <p className="stack-label">{g.label}</p>
              <ul className="stack">
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section id="contact" className="section">
          <SectionHead num="04" title="CONTACT" hint="end_of_transmission" />
          <div className="contact-grid">
            <a className="contact-link" href="mailto:rickwang121@gmail.com">
              <span className="contact-key">email</span>
              <span className="contact-val">rickwang121@gmail.com</span>
              <span className="arrow">↗</span>
            </a>
            <a
              className="contact-link"
              href="https://github.com/nagahole"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-key">github</span>
              <span className="contact-val">@nagahole</span>
              <span className="arrow">↗</span>
            </a>
            <a
              className="contact-link"
              href="https://linkedin.com/in/rick-wang-nz"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-key">linkedin</span>
              <span className="contact-val">rick-wang-nz</span>
              <span className="arrow">↗</span>
            </a>
            <div className="contact-link contact-static">
              <span className="contact-key">location</span>
              <span className="contact-val">Sydney / Auckland · GMT+11</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span>© {new Date().getFullYear()} RICK WANG</span>
          <span className="footer-dim">/// END_OF_TRANSMISSION</span>
        </div>
      </footer>
    </div>
  )
}

export default App
