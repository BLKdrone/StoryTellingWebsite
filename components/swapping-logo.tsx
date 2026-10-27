'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const LOGO_1 = '/background/intro/logo1.PNG'
const LOGO_2 = '/background/intro/logo2.PNG'

export function SwappingLogo() {
  const [showLogo1, setShowLogo1] = useState(true)
  const [loaded1, setLoaded1] = useState(false)
  const [loaded2, setLoaded2] = useState(false)

  // Preload both logo images into browser cache
  useEffect(() => {
    if (typeof window === 'undefined') return

    const img1 = new window.Image()
    img1.src = LOGO_1
    if (img1.complete) setLoaded1(true)
    else img1.onload = () => setLoaded1(true)

    const img2 = new window.Image()
    img2.src = LOGO_2
    if (img2.complete) setLoaded2(true)
    else img2.onload = () => setLoaded2(true)
  }, [])

  // Only start alternating once both logo frames are completely downloaded
  useEffect(() => {
    if (!loaded1 || !loaded2) return

    const interval = setInterval(() => {
      setShowLogo1((prev) => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [loaded1, loaded2])

  return (
    <div className="relative h-[900px] w-[2500px] max-w-full mx-auto z-20 -mt-[330px] pointer-events-none">
      {/* Both images stay mounted to avoid empty unmount frames during network requests */}
      <Image
        src={LOGO_1}
        alt="Logo 1"
        fill
        priority
        onLoad={() => setLoaded1(true)}
        className={cn(
          'object-contain transition-opacity duration-300',
          showLogo1 ? 'opacity-100' : 'opacity-0'
        )}
      />
      <Image
        src={LOGO_2}
        alt="Logo 2"
        fill
        priority
        onLoad={() => setLoaded2(true)}
        className={cn(
          'object-contain transition-opacity duration-300',
          showLogo1 ? 'opacity-0' : 'opacity-100'
        )}
      />
    </div>
  )
}
