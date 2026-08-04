'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'

interface BackgroundSlideshowProps {
  images: string[]
  intervalMs?: number
}

export function BackgroundSlideshow({
  images,
  intervalMs = 1000,
}: BackgroundSlideshowProps) {
  // Strip out any falsy/empty entries up front — this is the root fix
  const safeImages = images.filter((src): src is string => Boolean(src))

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

  if (!safeImages.length) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(10, 24, 36, 0.95) 0%, rgba(37, 74, 95, 0.92) 50%, rgba(8, 18, 27, 0.95) 100%)',
          backgroundColor: '#0f1b26',
        }}
      />
    )
  }

  // Clamp so a mid-transition array-length change can never point out of bounds
  const safeIndex = index % safeImages.length
  const safePrevIndex = prevIndex.current % safeImages.length
  const nextSrc =
    safeImages.length > 1 ? safeImages[(safeIndex + 1) % safeImages.length] : null

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-[#0f1b26]">
      <div className="absolute inset-0">
        <Image
          src={safeImages[safePrevIndex]}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      <motion.div
        key={safeIndex}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        onAnimationComplete={() => {
          prevIndex.current = safeIndex
        }}
      >
        <Image
          src={safeImages[safeIndex]}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Preload next image seamlessly — only render when we actually have a src */}
      {nextSrc && (
        <div className="hidden">
          <Image src={nextSrc} alt="" fill priority />
        </div>
      )}
    </div>
  )
}