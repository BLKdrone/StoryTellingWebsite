'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChapterCheckpoint } from '@/components/chapter-checkpoint'
import {
  moodBranches,
  moodOptions,
  moodQuestion,
  type MoodKey,
} from '@/data/mood-checkin'

export function MoodFlow() {
  const [mood, setMood] = useState<MoodKey | null>(null)
  const [checkpoint, setCheckpoint] = useState(false)

  const handleSelect = (key: MoodKey) => {
    console.log('[v0] mood check-in:', key)
    setMood(key)
  }

  if (checkpoint) {
    return <ChapterCheckpoint currentChapter="mood-checkin" onRestart={() => setCheckpoint(false)} />
  }

  if (mood) {
    return <MoodBranchView moodKey={mood} onBack={() => setMood(null)} onContinue={() => setCheckpoint(true)} />
  }

  return (
    <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          // backgroundColor: moodQuestion.backgroundColor,
          backgroundImage: moodQuestion.background ? `url(${moodQuestion.background})` : undefined,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50"
      />

      <div className="relative z-10 flex min-h-dvh flex-1 flex-col justify-center gap-8 p-6">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-balance font-serif text-2xl leading-relaxed text-foreground">
            {moodQuestion.question}
          </h1>
          <p className="text-balance text-sm text-muted-foreground">
            {moodQuestion.helper}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {moodOptions.map((option) => (
            <Button
              key={option.key}
              variant="secondary"
              size="lg"
              className="flex h-28 flex-col items-center justify-center gap-3 rounded-2xl text-base"
              onClick={() => handleSelect(option.key)}
            >
              <span
                className="h-8 w-8 rounded-full"
                style={{ backgroundColor: option.color }}
                aria-hidden
              />
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

function MoodBranchView({
  moodKey,
  onBack,
  onContinue,
}: {
  moodKey: MoodKey
  onBack: () => void
  onContinue: () => void
}) {
  const branch = moodBranches[moodKey]

  return (
    <div
      key={branch.key}
      className="animate-fade-in relative flex min-h-dvh flex-1 flex-col"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundColor: branch.backgroundColor }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/55"
      />

      <div className="relative z-10 flex min-h-dvh flex-1 flex-col justify-center gap-6 p-6 text-center">
        <div className="animate-breathe mx-auto h-24 w-24 rounded-full bg-foreground/15" aria-hidden />

        <h1 className="text-balance font-serif text-3xl leading-snug text-foreground">
          {branch.title}
        </h1>
        <p className="text-balance text-lg leading-relaxed text-foreground/90">
          {branch.message}
        </p>

        <div className="rounded-2xl border border-border bg-card/60 p-4">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            A small step
          </p>
          <p className="mt-2 text-balance leading-relaxed text-foreground">
            {branch.suggestion}
          </p>
        </div>

        <div className="mt-2 flex w-full max-w-xs flex-col gap-3 self-center">
          <Button
            size="lg"
            className="h-14 w-full rounded-2xl text-base"
            onClick={onBack}
          >
            Check in again
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="h-12 w-full rounded-2xl text-base"
            onClick={onContinue}
          >
            Continue to checkpoint
          </Button>
        </div>
      </div>
    </div>
  )
}
