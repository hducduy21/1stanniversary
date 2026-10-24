import { useMemo, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const rand = (min, max) => min + Math.random() * (max - min)

export function Rain({ count = 70 }) {
  const drops = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: rand(0, 100),
        delay: rand(0, 3),
        duration: rand(0.6, 1.3),
        opacity: rand(0.15, 0.5),
        height: rand(40, 90),
      })),
    [count],
  )
  return (
    <div className="rain" aria-hidden>
      {drops.map((d) => (
        <span
          key={d.id}
          style={{
            left: `${d.left}%`,
            height: d.height,
            opacity: d.opacity,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export function FloatingHearts({ count = 18 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: rand(0, 100),
        size: rand(10, 26),
        delay: rand(0, 10),
        duration: rand(8, 16),
        drift: rand(-40, 40),
      })),
    [count],
  )
  return (
    <div className="floating-hearts" aria-hidden>
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            '--drift': `${h.drift}px`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  )
}

/** Burst of hearts radiating from the center of its parent. */
export function HeartBurst({ trigger, count = 16 }) {
  const parts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + rand(-0.2, 0.2)
        const dist = rand(90, 170)
        return { id: i, x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, size: rand(14, 28), rot: rand(-40, 40) }
      }),
    // new random layout every time it fires
    [trigger, count],
  )
  if (!trigger) return null
  return (
    <div className="burst" aria-hidden key={trigger}>
      {parts.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ x: p.x, y: p.y, scale: 1, opacity: 0, rotate: p.rot }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: p.size }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  )
}

export function useBurst() {
  const [n, setN] = useState(0)
  return [n, () => setN((v) => v + 1)]
}

export function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div className="progress" style={{ scaleX }} aria-hidden />
}
