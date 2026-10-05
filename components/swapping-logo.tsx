'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export function SwappingLogo() {
  const [showLogo1, setShowLogo1] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogo1((prev) => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[900px] w-[2500px] max-w-full mx-auto z-20 -mt-[330px] pointer-events-none">
      {showLogo1 ? (
        <Image
          src="/background/intro/logo1.PNG"
          alt="Logo 1"
          fill
          priority
          className="object-contain"
        />
      ) : (
        <Image
          src="/background/intro/logo2.PNG"
          alt="Logo 2"
          fill
          priority
          className="object-contain"
        />
      )}
    </div>
  )
}