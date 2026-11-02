import './App.css'
import Header from './components/Header'
import Intro from './components/Intro'
import Section from './components/Section'
import ExperienceList from './components/ExperienceList'
import ProjectList from './components/ProjectList'
import Education from './components/Education'
import Contact from './components/Contact'
import { profile } from './data'
import { useRevealOnScroll } from './hooks'

export default function App() {
  useRevealOnScroll()

  return (
    <>
      <Header />

      <main id="top" className="page">
        <Intro />
        <Section id="experience" title="Experience">
          <ExperienceList />
        </Section>
        <Section id="projects" title="Projects">
          <ProjectList />
        </Section>
        <Section id="education" title="Education">
          <Education />
        </Section>
        <Section id="contact" title="Contact">
          <Contact />
        </Section>
      </main>

      <footer className="footer">
        <div className="page footer-inner">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a className="link" href="#top">
            Back to top
          </a>
        </div>
      </footer>
    </>
  )
}
