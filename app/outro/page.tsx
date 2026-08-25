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
import { usePageAudio } from '@/components/page-audio'

const textChip = 'inline-block rounded-[5px] bg-white px-3 py-1 text-black'

export default function OutroPage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const total = outroPages.length
  const page = outroPages[index]
  const result = getQuizResult()
  usePageAudio(showResult ? '' : page.sound)

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
    if (!result || !animals[result]) {
      router.push('/quiz')
      return null
    }

    const animal = animals[result]
    const backgroundSrc = typeof animal.background === 'string' ? animal.background : animal.background?.[0]

    return (
      <MobileFrame>
        <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col overflow-hidden bg-[#0a2230]">
          {/* Scattered doodle bubbles floating around the page */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-6 top-10 h-6 w-6 rounded-full border-[3px] border-white/70" />
            <div className="absolute right-10 top-24 h-3 w-3 rounded-full bg-white/60" />
            <div className="absolute left-10 top-[420px] h-4 w-4 rounded-full border-[3px] border-white/50" />
            <div className="absolute right-6 top-[520px] h-8 w-8 rounded-full border-[3px] border-white/40" />
            <div
              className="absolute right-8 top-52 h-10 w-10 rounded-full opacity-70"
              style={{ backgroundColor: animal.iconColor }}
            />
            <div
              className="absolute left-4 bottom-40 h-14 w-14 rounded-full opacity-40"
              style={{ backgroundColor: animal.iconColor }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center gap-6 p-6 pt-14 text-center text-white">
            {/* Wobbly sticker-style header chip */}
            <p
              className="-rotate-2 rounded-full border-[3px] border-black bg-white px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              เมื่อเปิดออกเป็นสิ่งที่ใช่หรือไม่
            </p>

            {/* Backdrop + animal, thick outline like a coloring-book panel */}
            <div className="relative flex h-72 w-72 items-center justify-center" aria-hidden>
              {/* dashed halo ring */}
              <div className="absolute inset-[-14px] rounded-[2.5rem] border-[3px] border-dashed border-white/50" />

              {backgroundSrc && (
                <img
                  src={backgroundSrc}
                  alt=""
                  className="absolute inset-0 h-full w-full rounded-[2rem] border-[4px] border-black object-cover shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                />
              )}
              {animal.animal && (
                <img
                  src={typeof animal.animal === 'string' ? animal.animal : animal.animal[0]}
                  alt={animal.name}
                  className={cn(
                    'relative z-10 h-56 w-56 object-contain drop-shadow-[0_6px_0px_rgba(0,0,0,0.35)]',
                    animal.animationType === 'zoom' && 'animate-animal-zoom',
                    animal.animationType === 'float' && 'animate-animal-float',
                    animal.animationType === 'glide' && 'animate-animal-glide'
                  )}
                />
              )}
              {animal.decoration && (
                <img
                  src={animal.decoration}
                  alt=""
                  className="absolute inset-0 z-20 h-full w-full object-contain pointer-events-none"
                />
              )}

              {/* little star doodle poking out of the corner */}
              <svg
                viewBox="0 0 24 24"
                className="absolute -right-4 -top-4 z-30 h-10 w-10 rotate-12"
                fill={animal.iconColor}
                stroke="black"
                strokeWidth="1.2"
              >
                <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" />
              </svg>
            </div>
          </div>

          {/* Name badge — thick outline sticker */}
          <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center text-white">
            <h1
              className="rotate-1 rounded-2xl border-[3px] border-black bg-white px-6 py-2 font-serif text-4xl font-bold text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              {animal.name}
            </h1>
            <p
              className="-rotate-1 rounded-full border-[3px] border-black px-4 py-1 text-base font-semibold text-white"
              style={{ backgroundColor: animal.iconColor }}
            >
              {animal.tagline}
            </p>
          </div>

          {/* Quote card, hand-drawn dashed border */}
          <div className="relative z-10 mx-auto mt-8 w-full max-w-sm px-6">
            <div className="relative rounded-3xl border-[3px] border-dashed border-white bg-white/10 p-5 backdrop-blur-sm">
              {/* <span
                className="absolute -top-5 left-4 rounded-full border-[3px] border-black px-2 text-3xl font-black leading-none text-black"
                style={{ backgroundColor: animal.iconColor }}
              >
                &ldquo;
              </span> */}
              <p className="text-balance pt-2 text-base italic leading-relaxed text-white">
                {animal.quote}
              </p>
            </div>
          </div>

          {/* Description card */}
          <div className="relative z-10 mx-auto mt-4 w-full max-w-sm px-6">
            <div className="rounded-3xl border-[3px] border-black bg-white p-5 text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-balance text-base leading-relaxed">{animal.description}</p>
            </div>
          </div>

          {/* Trait badges — alternating tilt, colored outline, playful */}
          <div className="relative z-10 mx-auto mt-6 flex w-full max-w-sm flex-col gap-4 px-6 pb-2 text-left">
            {[
              { label: 'Vibes', value: animal.vibes, tilt: '-rotate-1' },
              { label: 'Behavior & Habitat', value: animal.behaviorHabitat, tilt: 'rotate-1' },
              { label: 'Strength', value: animal.strength, tilt: '-rotate-1' },
              { label: 'Weakness', value: animal.weakness, tilt: 'rotate-1' },
            ].map((item) => (
              <div
                key={item.label}
                className={cn(
                  'rounded-2xl border-[3px] border-black bg-white p-4 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
                  item.tilt
                )}
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full border-2 border-black"
                    style={{ backgroundColor: animal.iconColor }}
                  />
                  <p className="text-xs font-black uppercase tracking-widest">{item.label}</p>
                </div>
                <p className="text-sm leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Buttons — chunky sticker style */}
          <div className="relative z-10 mx-auto mt-8 mb-10 flex w-full max-w-xs flex-col gap-4 px-6">
            <Button
              size="lg"
              className="h-14 w-full rounded-2xl border-[3px] border-black bg-white text-base font-bold text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              onClick={restart}
            >
              Take it again
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="h-12 w-full rounded-2xl border-[3px] border-white text-base font-bold text-white hover:bg-white/10"
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