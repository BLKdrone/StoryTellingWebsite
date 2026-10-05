'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { MobileFrame } from '@/components/mobile-frame'
import { BackgroundSlideshow } from '@/components/animations/background-slideshow'
import { DecorationBubble } from '@/components/decoration-bubble'
import { ZoomAnimation } from '@/components/animations/zoom-animation'
import { burnoutPages, type BurnoutLetter } from '@/data/burnout'
import { usePageAudio } from '@/components/page-audio'
import { SlideNext } from '@/components/flash-transition'
import { WhaleGlide } from '@/components/whale-guilde'
import { DecorationBackground } from '@/components/decoration-background'
import { StopWhale } from '@/components/stop-whale'
import { motion } from 'motion/react'


const textChip = 'inline-block rounded-2xl border border-white/60 bg-white/40 px-4 py-3 whitespace-pre-line text-pretty font-body text-lg leading-relaxed text-gray-900 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.15)] float-up'
const HELP_WHALE_GOAL = 7

const RESUME_KEY = 'burnout-resume'

interface BurnoutResumeState {
    index: number
    answers: Record<string, string>
}

function loadResumeState(): BurnoutResumeState | null {
    if (typeof window === 'undefined') return null
    try {
        const raw = sessionStorage.getItem(RESUME_KEY)
        return raw ? (JSON.parse(raw) as BurnoutResumeState) : null
    } catch {
        return null
    }
}

function saveResumeState(state: BurnoutResumeState) {
    if (typeof window === 'undefined') return
    try {
        sessionStorage.setItem(RESUME_KEY, JSON.stringify(state))
    } catch {
        // ignore storage errors (private browsing, quota, etc.)
    }
}

