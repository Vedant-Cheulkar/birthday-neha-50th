import { useState, useEffect, useRef, useCallback } from 'react'

/* ─────────────── CONSTANTS ─────────────── */

const EVENT_DATE = '2026-06-17T19:00:00+05:30'


const GALLERY_PHOTOS = [
  { id: 1,  src: null,                    year: '1976',     label: 'Birth of a Legend',           aspect: 'aspect-[3/4]', color: '#EC4899' },
  { id: 2,  src: null,                    year: '1977',     label: 'Baby Era',                    aspect: 'aspect-[3/4]', color: '#A855F7' },
  { id: 3,  src: null,                    year: '1981',     label: 'Childhood Unlocked',          aspect: 'aspect-[3/4]', color: '#F43F5E' },
  { id: 4,  src: null,                    year: '1984',     label: 'School Days Slay',            aspect: 'aspect-[3/4]', color: '#DB2777' },
  { id: 5,  src: null,                    year: '1987',     label: 'Bestie Era',                  aspect: 'aspect-[3/4]', color: '#BE185D' },
  { id: 6,  src: null,                    year: '1989',     label: 'Family Goals',                aspect: 'aspect-[3/4]', color: '#F472B6' },
  { id: 7,  src: null,                    year: '1992',     label: 'Youth Arc',                   aspect: 'aspect-[3/4]', color: '#FB923C' },
  { id: 8,  src: '/photos/photo11.jpg',   year: '2024',     label: 'Chill Vibes 🌿',             aspect: 'aspect-[3/4]', color: '#FB923C' },
  { id: 9,  src: '/photos/photo10.jpg',   year: '2024',     label: 'Traditional Queen 👑',       aspect: 'aspect-[3/4]', color: '#A3E635' },
  { id: 10, src: '/photos/photo9.jpg',    year: 'Sep 2025', label: 'Couple Goals 💜',            aspect: 'aspect-[3/4]', color: '#A855F7' },
  { id: 11, src: '/photos/photo8.jpg',    year: 'Sep 2025', label: 'All Dressed Up ✨',          aspect: 'aspect-[3/4]', color: '#EC4899' },
  { id: 12, src: '/photos/photo3.jpg',    year: '2025',     label: 'Squad Ready',                aspect: 'aspect-[3/4]', color: '#F43F5E' },
  { id: 13, src: '/photos/photo2.jpg',    year: '2025',     label: 'Dancing Energy 🕺',          aspect: 'aspect-[3/4]', color: '#DB2777' },
  { id: 14, src: '/photos/photo1.jpg',    year: '2025',     label: 'Main Character 👍',          aspect: 'aspect-[3/4]', color: '#F472B6' },
  { id: 15, src: '/photos/photo7.jpg',    year: '2026',     label: 'Bunny Mode 🐰',              aspect: 'aspect-[3/4]', color: '#BE185D' },
  { id: 16, src: '/photos/photo6.jpg',    year: 'Feb 2026', label: 'Butterfly Vibes 🦋',        aspect: 'aspect-[3/4]', color: '#FB923C' },
  { id: 17, src: '/photos/photo4.jpg',    year: 'Feb 2026', label: 'Wild Heart 🦁',              aspect: 'aspect-[3/4]', color: '#EC4899' },
  { id: 18, src: '/photos/photo5.jpg',    year: 'Feb 2026', label: '50 & Iconic ✨',             aspect: 'aspect-[3/4]', color: '#F472B6' },
  { id: 19, src: '/photos/photo12.jpg',   year: '2024',     label: 'Ganesh Festival Blessings 🙏', aspect: 'aspect-[4/3]', color: '#FB923C' },
  { id: 20, src: '/photos/photo13.jpg',  year: '2026',     label: 'Celebrations 🎉',              aspect: 'aspect-[3/4]', color: '#EC4899' },
  { id: 21, src: '/photos/photo14.jpg',  year: '2026',     label: 'Pure Joy 😄',                  aspect: 'aspect-[3/4]', color: '#A855F7' },
  { id: 22, src: '/photos/photo15.jpg',  year: '2026',     label: 'Cherished Moments 💕',         aspect: 'aspect-[3/4]', color: '#DB2777' },
  { id: 23, src: '/photos/photo16.jpg',  year: '2026',     label: 'Family Love 👨‍👩‍👧',               aspect: 'aspect-[3/4]', color: '#FB923C' },
  { id: 24, src: '/photos/photo17.jpg',  year: '2026',     label: 'Together Always 🌸',           aspect: 'aspect-[3/4]', color: '#F43F5E' },
  { id: 25, src: '/photos/photo18.jpg',  year: '2026',     label: 'Golden Memories ✨',            aspect: 'aspect-[3/4]', color: '#BE185D' },
  { id: 26, src: '/photos/photo19.jpg',  year: '2026',     label: 'Spreading Smiles 😊',          aspect: 'aspect-[3/4]', color: '#F472B6' },
  { id: 27, src: '/photos/photo20.jpg',  year: '2026',     label: 'Birthday Queen 👑',            aspect: 'aspect-[3/4]', color: '#EC4899' },
  { id: 28, src: '/photos/photo21.jpg',  year: '2026',     label: 'Blessed & Beautiful 🙏',       aspect: 'aspect-[3/4]', color: '#A855F7' },
  { id: 29, src: '/photos/photo22.jpg',  year: '2026',     label: 'Radiant Energy 💫',            aspect: 'aspect-[3/4]', color: '#FB923C' },
  { id: 30, src: '/photos/photo23.jpg',  year: '2026',     label: 'Squad Goals 🎊',               aspect: 'aspect-[4/3]', color: '#DB2777' },
  { id: 31, src: '/photos/photo24.jpg',  year: '2026',     label: 'Simply Iconic 🌟',             aspect: 'aspect-[3/4]', color: '#BE185D' },
]

const FILM_FRAMES = [
  { color: '#EC4899', label: '1976',    src: null },
  { color: '#FB923C', label: 'Ganesh 🙏', src: '/photos/photo12.jpg' },
  { color: '#F43F5E', label: "'90s",   src: null },
  { color: '#A855F7', label: "'00s",   src: null },
  { color: '#DB2777', label: "'10s",   src: '/photos/photo11.jpg' },
  { color: '#F472B6', label: '2024',   src: '/photos/photo10.jpg' },
  { color: '#BE185D', label: 'Sep 25', src: '/photos/photo9.jpg' },
  { color: '#EC4899', label: 'Feb 26', src: '/photos/photo6.jpg' },
  { color: '#FB923C', label: 'Neha',   src: '/photos/photo7.jpg' },
  { color: '#A855F7', label: '🎂',     src: '/photos/photo1.jpg' },
]

