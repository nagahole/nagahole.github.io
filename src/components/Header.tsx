import { profile } from '../data'
import { useScrolled, useScrolledPast } from '../hooks'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const scrolled = useScrolled()
  const showName = useScrolledPast('name')

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner">
        <a
          href="#top"
          className={`header-name${showName ? ' is-shown' : ''}`}
          aria-hidden={!showName}
          tabIndex={showName ? 0 : -1}
        >
          {profile.name}
        </a>
        <nav className="header-nav" aria-label="Sections">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
