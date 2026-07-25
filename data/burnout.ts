import type { StoryPageData } from '@/lib/story'

export const burnoutPages: StoryPageData[] = [
  {
    id: 'burnout-1',
    type: 'text-whale',
    navigation: 'tap-anywhere',
    background: '/background/burnout/1.PNG',
    backgroundColor: '#1a3a4a',
    sound: '',
    transition: 'fade',
    text: 'Burnout doesn`t arrive with fanfare. It creeps in quietly, like the tide.',
  },
  {
    id: 'burnout-2',
    type: 'collect-answer',
    navigation: 'button',
    background: '/background/burnout/2.PNG',
    backgroundColor: '#1a3a4a',
    sound: '',
    transition: 'fade',
    prompt: 'What does burnout feel like for you?',
    placeholder: 'Describe it...',
    buttonLabel: 'I feel this',
  },
  {
    id: 'burnout-3',
    type: 'text-whale',
    navigation: 'tap-anywhere',
    background: '/background/burnout/3.PNG',
    backgroundColor: '#1a3a4a',
    sound: '',
    transition: 'fade',
    text: 'Rest is not lazines',
  },
]