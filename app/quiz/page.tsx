'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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

const textChip = 'inline-block rounded-2xl border border-white/60 bg-white/40 px-4 py-3 text-pretty font-body text-lg leading-relaxed text-gray-900 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.15)] float-up break-keep'

const RESUME_KEY = 'quiz-resume'

interface QuizResumeState {
  index: number
  answers: QuizOption['letter'][]
}

function loadResumeState(): QuizResumeState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(RESUME_KEY)
    return raw ? (JSON.parse(raw) as QuizResumeState) : null
  } catch {
    return null
  }
}

function saveResumeState(state: QuizResumeState) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(RESUME_KEY, JSON.stringify(state))
  } catch {
    // ignore storage errors (private browsing, quota, etc.)
  }
}

function QuizPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const resumed = searchParams.get('resume') === '1' ? loadResumeState() : null

  const [index, setIndex] = useState(resumed?.index ?? 0)
  const [answers, setAnswers] = useState<QuizOption['letter'][]>(resumed?.answers ?? [])
  // const [result, setResult] = useState<AnimalKey | null>(null)

  const total = quizQuestions.length
  const page = quizQuestions[index]
  usePageAudio(page.sound)

  const finish = (finalAnswers: QuizOption['letter'][]) => {
    const scored = scoreQuiz(finalAnswers)
    saveQuizResult(scored)

    // Snapshot the last question (with its answer un-applied) so that
    // "back" from the checkpoint returns here instead of restarting.
    saveResumeState({
      index: total - 1,
      answers: finalAnswers.slice(0, -1),
    })

    router.push('/chapter-checkpoint?from=quiz')
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
      return
    }

    // At the very first question — leave the quiz and return to wherever
    // the user came from.
    if (typeof window !== 'undefined') {
      const from = new URLSearchParams(window.location.search).get('from')

      if (from === 'intro') {
        router.push('/intro?resume=1')
        return
      }

      if (from === 'chapter-checkpoint') {
        router.push('/chapter-checkpoint')
        return
      }
    }

    router.push('/intro')
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
              className={cn(
                'w-[800px] h-auto z-10',
                page.decorationMotion === 'bob'
                  ? 'absolute top-0 left-[20vw] -translate-x-1/2'
                  : 'absolute top-0 left-0 -translate-x-1/2'
              )}
            />
          )}

          <div key={page.id} className="relative z-10 flex flex-1 flex-col p-6">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleBack()
              }}
              className="absolute top-6 left-6 z-50 rounded-full bg-black/20 p-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-black/40 hover:text-white"
              aria-label="Go back"
            >
              ← Back
            </button>

            <div className="flex flex-1 flex-col items-center justify-end pb-16">
              {page.question?.trim() && (
                <pre className="text-balance text-center font-serif leading-relaxed">
                  <span className={cn(textChip, 'leading-relaxed')}>{page.question}</span>
                </pre>
              )}
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
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleBack()
            }}
            className="absolute top-6 left-6 z-50 rounded-full bg-black/20 p-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-black/40 hover:text-white"
            aria-label="Go back"
          >
            ← Back
          </button>

          {/* <div className="flex items-center gap-2 pt-2" aria-hidden>
            {quizQuestions.map((q, i) => (
              <span
                key={q.id}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-colors',
                  i <= index ? 'bg-primary' : 'bg-foreground/20',
                )}
              />
            ))}
          </div> */}

          <div className="flex flex-1 flex-col justify-center gap-8 py-8">
            {page.question?.trim() && (
              <h1 className="text-balance text-center font-serif text-2xl leading-relaxed">
                <span className={cn(textChip, 'leading-relaxed')}>{page.question}</span>
              </h1>
            )}
            <div className="flex flex-col gap-3">
              {page.options.map((option) => (
                <button
                  key={option.letter}
                  className={cn(textChip, 'leading-relaxed')}
                  onClick={() => handleSelect(option.letter)}
                >
                  {/* Render prefix in bold, then the rest of the label */}
                  {option.prefix ? (
                    <>
                      <strong>{option.prefix}</strong> - {option.label}
                    </>
                  ) : (
                    option.label
                  )}
                </button>
              ))}
            </div>
          </div>
          <SlideNext pageKey={page.id} color={page.flashTransition} />
        </div>
      </div>
    </MobileFrame>
  )
}

export default function QuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizPageInner />
    </Suspense>
  )
}