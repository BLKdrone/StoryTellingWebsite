"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ChapterId = 'quiz' | 'mood-checkin' | 'self-worth' | 'burnout'

const STORAGE_KEY = 'quiet-journey-progress'

const chapterOptions: Array<{ id: ChapterId; label: string; href: string }> = [
    { id: 'quiz', label: 'Quiz', href: '/quiz' },
    { id: 'mood-checkin', label: 'Happiness', href: '/mood-checkin' },
    { id: 'self-worth', label: 'Self-worth', href: '/self-worth' },
    { id: 'burnout', label: 'Burnout', href: '/burnout' },
]

function readProgress(): Record<ChapterId, boolean> {
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
        const parsed = JSON.parse(saved) as Partial<Record<ChapterId, boolean>>
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

function writeProgress(progress: Record<ChapterId, boolean>) {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    }
}

function getCheckpointMessage(
    currentChapter: ChapterId,
    progress: Record<ChapterId, boolean>
) {
    const hasMood = progress['mood-checkin'];
    const hasBurnout = progress['burnout'];
    const hasSelfWorth = progress['self-worth'];

    if (currentChapter === 'quiz') {
        return 'ทำ Quiz เสร็จแล้ว! พร้อมเริ่มต้นเรื่องราวบทต่อไปไหม?';
    }

    if (hasMood && hasBurnout && hasSelfWorth) {
        return 'ยินดีด้วย! คุณทำครบทุกส่วนแล้ว';
    }

    // Current: Happiness (mood-checkin)
    if (currentChapter === 'mood-checkin') {
        if (hasBurnout) return 'ทำ Happiness จบแล้ว! มีเวลาต่อ Self-Worth อีก 3 นาทีไหม?';
        if (hasSelfWorth) return 'ทำ Happiness จบแล้ว! มีเวลาต่อ Burnout อีก 3 นาทีไหม?';
        return 'ทำ Happiness จบแล้ว! มีเวลาต่อ Burnout หรือ Self-Worth สัก 3 นาทีไหม?';
    }

    // Current: Burnout
    if (currentChapter === 'burnout') {
        if (hasMood) return 'ทำ Burnout จบแล้ว! มีเวลาต่อ Self-Worth อีก 3 นาทีไหม?';
        if (hasSelfWorth) return 'ทำ Burnout จบแล้ว! มีเวลาต่อ Happiness อีก 3 นาทีไหม?';
        return 'ทำ Burnout จบแล้ว! มีเวลาต่อ Happiness หรือ Self-Worth สัก 3 นาทีไหม?';
    }

    // Current: Self-Worth
    if (currentChapter === 'self-worth') {
        if (hasMood) return 'ทำ Self-Worth จบแล้ว! มีเวลาต่อ Burnout อีก 3 นาทีไหม?';
        if (hasBurnout) return 'ทำ Self-Worth จบแล้ว! มีเวลาต่อ Happiness อีก 3 นาทีไหม?';
        return 'ทำ Self-Worth จบแล้ว! มีเวลาต่อ Happiness หรือ Burnout สัก 3 นาทีไหม?';
    }

    return 'เลือกส่วนต่อไปที่อยากใช้เวลาอยู่ด้วยได้เลยนะ';
}

export function ChapterCheckpoint({
    currentChapter,
    onRestart,
}: {
    currentChapter: ChapterId
    onRestart?: () => void
}) {
    const [progress, setProgress] = useState<Record<ChapterId, boolean>>({
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
        <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
            <div aria-hidden className="absolute inset-0" style={{ backgroundColor: '#0a2230' }} />
            <div className="relative z-10 flex min-h-dvh flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
                <div className="space-y-2">
                    {/* <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                        Chapter checkpoint
                    </p> */}
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

                {canGoToOutro ? (
                    <Link
                        href="/outro"
                        className={cn(
                            buttonVariants({ variant: 'default', size: 'lg' }),
                            'h-14 w-full max-w-sm rounded-2xl text-base',
                        )}
                    >
                        Continue to outro
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
