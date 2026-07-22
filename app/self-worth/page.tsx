import type { Metadata } from 'next'
import { MobileFrame } from '@/components/mobile-frame'
import { SelfWorthFlow } from '@/components/self-worth/self-worth-flow'

export const metadata: Metadata = {
    title: 'Self-worth · Mentalhealthwebsite',
    description: 'A gentle chapter on remembering your worth beyond performance.',
}

export default function SelfWorthPage() {
    return (
        <MobileFrame>
            <SelfWorthFlow />
        </MobileFrame>
    )
}
