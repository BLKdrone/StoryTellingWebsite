import { introPages } from '@/data/intro'
import { moodJourneys, moodIntroPages } from '@/data/mood-checkin'
import { burnoutPages } from '@/data/burnout'
import { quizQuestions } from '@/data/quiz'
import { happinessPages } from '@/data/happy'

const chapters = {
  intro: introPages,
  mood: [...moodIntroPages, ...Object.values(moodJourneys).flat()],
  burnout: burnoutPages,
  quiz: quizQuestions,
  happiness: happinessPages,
}