// Mood check-in: one branching question that leads to one of four mood paths.
// The "sad" path additionally branches into an A/B choice partway through,
// then converges back into a shared ending.

export type MoodKey = 'happy' | 'neutral' | 'sad' | 'overwhelmed'

export interface MoodOption {
  key: MoodKey
  label: string
  /** Background image for the option chip. */
  background: string
}

export interface MoodTapPage {
  navigation: 'tap-anywhere'
  text: string
  id: string
  background: string
  sound: string
  flashTransition?: 'black' | 'white'
  decorationFrames?: string
}

// Text-input page: shows an input + an explicit "continue" button
export interface MoodInputPage {
  navigation: 'button'
  text: string
  id: string
  background: string
  sound: string
  placeholder: string
  buttonLabel?: string
  flashTransition?: 'black' | 'white'
  decorationFrames?: string
}

export interface MoodChoice {
  label: string
  nextPages: MoodPage[]
}

// Choice page: shows option buttons
export interface MoodChoicePage {
  navigation: 'button'
  text: string
  id: string
  background: string
  sound: string
  flashTransition?: 'black' | 'white'
  choices: MoodChoice[]
  decorationFrames?: string
}

export type MoodPage = MoodTapPage | MoodInputPage | MoodChoicePage

export interface MoodBranch {
  key: MoodKey
  pages: MoodPage[]
  convergePages?: MoodPage[]
}

export const moodIntro: MoodTapPage = {
  id: 'mood-intro',
  navigation: 'tap-anywhere',
  text: 'ถ้าตอนนี้ท้งฟ้ากำลังสะท้อนอารมณ์ในจิตใจของคุณ ท้องฟ้าของคุณในตอนนี้เป็นยังไงกันเหรอ',
  background: '/background/intro/02.PNG',
  sound: '/audio/interactive-project.mp3',
}

export const moodOptions: MoodOption[] = [
  { key: 'happy', label: 'มีความสุข', background: '/background/mood-checkin/happy.webp' },
  { key: 'neutral', label: 'เฉยๆ', background: '/background/mood-checkin/normal.webp' },
  { key: 'sad', label: 'เศร้า เสียใจ', background: '/background/mood-checkin/sad1.webp' },
  { key: 'overwhelmed', label: 'หงุดหงิด', background: '/background/mood-checkin/anger1.webp' },
]

export const moodQuestion: MoodChoicePage = {
  id: 'mood-question',
  navigation: 'button',
  text: 'เลือกท้องฟ้าที่ตรงกับความรู้สึกของคุณตอนนี้ดูสิ',
  background: '/background/intro/02.PNG',
  sound: '/audio/interactive-project.mp3',
  choices: [],
  flashTransition: 'black',
}

// Value used by the "question" screen(s) in page.tsx — an ordered list of
// tap-anywhere intro pages shown before the mood-selection screen.
export const MoodPageData = {
  pages: [moodIntro] as MoodTapPage[],
}

