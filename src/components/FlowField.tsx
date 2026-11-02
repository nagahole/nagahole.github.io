import { useEffect, useRef } from 'react'

// Two quiet layers on one canvas:
//  - faint vertical streaks falling slowly down a column grid, as a backdrop
//  - a ribbon of smooth, drifting strands that rises left to right and twists,
//    hinting at plots and signals without being a chart

// White strands that fade in from the left edge and out at the right;
// the colour comes from the blurred light field behind the canvas
const STOPS: [number, number][] = [
  [0, 0],
  [0.2, 0.5],
  [0.55, 1],
  [0.9, 0.7],
  [1, 0.2],
]

// Cheap smooth noise: a few sines at unrelated frequencies
function wave(x: number, seed: number, t: number) {
  return (
    Math.sin(x * 1.0 + seed + t * 0.55) * 0.55 +
    Math.sin(x * 2.3 + seed * 1.7 - t * 0.38) * 0.3 +
    Math.sin(x * 5.1 + seed * 0.6 + t * 0.9) * 0.15
  )
}

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

export default function FlowField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const random = seededRandom(20231)
    const mouse = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 }
    let width = 0
    let height = 0
    let lineCount = 0
    let streaks: Streak[] = []
    let raf = 0
    let time = 0
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
      lineCount = width < 640 ? 10 : 16

      // One or two streaks per column, scattered down the screen
      const gap = width < 640 ? 32 : 40
      streaks = []
      for (let x = gap / 2; x < width; x += gap) {
        const count = random() < 0.55 ? 1 : 2
        for (let j = 0; j < count; j++) streaks.push(newStreak(Math.round(x) + 0.5, random() * height * 1.2))
      }
    }

    const gradient = (alpha: number) => {
      const g = ctx.createLinearGradient(0, 0, width, 0)
      for (const [at, strength] of STOPS) g.addColorStop(at, `rgba(255, 255, 255, ${alpha * strength})`)
      return g
    }

    // y of strand k (-1..1) at horizontal position px
    const strandY = (k: number, seed: number, px: number, scroll: number) => {
      const u = px / width
      // Stays low under the copy on the left, then climbs behind the right-hand panel.
      // On phones the copy spans the full width, so the ribbon stays a low band instead.
      const rise = width < 640 ? 0.22 * u * u : 0.78 * u * u * u
      const centre =
        height * (0.95 - rise) + Math.sin(u * 3.1 + time * 0.12) * height * 0.025 - scroll * height * 0.18
      const twist = Math.sin(u * 4.2 - time * 0.22 + 0.6)
      const spread = (20 + 72 * u) * twist
      let y = centre + k * spread + wave(u * 6, seed, time) * (8 + 18 * u) * (0.5 + 0.5 * Math.abs(k))

      // Part the strands softly around the cursor. The push grows with distance
      // from the cursor's line, so strands bow apart without a hard step.
      const dx = px - mouse.x
      const dy = y - mouse.y
      const d2 = dx * dx + dy * dy
      if (d2 < 160000) y += 42 * (dy / 90) * Math.exp(-d2 / 16200)
      return y
    }

    const drawStreaks = (dt: number) => {
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

    const draw = (dt: number) => {
      // A tab that hasn't been shown yet can report a zero-sized window
      if (width < 1 || height < 1) return
      const scroll = Math.min(window.scrollY / height, 1)
      const fade = 1 - scroll * 0.6
      ctx.clearRect(0, 0, width, height)

      drawStreaks(dt)

      const step = width < 640 ? 10 : 7
      for (let i = 0; i < lineCount; i++) {
        const k = (i / (lineCount - 1)) * 2 - 1
        const seed = i * 1.618 + 0.37
        const lead = i === Math.floor(lineCount / 2)

        ctx.beginPath()
        for (let px = -20; px <= width + 20; px += step) {
          const y = strandY(k, seed, px, scroll)
          if (px === -20) ctx.moveTo(px, y)
          else ctx.lineTo(px, y)
        }

        if (lead) {
          // A faint halo under the main strand, then the strand itself
          ctx.lineWidth = 5
          ctx.strokeStyle = gradient(0.025 * fade)
          ctx.stroke()
          ctx.lineWidth = 1.1
          ctx.strokeStyle = gradient(0.42 * fade)
        } else {
          ctx.lineWidth = 1
          ctx.strokeStyle = gradient((0.035 + 0.075 * (1 - Math.abs(k))) * fade)
        }
        ctx.stroke()
      }

      // A small glint travelling along the main strand
      const leadIndex = Math.floor(lineCount / 2)
      const leadK = (leadIndex / (lineCount - 1)) * 2 - 1
      const gx = ((time * 0.03) % 1) * width
      const gy = strandY(leadK, leadIndex * 1.618 + 0.37, gx, scroll)
      const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, 16)
      glow.addColorStop(0, `rgba(255, 255, 255, ${0.5 * fade})`)
      glow.addColorStop(0.2, `rgba(255, 255, 255, ${0.15 * fade})`)
      glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(gx - 16, gy - 16, 32, 32)
    }

    const frame = (now: number) => {
      // Schedule first, so one bad frame can't stop the animation
      raf = requestAnimationFrame(frame)
      const dt = Math.max(0, Math.min(now - last, 50)) / 1000
      time += dt
      last = now
      mouse.x += (mouse.tx - mouse.x) * 0.08
      mouse.y += (mouse.ty - mouse.y) * 0.08
      if (width < 1 || height < 1) resize()
      draw(dt)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (mouse.x < -1000) {
        mouse.x = e.clientX
        mouse.y = e.clientY
      }
      mouse.tx = e.clientX
      mouse.ty = e.clientY
    }

    const onLeave = () => {
      mouse.tx = -1e4
      mouse.ty = -1e4
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduceMotion) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduceMotion) {
      time = 4
      draw(0)
      const redraw = () => draw(0)
      window.addEventListener('scroll', redraw, { passive: true })
      window.addEventListener('resize', redraw)
      return () => {
        window.removeEventListener('resize', resize)
        window.removeEventListener('scroll', redraw)
        window.removeEventListener('resize', redraw)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} className="flowfield" aria-hidden />
}
