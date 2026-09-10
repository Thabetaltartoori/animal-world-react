const API_URL = 'http://localhost:4000'

export async function fetchAnimals({ q = '', cat = 'all' } = {}) {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (cat && cat !== 'all') params.set('cat', cat)

  const res = await fetch(`${API_URL}/api/animals?${params.toString()}`)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  const data = await res.json()
  return data.animals
}

export async function fetchRandomAnimal() {
  const res = await fetch(`${API_URL}/api/animals/random`)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

export async function fetchStats() {
  const res = await fetch(`${API_URL}/api/stats`)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}