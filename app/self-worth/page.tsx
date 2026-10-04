'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { MobileFrame } from '@/components/mobile-frame'
import { BackgroundSlideshow } from '@/components/animations/background-slideshow'
import { DecorationBubble } from '@/components/decoration-bubble'
import {
    selfWorthPages,
    resolveSelfWorthText,
    type SelfWorthLetter,
} from '@/data/self-worth'
import { usePageAudio } from '@/components/page-audio'
import { SlideNext } from '@/components/flash-transition'
import Image from 'next/image'

const imageLabel = 'relative z-10 inline-block h-full w-full p-4 text-center font-medium leading-relaxed whitespace-normal flex items-center justify-center text-white'

const textChip = 'inline-block rounded-2xl border border-white/60 bg-white/40 px-4 py-3 whitespace-pre-line text-pretty font-body text-lg leading-relaxed text-gray-900 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.15)] float-up'


const RESUME_KEY = 'self-worth-resume'

interface SelfWorthResumeState {
    index: number
    answers: Record<string, string>
}

function loadResumeState(): SelfWorthResumeState | null {
    if (typeof window === 'undefined') return null
    try {
        const raw = sessionStorage.getItem(RESUME_KEY)
        return raw ? (JSON.parse(raw) as SelfWorthResumeState) : null
    } catch {
        return null
    }
}

function saveResumeState(state: SelfWorthResumeState) {
    if (typeof window === 'undefined') return
    try {
        sessionStorage.setItem(RESUME_KEY, JSON.stringify(state))
    } catch {
        // ignore storage errors (private browsing, quota, etc.)
    }
}

function SelfWorthPageInner() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const resumed = searchParams.get('resume') === '1' ? loadResumeState() : null

    const [index, setIndex] = useState(resumed?.index ?? 0)
    const [answers, setAnswers] = useState<Record<string, string>>(resumed?.answers ?? {})
    const [answer, setAnswer] = useState('')

    const total = selfWorthPages.length
    const page = selfWorthPages[index]
    const reasonPage = selfWorthPages.find((candidate) => candidate.id === 'sw-reason')
    const selectedReasonBackground = reasonPage && 'options' in reasonPage
        ? reasonPage.options.find((option) => option.letter === answers['sw-reason'])?.background
        : undefined
    const pageBackground = page.id === 'sw-9' && selectedReasonBackground
        ? [selectedReasonBackground]
        : page.background
    const hasDecoration = Boolean(page.decorationFrames || page.decorationBubble)
    usePageAudio(page.sound)
    const text = page.text ? resolveSelfWorthText(page.text, answers) : ''

    const finish = async (finalAnswers: Record<string, string> = answers) => {
        const wantedAnswer = finalAnswers['sw-want']
        if (typeof wantedAnswer === 'string') {
            try {
                const response = await fetch('/api/self-worth-responses', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ answers: { 'sw-want': wantedAnswer } }),
                })
                if (!response.ok) console.error('Failed to save self-worth response:', await response.text())
            } catch (error) {
                console.error('Failed to save self-worth response:', error)
            }
        }

        // Snapshot the state *before* this final answer, so "back" from
        // the checkpoint returns to a live last question.
        saveResumeState({ index, answers })

        router.push('/chapter-checkpoint?from=self-worth')
    }

    const advance = (finalAnswers: Record<string, string> = answers) => {
        if (index + 1 < total) {
            setIndex((i) => i + 1)
        } else {
            finish(finalAnswers)
        }
    }

    const handleSubmit = () => {
        const updated = { ...answers, [page.id]: answer }
        setAnswers(updated)
        setAnswer('')
        advance(updated)
    }

    const handleSelectLetter = (letter: SelfWorthLetter) => {
        const updated = { ...answers, [page.id]: letter }
        setAnswers(updated)
        advance(updated)
    }

    const handleBack = () => {
        if (index > 0) {
            setAnswer('')
            setIndex((i) => i - 1)
        } else {
            router.push('/chapter-checkpoint?from=self-worth')
        }
    }

    const backButton = (
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
    )

    const flashOverlay = <SlideNext pageKey={page.id} color={page.flashTransition} />

    // Both choice pages and text-input pages use navigation: 'button' —
    // tell them apart by whether the page has `options` or a `placeholder`.
    if (page.navigation === 'button') {
        const isQuestion = 'options' in page

        return (
            <MobileFrame>
                <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
                    <BackgroundSlideshow images={pageBackground} intervalMs={1200} />
                    {hasDecoration && <DecorationBubble type={page.decorationBubble} />}
                    <div key={page.id} className="relative z-10 flex min-h-dvh flex-1 flex-col p-6">
                        {backButton}
                        <div className="flex flex-1 flex-col justify-center gap-8">
                            {text.trim() && (
                                <h1 className="text-balance whitespace-pre-line text-center font-serif text-2xl leading-relaxed">
                                    <span className={cn(textChip, 'leading-relaxed')}>{text}</span>
                                </h1>
                            )}

                            {isQuestion ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {page.options.map((option) => (
                                        <button
                                            key={option.letter}
                                            onClick={() => handleSelectLetter(option.letter)}
                                            className="relative min-h-[400px] overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                                        >
                                            {option.background ? (
                                                <>
                                                    <div className="absolute inset-0">
                                                        <Image src={option.background} alt="" fill className="object-cover" />
                                                    </div>
                                                    <div className="absolute inset-0 bg-black/30" />
                                                </>
                                            ) : null}

                                            <span className={option.background ? imageLabel : textChip}>
                                                {option.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        placeholder={page.placeholder}
                                        className="w-full max-w-sm rounded-2xl border border-border bg-black/20 px-4 py-4 text-base font-serif text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                                                handleSubmit()
                                            }
                                        }}
                                    />
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!answer.trim()}
                                        className="h-12 w-full max-w-sm rounded-[5px] bg-white text-base font-serif font-medium text-black hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {page.buttonLabel || 'ไปต่อ'}
                                    </button>
                                </div>
                            )}
                        </div>
                        {flashOverlay}
                    </div>
                </div>
            </MobileFrame>
        )
    }

    // Pure tap-anywhere narrative page
    return (
        <MobileFrame>
            <div
                role="button"
                tabIndex={0}
                onClick={() => advance()}
                className="animate-fade-in relative flex min-h-dvh flex-1 cursor-pointer flex-col"
            >
                <BackgroundSlideshow images={pageBackground} intervalMs={1200} />
                {hasDecoration && <DecorationBubble type={page.decorationBubble} />}
                <div key={page.id} className="relative z-10 flex min-h-dvh flex-1 flex-col p-6">
                    {backButton}
                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                        {text.trim() && (
                            <p className="text-balance whitespace-pre-line text-lg font-serif leading-relaxed">
                                <span className={cn(textChip, 'leading-relaxed')}>{text}</span>
                            </p>
                        )}
                    </div>
                </div>
                {flashOverlay}
            </div>
        </MobileFrame>
    )
}

export default function SelfWorthPage() {
    return (
        <Suspense fallback={null}>
            <SelfWorthPageInner />
        </Suspense>
    )
}