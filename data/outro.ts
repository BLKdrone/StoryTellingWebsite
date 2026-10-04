// Final chapter: "Conclusion" — the whale swims you back to shore, offers
// a closing reflection, gives a farewell charm, then says goodbye.
// Fully linear: no choices, no branches, no text input — just tap through.

export interface OutroTapPage {
  id: string
  navigation: 'tap-anywhere'
  text?: string
  background: string[] | string
  sound: string
  flashTransition?: 'black' | 'white'
}

// Real illustrated backgrounds aren't ready yet — every page cycles through
// the same placeholder slideshow until actual art is supplied.
const shoreBackground1 = [
  '/background/outro/whale1.webp',
  '/background/outro/whale2.webp',
  '/background/outro/whale4.webp',
]

export const outroPages: OutroTapPage[] = [
  {
    id: 'outro-1',
    navigation: 'tap-anywhere',
    text: 'ปลาวาฬได้พาคุณว่ายน้ำขึ้นฝั่ง\nคุณเห็นท้องทะเลที่ไกลสุดลูกหูลูกตา\nกับดวงอาทิตย์ที่กำลังจะลับขอบฟ้า',
    background: shoreBackground1,
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'outro-2',
    navigation: 'tap-anywhere',
    text: 'ปลาวาฬปรากฏตัว แล้วกล่าวกับเธอ\n"การเดินทางของเราได้สิ้นสุดลงแล้วนะ ... "',
    background: shoreBackground1,
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'outro-3',
    navigation: 'tap-anywhere',
    text: '"แต่ประสบการณ์ที่เธอได้รับในวันนี้\nหวังว่าจะทำให้เธอได้รู้จักตัวเองมากขึ้น\nไม่มากก็น้อยนะ"',
    background: shoreBackground1,
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'outro-4',
    navigation: 'tap-anywhere',
    text: '"ถึงแม้การเดินทางของเรา \nณ ตอนนี้จะสิ้นสุด\nแต่ชีวิตของเธอยังต้องไปต่อ"',
    background: shoreBackground1,
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'outro-5',
    navigation: 'tap-anywhere',
    text: '"เมื่อใดที่เธอเจอปัญหา ท้อแท้\nรู้สึกหมดหวัง หรือโดดเดี่ยว\nขอให้นึกไว้เสมอว่า\nในโลกนี้ก็ยังมีตัวเธออยู่"',
    background: shoreBackground1,
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'outro-6',
    navigation: 'tap-anywhere',
    text: '"ขอให้นึกไว้เสมอว่า\nการที่เธอได้ใช้ชีวิตอยู่ทุกวัน\nก็เป็นของขวัญที่ดีที่สุดของเธอแล้ว"',
    background: shoreBackground1,
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'outro-7',
    navigation: 'tap-anywhere',
    text: '"ถ้าเธออยากเจอฉันอีกเมื่อไหร่\nเธอสามารถมาได้เสมอ ฉันจะรอเธออยู่\nและพร้อมที่จะพาเธอออกเดินทางอีกครั้งนะ"',
    background: shoreBackground1,
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'outro-8',
    navigation: 'tap-anywhere',
    text: '"ตอนนี้เราคงต้องลาจากกันแล้ว\nฉันจะขอมอบถุงเครื่องรางแห่งโชคให้กับเธอไว้\nเป็นเครื่องเตือนใจ\nให้เธอใช้ชีวิตอย่างมีความสุขนะ"',
    background: '/background/outro/whale3.webp',
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'outro-8.5',
    navigation: 'tap-anywhere',
    text: 'เธอก้มลงมองถุงเครื่องรางก่อนที่จะ\nแกะออกมาเผยให้เห็นสัตว์ประจำตัวของเธอ',
    background: '/background/outro/bag1.webp',
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'outro-9',
    navigation: 'tap-anywhere',
    text: '"ฉันขอบคุณเธอมากจริง ๆ\nไว้เจอกันใหม่นะ :)"',
    background: shoreBackground1,
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'outro-10',
    navigation: 'tap-anywhere',
    text: 'ปลาวาฬยิ้มให้เธอ ก่อนจะมอบเครื่องรางไว้ในมือ\nแล้วโบกมือลาพร้อมว่ายจากไป',
    background: shoreBackground1,
    sound: '/audio/score for interactive project.mp3',
    flashTransition: 'white',
  },
  {
    id: 'outro-11',
    navigation: 'tap-anywhere',
    text: 'ถุงเครื่องรางค่อย ๆ เผยสิ่งที่ซ่อนอยู่\nข้างในให้เธอเห็น',
    background: '/background/outro/bag2.webp',
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'outro-12',
    navigation: 'tap-anywhere',
    text: 'เครื่องรางแห่งนี้จะอยู่เคียงข้างเธอเสมอ\nไม่ว่าเธอจะไปที่ไหนก็ตาม',
    background: '/background/outro/bag2.webp',
    sound: '/audio/score for interactive project.mp3',
    flashTransition: 'black',
  },
]