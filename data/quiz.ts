// แบบทดสอบเชิงข้อมูล "คุณคือสัตว์ทะเลชนิดใด"
// แต่ละตัวเลือกจะมีตัวอักษรกำกับสัตว์ ผลลัพธ์คือตัวอักษรที่ถูกเลือกบ่อยที่สุด
import type { StoryPageData } from '@/lib/story'
export type AnimalKey = 'dolphin' | 'seal' | 'octopus' | 'pufferfish' | 'sea-turtle'

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

export interface QuizTabPage {
  id: string
  navigation: 'tap-anywhere'
  question: string
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
}

export const animals: Record<AnimalKey, AnimalResult> = {
  dolphin: {
    key: 'dolphin',
    name: 'โลมา',
    tagline: 'ผู้เชื่อมความสัมพันธ์ที่ร่าเริง',
    description:
      'คุณคือตัวโจ๊กของกลุ่มเพื่อน พลังงานคุณเยอะมาก เปรียบได้กับโลมาที่ชอบกระโดดฝ่าเกลียวคลื่นไปทั้งวัน คุณเฉิดฉายเมื่อได้อยู่กับผู้คน ดั่งโลมาที่ชอบอยู่เป็นฝูง คุณทนเห็นเพื่อนคุณไปสังสรรค์กันโดยไม่มีคุณไม่ได้เพราะคุณมี FOMO หรือ fear of missing out แต่ถึงกระนั้นคุณคือนักพูดที่ยอดเยี่ยม เป็นผู้นำได้ดี และเพื่อน ๆ ต่างเห็นตรงกันว่าคุณคือเพื่อนที่จริงใจ',
    quote: 'Stillness is not an empty space; it is where your deepest self is found.',
    vibes: 'พลังงานล้นเหลือ ร่าเริง และมักเป็นจุดสนใจ ช่วยนำความสนุกมาสู่ทุกการรวมตัว',
    behaviorHabitat:
      'มักพบกระโดดฝ่าเกลียวคลื่นในผืนน้ำชายฝั่ง เดินทางเป็นฝูง ชื่นชอบการสื่อสาร การปฏิสัมพันธ์ทางสังคม และการทำกิจกรรมร่วมกัน น้อยครั้งที่จะพบเห็นอยู่ตามลำพัง',
    strength:
      'สื่อสารได้ยอดเยี่ยม มีความกระตือรือร้นสูง เป็นผู้นำโดยธรรมชาติที่สามารถรวมใจคนในทีมได้ และเป็นเพื่อนที่ซื่อสัตย์',
    weakness:
      'มักกลัวการตกกระแส (FOMO) เบื่อง่ายกับกิจวัตรประจำวัน ลำบากใจเมื่อต้องทำงานคนเดียวหรือต้องใช้สมาธิขั้นสูง และบางครั้งก็ทำให้ตัวเองเหนื่อยล้าจากการพยายามทำให้บรรยากาศสนุกอยู่ตลอดเวลา',
    iconColor: '#4bb3c9',
    background: '/background/quiz/character/dolphin/background.webp',
    animal: '/background/quiz/character/dolphin/animal.webp',
    animationType: 'zoom',
  },
  seal: {
    key: 'seal',
    name: 'แมวน้ำ',
    tagline: 'ผู้อ่อนโยนแห่งท้องทะเล',
    description:
      'คุณเป็นคนอบอุ่น รักสันติ เหมือนกับแมวน้ำที่ว่ายน้ำอย่างสงบสุขขึ้นมานอนตาแป๊วอยู่บนฝั่ง แต่การเป็นคนเห็นใจผู้อื่นก็อาจทำให้คุณกำหนดขอบเขตตนเองไม่ได้จนอาจถูกเอาเปรียบง่าย การฝึกทักษะปฏิเสธจึงสำคัญสำหรับคุณ ถึงกระนั้นคุณคือคนน่ารัก มีเมตตา เป็นสายซัพพอร์ตที่ดี เป็นที่พักพิงให้เพื่อน ๆ และคนรัก เหมือนแมวน้ำอุ๋ง ๆ ที่ใคร ๆ ก็เอ็นดูอยู่ตลอด',
    quote: 'Protecting your own peace is never a betrayal of others.',
    vibes:
      'อบอุ่น ประโลมใจ ใช้ชีวิตอย่างช้า ๆ และมีความเห็นอกเห็นใจผู้อื่นอย่างลึกซึ้ง ให้ความรู้สึกเหมือนอ้อมกอดที่อบอุ่น',
    behaviorHabitat:
      'แหวกว่ายอย่างสงบสุขไปตามชายฝั่งและโขดหินริมทะเล ชอบขึ้นมานอนผึ่งแดดเป็นกลุ่มกับเพื่อนพ้อง หลีกเลี่ยงความขัดแย้งตามธรรมชาติ ชอบที่จะอยู่ร่วมกับสิ่งรอบตัวอย่างเงียบ ๆ',
    strength:
      'มีความเมตตากรุณาสูง คอยสนับสนุนผู้อื่นได้ดี และเป็นผู้ฟังที่ยอดเยี่ยม ช่วยนำความกลมเกลียวและความรู้สึกปลอดภัยทางใจมาสู่ทุกกลุ่มที่อยู่ด้วย',
    weakness:
      'ประสบปัญหาในการกำหนดขอบเขตในความพยายามที่จะรักษาความสันติ หลีกเลี่ยงการเผชิญหน้าที่จำเป็น มักซึมซับความเครียดของผู้อื่น และปล่อยให้ถูกเอาเปรียบได้ง่าย',
    iconColor: '#7a9a7e',
    background: '/background/quiz/character/seal/background.webp',
    animal: '/background/quiz/character/seal/animal.webp',
    decoration: '/background/quiz/character/seal/decoration.webp',
    animationType: 'float',
  },
  octopus: {
    key: 'octopus',
    name: 'หมึกยักษ์',
    tagline: 'นักปรับตัวผู้ชาญฉลาด',
    description:
      'คุณคือพวกติส ๆ มีความคิดเป็นของตัวเอง สงสัยในทุกอย่าง สำรวจสิ่งต่าง ๆ ไปหมด ดั่งหมึกยักษ์ที่ชอบอยู่ตามแนวปะการังที่ซับซ้อน ชอบยื่นหนวดไปหยิบจับสิ่งต่าง ๆ รอบตัว การที่มีไอเดียในหัวเป็นล้านอย่าง ทำให้คุณมีความคิดสร้างสรรค์ แต่ขณะเดียวกันก็เป็นอุปสรรคในการลงมือทำสิ่งใดสิ่งหนึ่ง ถึงกระนั้นคุณคือฮีโร่ของผู้คนในการแก้ปัญหา เพราะคุณเป็นคนคิดนอกกรอบและมักมีไอเดียที่คนอื่นมองข้ามเสมอ',
    quote:
      'Your brilliant mind can open any door, but your heart must eventually choose one room to stay in.',
    vibes: 'ลึกลับ มีความเป็นศิลปิน ช่างสงสัยใคร่รู้ และคิดนอกกรอบ เป็นนักคิดหัวก้าวหน้า',
    behaviorHabitat:
      'พบได้ตามแนวปะการังที่ซับซ้อนและรอยแยกในทะเลลึก ชอบสำรวจสิ่งต่างๆ หยิบจับดัดแปลงสิ่งรอบตัว และเปลี่ยนสีของตัวเองให้กลมกลืนตามสภาพแวดล้อม',
    strength:
      'มีความคิดริเริ่มสร้างสรรค์สูง เป็นนักแก้ปัญหาที่ดี และปรับตัวเก่ง คิดนอกกรอบและสามารถมองเห็นรูปแบบต่าง ๆ ที่คนอื่นมองข้ามไป',
    weakness:
      'มีแนวโน้มที่จะคิดมากเกินไปจนไม่กล้าตัดสินใจ มักถูกดึงดูดด้วยไอเดียใหม่ๆ ที่น่าตื่นเต้น ทำให้ยากที่จะทำสิ่งใดสิ่งหนึ่งให้เสร็จสมบูรณ์ อาจแยกตัวไปอยู่ในพื้นที่ของตัวเองเมื่อต้องใช้ความคิด',
    iconColor: '#b06a8f',
    background: '/background/quiz/character/octopus/background.webp',
    animal: '/background/quiz/character/octopus/animal.webp',
    decoration: '/background/quiz/character/octopus/decoration.webp',
    animationType: 'float',
  },
  pufferfish: {
    key: 'pufferfish',
    name: 'ปลาปักเป้า',
    tagline: 'ผู้พิทักษ์หัวใจอ่อนโยน',
    description:
      'คุณคือคนที่พร้อมบวกตลอด โดยเฉพาะเมื่อคุณหรือคนรักถูกคุกคาม เปรียบดั่งปลาปักเป้าที่ว่ายไปตามแนวปะการังอย่างระวังและพองตัวเมื่อมีอันตราย แต่การที่คุณอยู่ในโหมดไฟต์บ่อย ๆ ก็อาจทำให้คุณหนักใจได้ และอาจทำให้คุณเผลอผลักไสคนรอบตัวในช่วงที่ต้องการการปลอบโยน ถึงกระนั้น คุณคือคนที่มีความฉลาดทางอารมณ์สูง มักตั้งรับปัญหาได้ดี และเพื่อน ๆ ของคุณต่างรู้สึกปลอดภัยเวลาที่ได้อยู่กับคุณ',
    quote: 'You do not need to carry the weight of the ocean to be safe within it.',
    vibes:
      'ตื่นตัว มีความรู้สึกที่ลึกซึ้ง ระมัดระวังตัว แต่ก็ดุดันเมื่อตนเองหรือคนที่รักถูกคุกคาม',
    behaviorHabitat:
      'ว่ายนำทางไปตามแนวปะการังด้วยความแม่นยำและระมัดระวัง ซึมซับทุกรายละเอียดของสภาพแวดล้อม และจะพองตัวทันทีเพื่อปกป้องตัวเอง เมื่อรู้สึกว่าบรรยากาศไม่สู้ดีหรือมีอันตรายเข้ามาใกล้',
    strength:
      'ช่างสังเกตและมีความฉลาดทางอารมณ์สูง มักจะคาดการณ์ปัญหาได้ก่อนที่จะเกิดขึ้น ใส่ใจในการสร้างสภาพแวดล้อมที่ปลอดภัยและมั่นคงสำหรับตัวเองและผู้อื่น',
    weakness:
      'รู้สึกหนักใจได้ง่ายจากความเครียดและสิ่งรอบตัว มักมีปฏิกิริยาตอบสนองแรกเมื่อรู้สึกว่ามีความกังวลหรือไม่ปลอดภัย คือ การสร้างกำแพงป้องกัน ซึ่งอาจผลักไสผู้คนรอบตัวออกไป ในเวลาที่จริง ๆ แล้วต้องการการปลอบโยนมากที่สุด',
    iconColor: '#c9a24b',
    background: '/background/quiz/character/pufferfish/background.webp',
    animal: '/background/quiz/character/pufferfish/animal.webp',
    animationType: 'float',
  },
  'sea-turtle': {
    key: 'sea-turtle',
    name: 'เต่าทะเล',
    tagline: 'ผู้เดินทางที่หนักแน่น',
    description:
      'คุณคือพ่อพระแม่พระของกลุ่มเพื่อน นั่นเพราะคุณมีความเป็นผู้ใหญ่ ใจเย็น ไม่หวั่นไปตามกระแส ดั่งเต่าทะเลที่ท่องมหาสมุทรตามเส้นทางด้วยจังหวะของตนเอง ความเข้มงวดของคุณทำให้ปรับตัวช้าและเครียดง่าย การลองเปิดใจมากขึ้นจึงเป็นสิ่งที่คุณอาจต้องฝึกฝน ถึงกระนั้นคุณคือที่พึ่งพาของเพื่อน ๆ และคุณคือคนที่ไม่ยอมถอยให้กับอุปสรรค ดั่งเต่าทะเลที่จะไม่ยอมหยุดว่ายจนกว่าจะถึงจุดหมายปลายทาง',
    quote: "The ocean's currents change, and so must we. There is beauty in the detour.",
    vibes: 'ใจเย็น มีปัญญา มุ่งมั่น และไม่หวั่นไหวไปตามกระแสความนิยมหรือผู้อื่น',
    behaviorHabitat:
      'ท่องมหาสมุทรโดยรักษาระยะจังหวะของตัวเองสำหรับการเดินทางที่ยาวนาน มีระบบระเบียบสูง วางแผนเส้นทางอย่างชัดเจน และจดจำเส้นทางการเดินทางได้เสมอ',
    strength:
      'พึ่งพาได้อย่างเหลือเชื่อ มีวินัย อดทน และใส่ใจในรายละเอียด หากตั้งเป้าหมายไว้ จะทำให้สำเร็จ ไม่ว่าจะต้องใช้เวลานานแค่ไหนก็ตาม',
    weakness:
      'อาจมีความเข้มงวดและตึงเครียดเกินไป เนื่องจากมักชอบทำตามแผนที่วางไว้ ทำให้ปรับตัวเข้ากับการเปลี่ยนแปลงกะทันหันได้ช้า ดื้อรั้นเมื่อถูกบังคับให้ออกนอกเส้นทางที่เลือกไว้',
    iconColor: '#5b8f74',
    background: '/background/quiz/character/turtle/background.webp',
    animal: '/background/quiz/character/turtle/animal.webp',
    decoration: '/background/quiz/character/turtle/decoration.webp',
    animationType: 'glide',
  },
}

