'use client'

import { useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface WhaleGlideProps {
  frames: string[]
  className?: string
  frameIntervalMs?: number
  motion?: 'glide' | 'bob' | 'fight' | 'still'
  bounceKey?: number
}

export function WhaleGlide({
  frames,
  className,
  frameIntervalMs = 400,
  motion = 'glide',
  bounceKey,
}: WhaleGlideProps) {
  const [frame, setFrame] = useState(0)
  const [loadedFrames, setLoadedFrames] = useState<Record<string, boolean>>({})

  const markLoaded = useCallback((src: string) => {
    setLoadedFrames((prev) => (prev[src] ? prev : { ...prev, [src]: true }))
  }, [])

  // Preload all animal frames into browser cache
  useEffect(() => {
    if (typeof window === 'undefined' || !frames || frames.length === 0) return

    frames.forEach((src) => {
      const img = new window.Image()
      img.src = src
      if (img.complete) {
        markLoaded(src)
      } else {
        img.onload = () => markLoaded(src)
      }
    })
  }, [frames, markLoaded])

  // Only advance to the next frame when it is loaded in memory
  useEffect(() => {
    if (frames.length < 2) return

    let timer: ReturnType<typeof setTimeout>

    const scheduleNext = () => {
      timer = setTimeout(() => {
        const nextFrame = (frame + 1) % frames.length
        const nextSrc = frames[nextFrame]

        if (loadedFrames[nextSrc]) {
          setFrame(nextFrame)
        } else {
          scheduleNext()
        }
      }, frameIntervalMs)
    }

    scheduleNext()

    return () => clearTimeout(timer)
  }, [frame, frames, frameIntervalMs, loadedFrames])

  return (
    <img
      key={bounceKey}
      src={frames[frame]}
      alt=""
      onLoad={() => markLoaded(frames[frame])}
      className={cn(
        'pointer-events-none select-none',
        motion === 'glide' && 'animate-animal-gliding',
        motion === 'bob' && 'animate-animal-bob',
        motion === 'fight' && 'animate-animal-fight-wind',
        bounceKey !== undefined && bounceKey > 0 && 'animate-whale-click',
        className
      )}
    />
  )
}
