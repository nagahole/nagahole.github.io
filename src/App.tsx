import './App.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Stack from './components/Stack'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app">
      <div className="grid-bg" aria-hidden />
      <div className="scanlines" aria-hidden />

      <Nav />

      <main className="main">
        <Hero />
        <Projects />
        <Experience />
        <Stack />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