function BurnoutPageInner() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const resumed = searchParams.get('resume') === '1' ? loadResumeState() : null

    const [index, setIndex] = useState(resumed?.index ?? 0)
    const [answers, setAnswers] = useState<Record<string, string>>(resumed?.answers ?? {})
    const [whalePosition, setWhalePosition] = useState(0)
    const [blurClearedPageId, setBlurClearedPageId] = useState<string | null>(null)
    const [showBlurStopButton, setShowBlurStopButton] = useState(false)

    const total = burnoutPages.length
    const page = burnoutPages[index]
    const isHelpWhalePage = page.id === 'helpwhale'
    const hasDecoration = Boolean(page.decorationFrames || page.decorationBubble)
    // const decorationFrames = 'decorationFrames' in page ? page.decorationFrames : undefined
    // const backgroundImage = Array.isArray(page.background) ? page.background[0] : page.background
    // const [decorationFrameIndex, setDecorationFrameIndex] = useState(0)
    const isBlurPage = page.id === 'stop-whale'
    const isBlurCleared = blurClearedPageId === page.id
    const decorationBubble = page.decorationBubble
        ? <DecorationBubble type={page.decorationBubble} />
        : null
    usePageAudio(page.sound)

    // useEffect(() => {
    //     setDecorationFrameIndex(0)
    //     if (!decorationFrames || decorationFrames.length < 2) return

    //     const intervalId = window.setInterval(() => {
    //         setDecorationFrameIndex((frameIndex) => (frameIndex + 1) % decorationFrames.length)
    //     }, 900)
    //     return () => window.clearInterval(intervalId)
    // }, [page.id, decorationFrames])

    useEffect(() => {
        if (!isBlurPage) {
            setShowBlurStopButton(false)
            return
        }

        setShowBlurStopButton(false)
        const timeoutId = window.setTimeout(() => setShowBlurStopButton(true), 700)
        return () => window.clearTimeout(timeoutId)
    }, [isBlurPage, page.id])

    useEffect(() => {
        if (!isHelpWhalePage || whalePosition === 0 || whalePosition >= HELP_WHALE_GOAL) return

        const timeoutId = window.setTimeout(() => {
            setWhalePosition((position) => Math.max(position - 1, 0))
        }, 1400)
        return () => window.clearTimeout(timeoutId)
    }, [isHelpWhalePage, page.id, whalePosition])

    const finish = () => {
        // No data is collected/saved for burnout — this chapter is
        // navigation-only. Just snapshot position for the back button.
        saveResumeState({ index, answers })
        router.push('/chapter-checkpoint?from=burnout')
    }

    const advance = (finalAnswers: Record<string, string> = answers) => {
        if (index + 1 < total) {
            if (burnoutPages[index + 1].id === 'stop-whale') {
                setBlurClearedPageId(null)
            }
            setIndex((i) => i + 1)
        } else {
            finish()
        }
    }

    const handleSelectLetter = (letter: BurnoutLetter) => {
        const updated = { ...answers, [page.id]: letter }
        setAnswers(updated)
        advance(updated)
    }

    const handleBack = () => {
        if (index > 0) {
            if (burnoutPages[index - 1].id === 'stop-whale') {
                setBlurClearedPageId(null)
            }
            setIndex((i) => i - 1)
            setWhalePosition(0)
        }
        else {
            router.push('/chapter-checkpoint?from=burnout')
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

    const helpWhale = () => {
        setWhalePosition((position) => Math.min(position + 1, HELP_WHALE_GOAL))
    }

    const flashOverlay = <SlideNext pageKey={page.id} color={page.flashTransition} />

    // Choice page: A–D buttons, every option converges into the same next page
    if (page.navigation === 'button') {
        return (
            <MobileFrame>
                <div key={page.id} className="relative flex min-h-dvh flex-1 flex-col">
                    <BackgroundSlideshow images={page.background} intervalMs={1200} />
                    {page.decorationFrames && (
                        <DecorationBackground images={page.decorationFrames} intervalMs={2000} />
                    )}
                    {decorationBubble}
                    <div className="relative z-10 flex min-h-dvh flex-1 flex-col p-6">
                        {backButton}
                        <div className="flex flex-1 flex-col justify-center gap-8">
                            {page.text?.trim() && (
                                <h1 className="text-balance whitespace-pre-line text-center font-serif text-2xl leading-relaxed">
                                    <span className={cn(textChip, 'leading-relaxed')}>{page.text}</span>
                                </h1>
                            )}
                            <div className="flex flex-col gap-3">
                                {page.options.map((option) => (
                                    <button
                                        key={option.letter}
                                        onClick={() => handleSelectLetter(option.letter)}
                                        className={cn(textChip, 'leading-relaxed')}
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
    const isZoomWhalePage = page.id === 'zoom-whale'

    return (
        <MobileFrame>
            <div
                role="button"
                tabIndex={0}
                aria-disabled={isBlurPage && !isBlurCleared}
                onClick={isHelpWhalePage ? undefined : () => {
                    if (!isBlurPage || isBlurCleared) advance()
                }}
                onKeyDown={(e) => {
                    if (isHelpWhalePage) {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            helpWhale()
                        }
                    } else if ((e.key === 'Enter' || e.key === ' ') && (!isBlurPage || isBlurCleared)) {
                        e.preventDefault()
                        advance()
                    }
                }}
                className="relative flex min-h-dvh flex-1 cursor-pointer flex-col"
            >
                <div className={cn(
                    'absolute inset-0 transition-[filter] duration-700',
                    isBlurPage && !isBlurCleared && 'blur-[7px]'
                )}>
                    {/* Main background image */}
                    {isZoomWhalePage ? (
                        <ZoomAnimation
                            focalPoint="58% 29%"
                            peakScale={10}
                            duration={2.5}
                            className="absolute inset-0"
                        >
                            <Image src={page.background} alt="" fill className="object-cover" priority />
                            <WhaleGlide
                                frames={[
                                    '/background/burnout/whale1.webp',
                                    '/background/burnout/whale2.webp',
                                ]}
                                motion="still"
                                className="pointer-events-none absolute left-1/2 top-[11%] z-[5] h-[28rem] w-[28rem] -translate-x-1/2 object-contain"
                            />
                        </ZoomAnimation>
                    ) : (
                        <Image src={page.background} alt="" fill className="object-cover" priority />
                    )}
                    {page.decorationFrames && (
                        <motion.div
                            className="absolute inset-0"
                            style={{ transformOrigin: '58% 29%' }}
                            initial={{ scale: 1 }}
                            animate={{ scale: isZoomWhalePage ? 10 : 1 }}
                            transition={{ duration: 2.5, ease: 'easeInOut' }}
                        >
                            <DecorationBackground
                                images={page.decorationFrames}
                                intervalMs={1200}
                            />
                        </motion.div>
                    )}
                    {decorationBubble}
                    <div key={page.id} className="relative z-10 flex min-h-dvh flex-1 flex-col p-6">
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
                                            transform: `translateX(calc(-50% - ${whalePosition * 30}px))`,
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
                            {page.text?.trim() && (
                                <p
                                    className={cn(
                                        'text-balance whitespace-pre-line text-lg font-serif leading-relaxed',
                                        isHelpWhalePage && 'mt-48', isZoomWhalePage && 'mt-48'
                                    )}
                                >
                                    <span className={cn(textChip, 'leading-relaxed')}>{page.text}</span>
                                </p>
                            )}
                            {isHelpWhalePage && (
                                <div className="relative z-20 flex flex-col items-center gap-3 px-6">
                                    <p className="text-balance whitespace-pre-line text-center font-serif text-2xl leading-relaxed">
                                        <span className={cn(textChip, 'leading-relaxed')}>
                                            {whalePosition >= HELP_WHALE_GOAL
                                                ? 'วาฬฝ่ากระแสน้ำได้แล้ว'
                                                : 'แตะวาฬซ้ำ ๆ เพื่อฝ่ากระแสน้ำ'}
                                        </span>
                                    </p>
                                    {whalePosition < HELP_WHALE_GOAL && (
                                        <div
                                            role="progressbar"
                                            aria-label="ความคืบหน้าการช่วยวาฬ"
                                            aria-valuemin={0}
                                            aria-valuemax={HELP_WHALE_GOAL}
                                            aria-valuenow={whalePosition}
                                            className="h-2.5 w-44 overflow-hidden rounded-full border border-white/60 bg-black/35"
                                        >
                                            <div
                                                className="h-full rounded-full bg-white transition-[width] duration-300"
                                                style={{ width: `${(whalePosition / HELP_WHALE_GOAL) * 100}%` }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                            {page.interactionLabel && !isBlurPage && (!isHelpWhalePage || whalePosition >= HELP_WHALE_GOAL) && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        if (isHelpWhalePage) advance()
                                    }}
                                    onKeyDown={(e) => e.stopPropagation()}
                                    className="relative z-20 h-12 w-full max-w-sm rounded-[5px] bg-white text-base font-serif font-medium text-black hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isHelpWhalePage ? 'ไปต่อ' : page.interactionLabel}
                                </button>
                            )}

                        </div>
                    </div>
                </div>
                {isBlurPage && !isBlurCleared && showBlurStopButton && (
                    <StopWhale
                        label={page.interactionLabel || 'ลองหยุดสักนิด'}
                        onComplete={() => setBlurClearedPageId(page.id)}
                    />
                )}
                {flashOverlay}
            </div>
        </MobileFrame>
    )
}

export default function BurnoutPage() {
    return (
        <Suspense fallback={null}>
            <BurnoutPageInner />
        </Suspense>
    )
}