import type { Metadata } from 'next'
import { MobileFrame } from '@/components/mobile-frame'
import { MoodFlow } from '@/components/mood-checkin/mood-flow'

export const metadata: Metadata = {
  title: 'Mood check-in · Mentalhealthwebsite',
  description: 'A quick, gentle check-in that meets you wherever your mood is today.',
}

export default function MoodCheckinPage() {
  return (
    <MobileFrame>
      <MoodFlow />
    </MobileFrame>
  )
}
