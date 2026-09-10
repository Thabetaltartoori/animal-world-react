const TABS = [
  { cat: 'all', label: '🌍 الكل' },
  { cat: 'wild', label: '🦁 برية' },
  { cat: 'sea', label: '🌊 بحرية' },
  { cat: 'bird', label: '🐦 طيور' },
  { cat: 'farm', label: '🌾 المزرعة' },
  { cat: 'pet', label: '🏠 أليفة' },
  { cat: 'insect', label: '🦋 حشرات' },
]

export default function FilterTabs({ currentFilter, onFilterChange }) {
  return (
    <div className="filter-tabs">
      {TABS.map(tab => (
        <button
          key={tab.cat}
          className={`tab-btn ${currentFilter === tab.cat ? 'active' : ''}`}
          onClick={() => onFilterChange(tab.cat)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}