import { useEffect, useRef } from 'react'

// Faint vertical streaks falling slowly down a column grid, as a quiet backdrop

function seededRandom(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Streak = {
  x: number
  y: number // position of the leading (lower) end
  length: number
  speed: number // px per second
  alpha: number
}

export default function Streaks() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const random = seededRandom(20231)
    let width = 0
    let height = 0
    let streaks: Streak[] = []
    let raf = 0
    let last = performance.now()

    const newStreak = (x: number, y: number): Streak => ({
      x,
      y,
      length: 80 + random() * 200,
      speed: 10 + random() * 28,
      alpha: 0.05 + random() * 0.07,
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // One or two streaks per column, scattered down the screen
      const gap = width < 640 ? 32 : 40
      streaks = []
      for (let x = gap / 2; x < width; x += gap) {
        const count = random() < 0.55 ? 1 : 2
        for (let j = 0; j < count; j++) streaks.push(newStreak(Math.round(x) + 0.5, random() * height * 1.2))
      }
    }

    const draw = (dt: number) => {
      // A tab that hasn't been shown yet can report a zero-sized window
      if (width < 1 || height < 1) return
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 1

      for (const s of streaks) {
        s.y += s.speed * dt
        if (s.y - s.length > height) Object.assign(s, newStreak(s.x, -random() * height * 0.4))

        const top = s.y - s.length
        // Fade out towards the top and bottom of the screen
        const mid = (top + s.y) / 2 / height
        const envelope = Math.max(0, Math.sin(Math.PI * Math.min(Math.max(mid, 0), 1)))
        if (envelope < 0.02) continue

        const g = ctx.createLinearGradient(0, top, 0, s.y)
        g.addColorStop(0, 'rgba(255, 255, 255, 0)')
        g.addColorStop(1, `rgba(255, 255, 255, ${s.alpha * envelope})`)
        ctx.strokeStyle = g
        ctx.beginPath()
        ctx.moveTo(s.x, top)
        ctx.lineTo(s.x, s.y)
        ctx.stroke()
      }
    }

    const frame = (now: number) => {
      // Schedule first, so one bad frame can't stop the animation
      raf = requestAnimationFrame(frame)
      const dt = Math.max(0, Math.min(now - last, 50)) / 1000
      last = now
      if (width < 1 || height < 1) resize()
      draw(dt)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }

    resize()

    if (reduceMotion) {
      draw(0)
      const redraw = () => {
        resize()
        draw(0)
      }
      window.addEventListener('resize', redraw)
      return () => window.removeEventListener('resize', redraw)
    }

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} className="streaks" aria-hidden />
}
