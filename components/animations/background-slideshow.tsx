'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

interface BackgroundSlideshowProps {
  images: string[]
  intervalMs?: number
}

const placeholderStyle = {
  backgroundImage:
    'linear-gradient(135deg, rgba(10, 24, 36, 0.95) 0%, rgba(37, 74, 95, 0.92) 50%, rgba(8, 18, 27, 0.95) 100%)',
  backgroundColor: '#0f1b26',
}

export function BackgroundSlideshow({
  images,
  intervalMs = 1000,
}: BackgroundSlideshowProps) {
  // Seed loadedImages synchronously for any image the browser already has
  // cached, so the very first paint can skip the placeholder if possible.
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    if (typeof window !== 'undefined') {
      for (const src of images) {
        if (!src) continue
        const img = new Image()
        img.src = src
        if (img.complete && img.naturalWidth > 0) {
          initial[src] = true
        }
      }
    }
    return initial
  })
  const [index, setIndex] = useState(0)
  const prevIndex = useRef(0)
  const imageCacheRef = useRef<Record<string, HTMLImageElement>>({})

  // Preload only the current and the next image to save bandwidth.
  // We rely on the interval check to not advance until the next is ready.
  useEffect(() => {
    if (!images.length) return

    const preloadImage = (src: string) => {
      if (!src) return
      if (imageCacheRef.current[src]) {
        const cached = imageCacheRef.current[src]
        if (cached.complete && cached.naturalWidth > 0) {
          setLoadedImages((prev) => (prev[src] ? prev : { ...prev, [src]: true }))
        }
        return
      }

      const img = new Image()
      img.decoding = 'async'
      imageCacheRef.current[src] = img

      const markLoaded = () => {
        setLoadedImages((prev) => (prev[src] ? prev : { ...prev, [src]: true }))
      }
      const markFailed = () => {
        setLoadedImages((prev) => (prev[src] === false ? prev : { ...prev, [src]: false }))
      }

      img.onload = markLoaded
      img.onerror = markFailed
      img.src = src

      if (img.complete && img.naturalWidth > 0) {
        markLoaded()
        return
      }
      img.decode?.().then(markLoaded).catch(() => {
        // decode() can reject even on a valid, still-loading image in some
        // browsers; onload/onerror above are the source of truth.
      })
    }

    preloadImage(images[index])
    if (images.length > 1) {
      preloadImage(images[(index + 1) % images.length])
    }
  }, [images, index])

  // Advance the slide only once the next image is actually ready. If it
  // isn't, skip this tick and try again on the next one rather than
  // covering the current (good) frame with the placeholder.
  useEffect(() => {
    if (images.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % images.length
        if (!loadedImages[images[next]]) return prev
        prevIndex.current = prev
        return next
      })
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [images, intervalMs, loadedImages])

  const imagesKey = images.join(',')
  // Reset to slide 0 whenever the images array itself changes (e.g. quiz
  // page navigation swaps in a new background list for a remounted
  // component instance).
  useEffect(() => {
    setIndex(0)
    prevIndex.current = 0
  }, [imagesKey])

  const getLayerStyle = (src: string | undefined) => {
    if (src && loadedImages[src]) {
      return {
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    }
    return {
      ...placeholderStyle,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={getLayerStyle(images[prevIndex.current])}
      />
      <motion.div
        key={index}
        className="absolute inset-0 bg-cover bg-center"
        style={getLayerStyle(images[index])}
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