import { wrapTextAtLength } from '@/lib/utils'

export type SelfWorthLetter = 'A' | 'B' | 'C' | 'D'

export interface SelfWorthOption {
  letter: SelfWorthLetter
  label: string
  background?: string
}

export interface SelfWorthTapPage {
  id: string
  navigation: 'tap-anywhere'
  text?: string
  background: string[]
  decorationFrames?: string[] | string
  decorationBubble?: 'one' | 'many'
  sound: string
  flashTransition?: 'black' | 'white'
}

// Text-input page: shows an input + an explicit "continue" button
export interface SelfWorthInputPage {
  id: string
  navigation: 'button'
  text?: string
  background: string[]
  decorationFrames?: string[] | string
  decorationBubble?: 'one' | 'many'
  sound: string
  placeholder: string
  buttonLabel?: string
  flashTransition?: 'black' | 'white'
}

// Choice page: shows A–D option buttons, all converge to the next page
export interface SelfWorthQuestionPage {
  id: string
  navigation: 'button'
  text?: string
  background: string[]
  decorationFrames?: string[] | string
  decorationBubble?: 'one' | 'many'
  sound: string
  options: SelfWorthOption[]
  flashTransition?: 'black' | 'white'
}

export type SelfWorthPage = SelfWorthTapPage | SelfWorthInputPage | SelfWorthQuestionPage

const oceanBackground = [
  '/background/selfworth/oceans1.webp',
  '/background/selfworth/oceans2.webp',
]

