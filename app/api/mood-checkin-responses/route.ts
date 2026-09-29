import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

const moodValues = ['happy', 'neutral', 'sad', 'overwhelmed'] as const

function isMood(value: unknown): value is (typeof moodValues)[number] {
    return typeof value === 'string' && moodValues.includes(value as (typeof moodValues)[number])
}

export async function POST(request: Request) {
    let body: unknown
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    if (typeof body !== 'object' || body === null) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const payload = body as { answers?: unknown; mood?: unknown }
    const answers = payload.answers
    if (
        !isMood(payload.mood) ||
        typeof answers !== 'object' ||
        answers === null ||
        typeof (answers as Record<string, unknown>).overwhelmedstorm !== 'string'
    ) {
        return NextResponse.json({ error: 'A mood and overwhelmedstorm answer are required' }, { status: 400 })
    }

    const answer = (answers as Record<string, string>).overwhelmedstorm
    try {
        const saved = await prisma.moodCheckinResponse.create({
            data: {
                answers: JSON.stringify({ overwhelmedstorm: answer }),
                mood: payload.mood,
            },
            select: { id: true },
        })
        return NextResponse.json({ id: saved.id }, { status: 201 })
    } catch (error) {
        console.error('Failed to save mood check-in response:', error)
        return NextResponse.json({ error: 'Could not save mood check-in response' }, { status: 500 })
    }
}