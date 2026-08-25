export type IntroSpeaker = 'narration' | 'whale'

export interface IntroTapPage {
  navigation: 'tap-anywhere'
  id: string
  speaker: IntroSpeaker
  text: string
  background: string[]
  sound: string
  transition?: 'fade' | 'dive'
}

export interface IntroInputPage {
  navigation: 'text-input'
  id: string
  speaker: IntroSpeaker
  text: string
  background: string[]
  sound: string
  placeholder?: string
  buttonLabel?: string
  transition?: 'fade' | 'dive'
}

export type IntroPage = IntroTapPage | IntroInputPage

export const introPages: IntroPage[] = [
  {
    id: 'intro-beach',
    navigation: 'tap-anywhere',
    speaker: 'narration',
    text: 'เธออยู่บนชายหาดที่เธอไม่รู้จัก ผืนน้ำตรงหน้าทอประกายสะท้อนแสงแดด เธอสูดหายใจเข้า และได้กลิ่นทะเล',
    background: [
      '/background/intro/whale1.webp',
      '/background/intro/whale2.webp',
      '/background/intro/whale3.webp',
      '/background/intro/whale4.webp',
    ],
    sound: '',
    transition: 'fade',
  },
  {
    id: 'intro-whale-appears',
    navigation: 'tap-anywhere',
    speaker: 'whale',
    text: 'ฉันเอง ปลาวาฬ! ยินดีต้อนรับสู่ทะเลแห่งนี้',
   background: [
      '/background/intro/whale1.webp',
      '/background/intro/whale2.webp',
      '/background/intro/whale3.webp',
      '/background/intro/whale4.webp',
    ],
    sound: '',
    transition: 'fade', // storyboard note: whale "zooms" in on this transition
  },
  {
    id: 'intro-glad-you-came',
    navigation: 'tap-anywhere',
    speaker: 'whale',
    text: 'ฉันดีใจนะที่เธอแวะมาฉันที่ทะเลแห่งนี้',
   background: [
      '/background/intro/whale1.webp',
      '/background/intro/whale2.webp',
      '/background/intro/whale3.webp',
      '/background/intro/whale4.webp',
    ],
    sound: '',
    transition: 'fade',
  },
  {
    id: 'intro-welcome',
    navigation: 'tap-anywhere',
    speaker: 'whale',
    text: 'จากนี้ฉันจะพาเธอเดินทางในทะเลไปด้วยกัน',
   background: [
      '/background/intro/whale1.webp',
      '/background/intro/whale2.webp',
      '/background/intro/whale3.webp',
      '/background/intro/whale4.webp',
    ],
    sound: '',
    transition: 'fade',
  },
  {
    id: 'intro-ask-name',
    navigation: 'text-input',
    speaker: 'whale',
    text: 'ก่อนอื่น เธออยากให้ฉันเรียกเธอว่ายังไงเหรอ',
   background: [
      '/background/intro/whale1.webp',
      '/background/intro/whale2.webp',
      '/background/intro/whale3.webp',
      '/background/intro/whale4.webp',
    ],
    sound: '',
    placeholder: 'ชื่อของเธอ',
    buttonLabel: 'ต่อไป',
    transition: 'fade',
  },
  {
    id: 'intro-nice-to-meet-you',
    navigation: 'tap-anywhere',
    speaker: 'whale',
    text: 'ยินดีที่ได้รู้จักนะ {{name}}',
    background: [
      '/background/intro/whale1.webp',
      '/background/intro/whale2.webp',
      '/background/intro/whale3.webp',
      '/background/intro/whale4.webp',
    ],
    sound: '',
    transition: 'fade',
  },
  {
    id: 'intro-explain-journey',
    navigation: 'tap-anywhere',
    speaker: 'whale',
    text: 'ในระหว่างการเดินทางนี้ ฉันจะทำให้เธอได้ลองตอบคำถามต่อไปนี้ เพื่อฉันจะได้รู้จักเธอมากขึ้น',
   background: [
      '/background/intro/whale1.webp',
      '/background/intro/whale2.webp',
      '/background/intro/whale3.webp',
      '/background/intro/whale4.webp',
    ],
    sound: '',
    transition: 'fade',
  },
  {
    id: 'intro-follow-me',
    navigation: 'tap-anywhere',
    speaker: 'whale',
    text: 'ถ้าเธอพร้อมแล้ว ก็ตามฉันลงมาในทะเลเลย!',
    background: [
      '/background/intro/whale1.webp',
      '/background/intro/whale2.webp',
      '/background/intro/whale3.webp',
      '/background/intro/whale4.webp',
    ],
    sound: '',
    transition: 'dive',
  },
]