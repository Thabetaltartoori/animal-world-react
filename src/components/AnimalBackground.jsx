const WALKERS = [
  { emoji: '🦒', top: '6%',  size: 1.2, dur: 42, delay: -5,  opacity: 0.06, blur: 3 },
  { emoji: '🦁', top: '14%', size: 1.8, dur: 50, delay: -20, opacity: 0.09, blur: 1.5 },
  { emoji: '🐘', top: '22%', size: 2.4, dur: 64, delay: -35, opacity: 0.11, blur: 0.5 },
  { emoji: '🦊', top: '30%', size: 1.4, dur: 38, delay: -12, opacity: 0.07, blur: 2 },
  { emoji: '🐵', top: '38%', size: 1.0, dur: 30, delay: -8,  opacity: 0.055, blur: 2.5 },
  { emoji: '🦓', top: '46%', size: 2.0, dur: 58, delay: -28, opacity: 0.10, blur: 1 },
  { emoji: '🐼', top: '54%', size: 1.6, dur: 44, delay: -16, opacity: 0.08, blur: 1.5 },
  { emoji: '🐧', top: '62%', size: 1.2, dur: 36, delay: -10, opacity: 0.065, blur: 2.5 },
  { emoji: '🦆', top: '70%', size: 0.9, dur: 26, delay: -6,  opacity: 0.05, blur: 3 },
  { emoji: '🐨', top: '78%', size: 1.7, dur: 52, delay: -24, opacity: 0.09, blur: 1 },
  { emoji: '🐸', top: '86%', size: 2.2, dur: 60, delay: -40, opacity: 0.12, blur: 0 },
]

const HOPPERS = [
  { emoji: '🐇', left: '8%',  top: '12%', size: 1.3, dur: 3.2, delay: -1, opacity: 0.08 },
  { emoji: '🐦', left: '20%', top: '42%', size: 1.1, dur: 2.6, delay: -2, opacity: 0.06 },
  { emoji: '🐭', left: '48%', top: '26%', size: 1.4, dur: 2.8, delay: -3, opacity: 0.09 },
  { emoji: '🐹', left: '70%', top: '16%', size: 1.2, dur: 3.6, delay: -5, opacity: 0.07 },
  { emoji: '🐤', left: '86%', top: '46%', size: 1.5, dur: 3.0, delay: -7, opacity: 0.10 },
]

const RISERS = [
  { emoji: '🍃', left: '10%', size: 1.4, dur: 28, delay: -4,  opacity: 0.10 },
  { emoji: '🦋', left: '30%', size: 1.6, dur: 36, delay: -18, opacity: 0.11 },
  { emoji: '🍂', left: '55%', size: 1.2, dur: 24, delay: -9,  opacity: 0.08 },
  { emoji: '🦋', left: '70%', size: 1.3, dur: 32, delay: -14, opacity: 0.09 },
  { emoji: '🍃', left: '88%', size: 1.5, dur: 30, delay: -22, opacity: 0.10 },
]

export default function AnimalBackground() {
  return (
    <div className="animal-bg" aria-hidden="true">
      {WALKERS.map((a, i) => (
        <span
          key={`w${i}`}
          className="bg-animal bg-animal--walk"
          style={{
            top: a.top,
            fontSize: `${a.size}rem`,
            opacity: a.opacity,
            filter: `blur(${a.blur}px)`,
            '--dur': `${a.dur}s`,
            '--delay': `${a.delay}s`,
          }}
        >
          {a.emoji}
        </span>
      ))}

      {HOPPERS.map((a, i) => (
        <span
          key={`h${i}`}
          className="bg-animal bg-animal--hop"
          style={{
            left: a.left,
            top: a.top,
            fontSize: `${a.size}rem`,
            opacity: a.opacity,
            '--dur': `${a.dur}s`,
            '--delay': `${a.delay}s`,
          }}
        >
          {a.emoji}
        </span>
      ))}

      {RISERS.map((a, i) => (
        <span
          key={`r${i}`}
          className="bg-animal bg-animal--rise"
          style={{
            left: a.left,
            bottom: '-10%',
            fontSize: `${a.size}rem`,
            opacity: a.opacity,
            '--dur': `${a.dur}s`,
            '--delay': `${a.delay}s`,
          }}
        >
          {a.emoji}
        </span>
      ))}
    </div>
  )
}