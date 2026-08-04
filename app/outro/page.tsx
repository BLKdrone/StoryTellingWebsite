'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { MobileFrame } from '@/components/mobile-frame'
import { BackgroundSlideshow } from '@/components/animations/background-slideshow'
import { motion, AnimatePresence } from 'motion/react'
import { outroPages } from '@/data/outro'

const textChip = 'inline-block rounded-[5px] bg-white px-3 py-1 text-black'

export default function OutroPage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)

  const total = outroPages.length
  const page = outroPages[index]

  const finish = () => {
    router.push('/chapter-checkpoint?from=outro')
  }

  const advance = () => {
    if (index + 1 < total) {
      setIndex((i) => i + 1)
    } else {
      finish()
    }
  }

  const handleBack = () => {
    if (index > 0) {
      setIndex((i) => i - 1)
    }
  }

  return (
    <MobileFrame>
      <div
        key={page.id}
        role="button"
        tabIndex={0}
        onClick={advance}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') advance()
        }}
        className="animate-fade-in relative flex min-h-dvh flex-1 cursor-pointer flex-col"
      >
        <BackgroundSlideshow images={page.background} intervalMs={1200} />

        <div className="relative z-10 flex min-h-dvh flex-1 flex-col p-6">
          {index > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleBack()
              }}
              className="absolute top-6 left-6 z-50 rounded-[5px] bg-white px-3 py-2 text-sm font-medium text-black backdrop-blur-md transition-colors hover:bg-white/90"
              aria-label="Go back"
            >
              ← Back
            </button>
          )}

          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-balance whitespace-pre-line text-base leading-relaxed">
              <span className={cn(textChip, 'leading-relaxed')}>{page.text}</span>
            </p>
          </div>
        </div>

        <AnimatePresence>
          {page.flashTransition && (
            <motion.div
              key={page.id}
              aria-hidden
              className={cn(
                'pointer-events-none absolute inset-0 z-50',
                page.flashTransition === 'black' ? 'bg-black' : 'bg-white',
              )}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 5, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>
      </div>
    </MobileFrame>
  )
}