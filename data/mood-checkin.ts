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

export interface MoodChoice {
  /** Text shown on the choice button. */
  label: string
  /** The page(s) shown after this choice is picked, before converging back. */
  nextPages: MoodPage[]
}

interface MoodPageBase {
  id: string
  /** Real background image, supplied later. */
  background: string
  /** Sound file, supplied later. */
  sound: string
  /** ถ้ามีค่า จะแฟลชสีนี้ตอนเปลี่ยนมาหน้านี้ ถ้าไม่ใส่ = ไม่มีทรานซิชัน */
  flashTransition?: 'black' | 'white'
}

export interface MoodTapPage extends MoodPageBase {
  navigation: 'tap-anywhere'
  text: string
}

export interface MoodChoicePage extends MoodPageBase {
  navigation: 'button'
  text: string
  choices: MoodChoice[]
}

export type MoodPage = MoodTapPage | MoodChoicePage

export interface MoodBranch {
  key: MoodKey
  pages: MoodPage[]
  /**
   * Shared ending pages played after a choice's nextPages finish.
   * Only used by branches that contain a choice page (currently: sad).
   */
  convergePages?: MoodPage[]
}

export const moodIntro = {
  id: 'mood-intro',
  navigation: 'tap-anywhere' as const,
  pages: [
    { text: 'ถ้าตอนนี้ท้องฟ้ากำลังสะท้อนอารมณ์ในจิตใจของคุณ ท้องฟ้าของคุณในตอนนี้เป็นยังไงกันหรอ' },
    { text: 'เลือกท้องฟ้าที่ตรงกับความรู้สึกของคุณตอนนี้ดูสิ' },
  ],
  background: '/background/intro/02.PNG',
  sound: '',
}

export const moodOptions: MoodOption[] = [
  { key: 'happy', label: 'มีความสุข', background: '/background/mood-checkin/2.PNG' },
  { key: 'neutral', label: 'เฉยๆ', background: '/background/mood-checkin/2.PNG' },
  { key: 'sad', label: 'เศร้า เสียใจ', background: '/background/mood-checkin/2.PNG' },
  { key: 'overwhelmed', label: 'หงุดหงิด', background: '/background/mood-checkin/2.PNG' },
]

export const moodQuestion = {
  id: 'mood-question',
  navigation: 'button' as const,
  text: 'เลือกท้องฟ้าที่ตรงกับความรู้สึกของคุณตอนนี้ดูสิ',
  background: '/background/intro/02.PNG',
  options: moodOptions,
  sound: '',
}

