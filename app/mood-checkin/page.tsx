'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MobileFrame } from '@/components/mobile-frame'
import { moodIntro, moodQuestion, moodBranches, moodOptions } from '@/data/mood-checkin'
import type { MoodKey, MoodPage } from '@/data/mood-checkin'

type PageState = 'question' | 'options' | 'branch' | 'complete'

const MOOD_EXIT_DURATION_MS = 900

export default function MoodCheckinPage() {
  const router = useRouter()
  const [pageState, setPageState] = useState<PageState>('question')
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null)

  const [exitingMood, setExitingMood] = useState<MoodKey | null>(null)

  const [branchIndex, setBranchIndex] = useState(0)
  const [subPages, setSubPages] = useState<MoodPage[] | null>(null)
  const [subIndex, setSubIndex] = useState(0)
  const [inConverge, setInConverge] = useState(false)
  const [convergeIndex, setConvergeIndex] = useState(0)

  // Input state for pages with placeholder
  const [answer, setAnswer] = useState('')
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const resetBranchState = () => {
    setBranchIndex(0)
    setSubPages(null)
    setSubIndex(0)
    setInConverge(false)
    setConvergeIndex(0)
  }

  const handleBack = () => {
    if (pageState === 'branch') {
      if (inConverge) {
        if (convergeIndex > 0) {
          setConvergeIndex((i) => i - 1)
        } else {
          setInConverge(false)
          if (subPages) {
            setSubIndex(subPages.length - 1)
          }
        }
      } else if (subPages) {
        if (subIndex > 0) {
          setSubIndex((i) => i - 1)
        } else {
          setSubPages(null)
        }
      } else if (branchIndex > 0) {
        setBranchIndex((i) => i - 1)
      } else {
        setPageState('options')
        setSelectedMood(null)
        resetBranchState()
      }
    } else if (pageState === 'options') {
      setPageState('question')
    }
  }

  const handleAdvanceQuestion = () => {
    // Single intro page, advance to options
    setPageState('options')
  }

  const handleAdvanceOptions = () => {
    setPageState('branch')
  }

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

  const finishBranch = () => {
    // Save answers before moving forward
    console.log('User answers:', answers)
    router.push('/chapter-checkpoint?from=mood-checkin')
  }

  const handleSubmit = () => {
    if (!inConverge && !subPages && branchIndex < moodBranches[selectedMood!].pages.length) {
      const currentPage = moodBranches[selectedMood!].pages[branchIndex]
      if (currentPage.id) {
        setAnswers({ ...answers, [currentPage.id]: answer })
      }
    }
    setAnswer('')
    handleAdvanceBranch()
  }

  const handleAdvanceBranch = () => {
    if (!selectedMood) return
    const branch = moodBranches[selectedMood]

    if (inConverge && branch.convergePages) {
      if (convergeIndex < branch.convergePages.length - 1) {
        setConvergeIndex((i) => i + 1)
      } else {
        finishBranch()
      }
      return
    }

    if (subPages) {
      if (subIndex < subPages.length - 1) {
        setSubIndex((i) => i + 1)
      } else if (branch.convergePages) {
        setInConverge(true)
        setConvergeIndex(0)
      } else {
        finishBranch()
      }
      return
    }

    const pages = branch.pages
    if (branchIndex < pages.length - 1) {
      setBranchIndex((i) => i + 1)
    } else if (branch.convergePages) {
      setInConverge(true)
      setConvergeIndex(0)
    } else {
      finishBranch()
    }
  }

  const handleSelectChoice = (nextPages: MoodPage[]) => {
    setSubPages(nextPages)
    setSubIndex(0)
  }

  // Page 1: Intro (single tap-anywhere page from moodIntro)
  if (pageState === 'question') {
    return (
      <MobileFrame>
        <div
          key="mood-intro"
          role="button"
          tabIndex={0}
          onClick={handleAdvanceQuestion}
          className="relative flex min-h-dvh w-full flex-1 flex-col cursor-pointer"
          style={{
            backgroundImage: `url(${moodIntro.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          <div className="relative z-10 flex min-h-dvh flex-1 flex-col items-center justify-center p-8 text-center">
            <p className="text-base text-white whitespace-pre-line">{moodIntro.text}</p>
          </div>
          {moodIntro.flashTransition && (
            <div
              className="pointer-events-none absolute inset-0 z-20 animate-fade-out"
              style={{ backgroundColor: moodIntro.flashTransition }}
            />
          )}
        </div>
      </MobileFrame>
    )
  }

  // Page 2: Mood options
  if (pageState === 'options' && !selectedMood) {
    return (
      <MobileFrame>
        <div className="relative flex flex-col flex-1 min-h-dvh w-full">
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
          <div
            onClick={exitingMood ? undefined : handleAdvanceOptions}
            className="relative flex min-h-dvh w-full flex-1 flex-col items-center justify-center gap-8 p-8 text-center cursor-pointer"
            role="button"
            tabIndex={0}
            style={{
              backgroundImage: `url(${moodQuestion.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

            <div className="relative z-10 space-y-6 w-full">
              <div
                className="space-y-2 transition-opacity duration-300"
                style={{ opacity: exitingMood ? 0 : 1 }}
              >
                <h1 className="text-xl font-bold text-white">{moodQuestion.text}</h1>
                <p className="text-sm text-white/70">Tap anywhere or select a mood</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {moodOptions.map((option) => {
                  const isSelected = option.key === exitingMood
                  const isFadingOut = exitingMood !== null && !isSelected

                  return (
                    <button
                      key={option.key}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelectMood(option.key)
                      }}
                      disabled={exitingMood !== null}
                      className="relative min-h-[96px] overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                      style={{
                        opacity: isFadingOut ? 0 : 1,
                        transform: isFadingOut ? 'scale(0.9)' : undefined,
                        pointerEvents: exitingMood ? 'none' : undefined,
                      }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url(${option.background})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30" />

                      <span
                        className="relative z-10 inline-block p-4 font-medium text-white transition-opacity"
                        style={
                          isSelected
                            ? { transitionDuration: '500ms', transitionDelay: '350ms', opacity: 0 }
                            : undefined
                        }
                      >
                        {option.label}
                      </span>
                    </button>
                  )
                })}
              </div>

              <p
                className="text-xs text-white/60 pt-4 transition-opacity duration-300"
                style={{ opacity: exitingMood ? 0 : 1 }}
              >
                Tap anywhere to continue →
              </p>
            </div>
          </div>
        </div>
      </MobileFrame>
    )
  }

  // Page 3: Mood branch (linear pages, choice pages, sub-pages, or converge pages)
  if (pageState === 'branch' && selectedMood) {
    const branch = moodBranches[selectedMood]

    const page: MoodPage =
      inConverge && branch.convergePages
        ? branch.convergePages[convergeIndex]
        : subPages
        ? subPages[subIndex]
        : branch.pages[branchIndex]

    const backButton = (
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
    )

    // Choice page: render buttons instead of tap-anywhere
    if (page.navigation === 'button') {
      return (
        <MobileFrame>
          <div className="relative flex flex-col flex-1 min-h-dvh w-full">
            {backButton}
            <div
              key={page.id}
              className="relative flex min-h-dvh w-full flex-1 flex-col items-center justify-center gap-8 p-8 text-center"
              style={{
                backgroundImage: `url(${page.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

              <div className="relative z-10 space-y-6 w-full">
                <p className="text-sm text-white/90 whitespace-pre-line">{page.text}</p>

                <div className="flex flex-col gap-3 items-center">
                  {page.navigation === 'button' && page.choices
                    ? page.choices.map((choice, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectChoice(choice.nextPages)
                          }}
                          className="rounded-lg px-6 py-3 font-medium text-white bg-white/20 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/30 active:scale-95"
                        >
                          {choice.label}
                        </button>
                      ))
                    : null}
                </div>
              </div>

              {page.flashTransition && (
                <div
                  className="pointer-events-none absolute inset-0 z-20 animate-fade-out"
                  style={{ backgroundColor: page.flashTransition }}
                />
              )}
            </div>
          </div>
        </MobileFrame>
      )
    }

    // Ordinary tap-anywhere page
    return (
      <MobileFrame>
        <div className="relative flex flex-col flex-1 min-h-dvh w-full">
          {backButton}
          <div
            key={page.id}
            role="button"
            tabIndex={0}
            onClick={page.placeholder ? undefined : handleAdvanceBranch}
            className="relative flex min-h-dvh w-full flex-1 flex-col cursor-pointer"
            style={{
              backgroundImage: `url(${page.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            <div className="relative z-10 flex min-h-dvh flex-1 flex-col items-center justify-center p-8 text-center">
              <p className="text-base text-white whitespace-pre-line">{page.text}</p>

              {/* Input field for pages with placeholder */}
              {page.placeholder && (
                <input
                  autoFocus
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder={page.placeholder}
                  className="mt-6 w-full max-w-sm rounded-2xl border border-border bg-input/40 px-4 py-4 text-base text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                      handleSubmit()
                    }
                  }}
                />
              )}

              {/* Show hint text */}
              {page.placeholder && (
                <p className="text-xs text-white/60 pt-4">
                  {page.buttonLabel || 'Press Enter to continue'}
                </p>
              )}
            </div>

            {page.flashTransition && (
              <div
                className="pointer-events-none absolute inset-0 z-20 animate-fade-out"
                style={{ backgroundColor: page.flashTransition }}
              />
            )}
          </div>
        </div>
      </MobileFrame>
    )
  }

  return null
}