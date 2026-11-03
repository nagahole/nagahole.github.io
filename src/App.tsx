import './App.css'
import Streaks from './components/Streaks'
import Hero from './components/Hero'
import Section from './components/Section'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Journey from './components/Journey'
import StatusLine from './components/StatusLine'
import { experience, journey, profile, projects } from './data'
import { useRevealOnScroll } from './hooks'

export default function App() {
  useRevealOnScroll()

  return (
    <>
      {/* Background: a drifting, blurred light field, a fine grid, then falling streaks */}
      <div className="aura" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="grid-bg" aria-hidden />
      <Streaks />

      <main className="page">
        <Hero />
        <Section id="journey" index={2} title="Journey" meta={`${journey.length} cities`}>
          <Journey />
        </Section>
        <Section id="work" index={3} title="Experience" meta={`${experience.length} roles`}>
          <Experience />
        </Section>
        <Section id="projects" index={4} title="Projects" meta={`${projects.length} projects`}>
          <Projects />
        </Section>
        <Section id="education" index={5} title="Education">
          <Education />
        </Section>
        <Section id="contact" index={6} title="Contact">
          <Contact />
        </Section>
      </main>

      <footer className="footer label faint">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Built with React, TypeScript and a canvas</span>
      </footer>

      <StatusLine />
    </>
  )
}
