'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  animals,
  quizQuestions,
  scoreQuiz,
  type AnimalKey,
  type QuizOption,
} from '@/data/quiz'

export function QuizFlow() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizOption['letter'][]>([])
  const [result, setResult] = useState<AnimalKey | null>(null)

  const total = quizQuestions.length

  const handleSelect = (letter: QuizOption['letter']) => {
    const nextAnswers = [...answers, letter]
    setAnswers(nextAnswers)
    console.log('[v0] quiz answer:', quizQuestions[index].id, '=>', letter)

    if (index + 1 < total) {
      setIndex((i) => i + 1)
    } else {
      const matched = scoreQuiz(nextAnswers)
      console.log('[v0] quiz result:', matched)
      setResult(matched)
    }
  }

  const restart = () => {
    setIndex(0)
    setAnswers([])
    setResult(null)
  }

  if (result) {
    return <QuizResult animalKey={result} onRestart={restart} />
  }

  const page = quizQuestions[index]

  return (
    <div
      key={page.id}
      className="animate-fade-in relative flex min-h-dvh flex-1 flex-col"
    >
      {/* Background: solid placeholder color, darkening each question */}
      <div
        aria-hidden
        className="absolute inset-0 transition-colors duration-700"
        style={{ backgroundColor: page.backgroundColor }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50"
      />

      <div className="relative z-10 flex min-h-dvh flex-1 flex-col p-6">
        {/* Progress */}
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
  )
}

function QuizResult({
  animalKey,
  onRestart,
}: {
  animalKey: AnimalKey
  onRestart: () => void
}) {
  const animal = animals[animalKey]

  return (
    <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundColor: '#0a2230' }}
      />
      <div className="relative z-10 flex min-h-dvh flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Your sea creature
        </p>

        {/* Placeholder icon div (no illustration/image) */}
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
          <Button
            size="lg"
            className="h-14 w-full rounded-2xl text-base"
            onClick={onRestart}
          >
            Take it again
          </Button>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'lg' }),
              'h-12 w-full rounded-2xl text-base',
            )}
          >
            Back to start
          </Link>
        </div>
      </div>
    </div>
  )
}
