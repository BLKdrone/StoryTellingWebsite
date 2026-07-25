import type { StoryPageData } from '@/lib/story'

export const happinessPages: StoryPageData[] = [
  {
    id: 'happiness-1',
    type: 'text-whale',
    navigation: 'tap-anywhere',
    background: '/background/happiness/1.PNG',
    backgroundColor: '#2a5a3a',
    sound: '',
    transition: 'fade',
    text: 'Happiness isn`t a destination. It`s the small moments you notice along the way.',
  },
  {
    id: 'happiness-2',
    type: 'collect-answer',
    navigation: 'button',
    background: '/background/happiness/2.PNG',
    backgroundColor: '#2a5a3a',
    sound: '',
    transition: 'fade',
    prompt: 'What small moment brought you joy this week?',
    placeholder: 'Share it here...',
    buttonLabel: 'Treasure this',
  },
  {
    id: 'happiness-3',
    type: 'text-whale',
    navigation: 'tap-anywhere',
    background: '/background/happiness/3.PNG',
    backgroundColor: '#2a5a3a',
    sound: '',
    transition: 'fade',
    text: 'Keep collecting these moments. They`re the threads that weave a life worth living.',
  },
]