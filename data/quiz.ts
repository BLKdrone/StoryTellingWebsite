// Data-driven "which sea creature are you?" quiz.
// Each option carries an animal letter; the result is the most frequent letter.

export type AnimalKey = 'dolphin' | 'dugong' | 'octopus' | 'pufferfish' | 'sea-turtle'

export interface QuizOption {
  /** Answer letter A–E, mapped to an animal via `letterToAnimal`. */
  letter: 'A' | 'B' | 'C' | 'D' | 'E'
  label: string
}

export interface QuizQuestion {
  id: string
  question: string
  /** Placeholder color for this page. Progressively darkened in the UI. */
  backgroundColor: string
  /** Real background image, supplied later. */
  background: string
  sound: string
  options: QuizOption[]
}

export interface AnimalResult {
  key: AnimalKey
  name: string
  tagline: string
  description: string
  /** Placeholder icon tint (no illustration/image). */
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
    question: 'After a long, draining day, what helps you feel like yourself again?',
    backgroundColor: '#1a5566',
    background: '',
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
    question: 'When a plan suddenly changes, your first reaction is to…',
    backgroundColor: '#184b5c',
    background: '',
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
    question: 'How do you usually handle a big feeling?',
    backgroundColor: '#164252',
    background: '',
    sound: '',
    options: [
      { letter: 'A', label: 'Share it out loud right away' },
      { letter: 'B', label: 'Let it pass gently, like a wave' },
      { letter: 'C', label: 'Turn it over privately for a while' },
      { letter: 'D', label: 'Protect myself until it feels safe' },
      { letter: 'E', label: 'Sit with it slowly until it settles' },
    ],
  },
  {
    id: 'q4',
    question: 'Your ideal kind of rest looks like…',
    backgroundColor: '#133948',
    background: '',
    sound: '',
    options: [
      { letter: 'A', label: 'Laughing with people I love' },
      { letter: 'B', label: 'Floating with zero obligations' },
      { letter: 'C', label: 'Tinkering with something interesting' },
      { letter: 'D', label: 'Cozy and tucked away from the world' },
      { letter: 'E', label: 'Wandering somewhere new but calm' },
    ],
  },
  {
    id: 'q5',
    question: 'Friends would say you are the one who…',
    backgroundColor: '#10303e',
    background: '',
    sound: '',
    options: [
      { letter: 'A', label: 'Brings everyone together' },
      { letter: 'B', label: 'Keeps things calm and grounded' },
      { letter: 'C', label: 'Always has a clever idea' },
      { letter: 'D', label: 'Feels things most deeply' },
      { letter: 'E', label: 'Quietly shows up, every time' },
    ],
  },
  {
    id: 'q6',
    question: 'What do you most want more of right now?',
    backgroundColor: '#0c2734',
    background: '',
    sound: '',
    options: [
      { letter: 'A', label: 'Connection' },
      { letter: 'B', label: 'Ease' },
      { letter: 'C', label: 'Clarity' },
      { letter: 'D', label: 'Safety' },
      { letter: 'E', label: 'Patience with myself' },
    ],
  },
]

/** Count answer letters and return the most frequent animal (ties broken by earliest letter). */
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
