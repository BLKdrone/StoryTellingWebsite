'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MobileFrame } from '@/components/mobile-frame'
import {
  animals,
  quizQuestions,
  scoreQuiz,
  type AnimalKey,
  type QuizOption,
} from '@/data/quiz'
import { BackgroundSlideshow } from '@/components/animations/background-slideshow'
import { motion, AnimatePresence } from 'motion/react'

// Shared style: black text sitting on a white rounded-radius-5 rectangle "chip"
const textChip = 'inline-block rounded-[5px] bg-white px-3 py-1 text-black'

export default function QuizPage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizOption['letter'][]>([])
  const [result, setResult] = useState<AnimalKey | null>(null)

  const total = quizQuestions.length
  const page = quizQuestions[index]

  const handleSelect = (letter: QuizOption['letter']) => {
    const nextAnswers = [...answers, letter]
    setAnswers(nextAnswers)

    if (index + 1 < total) {
      setIndex((i) => i + 1)
    } else {
      setResult(scoreQuiz(nextAnswers))
    }
  }

  const handleAdvance = () => {
    if (index + 1 < total) {
      setIndex((i) => i + 1)
    } else {
      setResult(scoreQuiz(answers))
    }
  }

  const restart = () => {
    setIndex(0)
    setAnswers([])
    setResult(null)
  }

  const handleBack = () => {
    if (index > 0) {
      if (page.navigation === 'button') {
        setAnswers((prev) => prev.slice(0, -1))
      }
      setIndex((i) => i - 1)
    }
  }

  if (result) {
    const animal = animals[result]

    return (
      <MobileFrame>
        <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
          <div aria-hidden className="absolute inset-0" style={{ backgroundColor: '#0a2230' }} />
          <div className="relative z-10 flex min-h-dvh flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
            <p className="text-sm uppercase tracking-widest">
              <span className={textChip}>เมื่อเปิดออกเป็นสิ่งที่ใช่หรือไม่</span>
            </p>

            <div
              className="animate-float flex h-32 w-32 items-center justify-center rounded-full"
              style={{ backgroundColor: animal.iconColor }}
              aria-hidden
            >
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

            <p className="max-w-sm text-balance text-base leading-relaxed">
              <span className={cn(textChip, 'py-2 leading-relaxed')}>{animal.description}</span>
            </p>

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
                onClick={() => router.push('/chapter-checkpoint?from=quiz')}
              >
                Continue to checkpoint
              </Button>
            </div>
          </div>
        </div>
      </MobileFrame>
    )
  }

  // Chapter-break page: full-screen tap target, no options, no progress bar
  if (page.navigation === 'tap-anywhere') {
    const background = Array.isArray(page.background) ? page.background : [page.background]
    return (
      <MobileFrame>
        <div
          role="button"
          tabIndex={0}
          onClick={handleAdvance}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleAdvance()
          }}
          className="animate-fade-in relative flex min-h-dvh flex-1 cursor-pointer flex-col"
        >
          <BackgroundSlideshow images={background} intervalMs={1200} />

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

            <div className="flex flex-1 flex-col items-center justify-center">
              <h1 className="text-balance text-center font-serif text-2xl leading-relaxed">
                <span className={cn(textChip, 'leading-relaxed')}>{page.question}</span>
              </h1>
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

  const background = Array.isArray(page.background) ? page.background : [page.background]
  return (
    <MobileFrame>
      <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
        <BackgroundSlideshow images={background} intervalMs={1200} />

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

          <div className="flex items-center gap-2 pt-2" aria-hidden>
            {quizQuestions.map((q, i) => (
              <span
                key={q.id}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-colors',
                  i <= index ? 'bg-primary' : 'bg-foreground/20',
                )}
              />
            ))}
          </div>

          <div className="flex flex-1 flex-col justify-center gap-8">
            <h1 className="text-balance text-center font-serif text-2xl leading-relaxed">
              <span className={cn(textChip, 'leading-relaxed')}>{page.question}</span>
            </h1>
            <div className="flex flex-col gap-3">
              {page.options.map((option) => (
                <Button
                  key={option.letter}
                  variant="secondary"
                  size="lg"
                  className="h-auto min-h-14 w-full whitespace-normal rounded-[5px] bg-white py-3 text-left text-base text-black hover:bg-white/90"
                  onClick={() => handleSelect(option.letter)}
                >
                  {option.label}
                </Button>
              ))}
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
      </div>
    </MobileFrame>
  )
}