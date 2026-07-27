// แบบทดสอบเชิงข้อมูล "คุณคือสัตว์ทะเลชนิดใด"
// แต่ละตัวเลือกจะมีตัวอักษรกำกับสัตว์ ผลลัพธ์คือตัวอักษรที่ถูกเลือกบ่อยที่สุด
import type { StoryPageData } from '@/lib/story'
export type AnimalKey = 'dolphin' | 'dugong' | 'octopus' | 'pufferfish' | 'sea-turtle'

export interface QuizOption {
  /** ตัวอักษรคำตอบ A–E ที่จับคู่กับสัตว์ผ่าน `letterToAnimal` */
  letter: 'A' | 'B' | 'C' | 'D' | 'E'
  label: string
}

export interface QuizQuestion {
  id: string
  navigation: 'button'
  question: string
  backgroundColor: string
  background: string | string[]
  sound: string
  options: QuizOption[]
  /** ถ้ามีค่า จะแฟลชสีนี้ตอนเปลี่ยนมาหน้านี้ ถ้าไม่ใส่ = ไม่มีทรานซิชัน */
  flashTransition?: 'black' | 'white'
}

export interface ChapterBreak {
  id: string
  navigation: 'tap-anywhere'
  question: string
  background: string | string[]
  sound: string
  flashTransition?: 'black' | 'white'
}

export type QuizPageData = QuizQuestion | ChapterBreak

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
  B: 'dugong',
  C: 'octopus',
  D: 'pufferfish',
  E: 'sea-turtle',
}

export const animals: Record<AnimalKey, AnimalResult> = {
  dolphin: {
    key: 'dolphin',
    name: 'โลมา',
    tagline: 'ผู้เชื่อมความสัมพันธ์ที่ร่าเริง',
    description:
      'คุณเติมพลังผ่านผู้คนและความสนุกสนาน ความอบอุ่นของคุณทำให้บรรยากาศรอบตัวสดใสขึ้น และสัญชาตญาณที่คอยห่วงใยคนรอบข้างคือพลังเงียบ ๆ ของคุณ',
    iconColor: '#4bb3c9',
  },
  dugong: {
    key: 'dugong',
    name: 'พะยูน',
    tagline: 'ผู้แทะเล็มอย่างอ่อนโยน',
    description:
      'ช้า มั่นคง และไม่หวั่นไหวต่อความเร่งรีบ คุณพบความสงบในกิจวัตรง่าย ๆ และปกป้องความสงบสุขของตัวเองโดยไม่ต้องขอโทษใคร',
    iconColor: '#7a9a7e',
  },
  octopus: {
    key: 'octopus',
    name: 'หมึกยักษ์',
    tagline: 'นักปรับตัวผู้ชาญฉลาด',
    description:
      'ช่างสงสัยและรู้จักพลิกแพลง คุณค่อย ๆ คลำทางผ่านความเปลี่ยนแปลง คุณประมวลผลสิ่งต่าง ๆ มากมายอยู่ภายในก่อนจะแสดงมันออกมา',
    iconColor: '#b06a8f',
  },
  pufferfish: {
    key: 'pufferfish',
    name: 'ปลาปักเป้า',
    tagline: 'ผู้พิทักษ์หัวใจอ่อนโยน',
    description:
      'คุณรู้สึกลึกซึ้งและตั้งขอบเขตเมื่อจำเป็น ภายใต้เกราะป้องกันนั้นคือหัวใจที่อ่อนโยนและซื่อสัตย์',
    iconColor: '#c9a24b',
  },
  'sea-turtle': {
    key: 'sea-turtle',
    name: 'เต่าทะเล',
    tagline: 'ผู้เดินทางที่หนักแน่น',
    description:
      'อดทนและพึ่งพาตัวเองได้ คุณเดินตามจังหวะของตัวเองและเชื่อมั่นในการเดินทางระยะไกล ไม่ว่าจะอยู่ที่ไหน คุณก็พกพาความรู้สึกเป็นบ้านติดตัวไปด้วยเสมอ',
    iconColor: '#5b8f74',
  },
}

