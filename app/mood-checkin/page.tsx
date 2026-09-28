'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { MobileFrame } from '@/components/mobile-frame'
import { moodIntro, moodQuestion, moodBranches, moodOptions } from '@/data/mood-checkin'
import type { MoodKey, MoodPage } from '@/data/mood-checkin'
import { supabase } from '@/lib/supabase'
import { usePageAudio } from '@/components/page-audio'
import { SlideNext } from '@/components/flash-transition'
import { WhaleGlide } from '@/components/whale-guilde'
import { cn } from '@/lib/utils'

const textChip = 'inline-block rounded-2xl border border-white/60 bg-white/40 px-4 py-3 whitespace-pre-line text-pretty font-body text-lg leading-relaxed text-gray-900 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.15)] float-up'
const HAPPY_WHALE_FRAMES = [
  '/background/mood-checkin/whalejump/whale1.webp',
  '/background/mood-checkin/whalejump/whale2.webp',
]

type PageState = 'question' | 'options' | 'branch' | 'complete'

const MOOD_EXIT_DURATION_MS = 900
const RESUME_KEY = 'mood-checkin-resume'

interface ResumeState {
  selectedMood: MoodKey
  branchIndex: number
  subPages: MoodPage[] | null
  subIndex: number
  inConverge: boolean
  convergeIndex: number
  answers: Record<string, string>
}

function loadResumeState(): ResumeState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(RESUME_KEY)
    return raw ? (JSON.parse(raw) as ResumeState) : null
  } catch {
    return null
  }
}

function saveResumeState(state: ResumeState) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(RESUME_KEY, JSON.stringify(state))
  } catch {
    // ignore storage errors (private browsing, quota, etc.)
  }
}

function MoodCheckinPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const resumed = searchParams.get('resume') === '1' ? loadResumeState() : null

  const [pageState, setPageState] = useState<PageState>(resumed ? 'branch' : 'question')
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(resumed?.selectedMood ?? null)
  const [exitingMood, setExitingMood] = useState<MoodKey | null>(null)

  const [branchIndex, setBranchIndex] = useState(resumed?.branchIndex ?? 0)
  const [subPages, setSubPages] = useState<MoodPage[] | null>(resumed?.subPages ?? null)
  const [subIndex, setSubIndex] = useState(resumed?.subIndex ?? 0)
  const [inConverge, setInConverge] = useState(resumed?.inConverge ?? false)
  const [convergeIndex, setConvergeIndex] = useState(resumed?.convergeIndex ?? 0)

  const [answer, setAnswer] = useState('')
  const [answers, setAnswers] = useState<Record<string, string>>(resumed?.answers ?? {})
  const [happyClickCount, setHappyClickCount] = useState(0)
  const [happyClickEffect, setHappyClickEffect] = useState(0)

  // Single source of truth for "what page is on screen right now" —
  // mirrors self-worth's `page = selfWorthPages[index]`, just resolved
  // across branch/subPages/converge instead of a flat array + index.
  const getCurrentPage = (): MoodPage | null => {
    if (!selectedMood) return null
    const branch = moodBranches[selectedMood]
    if (inConverge && branch.convergePages) return branch.convergePages[convergeIndex]
    if (subPages) return subPages[subIndex]
    return branch.pages[branchIndex]
  }

  const currentSound = pageState === 'branch' ? getCurrentPage()?.sound : moodIntro.sound
  usePageAudio(currentSound ?? '')

  const resetBranchState = () => {
    setBranchIndex(0)
    setSubPages(null)
    setSubIndex(0)
    setInConverge(false)
    setConvergeIndex(0)
  }

  const handleBack = () => {
    if (pageState === 'branch') {
      if (getCurrentPage()?.id === 'happybig') {
        setHappyClickCount(0)
        setHappyClickEffect(0)
      }
      if (inConverge) {
        if (convergeIndex > 0) {
          setConvergeIndex((i) => i - 1)
        } else {
          setInConverge(false)
          if (subPages) setSubIndex(subPages.length - 1)
        }
      } else if (subPages) {
        if (subIndex > 0) setSubIndex((i) => i - 1)
        else setSubPages(null)
      } else if (branchIndex > 0) {
        setBranchIndex((i) => i - 1)
      } else {
        setPageState('options')
        setSelectedMood(null)
        resetBranchState()
      }
    } else if (pageState === 'options') {
      setPageState('question')
    } else if (pageState === 'question') {
      router.push('/chapter-checkpoint')
    }
  }

  const handleAdvanceQuestion = () => setPageState('options')
  const handleAdvanceOptions = () => setPageState('branch')

  const handleSelectMood = (moodKey: MoodKey) => {
    if (exitingMood) return
    setExitingMood(moodKey)
    window.setTimeout(() => {
      setSelectedMood(moodKey)
      resetBranchState()
      setPageState('branch')
      setExitingMood(null)
    }, MOOD_EXIT_DURATION_MS)
  }

  // Text-input pages call this — same shape as self-worth's handleSubmit.
  const handleSubmit = () => {
    const current = getCurrentPage()
    let snapshot = answers
    if (current?.id) {
      snapshot = { ...answers, [current.id]: answer }
      setAnswers(snapshot)
    }
    setAnswer('')
    handleAdvanceBranch(snapshot)
  }

  const handleAdvanceBranch = (snapshot: Record<string, string> = answers) => {
    if (!selectedMood) return
    if (getCurrentPage()?.id === 'happyjump') {
      setHappyClickCount(0)
      setHappyClickEffect(0)
    }
    const branch = moodBranches[selectedMood]

    if (inConverge && branch.convergePages) {
      if (convergeIndex < branch.convergePages.length - 1) setConvergeIndex((i) => i + 1)
      else finishBranch(snapshot)
      return
    }

    if (subPages) {
      if (subIndex < subPages.length - 1) setSubIndex((i) => i + 1)
      else if (branch.convergePages) { setInConverge(true); setConvergeIndex(0) }
      else finishBranch(snapshot)
      return
    }

    const pages = branch.pages
    if (branchIndex < pages.length - 1) setBranchIndex((i) => i + 1)
    else if (branch.convergePages) { setInConverge(true); setConvergeIndex(0) }
    else finishBranch(snapshot)
  }

  const finishBranch = async (finalAnswers: Record<string, string> = answers) => {
    if (finalAnswers['overwhelmedstorm']) {
      const dbAnswers = { 'overwhelmedstorm': finalAnswers['overwhelmedstorm'] }

      const { error } = await supabase.from('mood_checkin_responses').insert({
        mood: selectedMood,
        answers: dbAnswers,
      })
      if (error) {
        console.error('Failed to save mood check-in:', {
          message: error.message, details: error.details, hint: error.hint, code: error.code,
        })
      }
    }

    // Snapshot exactly where we are so the bottle page's back button
    // can bring the user right back here instead of restarting.
    if (selectedMood) {
      saveResumeState({
        selectedMood,
        branchIndex,
        subPages,
        subIndex,
        inConverge,
        convergeIndex,
        answers: finalAnswers,
      })
    }

    router.push('/bottle?from=mood-checkin')
  }

  const handleSelectChoice = (nextPages: MoodPage[]) => {
    setSubPages(nextPages)
    setSubIndex(0)
  }

  const interpolateText = (text = '') =>
    text.replace(/\{text-([\w-]+)\}/g, (_, id) => answers[id] ?? '')

  // Page 1: Intro
  if (pageState === 'question') {
    return (
      <MobileFrame>
        <div
          key="mood-intro"
          role="button"
          tabIndex={0}
          onClick={handleAdvanceQuestion}
          className="relative flex min-h-dvh w-full flex-1 flex-col cursor-pointer"
        >
          <button
            onClick={(e) => { e.stopPropagation(); handleBack() }}
            className="absolute top-6 left-6 z-50 rounded-full bg-black/20 p-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-black/40 hover:text-white"
            aria-label="Go back"
          >
            ← Back
          </button>
          <Image src={moodIntro.background} alt="" fill className="object-cover -z-10" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          <div className="relative z-10 flex min-h-dvh flex-1 flex-col items-center justify-center text-center">
            {moodQuestion.text?.trim() && (
              <h1 className="text-balance whitespace-pre-line text-center font-serif text-2xl leading-relaxed">
                <span className={cn(textChip, 'leading-relaxed')}>{moodIntro.text}</span>
              </h1>
            )}
          </div>
          <SlideNext pageKey="mood-intro" color={moodIntro.flashTransition} />
        </div>
      </MobileFrame>
    )
  }

  // Page 2: Mood options — unchanged from before
  if (pageState === 'options' && !selectedMood) {
    return (
      <MobileFrame>
        <div className="relative flex flex-col flex-1 min-h-dvh w-full">
          <button
            onClick={(e) => { e.stopPropagation(); handleBack() }}
            className="absolute top-6 left-6 z-50 rounded-full bg-black/20 p-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-black/40 hover:text-white"
            aria-label="Go back"
          >
            ← Back
          </button>
          <div
            onClick={exitingMood ? undefined : handleAdvanceOptions}
            className="relative flex min-h-dvh w-full flex-1 flex-col items-center justify-center gap-8 p-8 text-center cursor-pointer"
            role="button"
            tabIndex={0}
          >
            <Image src={moodQuestion.background} alt="" fill className="object-cover -z-10" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

            <div className="relative z-10 space-y-6 w-full">
              <div className="space-y-2 transition-opacity duration-300" style={{ opacity: exitingMood ? 0 : 1 }}>
                {moodQuestion.text?.trim() && (
                  <h1 className="text-balance whitespace-pre-line text-center font-serif text-2xl leading-relaxed">
                    <span className={cn(textChip, 'leading-relaxed')}>{moodQuestion.text}</span>
                  </h1>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {moodOptions.map((option) => {
                  const isSelected = option.key === exitingMood
                  const isFadingOut = exitingMood !== null && !isSelected
                  return (
                    <button
                      key={option.key}
                      onClick={(e) => { e.stopPropagation(); handleSelectMood(option.key) }}
                      disabled={exitingMood !== null}
                      className="relative min-h-[300px] overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                      style={{
                        opacity: isFadingOut ? 0 : 1,
                        transform: isFadingOut ? 'scale(0.9)' : undefined,
                        pointerEvents: exitingMood ? 'none' : undefined,
                      }}
                    >
                      <div className="absolute inset-0">
                        <Image src={option.background} alt="" fill className="object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-black/30" />
                      <span
                        className="relative z-10 inline-block p-4 font-serif font-medium text-black transition-opacity"
                        style={isSelected ? { transitionDuration: '500ms', transitionDelay: '350ms', opacity: 0 } : undefined}
                      >
                        {option.label}
                      </span>
                    </button>
                  )
                })}
              </div>


            </div>
            <SlideNext pageKey={moodQuestion.id} color={moodQuestion.flashTransition} />
          </div>
        </div>
      </MobileFrame>
    )
  }

  // Page 3: Mood branch
  if (pageState === 'branch' && selectedMood) {
    const page = getCurrentPage()!

    const backButton = (
      <button
        onClick={(e) => { e.stopPropagation(); handleBack() }}
        className="absolute top-6 left-6 z-50 rounded-full bg-black/20 p-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-black/40 hover:text-white"
        aria-label="Go back"
      >
        ← Back
      </button>
    )

    // Both choice pages and input pages use navigation: 'button' —
    // tell them apart by whether the page has `choices`, same pattern
    // self-worth uses ('options' in page).
    if (page.navigation === 'button') {
      const isChoice = 'choices' in page

      return (
        <MobileFrame>
          <div className="relative flex flex-col flex-1 min-h-dvh w-full">
            {backButton}
            <div key={page.background} className="absolute inset-0 z-0">
              <Image src={page.background} alt="" fill className="object-cover" priority />
            </div>
            {page.decorationFrames && (
              <div key={`decoration-${page.id}`} className="absolute inset-0 z-[5] pointer-events-none">
                <Image src={page.decorationFrames} alt="" fill className="object-contain" priority />
              </div>
            )}
            <div
              key={page.id}
              className="relative z-10 flex min-h-dvh w-full flex-1 flex-col items-center justify-center gap-8 p-8 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 -z-10" />

              <div className="relative z-10 space-y-6 w-full">
                {interpolateText(page.text).trim() && (
                  <h1 className="text-balance whitespace-pre-line text-center font-serif text-2xl leading-relaxed">
                    <span className={cn(textChip, 'leading-relaxed')}>{interpolateText(page.text)}</span>
                  </h1>
                )}
                {isChoice ? (
                  <div className="flex flex-col gap-3 items-center">
                    {page.choices.map((choice, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); handleSelectChoice(choice.nextPages) }}
                        className="rounded-lg px-6 py-3 font-medium text-white bg-white/20 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/30 active:scale-95"
                      >
                        {choice.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <input
                      autoFocus
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder={page.placeholder}
                      className="w-full max-w-sm rounded-2xl border border-border bg-black/20  px-4 py-4 text-base font-serif text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                          handleSubmit()
                        }
                      }}
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={!answer.trim()}
                      className="h-12 w-full max-w-sm rounded-lg bg-black/20 text-base font-serif font-medium text-white backdrop-blur-md hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {page.buttonLabel || 'Let it drift'}
                    </button>
                  </div>
                )}
              </div>

              <SlideNext pageKey={page.id} color={page.flashTransition} />
            </div>
          </div>
        </MobileFrame>
      )
    }

    // Pure tap-anywhere narrative page — no input, no buttons
    return (
      <MobileFrame>
        <div className="relative flex flex-col flex-1 min-h-dvh w-full">
          {backButton}
          <div key={page.background} className="absolute inset-0 z-0">
            <Image src={page.background} alt="" fill className="object-cover" priority />
          </div>
          {page.decorationFrames && (
            page.id === 'sad-throw-1' ? (
              <div key={`decoration-${page.id}`} className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
                <div className="sad-plane-flight absolute left-1/2 top-[42%] h-36 w-36 sm:h-44 sm:w-44">
                  <Image src={page.decorationFrames} alt="" fill className="object-contain" priority />
                </div>
              </div>
            ) : (
              <div key={`decoration-${page.id}`} className="absolute inset-0 z-[5] pointer-events-none">
                <Image src={page.decorationFrames} alt="" fill className="object-contain" priority />
              </div>
            )
          )}
          {page.id === 'happyjump' && (
            <div className="absolute inset-0 z-[8] overflow-hidden pointer-events-none flex items-center justify-center">
              <Image
                src="/background/mood-checkin/whalejump/whale2.webp"
                alt="skipping whale"
                width={250}
                height={150}
                className="animate-stone-skip object-contain"
              />
            </div>
          )}
          <div
            key={page.id}
            role="button"
            tabIndex={0}
            onClick={() => {
              if (page.id === 'happybig') {
                setHappyClickCount((count) => Math.min(count + 1, 5))
                setHappyClickEffect((effect) => effect + 1)
              } else {
                handleAdvanceBranch()
              }
            }}
            className="relative z-10 flex min-h-dvh w-full flex-1 flex-col cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 -z-10" />
            {page.id === 'happybig' && (
              <div
                className="pointer-events-none absolute inset-x-0 top-[18%] z-10 flex justify-center transition-transform duration-500 ease-out"
                style={{ transform: `scale(${1 + happyClickCount * 0.2})` }}
              >
                <WhaleGlide
                  frames={HAPPY_WHALE_FRAMES}
                  frameIntervalMs={500}
                  motion="still"
                  bounceKey={happyClickEffect}
                  className="h-[500px] w-[500px] object-contain"
                />
              </div>
            )}
            <div className="relative z-10 flex min-h-dvh flex-1 flex-col items-center justify-center p-8 text-center">
              {interpolateText(page.text).trim() && (
                <p className="text-balance mt-64 whitespace-pre-line text-lg font-serif leading-relaxed">
                  <span className={cn(textChip, 'leading-relaxed')}>{interpolateText(page.text)}</span>
                </p>
              )}
            </div>
            {page.id === 'happybig' && happyClickCount === 5 && (
              <button
                onClick={(event) => {
                  event.stopPropagation()
                  handleAdvanceBranch()
                }}
                className="absolute bottom-16 left-1/2 z-20 h-12 w-full max-w-sm -translate-x-1/2 rounded-lg bg-black/20 text-base font-serif font-medium text-white backdrop-blur-md hover:bg-white/30"
              >
                ไปต่อ
              </button>
            )}
            <SlideNext pageKey={page.id} color={page.flashTransition} />
          </div>
        </div>
      </MobileFrame>
    )
  }

  return null
}

export default function MoodCheckinPage() {
  return (
    <Suspense fallback={null}>
      <MoodCheckinPageInner />
    </Suspense>
  )
}