'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'

interface BackgroundSlideshowProps {
  images: string[]
  intervalMs?: number
}

export function BackgroundSlideshow({
  images,
  intervalMs = 1000,
}: BackgroundSlideshowProps) {
  const [index, setIndex] = useState(0)
  const prevIndex = useRef(0)

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [images])

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => {
      setIndex((prev) => {
        prevIndex.current = prev
        return (prev + 1) % images.length
      })
    }, intervalMs)
    return () => clearInterval(id)
  }, [images, intervalMs])

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* base layer: always the previous image, fully opaque, no animation */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images[prevIndex.current]})` }}
      />
      {/* incoming layer: fades in on top */}
      <motion.div
        key={index}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images[index]})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        onAnimationComplete={() => {
          prevIndex.current = index
        }}
      />
    </div>
  )
}