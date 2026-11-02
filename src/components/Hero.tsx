import { hero, profile } from '../data'
import { stagger } from '../hooks'
import NowPanel from './NowPanel'
import Stats from './Stats'

// Renders *word* as emphasised
function rich(text: string) {
  return text.split('*').map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))
}

export default function Hero() {
  return (
    <section id="about" className="hero" aria-label="About">
      <div className="hero-frame">
        <span className="crop crop-tl" aria-hidden />
        <span className="crop crop-tr" aria-hidden />
        <span className="crop crop-bl" aria-hidden />
        <span className="crop crop-br" aria-hidden />

        <div className="hero-copy">
          <p className="label reveal" style={stagger(0)}>
            {hero.eyebrow}
          </p>
          <h1 className="hero-name reveal" style={stagger(1)}>
            {profile.name}
          </h1>
          <p className="hero-lede reveal" style={stagger(2)}>
            {rich(hero.lede)}
          </p>
          <p className="hero-sub reveal" style={stagger(3)}>
            {hero.sub}
          </p>
          <div className="hero-actions reveal" style={stagger(4)}>
            <a className="btn btn-solid" href="#projects">
              View projects <span aria-hidden>→</span>
            </a>
            <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">
              Résumé <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <NowPanel />
      </div>

      <Stats />
    </section>
  )
}
