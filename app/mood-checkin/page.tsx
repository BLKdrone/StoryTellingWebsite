'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MobileFrame } from '@/components/mobile-frame'
import { StoryPage } from '@/components/story-page'
import { moodQuestion, moodBranches, moodOptions } from '@/data/mood-checkin'
import type { MoodKey } from '@/data/mood-checkin'

export default function MoodCheckinPage() {
  const router = useRouter()
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null)
  const [showBranch, setShowBranch] = useState(false)

  const handleAdvanceQuestion = () => {
    // Show mood selection UI
    // For tap-anywhere experience, we'll use a custom UI
    setShowBranch(false)
  }

  const handleSelectMood = (moodKey: MoodKey) => {
    setSelectedMood(moodKey)
    setShowBranch(true)
  }

  const handleAdvanceBranch = () => {
    // After mood branch message shown, go to next page
    router.push('/farewell')
  }

  if (showBranch && selectedMood) {
    const branch = moodBranches[selectedMood]
    // Create a page object from the branch data
    const branchPage = {
      id: `mood-${selectedMood}`,
      type: 'text-whale' as const,
      navigation: 'tap-anywhere' as const,
      background: branch.background,
      backgroundColor: branch.backgroundColor,
      sound: branch.sound,
      transition: 'fade',
      text: `${branch.title}\n\n${branch.message}\n\n${branch.suggestion}`,
    }

    return (
      <MobileFrame>
        <StoryPage page={branchPage} onAdvance={handleAdvanceBranch} />
      </MobileFrame>
    )
  }

  // Mood selection UI with tap-anywhere feel
  return (
    <MobileFrame>
      <div
        className="relative flex min-h-dvh w-full flex-1 flex-col items-center justify-center gap-8 p-8 text-center"
        style={{
          backgroundImage: `url(${moodQuestion.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Content */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">{moodQuestion.question}</h1>
            <p className="text-sm text-white/80">{moodQuestion.helper}</p>
          </div>

          {/* Mood options - tap to select */}
          <div className="grid grid-cols-2 gap-4">
            {moodOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleSelectMood(option.key)}
                className="rounded-lg p-4 font-medium text-white transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: option.color,
                  opacity: 0.8,
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </MobileFrame>
  )
}
