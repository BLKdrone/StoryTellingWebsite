'use client'

import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { chapterCheckpointData } from '@/data/chapter-checkpoint'
import { usePageAudio } from '@/components/page-audio'
import { MobileFrame } from '@/components/mobile-frame'

type ChapterKey = 'quiz' | 'mood-checkin' | 'self-worth' | 'burnout'

const validChapters: ChapterKey[] = ['quiz', 'mood-checkin', 'self-worth', 'burnout']

const chapterBackgrounds: Record<ChapterKey, string> = {
    quiz: '/background/quiz/cave/1.webp',
    'mood-checkin': '/background/mood-checkin/normal.webp',
    'self-worth': '/background/selfworth/oceans1.webp',
    burnout: '/background/burnout/oceans.webp',
}

const STORAGE_KEY = 'quiet-journey-progress'

const chapterOptions: Array<{ id: ChapterKey; label: string; href: string }> = [
    { id: 'quiz', label: 'Quiz', href: '/quiz' },
    { id: 'mood-checkin', label: 'Happiness', href: '/mood-checkin' },
    { id: 'self-worth', label: 'Self-worth', href: '/self-worth' },
    { id: 'burnout', label: 'Burnout', href: '/burnout' },
]

// Chapters that know how to resume mid-flow via `?resume=1`.
// Others just get their plain entry href.
function resumeHrefFor(chapter: ChapterKey): string {
    switch (chapter) {
        case 'quiz':
            return '/quiz?resume=1'
        case 'mood-checkin':
            return '/bottle?resume=1'
        case 'self-worth':
            return '/self-worth?resume=1'
        case 'burnout':
            return '/burnout?resume=1'
        default:
            return chapterOptions.find((c) => c.id === chapter)?.href ?? '/'
    }
}

function readProgress(): Record<ChapterKey, boolean> {
    if (typeof window === 'undefined') {
        return {
            quiz: false,
            'mood-checkin': false,
            'self-worth': false,
            burnout: false,
        }
    }

    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) {
        return {
            quiz: false,
            'mood-checkin': false,
            'self-worth': false,
            burnout: false,
        }
    }

    try {
        const parsed = JSON.parse(saved) as Partial<Record<ChapterKey, boolean>>
        return {
            quiz: parsed.quiz ?? false,
            'mood-checkin': parsed['mood-checkin'] ?? false,
            'self-worth': parsed['self-worth'] ?? false,
            burnout: parsed.burnout ?? false,
        }
    } catch {
        return {
            quiz: false,
            'mood-checkin': false,
            'self-worth': false,
            burnout: false,
        }
    }
}

function writeProgress(progress: Record<ChapterKey, boolean>) {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    }
}

function getCheckpointMessage(
    currentChapter: ChapterKey,
    progress: Record<ChapterKey, boolean>
) {
    const hasMood = progress['mood-checkin']
    const hasBurnout = progress['burnout']
    const hasSelfWorth = progress['self-worth']

    if (currentChapter === 'quiz') {
        return 'ทำ Quiz เสร็จแล้ว! พร้อมเริ่มต้นเรื่องราวบทต่อไปไหม?'
    }

    if (hasMood && hasBurnout && hasSelfWorth) {
        return 'ยินดีด้วย! คุณทำครบทุกส่วนแล้ว'
    }

    // Current: Happiness (mood-checkin)
    if (currentChapter === 'mood-checkin') {
        if (hasBurnout) return 'ทำ Happiness จบแล้ว! มีเวลาต่อ Self-Worth อีก 3 นาทีไหม?'
        if (hasSelfWorth) return 'ทำ Happiness จบแล้ว! มีเวลาต่อ Burnout อีก 3 นาทีไหม?'
        return 'ทำ Happiness จบแล้ว! มีเวลาต่อ Burnout หรือ Self-Worth สัก 3 นาทีไหม?'
    }

    // Current: Burnout
    if (currentChapter === 'burnout') {
        if (hasMood) return 'ทำ Burnout จบแล้ว! มีเวลาต่อ Self-Worth อีก 3 นาทีไหม?'
        if (hasSelfWorth) return 'ทำ Burnout จบแล้ว! มีเวลาต่อ Happiness อีก 3 นาทีไหม?'
        return 'ทำ Burnout จบแล้ว! มีเวลาต่อ Happiness หรือ Self-Worth สัก 3 นาทีไหม?'
    }

    // Current: Self-Worth
    if (currentChapter === 'self-worth') {
        if (hasMood) return 'ทำ Self-Worth จบแล้ว! มีเวลาต่อ Burnout อีก 3 นาทีไหม?'
        if (hasBurnout) return 'ทำ Self-Worth จบแล้ว! มีเวลาต่อ Happiness อีก 3 นาทีไหม?'
        return 'ทำ Self-Worth จบแล้ว! มีเวลาต่อ Happiness หรือ Burnout สัก 3 นาทีไหม?'
    }

    return 'เลือกส่วนต่อไปที่อยากใช้เวลาอยู่ด้วยได้เลยนะ'
}