export const quizQuestions: QuizPageData[] = [
  {
    id: 'investigation-1',
    navigation: 'tap-anywhere',
    question: 'ณ ชายฝั่งที่เต็มไปด้วยเม็ดทรายสีเหลืองนวล ทะเลเป็นประกายจากแสงแดด เสียงคลื่นกระทบฝั่งเป็นจังหวะ',
    background: [
      '/background/intro/background1.webp',
      '/background/intro/background2.webp',
      '/background/intro/background3.webp',
    ],
    sound: '',
    flashTransition: 'black',
  },
  {
    id: 'investigation-2',
    navigation: 'tap-anywhere',
    question: 'คุณค่อย ๆ ว่ายน้ำออกจากชายฝั่งที่คุ้นเคย ทิ้งผืนทรายและเสียงคลื่นไว้เบื้องหลัง',
    background: [
      '/background/intro/background1.webp',
      '/background/intro/background2.webp',
      '/background/intro/background3.webp',
    ],
    sound: '',
  },
  {
    id: 'investigation-2',
    navigation: 'tap-anywhere',
    question: '  คุณนั่งมองไปที่ชายหาดที่เต็มไปด้วยผู้คนมากมายที่ต่างก็ประสบการณ์ชีวิตและบุคลิกภาพ',
    background: [
      '/background/intro/background1.webp',
      '/background/intro/background2.webp',
      '/background/intro/background3.webp',
    ],
    sound: '',
  },
  {
    id: 'investigation-shallowcoral',
    navigation: 'tap-anywhere',
    question: 'ยิ่งดำดิ่งลงไป แสงอาทิตย์ก็ยิ่งจางหาย ราวกับถูกกลืนกินโดยผืนน้ำอันกว้างใหญ่ความเย็นค่อย ๆ แทรกซึมเข้าสู่ร่างกาย',
    background: '/background/quiz/shallowcoral/background.webp',
    sound: '',
    decorationFrames: [
      '/background/quiz/shallowcoral/whale1.webp',
      '/background/quiz/shallowcoral/whale2.webp',
    ],
    decorationMotion: 'glide',
  },
  {
    id: 'q1',
    question:
      'ณ ชายฝั่งที่เต็มไปด้วยเม็ดทรายสีเหลืองนวล ทะเลเป็นประกายจากแสงแดด เสียงคลื่นกระทบฝั่งเป็นจังหวะ คุณนั่งมองไปที่ชายหาดที่เต็มไปด้วยผู้คนมากมายที่ต่างก็มีประสบการณ์ชีวิตและบุคลิกภาพ เมื่อคุณมองมาที่ตัวคุณ คนอื่นมักมองคุณเป็น...',
    backgroundColor: '#1a5566',
    background: [
      '/background/intro/background1.webp',
      '/background/intro/background2.webp',
      '/background/intro/background3.webp',
    ],
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
    background: [
      '/background/intro/background1.webp',
      '/background/intro/background2.webp',
      '/background/intro/background3.webp',
    ],
    sound: '',
    options: [
      { letter: 'A', label: 'ว่ายหาแสงสว่าง - มองหาเพื่อนร่วมทาง พูดคุยระบายความรู้สึก และเติมพลังจากการได้อยู่กับผู้คนรอบตัว' },
      { letter: 'B', label: 'ว่ายหาความอบอุ่น - ปลอบโยนตัวเองผ่านการดูแลใครสักคน หรือซึมซับความอ่อนโยนจากคนที่รัก' },
      { letter: 'C', label: 'สำรวจสิ่งแปลกใหม่ - เบี่ยงเบนความสนใจด้วยการค้นหาปริศนาหรือสิ่งใหม่ ๆ ที่น่าตื่นเต้น' },
      { letter: 'D', label: 'ดำดิ่งสู่ความลึก - ถอยกลับไปยังมุมสงบเงียบ เพื่อทบทวนความรู้สึกของตัวเองตามลำพัง' },
      { letter: 'E', label: 'กลับสู่ชายฝั่ง - หันกลับไปหาความคุ้นเคย จัดระเบียบชีวิตและสิ่งรอบตัว เพื่อให้รู้สึกควบคุมทุกอย่างได้อีกครั้ง' },
    ],
    navigation: 'button',
  },

  {
    id: 'investigation-3',
    navigation: 'tap-anywhere',
    question: 'จู่ ๆ กระแสน้ำก็เปลี่ยนทิศ\n เสียงคำรามของคลื่นใต้น้ำกึกก้องไปทั่ว',
    background: [
      '/background/quiz/hurricane/1.webp',
      '/background/quiz/hurricane/2.webp',
      '/background/quiz/hurricane/3.webp',
      '/background/quiz/hurricane/4.webp',

    ],
    sound: '',
    flashTransition: 'black',
  },
  {
    id: 'investigation-hurricane',
    navigation: 'tap-anywhere',
    question: ' ความสงบถูกแทนที่ด้วยความปั่นป่วน เพื่อนร่วมทางของคุณเริ่มปะทะกันด้วยถ้อยคำและอารมณ์',
    background: [
      '/background/quiz/hurricane/1.webp',
      '/background/quiz/hurricane/2.webp',
      '/background/quiz/hurricane/3.webp',
      '/background/quiz/hurricane/4.webp',

    ],
    sound: '',
  },
  {
    id: 'investigation-deepcoral',
    navigation: 'tap-anywhere',
    question: 'กระแสน้ำพัดพาคุณไปไกลเกินกว่าที่เคยรู้จัก เมื่อคุณลืมตาขึ้นอีกครั้ง โลกที่อยู่ตรงหน้ากลับไม่ใช่ที่เดิมอีกต่อไป',
    background: '/background/quiz/deepcoral/background.webp',
    sound: '',
    decorationFrames: [
      '/background/quiz/deepcoral/whale1.webp',
      '/background/quiz/deepcoral/whale2.webp',
    ],
    decorationMotion: 'bob',
  },
  {
    id: 'q3',
    question:
      'ท่ามกลางเกลียวคลื่นที่หมุนวนอย่างบ้าคลั่งนั้น ปฏิกิรยาแรกของคุณคือ',
    backgroundColor: '#164252',
    background: '/background/quiz/deepcoral/background.webp',
    sound: '',
    options: [
      { letter: 'A', label: 'กระโดดข้ามคลื่น - ใช้อารมณ์ขันหรือเสียงหัวเราะ เปลี่ยนบรรยากาศให้กลับมาผ่อนคลายโดยเร็ว' },
      { letter: 'B', label: 'ยอมไปตามกระแสน้ำ - รับแรงกระแทกไว้เอง หรือเลือกเงียบเพื่อหลีกเลี่ยงไม่ให้ใครต้องเจ็บปวด' },
      { letter: 'C', label: 'สังเกตทิศทางน้ำ - หยุดคิด วิเคราะห์ต้นตอของปัญหา เพื่อหาทางออกที่เหมาะสม' },
      { letter: 'D', label: 'หาที่กำบังที่ปลอดภัย - สร้างเกราะป้องกันตัวเองทันที เพราะความขัดแย้งนี้ทำให้รู้สึกไม่ปลอดภัย' },
      { letter: 'E', label: 'ยึดหลักถ่วงสมอ - ยึดมั่นในหลักการและสิ่งที่ถูกต้อง เพื่อพาทุกคนกลับเข้าสู่เส้นทางที่ควรเป็น' },
    ],
    navigation: 'button',
  },
  {
    id: 'q4',
    question:
      ' ทุกอย่างดูแปลกตา เงียบงัน และเต็มไปด้วยความไม่แน่นอน หัวใจของคุณจะรู้สึก...',
    backgroundColor: '#133948',
    background: '/background/quiz/deepcoral/background.webp',
    sound: '',
    options: [
      { letter: 'A', label: 'ตื่นเต้นกระปรี้กระเปร่า - รักความไม่แน่นอนนี้ โลกใหม่หมายถึงโอกาสและการผจญภัย' },
      { letter: 'B', label: 'สงบนิ่งยอมรับ - แค่มีคนที่รักอยู่ข้าง ๆ ก็พร้อมจะไปทุกที่' },
      { letter: 'C', label: 'อยากรู้อยากเห็น - เริ่มสำรวจความเป็นไปได้ และอยากเข้าใจโลกใหม่นี้มากขึ้น' },
      { letter: 'D', label: 'หวาดหวั่น - เฝ้าระวังเป็นพิเศษ คอยมองหาภัยที่อาจซ่อนอยู่' },
      { letter: 'E', label: 'ต่อต้านและโหยหาอดีต - รู้สึกสูญเสีย และพยายามหาทางกลับไปสู่เส้นทางเดิม' },
    ],
    navigation: 'button',
  },
  {
    id: 'investigation-4',
    navigation: 'tap-anywhere',
    question: 'คุณว่ายเข้าสู่ถ้ำใต้ทะเลที่เงียบงัน มีเพียงเสียงลมหายใจของตัวเอง',
    background: [
      '/background/quiz/cave/1.webp',
      '/background/quiz/cave/2.webp',
    ],
    sound: '',
    flashTransition: 'black',
  },

  {
    id: 'q5',
    question:
      'คุณว่ายเข้าสู่ถ้ำใต้ทะเลที่เงียบงัน มีเพียงเสียงลมหายใจของตัวเอง ในความนิ่งเงียบนั้น ความคิดของคุณค่อย ๆ ลอยขึ้นมาจากก้นบึ้งของจิตใจ วนเวียนอยู่กับ...',
    backgroundColor: '#10303e',
    background: [
      '/background/quiz/cave/1.webp',
      '/background/quiz/cave/2.webp',
    ],
    sound: '',
    options: [
      { letter: 'A', label: 'ภาพแห่งความสุข - "พรุ่งนี้จะทำอะไรดี" "จะชวนใครไปไหม" และภาพจำเสียงหัวเราะ' },
      { letter: 'B', label: 'ความห่วงใยผู้อื่น - "คนอื่นจะเป็นยังไงบ้างนะ" "เราจะดูแลพวกเขาได้ดีขึ้นไหม"' },
      { letter: 'C', label: 'แรงบันดาลใจไม่สิ้นสุด - ความคิดสร้างสรรค์และไอเดียใหม่ ๆ ที่ผุดขึ้นไม่หยุด' },
      { letter: 'D', label: 'การทบทวนตัวเอง - "เราได้ทำอะไรผิดไปไหมนะ" "ตอนนี้ปลอดภัยดีหรือเปล่า"' },
      { letter: 'E', label: 'หน้าที่และเป้าหมาย - "ตอนนี้เราไปถึงไหนแล้ว" "เรายังเป็นคนที่พึ่งพาได้ไหม"' },
    ],
    navigation: 'button',
  },
  {
    id: 'q6',
    question:
      'ที่ก้นถ้ำลึกลงไป คุณพบหีบสมบัติใบใหญ่ เมื่อเปิดมันออก สิ่งที่อยู่ภายในไม่ใช่ทองคำหรืออัญมณี แต่มันเก็บสิ่งล้ำค่าที่สุดในชีวิตคุณ ที่คุณจะปกป้องไว้ไม่ว่าอะไรจะเกิดขึ้น สิ่งนั้นคือ...',
    backgroundColor: '#0c2734',
    background: [
      '/background/quiz/cave/1.webp',
      '/background/quiz/cave/2.webp',
    ],
    sound: '',
    options: [
      { letter: 'A', label: 'มิตรภาพ - การได้เป็นส่วนหนึ่ง และเชื่อมโยงกับผู้อื่น' },
      { letter: 'B', label: 'ความเมตตา - โลกที่อ่อนโยน ปราศจากความโหดร้าย' },
      { letter: 'C', label: 'อิสรภาพ - การได้คิด ฝัน และเป็นตัวของตัวเอง' },
      { letter: 'D', label: 'ความปลอดภัย - พื้นที่ที่สามารถวางใจได้อย่างแท้จริง' },
      { letter: 'E', label: 'ความซื่อสัตย์ถูกต้อง - การยืนหยัดในสิ่งที่ถูกต้องและรักษาคำมั่นสัญญา' },
    ],
    navigation: 'button',
  },
  {
    id: 'investigation-5',
    navigation: 'tap-anywhere',
    question: 'ที่ก้นถ้ำลึกลงไป คุณพบหีบสมบัติใบใหญ่',
    background: [
      '/background/quiz/cave/1.webp',
      '/background/quiz/cave/2.webp',
    ],
    sound: '',
    flashTransition: 'black',
  },
  {
    id: 'investigation-6',
    navigation: 'tap-anywhere',
    question: 'เมื่อเปิดมันออก สิ่งที่อยู่ภายในไม่ใช่ทองคำหรืออัญมณี-แต่มันเก็บสิ่งล้ำค่าที่สุดในชีวิตคุณ ที่คุณจะปกป้องไว้ไม่ว่าอะไรจะเกิดขึ้น',
    background: [
      '/background/quiz/cave/1.webp',
      '/background/quiz/cave/2.webp',
    ],
    sound: '',
    flashTransition: 'white',
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