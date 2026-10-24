import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { FloatingHearts, HeartBurst, Rain, useBurst } from './Effects'
import { MediaBlock } from './Media'
import { startAutoScroll } from './AutoScroll'
import { media, wishes } from '../story'

const ease = [0.16, 1, 0.3, 1]
const inView = { once: true, margin: '0px 0px -15% 0px' }
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: inView,
  transition: { duration: 0.9, delay, ease },
})

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero__bg" style={{ scale, backgroundImage: `url(${media.hero})` }} />
      <div className="hero__shade" />
      <Rain />
      <motion.div className="hero__content" style={{ y: textY, opacity: fade }}>
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1.2 }}>
          25 · 10 · 2025 — 25 · 10 · 2026
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2, ease }}>
          Một năm
          <br />
          <em>của chúng mình</em>
        </motion.h1>
        <motion.p className="hero__lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 1.2 }}>
          Có những câu chuyện bắt đầu bằng một cơn mưa.
          <br />
          Để anh kể em nghe nhé…
        </motion.p>
        <motion.button
          className="start-btn"
          onClick={startAutoScroll}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1, ease }}
        >
          ♥ Bắt đầu câu chuyện
        </motion.button>
      </motion.div>
      <motion.div className="scroll-hint" style={{ opacity: fade }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        <span>kéo xuống</span>
        <i />
      </motion.div>
    </section>
  )
}

export function Prologue() {
  return (
    <section className="prologue">
      <motion.p className="script" {...fadeUp()}>
        Ngày xửa ngày xưa…
      </motion.p>
      <div className="prologue__pair">
        <motion.figure
          className="prologue__card"
          initial={{ opacity: 0, x: -60, rotate: -14 }}
          whileInView={{ opacity: 1, x: 0, rotate: -6 }}
          viewport={inView}
          transition={{ duration: 1.1, ease }}
        >
          <img src={media.fox} alt="Chú cáo" loading="lazy" />
          <figcaption>một chú cáo</figcaption>
        </motion.figure>
        <motion.span className="prologue__amp" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={inView} transition={{ delay: 0.6, type: 'spring' }}>
          ♥
        </motion.span>
        <motion.figure
          className="prologue__card"
          initial={{ opacity: 0, x: 60, rotate: 14 }}
          whileInView={{ opacity: 1, x: 0, rotate: 6 }}
          viewport={inView}
          transition={{ duration: 1.1, delay: 0.2, ease }}
        >
          <img src={media.bunny} alt="Cô thỏ" loading="lazy" />
          <figcaption>một cô thỏ</figcaption>
        </motion.figure>
      </div>
      <motion.p className="prologue__text" {...fadeUp(0.3)}>
        …tình cờ bước vào thế giới của nhau.
        <br />
        Và đây là 365 ngày đầu tiên của họ.
      </motion.p>
    </section>
  )
}

export function ChapterIntro({ chapter }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  return (
    <header className="chapter-intro" ref={ref}>
      <motion.div className="chapter-intro__bg" style={{ y, backgroundImage: `url(${chapter.bg})` }} />
      <div className="chapter-intro__shade" />
      <div className="chapter-intro__content">
        <motion.p className="eyebrow" {...fadeUp()}>
          {chapter.no}
        </motion.p>
        <motion.h2 {...fadeUp(0.15)}>{chapter.title}</motion.h2>
        <motion.span className="rule" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={inView} transition={{ duration: 1, delay: 0.35, ease }} />
        <motion.p className="chapter-intro__sub" {...fadeUp(0.45)}>
          {chapter.subtitle}
        </motion.p>
      </div>
    </header>
  )
}

export function Milestone({ item, index }) {
  const tilt = index % 2 ? 1.6 : -1.6
  const isSnap = item.kind === 'snap'
  return (
    <article className={`milestone${isSnap ? ' milestone--snap' : ''}`}>
      <motion.span className="milestone__dot" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={inView} transition={{ type: 'spring', stiffness: 260, damping: 14 }} />
      <motion.p className="date" initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={inView} transition={{ duration: 0.7, ease }}>
        {item.date}
      </motion.p>
      {!isSnap && <motion.h3 {...fadeUp(0.1)}>{item.title}</motion.h3>}
      <MediaBlock media={item.media} tilt={tilt} />
      {isSnap && (
        <motion.p className="snap-caption" {...fadeUp(0.2)}>
          {item.title}
        </motion.p>
      )}
      {item.text?.map((t, i) => (
        <motion.p className="body" key={i} {...fadeUp(0.1)}>
          {t}
        </motion.p>
      ))}
      {item.quote && (
        <motion.blockquote {...fadeUp(0.1)}>
          “{item.quote}”
        </motion.blockquote>
      )}
      {item.outro && (
        <motion.p className="body" {...fadeUp(0.1)}>
          {item.outro}
        </motion.p>
      )}
    </article>
  )
}

