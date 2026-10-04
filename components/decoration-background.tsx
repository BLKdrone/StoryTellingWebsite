'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'

interface DecorationBackgroundProps {
  images?: string | string[]
  intervalMs?: number
}

function normalizeImages(images?: string | string[]) {
  const imageList = images == null ? [] : Array.isArray(images) ? images : [images]
  return imageList.filter((src): src is string => Boolean(src))
}

function haveSameImages(previous?: string | string[], next?: string | string[]) {
  const previousImages = normalizeImages(previous)
  const nextImages = normalizeImages(next)
  return previousImages.length === nextImages.length
    && previousImages.every((image, index) => image === nextImages[index])
}

export const DecorationBackground = memo(function DecorationBackground({
  images,
  intervalMs = 1200,
}: DecorationBackgroundProps) {
  const safeImages = normalizeImages(images)
  const [index, setIndex] = useState(0)
  const prevIndex = useRef(0)

  useEffect(() => {
    if (safeImages.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((prev) => {
        prevIndex.current = prev
        return (prev + 1) % safeImages.length
      })
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [safeImages.length, intervalMs])

  const imagesKey = safeImages.join(',')
  useEffect(() => {
    setIndex(0)
    prevIndex.current = 0
  }, [imagesKey])

  // Don't render if no images
  if (!safeImages.length) {
    return null
  }

  const safeIndex = index % safeImages.length
  const safePrevIndex = prevIndex.current % safeImages.length
  const nextSrc =
    safeImages.length > 1 ? safeImages[(safeIndex + 1) % safeImages.length] : null

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden z-9">
      {/* Current image - instant swap, no transition */}
      <Image
        key={safeIndex}
        src={safeImages[safeIndex]}
        alt=""
        fill
        className="object-cover"
        priority
      />

      {/* Preload next image */}
      {nextSrc && (
        <div className="hidden">
          <Image src={nextSrc} alt="" fill priority />
        </div>
      )}
    </div>
  )
}, (previous, next) => previous.intervalMs === next.intervalMs && haveSameImages(previous.images, next.images))