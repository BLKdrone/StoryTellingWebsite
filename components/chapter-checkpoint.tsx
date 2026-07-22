"use client"
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ChapterKey = 'quiz' | 'mood-checkin' | 'self-worth' | 'burnout'

const STORAGE_KEY = 'quiet-journey-progress'

const chapterOptions: Array<{ id: ChapterKey; label: string; href: string }> = [
    { id: 'quiz', label: 'Quiz', href: '/quiz' },
    { id: 'mood-checkin', label: 'Mood check-in', href: '/mood-checkin' },
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

export function ChapterCheckpoint({
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

    return (
        <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
            <div aria-hidden className="absolute inset-0" style={{ backgroundColor: '#0a2230' }} />
            <div className="relative z-10 flex min-h-dvh flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
                <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                        Chapter checkpoint
                    </p>
                    <h1 className="font-serif text-3xl text-foreground">
                        You have reached the next quiet turn.
                    </h1>
                    <p className="max-w-sm text-balance text-base leading-relaxed text-muted-foreground">
                        Choose any chapter to continue from here. The conclusion waits until all four are complete.
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
                        href="/conclusion"
                        className={cn(
                            buttonVariants({ variant: 'default', size: 'lg' }),
                            'h-14 w-full max-w-sm rounded-2xl text-base',
                        )}
                    >
                        Continue to conclusion
                    </Link>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Complete the remaining chapters to unlock the conclusion.
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
