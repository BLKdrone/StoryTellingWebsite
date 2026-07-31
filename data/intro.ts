import type { StoryPageData } from '@/lib/story'

export const introPages: StoryPageData[] = [
  {
    id: 'intro-welcome',
    type: 'text-whale',
    navigation: 'tap-anywhere',
    background: [
      '/background/intro/background1.PNG',
      '/background/intro/background2.PNG',
      '/background/intro/background3.PNG',
    ],
    // backgroundColor: '',
    sound: '',
    transition: 'fade',
    text: 'จากนี้จะพาเธอทางในทะเลไปด้วยกัน ',
  },
  {
    id: 'intro-invitation',
    type: 'text-whale',
    navigation: 'tap-anywhere',
    background: [
      '/background/intro/background2.PNG',
      '/background/intro/background3.PNG',
      '/background/intro/background1.PNG',
    ],
    // backgroundColor: '',
    sound: '',
    transition: 'fade',
    text: 'วาฬ: ฉันเอง ปลาวาฬ! ยินดีต้อนรับสู่ทะเลแห่งนี',
  },
  // {
  //   id: 'intro-descent',
  //   type: 'animation',
  //   navigation: 'tap-anywhere',
  //   background: [
  //     '/background/intro/background3.PNG',
  //     '/background/intro/background1.PNG',
  //     '/background/intro/background2.PNG',
  //   ],
  //   // backgroundColor: '',
  //   sound: '',
  //   transition: 'dive',
  //   title: 'Descending',
  //   text: 'ก่อนอื่น เธอ อยากให้ฉันเรียกเธอว่ายังไงเหรอ',
  //   duration: 4000,
  // },
]