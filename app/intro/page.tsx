'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MobileFrame } from '@/components/mobile-frame'
import { introPages, type IntroPage } from '@/data/intro'
import { BackgroundSlideshow } from '@/components/animations/background-slideshow'
import { usePageAudio } from '@/components/page-audio'
import { SlideNext } from '@/components/flash-transition'
import { cn } from '@/lib/utils'

const NAME_TOKEN = '{{name}}'

// Shared chapter typography: serif storytelling text with a consistent chip style
const textChip = 'inline-block rounded-2xl border border-white/60 bg-white/40 px-4 py-3 text-pretty font-body text-lg leading-relaxed text-gray-900 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.15)] float-up'

const RESUME_KEY = 'intro-resume'

interface IntroResumeState {
    currentIndex: number
    name: string
}

function loadResumeState(): IntroResumeState | null {
    if (typeof window === 'undefined') return null
    try {
        const raw = sessionStorage.getItem(RESUME_KEY)
        return raw ? (JSON.parse(raw) as IntroResumeState) : null
    } catch {
        return null
    }
}

function saveResumeState(state: IntroResumeState) {
    if (typeof window === 'undefined') return
    try {
        sessionStorage.setItem(RESUME_KEY, JSON.stringify(state))
    } catch {
        // ignore storage errors (private browsing, quota, etc.)
    }
}

function IntroPageInner() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const resumed = searchParams.get('resume') === '1' ? loadResumeState() : null

    const [currentIndex, setCurrentIndex] = useState(resumed?.currentIndex ?? 0)
    const [name, setName] = useState(resumed?.name ?? '')
    const [inputValue, setInputValue] = useState('')

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        } else {
            router.push('/')
        }
    }

    const handleAdvance = () => {
        if (currentIndex < introPages.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else {
            // Snapshot exactly where we are so the quiz's back button
            // can bring the user right back here instead of restarting.
            saveResumeState({ currentIndex, name })
            router.push('/quiz?from=intro')
        }
    }

    const handleNameSubmit = () => {
        const trimmed = inputValue.trim()
        if (!trimmed) return
        setName(trimmed)
        handleAdvance()
    }

    const page: IntroPage = introPages[currentIndex]
    usePageAudio(page.sound)
    const resolvedText = page.text.includes(NAME_TOKEN)
        ? page.text.replace(NAME_TOKEN, name)
        : page.text

    return (
        <MobileFrame>
            <div className="relative flex flex-col flex-1 min-h-dvh w-full">
                <BackgroundSlideshow
                    images={page.background}
                    intervalMs={500}
                    key={page.id}
                />

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        handleBack()
                    }}
                    className="absolute top-6 left-6 z-50 rounded-full bg-black/20 p-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-black/40 hover:text-white"
                    aria-label="Go back"
                >
                    ← Back
                </button>

                {page.navigation === 'text-input' ? (
                    <div className="relative z-10 flex flex-1 flex-col items-center justify-end gap-4 p-6 pb-16">
                        <p className="text-center text-lg font-serif leading-relaxed">
                            <span className={cn(textChip, 'leading-relaxed')}>{resolvedText}</span>
                        </p>
                        <input
                            autoFocus
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={page.placeholder}
                            className="w-full max-w-sm rounded-2xl border border-border bg-black/20 px-4 py-4 text-base font-serif text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                                    handleNameSubmit()
                                }
                            }}
                        />
                        <button
                            onClick={handleNameSubmit}
                            disabled={!inputValue.trim()}
                            className="rounded-full bg-white px-8 py-3 text-base font-serif font-semibold text-black transition-opacity disabled:opacity-40"
                        >
                            {page.buttonLabel ?? 'ต่อไป'}
                        </button>
                    </div>
                ) : (
                    <div
                        className="relative z-10 flex flex-1 flex-col items-center justify-end p-6 pb-16 cursor-pointer"
                        onClick={handleAdvance}
                    >
                        <p className="text-center text-lg font-serif leading-relaxed">
                            <span className={cn(textChip, 'leading-relaxed')}>{resolvedText}</span>
                        </p>
                    </div>
                )}

                <SlideNext
                    pageKey={page.id}
                    color={page.transition === 'dive' ? 'black' : page.transition ? 'white' : undefined}
                />
            </div>
        </MobileFrame>
    )
}

export default function IntroPage() {
    return (
        <Suspense fallback={null}>
            <IntroPageInner />
        </Suspense>
    )
}