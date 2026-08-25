'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { MobileFrame } from '@/components/mobile-frame'
import { BackgroundSlideshow } from '@/components/animations/background-slideshow'
import { motion, AnimatePresence } from 'motion/react'
import {
    selfWorthPages,
    resolveSelfWorthText,
    type SelfWorthLetter,
} from '@/data/self-worth'
import { supabase } from '@/lib/supabase'
import { usePageAudio } from '@/components/page-audio'

const textChip = 'inline-block rounded-[5px] bg-white px-3 py-1 text-black'

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
        router.push('/chapter-checkpoint?from=selfworth')
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

    const flashOverlay = page.flashTransition && (
        <AnimatePresence>
            <motion.div
                key={page.id}
                aria-hidden
                className={cn(
                    'pointer-events-none absolute inset-0 z-50',
                    page.flashTransition === 'black' ? 'bg-black' : 'bg-white',
                )}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 5, ease: 'easeInOut' }}
            />
        </AnimatePresence>
    )

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
                                <div className="flex flex-col gap-3">
                                    {page.options.map((option) => (
                                        <button
                                            key={option.letter}
                                            onClick={() => handleSelectLetter(option.letter)}
                                            className="h-auto min-h-14 w-full rounded-[5px] bg-white px-4 py-3 text-left text-base text-black whitespace-normal hover:bg-white/90"
                                        >
                                            {option.label}
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
                                        className="w-full max-w-sm rounded-2xl border border-border bg-input/40 px-4 py-4 text-base text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                                    />
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!answer.trim()}
                                        className="h-12 w-full max-w-sm rounded-[5px] bg-white text-base font-medium text-black hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
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
                        <p className="text-balance whitespace-pre-line text-base leading-relaxed">
                            <span className={cn(textChip, 'leading-relaxed')}>{text}</span>
                        </p>
                    </div>
                </div>
                {flashOverlay}
            </div>
        </MobileFrame>
    )
}