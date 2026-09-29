import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

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

    const answers = (body as { answers?: unknown }).answers
    if (
        typeof answers !== 'object' ||
        answers === null ||
        typeof (answers as Record<string, unknown>)['sw-want'] !== 'string'
    ) {
        return NextResponse.json({ error: 'A sw-want answer is required' }, { status: 400 })
    }

    const wantedAnswer = (answers as Record<string, string>)['sw-want']
    try {
        const saved = await prisma.selfWorthResponse.create({
            data: { answers: JSON.stringify({ 'sw-want': wantedAnswer }) },
            select: { id: true },
        })
        return NextResponse.json({ id: saved.id }, { status: 201 })
    } catch (error) {
        console.error('Failed to save self-worth response:', error)
        return NextResponse.json({ error: 'Could not save self-worth response' }, { status: 500 })
    }
}