import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// lets the background music step aside while a video plays with sound
const videoSound = (on) => window.dispatchEvent(new CustomEvent('video-sound', { detail: on }))

const reveal = {
  initial: { clipPath: 'inset(14% 10% 14% 10% round 22px)', opacity: 0, scale: 0.94 },
  whileInView: { clipPath: 'inset(0% 0% 0% 0% round 18px)', opacity: 1, scale: 1 },
  viewport: { once: true, margin: '0px 0px -12% 0px' },
  transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
}

export function Photo({ src, alt = '', tilt = 0 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  return (
    <motion.figure ref={ref} className="frame" style={{ rotate: tilt }} {...reveal}>
      <motion.img src={src} alt={alt} loading="lazy" decoding="async" style={{ y }} />
    </motion.figure>
  )
}

export function Video({ src, hasAudio, tilt = 0 }) {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)

  // autoplay only while on screen
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else {
          el.pause()
          // scrolled away: mute again and give the music back
          if (!el.muted) {
            el.muted = true
            setMuted(true)
            videoSound(false)
          }
        }
      },
      { threshold: 0.45 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const toggleSound = () => {
    const el = ref.current
    el.muted = !el.muted
    setMuted(el.muted)
    videoSound(!el.muted)
    if (!el.muted) el.play().catch(() => {})
  }

  return (
    <motion.figure className="frame frame--video" style={{ rotate: tilt }} {...reveal}>
      <video ref={ref} src={src} muted loop playsInline preload="metadata" />
      {hasAudio && (
        <button className="sound" onClick={toggleSound} aria-label={muted ? 'Bật tiếng' : 'Tắt tiếng'}>
          {muted ? '🔇 Chạm để bật tiếng' : '🔊 Đang phát'}
        </button>
      )}
    </motion.figure>
  )
}

export function Gallery({ items }) {
  const ref = useRef(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const el = ref.current
    setActive(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <motion.div className="gallery" {...reveal}>
      <div className="gallery__track" ref={ref} onScroll={onScroll}>
        {items.map((m) => (
          <div className="gallery__slide" key={m.src}>
            <img src={m.src} alt="" loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
      <div className="gallery__dots" aria-hidden>
        {items.map((m, i) => (
          <span key={m.src} className={i === active ? 'on' : ''} />
        ))}
      </div>
      <p className="gallery__hint">vuốt sang để xem tiếp →</p>
    </motion.div>
  )
}

export function MediaBlock({ media, tilt }) {
  if (media.length > 1) return <Gallery items={media} />
  const [m] = media
  return m.type === 'video' ? <Video {...m} tilt={tilt} /> : <Photo src={m.src} tilt={tilt} />
}
