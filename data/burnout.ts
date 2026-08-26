// Chapter: "Burnout" — the whale's swim gets heavier, faster currents push
// it to keep up with the pack, until it learns that slowing down (or
// stopping) isn't weakness. Linear tap-through with two self-check
// A–D questions; every option flows into the same next page (no branching),
// same pattern as self-worth's choice pages.

export type BurnoutLetter = 'A' | 'B' | 'C' | 'D'

export interface BurnoutOption {
    letter: BurnoutLetter
    label: string
}

export interface BurnoutTapPage {
    id: string
    navigation: 'tap-anywhere'
    text: string
    background: string[]
    sound: string
    /** Label shown for pages that represent a special interaction beat
     *  (e.g. "press to help the whale swim") — currently rendered as plain
     *  tap-anywhere until a real interaction mechanic is built. */
    interactionLabel?: string
    flashTransition?: 'black' | 'white'
}

export interface BurnoutQuestion {
    id: string
    navigation: 'button'
    text: string
    background: string[]
    sound: string
    options: BurnoutOption[]
    flashTransition?: 'black' | 'white'
}

export type BurnoutPage = BurnoutTapPage | BurnoutQuestion

// Real illustrated backgrounds aren't ready yet — every page cycles through
// the same placeholder slideshow until actual art is supplied.
const deepOceanBackground = [
    '/background/burnout/oceans1.webp',
    '/background/burnout/oceans2.webp',
]
const ManyWhaleBackground = [
    '/background/burnout/manywhales1.webp',
   '/background/burnout/manywhales2.webp',
]

