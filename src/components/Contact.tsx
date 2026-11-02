import { useEffect, useState } from 'react'
import { profile } from '../data'

function copyWithSelection(text: string) {
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.appendChild(field)
  field.select()
  const ok = document.execCommand('copy')
  field.remove()
  return ok
}

const links = [
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'Résumé', href: profile.resume },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      // The Clipboard API can be denied; fall back to a hidden selection
      setCopied(copyWithSelection(profile.email))
    }
  }

  return (
    <div className="contact">
      <p className="contact-statement label reveal">Email is the best way to reach me</p>

      <div className="email-row reveal">
        <a className="email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <button
          type="button"
          className={`btn btn-small copy${copied ? ' is-copied' : ''}`}
          onClick={copy}
          aria-label="Copy email address"
        >
          <span className="copy-label">Copy</span>
          <span className="copy-done" aria-hidden>
            Copied
          </span>
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? 'Email address copied' : ''}
        </span>
      </div>

      <ul className="contact-links label reveal">
        {links.map((link) => (
          <li key={link.label}>
            <a className="link" href={link.href} target="_blank" rel="noreferrer">
              {link.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
