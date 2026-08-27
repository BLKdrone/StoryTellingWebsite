'use client'

import Link from 'next/link'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ChapterKey = 'quiz' | 'mood-checkin' | 'self-worth' | 'burnout'

const validChapters: ChapterKey[] = ['quiz', 'mood-checkin', 'self-worth', 'burnout']

const STORAGE_KEY = 'quiet-journey-progress'

const chapterOptions: Array<{ id: ChapterKey; label: string; href: string }> = [
    { id: 'quiz', label: 'Quiz', href: '/quiz' },
    { id: 'mood-checkin', label: 'Happiness', href: '/mood-checkin' },
    { id: 'self-worth', label: 'Self-worth', href: '/self-worth' },
    { id: 'burnout', label: 'Burnout', href: '/burnout' },
]

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

    const allComplete = useMemo(
        () => chapterOptions.every((chapter) => progress[chapter.id]),
        [progress],
    )
    const checkpointMessage = getCheckpointMessage(currentChapter, progress)

    return (
        <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
            <div aria-hidden className="absolute inset-0" style={{ backgroundColor: '#0a2230' }} />
            <div className="relative z-10 flex min-h-dvh flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
                <div className="space-y-2">
                    <p className="max-w-sm text-balance text-base leading-relaxed text-muted-foreground">
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

                {allComplete ? (
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
                    <p className="text-sm text-muted-foreground">
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