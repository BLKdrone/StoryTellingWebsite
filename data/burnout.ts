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
        text: 'ddddddddddd.',
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
        prompt: 'Ndr todayddddddddddddddd.',
        placeholder: 'ddddddddddddddddddd.',
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
        text: 'dddddddddddddddddddddddddddddddddddd.',
    },
]
