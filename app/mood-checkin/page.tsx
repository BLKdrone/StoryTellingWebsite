'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MobileFrame } from '@/components/mobile-frame'
import { StoryPage } from '@/components/story-page'
import { moodQuestion, moodBranches, moodOptions } from '@/data/mood-checkin'
import type { MoodKey } from '@/data/mood-checkin'

type PageState = 'question' | 'options' | 'branch' | 'complete'

export default function MoodCheckinPage() {
  const router = useRouter()
  const [pageState, setPageState] = useState<PageState>('question')
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null)
  const [branchIndex, setBranchIndex] = useState(0)

  const handleBack = () => {
    if (pageState === 'branch') {
      if (branchIndex > 0) {
        setBranchIndex((i) => i - 1)
      } else {
        setPageState('options')
        setSelectedMood(null)
      }
    } else if (pageState === 'options') {
      setPageState('question')
    }
  }

  // Step 1: Show question with tap-anywhere
  const handleAdvanceQuestion = () => {
    setPageState('options')
  }

  // Step 2: Show mood options with tap-anywhere
  const handleAdvanceOptions = () => {
    setPageState('branch')
  }

  // Step 3: User taps a mood option
  const handleSelectMood = (moodKey: MoodKey) => {
    setSelectedMood(moodKey)
    setPageState('branch')
  }

  // Step 4: Show mood branch with tap-anywhere
  const handleAdvanceBranch = () => {
    if (!selectedMood) return
    const pages = moodBranches[selectedMood].pages
    if (branchIndex < pages.length - 1) {
      setBranchIndex((i) => i + 1)   // go to next page in the branch
    } else {
      router.push('/chapter-checkpoint?from=mood-checkin')   // <-- add ?from=
    }
  }


  // Page 1: Question
  if (pageState === 'question') {
    const questionPage = {
      id: 'mood-question',
      type: 'text-whale' as const,
      navigation: 'tap-anywhere' as const,
      background: moodQuestion.background,
      sound: moodQuestion.sound,
      transition: 'fade',
      text: `${moodQuestion.question}\n\n${moodQuestion.helper}`,
    }

    return (
      <MobileFrame>
        <StoryPage page={questionPage} onAdvance={handleAdvanceQuestion} />
      </MobileFrame>
    )
  }

  // Page 2: Mood options with tap-anywhere to continue
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
          onClick={handleAdvanceOptions}
          className="relative flex min-h-dvh w-full flex-1 flex-col items-center justify-center gap-8 p-8 text-center cursor-pointer"
          role="button"
          tabIndex={0}
          style={{
            backgroundImage: `url(${moodQuestion.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Scrim */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

          {/* Content */}
          <div className="relative z-10 space-y-6 w-full">
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-white">Choose your mood</h1>
              <p className="text-sm text-white/70">Tap anywhere or select a mood</p>
            </div>

            {/* Mood options */}
            <div className="grid grid-cols-2 gap-4">
              {moodOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectMood(option.key)
                  }}
                  className="rounded-lg p-4 font-medium text-white transition-all hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: option.color,
                    opacity: 0.85,
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <p className="text-xs text-white/60 pt-4">Tap anywhere to continue →</p>
          </div>
        </div>
        </div>
      </MobileFrame>
    )
  }

  // Page 3: Mood branch with tap-anywhere
  if (pageState === 'branch' && selectedMood) {
    const page = moodBranches[selectedMood].pages[branchIndex]
    const branchPage = {
      id: `mood-${selectedMood}-${branchIndex}`,
      type: 'text-whale' as const,
      navigation: 'tap-anywhere' as const,
      background: page.background,
      sound: page.sound,
      transition: 'fade',
      text: [page.title, page.message, page.suggestion].filter(Boolean).join('\n\n'),
    }

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
          <StoryPage page={branchPage} onAdvance={handleAdvanceBranch} />
        </div>
      </MobileFrame>
    )
  }

  return null
}
