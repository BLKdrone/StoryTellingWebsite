import type { Metadata } from 'next'
import { MobileFrame } from '@/components/mobile-frame'
import { BurnoutFlow } from '@/components/burnout/burnout-flow'

export const metadata: Metadata = {
    title: 'Burnout · Mentalhealthwebsite',
    description: 'A gentle chapter on recognizing burnout and softening the pace.',
}

export default function BurnoutPage() {
    return (
        <MobileFrame>
            <BurnoutFlow />
        </MobileFrame>
    )
}