const SHOWCASE_PHOTOS = [
  { src: '/photos/photo7.jpg',  label: 'Bunny Mode 🐰',      year: '2026',     color: '#EC4899', rotation: '-4deg'  },
  { src: '/photos/photo6.jpg',  label: 'Free Spirit 🦋',     year: 'Feb 2026', color: '#A855F7', rotation: '3deg'   },
  { src: '/photos/photo8.jpg',  label: 'All Dressed Up 💜',  year: 'Sep 2025', color: '#DB2777', rotation: '-2deg'  },
  { src: '/photos/photo12.jpg', label: 'Ganesh Festival 🙏', year: '2024',     color: '#FB923C', rotation: '4deg'   },
  { src: '/photos/photo4.jpg',  label: 'Wild Heart 🦁',      year: 'Feb 2026', color: '#F43F5E', rotation: '-3deg'  },
  { src: '/photos/photo1.jpg',  label: 'Main Character ✨',  year: '2025',     color: '#BE185D', rotation: '2deg'   },
]

const EMOJI_PARTICLES = [
  { emoji: '🎈', left: '5%',  delay: '0s',   dur: '11s', size: 24 },
  { emoji: '✨', left: '13%', delay: '2.1s', dur: '13s', size: 17 },
  { emoji: '🎉', left: '22%', delay: '4.5s', dur: '10s', size: 22 },
  { emoji: '💕', left: '31%', delay: '1.2s', dur: '14s', size: 18 },
  { emoji: '🎈', left: '41%', delay: '3.8s', dur: '12s', size: 26 },
  { emoji: '🎊', left: '51%', delay: '0.8s', dur: '11s', size: 20 },
  { emoji: '🎂', left: '61%', delay: '5.5s', dur: '13s', size: 24 },
  { emoji: '💖', left: '71%', delay: '2.6s', dur: '10s', size: 18 },
  { emoji: '🎀', left: '81%', delay: '4.0s', dur: '14s', size: 22 },
  { emoji: '🌸', left: '90%', delay: '1.5s', dur: '12s', size: 19 },
  { emoji: '🎁', left: '96%', delay: '6.2s', dur: '11s', size: 17 },
]

const BALLOON_PARTICLES = [
  { emoji: '🎈', left: '7%',  delay: '0s',   dur: '9s',   size: 32 },
  { emoji: '🎀', left: '19%', delay: '3.5s', dur: '11s',  size: 26 },
  { emoji: '🎈', left: '34%', delay: '1.8s', dur: '8.5s', size: 30 },
  { emoji: '🎊', left: '49%', delay: '5.2s', dur: '10s',  size: 28 },
  { emoji: '🎈', left: '64%', delay: '2.4s', dur: '9.5s', size: 34 },
  { emoji: '🎀', left: '78%', delay: '4.1s', dur: '11s',  size: 26 },
  { emoji: '🎈', left: '90%', delay: '0.8s', dur: '8s',   size: 30 },
  { emoji: '💕', left: '56%', delay: '6.8s', dur: '10s',  size: 24 },
]

