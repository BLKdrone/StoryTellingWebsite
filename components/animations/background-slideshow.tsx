'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

interface BackgroundSlideshowProps {
  images: string[]
  intervalMs?: number
}

export function BackgroundSlideshow({
  images,
  intervalMs = 1000,
}: BackgroundSlideshowProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, intervalMs)

    return () => clearInterval(id)
  }, [images, intervalMs])

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden" >
      <AnimatePresence>
        <motion.div
          key={images[index]}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[index]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </div>
  )
}