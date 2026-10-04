'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const stopHoldDuration = 5_000
const textChip = 'inline-block rounded-2xl border border-white/60 bg-white/40 px-4 py-3 whitespace-pre-line text-pretty font-body text-lg leading-relaxed text-gray-900 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.15)] float-up'
export function StopWhale({ label, onComplete }: { label: string; onComplete: () => void }) {
    const [progress, setProgress] = useState(0)
    const [isHolding, setIsHolding] = useState(false)
    const holdStartRef = useRef<number | null>(null)
    const animationFrameRef = useRef<number | null>(null)
    const completedRef = useRef(false)
    const circumference = 2 * Math.PI * 52

    const cancelHold = () => {
        if (holdStartRef.current === null) return
        const elapsed = performance.now() - holdStartRef.current
        holdStartRef.current = null
        if (animationFrameRef.current !== null) {
            window.cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = null
        }

        if (elapsed >= stopHoldDuration) {
            completedRef.current = true
            setIsHolding(false)
            setProgress(1)
            onComplete()
            return
        }

        setIsHolding(false)
        setProgress(0)
    }

    const startHold = () => {
        if (holdStartRef.current !== null || completedRef.current) return
        holdStartRef.current = performance.now()
        setIsHolding(true)

        const updateProgress = (now: number) => {
            if (holdStartRef.current === null) return
            const nextProgress = Math.min((now - holdStartRef.current) / stopHoldDuration, 1)
            setProgress(nextProgress)

            if (nextProgress === 1) {
                holdStartRef.current = null
                animationFrameRef.current = null
                completedRef.current = true
                setIsHolding(false)
                onComplete()
                return
            }

            animationFrameRef.current = window.requestAnimationFrame(updateProgress)
        }

        animationFrameRef.current = window.requestAnimationFrame(updateProgress)
    }

    useEffect(() => () => {
        if (animationFrameRef.current !== null) {
            window.cancelAnimationFrame(animationFrameRef.current)
        }
    }, [])

    return (
        <div className="pointer-events-auto absolute inset-x-0 bottom-16 z-30 flex flex-col items-center gap-8 px-6">
            <span className={cn(textChip, 'leading-relaxed')}>
                {label}
            </span>
            <button
                type="button"
                aria-label={`${label}, hold for 10 seconds`}
                aria-pressed={isHolding}
                onPointerDown={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    event.currentTarget.setPointerCapture(event.pointerId)
                    startHold()
                }}
                onPointerUp={(event) => {
                    event.stopPropagation()
                    cancelHold()
                }}
                onPointerCancel={cancelHold}
                onLostPointerCapture={cancelHold}
                onKeyDown={(event) => {
                    if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
                        event.preventDefault()
                        startHold()
                    }
                }}
                onKeyUp={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        cancelHold()
                    }
                }}
                onBlur={cancelHold}
                onClick={(event) => event.stopPropagation()}
                style={{ width: 180, height: 180 }}
               className="relative flex shrink-0 touch-none items-center justify-center rounded-full text-white"
            >
              <svg style={{ width: 196, height: 196 }} className="pointer-events-none absolute -inset-2 -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
        <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#fafdfc"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
        />
    </svg>
    <span className="pointer-events-none relative z-10 text-center text-2xl font-medium leading-none text-white/90">
        {isHolding ? 'หยุดไว้' : 'แตะค้าง'}
    </span>
            </button>
        </div>
    )
}