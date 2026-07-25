import type { StoryPageData } from '@/lib/story'

// The story is data-driven: every screen is a plain page object in this array.
// `background` and `sound` are intentionally empty — real image/audio files
// will be dropped in later. `backgroundColor` is a simple placeholder tint so
// the layout is visible in the meantime.
export const pages: StoryPageData[] = [
  {
    id: 'welcome',
    type: 'text-whale',
    navigation: 'tap-anywhere',
    background: [
      '/background/intro/background1.PNG',
      '/background/intro/background2.PNG',
      '/background/intro/background3.PNG',
    ],
    backgroundColor: '',
    sound: '',
    transition: 'fade',
    text: "จากนี้จะพาเธอทางในทะเลไปด้วยกัน ",
  },

  {
    id: 'invitation',
    type: 'text-whale',
    navigation: 'tap-anywhere',
   background: [
      '/background/intro/background1.PNG',
      '/background/intro/background2.PNG',
      '/background/intro/background3.PNG',
    ],
    backgroundColor: '',
    sound: '',
    transition: 'fade',
    text: "วาฬ: ฉันเอง ปลาวาฬ! ยินดีต้อนรับสู่ทะเลแห่งนี",
  },
  {
    id: 'descent',
    type: 'animation',
    navigation: 'tap-anywhere',
    background: '',
    backgroundColor: '',
    sound: '',
    transition: 'dive',
    title: 'Descending',
    text: ': ก่อนอื่น เธอ อยากให้ฉันเรียกเธอว่ายังไงเหรอ',
    duration: 4000,
  },
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
    prompt: "ก่อนอื่น เธอ อยากให้ฉันเรียกเธอว่ายังไงเหรอ",
    placeholder: 'Type it out',
    buttonLabel: 'Let it drift',
  },
  // {
  //   id: 'breathe',
  //   type: 'transition',
  //   navigation: 'button',
  //   background: '',
  //   backgroundColor: '#0c1e30',
  //   sound: '',
  //   transition: 'breathe',
  //   text: 'Breathe with me. In… and out.',
  //   duration: 5000,
  // },
  // {
  //   id: 'kindness',
  //   type: 'reflection-input',
  //   navigation: 'button',
  //   background: '',
  //   backgroundColor: '#1c3d55',
  //   sound: '',
  //   transition: 'fade',
  //   prompt: 'Write one kind sentence to yourself.',
  //   placeholder: 'You deserve gentleness…',
  //   buttonLabel: 'Hold onto this',
  // },
  // {
  //   id: 'ascent',
  //   type: 'transition',
  //   navigation: 'button',
  //   background: '',
  //   backgroundColor: '#1f4a63',
  //   sound: '',
  //   transition: 'rise',
  //   text: 'Rising back toward the surface…',
  //   duration: 3500,
  // },
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
