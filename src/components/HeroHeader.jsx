const HERO_PARADE = [
  { emoji: '🦒', top: 10, size: 1.8, dur: 17, delay: -3,  opacity: 0.55 },
  { emoji: '🦓', top: 28, size: 1.1, dur: 12, delay: -5,  opacity: 0.5 },
  { emoji: '🦁', top: 5,  size: 1.4, dur: 14, delay: -7,  opacity: 0.6 },
  { emoji: '🦆', top: 45, size: 0.9, dur: 9,  delay: -2,  opacity: 0.45 },
  { emoji: '🐼', top: 60, size: 1.5, dur: 18, delay: -11, opacity: 0.6 },
  { emoji: '🦊', top: 25, size: 1.0, dur: 10, delay: -4,  opacity: 0.5 },
  { emoji: '🐸', top: 55, size: 1.2, dur: 13, delay: -8,  opacity: 0.55 },
  { emoji: '🐨', top: 35, size: 0.9, dur: 8,  delay: -1,  opacity: 0.4 },
  { emoji: '🐘', top: 70, size: 2.0, dur: 22, delay: -14, opacity: 0.65 },
  { emoji: '🐾', top: 50, size: 0.7, dur: 7,  delay: -6,  opacity: 0.35 },
]

export default function HeroHeader({ totalCount, isMusicPlaying, onToggleMusic, onToggleTheme, kidTheme, onSelectTheme }) {
  const toggleKidTheme = value => {
    onSelectTheme(kidTheme === value ? null : value)
  }

  return (
    <header className="hero-section">
      <div className="blob blob-one"></div>
      <div className="blob blob-two"></div>

      <div className="top-bar">
        <span className="top-label">👋 من زائرنا الصغير اليوم؟</span>
        <div className="kid-theme-picker" role="group" aria-label="من هو زائرنا الصغير؟">
          <button
            className={`kt-btn ${kidTheme === 'boy' ? 'active' : ''}`}
            onClick={() => toggleKidTheme('boy')}
          >
            👦 ولد
          </button>
          <button
            className={`kt-btn ${kidTheme === 'girl' ? 'active' : ''}`}
            onClick={() => toggleKidTheme('girl')}
          >
            👧 بنت
          </button>
        </div>
        <button className="action-btn" onClick={onToggleMusic}>
          {isMusicPlaying ? '⏸ إيقاف الأصوات' : '🎵 (jungle sound)تشغيل أصوات الغابة'}
        </button>
        <button className="action-btn" onClick={onToggleTheme}>🌙 (dark mode)الوضع الداكن</button>
      </div>

      <div className="header-text">
        <h1>🌍 Animal <span>World</span></h1>
        <h2>عالم الحيوانات التفاعلي 🐾</h2>
        <p>اضغط على أي حيوان لتسمع صوته باللغتين وتتعلم معلومة رهيبة عنه!</p>
        <div className="badge">{totalCount} حيوانات 🐾</div>
        {kidTheme && (
          <div key={kidTheme} className="welcome-chip" aria-live="polite">
            {kidTheme === 'boy' ? '👦 أهلاً ببطلنا الشجاع!' : '👧 أهلاً بأميرتنا الجميلة!'}
          </div>
        )}
      </div>

      <div className="hero-skyline" aria-hidden="true"></div>

      <div className="hero-parade" aria-hidden="true">
        {HERO_PARADE.map((animal, i) => (
          <span
            key={i}
            className="ba"
            style={{
              top: `${animal.top}px`,
              fontSize: `${animal.size}rem`,
              opacity: animal.opacity,
              '--dur': `${animal.dur}s`,
              '--delay': `${animal.delay}s`,
            }}
          >
            {animal.emoji}
          </span>
        ))}
      </div>
    </header>
  )
}