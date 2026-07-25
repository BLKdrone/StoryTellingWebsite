'use client'

import { useSearchParams } from 'next/navigation'
import { ChapterCheckpoint } from '@/components/chapter-checkpoint'

type ChapterKey = 'quiz' | 'mood-checkin' | 'self-worth' | 'burnout'

const validChapters: ChapterKey[] = ['quiz', 'mood-checkin', 'self-worth', 'burnout']

export default function ChapterCheckpointPage() {
    const searchParams = useSearchParams()
    const from = searchParams.get('from')
    const currentChapter: ChapterKey = validChapters.includes(from as ChapterKey)
        ? (from as ChapterKey)
        : 'quiz'

    return <ChapterCheckpoint currentChapter={currentChapter} />
}