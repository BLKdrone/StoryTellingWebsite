// แบบทดสอบเชิงข้อมูล "คุณคือสัตว์ทะเลชนิดใด"
// แต่ละตัวเลือกจะมีตัวอักษรกำกับสัตว์ ผลลัพธ์คือตัวอักษรที่ถูกเลือกบ่อยที่สุด
import type { StoryPageData } from '@/lib/story'
export type AnimalKey = 'dolphin' | 'seal' | 'octopus' | 'pufferfish' | 'sea-turtle'

export interface QuizOption {
  /** ตัวอักษรคำตอบ A–E ที่จับคู่กับสัตว์ผ่าน `letterToAnimal` */
  letter: 'A' | 'B' | 'C' | 'D' | 'E'
  prefix: string
  label: string
}

export interface QuizQuestion {
  id: string
  navigation: 'button'
  question?: string
  backgroundColor: string
  background: string | string[]
  sound: string
  options: QuizOption[]
  /** ถ้ามีค่า จะแฟลชสีนี้ตอนเปลี่ยนมาหน้านี้ ถ้าไม่ใส่ = ไม่มีทรานซิชัน */
  flashTransition?: 'black' | 'white'
}

export interface QuizTabPage {
  id: string
  navigation: 'tap-anywhere'
  question?: string
  background: string | string[]
  sound: string
  flashTransition?: 'black' | 'white'
  decorationFrames?: string[]
  decorationMotion?: 'glide' | 'bob'
}

export type QuizPageData = QuizQuestion | QuizTabPage

export interface AnimalResult {
  key: AnimalKey
  name: string
  tagline: string
  description: string
  /** สีไอคอนชั่วคราว (ยังไม่มีภาพประกอบ) */
  iconColor: string
}


export const letterToAnimal: Record<QuizOption['letter'], AnimalKey> = {
  A: 'dolphin',
  B: 'seal',
  C: 'octopus',
  D: 'pufferfish',
  E: 'sea-turtle',
}

export interface AnimalResult {
  key: AnimalKey
  name: string
  tagline: string
  description: string
  quote: string
  vibes: string
  behaviorHabitat: string
  strength: string
  weakness: string
  /** สีไอคอนชั่วคราว (ยังไม่มีภาพประกอบ) */
  iconColor: string
  background: string | string[]
  animal: string | string[]
  decoration?: string
  animationType: 'zoom' | 'float' | 'glide'
  link: string
}

