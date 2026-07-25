import type { StoryPageData } from '@/lib/story'

// The story is data-driven: every screen is a plain page object in this array.
// Intro pages have been moved to /data/intro.ts and are shown at /intro
// Main story starts with mood-check
export const pages: StoryPageData[] = [
  {
    id: 'mood-check',
    type: 'question',
    navigation: 'button',
    background: '',
    backgroundColor: '',
    sound: '',
    transition: 'fade',
    question: 'How are you feeling right now?',
    options: ['Calm', 'Anxious', 'Tired', 'Numb'],
  },
  {
    id: 'weight',
    type: 'collect-answer',
    navigation: 'button',
    background: '',
    backgroundColor: '#15304a',
    sound: '',
    transition: 'fade',
    prompt: 'ก่อนอื่น เธอ อยากให้ฉันเรียกเธอว่ายังไงเหรอ',
    placeholder: 'Type it out',
    buttonLabel: 'Let it drift',
  },
  {
    id: 'farewell',
    type: 'text-whale',
    navigation: 'tap-anywhere',
    background: '',
    backgroundColor: '#24607a',
    sound: '',
    transition: 'fade',
    text: 'Thank you for spending this quiet moment with me. Come back whenever you need to slow down. — Nara',
  },
]

export function getPageIndexById(id: string): number {
  return pages.findIndex((p) => p.id === id)
}