function ChapterCheckpoint({
    currentChapter,
    onRestart,
}: {
    currentChapter: ChapterKey
    onRestart?: () => void
}) {
    usePageAudio(chapterCheckpointData.sound)
    const [progress, setProgress] = useState<Record<ChapterKey, boolean>>({
        quiz: false,
        'mood-checkin': false,
        'self-worth': false,
        burnout: false,
    })

    useEffect(() => {
        const nextProgress = readProgress()
        nextProgress[currentChapter] = true
        writeProgress(nextProgress)
        setProgress(nextProgress)
    }, [currentChapter])

    const canGoToOutro = progress['mood-checkin'] || progress['self-worth'] || progress.burnout
    const checkpointMessage = getCheckpointMessage(currentChapter, progress)

    return (
        <MobileFrame>
            <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
                <Image
                    src={chapterBackgrounds[currentChapter]}
                    alt=""
                    fill
                    priority
                    className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-black/45" />

                <Link
                    href={resumeHrefFor(currentChapter)}
                    className="absolute top-6 left-6 z-50 rounded-full bg-black/20 p-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-black/40 hover:text-white"
                    aria-label="Go back"
                >
                    ← Back
                </Link>

                <div className="relative z-10 flex min-h-dvh flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
                    <div className="space-y-2">
                        <p className="max-w-sm whitespace-pre-line text-balance text-base leading-relaxed text-white">
                            {checkpointMessage}
                        </p>
                    </div>

                    <div className="flex w-full max-w-sm flex-col gap-3">
                        {chapterOptions.map((chapter) => {
                            const isCurrent = chapter.id === currentChapter
                            return (
                                <Link
                                    key={chapter.id}
                                    href={chapter.href}
                                    className={cn(
                                        buttonVariants({
                                            variant: isCurrent ? 'secondary' : 'outline',
                                            size: 'lg',
                                        }),
                                        'h-14 w-full rounded-2xl text-base',
                                        isCurrent && 'cursor-default opacity-80',
                                    )}
                                >
                                    {isCurrent ? `${chapter.label} (current)` : chapter.label}
                                </Link>
                            )
                        })}
                    </div>

                    {canGoToOutro ? (
                        <Link
                            href="/outro"
                            className={cn(
                                buttonVariants({ variant: 'default', size: 'lg' }),
                                'h-14 w-full max-w-sm rounded-2xl text-base',
                            )}
                        >
                            Continue
                        </Link>
                    ) : (
                        <p className="text-sm text-white/80">
                            เลือกบทที่อยากทำต่อได้เลย
                        </p>
                    )}

                    {onRestart ? (
                        <Button
                            variant="ghost"
                            size="lg"
                            className="h-12 w-full max-w-sm rounded-2xl text-base"
                            onClick={onRestart}
                        >
                            Try this chapter again
                        </Button>
                    ) : null}
                </div>
            </div>
        </MobileFrame>
    )
}

function ChapterCheckpointInner() {
    const searchParams = useSearchParams()
    const from = searchParams.get('from')
    const currentChapter: ChapterKey = validChapters.includes(from as ChapterKey)
        ? (from as ChapterKey)
        : 'quiz'

    return <ChapterCheckpoint currentChapter={currentChapter} />
}

export default function ChapterCheckpointPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChapterCheckpointInner />
        </Suspense>
    )
}