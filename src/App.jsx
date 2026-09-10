import { useEffect, useRef, useState } from 'react'
import AnimalBackground from './components/AnimalBackground'
import HeroHeader from './components/HeroHeader'
import FilterTabs from './components/FilterTabs'
import AnimalGrid from './components/AnimalGrid'
import AnimalModal from './components/AnimalModal'
import DailyAnimal from './components/DailyAnimal'
import { ANIMAL_DATA } from './AnimalData'
import { fetchAnimals } from './api'

const MUSIC_URL = '/jungle.ogg'

export default function App() {
  const [currentFilter, setCurrentFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [kidTheme, setKidTheme] = useState(null)
  const [animals, setAnimals] = useState(ANIMAL_DATA)
  const [loading, setLoading] = useState(true)
  const [apiMode, setApiMode] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme)
    return () => document.body.classList.remove('dark-theme')
  }, [isDarkTheme])

  useEffect(() => {
    document.body.classList.toggle('kid-boy', kidTheme === 'boy')
    document.body.classList.toggle('kid-girl', kidTheme === 'girl')
    return () => {
      document.body.classList.remove('kid-boy', 'kid-girl')
    }
  }, [kidTheme])

  useEffect(() => {
    fetchAnimals({ q: searchQuery, cat: currentFilter })
      .then(list => {
        setAnimals(list)
        setApiMode(true)
        setLoading(false)
      })
      .catch(() => {
        const fallback = ANIMAL_DATA.filter(a => {
          const matchesCategory = currentFilter === 'all' || a.category === currentFilter
          const query = searchQuery.toLowerCase().trim()
          const matchesQuery = !query || a.en.toLowerCase().includes(query) || a.ar.includes(query)
          return matchesCategory && matchesQuery
        })
        setAnimals(fallback)
        setApiMode(false)
        setLoading(false)
      })
  }, [searchQuery, currentFilter])

  useEffect(() => {
    let mounted = true
    const timer = setTimeout(() => {
      if (mounted) setLoading(false)
    }, 1800)
    return () => {
      mounted = false
      clearTimeout(timer)
    }
  }, [])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(err => {
        console.log('تطلب بعض المتصفحات تفاعلاً من المستخدم قبل تشغيل الصوت.')
      })
      setIsMusicPlaying(true)
    } else {
      audio.pause()
      setIsMusicPlaying(false)
    }
  }

  return (
    <>
      <AnimalBackground />

      <audio ref={audioRef} loop>
        <source src={MUSIC_URL} type="audio/ogg" />
      </audio>

      <HeroHeader
        totalCount={apiMode ? animals.length : ANIMAL_DATA.length}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={toggleMusic}
        onToggleTheme={() => setIsDarkTheme(dark => !dark)}
        kidTheme={kidTheme}
        onSelectTheme={setKidTheme}
      />

      <main className="container">
        {apiMode && (
          <div className="api-badge">
            <span className="api-dot"></span> متصل بالـ API · البيانات من الخادم
          </div>
        )}

        <DailyAnimal onSelect={setSelectedAnimal} />

        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="ابحث عن اسم حيوانك المفضل هنا... 🔍"
          />
        </div>

        <FilterTabs
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
        />

        {loading ? (
          <div className="loading-state">
            <span className="loader"></span>
            <p>جاري جلب الحيوانات من السيرفر... 🐾</p>
          </div>
        ) : (
          <>
            <AnimalGrid animals={animals} onSelect={setSelectedAnimal} />
            <div
              className="hidden-message"
              style={{ display: animals.length === 0 ? 'block' : 'none' }}
            >
              😅 هوبس! لم نجد هذا الحيوان، جرب كلمة أخرى!
            </div>
          </>
        )}
      </main>

      <AnimalModal animal={selectedAnimal} onClose={() => setSelectedAnimal(null)} />

      <footer className="main-footer">
        <p>صُنع بكل حب للأبطال الصغار ❤️ عالم الـ 100 حيوان التفاعلي 2026</p>
        <p className="footer-supervision">اشراف eng. thabet altartoori</p>
      </footer>
    </>
  )
}