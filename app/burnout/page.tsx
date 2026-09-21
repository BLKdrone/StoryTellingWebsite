'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { MobileFrame } from '@/components/mobile-frame'
import { BackgroundSlideshow } from '@/components/animations/background-slideshow'
import { burnoutPages, type BurnoutLetter } from '@/data/burnout'
import { usePageAudio } from '@/components/page-audio'
import { SlideNext } from '@/components/flash-transition'
import { WhaleGlide } from '@/components/whale-guilde'

const textChip = 'inline-block rounded-[5px] bg-white px-3 py-1 text-black font-serif text-lg leading-relaxed'

export default function BurnoutPage() {
    const router = useRouter()
    const [index, setIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [whalePosition, setWhalePosition] = useState(0)

    const total = burnoutPages.length
    const page = burnoutPages[index]
    usePageAudio(page.sound)

    const finish = () => {
        router.push('/chapter-checkpoint?from=burnout')
    }

    const advance = () => {
        if (index + 1 < total) {
            setIndex((i) => i + 1)
        } else {
            finish()
        }
    }

    const handleSelectLetter = (letter: BurnoutLetter) => {
        setAnswers((prev) => ({ ...prev, [page.id]: letter }))
        advance()
    }

    const handleBack = () => {
        if (index > 0) {
            setIndex((i) => i - 1)
            setWhalePosition(0)
        }
    }

    const helpWhale = () => {
        if (whalePosition >= 4) return
        const nextPosition = whalePosition + 1
        setWhalePosition(nextPosition)
        if (nextPosition === 4) setIndex((i) => i + 1)
    }

    const backButton = index > 0 && (
        <button
            onClick={(e) => {
                e.stopPropagation()
                handleBack()
            }}
            className="absolute top-6 left-6 z-50 rounded-[5px] bg-white px-3 py-2 text-sm text-black backdrop-blur-md transition-colors hover:bg-white/90"
            aria-label="Go back"
        >
            ← Back
        </button>
    )

    const flashOverlay = <SlideNext pageKey={page.id} color={page.flashTransition} />

    // Choice page: A–D buttons, every option converges into the same next page
    if (page.navigation === 'button') {
        return (
            <MobileFrame>
                <div key={page.id} className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
                    <BackgroundSlideshow images={page.background} intervalMs={1200} />
                    <div className="relative z-10 flex min-h-dvh flex-1 flex-col p-6">
                        {backButton}
                        <div className="flex flex-1 flex-col justify-center gap-8">
                            <h1 className="text-balance whitespace-pre-line text-center font-serif text-2xl leading-relaxed">
                                <span className={cn(textChip, 'leading-relaxed')}>{page.text}</span>
                            </h1>
                            <div className="flex flex-col gap-3">
                                {page.options.map((option) => (
                                    <button
                                        key={option.letter}
                                        onClick={() => handleSelectLetter(option.letter)}
                                        className="h-auto min-h-14 w-full rounded-[5px] bg-white px-4 py-3 text-left text-base font-serif text-black whitespace-normal hover:bg-white/90"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {flashOverlay}
                    </div>
                </div>
            </MobileFrame>
        )
    }

    // Tap-anywhere narrative / interaction page
    const isHelpWhalePage = page.id === 'burnout-5'

    return (
        <MobileFrame>
            <div
                key={page.id}
                role="button"
                tabIndex={0}
                onClick={isHelpWhalePage ? undefined : advance}
                onKeyDown={(e) => {
                    if (isHelpWhalePage) {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            helpWhale()
                        }
                    } else if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        advance()
                    }
                }}
                className="animate-fade-in relative flex min-h-dvh flex-1 cursor-pointer flex-col"
            >
                <BackgroundSlideshow images={page.background} intervalMs={1200} />
                <div className="relative z-10 flex min-h-dvh flex-1 flex-col p-6">
                    {backButton}
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                        {isHelpWhalePage && (
                            <div className="absolute inset-x-0 top-[22%] h-[28rem] overflow-visible">
                                <div
                                    role="button"
                                    tabIndex={0}
                                    aria-label="ช่วยวาฬว่าย"
                                    className="absolute left-1/2 w-[28rem] cursor-pointer transition-transform duration-500 ease-out focus:outline-none"
                                    style={{
                                        transform: `translateX(calc(-50% - ${whalePosition * 60}px))`,
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        helpWhale()
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            helpWhale()
                                        }
                                    }}
                                >
                                    <WhaleGlide
                                        frames={[
                                            '/background/quiz/shallowcoral/whale1.webp',
                                            '/background/quiz/shallowcoral/whale2.webp',
                                        ]}
                                        motion="bob"
                                        className="h-[28rem] w-[28rem] object-contain"
                                    />
                                </div>
                            </div>
                        )}
                        <p
                            className={cn(
                                'text-balance whitespace-pre-line text-lg font-serif leading-relaxed',
                                isHelpWhalePage && 'mt-48'
                            )}
                        >
                            <span className={cn(textChip, 'leading-relaxed')}>{page.text}</span>
                        </p>
                        {page.interactionLabel && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    if (isHelpWhalePage) helpWhale()
                                }}
                                onKeyDown={(e) => e.stopPropagation()}
                                className="relative z-10 text-sm font-serif"
                            >
                                <span className={textChip}>{page.interactionLabel}</span>
                            </button>
                        )}
                    </div>
                </div>
                {flashOverlay}
            </div>
        </MobileFrame>
    )
}