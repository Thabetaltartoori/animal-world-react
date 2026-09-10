import Emoji from './Emoji'

export default function AnimalGrid({ animals, onSelect }) {
  return (
    <section className="animals-grid">
      {animals.map(animal => (
        <div
          key={animal.en}
          className="animal-card"
          onClick={() => onSelect(animal)}
        >
          <span className="card-emoji">
            <Emoji symbol={animal.emoji} title={animal.en} />
          </span>
          <div className="card-title-en">{animal.en}</div>
          <div className="card-title-ar">{animal.ar}</div>
        </div>
      ))}
    </section>
  )
}