export const quizQuestions: QuizPageData[] = [
  {
    id: 'investigation-1',
    navigation: 'tap-anywhere',
    question: 'บทที่ 1: การสืบสวน',
    background: '/background/investigation/01.PNG',
    sound: '',
  },
  {
    id: 'investigation-1',
    navigation: 'tap-anywhere',
    question: 'บทที่ 1: การสืบสวน',
    background: '/background/investigation/01.PNG',
    sound: '',
  },
  {
    id: 'q1',
    question:
      'ณ ชายฝั่งที่เต็มไปด้วยเม็ดทรายสีเหลืองนวล ทะเลเป็นประกายจากแสงแดด เสียงคลื่นกระทบฝั่งเป็นจังหวะ คุณนั่งมองไปที่ชายหาดที่เต็มไปด้วยผู้คนมากมายที่ต่างก็มีประสบการณ์ชีวิตและบุคลิกภาพ เมื่อคุณมองมาที่ตัวคุณ คนอื่นมักมองคุณเป็น...',
    backgroundColor: '#1a5566',
    background: '/public/background/intro/02.PNG',
    sound: '',
    options: [
      { letter: 'A', label: 'ผู้เชื่อมความสัมพันธ์ - เต็มเปี่ยมด้วยพลังงาน สร้างความสดใส ความร่าเริง' },
      { letter: 'B', label: 'ผู้สร้างความกลมเกลียว - ให้ความอบอุ่น ความเห็นอกเห็นใจ' },
      { letter: 'C', label: 'นักสร้างสรรค์ - ช่างคิด ช่างสงสัย มีความเป็นศิลปินสูง' },
      { letter: 'D', label: 'ผู้ช่างสังเกต - ตื่นตัวอยู่ตลอด ระมัดระวัง ใส่ใจผู้อื่นเสมอ' },
      { letter: 'E', label: 'คนเจ้าระเบียบ - มุ่งมั่น ไม่หวั่นไหว มีวินัย และมีความละเอียด' },
    ],
    navigation: 'button',
  },
  {
    id: 'q2',
    question:
      'คุณค่อย ๆ ว่ายน้ำออกจากชายฝั่งที่คุ้นเคย ทิ้งผืนทรายและเสียงคลื่นไว้เบื้องหลัง ยิ่งดำดิ่งลงไป แสงอาทิตย์ก็ยิ่งจางหาย ราวกับถูกกลืนกินโดยผืนน้ำอันกว้างใหญ่ ความเย็นค่อย ๆ แทรกซึมเข้าสู่ร่างกาย ท่ามกลางความมืดที่กำลังโอบล้อมนั้น คุณรู้สึกได้ว่าพลังในตัวเองกำลังร่อยหรอลงไป คุณจึงเลือกเติมพลังให้ตัวเองผ่านการ...',
    backgroundColor: '#184b5c',
    background: '/public/background/intro/background%201.PNG',
    sound: '',
    options: [
      { letter: 'A', label: 'ว่ายหาแสงสว่าง - มองหาเพื่อนร่วมทาง พูดคุยระบายความรู้สึก และเติมพลังจากการได้อยู่กับผู้คนรอบตัว' },
      { letter: 'B', label: 'ว่ายหาความอบอุ่น - ปลอบโยนตัวเองผ่านการดูแลใครสักคน หรือซึมซับความอ่อนโยนจากคนที่รัก' },
      { letter: 'C', label: 'ดำดิ่งสู่ความลึก - ถอยกลับไปยังมุมสงบเงียบ เพื่อทบทวนความรู้สึกของตัวเองตามลำพัง' },
      { letter: 'D', label: 'สำรวจสิ่งแปลกใหม่ - เบี่ยงเบนความสนใจด้วยการค้นหาปริศนาหรือสิ่งใหม่ ๆ ที่น่าตื่นเต้น' },
      { letter: 'E', label: 'กลับสู่ชายฝั่ง - หันกลับไปหาความคุ้นเคย จัดระเบียบชีวิตและสิ่งรอบตัว เพื่อให้รู้สึกควบคุมทุกอย่างได้อีกครั้ง' },
    ],
    navigation: 'button',
  },

  {
    id: 'investigation-1',
    navigation: 'tap-anywhere',
    question: 'mflv[4kr',
    background: [
      '/background/hurricane/1.PNG',
      '/background/hurricane/2.PNG',
      '/background/hurricane/3.PNG',
      '/background/hurricane/4.PNG',

    ],
    sound: '',
  },
  {
    id: 'q3',
    question:
      'จู่ ๆ กระแสน้ำก็เปลี่ยนทิศ เสียงคำรามของคลื่นใต้น้ำกึกก้องไปทั่ว ความสงบถูกแทนที่ด้วยความปั่นป่วน เพื่อนร่วมทางของคุณเริ่มปะทะกันด้วยถ้อยคำและอารมณ์ ท่ามกลางเกลียวคลื่นที่หมุนวนอย่างบ้าคลั่งนั้น ปฏิกิริยาแรกของคุณคือ...',
    backgroundColor: '#164252',
    background: '/public/background/intro/background%202.PNG',
    sound: '',
    options: [
      { letter: 'A', label: 'กระโดดข้ามคลื่น - ใช้อารมณ์ขันหรือเสียงหัวเราะ เปลี่ยนบรรยากาศให้กลับมาผ่อนคลายโดยเร็ว' },
      { letter: 'B', label: 'ยอมไปตามกระแสน้ำ - รับแรงกระแทกไว้เอง หรือเลือกเงียบเพื่อหลีกเลี่ยงไม่ให้ใครต้องเจ็บปวด' },
      { letter: 'C', label: 'หาที่กำบังที่ปลอดภัย - สร้างเกราะป้องกันตัวเองทันที เพราะความขัดแย้งนี้ทำให้รู้สึกไม่ปลอดภัย' },
      { letter: 'D', label: 'สังเกตทิศทางน้ำ - หยุดคิด วิเคราะห์ต้นตอของปัญหา เพื่อหาทางออกที่เหมาะสม' },
      { letter: 'E', label: 'ยึดหลักถ่วงสมอ - ยึดมั่นในหลักการและสิ่งที่ถูกต้อง เพื่อพาทุกคนกลับเข้าสู่เส้นทางที่ควรเป็น' },
    ],
    navigation: 'button',
  },
  {
    id: 'q4',
    question:
      'กระแสน้ำพัดพาคุณไปไกลเกินกว่าที่เคยรู้จัก เมื่อคุณลืมตาขึ้นอีกครั้ง โลกที่อยู่ตรงหน้ากลับไม่ใช่ที่เดิมอีกต่อไป ทุกอย่างดูแปลกตา เงียบงัน และเต็มไปด้วยความไม่แน่นอน หัวใจของคุณจะรู้สึก...',
    backgroundColor: '#133948',
    background: '/public/background/intro/01.PNG',
    sound: '',
    options: [
      { letter: 'A', label: 'ตื่นเต้นกระปรี้กระเปร่า - รักความไม่แน่นอนนี้ โลกใหม่หมายถึงโอกาสและการผจญภัย' },
      { letter: 'B', label: 'สงบนิ่งยอมรับ - แค่มีคนที่รักอยู่ข้าง ๆ ก็พร้อมจะไปทุกที่' },
      { letter: 'C', label: 'หวาดหวั่น - เฝ้าระวังเป็นพิเศษ คอยมองหาภัยที่อาจซ่อนอยู่' },
      { letter: 'D', label: 'อยากรู้อยากเห็น - เริ่มสำรวจความเป็นไปได้ และอยากเข้าใจโลกใหม่นี้มากขึ้น' },
      { letter: 'E', label: 'ต่อต้านและโหยหาอดีต - รู้สึกสูญเสีย และพยายามหาทางกลับไปสู่เส้นทางเดิม' },
    ],
    navigation: 'button',
  },
  {
    id: 'investigation-1',
    navigation: 'tap-anywhere',
    question: 'บทที่ 1: การสืบสวน',
    background: '/background/investigation/01.PNG',
    sound: '',
  },
  {
    id: 'q5',
    question:
      'คุณว่ายเข้าสู่ถ้ำใต้ทะเลที่เงียบงัน มีเพียงเสียงลมหายใจของตัวเอง ในความนิ่งเงียบนั้น ความคิดของคุณค่อย ๆ ลอยขึ้นมาจากก้นบึ้งของจิตใจ วนเวียนอยู่กับ...',
    backgroundColor: '#10303e',
    background: '/public/background/intro/background%203.PNG',
    sound: '',
    options: [
      { letter: 'A', label: 'ภาพแห่งความสุข - "พรุ่งนี้จะทำอะไรดี" "จะชวนใครไปไหม" และภาพจำเสียงหัวเราะ' },
      { letter: 'B', label: 'ความห่วงใยผู้อื่น - "คนอื่นจะเป็นยังไงบ้างนะ" "เราจะดูแลพวกเขาได้ดีขึ้นไหม"' },
      { letter: 'C', label: 'การทบทวนตัวเอง - "เราได้ทำอะไรผิดไปไหมนะ" "ตอนนี้ปลอดภัยดีหรือเปล่า"' },
      { letter: 'D', label: 'แรงบันดาลใจไม่สิ้นสุด - ความคิดสร้างสรรค์และไอเดียใหม่ ๆ ที่ผุดขึ้นไม่หยุด' },
      { letter: 'E', label: 'หน้าที่และเป้าหมาย - "ตอนนี้เราไปถึงไหนแล้ว" "เรายังเป็นคนที่พึ่งพาได้ไหม"' },
    ],
    navigation: 'button',
  },
  {
    id: 'q6',
    question:
      'ที่ก้นถ้ำลึกลงไป คุณพบหีบสมบัติใบใหญ่ เมื่อเปิดมันออก สิ่งที่อยู่ภายในไม่ใช่ทองคำหรืออัญมณี แต่มันเก็บสิ่งล้ำค่าที่สุดในชีวิตคุณ ที่คุณจะปกป้องไว้ไม่ว่าอะไรจะเกิดขึ้น สิ่งนั้นคือ...',
    backgroundColor: '#0c2734',
    background: '/public/background/intro/02.PNG',
    sound: '',
    options: [
      { letter: 'A', label: 'มิตรภาพ - การได้เป็นส่วนหนึ่ง และเชื่อมโยงกับผู้อื่น' },
      { letter: 'B', label: 'ความเมตตา - โลกที่อ่อนโยน ปราศจากความโหดร้าย' },
      { letter: 'C', label: 'ความปลอดภัย - พื้นที่ที่สามารถวางใจได้อย่างแท้จริง' },
      { letter: 'D', label: 'อิสรภาพ - การได้คิด ฝัน และเป็นตัวของตัวเอง' },
      { letter: 'E', label: 'ความซื่อสัตย์ถูกต้อง - การยืนหยัดในสิ่งที่ถูกต้องและรักษาคำมั่นสัญญา' },
    ],
    navigation: 'button',
  },
  {
    id: 'investigation-1',
    navigation: 'tap-anywhere',
    question: 'flashblack testqqq',
    background: '/background/investigation/01.PNG',
    sound: '',
    flashTransition:'black',
  },
  {
    id: 'investigation-1',
    navigation: 'tap-anywhere',
    question: 'เป็นของสำคัญที่คุณต้องการหรือไม่',
    background: '/background/investigation/01.PNG',
    sound: '',
  }
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