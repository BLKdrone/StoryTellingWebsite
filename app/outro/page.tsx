'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { MobileFrame } from '@/components/mobile-frame'
import { BackgroundSlideshow } from '@/components/animations/background-slideshow'
import { motion, AnimatePresence } from 'motion/react'
import { outroPages } from '@/data/outro'
import { Button } from '@/components/ui/button'
import { animals } from '@/data/quiz'
import { getQuizResult, clearQuizResult } from '@/lib/quiz-result'

const textChip = 'inline-block rounded-[5px] bg-white px-3 py-1 text-black'

export default function OutroPage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const total = outroPages.length
  const page = outroPages[index]
  const result = getQuizResult()

  const finish = () => {
    router.push('/chapter-checkpoint?from=outro')
  }

  const advance = () => {
    if (index + 1 < total) {
      setIndex((i) => i + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleBack = () => {
    if (showResult) {
      setShowResult(false)
      return
    }
    if (index > 0) {
      setIndex((i) => i - 1)
    }
  }

  const restart = () => {
    clearQuizResult()
    router.push('/quiz')
  }

  if (showResult) {
    if (!result) {
      // No stored result (e.g. user navigated here directly) — send them back
      router.push('/quiz')
      return null
    }

    const animal = animals[result]

    return (
      <MobileFrame>
        <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
          <div aria-hidden className="absolute inset-0 bg-[#0a2230]">
            {animal.background && (
              <img
                src={animal.background}
                alt=""
                className="h-full w-full object-cover opacity-30 mix-blend-overlay"
              />
            )}
          </div>
          <div className="relative z-10 flex min-h-dvh flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
            <p className="text-sm uppercase tracking-widest">
              <span className={textChip}>เมื่อเปิดออกเป็นสิ่งที่ใช่หรือไม่</span>
            </p>
            <div
              className="animate-float flex h-32 w-32 items-center justify-center overflow-hidden rounded-full"
              aria-hidden
            >
              <img
                src={animal.background}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-serif text-4xl text-background">
              {animal.name.charAt(0)}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <h1 className="font-serif text-4xl">
              <span className={textChip}>{animal.name}</span>
            </h1>
            <p className="text-lg">
              <span className={textChip}>{animal.tagline}</span>
            </p>
          </div>

          <p className="max-w-sm text-balance text-base italic leading-relaxed">
            <span className={cn(textChip, 'py-2 leading-relaxed')}>&ldquo;{animal.quote}&rdquo;</span>
          </p>

          <p className="max-w-sm text-balance text-base leading-relaxed">
            <span className={cn(textChip, 'py-2 leading-relaxed')}>{animal.description}</span>
          </p>

          <div className="flex w-full max-w-sm flex-col gap-3 text-left">
            <div>
              <p className="mb-1 text-xs uppercase tracking-widest">
                <span className={textChip}>Vibes</span>
              </p>
              <p className="text-sm leading-relaxed">
                <span className={cn(textChip, 'py-2 leading-relaxed')}>{animal.vibes}</span>
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs uppercase tracking-widest">
                <span className={textChip}>Behavior & Habitat</span>
              </p>
              <p className="text-sm leading-relaxed">
                <span className={cn(textChip, 'py-2 leading-relaxed')}>{animal.behaviorHabitat}</span>
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs uppercase tracking-widest">
                <span className={textChip}>Strength</span>
              </p>
              <p className="text-sm leading-relaxed">
                <span className={cn(textChip, 'py-2 leading-relaxed')}>{animal.strength}</span>
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs uppercase tracking-widest">
                <span className={textChip}>Weakness</span>
              </p>
              <p className="text-sm leading-relaxed">
                <span className={cn(textChip, 'py-2 leading-relaxed')}>{animal.weakness}</span>
              </p>
            </div>
          </div>

          <div className="mt-4 flex w-full max-w-xs flex-col gap-3">
            <Button
              size="lg"
              className="h-14 w-full rounded-[5px] bg-white text-base text-black hover:bg-white/90"
              onClick={restart}
            >
              Take it again
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="h-12 w-full rounded-[5px] bg-white text-base text-black hover:bg-white/90"
              onClick={finish}
            >
              Continue to checkpoint
            </Button>
          </div>
        </div>
      </MobileFrame>
    )

  }

  return (
    <MobileFrame>
      <div
        role="button"
        tabIndex={0}
        onClick={advance}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') advance()
        }}
        className="animate-fade-in relative flex min-h-dvh flex-1 cursor-pointer flex-col"
      >
        <BackgroundSlideshow images={page.background} intervalMs={1200} />

        <div key={page.id} className="relative z-10 flex min-h-dvh flex-1 flex-col p-6">
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