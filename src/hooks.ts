import { useEffect, useState, type CSSProperties } from 'react'

// Index for staggered reveal delays, read by `.reveal` in CSS
export const stagger = (i: number) => ({ '--i': i }) as CSSProperties

// Fades `.reveal` elements in the first time they scroll into view
export function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px' },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > threshold)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

// True once the element with `id` has scrolled up behind the header
export function useScrolledPast(id: string) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) =>
        setPast(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { rootMargin: '-64px 0px 0px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [id])

  return past
}

type Theme = 'light' | 'dark'

function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme
  if (chosen === 'light' || chosen === 'dark') return chosen
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Storage can be unavailable (private mode); the choice just won't persist
    }
    setTheme(next)
  }

  return { theme, toggle }
}