export const animals: Record<AnimalKey, AnimalResult> = {
  dolphin: {
    key: 'dolphin',
    name: 'โลมา',
    tagline: 'ผู้​เชื่อม​ความ​สัมพันธ์​ที่​ร่าเริง',
    description:
      'คุณ​คือ​ตัว​โจ๊ก​ของ​กลุ่ม​เพื่อน พลังงาน​คุณ​เยอะ​มาก เปรียบ​ได้​กับ​โลมา​ที่​ชอบ​กระโดด​ฝ่า​เกลียว​คลื่น​ไป​ทั้ง​วัน คุณ​เฉิด​ฉาย​เมื่อ​ได้​อยู่​กับ​ผู้คน ดั่ง​โลมา​ที่​ชอบ​อยู่​เป็น​ฝูง คุณ​ทน​เห็น​เพื่อน​คุณ​ไป​สังสรรค์​กัน​โดย​ไม่มี​คุณ​ไม่​ได้​เพราะ​คุณ​มี FOMO หรือ fear of missing out แต่​ถึง​กระนั้น​คุณ​คือ​นัก​พูด​ที่​ยอด​เยี่ยม เป็น​ผู้นำ​ได้​ดี และ​เพื่อน ๆ ต่าง​เห็น​ตรง​กัน​ว่า​คุณ​คือ​เพื่อน​ที่​จริงใจ',
    quote: 'Stillness is not an empty space; it is where your deepest self is found.',
    vibes: 'พลังงาน​ล้น​เหลือ ร่าเริง และ​มัก​เป็น​จุด​สนใจ ช่วย​นำ​ความ​สนุก​มา​สู่​ทุก​การ​รวม​ตัว',
    behaviorHabitat:
      'มัก​พบ​กระโดด​ฝ่า​เกลียว​คลื่น​ใน​ผืน​น้ำ​ชายฝั่ง เดิน​ทาง​เป็น​ฝูง ชื่น​ชอบ​การ​สื่อสาร การ​ปฏิสัมพันธ์​ทาง​สังคม และ​การ​ทำ​กิจกรรม​ร่วม​กัน น้อย​ครั้ง​ที่​จะ​พบเห็น​อยู่​ตาม​ลำพัง',
    strength:
      'สื่อสาร​ได้​ยอด​เยี่ยม มี​ความ​กระตือรือร้น​สูง เป็น​ผู้นำ​โดย​ธรรมชาติ​ที่​สามารถ​รวมใจ​คนใน​ทีม​ได้ และ​เป็น​เพื่อน​ที่​ซื่อสัตย์',
    weakness:
      'มัก​กลัว​การ​ตกกระ​แส (FOMO) เบื่อ​ง่าย​กับ​กิจวัตร​ประจำ​วัน ลำบาก​ใจ​เมื่อ​ต้อง​ทำงาน​คน​เดียว​หรือ​ต้อง​ใช้​สมาธิ​ขั้น​สูง และ​บาง​ครั้ง​ก็​ทำให้​ตัว​เอง​เหนื่อย​ล้า​จาก​การ​พยายาม​ทำให้​บรรยากาศ​สนุก​อยู่​ตลอด​เวลา',
    iconColor: '#4bb3c9',
    background: '/background/quiz/character/dolphin/background.webp',
    animal: '/background/quiz/character/dolphin/animal.webp',
    animationType: 'zoom',
    link: "https://www.instagram.com/stories/goose.3533321/3972855821932823957?utm_source=ig_story_item_share&igsi=aXJidTU2eW9tNjRr",
  },
  seal: {
    key: 'seal',
    name: 'แมวน้ำ',
    tagline: 'ผู้​อ่อน​โยน​แห่ง​ท้อง​ทะเล',
    description:
      'คุณ​เป็น​คน​อบอุ่น รัก​สันติ เหมือน​กับ​แมวน้ำ​ที่​ว่าย​น้ำ​อย่าง​สงบ​สุข​ขึ้น​มา​นอน​ตา​แป๊ว​อยู่​บน​ฝั่ง แต่​การ​เป็น​คน​เห็นใจ​ผู้​อื่น​ก็​อาจ​ทำให้​คุณ​กำหนด​ขอบเขต​ตนเอง​ไม่​ได้​จน​อาจ​ถูก​เอา​เปรียบ​ง่าย การ​ฝึก​ทักษะ​ปฏิเสธ​จึง​สำคัญ​สำหรับ​คุณ ถึง​กระนั้น​คุณ​คือ​คน​น่า​รัก มี​เมตตา เป็น​สาย​ซัพพอร์ต​ที่​ดี เป็น​ที่พัก​พิง​ให้​เพื่อน ๆ และ​คน​รัก เหมือน​แมว​น้ำ​อุ๋ง ๆ ที่​ใคร ๆ ก็​เอ็นดู​อยู่​ตลอด',
    quote: 'Protecting your own peace is never a betrayal of others.',
    vibes:
      'อบอุ่น ประโลม​ใจ ใช้​ชีวิต​อย่าง​ช้า ๆ และ​มี​ความ​เห็น​อก​เห็นใจ​ผู้​อื่น​อย่าง​ลึก​ซึ้ง ให้​ความ​รู้สึก​เหมือน​อ้อม​กอด​ที่​อบอุ่น',
    behaviorHabitat:
      'แหวก​ว่าย​อย่าง​สงบ​สุข​ไป​ตาม​ชายฝั่ง​และ​โขด​หิน​ริม​ทะเล ชอบ​ขึ้น​มา​นอน​ผึ่ง​แดด​เป็นก​ลุ่ม​กับ​เพื่อน​พ้อง หลีก​เลี่ยง​ความ​ขัด​แย้ง​ตาม​ธรรมชาติ ชอบ​ที่​จะ​อยู่​ร่วม​กับ​สิ่ง​รอบ​ตัวอย่าง​เงียบ ๆ',
    strength:
      'มี​ความ​เมตตา​กรุณา​สูง คอย​สนับสนุน​ผู้​อื่น​ได้​ดี และ​เป็น​ผู้​ฟัง​ที่​ยอด​เยี่ยม ช่วย​นำ​ความ​กลม​เก​ลี​ยม​และ​ความ​รู้สึก​ปลอดภัย​ทาง​ใจมา​สู่​ทุก​กลุ่ม​ที่​อยู่​ด้วย',
    weakness:
      'ประสบ​ปัญหา​ใน​การ​กำหนด​ขอบเขต​ใน​ความ​พยายาม​ที่​จะ​รักษา​ความ​สันติ หลีก​เลี่ยง​การ​เผชิญ​หน้าที่​จำเป็น มัก​ซึมซับ​ความเครียด​ของ​ผู้​อื่น และ​ปล่อย​ให้​ถูก​เอา​เปรียบ​ได้​ง่าย',
    iconColor: '#7a9a7e',
    background: '/background/quiz/character/seal/background.webp',
    animal: '/background/quiz/character/seal/animal.webp',
    decoration: '/background/quiz/character/seal/decoration.webp',
    animationType: 'float',
    link: "https://www.instagram.com/stories/goose.3533321/3972854483486579899?utm_source=ig_story_item_share&igsi=bHI4ejVwanY4bmVp"
  },
  octopus: {
    key: 'octopus',
    name: 'หมึก​ยักษ์',
    tagline: 'นัก​ปรับ​ตัวผู้​ชาญ​ฉลาด',
    description:
      'คุณ​คือ​พวก​ติส ๆ มี​ความ​คิด​เป็น​ของ​ตัว​เอง สงสัย​ใน​ทุก​อย่าง สำรวจ​สิ่ง​ต่าง ๆ ไป​หมด ดั่ง​หมึก​ยักษ์​ที่​ชอบ​อยู่​ตาม​แนว​ปะการัง​ที่​ซับ​ซ้อน ชอบ​ยื่น​หนวด​ไป​หยิบ​จับ​สิ่ง​ต่าง ๆ รอบ​ตัว การ​ที่​มี​ไอ​เดีย​ใน​หัว​เป็น​ล้าน​อย่าง ทำให้​คุณ​มี​ความ​คิด​สร้างสรรค์ แต่​ขณะ​เดียวกัน​ก็​เป็น​อุปสรรค​ใน​การ​ลงมือ​ทำ​สิ่ง​ใด​สิ่ง​หนึ่ง ถึง​กระนั้น​คุณ​คือ​ฮีโร่​ของ​ผู้คน​ใน​การ​แก้​ปัญหา เพราะ​คุณ​เป็น​คน​คิด​นอก​กรอบ​และ​มัก​มี​ไอ​เดีย​ที่​คน​อื่น​มอง​ข้าม​เสมอ',
    quote:
      'Your brilliant mind can open any door, but your heart must eventually choose one room to stay in.',
    vibes: 'ลึกลับ มี​ความ​เป็น​ศิลปิน ช่าง​สงสัย​ใคร่​รู้ และ​คิด​นอก​กรอบ เป็น​นัก​คิด​หัว​ก้าวหน้า',
    behaviorHabitat:
      'พบ​ได้​ตาม​แนว​ปะการัง​ที่​ซับ​ซ้อน​และ​รอย​แยก​ใน​ทะเล​ลึก ชอบ​สำรวจ​สิ่ง​ต่างๆ หยิบ​จับ​ดัดแปลง​สิ่ง​รอบ​ตัว และ​เปลี่ยน​สี​ของ​ตัว​เอง​ให้​กลมกลืน​ตาม​สภาพ​แวดล้อม',
    strength:
      'มี​ความ​คิด​ริเริ่ม​สร้างสรรค์​สูง เป็น​นัก​แก้​ปัญหา​ที่​ดี และ​ปรับ​ตัว​เก่ง คิด​นอก​กรอบ​และ​สามารถ​มอง​เห็น​รูป​แบบ​ต่าง ๆ ที่​คน​อื่น​มอง​ข้าม​ไป',
    weakness:
      'มี​แนว​โน้ม​ที่​จะ​คิดมาก​เกิน​ไป​จน​ไม่​กล้า​ตัดสิน​ใจ มัก​ถูก​ดึงดูด​ด้วย​ไอ​เดีย​ใหม่ๆ ที่​น่า​ตื่น​เต้น ทำให้​ยาก​ที่​จะ​ทำ​สิ่ง​ใด​สิ่ง​หนึ่ง​ให้​เสร็จ​สมบูรณ์ อาจ​แยก​ตัว​ไป​อยู่​ใน​พื้นที่​ของ​ตัว​เอง​เมื่อ​ต้อง​ใช้​ความ​คิด',
    iconColor: '#b06a8f',
    background: '/background/quiz/character/octopus/background.webp',
    animal: '/background/quiz/character/octopus/animal.webp',
    decoration: '/background/quiz/character/octopus/decoration.webp',
    animationType: 'float',
    link: "https://www.instagram.com/stories/goose.3533321/3972855360408509006?utm_source=ig_story_item_share&igsi=cnVrd3p1cDY0aHYy",
  },
  pufferfish: {
    key: 'pufferfish',
    name: 'ปลา​ปักเป้า',
    tagline: 'ผู้​พิทักษ์​หัวใจ​อ่อน​โยน',
    description:
      'คุณ​คือ​คน​ที่​พร้อม​บวก​ตลอด โดย​เฉพาะ​เมื่อ​คุณ​หรือ​คน​รัก​ถูก​คุกคาม เปรียบ​ดั่ง​ปลา​ปักเป้า​ที่​ว่าย​ไป​ตาม​แนว​ปะการัง​อย่าง​ระวัง​และ​พอง​ตัว​เมื่อ​มี​อันตราย แต่​การ​ที่​คุณ​อยู่​ใน​โหมด​ไฟต์​บ่อย ๆ ก็​อาจ​ทำให้​คุณ​หนักใจ​ได้ และ​อาจ​ทำให้​คุณ​เผลอ​ผลักไส​คน​รอบ​ตัว​ใน​ช่วง​ที่​ต้องการ​การ​ปลอบโยน ถึง​กระนั้น คุณ​คือ​คน​ที่​มี​ความ​ฉลาด​ทาง​อารมณ์​สูง มัก​ตั้ง​รับ​ปัญหา​ได้​ดี และ​เพื่อน ๆ ของ​คุณ​ต่าง​รู้สึก​ปลอดภัย​เวลา​ที่​ได้​อยู่​กับ​คุณ',
    quote: 'You do not need to carry the weight of the ocean to be safe within it.',
    vibes:
      'ตื่น​ตัว มี​ความ​รู้สึก​ที่​ลึก​ซึ้ง ระมัดระวัง​ตัว แต่​ก็​ดุดัน​เมื่อ​ตนเอง​หรือ​คน​ที่รัก​ถูก​คุกคาม',
    behaviorHabitat:
      'ว่าย​นำทาง​ไป​ตาม​แนว​ปะการัง​ด้วย​ความ​แม่นยำ​และ​ระมัดระวัง ซึมซับ​ทุก​ราย​ละเอียด​ของ​สภาพ​แวดล้อม และ​จะ​พอง​ตัว​ทันที​เพื่อ​ปกป้อง​ตัว​เอง เมื่อ​รู้สึก​ว่า​บรรยากาศ​ไม่สู้​ดี​หรือ​มี​อันตราย​เข้า​มา​ใกล้',
    strength:
      'ช่าง​สังเกต​และ​มี​ความ​ฉลาด​ทาง​อารมณ์​สูง มัก​จะ​คาด​การณ์​ปัญหา​ได้​ก่อน​ที่​จะ​เกิด​ขึ้น ใส่ใจ​ใน​การ​สร้าง​สภาพ​แวดล้อม​ที่​ปลอดภัย​และ​มั่นคง​สำหรับ​ตัว​เอง​และ​ผู้​อื่น',
    weakness:
      'รู้สึก​หนักใจ​ได้​ง่าย​จาก​ความเครียด​และ​สิ่ง​รอบ​ตัว มัก​มี​ปฏิกิริยา​ตอบ​สนอง​แรก​เมื่อ​รู้สึก​ว่า​มี​ความ​กังวล​หรือ​ไม่​ปลอดภัย คือ การ​สร้าง​กำแพง​ป้องกัน ซึ่ง​อาจ​ผลักไส​ผู้คน​รอบ​ตัว​ออก​ไป ใน​เวลา​ที่​จริง ๆ แล้ว​ต้องการ​การ​ปลอบโยน​มาก​ที่สุด',
    iconColor: '#c9a24b',
    background: '/background/quiz/character/pufferfish/background.webp',
    animal: '/background/quiz/character/pufferfish/animal.webp',
    animationType: 'float',
    link: "https://www.instagram.com/stories/goose.3533321/3972855360408509006?utm_source=ig_story_item_share&igsi=cnVrd3p1cDY0aHYy",
  },
  'sea-turtle': {
    key: 'sea-turtle',
    name: 'เต่า​ทะเล',
    tagline: 'ผู้​เดิน​ทาง​ที่​หนัก​แน่น',
    description:
      'คุณ​คือ​พ่อ​พระ​แม่​พระ​ของ​กลุ่ม​เพื่อน นั่น​เพราะ​คุณ​มี​ความ​เป็น​ผู้ใหญ่ ใจเย็น ไม่​หวั่น​ไป​ตาม​กระแส ดั่ง​เต่า​ทะเล​ที่​ท่อง​มหาสมุทร​ตาม​เส้น​ทาง​ด้วย​จังหวะ​ของ​ตนเอง ความ​เข้ม​งวด​ของ​คุณ​ทำให้​ปรับ​ตัว​ช้า​และ​เครียด​ง่าย การ​ลอง​เปิด​ใจ​มาก​ขึ้น​จึง​เป็น​สิ่ง​ที่​คุณ​อาจ​ต้อง​ฝึกฝน ถึง​กระนั้น​คุณ​คือ​ที่​พึ่งพา​ของ​เพื่อน ๆ และ​คุณ​คือ​คน​ที่​ไม่​ยอม​ถอย​ให้​กับ​อุปสรรค ดั่ง​เต่า​ทะเล​ที่​จะ​ไม่​ยอม​หยุด​ว่าย​จนกว่า​จะ​ถึง​จุด​หมาย​ปลาย​ทาง',
    quote: "The ocean's currents change, and so must we. There is beauty in the detour.",
    vibes: 'ใจเย็น มี​ปัญญา มุ่ง​มั่น และ​ไม่​หวั่น​ไหว​ไป​ตาม​กระแส​ความ​นิยม​หรือ​ผู้​อื่น',
    behaviorHabitat:
      'ท่อง​มหาสมุทร​โดย​รักษา​ระยะ​จังหวะ​ของ​ตัว​เอง​สำหรับ​การ​เดิน​ทาง​ที่​ยาวนาน มี​ระบบ​ระเบียบ​สูง วางแผน​เส้น​ทาง​อย่าง​ชัดเจน และ​จดจำ​เส้น​ทางการ​เดิน​ทาง​ได้​เสมอ',
    strength:
      'พึ่งพา​ได้​อย่าง​เหลือ​เชื่อ มี​วินัย อดทน และ​ใส่ใจ​ใน​ราย​ละเอียด หาก​ตั้ง​เป้า​หมาย​ไว้ จะ​ทำให้​สำเร็จ ไม่​ว่า​จะ​ต้อง​ใช้​เวลา​นาน​แค่​ไหน​ก็ตาม',
    weakness:
      'อาจ​มี​ความ​เข้ม​งวด​และ​ตึงเครียด​เกิน​ไป เนื่องจาก​มัก​ชอบ​ทำ​ตาม​แผนที่​วาง​ไว้ ทำให้​ปรับ​ตัว​เข้า​กับ​การ​เปลี่ยนแปลง​กะทันหัน​ได้​ช้า ดื้อ​รั้น​เมื่อ​ถูก​บังคับ​ให้​ออก​นอก​เส้น​ทาง​ที่​เลือก​ไว้',
    iconColor: '#5b8f74',
    background: '/background/quiz/character/turtle/background.webp',
    animal: '/background/quiz/character/turtle/animal.webp',
    decoration: '/background/quiz/character/turtle/decoration.webp',
    animationType: 'glide',
    link: "https://www.instagram.com/stories/goose.3533321/3972839636432484625?utm_source=ig_story_item_share&igsi=MWVydzllejVxZ3N5aQ==",
  },
}