const selfWorthPageDefinitions: SelfWorthPage[] = [
  {
    id: 'sw-1',
    navigation: 'tap-anywhere',
    text: 'กระแสน้ำรอบตัวทำให้คุณสับสนทิศทาง\nคุณกำลังดำดิ่งลงในมหาสมุทร',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
    decorationBubble: 'one',
  },
  {
    id: 'sw-pride',
    navigation: 'button',
    text: 'อะไรในตัวคุณที่ทำให้คุณรู้สึก\n\'ภูมิใจ\' ที่สุด?\n"ความ ____ ของฉัน"',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
    decorationBubble: 'one',
    placeholder: 'เธอลองใช้เวลาค่อย ๆ คิดสิ',
    buttonLabel: 'ไปต่อ',
  },
  {
    id: 'sw-goal',
    navigation: 'button',
    text: 'เป้าหมายในชีวิตของคุณคืออะไร',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
    decorationBubble: 'one',
    placeholder: 'เธอลองใช้เวลาค่อย ๆ คิดสิ',
    buttonLabel: 'ไปต่อ',
  },
  {
    id: 'sw-4',
    navigation: 'tap-anywhere',
    text: 'ตอนนี้ปลาวาฬพาคุณว่ายน้ำต่อ ทันใดนั้น\nคุณไปชนวัตถุประหลาดอย่างแรง',
    background: oceanBackground,
    // decorationFrames: '/background/burnout/manybubble.webp',
    decorationBubble: 'one',
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'sw-4.1',
    navigation: 'tap-anywhere',
    text: 'คุณพลัดหลงลงไปในความลึกของมหาสมุทร\nที่ไม่มีอะไรให้ยึดติดเป็นหลัก\nนอกจากการดำดิ่งลงไปใต้พื้นน้ำ',
    background: oceanBackground,
    // decorationFrames: '/background/burnout/manybubble.webp',
    decorationBubble: 'one',
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'sw-inner-voice',
    navigation: 'button',
    text: 'ในวินาทีที่เกิดความผิดพลาด\nเสียงสะท้อนในหัวคุณพูดกับคุณ\nเหมือนเป็น...',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
    decorationBubble: 'one',
    options: [
      {
        letter: 'A',
        label:
          'วาฬเพชฌฆาตจอมดุ - คอยกัดกินความมั่นใจ\n"ทำไมแค่นี้ทำไม่ได้!\nอ่อนแอแบบนี้จะรอดได้ยังไง!"',
      },
      {
        letter: 'B',
        label:
          'ฝูงวาฬที่ว่ายแซงไป -\nทำให้เราเอาแต่เปรียบเทียบ\n"ดูสิ ตัวอื่นเขาว่ายไปถึงไหนกันแล้ว\nทำไมเรายังอยู่ที่นี่"',
      },
      {
        letter: 'C',
        label: 'กระแสน้ำที่เย็นชา - กดดันซ้ำเติม\n"ต้องหนักให้หนักกว่านี้\nห้ามหยุดพักเด็ดขาด"',
      },
      {
        letter: 'D',
        label:
          'วาฬเพื่อนรัก - ว่ายเข้ามาคลอเคลีย\nแล้วบอกว่า "ไม่เป็นไรนะ ค่อยๆ ว่าย\nเหนื่อยพอลอยตัวนิ่งๆ ก่อน\nเดี๋ยวก็หาทางเจอ"',
      },
    ],
  },
  {
    id: 'sw-6',
    navigation: 'tap-anywhere',
    text: 'ไม่ว่าเสียงนั้นจะเป็นยังไง\nจำไว้นะว่าคุณคือ \n\'เพื่อนคนสำคัญที่สุด\'ของตัวเอง',
    decorationBubble: 'one',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'sw-6.1',
    navigation: 'tap-anywhere',
    text: 'คนที่จะพาคุณก้าวผ่านความผิดพลาด\nก็คือคุณเอง',
    decorationBubble: 'one',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'sw-6.2',
    navigation: 'tap-anywhere',
    text: 'ดังนั้น..',
    decorationBubble: 'one',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'sw-6.3',
    navigation: 'tap-anywhere',
    text: 'ดูแลคนสำคัญให้ดีล่ะ',
    decorationBubble: 'one',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'sw-7',
    navigation: 'tap-anywhere',
    text: 'หลังจากที่คุณตั้งหลักได้แล้ว\nรอบตัวมีเส้นทางน้ำหลายสายไหลผ่านไปซ้ำ ๆ',
    decorationBubble: 'one',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'sw-7.1',
    navigation: 'tap-anywhere',
    text: 'บางสายพาวาฬไปสู่แสงสว่างที่ไกลออกไป\nบางสายมืดและเงียบจนมองไม่เห็นจุดจบ…',
    decorationBubble: 'one',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'sw-7.2',
    navigation: 'tap-anywhere',
    text: 'แต่วาฬตัวนี้กำลังรอให้คุณบอกว่า\n\'เราจะไปทางไหนกันดี?\'',
    decorationBubble: 'one',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'sw-reason',
    navigation: 'button',
    text: 'หากต้องเลือกทำกิจกรรมหรือตัดสินใจ\nเรื่องสำคัญสักเรื่องหนึ่ง \'เหตุผล\'\nแบบไหนที่ให้คุณรู้สึกสบายใจที่สุด?',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
    decorationBubble: 'one',
    options: [
      { letter: 'A', label: 'ทำเพราะผลลัพธ์นั้นจะทำให้คนรอบข้างยอมรับ', background: '/background/selfworth/4path/1.webp' },
      { letter: 'B', label: 'ทำเพราะไม่อยากให้ใครต้องผิดหวังในตัวเรา', background: '/background/selfworth/4path/2.webp' },
      { letter: 'C', label: 'ทำเพราะสิ่งนั้นตรงกับความเชื่อและคุณค่า\nที่เราให้ความสำคัญ', background: '/background/selfworth/4path/3.webp' },
      { letter: 'D', label: 'ทำเพราะเป็นสิ่งที่คนส่วนใหญ่บอกว่าดี', background: '/background/selfworth/4path/4.webp' },
    ],
    flashTransition: 'black',
  },
  {
    id: 'sw-9',
    navigation: 'tap-anywhere',
    text: 'ไม่ว่าเหตุผลของคุณคืออะไร\nมันไม่มีผิดมีถูกหรอก',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
    decorationBubble: 'one',
  },
  {
    id: 'sw-9',
    navigation: 'tap-anywhere',
    text: 'แต่อยากให้คุณระลึกไว้เสมอ\nว่าเป้าหมายของคุณคือ "{{sw-goal}}"',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
    decorationBubble: 'one',
  },
  {
    id: 'sw-10',
    navigation: 'tap-anywhere',
    text: 'กลางมหาสมุทรลึก—ตอนนี้คุณยังคงเดินทาง\nต่อไปในเส้นทางของตัวเอง',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
    decorationBubble: 'one',
  },
  {
    id: 'sw-10.1',
    navigation: 'tap-anywhere',
    text: 'เพื่อไปให้ถึงเป้าหมาย\nไม่ว่ากระแสน้ำจะซัดไปทางไหน',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
    decorationBubble: 'one',
  },
  {
    id: 'sw-want',
    navigation: 'button',
    text: 'คุณอยากเป็นคนแบบไหน',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
    decorationBubble: 'one',
    placeholder: 'เธอลองใช้เวลาค่อย ๆ คิดสิ',
    buttonLabel: 'ไปต่อ',
  },
  {
    id: 'sw-12',
    navigation: 'tap-anywhere',
    text: 'งั้นเหรอ ก็ดีนะ ถ้าคุณอยากล่ะก็\nสักวันต้องเป็นคนแบบนั้นได้แน่',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
    decorationBubble: 'one',
  },
  {
    id: 'sw-12.1',
    navigation: 'tap-anywhere',
    text: 'แต่ถ้าเหนื่อย\nก็ไม่ต้องเป็นคนแบบนั้นก็ได้นะ\nยังไง ความ "{{sw-pride}}" ของคุณ\nก็ดีมากพอแล้วจริง ๆ',
    background: oceanBackground,
    sound: '/audio/score for interactive project.mp3',
    decorationBubble: 'one',
  },
]

export const selfWorthPages: SelfWorthPage[] = selfWorthPageDefinitions.map((page) => ({
  ...page,
  decorationFrames: page.decorationFrames ?? '',
}))

export function resolveSelfWorthText(text: string, answers: Record<string, string>): string {
  return text.replace(/{{(.*?)}}/g, (_match, key: string) => wrapTextAtLength(answers[key.trim()] ?? ''))
}