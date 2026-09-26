'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface WhaleGlideProps {
  frames: string[]
  className?: string
  frameIntervalMs?: number
  motion?: 'glide' | 'bob' | 'still'
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

  useEffect(() => {
    if (frames.length < 2) return
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length)
    }, frameIntervalMs)
    return () => clearInterval(id)
  }, [frames, frameIntervalMs])

  return (
    <img
      key={bounceKey}
      src={frames[frame]}
      alt=""
      className={cn(
        'pointer-events-none select-none',
        motion === 'glide' && 'animate-animal-gliding',
        motion === 'bob' && 'animate-animal-bob',
        bounceKey !== undefined && bounceKey > 0 && 'animate-whale-click',
        className
      )}
    />
  )
}