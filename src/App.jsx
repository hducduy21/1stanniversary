import { MotionConfig } from 'framer-motion'
import { chapters } from './story'
import { ProgressBar } from './components/Effects'
import Music from './components/Music'
import AutoScroll from './components/AutoScroll'
import { ChapterIntro, Finale, Hero, Milestone, Prologue, Proposal, TextMoment } from './components/Story'

function Item({ item, index }) {
  if (item.kind === 'text') return <TextMoment item={item} />
  if (item.kind === 'proposal') return <Proposal item={item} />
  return <Milestone item={item} index={index} />
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ProgressBar />
      <Music />
      <AutoScroll />
      {/* heart-shaped mask used by the proposal photo */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <clipPath id="heart" clipPathUnits="objectBoundingBox">
          <path d="M0.5,0.94 C0.5,0.94 0.04,0.66 0.04,0.32 C0.04,0.15 0.17,0.04 0.3,0.04 C0.4,0.04 0.47,0.1 0.5,0.18 C0.53,0.1 0.6,0.04 0.7,0.04 C0.83,0.04 0.96,0.15 0.96,0.32 C0.96,0.66 0.5,0.94 0.5,0.94 Z" />
        </clipPath>
      </svg>
      <main className="story">
        <Hero />
        <Prologue />
        {chapters.map((chapter) => (
          <section className="chapter" key={chapter.no}>
            <ChapterIntro chapter={chapter} />
            <div className="timeline">
              {chapter.items.map((item, i) => (
                <Item key={i} item={item} index={i} />
              ))}
            </div>
          </section>
        ))}
        <Finale />
      </main>
    </MotionConfig>
  )
}
