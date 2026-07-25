
export type MoodKey = 'happy' | 'neutral' | 'sad' | 'overwhelmed'

export interface MoodTab {
  type: 'text-whale' | 'collect-answer'
  navigation: 'tap-anywhere' | 'button'
  background: string
  backgroundColor: string
  sound: string
  text?: string
  prompt?: string
  placeholder?: string
  buttonLabel?: string
  transition?: string
}

// Intro pages before mood picker
export const moodIntroPages = [
  {
    id: 'mood-intro-1',
    type: 'text-whale',
    navigation: 'tap-anywhere',
    background: '/background/mood/intro.PNG',
    backgroundColor: '#1a4a5a',
    sound: '',
    transition: 'fade',
    text: 'Before we go deeper, I need to know where you are right now.',
  },
]

// Mood picker page
export const moodPickerPage = {
  id: 'mood-checkin',
  type: 'question',
  navigation: 'button',
  background: '/background/mood/picker.PNG',
  backgroundColor: '#15384a',
  sound: '',
  question: 'How are you arriving today?',
  helper: 'There is no wrong answer — just notice what feels closest.',
  options: [
    { key: 'happy', label: 'Happy', color: '#e0b64a' },
    { key: 'neutral', label: 'Neutral', color: '#6f8fa3' },
    { key: 'sad', label: 'Sad', color: '#4a6f9c' },
    { key: 'overwhelmed', label: 'Overwhelmed', color: '#a15b6f' },
  ],
}

// Journey for EACH mood (2-3 pages per mood)
export const moodJourneys: Record<MoodKey, MoodTab[]> = {
  happy: [
    {
      type: 'text-whale',
      navigation: 'tap-anywhere',
      background: '/background/happy/1.PNG',
      backgroundColor: '#3a5a2f',
      sound: '',
      transition: 'fade',
      text: 'I can feel that lightness in you. It radiates like sunlight on the water.',
    },
    {
      type: 'text-whale',
      navigation: 'tap-anywhere',
      background: '/background/happy/2.PNG',
      backgroundColor: '#3a5a2f',
      sound: '',
      transition: 'fade',
      text: "It's worth savoring the good moments as fully as the hard ones. Let this feeling take up space.",
    },
    {
      type: 'collect-answer',
      navigation: 'button',
      background: '/background/happy/3.PNG',
      backgroundColor: '#3a5a2f',
      sound: '',
      prompt: 'Name one thing that helped you feel this way.',
      placeholder: 'Type it out...',
      buttonLabel: 'Hold onto this',
    },
  ],
  neutral: [
    {
      type: 'text-whale',
      navigation: 'tap-anywhere',
      background: '/background/neutral/1.PNG',
      backgroundColor: '#2f4a55',
      sound: '',
      transition: 'fade',
      text: 'Steady. Grounded. Not every day needs a headline.',
    },
    {
      type: 'text-whale',
      navigation: 'tap-anywhere',
      background: '/background/neutral/2.PNG',
      backgroundColor: '#2f4a55',
      sound: '',
      transition: 'fade',
      text: 'Neutral is a resting place, and rest is allowed here.',
    },
    {
      type: 'collect-answer',
      navigation: 'button',
      background: '/background/neutral/3.PNG',
      backgroundColor: '#2f4a55',
      sound: '',
      prompt: 'Notice one small, ordinary thing you appreciate.',
      placeholder: 'What is it?',
      buttonLabel: 'I see it',
    },
  ],
  sad: [
    {
      type: 'text-whale',
      navigation: 'tap-anywhere',
      background: '/background/sad/1.PNG',
      backgroundColor: '#243a5a',
      sound: '',
      transition: 'fade',
      text: 'I see the weight you.',
    },
    {
      type: 'text-whale',
      navigation: 'tap-anywhere',
      background: '/background/sad/2.PNG',
      backgroundColor: '#243a5a',
      sound: '',
      transition: 'fade',
      text: 'You do not have to fix it right now. Just be with it gently. ',
    },
    {
      type: 'collect-answer',
      navigation: 'button',
      background: '/background/sad/3.PNG',
      backgroundColor: '#243a5a',
      sound: '',
      prompt: 'What do you need right now?',
      placeholder: 'Say it softly...',
      buttonLabel: 'I hear you',
    },
  ],
  overwhelmed: [
    {
      type: 'text-whale',
      navigation: 'tap-anywhere',
      background: '/background/overwhelmed/1.PNG',
      backgroundColor: '#4a2f3f',
      sound: '',
      transition: 'fade',
      text: "When everything feels like too much, we only need the very next breath.",
    },
    {
      type: 'text-whale',
      navigation: 'tap-anywhere',
      background: '/background/overwhelmed/2.PNG',
      backgroundColor: '#4a2f3f',
      sound: '',
      transition: 'fade',
      text: 'Nothing else has to be solved this second. Just this moment. Just your breath.',
    },
    {
      type: 'collect-answer',
      navigation: 'button',
      background: '/background/overwhelmed/3.PNG',
      backgroundColor: '#4a2f3f',
      sound: '',
      prompt: 'What`s one small thing you can let go of right now?',
      placeholder: 'Type it...',
      buttonLabel: 'Let it drift',
    },
  ],
}

// Generate IDs programmatically (no duplication)
export function getMoodTabWithId(mood: MoodKey, tabIndex: number) {
  const tab = moodJourneys[mood][tabIndex]
  return {
    id: `${mood}-${tabIndex + 1}`, // happy-1, happy-2, happy-3, etc.
    ...tab,
  }
}