export const moodBranches: Record<MoodKey, MoodBranch> = {
  happy: {
    key: 'happy',
    pages: [
      {
        id: 'happy-1',
        navigation: 'tap-anywhere',
        text: 'ท้องฟ้าสดใส\nท้องฟ้าที่คุณเลือกมามีความอบอุ่นมากเลยนะ\nให้ความอบอุ่นนี้อยู่กับคุณไปตลอดวันนะ',
        background: '/background/mood-checkin/happy.PNG',
        sound: '',
      },
      {
        id: 'happy-2',
        navigation: 'tap-anywhere',
        text: 'ความสุขเล็กๆ\nท้องฟ้าที่คุณเลือกมาช่างดูอบอุ่นมากเลยนะ\nลองนึกถึงสิ่งเล็กๆ ที่ทำให้คุณมีความสุขวันนี้ดูสิ',
        background: '/background/mood-checkin/happy.PNG',
        sound: '',
      },
      {
        id: 'happy-3',
        navigation: 'tap-anywhere',
        text: 'เล่าให้ฟังหน่อยได้ไหม\nลองเล่าให้ฟังหน่อยได้ไหมว่าอะไรทำให้ท้องฟ้าของคุณสดใส\nอยากจดจำความรู้สึกดีๆ แบบนี้ไว้นะ',
        background: '/background/mood-checkin/happy.PNG',
        sound: '',
      },
    ],
  },
  neutral: {
    key: 'neutral',
    pages: [
      {
        id: 'neutral-1',
        navigation: 'tap-anywhere',
        text: 'ท้องฟ้าสงบ\nโอ้ ท้องฟ้าของคุณช่างดูสงบเงียบจริงๆ เห็นแล้วรู้สึกสงบดีจัง\nไม่ใช่ทุกวันต้องมีเรื่องราวเด่นเสมอไป เฉยๆ ก็เป็นที่พักได้เหมือนกัน',
        background: '/background/mood-checkin/neutral.PNG',
        sound: '',
      },
      {
        id: 'neutral-2',
        navigation: 'tap-anywhere',
        text: 'ช่วงนี้เป็นไงบ้าง\nสงสัยจังเลยว่าชีวิตในช่วงสัปดาห์ที่ผ่านมาเป็นยังไงบ้าง\nลองเล่าให้ฟังหน่อยสิ',
        background: '/background/mood-checkin/neutral.PNG',
        sound: '',
      },
      {
        id: 'neutral-3',
        navigation: 'tap-anywhere',
        text: 'ช้าลงหน่อยนะ\nในวันที่โลกหมุนไวเกินไป อยากให้คุณลองก้าวให้ช้าลงหน่อย แล้วค่อยๆ จดจำ ซึมซับความสุขที่เกิดกับคุณ\nไหนคุณลองเล่าให้เราฟังหน่อย ช่วงนี้ความสุขของคุณมาจากอะไรบ้างนะ',
        background: '/background/mood-checkin/neutral.PNG',
        sound: '',
      },
    ],
  },
  sad: {
    key: 'sad',
    pages: [
      {
        id: 'sad-1',
        navigation: 'tap-anywhere',
        text: 'ท้องฟ้าครึ้มฝน\nท่ามกลางบรรยากาศที่เงียบงัน สัมผัสได้ถึงกลิ่นอายของความเศร้า คล้ายกับว่าตอนนี้พยากรณ์อากาศในใจของคุณกำลังมีฝนตกหนักอยู่ใช่ไหม\nลองเล่าให้เราฟังหน่อยได้ไหม',
        background: '/background/mood-checkin/rain.PNG',
        sound: '',
      },
      {
        id: 'sad-2',
        navigation: 'tap-anywhere',
        text: 'อะไรเป็นสาเหตุ\nอะไรเป็นสาเหตุของปรากฏการณ์ที่เกิดขึ้นในครั้งนี้หรอ\nลองเล่าให้ฟังหน่อยนะ',
        background: '/background/mood-checkin/rain.PNG',
        sound: '',
      },
      {
        id: 'sad-3',
        navigation: 'button',
        text: 'คุณเก่งมากนะ\nคุณเก่งมากนะ ที่ผ่านเรื่องราวนี้มาได้ คุณอยากโยนเหตุการณ์นี้ทิ้งไปไหม',
        background: '/background/mood-checkin/rain.PNG',
        sound: '',
        choices: [
          {
            label: 'โยน',
            nextPages: [
              {
                id: 'sad-throw-1',
                navigation: 'tap-anywhere',
                text: 'ปล่อยไปให้ไกล\nตอนนี้ความทุกข์ของคุณได้โยนบินไปไกลเกินกว่าจะมองเห็นแล้วนะ',
                background: '/background/mood-checkin/rain-clearing.PNG',
                sound: '',
              },
            ],
          },
          {
            label: 'ไม่โยน',
            nextPages: [
              {
                id: 'sad-keep-1',
                navigation: 'tap-anywhere',
                text: 'ไม่เป็นไรนะ\nไม่เป็นไรนะที่จะเสียใจ แต่อย่าให้ความเศร้ากลบแสงสว่างในตัวคุณ ให้เรื่องนี้เป็นประสบการณ์ที่จะทำให้คุณเติบโตขึ้นนะ',
                background: '/background/mood-checkin/rain.PNG',
                sound: '',
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
        text: 'ยังจำได้ไหม\nคุณยังจำเรื่องราวที่ทำให้ท้องฟ้าของคุณสดใสได้ไหม เล่าให้ฟังหน่อยสิ',
        background: '/background/mood-checkin/sad2.PNG',
        sound: '',
      },
      {
        id: 'sad-converge-2',
        navigation: 'tap-anywhere',
        text: 'ความสุขไม่ได้หายไปไหน\nความสุขเหล่านั้นมันไม่ได้หายไปไหนนะ ในวันที่เธอเศร้าเสียใจ อย่าลืมโอบกอดตัวเองไว้ในวันที่มีแค่ตัวเอง แล้วก็ให้รู้ว่ารอยแผลในวันนี้คือบทเรียนที่ทำให้คุณเติบโตขึ้น',
        background: '/background/mood-checkin/sad2.PNG',
        sound: '',
      },
    ],
  },
  overwhelmed: {
    key: 'overwhelmed',
    pages: [
      {
        id: 'overwhelmed-1',
        navigation: 'tap-anywhere',
        text: 'พายุโหมกระหน่ำ\nตอนนี้คุณอยู่ท่ามกลางพายุโหม พร้อมฟ้าผ่ามากมาย',
        background: '/background/mood-checkin/storm.PNG',
        sound: '',
      },
      {
        id: 'overwhelmed-2',
        navigation: 'tap-anywhere',
        text: 'อะไรทำให้ไม่สบายใจ\nตอนนี้มีเรื่องอะไรที่ทำให้คุณไม่สบายใจ ที่ทำให้ท้องฟ้าของคุณเป็นแบบนี้หรอ\nลองเล่าให้ฟังหน่อย',
        background: '/background/mood-checkin/storm.PNG',
        sound: '',
      },
      {
        id: 'overwhelmed-3',
        navigation: 'tap-anywhere',
        text: 'คงจะรู้สึกอารมณ์ไม่ดี\nคุณคงจะรู้สึกอารมณ์ไม่ดีกับเหตุการณ์ที่เกิดขึ้นมากๆ เลยสินะ\nไม่เป็นไรนะถ้าวันนี้จะไม่ได้ตั้งใจ เพราะในความไม่สมบูรณ์แบบนั้น คุณก็ได้เติบโตขึ้นอีกขั้นหนึ่งแล้ว',
        background: '/background/mood-checkin/storm.PNG',
        sound: '',
      },
      {
        id: 'overwhelmed-4',
        navigation: 'tap-anywhere',
        text: 'พายุผ่านไปแล้ว\nไม่ว่าตอนนี้จะเป็นยังไง ยังมีแสงแดดของวันที่สดใสรออยู่ข้างหน้านะ',
        background: '/background/mood-checkin/storm-clearing.PNG',
        sound: '',
      },
      {
        id: 'overwhelmed-5',
        navigation: 'tap-anywhere',
        text: 'อยากทำอะไรต่อไป\nแล้วถ้าพายุผ่านไปแล้ว คุณอยากจะทำอะไรต่อไป',
        background: '/background/mood-checkin/sunflower.PNG',
        sound: '',
      },
    ],
  },
}