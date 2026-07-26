import type { StoryPageData } from '@/lib/story'

export const burnoutPages: StoryPageData[] = [
    {
        id: 'burnout-intro',
        type: 'text-whale',
        navigation: 'tap-anywhere',
        background: [
            '/background/intro/background1.PNG',
            '/background/intro/background2.PNG',
            '/background/intro/background3.PNG',
        ],
        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        transition: 'fade',
        text: 'When everything feels heavy, your body may be asking for a gentler pace.',
    },
    {
        id: 'burnout-input',
        type: 'collect-answer',
        navigation: 'button',
        background: [
            '/background/intro/background2.PNG',
            '/background/intro/background3.PNG',
            '/background/intro/background1.PNG',
        ],
        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        transition: 'fade',
        prompt: 'Name one thing you can postpone, delegate, or let be enough for today.',
        placeholder: 'Write it here...',
        buttonLabel: 'Continue',
    },
    {
        id: 'burnout-complete',
        type: 'text-whale',
        navigation: 'tap-anywhere',
        background: [
            '/background/intro/background3.PNG',
            '/background/intro/background1.PNG',
            '/background/intro/background2.PNG',
        ],
        sound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        transition: 'fade',
        text: 'You made a small but meaningful choice for your energy today.',
    },
]
