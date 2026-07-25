'use client'

import { useEffect, useState } from 'react'
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

  // Preload all images up front so there's never a blank frame
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [images])

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [images, intervalMs])

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {images.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${src})` }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}