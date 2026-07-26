'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MobileFrame } from '@/components/mobile-frame'
import { StoryPage } from '@/components/story-page'
import { burnoutPages } from '@/data/burnout'

export default function BurnoutPage() {
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex((index) => index - 1)
        }
    }

    const handleAdvance = () => {
        if (currentIndex < burnoutPages.length - 1) {
            setCurrentIndex((index) => index + 1)
        } else {
            router.push('/chapter-checkpoint?from=burnout')
        }
    }

    const page = burnoutPages[currentIndex]

    return (
        <MobileFrame>
            <div className="relative flex min-h-dvh w-full flex-1 flex-col">
                {currentIndex > 0 && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleBack()
                        }}
                        className="absolute left-6 top-6 z-50 rounded-full bg-black/20 p-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-black/40 hover:text-white"
                        aria-label="Go back"
                    >
                        ← Back
                    </button>
                )}
                <StoryPage page={page} onAdvance={handleAdvance} />
            </div>
        </MobileFrame>
    )
}