export const moodBranches: Record<MoodKey, MoodBranch> = {
  happy: {
    key: 'happy',
    pages: [
      {
        id: 'happy-1',
        navigation: 'tap-anywhere',
        text: 'ท้องฟ้าที่คุณเลือกมามีความอบอุ่นมากเลยนะ\nให้ความอบอุ่นนี้อยู่กับคุณไปตลอดวันนะ',
        background: '/background/mood-checkin/happy.webp',
        sound: '/audio/interactive-project.mp3',
      },
      {
        id: 'happy-2',
        navigation: 'tap-anywhere',
        text: 'ท้องฟ้าที่คุณเลือกมาช่างดูอบอุ่นมากเลยนะ\nลองนึกถึงสิ่งเล็กๆ ที่ทำให้คุณมีความสุขวันนี้ดูสิ',
        background: '/background/mood-checkin/happy.webp',
        sound: '/audio/interactive-project.mp3',
      },
      {
        id: 'happy-3',
        navigation: 'button',
        text: 'ลองเล่าให้ฟังหน่อยได้ไหมว่าอะไรทำให้ท้องฟ้าของคุณสดใส\nอยากจดจำความรู้สึกดีๆ แบบนี้ไว้นะ',
        background: '/background/mood-checkin/happy.webp',
        sound: '/audio/interactive-project.mp3',
        placeholder: 'Type it out',
        buttonLabel: 'Let it drift',
      },
    ],
  },
  neutral: {
    key: 'neutral',
    pages: [
      {
        id: 'neutral-1',
        navigation: 'tap-anywhere',
        text: 'โอ้ ท้องฟ้าของคุณช่างดูสงบเงียบจริงๆ เห็นแล้วรู้สึกสงบดีจัง\nไม่ใช่ทุกวันต้องมีเรื่องราวเด่นเสมอไป เฉยๆ ก็เป็นที่พักได้เหมือนกัน',
        background: '/background/mood-checkin/normal.webp',
        sound: '/audio/interactive-project.mp3',
      },
      {
        id: 'neutral-2',
        navigation: 'button',
        text: 'สงสัยจังเลยว่าชีวิตในช่วงสัปดาห์ที่ผ่านมาเป็นยังไงบ้าง\nลองเล่าให้ฟังหน่อยสิ',
        background: '/background/mood-checkin/normal.webp',
        sound: '/audio/interactive-project.mp3',
        placeholder: 'Type it out',
        buttonLabel: 'Let it drift',
      },
      {
        id: 'neutral-3',
        navigation: 'button',
        text: 'ในวันที่โลกหมุนไวเกินไป อยากให้คุณลองก้าวให้ช้าลงหน่อย แล้วค่อยๆ จดจำ ซึมซับความสุขที่เกิดกับคุณ\nไหนคุณลองเล่าให้เราฟังหน่อย ช่วงนี้ความสุขของคุณมาจากอะไรบ้างนะ',
        background: '/background/mood-checkin/normal.webp',
        sound: '/audio/interactive-project.mp3',
        placeholder: 'Type it out',
        buttonLabel: 'Let it drift',
      },
    ],
  },
  sad: {
    key: 'sad',
    pages: [
      {
        id: 'sad-1',
        navigation: 'button',
        text: 'ท่ามกลางบรรยากาศที่เงียบงัน สัมผัสได้ถึงกลิ่นอายของความเศร้า คล้ายกับว่าตอนนี้พยากรณ์อากาศในใจของคุณกำลังมีฝนตกหนักอยู่ใช่ไหม\nลองเล่าให้เราฟังหน่อยได้ไหม',
        background: '/background/mood-checkin/sad1.webp',
        sound: '/audio/interactive-project.mp3',
        placeholder: 'Type it out',
        buttonLabel: 'Let it drift',
      },
      {
        id: 'sad-2',
        navigation: 'button',
        text: 'อะไรเป็นสาเหตุของปรากฏการณ์ที่เกิดขึ้นในครั้งนี้หรอ\nลองเล่าให้ฟังหน่อยนะ',
        background: '/background/mood-checkin/sad1.webp',
        sound: '/audio/interactive-project.mp3',
        placeholder: 'Type it out',
        buttonLabel: 'Let it drift',
      },
      {
        id: 'sad-paperplane-1',
        navigation: 'tap-anywhere',
        text: '{text-sad-2}',
        background: '/background/mood-checkin/sad1.webp',
        sound: '/audio/interactive-project.mp3',
        decorationFrames: '/background/mood-checkin/paperplane1.webp',
      },
      {
        id: 'sad-paperplane-2',
        navigation: 'tap-anywhere',
        text: '',
        background: '/background/mood-checkin/sad1.webp',
        sound: '/audio/interactive-project.mp3',
        decorationFrames: '/background/mood-checkin/paperplane2.webp',
      },
      {
        id: 'sad-paperplane-3',
        navigation: 'tap-anywhere',
        text: '',
        background: '/background/mood-checkin/sad1.webp',
        sound: '/audio/interactive-project.mp3',
        decorationFrames: '/background/mood-checkin/paperplane3.webp',
      },
      {
        id: 'sad-paperplane-4',
        navigation: 'tap-anywhere',
        text: '',
        background: '/background/mood-checkin/sad1.webp',
        sound: '/audio/interactive-project.mp3',
        decorationFrames: '/background/mood-checkin/paperplane4.webp',
      },
      {
        id: 'sad-3',
        navigation: 'button',
        text: 'ที่ผ่านเรื่องราวนี้มาได้ คุณอยากโยนเหตุการณ์นี้ทิ้งไปไหม',
        background: '/background/mood-checkin/sad1.webp',
        sound: '/audio/interactive-project.mp3',
        choices: [
          {
            label: 'โยน',
            nextPages: [
              {
                id: 'sad-throw-1',
                navigation: 'tap-anywhere',
                text: 'ตอนนี้ความทุกข์ของคุณได้โยนบินไปไกลเกินกว่าจะมองเห็นแล้วนะ',
                background: '/background/mood-checkin/sad2.webp',
                sound: '/audio/interactive-project.mp3',
              },
            ],
          },
          {
            label: 'ไม่โยน',
            nextPages: [
              {
                id: 'sad-keep-1',
                navigation: 'tap-anywhere',
                text: 'ไม่เป็นไรนะที่จะเสียใจ แต่อย่าให้ความเศร้ากลบแสงสว่างในตัวคุณ ให้เรื่องนี้เป็นประสบการณ์ที่จะทำให้คุณเติบโตขึ้นนะ',
                background: '/background/mood-checkin/sad1.webp',
                sound: '/audio/interactive-project.mp3',
              },
            ],
          },
        ],
      },
    ],
    convergePages: [
      {
        id: 'sad-converge-1',
        navigation: 'button',
        text: 'คุณยังจำเรื่องราวที่ทำให้ท้องฟ้าของคุณสดใสได้ไหม เล่าให้ฟังหน่อยสิ',
        background: '/background/mood-checkin/sad2.webp',
        sound: '/audio/interactive-project.mp3',
        placeholder: 'Type it out',
        buttonLabel: 'Let it drift',
      },
      {
        id: 'sad-converge-2',
        navigation: 'tap-anywhere',
        text: 'ความสุขเหล่านั้นมันไม่ได้หายไปไหนนะ ในวันที่เธอเศร้าเสียใจ อย่าลืมโอบกอดตัวเองไว้ในวันที่มีแค่ตัวเอง แล้วก็ให้รู้ว่ารอยแผลในวันนี้คือบทเรียนที่ทำให้คุณเติบโตขึ้น',
        background: '/background/mood-checkin/sad2.webp',
        sound: '/audio/interactive-project.mp3',
      },
    ],
  },
  overwhelmed: {
    key: 'overwhelmed',
    pages: [
      {
        id: 'overwhelmed-1',
        navigation: 'tap-anywhere',
        text: 'ตอนนี้คุณอยู่ท่ามกลางพายุโหม พร้อมฟ้าผ่ามากมาย',
        background: '/background/mood-checkin/anger1.webp',
        sound: '/audio/interactive-project.mp3',
      },
      {
        id: 'overwhelmed-2',
        navigation: 'button',
        text: 'ตอนนี้มีเรื่องอะไรที่ทำให้คุณไม่สบายใจ ที่ทำให้ท้องฟ้าของคุณเป็นแบบนี้หรอ\nลองเล่าให้ฟังหน่อย',
        background: '/background/mood-checkin/anger1.webp',
        sound: '/audio/interactive-project.mp3',
        placeholder: 'Type it out',
        buttonLabel: 'Let it drift',
      },
      {
        id: 'overwhelmed-3',
        navigation: 'tap-anywhere',
        text: 'คุณคงจะรู้สึกอารมณ์ไม่ดีกับเหตุการณ์ที่เกิดขึ้นมากๆ เลยสินะ',
        background: '/background/mood-checkin/anger1.webp',
        sound: '/audio/interactive-project.mp3',
      },
      {
        id: 'overwhelmed-3',
        navigation: 'tap-anywhere',
        text: 'ไม่เป็นไรนะถ้าวันนี้จะไม่ได้ตั้งใจ เพราะในความไม่สมบูรณ์แบบนั้น คุณก็ได้เติบโตขึ้นอีกขั้นหนึ่งแล้ว',
        background: '/background/mood-checkin/anger1.webp',
        sound: '/audio/interactive-project.mp3',
      },
      {
        id: 'overwhelmed-4',
        navigation: 'button',
        text: 'แล้วถ้าพายุผ่านไปแล้ว คุณอยากจะทำอะไรต่อไป',
        background: '/background/mood-checkin/anger2.webp',
        sound: '/audio/interactive-project.mp3',
        placeholder: 'Type it out',
        buttonLabel: 'Let it drift',
      },
      {
        id: 'overwhelmed-5',
        navigation: 'tap-anywhere',
        text: 'ไม่ว่าตอนนี้จะเป็นยังไง ยังมีแสงแดดของวันที่สดใสรออยู่ข้างหน้านะ',
        background: '/background/mood-checkin/normal.webp',
        sound: '/audio/interactive-project.mp3',
      },
    ],
  },
}