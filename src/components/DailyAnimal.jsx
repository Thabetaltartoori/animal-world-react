import { useEffect, useState } from 'react'
import Emoji from './Emoji'
import { fetchRandomAnimal } from '../api'

export default function DailyAnimal({ onSelect }) {
  const [animal, setAnimal] = useState(null)

  const pick = () => {
    fetchRandomAnimal()
      .then(setAnimal)
      .catch(() => {})
  }

  useEffect(() => {
    pick()
  }, [])

  if (!animal) return null

  return (
    <div className="daily-animal" onClick={() => onSelect(animal)}>
      <div className="daily-emoji">
        <Emoji symbol={animal.emoji} title={animal.en} />
      </div>
      <div className="daily-text">
        <span className="daily-label">🐾 حيوان اليوم</span>
        <span className="daily-names">{animal.ar} · {animal.en}</span>
        <span className="daily-hint">اضغط لتعرف المزيد! 👆</span>
      </div>
      <button className="daily-shuffle" onClick={e => { e.stopPropagation(); pick() }} title="حيوان آخر">
        🔄
      </button>
    </div>
  )
}