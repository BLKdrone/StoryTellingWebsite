import type { Metadata } from 'next'
import { MobileFrame } from '@/components/mobile-frame'
import { QuizFlow } from '@/components/quiz/quiz-flow'

export const metadata: Metadata = {
  title: 'Which sea creature are you? · Mentalhealthwebsite',
  description: 'A gentle 6-question quiz to find the sea creature that matches how you move through the world.',
}

export default function QuizPage() {
  return (
    <MobileFrame>
      <QuizFlow />
    </MobileFrame>
  )
}
