import { useEffect, useRef, useState } from 'react'

const SPEED = 70 // px per second
const AUTO_START_MS = 4000 // let the hero animation finish first
const RESUME_MS = 2500 // idle time after the reader scrolls by hand

export const startAutoScroll = () => window.dispatchEvent(new CustomEvent('autoscroll', { detail: true }))

/**
 * Gently scrolls the story down on its own. Pauses while the reader touches
 * the page or a video plays with sound, then picks up again.
 */
export default function AutoScroll() {
  const [on, setOn] = useState(false)
  const s = useRef({ on: false, hold: false, raf: 0, timer: 0, pos: 0, last: 0 })

  useEffect(() => {
    const st = s.current

    const atEnd = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2

    const tick = (t) => {
      if (!st.on) return
      if (!st.hold) {
        const dt = Math.min(0.1, (t - st.last) / 1000)
        st.pos += SPEED * dt
        window.scrollTo(0, st.pos)
        if (atEnd()) return set(false)
      }
      st.last = t
      st.raf = requestAnimationFrame(tick)
    }

    const set = (value) => {
      st.on = value
      setOn(value)
      cancelAnimationFrame(st.raf)
      if (!value) return
      if (atEnd()) window.scrollTo(0, 0)
      st.hold = false
      st.pos = window.scrollY
      st.last = performance.now()
      st.raf = requestAnimationFrame(tick)
    }

    // reader takes over: hold, then continue from wherever they left it
    const onUser = () => {
      if (!st.on) return
      st.hold = true
      clearTimeout(st.timer)
      st.timer = setTimeout(() => {
        st.pos = window.scrollY
        st.hold = false
      }, RESUME_MS)
    }

    const onVideoSound = (e) => {
      if (!st.on) return
      clearTimeout(st.timer)
      st.hold = e.detail
      st.pos = window.scrollY
    }

    const onCommand = (e) => set(e.detail)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const auto = reduced ? 0 : setTimeout(() => window.scrollY < 40 && !st.on && set(true), AUTO_START_MS)

    const userEvents = ['touchstart', 'wheel', 'keydown', 'mousedown']
    userEvents.forEach((e) => window.addEventListener(e, onUser, { passive: true }))
    window.addEventListener('video-sound', onVideoSound)
    window.addEventListener('autoscroll', onCommand)
    st.set = set
    return () => {
      clearTimeout(auto)
      clearTimeout(st.timer)
      cancelAnimationFrame(st.raf)
      userEvents.forEach((e) => window.removeEventListener(e, onUser))
      window.removeEventListener('video-sound', onVideoSound)
      window.removeEventListener('autoscroll', onCommand)
    }
  }, [])

  return (
    <button
      className="autoscroll"
      // don't let this tap count as "the reader took over"
      onTouchStart={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={() => s.current.set(!on)}
      aria-label={on ? 'Dừng tự cuộn' : 'Tự cuộn'}
    >
      {on ? '❚❚' : '▶'}
    </button>
  )
}
