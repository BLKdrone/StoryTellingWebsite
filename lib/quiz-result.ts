import type { AnimalKey } from '@/data/quiz'

const KEY = 'quiz-result'

export function saveQuizResult(result: AnimalKey) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEY, result)
  }
}

export function getQuizResult(): AnimalKey | null {
  if (typeof window === 'undefined') return null
  return (localStorage.getItem(KEY) as AnimalKey | null) ?? null
}

export function clearQuizResult() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(KEY)
  }
}