// Mood check-in: one branching question that leads to one of four mood paths.
// Every branch carries placeholder background/sound fields to be filled later.

export type MoodKey = 'happy' | 'neutral' | 'sad' | 'overwhelmed'

export interface MoodOption {
  key: MoodKey
  label: string
  /** Placeholder tint for the option chip. */
  color: string
}

export interface MoodBranch {
  key: MoodKey
  title: string
  message: string
  /** A small suggested next step for this mood. */
  suggestion: string
  /** Real background image, supplied later. */
  background: string
  /** Placeholder solid color while there is no image. */
  backgroundColor: string
  /** Sound file, supplied later. */
  sound: string
}

export const moodQuestion = {
  id: 'mood-checkin',
  question: 'How are you arriving today?',
  helper: 'There is no wrong answer — just notice what feels closest.',
  background: '/public/background/intro/02.PNG',
  // backgroundColor: '#15384a',
  sound: '',
}

export const moodOptions: MoodOption[] = [
  { key: 'happy', label: 'Happy', color: '#e0b64a' },
  { key: 'neutral', label: 'Neutral', color: '#6f8fa3' },
  { key: 'sad', label: 'Sad', color: '#4a6f9c' },
  { key: 'overwhelmed', label: 'Overwhelmed', color: '#a15b6f' },
]

export const moodBranches: Record<MoodKey, MoodBranch> = {
  happy: {
    key: 'happy',
    title: 'That warmth suits you',
    message:
      "It's worth savoring the good moments as fully as the hard ones. Let this feeling take up space.",
    suggestion: 'Name one thing that helped you feel this way, and let yourself enjoy it a little longer.',
    background: '/public/background/intro/background%201.PNG',
    backgroundColor: '#3a5a2f',
    sound: '',
  },
  neutral: {
    key: 'neutral',
    title: 'Steady is okay too',
    message:
      'Not every day needs a headline. Neutral is a resting place, and rest is allowed.',
    suggestion: 'Take one slow breath and notice one small, ordinary thing you appreciate right now.',
    background: '/public/background/intro/background%202.PNG',
    backgroundColor: '#2f4a55',
    sound: '',
  },
  sad: {
    key: 'sad',
    title: "I'm glad you told me",
    message:
      'Sadness is heavy, and you carried it here anyway. You do not have to fix it right now — just be with it gently.',
    suggestion: 'Place a hand on your chest and let yourself feel it for a moment. You are not alone in this.',
    background: '/public/background/intro/01.PNG',
    backgroundColor: '#243a5a',
    sound: '',
  },
  overwhelmed: {
    key: 'overwhelmed',
    title: "Let's make the world smaller",
    message:
      'When everything feels like too much, we only need the very next breath. Nothing else has to be solved this second.',
    suggestion: 'Breathe in for four counts, hold for four, out for four. Just once. Then again if it helps.',
    background: '/public/background/intro/background%203.PNG',
    backgroundColor: '#4a2f3f',
    sound: '',
  },
}
