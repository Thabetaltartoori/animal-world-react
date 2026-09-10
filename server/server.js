import express from 'express'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const animals = JSON.parse(readFileSync(join(__dirname, 'animals.json'), 'utf-8'))

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/api/animals', (req, res) => {
  const { q, cat } = req.query
  let list = animals

  if (cat && cat !== 'all') {
    list = list.filter(a => a.category === cat)
  }

  if (q) {
    const query = String(q).toLowerCase().trim()
    list = list.filter(
      a => a.en.toLowerCase().includes(query) || a.ar.includes(query)
    )
  }

  res.json({ total: list.length, animals: list })
})

app.get('/api/animals/random', (req, res) => {
  const random = animals[Math.floor(Math.random() * animals.length)]
  res.json(random)
})

app.get('/api/animals/:en', (req, res) => {
  const animal = animals.find(a => a.en.toLowerCase() === req.params.en.toLowerCase())
  if (!animal) return res.status(404).json({ error: 'Animal not found' })
  res.json(animal)
})

app.get('/api/stats', (req, res) => {
  const categories = animals.reduce((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + 1
    return acc
  }, {})
  res.json({ total: animals.length, categories })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`🌍 API server ready at http://localhost:${PORT}/api/animals`)
})