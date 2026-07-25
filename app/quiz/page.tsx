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

export default function QuizPage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizOption['letter'][]>([])
  const [result, setResult] = useState<AnimalKey | null>(null)

  const total = quizQuestions.length

  const handleSelect = (letter: QuizOption['letter']) => {
    const nextAnswers = [...answers, letter]
    setAnswers(nextAnswers)

    if (index + 1 < total) {
      setIndex((i) => i + 1)
    } else {
      setResult(scoreQuiz(nextAnswers))
    }
  }

  const restart = () => {
    setIndex(0)
    setAnswers([])
    setResult(null)
  }

  const handleBack = () => {
    if (index > 0) {
      setIndex((i) => i - 1)
      setAnswers((prev) => prev.slice(0, -1))
    }
  }

  if (result) {
    const animal = animals[result]

    return (
      <MobileFrame>
        <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
          <div aria-hidden className="absolute inset-0" style={{ backgroundColor: '#0a2230' }} />
          <div className="relative z-10 flex min-h-dvh flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              Your sea creature
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

            <div className="flex flex-col gap-2">
              <h1 className="font-serif text-4xl text-foreground">{animal.name}</h1>
              <p className="text-lg text-primary">{animal.tagline}</p>
            </div>

            <p className="max-w-sm text-balance text-base leading-relaxed text-muted-foreground">
              {animal.description}
            </p>

            <div className="mt-4 flex w-full max-w-xs flex-col gap-3">
              <Button size="lg" className="h-14 w-full rounded-2xl text-base" onClick={restart}>
                Take it again
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="h-12 w-full rounded-2xl text-base"
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

  const page = quizQuestions[index]

  return (
    <MobileFrame>
      <div key={page.id} className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
        <div
          aria-hidden
          className="absolute inset-0 transition-colors duration-700"
          style={{ backgroundColor: page.backgroundColor }}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

        <div className="relative z-10 flex min-h-dvh flex-1 flex-col p-6">
          {index > 0 && (
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
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Question {index + 1} of {total}
          </p>

          <div className="flex flex-1 flex-col justify-center gap-8">
            <h1 className="text-balance text-center font-serif text-2xl leading-relaxed text-foreground">
              {page.question}
            </h1>
            <div className="flex flex-col gap-3">
              {page.options.map((option) => (
                <Button
                  key={option.letter}
                  variant="secondary"
                  size="lg"
                  className="h-auto min-h-14 w-full whitespace-normal rounded-2xl py-3 text-left text-base"
                  onClick={() => handleSelect(option.letter)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MobileFrame>
  )
}