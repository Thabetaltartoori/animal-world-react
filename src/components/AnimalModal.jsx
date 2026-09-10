import { useEffect, useRef, useState } from 'react'
import Emoji from './Emoji'
import { ANIMAL_VOICES } from '../AnimalVoices'

const SOUND_WORDS = {
  Leopard: 'grrr',
  Zebra: 'a-woo a-woo',
  Gorilla: 'pat pat pat',
  Fox: 'yip yip yip',
  Hippopotamus: 'huff huff',
  Rhinoceros: 'snort snort',
  Kangaroo: 'cluck cluck',
  Koala: 'grrr grrr',
  Panda: 'grunt',
  Sloth: 'reee reee',
  Beaver: 'smack splash',
  Badger: 'grrr',
  Deer: 'bleat bleat',
  Camel: 'grunt grunt',
  Lizard: 'hiss',
  Raccoon: 'chitter chatter',
  Dolphin: 'click click eee',
  Seal: 'arf arf arf',
  'Sea Lion': 'arf arf arf',
  Walrus: 'grrr grrr',
  Bluebird: 'tweet tweet',
  Chic: 'cheep cheep',
  Ox: 'moo',
  Llama: 'hummm hummm',
  'Shepherd Dog': 'woof woof',
  Buffalo: 'moo',
  Turtle: 'grunt',
  'Sea Turtle': 'grunt',
  Gecko: 'chuck chuck',
  Hedgehog: 'snuffle snuffle',
  Fish: 'blub blub',
  'Tropical Fish': 'blub blub',
  Goldfish: 'blub blub',
  Pufferfish: 'blub blub',
}

const FEMALE_EN = /aria|jenny|zira|hazel|samantha|karen|moira|allison|susan|serena|sonia|ava|emma|olivia|natalie|victoria|michelle|steph/i
const FEMALE_AR = /zariyah|huda|salma|laila|amina|majida|nora|farida|raghda|shakira/i
const NATURAL = /natural|neural|online|premium/i

export default function AnimalModal({ animal, onClose }) {
  const audioRef = useRef(null)
  const [quiet, setQuiet] = useState(false)

  useEffect(() => {
    if (!('speechSynthesis' in window)) return undefined
    window.speechSynthesis.getVoices()
    const warmUp = () => window.speechSynthesis.getVoices()
    window.speechSynthesis.addEventListener('voiceschanged', warmUp)
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', warmUp)
      window.speechSynthesis.cancel()
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const pickVoice = lang => {
    const all = 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : []
    if (!all.length) return undefined
    const isAr = lang.startsWith('ar')
    const femaleRe = isAr ? FEMALE_AR : FEMALE_EN
    const candidates = all.filter(v => {
      const vLang = (v.lang || '').toLowerCase()
      return isAr ? vLang.startsWith('ar') : vLang.startsWith('en')
    })
    const score = v => {
      let s = 0
      if (NATURAL.test(v.name)) s += 5
      if (femaleRe.test(v.name)) s += 3
      if (v.localService) s += 1
      return s
    }
    candidates.sort((a, b) => score(b) - score(a))
    return candidates[0]
  }

  if (!animal) return null

  const stopAll = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }

  const speakArTTS = () => {
    if (!('speechSynthesis' in window)) return
    const sayAr = new SpeechSynthesisUtterance(animal.ar)
    sayAr.lang = 'ar-SA'
    sayAr.voice = pickVoice('ar-SA')
    sayAr.rate = 0.94
    sayAr.pitch = 1.02
    window.speechSynthesis.speak(sayAr)
  }

  const speakEnThenArTTS = () => {
    if (!('speechSynthesis' in window)) return
    const sayEn = new SpeechSynthesisUtterance(animal.en)
    sayEn.lang = 'en-US'
    sayEn.voice = pickVoice('en-US')
    sayEn.rate = 0.92
    sayEn.pitch = 1.05
    sayEn.onend = speakArTTS
    window.speechSynthesis.speak(sayEn)
  }

  const speakToKid = () => {
    stopAll()

    const voicePair = ANIMAL_VOICES[animal.en]
    const base = import.meta.env.BASE_URL

    if (!voicePair) {
      speakEnThenArTTS()
      return
    }

    const playLocal = index => {
      const path = index === 0 ? voicePair.en : voicePair.ar
      const audio = new Audio(base + path)
      audioRef.current = audio

      audio.onended = () => {
        if (index === 0) playLocal(1)
        else audioRef.current = null
      }

      audio.onerror = () => {
        console.log('[Listen] file error:', path)
        audioRef.current = null
        if (index === 0) speakEnThenArTTS()
        else speakArTTS()
      }

      const p = audio.play()
      if (p) {
        p.catch(err => {
          console.log('[Listen] play blocked:', path, err)
          audioRef.current = null
          if (index === 0) speakEnThenArTTS()
          else speakArTTS()
        })
      }
    }

    playLocal(0)
  }

  const playAnimalSound = () => {
    stopAll()
    setQuiet(false)

    if (animal.sound) {
      const audio = new Audio(animal.sound)
      audioRef.current = audio
      audio.play().catch(() => {
        audioRef.current = null
        const word = SOUND_WORDS[animal.en]
        if (word) {
          const utter = new SpeechSynthesisUtterance(word)
          utter.lang = 'en-US'
          utter.voice = pickVoice('en-US')
          utter.rate = 0.92
          utter.pitch = 1.05
          window.speechSynthesis.speak(utter)
        } else {
          setQuiet(true)
        }
      })
    } else if (SOUND_WORDS[animal.en]) {
      const utter = new SpeechSynthesisUtterance(SOUND_WORDS[animal.en])
      utter.lang = 'en-US'
      utter.voice = pickVoice('en-US')
      utter.rate = 0.92
      utter.pitch = 1.05
      window.speechSynthesis.speak(utter)
    } else {
      setQuiet(true)
    }
  }

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>✖</span>
        <div className="modal-emoji">
          <Emoji symbol={animal.emoji} title={animal.en} />
        </div>
        <h3>{animal.en}</h3>
        <h4>{animal.ar}</h4>

        <div className="modal-actions">
          <button className="speak-trigger" onClick={speakToKid}>
            📢 استمع وتعلّم · Listen
          </button>
          <button className="sound-trigger" onClick={playAnimalSound}>
            🔊 Sound of {animal.en}
          </button>
        </div>

        {quiet && animal && (
          <div className="quiet-note">
            🤫 هذا الحيوان صامت وهادئ جداً! · This animal is very quiet and silent.
          </div>
        )}

        <div className="info-box">
          <p className="en-text">💡 {animal.factEn}</p>
          <hr />
          <p className="ar-text">💡 {animal.factAr}</p>
        </div>
      </div>
    </div>
  )
}