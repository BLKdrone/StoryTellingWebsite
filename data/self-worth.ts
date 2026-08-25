export type SelfWorthLetter = 'A' | 'B' | 'C' | 'D'

export interface SelfWorthOption {
  letter: SelfWorthLetter
  label: string
}

export interface SelfWorthTapPage {
  id: string
  navigation: 'tap-anywhere'
  text: string
  background: string[]
  sound: string
  flashTransition?: 'black' | 'white'
}

// Text-input page: shows an input + an explicit "continue" button
export interface SelfWorthInputPage {
  id: string
  navigation: 'button'
  text: string
  background: string[]
  sound: string
  placeholder: string
  buttonLabel?: string
  flashTransition?: 'black' | 'white'
}

// Choice page: shows A–D option buttons, all converge to the next page
export interface SelfWorthQuestionPage {
  id: string
  navigation: 'button'
  text: string
  background: string[]
  sound: string
  options: SelfWorthOption[]
  flashTransition?: 'black' | 'white'
}

export type SelfWorthPage = SelfWorthTapPage | SelfWorthInputPage | SelfWorthQuestionPage

const oceanBackground = [
  '/background/intro/background1.PNG',
  '/background/intro/background2.PNG',
  '/background/intro/background3.PNG',
]

export const selfWorthPages: SelfWorthPage[] = [
  {
    id: 'sw-1',
    navigation: 'tap-anywhere',
    text: 'คุณกำลังดำดิ่งลงในมหาสมุทร กระแสน้ำรอบตัวทำให้คุณสับสนทิศทาง',
    background: oceanBackground,
    sound: '',
  },
  {
    id: 'sw-pride',
    navigation: 'button',
    text: 'อะไรในตัวคุณที่ทำให้คุณรู้สึก \'ภูมิใจ\' ที่สุด?\n"ความ ____ ของฉัน"',
    background: oceanBackground,
    sound: '',
    placeholder: 'พิมพ์คำตอบ',
    buttonLabel: 'ไปต่อ',
  },
  {
    id: 'sw-goal',
    navigation: 'button',
    text: 'เป้าหมายในชีวิตของคุณคืออะไร',
    background: oceanBackground,
    sound: '',
    placeholder: 'พิมพ์คำตอบ',
    buttonLabel: 'ไปต่อ',
  },
  {
    id: 'sw-4',
    navigation: 'tap-anywhere',
    text: 'ตอนนี้ปลาวาฬพาคุณว่ายน้ำต่อ ทันใดนั้น คุณไปชนวัตถุประหลาดอย่างแรง คุณพลัดหลงลงไปในความลึกของมหาสมุทรที่ไม่มีอะไรให้ยึดติดเป็นหลัก นอกจากการดำดิ่งลงไปใต้พื้นน้ำ',
    background: oceanBackground,
    sound: '',
  },
  {
    id: 'sw-inner-voice',
    navigation: 'button',
    text: 'ในวินาทีที่เกิดความผิดพลาด เสียงสะท้อนในหัวคุณพูดกับคุณเหมือนเป็น...',
    background: oceanBackground,
    sound: '',
    options: [
      {
        letter: 'A',
        label:
          'วาฬเพชฌฆาตจอมดุ - คอยกัดกินความมั่นใจ "ทำไมแค่นี้ทำไม่ได้! อ่อนแอแบบนี้จะรอดได้ยังไง!"',
      },
      {
        letter: 'B',
        label:
          'ฝูงวาฬที่ว่ายแซงไป - ทำให้เราเอาแต่เปรียบเทียบ "ดูสิ ตัวอื่นเขาว่ายไปถึงไหนกันแล้ว ทำไมเรายังอยู่ที่นี่"',
      },
      {
        letter: 'C',
        label: 'กระแสน้ำที่เย็นชา - กดดันซ้ำเติม "ต้องหนักให้หนักกว่านี้ ห้ามหยุดพักเด็ดขาด"',
      },
      {
        letter: 'D',
        label:
          'วาฬเพื่อนรัก - ว่ายเข้ามาคลอเคลียแล้วบอกว่า "ไม่เป็นไรนะ ค่อยๆ ว่าย เหนื่อยพอลอยตัวนิ่งๆ ก่อนเดี๋ยวก็หาทางเจอ"',
      },
    ],
  },
  {
    id: 'sw-6',
    navigation: 'tap-anywhere',
    text: 'ไม่ว่าเสียงนั้นจะเป็นยังไง จำไว้นะว่าคุณคือ \'เพื่อนคนสำคัญที่สุด\' ของตัวเอง คนที่จะพาคุณก้าวผ่านความผิดพลาด ก็คือคุณเอง\n\nดังนั้น ดูแลคนสำคัญให้ดีล่ะ',
    background: oceanBackground,
    sound: '',
  },
  {
    id: 'sw-7',
    navigation: 'tap-anywhere',
    text: 'หลังจากที่คุณตั้งหลักได้แล้ว รอบตัวมีเส้นทางน้ำหลายสายไหลผ่านไปซ้าๆ บางสายพาวาฬไปสู่แสงสว่างที่ไกลออกไป บางสายมืดและเงียบจนมองไม่เห็นจุดจบ… แต่วาฬตัวนี้กำลังรอให้คุณบอกว่า \'เราจะไปทางไหนกันดี?\'',
    background: oceanBackground,
    sound: '',
  },
  {
    id: 'sw-reason',
    navigation: 'button',
    text: 'หากต้องเลือกทำกิจกรรมหรือตัดสินใจเรื่องสำคัญสักเรื่องหนึ่ง \'เหตุผล\' แบบไหนที่ให้คุณรู้สึกสบายใจที่สุด?',
    background: oceanBackground,
    sound: '',
    options: [
      { letter: 'A', label: 'ทำเพราะผลลัพธ์นั้นจะทำให้คนรอบข้างยอมรับ', background: '/background/mood-checkin/happy.webp'},
      { letter: 'B', label: 'ทำเพราะไม่อยากให้ใครต้องผิดหวังในตัวเรา', background: '/background/mood-checkin/happy.webp'},
      { letter: 'C', label: 'ทำเพราะสิ่งนั้นตรงกับความเชื่อและคุณค่าที่เราให้ความสำคัญ', background: '/background/mood-checkin/happy.webp'},
      { letter: 'D', label: 'ทำเพราะเป็นสิ่งที่คนส่วนใหญ่บอกว่าดี', background: '/background/mood-checkin/happy.webp' },
    ],
  },
  {
    id: 'sw-9',
    navigation: 'tap-anywhere',
    text: 'ไม่ว่าเหตุผลของคุณคืออะไร มันไม่มีผิดมีถูกหรอก แต่อยากให้คุณระลึกไว้เสมอ ว่าเป้าหมายของคุณคือ "{{sw-goal}}"',
    background: oceanBackground,
    sound: '',
  },
  {
    id: 'sw-10',
    navigation: 'tap-anywhere',
    text: 'กลางมหาสมุทรลึก—ตอนนี้คุณยังคงเดินทางต่อไปในเส้นทางของตัวเองเพื่อไปให้ถึงเป้าหมาย ไม่ว่ากระแสน้ำจะซัดไปทางไหน',
    background: oceanBackground,
    sound: '',
  },
  {
    id: 'sw-want',
    navigation: 'button',
    text: 'คุณอยากเป็นคนแบบไหน',
    background: oceanBackground,
    sound: '',
    placeholder: 'พิมพ์คำตอบ',
    buttonLabel: 'ไปต่อ',
  },
  {
    id: 'sw-12',
    navigation: 'tap-anywhere',
    text: 'งั้นเหรอ ก็ดีนะ ถ้าคุณอยากละก็ สักวันต้องเป็นคนแบบนั้นได้แน่\n\nแต่ถ้าเหนื่อย ก็ไม่ต้องเป็นคนแบบนั้นก็ได้นะ ยังไง ความ "{{sw-pride}}" ของคุณ ก็ดีมากพอแล้วจริง ๆ',
    background: oceanBackground,
    sound: '',
  },
]

export function resolveSelfWorthText(text: string, answers: Record<string, string>): string {
  return text.replace(/{{(.*?)}}/g, (_match, key: string) => answers[key.trim()] ?? '')
}