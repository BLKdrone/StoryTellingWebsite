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
  text?: string
  id: string
  background: string
  sound: string
  flashTransition?: 'black' | 'white'
  decorationFrames?: string
}

// Text-input page: shows an input + an explicit "continue" button
export interface MoodInputPage {
  navigation: 'button'
  text?: string
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
  text?: string
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
  text: `ถ้าตอนนี้ท้องฟ้ากำลังสะท้อนอารมณ์ในจิตใจของคุณ`,
  background: '/background/intro/02.PNG',
  sound: '/audio/score for interactive project.mp3',
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
  sound: '/audio/score for interactive project.mp3',
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
        text: 'ท้องฟ้าที่คุณเลือกมามีความอบอุ่นมากเลยนะ',
        background: '/background/mood-checkin/happy.webp',
        sound: '/audio/score for interactive project.mp3',
      },
      {
        id: 'happy-2',
        navigation: 'button',
        text: 'ลองเล่าให้ฟังหน่อยได้ไหมว่าอะไรทำให้\nท้องฟ้าของคุณสดใส',
        background: '/background/mood-checkin/happy.webp',
        sound: '/audio/score for interactive project.mp3',
        placeholder: 'เธอลองใช้เวลาค่อย ๆ คิดสิ',
        buttonLabel: 'ไปต่อ',
      },
      {
        id: 'happy-3',
        navigation: 'tap-anywhere',
        text: 'อยากให้คุณจดจำช่วงเวลาดีๆของตัวเอง\nไว้ในใจเสมอนะ',
        background: '/background/mood-checkin/happy.webp',
        sound: '/audio/score for interactive project.mp3',
      },
      {
        id: 'happy-4',
        navigation: 'tap-anywhere',
        text: 'ให้ความทรงจำนี้ช่วยโอบกอด\nและเป็นรอยยิ้มเล็กๆ ให้คุณเอง',
        background: '/background/mood-checkin/happy.webp',
        sound: '/audio/score for interactive project.mp3',
      },
      {
        id: 'happyjump',
        navigation: 'tap-anywhere',
        text: 'วันไหนที่เหนื่อยหรือรู้สึกแย่ลองนึกถึงมันดู',
        background: '/background/mood-checkin/happy.webp',
        sound: '/audio/score for interactive project.mp3',
      },
      {
        id: 'happybig',
        navigation: 'tap-anywhere',
        text: 'ถ้าวาฬนี้คือระดับความสุขของเธอ\nวาฬตัวนี้จะตัวใหญ่แค่ไหนกันนะ',
        background: '/background/mood-checkin/happy.webp',
        sound: '/audio/score for interactive project.mp3',
      },
    ],
  },
  neutral: {
    key: 'neutral',
    pages: [
      {
        id: 'neutral-1',
        navigation: 'tap-anywhere',
        text: 'โอ้ ท้องฟ้าของคุณช่างดูสงบเงียบจริงๆ\nเห็นแล้วรู้สึกสงบดีจัง',
        background: '/background/mood-checkin/normal.webp',
        sound: '/audio/score for interactive project.mp3',
      },
      {
        id: 'neutral-2',
        navigation: 'button',
        text: 'สงสัยจังเลยว่าชีวิตในช่วงสัปดาห์\nที่ผ่านมาเป็นยังไงบ้าง',
        background: '/background/mood-checkin/normal.webp',
        sound: '/audio/score for interactive project.mp3',
        placeholder: 'เธอลองใช้เวลาค่อย ๆ คิดสิ',
        buttonLabel: 'ไปต่อ',
      },
      {
        id: 'neutral-3',
        navigation: 'tap-anywhere',
        text: 'ในวันที่โลกหมุนไวเกินไป\nอยากให้คุณลองก้าวให้ช้าลงหน่อย\nแล้วค่อยๆจดจำ\nซึมซับความสุขที่เกิดกับคุณ',
        background: '/background/mood-checkin/normal.webp',
        sound: '/audio/score for interactive project.mp3',
      },
      {
        id: 'neutral-4',
        navigation: 'button',
        text: 'ไหนคุณลองเล่าให้เราฟังหน่อย\nช่วงนี้ความสุขของคุณมาจากอะไรบ้างนะ',
        background: '/background/mood-checkin/normal.webp',
        sound: '/audio/score for interactive project.mp3',
        placeholder: 'เธอลองใช้เวลาค่อย ๆ คิดสิ',
        buttonLabel: 'ไปต่อ',
      },
      {
        id: 'neutral-5',
        navigation: 'tap-anywhere',
        text: 'ในวันที่เรารู้สึกสงบ หรือเฉยชากับทุกสิ่ง\nอย่าปล่อยให้ความทรงจำดีๆ\nความสุขหล่นหายไปตามทางนะ',
        background: '/background/mood-checkin/normal.webp',
        sound: '/audio/score for interactive project.mp3',
      },
      {
        id: 'neutral-6',
        navigation: 'tap-anywhere',
        text: 'ขอให้ความสุขของคุณอยู่เคียงข้างคุณตลอดไป',
        background: '/background/mood-checkin/normal.webp',
        sound: '/audio/score for interactive project.mp3',
      },
    ],
  },
  sad: {
    key: 'sad',
    pages: [
      {
        id: 'sad-1',
        navigation: 'tap-anywhere',
        text: 'ท่ามกลางบรรยากาศที่เงียบงัน\nสัมผัสได้ถึงกลิ่นอายของความเศร้า',
        background: '/background/mood-checkin/sad1.webp',
        sound: '/audio/rain.mp3',
      },
      {
        id: 'sad-2',
        navigation: 'button',
        text: 'คล้ายกับว่าตอนนี้พยากรณ์อากาศในใจ\nของคุณกำลังมีฝนตกหนักอยู่ใช่ไหม\nลองเล่าให้เราฟังหน่อยได้ไหม',
        background: '/background/mood-checkin/sad1.webp',
        sound: '/audio/rain.mp3',
        placeholder: 'เธอลองใช้เวลาค่อย ๆ คิดสิ',
        buttonLabel: 'ไปต่อ',
      },
      {
        id: 'sad-3',
        navigation: 'button',
        text: 'อะไรเป็นสาเหตุของปรากฏการณ์\nที่เกิดขึ้นในครั้งนี้เหรอ\nลองเล่าให้ฟังหน่อยนะ',
        background: '/background/mood-checkin/sad1.webp',
        sound: '/audio/rain.mp3',
        placeholder: 'เธอลองใช้เวลาค่อย ๆ คิดสิ',
        buttonLabel: 'ไปต่อ',
      },
      {
        id: 'sad-paperplane-1',
        navigation: 'tap-anywhere',
        text: '{text-sad-2}',
        background: '/background/mood-checkin/sad1.webp',
        sound: '/audio/rain.mp3',
        decorationFrames: '/background/mood-checkin/paperplane1.webp',
      },
      {
        id: 'sad-paperplane-2',
        navigation: 'tap-anywhere',
        text: '',
        background: '/background/mood-checkin/sad1.webp',
        sound: '/audio/rain.mp3',
        decorationFrames: '/background/mood-checkin/paperplane2.webp',
      },
      {
        id: 'sad-paperplane-3',
        navigation: 'tap-anywhere',
        text: '',
        background: '/background/mood-checkin/sad1.webp',
        sound: '/audio/rain.mp3',
        decorationFrames: '/background/mood-checkin/paperplane3.webp',
      },
      {
        id: 'sad-paperplane-4',
        navigation: 'tap-anywhere',
        text: '',
        background: '/background/mood-checkin/sad1.webp',
        sound: '/audio/rain.mp3',
        decorationFrames: '/background/mood-checkin/paperplane4.webp',
      },
      {
        id: 'sad-4',
        navigation: 'button',
        text: 'คุณเก่งมากนะ ที่ผ่านเรื่องราวนี้มาได้\nคุณอยากโยนเหตุการณ์นี้ทิ้งไปไหม',
        background: '/background/mood-checkin/sad1.webp',
        sound: '/audio/score for interactive project.mp3',
        choices: [
          {
            label: 'โยน',
            nextPages: [
              {
                id: 'sad-throw-1',
                navigation: 'tap-anywhere',
                text: 'ตอนนี้ความทุกข์ของคุณได้โยนบินไปไกล\nเกินกว่าจะมองเห็นแล้วนะ',
                background: '/background/mood-checkin/sad2.webp',
                sound: '/audio/score for interactive project.mp3',
                decorationFrames: '/background/mood-checkin/paperplane4.webp',
              },
            ],
          },
          {
            label: 'ไม่โยน',
            nextPages: [
              {
                id: 'sad-keep-1',
                navigation: 'tap-anywhere',
                text: 'ไม่เป็นไรนะที่จะเสียใจ\nแต่อย่าให้ความเศร้า\nกลบแสงสว่างในตัวคุณ\nให้เรื่องนี้เป็นประสบการณ์ที่จะ\nทำให้คุณเติบโตขึ้นนะ',
                background: '/background/mood-checkin/sad1.webp',
                sound: '/audio/score for interactive project.mp3',
              },
            ],
          },
        ],
      },

    ],
    convergePages: [
      {
        id: 'sad-converge-1',
        navigation: 'tap-anywhere',
        text: 'แล้ว...',
        background: '/background/mood-checkin/sad2.webp',
        sound: '/audio/score for interactive project.mp3',
      },
      {
        id: 'sad-converge-2',
        navigation: 'button',
        text: 'คุณยังจำเรื่องราวที่ทำให้ท้องฟ้าของคุณ\nสดใสได้ไหม เล่าให้ฟังหน่อยสิ',
        background: '/background/mood-checkin/normal.webp',
        sound: '/audio/score for interactive project.mp3',
        placeholder: 'เธอลองใช้เวลาค่อย ๆ คิดสิ',
        buttonLabel: 'ไปต่อ',
      },
      {
        id: 'sad-converge-3',
        navigation: 'tap-anywhere',
        text: 'ความสุขเหล่านั้นมันไม่ได้หายไปไหนนะ\nในวันที่เธอเศร้าเสียใจ',
        background: '/background/mood-checkin/normal.webp',
        sound: '/audio/score for interactive project.mp3',
      },
      {
        id: 'sad-converge-4',
        navigation: 'tap-anywhere',
        text: 'อย่าลืมโอบกอดตัวเองไว้ในวันที่มีแค่ตัวเอง\nแล้วก็ให้รู้ว่ารอยแผลในวันนี้คือ\nวิชาที่ทำให้คุณเติบโตขึ้น',
        background: '/background/mood-checkin/normal.webp',
        sound: '/audio/score for interactive project.mp3',
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
        sound: '/audio/storm.mp3',
      },
      {
        id: 'overwhelmed-2',
        navigation: 'button',
        text: 'ตอนนี้มีเรื่องอะไรที่ทำให้คุณไม่สบายใจ\nที่ทำให้ท้องฟ้าของคุณเป็นแบบนี้เหรอ\nลองเล่าให้ฟังหน่อย',
        background: '/background/mood-checkin/anger1.webp',
        sound: '/audio/storm.mp3',
        placeholder: 'เธอลองใช้เวลาค่อย ๆ คิดสิ',
        buttonLabel: 'ไปต่อ',
      },
      {
        id: 'overwhelmed-3',
        navigation: 'tap-anywhere',
        text: 'คุณคงจะรู้สึกอารมณ์ไม่ดีกับเหตุการณ์\nที่เกิดขึ้นมากๆ เลยสินะ',
        background: '/background/mood-checkin/anger1.webp',
        sound: '/audio/storm.mp3',
      },
      {
        id: 'overwhelmed-4',
        navigation: 'tap-anywhere',
        text: 'ไม่เป็นไรนะถ้าวันนี้จะไม่ได้ตั้งใจ\nเพราะในความไม่สมบูรณ์แบบนั้น\nคุณก็ได้เติบโตขึ้นอีกขั้นหนึ่งแล้ว',
        background: '/background/mood-checkin/anger1.webp',
        sound: '/audio/storm.mp3',
      },
      {
        id: 'overwhelmedstorm',
        navigation: 'button',
        text: 'แล้วถ้าพายุผ่านไปแล้ว คุณอยากจะทำอะไรต่อไป',
        background: '/background/mood-checkin/normal.webp',
        sound: '/audio/score for interactive project.mp3',
        placeholder: 'เธอลองใช้เวลาค่อย ๆ คิดสิ',
        buttonLabel: 'ไปต่อ',
      },
      {
        id: 'overwhelmed-5',
        navigation: 'tap-anywhere',
        text: 'ไม่ว่าตอนนี้จะเป็นยังไง\nยังมีแสงแดดของวันที่สดใส\nรออยู่ข้างหน้านะ',
        background: '/background/mood-checkin/normal.webp',
        sound: '/audio/score for interactive project.mp3',
      },
    ],
  },
}