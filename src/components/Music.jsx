import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const src = `${import.meta.env.BASE_URL}media/sound.m4a`
const TOP = 40 // px — counts as "at the top of the page"

/**
 * Background music: starts from the beginning whenever the reader starts
 * scrolling down from the top, fades out when they come back to the top.
 */
export default function Music() {
  const audio = useRef(null)
  const [enabled, setEnabled] = useState(true) // user's mute toggle
  const [playing, setPlaying] = useState(false)
  const [blocked, setBlocked] = useState(false) // browser refused autoplay
  const state = useRef({ atTop: true, enabled: true, ducked: false, fade: 0 })

  useEffect(() => {
    const el = audio.current
    const s = state.current

    const fadeTo = (target, ms, done) => {
      cancelAnimationFrame(s.fade)
      const from = el.volume
      const t0 = performance.now()
      const step = (t) => {
        const k = Math.min(1, (t - t0) / ms)
        el.volume = Math.min(1, Math.max(0, from + (target - from) * k))
        if (k < 1) s.fade = requestAnimationFrame(step)
        else done?.()
      }
      s.fade = requestAnimationFrame(step)
    }

    const start = (fromBeginning) => {
      if (!s.enabled || s.ducked) return
      s.stopping = false
      if (fromBeginning) el.currentTime = 0
      el.volume = 0
      el.play()
        .then(() => {
          setBlocked(false)
          fadeTo(1, 1200)
        })
        .catch(() => setBlocked(true))
    }

    const stop = () => {
      s.stopping = true
      fadeTo(0, 600, () => el.pause())
    }

    const onScroll = () => {
      const atTop = window.scrollY <= TOP
      if (atTop === s.atTop) return
      s.atTop = atTop
      if (atTop) stop()
      // keep going if it was already started by hand at the top
      else if (el.paused || s.stopping) start(true)
    }

    // scrolling alone doesn't count as a user gesture on most phones,
    // so the first tap anywhere also (re)tries playback
    const onGesture = () => {
      if (!s.atTop) {
        if (el.paused) start(false)
        return
      }
      // a tap at the top (e.g. "Bắt đầu"): silently unlock playback inside the
      // gesture so it can start on its own once auto-scroll leaves the top
      if (s.unlocked) return
      el.muted = true
      el.play()
        .then(() => {
          s.unlocked = true
          if (s.atTop) el.pause()
          el.muted = false
        })
        .catch(() => (el.muted = false))
    }

    // pause music while a video is playing with sound
    const onVideoSound = (e) => {
      s.ducked = e.detail
      if (s.ducked) stop()
      else if (!s.atTop) start(false)
    }

    s.atTop = window.scrollY <= TOP
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointerup', onGesture)
    window.addEventListener('keydown', onGesture)
    window.addEventListener('video-sound', onVideoSound)
    const sync = () => setPlaying(!el.paused)
    el.addEventListener('play', sync)
    el.addEventListener('pause', sync)
    s.start = start
    s.stop = stop
    return () => {
      cancelAnimationFrame(s.fade)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointerup', onGesture)
      window.removeEventListener('keydown', onGesture)
      window.removeEventListener('video-sound', onVideoSound)
      el.removeEventListener('play', sync)
      el.removeEventListener('pause', sync)
    }
  }, [])

  const toggle = (e) => {
    e.stopPropagation()
    const s = state.current
    if (blocked || !playing) {
      s.enabled = true
      setEnabled(true)
      s.start(s.atTop)
    } else {
      s.enabled = false
      setEnabled(false)
      s.stop()
    }
  }

  const showHint = blocked && enabled && !playing

  return (
    <>
      <audio ref={audio} src={src} loop preload="auto" />
      <div className="music">
        <AnimatePresence>
          {showHint && (
            <motion.span className="music__hint" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              chạm để bật nhạc
            </motion.span>
          )}
        </AnimatePresence>
        <button
          className={`music__btn${playing ? ' is-playing' : ''}${showHint ? ' is-hint' : ''}`}
          onClick={toggle}
          aria-label={playing ? 'Tắt nhạc' : 'Bật nhạc'}
        >
          {playing ? (
            <span className="eq" aria-hidden>
              <i />
              <i />
              <i />
            </span>
          ) : (
            '♪'
          )}
        </button>
      </div>
    </>
  )
}
