'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { MobileFrame } from '@/components/mobile-frame'
import { BackgroundSlideshow } from '@/components/animations/background-slideshow'
import {
    selfWorthPages,
    resolveSelfWorthText,
    type SelfWorthLetter,
} from '@/data/self-worth'
import { supabase } from '@/lib/supabase'
import { usePageAudio } from '@/components/page-audio'
import { SlideNext } from '@/components/flash-transition'
import Image from 'next/image'

const textChip = 'inline-block rounded-[5px] bg-white px-3 py-1 text-black font-serif text-lg leading-relaxed'

export default function SelfWorthPage() {
    const router = useRouter()
    const [index, setIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [answer, setAnswer] = useState('')

    const total = selfWorthPages.length
    const page = selfWorthPages[index]
    usePageAudio(page.sound)
    const text = resolveSelfWorthText(page.text, answers)

    const finish = async (finalAnswers: Record<string, string> = answers) => {
        const { error } = await supabase.from('self_worth_responses').insert({
            answers: finalAnswers, // includes sw-want
        })
        if (error) console.error('Failed to save self-worth response:', error)
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
        }
    }

    const backButton = index > 0 && (
        <button
            onClick={(e) => {
                e.stopPropagation()
                handleBack()
            }}
            className="absolute top-6 left-6 z-50 rounded-[5px] bg-white px-3 py-2 text-sm font-medium text-black backdrop-blur-md transition-colors hover:bg-white/90"
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
                    <BackgroundSlideshow images={page.background} intervalMs={1200} />
                    <div key={page.id} className="relative z-10 flex min-h-dvh flex-1 flex-col p-6">
                        {backButton}
                        <div className="flex flex-1 flex-col justify-center gap-8">
                            <h1 className="text-balance whitespace-pre-line text-center font-serif text-2xl leading-relaxed">
                                <span className={cn(textChip, 'leading-relaxed')}>{text}</span>
                            </h1>

                            {isQuestion ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {page.options.map((option) => (
                                        <button
                                            key={option.letter}
                                            onClick={() => handleSelectLetter(option.letter)}
                                            className="relative min-h-[200px] overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                                        >
                                            {option.background ? (
                                                <>
                                                    <div className="absolute inset-0">
                                                        <Image src={option.background} alt="" fill className="object-cover" />
                                                    </div>
                                                    <div className="absolute inset-0 bg-black/30" />
                                                </>
                                            ) : (
                                                <div className="absolute inset-0 bg-white" />
                                            )}

                                            <span
                                                className={cn(
                                                    'relative z-10 inline-block h-full w-full p-4 text-center font-medium leading-relaxed whitespace-normal',
                                                    option.background ? 'flex items-center justify-center text-white' : 'text-black'
                                                )}
                                            >
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
                <BackgroundSlideshow images={page.background} intervalMs={1200} />
                <div key={page.id} className="relative z-10 flex min-h-dvh flex-1 flex-col p-6">
                    {backButton}
                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                        <p className="text-balance whitespace-pre-line text-lg font-serif leading-relaxed">
                            <span className={cn(textChip, 'leading-relaxed')}>{text}</span>
                        </p>
                    </div>
                </div>
                {flashOverlay}
            </div>
        </MobileFrame>
    )
}