// Chapter: Quiz
// "Which sea creature are you?" personality quiz (3 sample questions)
// Uses the same scoring system as their existing quiz data

export type AnimalKey = 'dolphin' | 'dugong' | 'octopus' | 'pufferfish' | 'sea-turtle'

export interface QuizOption {
  letter: 'A' | 'B' | 'C' | 'D' | 'E'
  label: string
}

export interface QuizQuestion {
  id: string
  type: 'question'
  navigation: 'button'
  question: string
  backgroundColor: string
  background: string
  sound: string
  options: QuizOption[]
}

export interface AnimalResult {
  key: AnimalKey
  name: string
  tagline: string
  description: string
  iconColor: string
}

export const letterToAnimal: Record<QuizOption['letter'], AnimalKey> = {
  A: 'dolphin',
  B: 'dugong',
  C: 'octopus',
  D: 'pufferfish',
  E: 'sea-turtle',
}

export const animals: Record<AnimalKey, AnimalResult> = {
  dolphin: {
    key: 'dolphin',
    name: 'Dolphin',
    tagline: 'The playful connector',
    description:
      'You recharge through people and play. Your warmth lifts the room, and your instinct to check on others is a quiet superpower.',
    iconColor: '#4bb3c9',
  },
  dugong: {
    key: 'dugong',
    name: 'Dugong',
    tagline: 'The gentle grazer',
    description:
      'Slow, steady, and unbothered by the rush. You find calm in simple routines and protect your peace without apology.',
    iconColor: '#7a9a7e',
  },
  octopus: {
    key: 'octopus',
    name: 'Octopus',
    tagline: 'The clever adapter',
    description:
      'Curious and resourceful, you feel your way through change. You process a lot beneath the surface before you show it.',
    iconColor: '#b06a8f',
  },
  pufferfish: {
    key: 'pufferfish',
    name: 'Pufferfish',
    tagline: 'The soft-hearted guardian',
    description:
      'You feel deeply and set boundaries when you need to. Underneath the guard is a tender, loyal heart.',
    iconColor: '#c9a24b',
  },
  'sea-turtle': {
    key: 'sea-turtle',
    name: 'Sea Turtle',
    tagline: 'The steady wanderer',
    description:
      'Patient and self-reliant, you move at your own pace and trust the long journey. You carry home wherever you go.',
    iconColor: '#5b8f74',
  },
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'question',
    navigation: 'button',
    question: 'After a long, draining day, what helps you feel like yourself again?',
    backgroundColor: '#1a5566',
    background: '/background/quiz/1.PNG',
    sound: '',
    options: [
      { letter: 'A', label: 'Talking it out with someone I trust' },
      { letter: 'B', label: 'Doing nothing, slowly, in a quiet room' },
      { letter: 'C', label: 'Getting lost in a project or hobby' },
      { letter: 'D', label: 'Retreating somewhere safe and small' },
      { letter: 'E', label: 'A walk alone with my own thoughts' },
    ],
  },
  {
    id: 'q2',
    type: 'question',
    navigation: 'button',
    question: 'When a plan suddenly changes, your first reaction is to…',
    backgroundColor: '#184b5c',
    background: '/background/quiz/2.PNG',
    sound: '',
    options: [
      { letter: 'A', label: 'Rally everyone and make the best of it' },
      { letter: 'B', label: 'Shrug and adjust — no big deal' },
      { letter: 'C', label: 'Quietly rework the whole approach' },
      { letter: 'D', label: 'Feel a jolt of stress, then steady myself' },
      { letter: 'E', label: 'Keep going at my own pace regardless' },
    ],
  },
  {
    id: 'q3',
    type: 'question',
    navigation: 'button',
    question: 'How do you usually handle a big feeling?',
    backgroundColor: '#164252',
    background: '/background/quiz/3.PNG',
    sound: '',
    options: [
      { letter: 'A', label: 'Share it out loud right away' },
      { letter: 'B', label: 'Let it pass gently, like a wave' },
      { letter: 'C', label: 'Turn it over privately for a while' },
      { letter: 'D', label: 'Protect myself until it feels safe' },
      { letter: 'E', label: 'Sit with it slowly until it settles' },
    ],
  },
]

/** Count answer letters and return the most frequent animal */
export function scoreQuiz(letters: QuizOption['letter'][]): AnimalKey {
  const counts: Record<string, number> = {}
  for (const l of letters) counts[l] = (counts[l] ?? 0) + 1
  
  const order: QuizOption['letter'][] = ['A', 'B', 'C', 'D', 'E']
  let best = order[0]
  let bestCount = -1
  
  for (const letter of order) {
    const c = counts[letter] ?? 0
    if (c > bestCount) {
      bestCount = c
      best = letter
    }
  }
  
  return letterToAnimal[best]
}