export const burnoutPages: BurnoutPage[] = [
    {
        id: 'burnout-1',
        navigation: 'tap-anywhere',
        text: 'มหาสมุทรอันมืดมิด ตอนนี้กลับดูเศร้าหมองยิ่งกว่าเดิม วาฬเริ่มรู้สึกไม่ค่อยดีเท่าไหร่นัก',
        background: deepOceanBackground,

        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        id: 'burnout-2',
        navigation: 'tap-anywhere',
        text: 'กระแสน้ำเริ่มแรงขึ้นอีกครั้ง ร่างกายของวาฬเริ่มหนักกว่าที่เคย แต่วาฬตัวนั้นก็ยังว่ายต่อไป โดยที่ไม่มีใครสั่งและไม่มีใครบอกให้หยุด',
        background: deepOceanBackground,

        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        id: 'burnout-3',
        navigation: 'tap-anywhere',
        text: 'ตรงหน้าคือมหาสมุทรอันกว้างใหญ่ เป็นเส้นทางที่ยาวไกลเหมือนเดิม เหมือนทุกวัน วาฬตัวนี้ก็ว่ายตามกระแสน้ำมาตลอดตั้งแต่จำความได้ มีทั้งวันที่นิ่งและวันที่คลื่นแรง แต่ไม่ว่ายังไง ปลาวาฬตัวนี้ก็ว่ายไปต่ออยู่ดี',
        background: deepOceanBackground,

        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        // NOTE: options here are a best-effort transcription — the storyboard
        // text was heavily obscured, please verify wording against the source.
        id: 'burnout-check-in',
        navigation: 'button',
        text: 'แล้วตอนนี้ ช่วงนี้ทำให้คุณรู้สึกอยู่แบบไหน',
        background: deepOceanBackground,

        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        options: [
            { letter: 'A', label: 'ว่ายไปเรื่อย ๆ แบบไม่รู้สึกอะไรแล้ว' },
            { letter: 'B', label: 'ว่ายทั้ง ๆ ที่เหนื่อยมาก' },
            { letter: 'C', label: 'ว่ายแบบปกติ' },
            { letter: 'D', label: 'ไม่เป็นไร ยังไหวอยู่' },
        ],
    },
    {
        id: 'burnout-5',
        navigation: 'tap-anywhere',
        text: 'ตอนนี้กระแสน้ำแรงขึ้นอีก วาฬตัวนี้พยายามว่ายต่อไป',
        background: deepOceanBackground,
        sound: '',
        interactionLabel: 'กดเพื่อช่วยวาฬว่าย',
    },
    {
        id: 'burnout-6',
        navigation: 'tap-anywhere',
        text: 'วาฬตัวนี้ขยับครีบแรงขึ้นอีกครั้ง กล้ามเนื้อเริ่มล้าแต่ชินแล้ว',
        background: deepOceanBackground,
        sound: '',
    },
    {
        id: 'burnout-7',
        navigation: 'tap-anywhere',
        text: 'ตรงหน้ามีฝูงวาฬตัวอื่นว่ายไปในทิศทางเดียวกัน เร็วกว่า นิ่งกว่า ดูเหมือนไม่เหนื่อยเลย',
        background: ManyWhaleBackground,

        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        id: 'burnout-tolerance',
        navigation: 'button',
        text: 'ช่วงนี้คุณรู้สึกว่าตัวเอง "ทนไม่ไหว" ประมาณไหน',
        background: ManyWhaleBackground,

        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        options: [
            { letter: 'A', label: 'แทบไม่เคย' },
            { letter: 'B', label: 'บางวัน' },
            { letter: 'C', label: 'เกือบทุกวัน' },
            { letter: 'D', label: 'ทุกวัน' },
        ],
    },
    {
        id: 'burnout-9',
        navigation: 'tap-anywhere',
        text: 'วาฬพยายามเร่งตาม ยิ่งเร่ง น้ำยิ่งหนัก ยิ่งเร่ง ยิ่งเหนื่อย วาฬตัวนี้เร่งจนสุดแรงจนภาพเริ่มเบลอ',
        background: ManyWhaleBackground,

        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        interactionLabel: 'บังคับให้กด "ลองหยุดสักนิด"',
    },
    {
        id: 'burnout-10',
        navigation: 'tap-anywhere',
        text: 'ไม่มีวาฬตัวไหนหันมามองคุณ มองจริง ๆ แล้ว ทุกตัวก็กำลังว่ายของตัวเองอยู่ แถมวาฬบางตัวยังว่ายช้ากว่าคุณอีก วาฬตัวนั้นเริ่มไม่แน่ใจว่าที่ผ่านมา เราว่ายตามกระแสน้ำ หรือว่ายตามอะไรกันแน่',
        background: ManyWhaleBackground,

        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        id: 'burnout-11',
        navigation: 'tap-anywhere',
        text: 'วาฬตัวนั้นชะลอการเคลื่อนไหวลงเล็กน้อย รอบตัวเงียบกว่าที่คิด',
        background: ManyWhaleBackground,

        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        id: 'burnout-11.5',
        navigation: 'tap-anywhere',
        text: 'ตอนแรกวาฬตัวนี้รู้สึกแปลกเหมือนกำลังทำอะไรผิด กระแสน้ำยังคงพามันไปช้า ๆ แต่ครั้งแรกในรอบนาน วาฬตัวนี้กลับรู้สึกเหมือนได้หายใจ',
        background: ManyWhaleBackground,

        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        id: 'burnout-12',
        navigation: 'tap-anywhere',
        text: 'น้องวาฬเดินทางมาไกลมากเลยนะ ก็เหมือนกับเธอ',
        background: deepOceanBackground,

        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
      {
        id: 'burnout-12',
        navigation: 'tap-anywhere',
        text: 'ถ้าวันไหนเหนื่อยมากจริง ๆ การหยุดไม่ได้แปลว่าอ่อนแอ บางทีมันอาจจะเป็นแค่การหยุดหายใจก่อนจะไปต่อได้',
        background: deepOceanBackground,

        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
      {
        id: 'burnout-12',
        navigation: 'tap-anywhere',
        text: 'ค่อย ๆ ว่ายในจังหวะของตัวเองไปนะ',
        background: deepOceanBackground,

        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
]