export const quizQuestions: QuizPageData[] = [
  {
    id: 'investigation-1',
    navigation: 'tap-anywhere',
    question: 'ณ ชายฝั่ง​ที่​เต็ม​ไป​ด้วย​เม็ด​ทราย​สี​เหลือง​นวล ทะเล​เป็น​ประกาย​จาก​แสงแดด เสียง​คลื่น​กระทบ​ฝั่ง​เป็น​จังหวะ',
    background: [
      '/background/intro/background1.webp',
      '/background/intro/background2.webp',
      '/background/intro/background3.webp',
    ],
    sound: '/audio/score for interactive project.mp3',
    flashTransition: 'black',
  },
  {
    id: 'investigation-2',
    navigation: 'tap-anywhere',
    question: 'คุณ​ค่อย ๆ ว่าย​น้ำ​ออก​จาก​ชายฝั่ง​ที่​คุ้น​เคย ทิ้ง​ผืน​ทราย​และ​เสียง​คลื่น​ไว้​เบื้อง​หลัง',
    background: [
      '/background/intro/background1.webp',
      '/background/intro/background2.webp',
      '/background/intro/background3.webp',
    ],
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'investigation-2',
    navigation: 'tap-anywhere',
    question: '  คุณ​นั่ง​มอง​ไป​ที่​ชายหาด​ที่​เต็ม​ไป​ด้วย​ผู้คน​มากมาย​ที่​ต่าง​ก็​ประสบการณ์​ชีวิต​และ​บุคลิกภาพ',
    background: [
      '/background/intro/background1.webp',
      '/background/intro/background2.webp',
      '/background/intro/background3.webp',
    ],
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'q1',
    question:
      'เมื่อ​คุณ​มอง​มา​ที่​ตัว​คุณ คน​อื่น​มัก​มอง​คุณ​เป็น...',
    backgroundColor: '#1a5566',
    background: [
      '/background/intro/background1.webp',
      '/background/intro/background2.webp',
      '/background/intro/background3.webp',
    ],
    sound: '/audio/score for interactive project.mp3',
    options: [
      { letter: 'A', prefix: 'ผู้​เชื่อม​ความ​สัมพันธ์', label: 'เต็ม​เปี่ยม​ด้วย​พลังงาน สร้าง​ความ​สดใส ความ​ร่าเริง' },
      { letter: 'B', prefix: 'ผู้​สร้าง​ความ​กลม​เกลียว', label: 'ให้​ความ​อบอุ่น ความ​เห็น​อก​เห็นใจ' },
      { letter: 'C', prefix: 'นัก​สร้างสรรค์', label: 'ช่าง​คิด ช่าง​สงสัย มี​ความ​เป็น​ศิลปิน​สูง' },
      { letter: 'D', prefix: 'ผู้​ช่าง​สังเกต', label: 'ตื่น​ตัว​อยู่​ตลอด ระมัดระวัง ใส่ใจ​ผู้​อื่น​เสมอ' },
      { letter: 'E', prefix: 'คน​เจ้า​ระเบียบ', label: 'มุ่ง​มั่น ไม่​หวั่น​ไหว มี​วินัย และ​มี​ความ​ละเอียด' },
    ],
    navigation: 'button',
  },
  {
    id: 'investigation-shallowcoral',
    navigation: 'tap-anywhere',
    question: 'ยิ่ง​ดำ​ดิ่ง​ลง​ไป แสง​อาทิตย์​ก็​ยิ่ง​จาง​หาย ราวกับ​ถูก​กลืน​กิน​โดย​ผืน​น้ำ​อัน​กว้าง​ใหญ่​ความ​เย็น​ค่อย ๆ แทรกซึม​เข้า​สู่​ร่างกาย',
    background: '/background/quiz/shallowcoral/background.webp',
    sound: '/audio/score for interactive project.mp3',
    decorationFrames: [
      '/background/quiz/shallowcoral/whale1.webp',
      '/background/quiz/shallowcoral/whale2.webp',
    ],
    decorationMotion: 'glide',
  },
  {
    id: 'q2',
    question:
      'ท่ามกลาง​ความ​มืด​ที่​กำลัง​โอบ​ล้อม​นั้น คุณ​รู้สึก​ได้​ว่า​พลัง​ใน​ตัว​เอง​กำลัง​ร่อย​หรอ​ลง​ไป คุณ​จึง​เลือก​เติม​พลัง​ให้​ตัว​เอง​ผ่าน​การ...',
    backgroundColor: '#184b5c',
    background: [
      '/background/intro/background1.webp',
      '/background/intro/background2.webp',
      '/background/intro/background3.webp',
    ],
    sound: '/audio/score for interactive project.mp3',
    options: [
      { letter: 'A', prefix: 'ว่าย​หา​แสง​สว่าง', label: 'มอง​หา​เพื่อน​ร่วม​ทาง พูด​คุย​ระบาย​ความ​รู้สึก และ​เติม​พลัง​จาก​การ​ได้​อยู่​กับ​ผู้คน​รอบ​ตัว' },
      { letter: 'B', prefix: 'ว่าย​หาความ​อบอุ่น', label: 'ปลอบโยน​ตัว​เอง​ผ่าน​การ​ดูแล​ใคร​สัก​คน หรือ​ซึมซับ​ความ​อ่อน​โยน​จาก​คน​ที่รัก' },
      { letter: 'C', prefix: 'สำรวจ​สิ่ง​แปลก​ใหม่', label: 'เบี่ยง​เบน​ความ​สนใจ​ด้วย​การ​ค้นหา​ปริศนา​หรือ​สิ่ง​ใหม่ ๆ ที่​น่า​ตื่น​เต้น' },
      { letter: 'D', prefix: 'ดำ​ดิ่ง​สู่​ความ​ลึก', label: 'ถอย​กลับ​ไป​ยัง​มุม​สงบ​เงียบ เพื่อ​ทบทวน​ความ​รู้สึก​ของ​ตัว​เอง​ตาม​ลำพัง' },
      { letter: 'E', prefix: 'กลับ​สู่​ชายฝั่ง', label: 'หัน​กลับ​ไป​หาความ​คุ้น​เคย จัด​ระเบียบ​ชีวิต​และ​สิ่ง​รอบ​ตัว เพื่อ​ให้​รู้สึก​ควบคุม​ทุก​อย่าง​ได้​อีก​ครั้ง' },
    ],
    navigation: 'button',
  },

  {
    id: 'investigation-3',
    navigation: 'tap-anywhere',
    question: 'จู่ ๆ กระแส​น้ำ​ก็​เปลี่ยน​ทิศ\n เสียง​คำราม​ของ​คลื่นใต้น้ำ​กึกก้อง​ไป​ทั่ว',
    background: [
      '/background/quiz/hurricane/1.webp',
      '/background/quiz/hurricane/2.webp',
      '/background/quiz/hurricane/3.webp',
      '/background/quiz/hurricane/4.webp',

    ],
    sound: '/audio/score for interactive project.mp3',
    flashTransition: 'black',
  },
  {
    id: 'investigation-hurricane',
    navigation: 'tap-anywhere',
    question: ' ความ​สงบ​ถูก​แทนที่​ด้วย​ความ​ปั่น​ป่วน เพื่อน​ร่วม​ทาง​ของ​คุณ​เริ่ม​ปะทะ​กัน​ด้วย​ถ้อยคำ​และ​อารมณ์',
    background: [
      '/background/quiz/hurricane/1.webp',
      '/background/quiz/hurricane/2.webp',
      '/background/quiz/hurricane/3.webp',
      '/background/quiz/hurricane/4.webp',

    ],
    sound: '/audio/score for interactive project.mp3',
  },
  {
    id: 'q3',
    question:
      'ท่ามกลาง​เกลียว​คลื่น​ที่​หมุน​วน​อย่าง​บ้า​คลั่ง​นั้น\n ปฏิ​กิร​ยา​แรก​ของ​คุณ​คือ',
    backgroundColor: '#164252',
    background: '/background/quiz/deepcoral/background.webp',
    sound: '/audio/score for interactive project.mp3',
    options: [
      { letter: 'A', prefix: 'กระโดด​ข้าม​คลื่น', label: 'ใช้​อารมณ์​ขัน​หรือ​เสียง​หัวเราะ เปลี่ยน​บรรยากาศ​ให้​กลับ​มา​ผ่อน​คลาย​โดย​เร็ว' },
      { letter: 'B', prefix: 'ยอม​ไป​ตาม​กระแส​น้ำ', label: 'รับ​แรง​กระแทก​ไว้​เอง หรือ​เลือก​เงียบ​เพื่อ​หลีก​เลี่ยง​ไม่​ให้​ใคร​ต้อง​เจ็บ​ปวด' },
      { letter: 'C', prefix: 'สังเกต​ทิศทาง​น้ำ', label: 'หยุด​คิด วิเคราะห์​ต้นตอ​ของ​ปัญหา เพื่อ​หา​ทางออก​ที่​เหมาะ​สม' },
      { letter: 'D', prefix: 'หา​ที่​กำบัง​ที่​ปลอดภัย', label: 'สร้าง​เกราะ​ป้องกัน​ตัว​เอง​ทันที เพราะ​ความ​ขัด​แย้ง​นี้​ทำให้​รู้สึก​ไม่​ปลอดภัย' },
      { letter: 'E', prefix: 'ยึด​หลัก​ถ่วง​สมอ', label: 'ยึด​มั่น​ใน​หลัก​การ​และ​สิ่ง​ที่​ถูก​ต้อง เพื่อ​พา​ทุก​คน​กลับ​เข้า​สู่​เส้น​ทาง​ที่​ควร​เป็น' },
    ],
    navigation: 'button',
  },
  {
    id: 'investigation-deepcoral',
    navigation: 'tap-anywhere',
    question: 'กระแส​น้ำ​พัด​พา​คุณ​ไป​ไกล​เกิน​กว่า​ที่​เคย​รู้จัก เมื่อ​คุณ​ลืมตา​ขึ้น​อีก​ครั้ง โลก​ที่​อยู่​ตรง​หน้า​กลับ​ไม่ใช่​ที่​เดิม​อีก​ต่อ​ไป',
    background: '/background/quiz/deepcoral/background.webp',
    sound: '/audio/score for interactive project.mp3',
    decorationFrames: [
      '/background/quiz/deepcoral/whale1.webp',
      '/background/quiz/deepcoral/whale2.webp',
    ],
    decorationMotion: 'bob',
  },
  {
    id: 'q4',
    question:
      ' ทุก​อย่าง​ดู​แปลก​ตา เงียบ​งัน และ​เต็ม​ไป​ด้วย​ความ​ไม่​แน่นอน หัวใจ​ของ​คุณ​จะ​รู้สึก...',
    backgroundColor: '#133948',
    background: '/background/quiz/deepcoral/background.webp',
    sound: '/audio/score for interactive project.mp3',
    options: [
      { letter: 'A', prefix: 'ตื่น​เต้น​กระปรี้กระเปร่า', label: 'รัก​ความ​ไม่​แน่นอน​นี้ โลก​ใหม่​หมาย​ถึง​โอกาส​และ​การ​ผจญ​ภัย' },
      { letter: 'B', prefix: 'สงบ​นิ่ง​ยอมรับ', label: 'แค่​มี​คน​ที่รัก​อยู่​ข้าง ๆ ก็​พร้อม​จะ​ไป​ทุก​ที่' },
      { letter: 'C', prefix: 'อยาก​รู้​อยาก​เห็น', label: 'เริ่ม​สำรวจ​ความ​เป็น​ไป​ได้ และ​อยาก​เข้าใจ​โลก​ใหม่​นี้​มาก​ขึ้น' },
      { letter: 'D', prefix: 'หวาดหวั่น', label: 'เฝ้า​ระวัง​เป็น​พิเศษ คอย​มอง​หา​ภัย​ที่​อาจ​ซ่อน​อยู่' },
      { letter: 'E', prefix: 'ต่อ​ต้าน​และ​โหย​หา​อดีต', label: 'รู้สึก​สูญ​เสีย และ​พยายาม​หา​ทาง​กลับ​ไป​สู่​เส้น​ทาง​เดิม' },
    ],
    navigation: 'button',
  },
  {
    id: 'investigation-4',
    navigation: 'tap-anywhere',
    question: 'คุณ​ว่าย​เข้า​สู่​ถ้ำ​ใต้​ทะเล​ที่​เงียบ​งัน มี​เพียง​เสียง​ลม​หายใจ​ของ​ตัว​เอง',
    background: [
      '/background/quiz/cave/1.webp',
      '/background/quiz/cave/2.webp',
    ],
    sound: '/audio/score for interactive project.mp3',
    flashTransition: 'black',
  },

  {
    id: 'q5',
    question:
      'ใน​ความ​นิ่ง​เงียบ​นั้น ความ​คิด​ของ​คุณ​ค่อย ๆ ลอย​ขึ้น​มา​จาก​ก้น​บึ้ง​ของ​จิตใจ วน​เวียน​อยู่​กับ...',
    backgroundColor: '#10303e',
    background: [
      '/background/quiz/cave/1.webp',
      '/background/quiz/cave/2.webp',
    ],
    sound: '/audio/score for interactive project.mp3',
    options: [
      { letter: 'A', prefix: 'ภาพ​แห่ง​ความ​สุข', label: '"พรุ่ง​นี้​จะ​ทำ​อะไร​ดี" "จะ​ชวน​ใคร​ไป​ไหม" และ​ภาพ​จำ​เสียง​หัวเราะ' },
      { letter: 'B', prefix: 'ความ​ห่วงใย​ผู้​อื่น', label: '"คน​อื่น​จะ​เป็น​ยัง​ไง​บ้าง​นะ" "เรา​จะ​ดูแล​พวก​เขา​ได้​ดี​ขึ้น​ไหม"' },
      { letter: 'C', prefix: 'แรง​บันดาล​ใจ​ไม่​สิ้น​สุด', label: 'ความ​คิด​สร้างสรรค์​และ​ไอ​เดีย​ใหม่ ๆ ที่​ผุด​ขึ้น​ไม่​หยุด' },
      { letter: 'D', prefix: 'การ​ทบทวน​ตัว​เอง', label: '"เรา​ได้​ทำ​อะไร​ผิด​ไป​ไหม​นะ" "ตอน​นี้​ปลอดภัย​ดี​หรือ​เปล่า"' },
      { letter: 'E', prefix: 'หน้าที่​และ​เป้า​หมาย', label: '"ตอน​นี้​เรา​ไป​ถึง​ไหน​แล้ว" "เรา​ยัง​เป็น​คน​ที่​พึ่งพา​ได้​ไหม"' },
    ],
    navigation: 'button',
  },
  {
    id: 'investigation-5',
    navigation: 'tap-anywhere',
    question: 'ที่​ก้น​ถ้ำ​ลึก​ลง​ไป คุณ​พบ​หีบ​สมบัติ​ใบ​ใหญ่',
    background: [
      '/background/quiz/cave/1.webp',
      '/background/quiz/cave/2.webp',
    ],
    sound: '/audio/score for interactive project.mp3',
    flashTransition: 'black',
  },
  {
    id: 'q6',
    question:
      'เมื่อ​เปิด​มัน​ออก สิ่ง​ที่​อยู่​ภายใน​ไม่ใช่​ทองคำ​หรือ​อัญมณี แต่​มัน​เก็บ​สิ่ง​ล้ำค่า​ที่สุด​ใน​ชีวิต​คุณ ที่​คุณ​จะ​ปกป้อง​ไว้​ไม่​ว่า​อะไร​จะ​เกิด​ขึ้น สิ่ง​นั้น​คือ...',
    backgroundColor: '#0c2734',
    background: [
      '/background/quiz/cave/1.webp',
      '/background/quiz/cave/2.webp',
    ],
    sound: '/audio/score for interactive project.mp3',
    options: [
      { letter: 'A', prefix: 'มิตรภาพ', label: 'การ​ได้​เป็น​ส่วน​หนึ่ง และ​เชื่อม​โยง​กับ​ผู้​อื่น' },
      { letter: 'B', prefix: 'ความ​เมตตา', label: 'โลก​ที่​อ่อน​โยน ปราศจาก​ความ​โหด​ร้าย' },
      { letter: 'C', prefix: 'อิสรภาพ', label: 'การ​ได้​คิด ฝัน และ​เป็น​ตัว​ของ​ตัว​เอง' },
      { letter: 'D', prefix: 'ความ​ปลอดภัย', label: 'พื้นที่​ที่​สามารถ​วางใจ​ได้​อย่าง​แท้จริง' },
      { letter: 'E', prefix: 'ความ​ซื่อสัตย์​ถูก​ต้อง', label: 'การ​ยืน​หยัด​ใน​สิ่ง​ที่​ถูก​ต้อง​และ​รักษา​คำมั่น​สัญญา' },
    ],
    navigation: 'button',
  },
]

/** นับตัวอักษรคำตอบ แล้วคืนค่าสัตว์ที่ถูกเลือกบ่อยที่สุด (กรณีเสมอกันให้ยึดตัวอักษรที่มาก่อน) */
export function scoreQuiz(letters: QuizOption['letter'][]): AnimalKey {
  const counts: Record<string, number> = {}
  for (const l of letters) counts[l] = (counts[l] ?? 0) + 1
  const order: QuizOption['letter'][] = ['A', 'B', 'C', 'D', 'E']
  let best = order[0]
  let bestCount = -1
  for (const letter of order) {
    const c = counts[letter] ?? 0
    if (c > bestCount) {
      bestCount = c
      best = letter
    }
  }
  return letterToAnimal[best]
}