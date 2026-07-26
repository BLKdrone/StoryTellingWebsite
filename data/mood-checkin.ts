// Mood check-in: one branching question that leads to one of four mood paths.
// Every branch carries placeholder background/sound fields to be filled later.

export type MoodKey = 'happy' | 'neutral' | 'sad' | 'overwhelmed'

export interface MoodOption {
  key: MoodKey
  label: string
  /** Placeholder tint for the option chip. */
  color: string
}

export interface MoodPage {
  title: string
  message: string
  /** A small suggested next step for this mood. */
  suggestion: string
  /** Real background image, supplied later. */
  background: string
  /** Placeholder solid color while there is no image. */
  // backgroundColor: string
  // /** Sound file, supplied later. */
  sound: string
}

export interface MoodBranch {
  key: MoodKey
  pages: MoodPage[]   // <-- was single title/message/suggestion, now an array
}

export const moodQuestion = {
  id: 'mood-checkin',
  question: 'ก่อนอื่น เธอ อยากให้ฉันเรียกเธอว่ายังไงเหรอ',
  helper: 'หหหห',
  background: '/background/intro/02.PNG',
  navigation: 'tap-anywhere',
  // backgroundColor: '#15384a',
  sound: '',
}

export const moodOptions: MoodOption[] = [
  { key: 'happy', label: 'มีความสุข', color: '#e0b64a' },
  { key: 'neutral', label: 'เฉยๆ', color: '#6f8fa3' },
  { key: 'sad', label: 'เศร้า เสียใจ', color: '#4a6f9c' },
  { key: 'overwhelmed', label: 'หงุดหงด', color: '#a15b6f' },
]


export const moodBranches: Record<MoodKey, MoodBranch> = {
  happy: {
    key: 'happy',
    pages: [
      {
        title: 'T11111ท้องฟ้าที่คุณเลือกมามีความอบอุ่มมากเลยต',
        message: "1ท้องฟ้าที่คุณเลือกมามีความอบอุ่มมากเลยต",
        suggestion: 'หห.',
        background: '/background/intro/happy.PNG',
        sound: '',
      },
      {
        title: '2หหu',
        message: "2ท้องฟ้าที่คุณเลือกมามีความอบอุ่มมากเลยต.",
        suggestion: 'ท้องฟ้าที่คุณเลือกมามีความอบอุ่มมากเลยต',
        background: '/background/mood-checkin/happy.PNG',
        sound: '',
      },
      {
        title: '3ท้องฟ้าที่คุณเลือกมามีความอบอุ่มมากเลยต',
        message: "3ท้องฟ้าที่คุณเลือกมามีความอบอุ่มมากเลยต",
        suggestion: 'ท้องฟ้าที่คุณเลือกมามีความอบอุ่มมากเลยต',
        background: '/background/mood-checkin/happy.PNG',
        sound: '',
      },
    ],
  },
  neutral: {
    key: 'neutral',
    pages: [
      {
        title: '1เฉยๆก็ดีๆๆ',
        message:
          '1เฉยๆก็ดีๆๆ',
        suggestion: 'เฉยๆก็ดีๆๆ.',
        background: '/background/mood-checkin/sad2.PNG',
        // backgroundColor: '#2f4a55',
        sound: '',
      },
      {
        title: '2 เฉยๆก็ดีๆๆ',
        message:
          '2',
        suggestion: 'เฉยๆก็ดีๆๆ',
        background: '/background/mood-checkin/sad2.PNG',
        // backgroundColor: '#2f4a55',
        sound: '',
      },
      {
        title: 'Steady is okay too',
        message:
          '3Not every day needs a headline. Neutral is a resting place, and rest is allowed.',
        suggestion: 'Take one slow breath and notice one small, ordinary thing you appreciate right now.',
        background: '/background/mood-checkin/sad2.PNG',
        // backgroundColor: '#2f4a55',
        sound: '',
      },
    ],
  },
  sad: {
    key: 'sad',
    pages: [
      {
        title: "1sad111111111e",
        message:
          '1Sadness is heavy SADDDDDD',
        suggestion: 'SADDDDDDDDDfuhsdofjvfncnkvpwsflk,',
        background: '/background/mood-checkin/sad2.PNG',
        // backgroundColor: '#243a5a',
        sound: '',
      },
      {
        title: "2I'm glad you told me",
        message:
          '2Sadness is heavy, and you carried it here anyway. You do not have to fix it right now — just be with it gently.',
        suggestion: 'Place a hand on your chest and let yourself feel it for a moment. You are not alone in this.',
        background: '/background/mood-checkin/sad2.PNG',
        // backgroundColor: '#243a5a',
        sound: '',
      },
      {
        title: "I'm glad you told me",
        message:
          '3Sadness is heavy, and you carried it here anyway. You do not have to fix it right now — just be with it gently.',
        suggestion: 'Place a hand on your chest and let yourself feel it for a moment. You are not alone in this.',
        background: '/public/background/intro/01.PNG',
        // backgroundColor: '#243a5a',
        sound: '',
      },
    ],
  },
  overwhelmed: {
    key: 'overwhelmed',
    pages: [
      {
        title: "overwhelmed",
        message:
          '1overwhelmed111111 too mu.',
        suggestion: 'Breathe in overwhelmed',
        background: '/public/background/intro/background%203.PNG',
        // backgroundColor: '#4a2f3f',
        sound: '',
      },
      {
        title: "Let's make the world smaller",
        message:
          '2When everything feels like too much, we only need the very next breath. Nothing else has to be solved this second.',
        suggestion: 'Breathe in for four counts, hold for four, out for four. Just once. Then again if it helps.',
        background: '/public/background/intro/background%203.PNG',
        // backgroundColor: '#4a2f3f',
        sound: '',
      },
      {
        title: "Let's make the world smaller",
        message:
          '3When everything feels like too much, we only need the very next breath. Nothing else has to be solved this second.',
        suggestion: 'Breathe in for four counts, hold for four, out for four. Just once. Then again if it helps.',
        background: '/public/background/intro/background%203.PNG',
        // backgroundColor: '#4a2f3f',
        sound: '',
      },
    ],
  },
}
