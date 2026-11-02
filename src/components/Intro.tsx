import { intro, profile } from '../data'
import { stagger } from '../hooks'

const links = [
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'GitHub', href: profile.github, external: true },
  { label: 'LinkedIn', href: profile.linkedin, external: true },
  { label: 'Résumé', href: profile.resume, external: true },
]

export default function Intro() {
  const paragraphs = intro

  return (
    <section className="intro" aria-label="Introduction">
      <h1 id="name" className="intro-name reveal" style={stagger(0)}>
        {profile.name}
      </h1>
      <p className="intro-role reveal" style={stagger(1)}>
        {profile.role}
      </p>

      {paragraphs.map((text, i) => (
        <p key={i} className="intro-text reveal" style={stagger(i + 2)}>
          {text}
        </p>
      ))}

      <ul
        className="intro-links reveal"
        style={stagger(paragraphs.length + 2)}
      >
        {links.map((link) => (
          <li key={link.label}>
            <a
              className="link"
              href={link.href}
              {...(link.external && { target: '_blank', rel: 'noreferrer' })}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
