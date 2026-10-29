'use client'

import { memo, useEffect, useMemo, useState, useCallback } from 'react'
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
  return (
    previousImages.length === nextImages.length &&
    previousImages.every((image, index) => image === nextImages[index])
  )
}

export const DecorationBackground = memo(
  function DecorationBackground({
    images,
    intervalMs = 1200,
  }: DecorationBackgroundProps) {
    const imagesKey = normalizeImages(images).join(',')
    const safeImages = useMemo(() => normalizeImages(images), [imagesKey])
    const [index, setIndex] = useState(0)
    const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({})

    const markLoaded = useCallback((src: string) => {
      setLoadedMap((prev) => (prev[src] ? prev : { ...prev, [src]: true }))
    }, [])

    // Preload all frames into browser cache
    useEffect(() => {
      if (typeof window === 'undefined' || safeImages.length === 0) return

      safeImages.forEach((src) => {
        const img = new window.Image()
        img.src = src
        if (img.complete) {
          markLoaded(src)
        } else {
          img.onload = () => markLoaded(src)
        }
      })
    }, [imagesKey, safeImages, markLoaded])

    useEffect(() => {
      setIndex(0)
    }, [imagesKey])

    // Advance only when next frame has finished loading
    useEffect(() => {
      if (safeImages.length <= 1) return

      let timer: ReturnType<typeof setTimeout>

      const scheduleNext = () => {
        timer = setTimeout(() => {
          const nextIdx = (index + 1) % safeImages.length
          const nextSrc = safeImages[nextIdx]

          if (loadedMap[nextSrc]) {
            setIndex(nextIdx)
          } else {
            scheduleNext()
          }
        }, intervalMs)
      }

      scheduleNext()

      return () => clearTimeout(timer)
    }, [index, safeImages, intervalMs, loadedMap])

    if (!safeImages.length) {
      return null
    }

    const safeIndex = index % safeImages.length

    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-9">
        {safeImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            className={`object-cover transition-opacity duration-300 ${
              i === safeIndex ? 'opacity-100' : 'opacity-0'
            }`}
            priority
            onLoad={() => markLoaded(src)}
          />
        ))}
      </div>
    )
  },
  (previous, next) =>
    previous.intervalMs === next.intervalMs &&
    haveSameImages(previous.images, next.images)
)