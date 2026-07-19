'use client'

import { useEffect, useRef, useState } from 'react'
import type { StoryPageData } from '@/lib/story'
import { Button } from '@/components/ui/button'
import { BottleFold } from '@/components/bottle-fold'

interface StoryPageProps {
  page: StoryPageData
  /** Advance to the next screen. `answer` is passed for input variants. */
  onAdvance: (answer?: string) => void
  isLast?: boolean
}

export function StoryPage({ page, onAdvance, isLast }: StoryPageProps) {
  const tappable = page.navigation === 'tap-anywhere'

  // --- shared: sound ---------------------------------------------------
  const audioRef = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {
    if (!page.sound) return
    const audio = new Audio(page.sound)
    audio.loop = page.type === 'transition' || page.type === 'animation'
    audio.play().catch(() => {
      // Autoplay may be blocked until the user interacts — that's fine.
    })
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [page.sound, page.type])

  // --- transition: auto-advance when the animation finishes ------------
  useEffect(() => {
    if (page.type !== 'transition') return
    const timer = setTimeout(() => onAdvance(), page.duration ?? 3000)
    return () => clearTimeout(timer)
  }, [page.type, page.duration, onAdvance])

  // Only tap-anywhere pages get screen-level interaction handlers.
  const tapHandlers = tappable
    ? {
        role: 'button' as const,
        tabIndex: 0,
        'aria-label': 'Tap anywhere to continue',
        onClick: () => onAdvance(),
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onAdvance()
          }
        },
      }
    : {}

  return (
    <div
      className="relative flex min-h-dvh w-full flex-1 flex-col"
      {...tapHandlers}
    >
      {/* Background layer: real image when provided, else a solid placeholder */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={
          page.background
            ? {
                backgroundImage: `url(${page.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : { backgroundColor: page.backgroundColor || 'var(--background)' }
        }
      />
      {/* Readability scrim */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"
      />

      {/* Content */}
      <div className="animate-fade-in relative z-10 flex min-h-dvh flex-1 flex-col p-6">
        <PageContent page={page} onAdvance={onAdvance} isLast={isLast} />
      </div>
    </div>
  )
}

function PageContent({ page, onAdvance, isLast }: StoryPageProps) {
  switch (page.type) {
    case 'text-whale':
      return <TextWhaleVariant page={page} />
    case 'animation':
      return <AnimationVariant page={page} />
    case 'transition':
      return <TransitionVariant page={page} />
    case 'question':
      return <QuestionVariant page={page} onAdvance={onAdvance} />
    case 'collect-answer':
      return <CollectAnswerVariant page={page} onAdvance={onAdvance} isLast={isLast} />
    case 'reflection-input':
      return <ReflectionInputVariant page={page} onAdvance={onAdvance} isLast={isLast} />
    default:
      return null
  }
}

/* ------------------------------------------------------------------ */
/* Variants                                                            */
/* ------------------------------------------------------------------ */

function WhaleShape() {
  // Simple colored placeholder standing in for the whale illustration.
  return (
    <div className="animate-float relative h-28 w-44">
      <div className="absolute inset-0 rounded-[50%] bg-primary/70" />
      <div className="absolute -right-6 top-1/2 h-10 w-14 -translate-y-1/2 rounded-[50%] bg-primary/70" />
      <div className="absolute left-8 top-6 h-3 w-3 rounded-full bg-background" />
    </div>
  )
}

function TapHint() {
  return (
    <p className="animate-fade-in mt-8 text-center text-sm text-muted-foreground">
      Tap anywhere to continue
    </p>
  )
}

function TextWhaleVariant({ page }: { page: StoryPageData }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      <WhaleShape />
      {page.text ? (
        <p className="text-balance font-serif text-2xl leading-relaxed text-foreground">
          {page.text}
        </p>
      ) : null}
      <TapHint />
    </div>
  )
}

function AnimationVariant({ page }: { page: StoryPageData }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      {page.title ? (
        <h1 className="font-serif text-3xl text-foreground">{page.title}</h1>
      ) : null}
      {/* Placeholder animated element (colored div, not an illustration) */}
      <div className="animate-breathe h-40 w-40 rounded-full bg-primary/40 blur-sm" />
      {page.text ? (
        <p className="text-balance text-lg leading-relaxed text-muted-foreground">
          {page.text}
        </p>
      ) : null}
      <TapHint />
    </div>
  )
}

function TransitionVariant({ page }: { page: StoryPageData }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
      <div className="animate-breathe h-48 w-48 rounded-full bg-primary/30" />
      {page.text ? (
        <p className="text-balance font-serif text-2xl leading-relaxed text-foreground">
          {page.text}
        </p>
      ) : null}
      <span className="sr-only" role="status">
        Loading the next moment
      </span>
    </div>
  )
}

function QuestionVariant({
  page,
  onAdvance,
}: {
  page: StoryPageData
  onAdvance: (answer?: string) => void
}) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-8">
      {page.question ? (
        <h1 className="text-balance text-center font-serif text-2xl leading-relaxed text-foreground">
          {page.question}
        </h1>
      ) : null}
      <div className="flex flex-col gap-3">
        {(page.options ?? []).map((option) => (
          <Button
            key={option}
            variant="secondary"
            size="lg"
            className="h-14 w-full rounded-2xl text-base"
            onClick={() => {
              console.log('[v0] question answered:', page.id, '=>', option)
              onAdvance(option)
            }}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}

function CollectAnswerVariant({
  page,
  onAdvance,
}: {
  page: StoryPageData
  onAdvance: (answer?: string) => void
  isLast?: boolean
}) {
  const [answer, setAnswer] = useState('')
  const [sealing, setSealing] = useState(false)

  const handleSubmit = () => {
    // For now: keep it in local state and log it. (No Supabase yet.)
    console.log('[v0] collected answer:', page.id, '=>', answer)
    // Play the "fold into bottle" animation, then advance.
    setSealing(true)
  }

  if (sealing) {
    return <BottleFold answer={answer} onComplete={() => onAdvance(answer)} />
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-8">
      {page.prompt ? (
        <h1 className="text-balance text-center font-serif text-2xl leading-relaxed text-foreground">
          {page.prompt}
        </h1>
      ) : null}
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder={page.placeholder}
        className="w-full rounded-2xl border border-border bg-input/40 px-4 py-4 text-base text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
            handleSubmit()
          }
        }}
      />
      <Button
        size="lg"
        className="h-14 w-full rounded-2xl text-base"
        onClick={handleSubmit}
      >
        {page.buttonLabel ?? 'Continue'}
      </Button>
    </div>
  )
}

function ReflectionInputVariant({
  page,
  onAdvance,
}: {
  page: StoryPageData
  onAdvance: (answer?: string) => void
  isLast?: boolean
}) {
  const [reflection, setReflection] = useState('')

  const handleSubmit = () => {
    console.log('[v0] reflection saved:', page.id, '=>', reflection)
    onAdvance(reflection)
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-8">
      {page.prompt ? (
        <h1 className="text-balance text-center font-serif text-2xl leading-relaxed text-foreground">
          {page.prompt}
        </h1>
      ) : null}
      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder={page.placeholder}
        rows={4}
        className="w-full resize-none rounded-2xl border border-border bg-input/40 px-4 py-4 text-base leading-relaxed text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
      />
      <Button
        size="lg"
        className="h-14 w-full rounded-2xl text-base"
        onClick={handleSubmit}
      >
        {page.buttonLabel ?? 'Continue'}
      </Button>
    </div>
  )
}
