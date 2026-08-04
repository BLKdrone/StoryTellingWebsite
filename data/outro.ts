// Final chapter: "Conclusion" — the whale swims you back to shore, offers
// a closing reflection, gives a farewell charm, then says goodbye.
// Fully linear: no choices, no branches, no text input — just tap through.

export interface OutroTapPage {
  id: string
  navigation: 'tap-anywhere'
  text: string
  background: string[]
  sound: string
  flashTransition?: 'black' | 'white'
}

// Real illustrated backgrounds aren't ready yet — every page cycles through
// the same placeholder slideshow until actual art is supplied.
const shoreBackground = [
  '/background/intro/background1.PNG',
  '/background/intro/background2.PNG',
  '/background/intro/background3.PNG',
]

export const outroPages: OutroTapPage[] = [
  {
    id: 'outro-1',
    navigation: 'tap-anywhere',
    text: 'ปลาวาฬได้พาคุณว่ายน้ำขึ้นฝั่ง คุณเห็นท้องทะเลที่ไกลสุดลูกหูลูกตา กับดวงอาทิตย์ที่กำลังจะลับขอบฟ้า',
    background: shoreBackground,
    sound: '',
  },
  {
    id: 'outro-2',
    navigation: 'tap-anywhere',
    text: 'ปลาวาฬปรากฏตัว แต่ไม่มีน้ำกระเซ็นเหมือนตอนเปิด\n\n"การเดินทางของเราได้สิ้นสุดลงแล้วนะ ... "',
    background: shoreBackground,
    sound: '',
  },
  {
    id: 'outro-3',
    navigation: 'tap-anywhere',
    text: 'แต่ประสบการณ์ที่เธอได้รับในวันนี้ หวังว่าจะทำให้เธอได้รู้จักตัวเองมากขึ้น ไม่มากก็น้อยนะ',
    background: shoreBackground,
    sound: '',
  },
  {
    id: 'outro-4',
    navigation: 'tap-anywhere',
    text: 'ถึงแม้การเดินทางของเรา ณ ตอนนี้จะสิ้นสุด แต่ชีวิตของเธอยังต้องไปต่อ',
    background: shoreBackground,
    sound: '',
  },
  {
    id: 'outro-5',
    navigation: 'tap-anywhere',
    text: 'เมื่อใดที่เธอเจอปัญหา ท้อแท้ รู้สึกหมดหวัง หรือโดดเดี่ยว ขอให้นึกไว้เสมอว่าในโลกนี้ก็ยังมีตัวเธออยู่',
    background: shoreBackground,
    sound: '',
  },
  {
    id: 'outro-6',
    navigation: 'tap-anywhere',
    text: 'ขอให้นึกไว้เสมอว่า การที่เธอได้ใช้ชีวิตอยู่ทุกวัน ก็เป็นของขวัญที่ดีที่สุดของเธอแล้ว',
    background: shoreBackground,
    sound: '',
  },
  {
    id: 'outro-7',
    navigation: 'tap-anywhere',
    text: 'ถ้าเธออยากเจอฉันอีกเมื่อไหร่ เธอสามารถมาได้เสมอ ฉันจะรอเธออยู่ และพร้อมที่จะพาเธอออกเดินทางอีกครั้งนะ',
    background: shoreBackground,
    sound: '',
  },
  {
    id: 'outro-8',
    navigation: 'tap-anywhere',
    text: 'ตอนนี้เราคงต้องลาจากกันแล้ว ฉันจะขอมอบถุงเครื่องรางแห่งโชคให้กับเธอไว้ เป็นเครื่องเตือนใจให้เธอใช้ชีวิตอย่างมีความสุขนะ',
    background: shoreBackground,
    sound: '',
  },
  {
    id: 'outro-9',
    navigation: 'tap-anywhere',
    text: 'ฉันชอบคุณเธอมากจริง ๆ ไว้เจอกันอีกในภายหน้านะ :)',
    background: shoreBackground,
    sound: '',
  },
  {
    id: 'outro-10',
    navigation: 'tap-anywhere',
    text: 'ปลาวาฬยิ้มให้เธอ ก่อนจะมอบเครื่องรางไว้ในมือ แล้วโบกมือลาพร้อมว่ายจากไป',
    background: shoreBackground,
    sound: '',
    flashTransition: 'white',
  },
  {
    id: 'outro-11',
    navigation: 'tap-anywhere',
    text: 'ถุงเครื่องรางค่อย ๆ เผยสิ่งที่ซ่อนอยู่ข้างในให้เธอเห็น',
    background: shoreBackground,
    sound: '',
  },
  {
    id: 'outro-12',
    navigation: 'tap-anywhere',
    text: 'เครื่องรางแห่งนี้จะอยู่เคียงข้างเธอเสมอ ไม่ว่าเธอจะไปที่ไหนก็ตาม',
    background: shoreBackground,
    sound: '',
    flashTransition: 'black',
  },
]