export function TextMoment({ item }) {
  return (
    <section className="moment">
      <motion.p className="date" {...fadeUp()}>
        {item.date}
      </motion.p>
      {item.lines.map((line, i) => {
        const last = i === item.lines.length - 1
        return (
          <motion.p
            key={i}
            className={last ? 'moment__line moment__line--last' : 'moment__line'}
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 1.2, delay: 0.15, ease }}
          >
            {line}
          </motion.p>
        )
      })}
    </section>
  )
}

export function Proposal({ item }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -30% 0px' })
  const [burst, fire] = useBurst()

  useEffect(() => {
    if (!seen) return
    const t = setTimeout(fire, 900)
    return () => clearTimeout(t)
    // fire once when it first appears
  }, [seen])

  return (
    <section className="proposal" ref={ref}>
      <FloatingHearts count={14} />
      <motion.p className="date" {...fadeUp()}>
        {item.date}
      </motion.p>
      <div className="proposal__heart" onClick={fire}>
        <motion.div
          className="proposal__img"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={seen ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.3, ease }}
        >
          <img src={item.media[0].src} alt="" loading="lazy" />
        </motion.div>
        <HeartBurst trigger={burst} />
      </div>
      <motion.h3 className="proposal__title" initial={{ opacity: 0, scale: 0.8 }} animate={seen ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1, duration: 1, ease }}>
        {item.title}
      </motion.h3>
      {item.text.map((t, i) => (
        <motion.p className="body body--center" key={i} {...fadeUp(0.3)}>
          {t}
        </motion.p>
      ))}
      <p className="tap-hint">chạm vào trái tim nhé ♥</p>
    </section>
  )
}

function Counter({ to, label }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!seen) return
    const c = animate(0, to, { duration: 2.4, ease: 'easeOut', onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [seen, to])
  return (
    <div className="counter" ref={ref}>
      <strong>{val.toLocaleString('vi-VN')}</strong>
      <span>{label}</span>
    </div>
  )
}

const START = new Date(2025, 9, 25)

export function Finale() {
  const [days] = useState(() => Math.max(0, Math.floor((Date.now() - START) / 86400000)))
  const [burst, fire] = useBurst()

  return (
    <section className="finale">
      <FloatingHearts count={22} />
      <motion.p className="date" {...fadeUp()}>
        Hôm nay · 25 · 10 · 2026
      </motion.p>
      <motion.h2 {...fadeUp(0.1)}>
        Anh và em,
        <br />
        <em>tròn một năm yêu nhau</em>
      </motion.h2>

      <div className="counters">
        <Counter to={days} label="ngày" />
        <Counter to={days * 24} label="giờ" />
        <Counter to={days * 24 * 60} label="phút" />
      </div>

      <motion.figure
        className="finale__photo"
        initial={{ opacity: 0, y: 40, rotate: 0 }}
        whileInView={{ opacity: 1, y: 0, rotate: -3 }}
        viewport={inView}
        transition={{ duration: 1.1, ease }}
      >
        <img src={media.finale} alt="Anh và em" loading="lazy" />
        <figcaption>chúng mình ♥</figcaption>
      </motion.figure>

      <ul className="wishes">
        {wishes.map((w, i) => (
          <motion.li key={i} {...fadeUp(0.05)}>
            <span aria-hidden>♥</span>
            {w}
          </motion.li>
        ))}
      </ul>

      <div className="finale__end">
        <motion.p
          className="happy"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.4, ease }}
          onViewportEnter={() => setTimeout(fire, 700)}
        >
          Happy 1st Anniversary!
        </motion.p>
        <button className="love-btn" onClick={fire}>
          ♥
          <HeartBurst trigger={burst} count={20} />
        </button>
        <p className="tap-hint">thả tim cho chúng mình</p>
      </div>
    </section>
  )
}
