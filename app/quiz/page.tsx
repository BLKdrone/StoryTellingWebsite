'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MobileFrame } from '@/components/mobile-frame'
import {
  quizQuestions,
  scoreQuiz,
  type QuizOption,
} from '@/data/quiz'
import { BackgroundSlideshow } from '@/components/animations/background-slideshow'
import { saveQuizResult } from '@/lib/quiz-result'
import { WhaleGlide } from '@/components/whale-guilde'
import { usePageAudio } from '@/components/page-audio'
import { SlideNext } from '@/components/flash-transition'

const textChip = 'inline-block rounded-[5px] bg-white px-3 py-1 text-black'

export default function QuizPage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizOption['letter'][]>([])
  // const [result, setResult] = useState<AnimalKey | null>(null)

  const total = quizQuestions.length
  const page = quizQuestions[index]
  usePageAudio(page.sound)

  const finish = (finalAnswers: QuizOption['letter'][]) => {
    const scored = scoreQuiz(finalAnswers)
    saveQuizResult(scored)
    router.push('/chapter-checkpoint?from=burnout')
  }

  const handleSelect = (letter: QuizOption['letter']) => {
    const nextAnswers = [...answers, letter]
    setAnswers(nextAnswers)

    if (index + 1 < total) {
      setIndex((i) => i + 1)
    } else {
      finish(nextAnswers)
    }
  }

  const handleAdvance = () => {
    if (index + 1 < total) {
      setIndex((i) => i + 1)
    } else {
      finish(answers)
    }
  }

  const handleBack = () => {
    if (index > 0) {
      if (page.navigation === 'button') {
        setAnswers((prev) => prev.slice(0, -1))
      }
      setIndex((i) => i - 1)
    }
  }

  {
    page.navigation === 'tap-anywhere' && page.decorationFrames && (
      <WhaleGlide
        frames={page.decorationFrames}
        motion={page.decorationMotion ?? 'glide'}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-32 h-auto z-10"
      />
    )
  }

  // if (result) {
  //   const animal = animals[result]

  //   return (
  //     <MobileFrame>
  //       <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
  //         <div aria-hidden className="absolute inset-0" style={{ backgroundColor: '#0a2230' }} />
  //         <div className="relative z-10 flex min-h-dvh flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
  //           <p className="text-sm uppercase tracking-widest">
  //             <span className={textChip}>เมื่อเปิดออกเป็นสิ่งที่ใช่หรือไม่</span>
  //           </p>

  //           <div
  //             className="animate-float flex h-32 w-32 items-center justify-center rounded-full"
  //             style={{ backgroundColor: animal.iconColor }}
  //             aria-hidden
  //           >
  //             <span className="font-serif text-4xl text-background">
  //               {animal.name.charAt(0)}
  //             </span>
  //           </div>

  //           <div className="flex flex-col items-center gap-2">
  //             <h1 className="font-serif text-4xl">
  //               <span className={textChip}>{animal.name}</span>
  //             </h1>
  //             <p className="text-lg">
  //               <span className={textChip}>{animal.tagline}</span>
  //             </p>
  //           </div>

  //           <p className="max-w-sm text-balance text-base italic leading-relaxed">
  //             <span className={cn(textChip, 'py-2 leading-relaxed')}>&ldquo;{animal.quote}&rdquo;</span>
  //           </p>

  //           <p className="max-w-sm text-balance text-base leading-relaxed">
  //             <span className={cn(textChip, 'py-2 leading-relaxed')}>{animal.description}</span>
  //           </p>

  //           <div className="flex w-full max-w-sm flex-col gap-3 text-left">
  //             <div>
  //               <p className="mb-1 text-xs uppercase tracking-widest">
  //                 <span className={textChip}>Vibes</span>
  //               </p>
  //               <p className="text-sm leading-relaxed">
  //                 <span className={cn(textChip, 'py-2 leading-relaxed')}>{animal.vibes}</span>
  //               </p>
  //             </div>

  //             <div>
  //               <p className="mb-1 text-xs uppercase tracking-widest">
  //                 <span className={textChip}>Behavior & Habitat</span>
  //               </p>
  //               <p className="text-sm leading-relaxed">
  //                 <span className={cn(textChip, 'py-2 leading-relaxed')}>{animal.behaviorHabitat}</span>
  //               </p>
  //             </div>

  //             <div>
  //               <p className="mb-1 text-xs uppercase tracking-widest">
  //                 <span className={textChip}>Strength</span>
  //               </p>
  //               <p className="text-sm leading-relaxed">
  //                 <span className={cn(textChip, 'py-2 leading-relaxed')}>{animal.strength}</span>
  //               </p>
  //             </div>

  //             <div>
  //               <p className="mb-1 text-xs uppercase tracking-widest">
  //                 <span className={textChip}>Weakness</span>
  //               </p>
  //               <p className="text-sm leading-relaxed">
  //                 <span className={cn(textChip, 'py-2 leading-relaxed')}>{animal.weakness}</span>
  //               </p>
  //             </div>
  //           </div>

  //           <div className="mt-4 flex w-full max-w-xs flex-col gap-3">
  //             <Button
  //               size="lg"
  //               className="h-14 w-full rounded-[5px] bg-white text-base text-black hover:bg-white/90"
  //               onClick={restart}
  //             >
  //               Take it again
  //             </Button>
  //             <Button
  //               variant="ghost"
  //               size="lg"
  //               className="h-12 w-full rounded-[5px] bg-white text-base text-black hover:bg-white/90"
  //               onClick={() => router.push('/chapter-checkpoint?from=quiz')}
  //             >
  //               Continue to checkpoint
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     </MobileFrame>
  //   )
  // }

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
          className="animate-fade-in relative flex flex-1 cursor-pointer flex-col overflow-hidden"
        >
          <BackgroundSlideshow images={background} intervalMs={1200} />

          {page.decorationFrames && (
            <WhaleGlide
              frames={page.decorationFrames}
              motion={page.decorationMotion ?? 'glide'}
              className="absolute top-0 left-0 -translate-x-1/2 w-[800px] h-auto z-10"
            />
          )}

          <div key={page.id} className="relative z-10 flex flex-1 flex-col p-6">
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

            <div className="flex flex-1 flex-col items-center justify-end pb-16">
              <h1 className="text-balance text-center font-serif text-2xl leading-relaxed">
                <span className={cn(textChip, 'leading-relaxed')}>{page.question}</span>
              </h1>
            </div>
          </div>
          <SlideNext pageKey={page.id} color={page.flashTransition} />
        </div>
      </MobileFrame>
    )
  }

  const background = Array.isArray(page.background) ? page.background : [page.background]
  return (
    <MobileFrame>
      <div className="animate-fade-in relative flex flex-1 flex-col overflow-hidden">
        <BackgroundSlideshow images={background} intervalMs={1200} />

        <div key={page.id} className="relative z-10 flex flex-1 flex-col p-6">
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

          <div className="flex flex-1 flex-col justify-center gap-8 py-8">
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
          <SlideNext pageKey={page.id} color={page.flashTransition} />
        </div>
      </div>
    </MobileFrame>
  )
}