const TWINKLE_STARS = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 41 + 11) % 95}%`,
  top:  `${(i * 57 + 7)  % 85}%`,
  delay: `${(i * 0.38) % 4}s`,
  dur:   `${1.4 + (i * 0.28) % 1.8}s`,
  size:  7 + (i % 4) * 3,
}))

const TYPEWRITER_TEXTS = [
  'Turning 50 and absolutely thriving 🎉',
  'Half a century of pure main character energy ✨',
  '50 years of iconic moments 🎂',
  'The legend, the myth, the birthday queen 👑',
]

const LETTER_COLORS = [
  ['#9D174D', '#EC4899'],
  ['#6D28D9', '#A855F7'],
  ['#BE185D', '#DB2777'],
  ['#7C3AED', '#BE185D'],
]

/* ─────────────── HOOKS ─────────────── */

function useCountdown(target) {
  const calc = () => {
    const diff = new Date(target) - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function useScrolled(threshold = 70) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return scrolled
}

function useTypewriter(texts, speed = 75, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [tIdx, setTIdx]       = useState(0)
  const [cIdx, setCIdx]       = useState(0)
  const [deleting, setDel]    = useState(false)
  useEffect(() => {
    const cur = texts[tIdx]
    if (!deleting && cIdx < cur.length) {
      const t = setTimeout(() => setCIdx(c => c + 1), speed); return () => clearTimeout(t)
    }
    if (!deleting && cIdx === cur.length) {
      const t = setTimeout(() => setDel(true), pause); return () => clearTimeout(t)
    }
    if (deleting && cIdx > 0) {
      const t = setTimeout(() => setCIdx(c => c - 1), speed / 2); return () => clearTimeout(t)
    }
    if (deleting && cIdx === 0) { setDel(false); setTIdx(i => (i + 1) % texts.length) }
  }, [cIdx, deleting, tIdx, texts, speed, pause])
  useEffect(() => setDisplay(texts[tIdx].slice(0, cIdx)), [cIdx, tIdx, texts])
  return display
}

/* ─────────────── PARTICLE CANVAS ─────────────── */

function ParticleCanvas({ mouseRef }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const setSize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    setSize()
    const ro = new ResizeObserver(setSize)
    ro.observe(canvas)

    const N = window.innerWidth < 640 ? 30 : 55
    const COLORS = ['#EC4899', '#A855F7', '#F43F5E', '#FB923C', '#BE185D']
    const MAX = 130

    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.5,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    let raf
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouseRef.current

      for (const p of pts) {
        const dx = p.x - mx, dy = p.y - my
        const d2 = dx * dx + dy * dy
        if (d2 < 14400) {
          const d = Math.sqrt(d2), f = (120 - d) / 120 * 0.55
          p.vx += dx / d * f; p.vy += dy / d * f
        }
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > 1.8) { p.vx = p.vx / spd * 1.8; p.vy = p.vy / spd * 1.8 }
        p.vx *= 0.97; p.vy *= 0.97
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      }

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(236,72,153,${(1 - d / MAX) * 0.18})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      for (const p of pts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.c
        ctx.shadowBlur = 8; ctx.shadowColor = p.c
        ctx.fill()
      }
      ctx.shadowBlur = 0
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [mouseRef])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"
      style={{ zIndex: 2, pointerEvents: 'none' }} />
  )
}

/* ─────────────── ORBITAL RINGS ─────────────── */

function OrbitalRings() {
  const dot = (color, pos) => (
    <div className="absolute rounded-full" style={{
      width: 7, height: 7, background: color,
      boxShadow: `0 0 14px 4px ${color}`,
      ...pos,
    }} />
  )
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      style={{ zIndex: 3 }}>
      <div className="absolute" style={{
        width: 460, height: 460, borderRadius: '50%',
        border: '1px solid rgba(236,72,153,0.22)',
        animation: 'ring1Spin 24s linear infinite',
      }}>
        {dot('#EC4899', { top: -3.5, left: '50%', transform: 'translateX(-50%)' })}
      </div>
      <div className="absolute" style={{
        width: 610, height: 610, borderRadius: '50%',
        border: '1px dashed rgba(168,85,247,0.16)',
        animation: 'ring2Spin 38s linear infinite reverse',
      }}>
        {dot('#A855F7', { bottom: -3, left: '30%' })}
        {dot('#A855F7', { top: -3, right: '20%' })}
      </div>
      <div className="absolute" style={{
        width: 780, height: 780, borderRadius: '50%',
        border: '1px solid rgba(244,63,94,0.1)',
        animation: 'ring3Spin 55s linear infinite',
      }}>
        {dot('#F43F5E', { top: -2.5, right: '35%' })}
      </div>
    </div>
  )
}

/* ─────────────── VERTICAL MARQUEE ─────────────── */

function VerticalMarquee({ side }) {
  const t = ' NEHA · 50TH · JUNE 17 · 2026 · ICONIC · '
  const doubled = (t + t + t + t)
  return (
    <div className="absolute top-0 bottom-0 overflow-hidden pointer-events-none"
      style={{ [side]: 0, width: 26, zIndex: 4, opacity: 0.22 }}>
      <div style={{
        animation: `verticalScroll ${side === 'left' ? 18 : 24}s linear infinite ${side === 'right' ? 'reverse' : ''}`,
        height: 'max-content',
      }}>
        <span className="font-mono text-[8px]"
          style={{ color: '#EC4899', writingMode: 'vertical-rl', letterSpacing: '0.22em', whiteSpace: 'nowrap' }}>
          {doubled + doubled}
        </span>
      </div>
    </div>
  )
}

/* ─────────────── CONFETTI BURST ─────────────── */

function ConfettiBurst() {
  const [gone, setGone] = useState(false)
  const pieces = useRef(Array.from({ length: 70 }, (_, i) => ({
    id: i,
    color: ['#EC4899', '#A855F7', '#F472B6', '#FB923C', '#F43F5E', '#BE185D', '#DB2777'][i % 7],
    tx: `${(Math.random() - 0.5) * 200}vw`,
    ty: `${-(Math.random() * 120 + 30)}vh`,
    rot: Math.random() * 900 - 450,
    w: Math.random() * 9 + 4,
    h: Math.random() * 4 + 2,
    delay: Math.random() * 0.7,
  }))).current

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 4000)
    return () => clearTimeout(t)
  }, [])

  if (gone) return null
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center"
      style={{ zIndex: 15 }}>
      {pieces.map(p => (
        <div key={p.id} className="absolute" style={{
          width: p.w, height: p.h,
          background: p.color,
          borderRadius: 1,
          '--tx': p.tx, '--ty': p.ty, '--rot': `${p.rot}deg`,
          animation: 'confettiFall 3s ease-out forwards',
          animationDelay: `${p.delay}s`,
          opacity: 0,
        }} />
      ))}
    </div>
  )
}

/* ─────────────── ANIMATED TITLE ─────────────── */

function AnimatedTitle() {
  return (
    <div className="relative inline-block">
      {/* "50" ghost watermark */}
      <div className="absolute top-1/2 left-1/2 font-space font-black select-none pointer-events-none"
        style={{
          fontSize: 'clamp(100px, 28vw, 260px)',
          transform: 'translate(-50%, -50%)',
          color: 'transparent',
          WebkitTextStroke: '2px rgba(236,72,153,0.1)',
          zIndex: 0,
          animation: 'neonPulse 5s ease-in-out infinite',
        }}>
        50
      </div>
      {/* Letter-by-letter NEHA */}
      <h1 className="font-space font-black leading-none relative glitch"
        style={{ fontSize: 'clamp(5rem, 18vw, 13rem)', zIndex: 1 }}>
        {'NEHA'.split('').map((char, i) => (
          <span key={i} className="inline-block" style={{
            background: `linear-gradient(160deg, ${LETTER_COLORS[i][0]} 0%, ${LETTER_COLORS[i][1]} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: 0,
            animation: 'letterBounce 1s cubic-bezier(0.34,1.56,0.64,1) forwards',
            animationDelay: `${i * 0.14}s`,
            marginRight: i < 3 ? '0.02em' : 0,
            filter: 'drop-shadow(0 4px 12px rgba(236,72,153,0.35))',
          }}>
            {char}
          </span>
        ))}
      </h1>
    </div>
  )
}

/* ─────────────── COUNTDOWN RING ─────────────── */

function CountdownRing({ value, max, label, color, size = 88 }) {
  const r = (size - 12) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - (value % (max + 1)) / max)
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} className="absolute inset-0"
          style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none"
            stroke="rgba(236,72,153,0.12)" strokeWidth="2.5" />
          <circle cx={size/2} cy={size/2} r={r} fill="none"
            stroke={color} strokeWidth="2.5"
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.85s cubic-bezier(0.4,0,0.2,1)',
              filter: `drop-shadow(0 0 5px ${color})`,
            }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono font-bold tabular-nums"
            style={{ fontSize: size * 0.3, color, textShadow: `0 0 14px ${color}80` }}>
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="font-space text-[9px] tracking-[0.28em] uppercase"
        style={{ color: 'rgba(30,6,21,0.4)' }}>
        {label}
      </span>
    </div>
  )
}

/* ─────────────── AURORA BACKGROUND (pink theme) ─────────────── */

function AuroraBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute rounded-full" style={{ top: '-20%', left: '-10%', width: 600, height: 600, background: '#EC4899', filter: 'blur(120px)', opacity: 0.16, animation: 'blobFloat 9s ease-in-out infinite' }} />
      <div className="absolute rounded-full" style={{ top: '35%', right: '-15%', width: 500, height: 500, background: '#F43F5E', filter: 'blur(120px)', opacity: 0.11, animation: 'blobFloat 11s ease-in-out infinite', animationDelay: '-4s' }} />
      <div className="absolute rounded-full" style={{ bottom: '-15%', left: '28%', width: 450, height: 450, background: '#A855F7', filter: 'blur(120px)', opacity: 0.09, animation: 'blobFloat 13s ease-in-out infinite', animationDelay: '-7s' }} />
      <div className="absolute rounded-full" style={{ top: '10%', left: '40%', width: 300, height: 300, background: '#FB923C', filter: 'blur(100px)', opacity: 0.07, animation: 'blobFloat 15s ease-in-out infinite', animationDelay: '-2s' }} />
      <div className="absolute inset-0 grain opacity-[0.018]" />
    </div>
  )
}

/* ─────────────── FLOATING EMOJIS ─────────────── */

function FloatingEmojis() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {EMOJI_PARTICLES.map((p, i) => (
        <span key={i} className="absolute bottom-0 select-none" style={{
          left: p.left, fontSize: p.size, lineHeight: 1,
          animation: `floatEmoji ${p.dur} linear infinite`,
          animationDelay: p.delay, opacity: 0,
          filter: 'drop-shadow(0 0 4px rgba(236,72,153,0.3))',
        }}>
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

/* ─────────────── BALLOON FIELD ─────────────── */

function BalloonField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {BALLOON_PARTICLES.map((p, i) => (
        <span key={i} className="absolute bottom-0 select-none" style={{
          left: p.left, fontSize: p.size, lineHeight: 1,
          animation: `balloonRise ${p.dur} ease-in-out infinite`,
          animationDelay: p.delay, opacity: 0,
          filter: 'drop-shadow(0 3px 10px rgba(236,72,153,0.35))',
        }}>
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

/* ─────────────── TWINKLE STARS ─────────────── */

function TwinkleStars() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {TWINKLE_STARS.map((s, i) => (
        <div key={i} className="absolute select-none"
          style={{
            left: s.left, top: s.top,
            fontSize: s.size,
            animation: `twinkle ${s.dur}s ease-in-out infinite`,
            animationDelay: s.delay,
            opacity: 0,
          }}>
          ✨
        </div>
      ))}
    </div>
  )
}

/* ─────────────── HERO PHOTOS (husband + wife) ─────────────── */

function HeroPhotos() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 8 }}>
      {/* Left — Neha (wife solo) */}
      <div className="absolute hidden lg:block"
        style={{ left: '2.5%', top: '50%', animation: 'heroPhotoFloat1 5s ease-in-out infinite' }}>
        <div style={{
          background: 'white',
          padding: '8px 8px 30px',
          borderRadius: 3,
          boxShadow: '0 18px 55px rgba(236,72,153,0.25), 0 0 0 1px rgba(236,72,153,0.14)',
        }}>
          <div style={{ width: 192, height: 242, overflow: 'hidden', background: '#FFE4F0' }}>
            <img src="/photos/photo7.jpg" alt="Neha"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
          </div>
          <p style={{
            textAlign: 'center', marginTop: 8, fontSize: 10,
            letterSpacing: '0.16em', fontFamily: 'Space Grotesk, sans-serif',
            color: '#BE185D', fontWeight: 700, textTransform: 'uppercase',
          }}>
            Neha 💕
          </p>
        </div>
      </div>

      {/* Right — Together (couple photo) */}
      <div className="absolute hidden lg:block"
        style={{ right: '2.5%', top: '50%', animation: 'heroPhotoFloat2 6.5s ease-in-out infinite' }}>
        <div style={{
          background: 'white',
          padding: '8px 8px 30px',
          borderRadius: 3,
          boxShadow: '0 18px 55px rgba(168,85,247,0.25), 0 0 0 1px rgba(168,85,247,0.12)',
        }}>
          <div style={{ width: 200, height: 252, overflow: 'hidden', background: '#F3E8FF' }}>
            <img src="/photos/photo12.jpg" alt="Together"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
          <p style={{
            textAlign: 'center', marginTop: 8, fontSize: 10,
            letterSpacing: '0.16em', fontFamily: 'Space Grotesk, sans-serif',
            color: '#7C3AED', fontWeight: 700, textTransform: 'uppercase',
          }}>
            Together 🙏
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── NAVBAR ─────────────── */

function NavBar({ page, setPage }) {
  const scrolled = useScrolled()
  const navLink = (id, label, emoji) => (
    <button onClick={() => { setPage(id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
      className={`relative font-space text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300
                  ${page === id ? 'text-[#BE185D]' : 'text-[#BE185D]/40 hover:text-[#BE185D]/75'}
                  after:absolute after:bottom-[-4px] after:left-0 after:h-px after:transition-all after:duration-300
                  ${page === id
                    ? 'after:w-full after:bg-gradient-to-r after:from-[#EC4899] after:to-[#A855F7]'
                    : 'after:w-0 hover:after:w-full hover:after:bg-[#EC4899]/40'}`}>
      <span className="mr-1">{emoji}</span>{label}
    </button>
  )
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-14 flex items-center justify-between px-5 sm:px-10 lg:justify-center lg:px-0"
      style={{
        background: scrolled ? 'rgba(255,240,248,0.92)' : 'rgba(255,240,248,0.6)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(236,72,153,0.15)' : '1px solid rgba(236,72,153,0.08)',
        transition: 'background 0.35s ease, border-color 0.35s ease',
      }}>
      {/* Logo — left on mobile, absolute on lg+ */}
      <div className="lg:absolute lg:left-10">
        <button onClick={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="font-space font-bold text-base tracking-wider text-[#1E0615]/90 hover:text-[#1E0615] transition-colors">
          <span className="text-gradient-purple">NEHA</span>
          <span className="text-[#BE185D]/40 text-xs ml-2 font-mono">50th</span>
        </button>
      </div>
      {/* Tabs — right on mobile, centered on lg+ */}
      <div className="flex items-center gap-6 sm:gap-8">
        {navLink('home',    'Home',    '🏠')}
        {navLink('gallery', 'Gallery', '📸')}
      </div>
    </nav>
  )
}

/* ─────────────── NEON BUTTON ─────────────── */

function NeonButton({ onClick, href, children, variant = 'purple', className = '', target, rel }) {
  const gradients = {
    purple: 'from-[#BE185D] via-[#EC4899] to-[#A855F7]',
    cyan:   'from-[#7C3AED] via-[#A855F7] to-[#EC4899]',
  }
  const glow = {
    purple: 'hover:shadow-[0_8px_30px_rgba(236,72,153,0.45)]',
    cyan:   'hover:shadow-[0_8px_30px_rgba(168,85,247,0.45)]',
  }
  const base = `relative inline-flex items-center justify-center gap-2 px-8 py-3.5
                font-space text-sm tracking-[0.12em] uppercase font-semibold text-[#1E0615] hover:text-white
                rounded-full overflow-hidden cursor-pointer border-2 border-[#EC4899]/60
                hover:border-transparent transition-all duration-400 ${glow[variant]} ${className}
                before:absolute before:inset-0 before:bg-gradient-to-r before:${gradients[variant]}
                before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-400`
  const inner = <span className="relative z-10 flex items-center gap-2">{children}</span>
  if (href) return <a href={href} target={target} rel={rel} className={base}>{inner}</a>
  return <button onClick={onClick} className={base}>{inner}</button>
}

/* ─────────────── SECTION HEADER ─────────────── */

function SectionHeader({ tag, title, subtitle }) {
  const [ref, visible] = useReveal(0.2)
  return (
    <div ref={ref} className="text-center mb-12"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
      {tag && (
        <span className="inline-block font-mono text-[10px] tracking-[0.35em] uppercase px-4 py-1.5 rounded-full mb-4 text-[#EC4899]"
          style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)' }}>
          {tag}
        </span>
      )}
      <h2 className="font-space text-3xl sm:text-4xl font-bold text-[#1E0615] mb-3">{title}</h2>
      {subtitle && <p className="font-outfit text-base text-[#1E0615]/50 max-w-md mx-auto">{subtitle}</p>}
      <div className="flex items-center justify-center gap-3 mt-5">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#EC4899]/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#EC4899]/60" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#EC4899]/50" />
      </div>
    </div>
  )
}


/* ─────────────── FILM STRIP ─────────────── */

function FilmStrip() {
  const doubled = [...FILM_FRAMES, ...FILM_FRAMES]
  return (
    <div className="w-full overflow-hidden py-6 sm:py-10">
      <div style={{ animation: 'filmFloat 6s ease-in-out infinite' }}>
        <div className="overflow-hidden w-full"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
          <div className="flex items-stretch"
            style={{ animation: 'filmScroll 22s linear infinite', width: 'max-content' }}>
            {doubled.map((f, i) => (
              <div key={i} className="flex-shrink-0 select-none">
                <div className="h-5 flex items-center gap-1.5 px-2" style={{ background: '#0D0008' }}>
                  {[0,1,2,3].map(j => <div key={j} className="sprocket-hole" />)}
                </div>
                <div className="w-[120px] h-[85px] border-x-[5px] relative overflow-hidden flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${f.color}25, ${f.color}08)`, borderColor: '#0D0008', boxShadow: `inset 0 0 20px ${f.color}18` }}>
                  <div className="absolute inset-0 border" style={{ borderColor: `${f.color}30` }} />
                  {f.src ? (
                    <img src={f.src} alt={f.label} className="w-full h-full object-cover"
                      style={{ opacity: 0.85, filter: 'saturate(1.1)' }} />
                  ) : (
                    <span className="font-space font-bold text-lg" style={{ color: f.color, textShadow: `0 0 14px ${f.color}80`, opacity: 0.7 }}>
                      {f.label}
                    </span>
                  )}
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.55)]" />
                  {f.src && (
                    <div className="absolute bottom-0 left-0 right-0 px-1 py-0.5 text-center"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }}>
                      <span className="font-mono text-[8px] tracking-wider" style={{ color: `${f.color}EE` }}>{f.label}</span>
                    </div>
                  )}
                </div>
                <div className="h-5 flex items-center gap-1.5 px-2" style={{ background: '#0D0008' }}>
                  {[0,1,2,3].map(j => <div key={j} className="sprocket-hole" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── PHOTO CARD ─────────────── */

function PhotoCard({ id, src, year, label, aspect, color, idx, onClick }) {
  const [ref, visible] = useReveal(0.08)
  const [hovered, setHovered] = useState(false)
  return (
    <div ref={ref} onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="break-inside-avoid mb-3 cursor-pointer rounded-xl overflow-hidden"
      style={{
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
        transition: 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s',
        transitionDelay: `${(idx % 9) * 55}ms`,
        border: `1px solid ${hovered ? `${color}45` : 'rgba(236,72,153,0.12)'}`,
        boxShadow: hovered ? `0 8px 30px ${color}20` : '0 2px 10px rgba(0,0,0,0.04)',
      }}>
      <div className={`w-full relative ${aspect} overflow-hidden`}
        style={{ background: `linear-gradient(135deg, ${color}20, ${color}08)` }}>
        {src ? (
          <img src={src} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
              <span className="text-lg opacity-50">📷</span>
            </div>
            <p className="font-space text-[7px] tracking-widest text-[#1E0615]/25 uppercase">Add Photo</p>
          </div>
        )}
        <div className="absolute inset-0 transition-opacity duration-300"
          style={{ background: `linear-gradient(to top, rgba(15,3,10,0.88) 0%, transparent 60%)`, opacity: hovered ? 1 : 0 }} />
        <div className="absolute bottom-0 left-0 right-0 px-2.5 py-2 transition-transform duration-300"
          style={{ transform: hovered ? 'translateY(0)' : 'translateY(100%)' }}>
          <p className="font-space text-white text-xs font-medium leading-tight">{label}</p>
          <p className="font-mono text-[9px] tracking-wider mt-0.5" style={{ color: `${color}DD` }}>{year}</p>
        </div>
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full font-mono text-[8px] tracking-wide transition-opacity duration-300"
          style={{ background: `${color}22`, border: `1px solid ${color}35`, color, opacity: hovered ? 1 : 0 }}>
          {year}
        </div>
      </div>
    </div>
  )
}

/* ─────────────── PHOTO MODAL ─────────────── */

function PhotoModal({ photo, all, onClose, onNav }) {
  useEffect(() => {
    if (!photo) return
    const fn = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNav(-1)
      if (e.key === 'ArrowRight') onNav(1)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [photo, onClose, onNav])

  if (!photo) return null
  const idx = all.findIndex(p => p.id === photo.id)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(10,2,15,0.97)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}>
      <div className="relative w-full max-w-xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute -top-10 right-0 font-space text-[10px] tracking-[0.3em] uppercase text-white/30 hover:text-white transition-colors">
          ✕ Close
        </button>
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: `0 0 60px ${photo.color}25` }} />
        <div className={`w-full ${photo.aspect} rounded-2xl overflow-hidden relative`}
          style={{ background: `linear-gradient(135deg, ${photo.color}25, ${photo.color}08)`, border: `1px solid ${photo.color}35` }}>
          {photo.src ? (
            <img src={photo.src} alt={photo.label} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="text-6xl">📷</div>
              <p className="font-space text-2xl font-bold" style={{ color: photo.color, opacity: 0.3 }}>{photo.year}</p>
            </div>
          )}
        </div>
        <div className="mt-4 flex items-start justify-between px-1">
          <div>
            <p className="font-space text-base font-semibold text-white">{photo.label}</p>
            <p className="font-mono text-xs mt-0.5" style={{ color: `${photo.color}AA` }}>{photo.year}</p>
          </div>
          <span className="font-mono text-[10px] text-white/30 mt-1 shrink-0">{idx + 1}/{all.length}</span>
        </div>
        <div className="flex justify-between mt-4">
          {[['←', -1, 'Prev'], ['→', 1, 'Next']].map(([arrow, dir, lbl]) => (
            <button key={lbl} onClick={() => onNav(dir)}
              className="glass rounded-xl px-5 py-2 font-space text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors">
              {arrow} {lbl}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


/* ─────────────── SHOWCASE CARD ─────────────── */

function ShowcaseCard({ photo, index }) {
  const [ref, visible] = useReveal(0.08)
  const [hovered, setHovered] = useState(false)
  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative cursor-pointer select-none"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? 'rotate(0deg) scale(1.07) translateY(-6px)'
            : `rotate(${photo.rotation})`
          : 'translateY(50px) scale(0.88)',
        transition: 'opacity 0.75s ease, transform 0.55s cubic-bezier(0.34,1.56,0.64,1)',
        transitionDelay: `${index * 90}ms`,
        zIndex: hovered ? 20 : index + 1,
      }}>
      <div className="rounded-sm"
        style={{
          background: '#f8f4ef',
          padding: '8px 8px 28px 8px',
          boxShadow: hovered
            ? `0 24px 70px rgba(0,0,0,0.18), 0 0 50px ${photo.color}40, 0 0 100px ${photo.color}18`
            : `0 8px 25px rgba(0,0,0,0.1), 0 0 18px ${photo.color}20`,
          transition: 'box-shadow 0.45s ease',
        }}>
        <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100" style={{ minWidth: 130 }}>
          <img src={photo.src} alt={photo.label}
            className="w-full h-full object-cover"
            style={{
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.55s ease',
              filter: hovered ? 'brightness(1.05) saturate(1.1)' : 'brightness(1)',
            }} />
        </div>
        <div className="text-center mt-2">
          <p className="font-space text-[10px] font-semibold text-gray-700 tracking-wide leading-tight">{photo.label}</p>
          <p className="font-mono text-[8px] text-gray-400 tracking-widest mt-0.5 uppercase">{photo.year}</p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── VIDEO SECTION ─────────────── */

function VideoSection() {
  const [ref, visible] = useReveal(0.1)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const handlePlay = () => {
    setPlaying(true)
    setTimeout(() => videoRef.current?.play(), 50)
  }

  return (
    <section className="py-20 px-5 relative overflow-hidden" style={{ background: '#FFF0F8' }}>
      {/* Soft glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full -translate-y-1/2"
          style={{ background: '#EC4899', filter: 'blur(130px)', opacity: 0.08 }} />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full"
          style={{ background: '#A855F7', filter: 'blur(130px)', opacity: 0.07 }} />
      </div>

      <div ref={ref} className="relative z-10 max-w-2xl mx-auto text-center"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>

        {/* Header */}
        <span className="inline-block font-mono text-[10px] tracking-[0.35em] uppercase px-4 py-1.5 rounded-full mb-4 text-[#EC4899]"
          style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)' }}>
          🎬 Special Moment
        </span>
        <h2 className="font-space text-3xl sm:text-4xl font-bold text-[#1E0615] mb-2">
          A Glimpse of{' '}
          <span style={{ background: 'linear-gradient(135deg, #EC4899, #A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Neha ✨
          </span>
        </h2>
        <p className="font-outfit text-base text-[#1E0615]/45 mb-8">A special video moment 💕</p>

        {/* Video card */}
        <div className="relative rounded-2xl overflow-hidden mx-auto"
          style={{
            maxWidth: 560,
            boxShadow: '0 20px 60px rgba(236,72,153,0.2), 0 0 0 1px rgba(236,72,153,0.12)',
            background: '#1a0a12',
          }}>
          <video
            ref={videoRef}
            src="/birthday-video.mp4"
            controls={playing}
            controlsList="nodownload"
            playsInline
            style={{ width: '100%', display: 'block', maxHeight: 420, objectFit: 'cover' }}
            onEnded={() => setPlaying(false)}
          />

          {/* Play overlay — hidden once playing */}
          {!playing && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
              style={{ background: 'rgba(15,3,10,0.45)', backdropFilter: 'blur(2px)' }}
              onClick={handlePlay}>
              {/* Ripple rings */}
              <div className="absolute rounded-full" style={{ width: 120, height: 120, border: '2px solid rgba(236,72,153,0.3)', animation: 'neonPulse 2s ease-in-out infinite' }} />
              <div className="absolute rounded-full" style={{ width: 90, height: 90, border: '2px solid rgba(236,72,153,0.5)', animation: 'neonPulse 2s ease-in-out infinite', animationDelay: '0.4s' }} />
              {/* Play button */}
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full"
                style={{ background: 'linear-gradient(135deg, #EC4899, #A855F7)', boxShadow: '0 0 40px rgba(236,72,153,0.6)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 3 }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="mt-4 font-space text-white text-sm tracking-widest uppercase font-semibold"
                style={{ textShadow: '0 0 20px rgba(236,72,153,0.8)' }}>
                Play Video
              </p>
            </div>
          )}
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-6">
          {['#EC4899','#A855F7','#FB923C'].map((c, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: c, opacity: 0.5 }} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────── PHOTO SHOWCASE ─────────────── */

function PhotoShowcase({ setPage }) {
  const [ref, visible] = useReveal(0.1)
  return (
    <section className="py-20 px-5 relative overflow-hidden" style={{ background: '#FFF0F8' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full -translate-y-1/2"
          style={{ background: '#EC4899', filter: 'blur(130px)', opacity: 0.08 }} />
        <div className="absolute top-1/3 right-1/5 w-80 h-80 rounded-full"
          style={{ background: '#A855F7', filter: 'blur(130px)', opacity: 0.07 }} />
      </div>

      <div ref={ref} className="text-center mb-14 relative z-10"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
        <span className="inline-block font-mono text-[10px] tracking-[0.35em] uppercase px-4 py-1.5 rounded-full mb-4 text-[#EC4899]"
          style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)' }}>
          📸 Main Character Moments
        </span>
        <h2 className="font-space text-3xl sm:text-4xl font-bold text-[#1E0615] mb-3">
          Neha in{' '}
          <span style={{
            background: 'linear-gradient(135deg, #F472B6, #EC4899, #A855F7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Her Element
          </span>
        </h2>
        <p className="font-outfit text-base text-[#1E0615]/45 max-w-sm mx-auto">A few frames from the iconic journey ✨</p>
        <div className="flex items-center justify-center gap-3 mt-5">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#EC4899]/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#EC4899]/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#EC4899]/50" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-8 max-w-3xl mx-auto relative z-10"
        style={{ padding: '0 8px 24px' }}>
        {SHOWCASE_PHOTOS.map((photo, i) => (
          <ShowcaseCard key={i} photo={photo} index={i} />
        ))}
      </div>

      <div className="text-center mt-16 relative z-10">
        <NeonButton onClick={() => { setPage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          📸 View All Photos
        </NeonButton>
      </div>
    </section>
  )
}

/* ─────────────── HOME PAGE ─────────────── */

function HomePage({ setPage }) {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE)
  const typeText = useTypewriter(TYPEWRITER_TEXTS)
  const heroRef  = useRef(null)
  const mousePos = useRef({ x: -1000, y: -1000 })
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 })

  const onMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mousePos.current = { x, y }
    setSpotlight({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }, [])

  return (
    <div>
      {/* ════════ HERO ════════ */}
      <section ref={heroRef} onMouseMove={onMouseMove}
        className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-20 pb-16 overflow-hidden"
        style={{ background: '#FFF0F8' }}>

        <AuroraBg />
        <BalloonField />
        <TwinkleStars />
        <FloatingEmojis />
        <ParticleCanvas mouseRef={mousePos} />
        <OrbitalRings />
        <VerticalMarquee side="left" />
        <VerticalMarquee side="right" />

        {/* Mouse spotlight */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(circle 500px at ${spotlight.x}% ${spotlight.y}%, rgba(236,72,153,0.1) 0%, transparent 70%)`,
          zIndex: 5, transition: 'background 0.06s linear',
        }} />

        {/* Scanline */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(190,24,93,0.015) 2px, rgba(190,24,93,0.015) 4px)',
          zIndex: 6,
        }} />

        {/* Hero floating photos (husband + wife) */}
        <HeroPhotos />

        <ConfettiBurst />

        {/* ── Hero Content ── */}
        <div className="relative text-center max-w-4xl mx-auto" style={{ zIndex: 10 }}>

          {/* Date badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            style={{ border: '1px solid rgba(236,72,153,0.28)', animation: 'fadeUp 0.6s ease-out forwards', opacity: 0 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899]" style={{ animation: 'neonPulse 2s ease-in-out infinite' }} />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#EC4899]">
              June 17, 2026 · Birthday Incoming
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" style={{ animation: 'neonPulse 2s ease-in-out infinite', animationDelay: '1s' }} />
          </div>

          {/* NEHA animated title */}
          <div style={{ animation: 'fadeUp 0.5s ease-out 0.1s forwards', opacity: 0 }}>
            <AnimatedTitle />
          </div>

          {/* Turns 50 */}
          <div style={{ animation: 'fadeUp 0.6s ease-out 0.7s forwards', opacity: 0 }}>
            <p className="font-space text-2xl sm:text-3xl font-semibold text-[#1E0615]/90 mt-2 mb-1">
              Turns{' '}
              <span className="font-mono" style={{ color: '#EC4899', textShadow: '0 0 30px rgba(236,72,153,0.5)' }}>50</span>
              {' '}🎉
            </p>
          </div>

          {/* Typewriter */}
          <div className="h-8 flex items-center justify-center mb-8"
            style={{ animation: 'fadeUp 0.6s ease-out 0.9s forwards', opacity: 0 }}>
            <p className="font-outfit text-base sm:text-lg text-[#BE185D]/55">
              {typeText}
              <span className="inline-block w-0.5 h-4 bg-[#EC4899] ml-0.5"
                style={{ animation: 'neonPulse 1s ease-in-out infinite' }} />
            </p>
          </div>

          {/* Countdown rings */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10"
            style={{ animation: 'fadeUp 0.6s ease-out 1.1s forwards', opacity: 0 }}>
            <CountdownRing value={days}    max={365} label="Days"  color="#EC4899" size={88} />
            <CountdownRing value={hours}   max={23}  label="Hours" color="#A855F7" size={88} />
            <CountdownRing value={minutes} max={59}  label="Mins"  color="#DB2777" size={88} />
            <CountdownRing value={seconds} max={59}  label="Secs"  color="#FB923C" size={88} />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4"
            style={{ animation: 'fadeUp 0.6s ease-out 1.3s forwards', opacity: 0 }}>
            <NeonButton onClick={() => { setPage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
              📸 View Gallery
            </NeonButton>
          </div>

          {/* Mobile polaroids — visible only below lg */}
          <div className="flex lg:hidden justify-center gap-5 mt-10"
            style={{ animation: 'fadeUp 0.6s ease-out 1.5s forwards', opacity: 0 }}>
            {/* Neha */}
            <div style={{ background: 'white', padding: '6px 6px 22px', borderRadius: 3,
              boxShadow: '0 10px 35px rgba(236,72,153,0.22), 0 0 0 1px rgba(236,72,153,0.12)',
              animation: 'heroPhotoFloat1 5s ease-in-out infinite' }}>
              <div style={{ width: 110, height: 138, overflow: 'hidden', background: '#FFE4F0' }}>
                <img src="/photos/photo7.jpg" alt="Neha"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              </div>
              <p style={{ textAlign: 'center', marginTop: 6, fontSize: 9,
                letterSpacing: '0.16em', fontFamily: 'Space Grotesk, sans-serif',
                color: '#BE185D', fontWeight: 700, textTransform: 'uppercase' }}>
                Neha 💕
              </p>
            </div>
            {/* Together */}
            <div style={{ background: 'white', padding: '6px 6px 22px', borderRadius: 3,
              boxShadow: '0 10px 35px rgba(168,85,247,0.22), 0 0 0 1px rgba(168,85,247,0.1)',
              animation: 'heroPhotoFloat2 6.5s ease-in-out infinite' }}>
              <div style={{ width: 110, height: 138, overflow: 'hidden', background: '#F3E8FF' }}>
                <img src="/photos/photo12.jpg" alt="Together"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
              <p style={{ textAlign: 'center', marginTop: 6, fontSize: 9,
                letterSpacing: '0.16em', fontFamily: 'Space Grotesk, sans-serif',
                color: '#7C3AED', fontWeight: 700, textTransform: 'uppercase' }}>
                Together 🙏
              </p>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="mt-10 flex flex-col items-center gap-2"
            style={{ opacity: 0.35, animation: 'fadeUp 0.6s ease-out 1.8s forwards' }}>
            <div className="w-5 h-8 rounded-full border border-[#EC4899]/40 flex items-start justify-center pt-1.5">
              <div className="w-0.5 h-2 bg-[#EC4899] rounded-full" style={{ animation: 'neonPulse 1.2s ease-in-out infinite' }} />
            </div>
            <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-[#BE185D]/60">Scroll</span>
          </div>
        </div>
      </section>

      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, #EC489950, #A855F750, transparent)' }} />

      {/* ── Birthday Video ── */}
      <VideoSection />

      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, #F472B650, #EC489950, transparent)' }} />

      {/* ── Photo Showcase ── */}
      <PhotoShowcase setPage={setPage} />

      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, #EC489950, #A855F750, transparent)' }} />

      {/* ── Gallery CTA ── */}
      <section className="py-20 px-5 text-center relative overflow-hidden" style={{ background: '#FFF0F8' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
            style={{ background: '#EC4899', filter: 'blur(120px)', opacity: 0.08 }} />
        </div>
        <SectionHeader tag="Photo Drop" title="Neha's Life in Frames"
          subtitle="Every picture tells a story. Click to explore the full gallery." />
        <NeonButton onClick={() => { setPage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          🎞 Open Gallery
        </NeonButton>
        <p className="font-mono text-[10px] tracking-[0.3em] text-[#BE185D]/30 mt-6 uppercase">
          June 17 · 2026 · Neha's 50th
        </p>
      </section>

      <footer className="py-8 text-center border-t border-[#EC4899]/10">
        <p className="font-space text-sm font-medium text-[#1E0615]/30">Made with 💜 for the one and only Neha</p>
        <p className="font-mono text-[9px] tracking-[0.35em] text-[#1E0615]/18 mt-2 uppercase">1976 – 2026 · 50 Years of Neha Being Iconic</p>
      </footer>
    </div>
  )
}

/* ─────────────── GALLERY PAGE ─────────────── */

function GalleryPage() {
  const [modalIdx, setModalIdx] = useState(null)
  const openModal  = useCallback((idx) => setModalIdx(idx), [])
  const closeModal = useCallback(() => setModalIdx(null), [])
  const navModal   = useCallback((dir) => {
    setModalIdx(prev => {
      if (prev === null) return null
      const next = prev + dir
      if (next < 0) return GALLERY_PHOTOS.length - 1
      if (next >= GALLERY_PHOTOS.length) return 0
      return next
    })
  }, [])

  return (
    <div>
      {/* Gallery header — light pink */}
      <section className="relative pt-14 pb-0 overflow-hidden" style={{ background: '#FFF0F8' }}>
        <AuroraBg />
        <div className="relative z-10 text-center px-5 pt-8 pb-4">
          <span className="inline-block font-mono text-[10px] tracking-[0.35em] uppercase px-4 py-1.5 rounded-full mb-5 text-[#EC4899]"
            style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)' }}>
            📸 Memory Gallery
          </span>
          <h1 className="font-space font-black text-3xl sm:text-5xl text-[#1E0615] mb-2">
            Neha's{' '}
            <span className="text-gradient-purple">
              Life in Frames
            </span>
          </h1>
          <p className="font-outfit text-base text-[#1E0615]/45 mb-1">1976 – 2026 · Half a century of iconic moments</p>
        </div>
        {/* Film strip section — stays dark for cinematic contrast */}
        <div style={{ background: '#0D0008' }}>
          <FilmStrip />
        </div>
        <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, #EC489940, #A855F740, transparent)' }} />
      </section>

      <section className="py-12 px-4 sm:px-8 max-w-6xl mx-auto">
        <SectionHeader tag="50 Years of Photos" title="The Photo Album"
          subtitle="Tap any photo to expand · More coming soon 🎞" />
        <div className="masonry-grid mt-8">
          {GALLERY_PHOTOS.map((photo, i) => (
            <PhotoCard key={photo.id} {...photo} idx={i} onClick={() => openModal(i)} />
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="font-space text-sm text-[#1E0615]/25">More memories coming soon 📷</p>
          <p className="font-mono text-[9px] tracking-widest text-[#1E0615]/15 mt-1 uppercase">
            Neha's 50th · June 17, 2026
          </p>
        </div>
      </section>

      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, #EC489940, transparent)' }} />

      <footer className="py-10 text-center border-t border-[#EC4899]/10">
        <p className="font-space text-sm font-medium text-[#1E0615]/30">Made with 💜 for the one and only Neha</p>
        <p className="font-mono text-[9px] tracking-[0.35em] text-[#1E0615]/18 mt-2 uppercase">1976 – 2026 · 50 Years of Neha Being Iconic</p>
      </footer>

      <PhotoModal photo={modalIdx !== null ? GALLERY_PHOTOS[modalIdx] : null}
        all={GALLERY_PHOTOS} onClose={closeModal} onNav={navModal} />
    </div>
  )
}

/* ─────────────── APP ROOT ─────────────── */

export default function App() {
  const [page, setPage] = useState('home')
  return (
    <div className="min-h-screen" style={{ background: '#FFF0F8' }}>
      <NavBar page={page} setPage={setPage} />
      {page === 'home' ? <HomePage setPage={setPage} /> : <GalleryPage />}
    </div>
  )
}
