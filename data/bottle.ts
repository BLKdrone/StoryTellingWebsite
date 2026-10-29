interface BottleIntro {
  text?: string
  sound: string
}

interface BottleQuestion {
  question?: string
  options: { id: string; label: string }[]
}

interface BottleOutro {
  text?: string
  background: string
}

export const bottleIntro: BottleIntro = {
  text: "คุณรู้ไหม ไม่ว่าคุณจะไปเจออะไรมา\nหรือตอนนี้กำลังรู้สึกอะไรอยู่\nคุณไม่ได้อยู่ในโลกใบนี้เพียงคนเดียวนะ\nทุกคนกำลังเผชิญเรื่องราว\nในแบบของตัวเอง",
  sound: "/audio/score for interactive project.mp3",
}

export const bottleQuestion: BottleQuestion = {
  question: "คุณมีเรื่องอะไรที่อยากระบายออกมาไหม",
  options: [
    { id: '1', label: 'การเรียน/การทำงาน' },
    { id: '2', label: 'ความสัมพันธ์กับเพื่อน' },
    { id: '3', label: 'ความสัมพันธ์กับแฟน' },
    { id: '4', label: 'ความสัมพันธ์กับครอบครัว' },
    { id: '5', label: 'การหาเป้าหมายในชีวิต' },
    { id: '6', label: 'การจัดการอารมณ์' },
    { id: '7', label: 'การเห็นคุณค่าในตัวเอง' },
    { id: '8', label: 'อาการทางร่างกาย' },
  ],
}

export const bottleOutros: BottleOutro[] = [
  {
    text: "คุณไม่จำเป็นต้องมีคำตอบสำหรับทุกอย่าง\nในวันนี้ก็ได้ แค่ผ่านวันนี้ไปให้ได้\nก็ถือว่าคุณชนะแล้ว ค่อย ๆ ก้าวไปด้วยกันนะ",
    background: '/background/mood-checkin/happy.webp',
  },
  {
    text: "เรื่องที่คุณกำลังเผชิญอยู่\nมันยังไม่ใช่บทสรุปของชีวิตคุณนะ\nมันเป็นแค่บทหนึ่งในหนังสือที่ยังไม่จบ\nฉันเชื่อว่าบทต่อ ๆ ไปจะมีสิ่งที่สวยงาม\nรออยู่แน่นอน",
    background: '/background/mood-checkin/happy.webp',
  },
  {
    text: "ไม่ว่าคืนนี้จะมืดแค่ไหน\nเช้าวันใหม่มันก็มาเสมอนะ\nและคุณไม่ต้องเดินผ่านความมืดนั้นคนเดียว\nมีคนที่พร้อมจะอยู่ข้าง ๆ คุณ\nคอยจับมือคุณไว้ และเชื่อในตัวคุณ\nแม้ในวันที่คุณยังไม่เชื่อในตัวเอง",
    background: '/background/mood-checkin/happy.webp',
  },
  {
    text: "ไม่เป็นไรเลยนะถ้าวันนี้คุณจะเหนื่อยกับ\nเรื่องราวต่าง ๆ แค่อนุญาตให้ตัวเองได้พักบ้าง\nไม่เป็นไรหรอก",
    background: '/background/mood-checkin/happy.webp',
  },
  {
    text: "คุณไม่ต้องรีบเป็นเวอร์ชันที่ดีกว่านี้ในวัน\nพรุ่งนี้ก็ได้ แค่วันนี้คุณยังอยู่ตรงนี้\nยังไม่ยอมแพ้ มันก็เก่งมากพอแล้ว\nการเติบโตมันไม่ได้เกิดขึ้นในวันเดียว\nค่อย ๆ เป็นค่อย ๆ ไปนะ",
    background: '/background/mood-checkin/happy.webp',
  },
  {
    text: "ไม่มีใครบอกได้หรอกว่าคุณรู้สึกยังไง\nหรือควรรู้สึกยังไง\nความรู้สึกของคุณมันจริงและสำคัญเสมอ\nไม่ต้องฝืนยิ้มเพื่อให้ใครสบายใจ\nแค่ซื่อสัตย์กับหัวใจและตัวเองพอนะ",
    background: '/background/mood-checkin/happy.webp',
  }
];