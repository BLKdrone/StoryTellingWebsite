'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'

interface BackgroundSlideshowProps {
  images?: string | string[]
  intervalMs?: number
  fill?: boolean
  imageClassName?: string
}

export function BackgroundSlideshow({
  images,
  intervalMs = 1000,
  fill = true,
  imageClassName = 'object-cover',
}: BackgroundSlideshowProps) {
  // Strip out any falsy/empty entries up front
  const imageList = images == null ? [] : Array.isArray(images) ? images : [images]
  const safeImages = imageList.filter((src): src is string => Boolean(src))

  const [index, setIndex] = useState(0)
  const prevIndex = useRef(0)
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({})

  const markLoaded = useCallback((src: string) => {
    setLoadedMap((prev) => (prev[src] ? prev : { ...prev, [src]: true }))
  }, [])

  const imagesKey = safeImages.join(',')

  // Preload all slideshow images into browser memory to eliminate network delay flashes
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

  // Reset indices when image list changes
  useEffect(() => {
    setIndex(0)
    prevIndex.current = 0
  }, [imagesKey])

  // Advance slideshow smoothly only when the next frame has finished downloading
  useEffect(() => {
    if (safeImages.length <= 1) return

    let timer: ReturnType<typeof setTimeout>

    const scheduleNext = () => {
      timer = setTimeout(() => {
        const nextIdx = (index + 1) % safeImages.length
        const nextSrc = safeImages[nextIdx]

        // Only advance if next image is loaded in memory; otherwise wait to prevent blank frames
        if (loadedMap[nextSrc]) {
          prevIndex.current = index
          setIndex(nextIdx)
        } else {
          scheduleNext()
        }
      }, intervalMs)
    }

    scheduleNext()

    return () => clearTimeout(timer)
  }, [index, safeImages, intervalMs, loadedMap])

  if (safeImages.length === 0) {
    return null
  }

  const safeIndex = index % safeImages.length
  const safePrevIndex = prevIndex.current % safeImages.length
  const isFirstMountOrSame = safeIndex === safePrevIndex
  const fadeDuration = Math.min(0.5, (intervalMs / 1000) * 0.7)

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Base layer: the previous image stays visible underneath during transition */}
      {safeImages[safePrevIndex] && (
        <div className="absolute inset-0">
          <Image
            src={safeImages[safePrevIndex]}
            alt=""
            fill={fill}
            width={fill ? undefined : 400}
            height={fill ? undefined : 200}
            className={imageClassName}
            priority
          />
        </div>
      )}

      {/* Top transition layer */}
      <motion.div
        key={safeIndex}
        className="absolute inset-0"
        initial={{ opacity: isFirstMountOrSame ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: isFirstMountOrSame ? 0 : fadeDuration, ease: 'easeInOut' }}
        onAnimationComplete={() => {
          prevIndex.current = safeIndex
        }}
      >
        <Image
          src={safeImages[safeIndex]}
          alt=""
          fill={fill}
          width={fill ? undefined : 400}
          height={fill ? undefined : 200}
          className={imageClassName}
          priority
          onLoad={() => markLoaded(safeImages[safeIndex])}
        />
      </motion.div>
    </div>
  )
}
