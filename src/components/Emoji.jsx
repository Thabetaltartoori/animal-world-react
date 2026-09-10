const TWEMOJI_BASE = 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/72x72'

function emojiToCodePoints(emoji) {
  return Array.from(emoji)
    .map(cp => cp.codePointAt(0).toString(16))
    .join('-')
}

export default function Emoji({ symbol, className, title }) {
  const code = emojiToCodePoints(symbol)
  return (
    <img
      className={className ? `${className} twemoji` : 'twemoji'}
      src={`${TWEMOJI_BASE}/${code}.png`}
      alt={symbol}
      title={title || symbol}
      loading="lazy"
      draggable={false}
    />
  )
}