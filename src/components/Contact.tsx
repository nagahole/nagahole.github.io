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
      <p className="contact-lede reveal">
        Email is the best way to reach me.
      </p>
      <div className="email-row reveal">
        <a className="link email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <button
          type="button"
          className={`copy${copied ? ' is-copied' : ''}`}
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
      <ul className="contact-links reveal">
        <li>
          <a className="link" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a className="link" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a className="link" href={profile.resume} target="_blank" rel="noreferrer">
            Résumé
          </a>
        </li>
      </ul>
    </div>
  )
}
