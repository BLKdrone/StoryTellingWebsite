'use client'

import { Suspense, useState } from 'react'
import { motion } from 'motion/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MobileFrame } from '@/components/mobile-frame'
import { BottleFold } from '@/components/bottle-fold'
import { FoldAnimation } from '@/components/animations/fold-animation'
import { bottleIntro, bottleQuestion, bottleOutros } from '@/data/bottle'
import { usePageAudio } from '@/components/page-audio'

const RESUME_KEY = 'bottle-resume'

interface BottleResumeState {
  step: number
  selectedId: string | null
  outroIndex: number | null
}

function loadResumeState(): BottleResumeState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(RESUME_KEY)
    return raw ? (JSON.parse(raw) as BottleResumeState) : null
  } catch {
    return null
  }
}

function saveResumeState(state: BottleResumeState) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(RESUME_KEY, JSON.stringify(state))
  } catch {
    // ignore storage errors (private browsing, quota, etc.)
  }
}

function BottlePageInner() {
  usePageAudio(bottleIntro.sound)
  const router = useRouter()
  const searchParams = useSearchParams()
  const resumed = searchParams.get('resume') === '1' ? loadResumeState() : null

  const [step, setStep] = useState(resumed?.step ?? 1)
  const [selectedId, setSelectedId] = useState<string | null>(resumed?.selectedId ?? null)
  const [zooming, setZooming] = useState(false)
  const [randomOutro, setRandomOutro] = useState<(typeof bottleOutros)[number] | null>(
    resumed?.outroIndex != null ? bottleOutros[resumed.outroIndex] : null
  )

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setZooming(true)
    setTimeout(() => setStep(3), 1200)
  }

  const handleBottleComplete = () => {
    const outroIndex = Math.floor(Math.random() * bottleOutros.length)
    setRandomOutro(bottleOutros[outroIndex])
    setStep(5)
  }

  const selectedText = bottleQuestion.options.find((o) => o.id === selectedId)?.label || ''

  // Single back handler for every step, so the button never disappears
  // partway through the flow.
  const handleBack = () => {
    if (step === 5) {
      setRandomOutro(null)
      setStep(4)
    } else if (step === 4) {
      setStep(3)
    } else if (step === 3) {
      setSelectedId(null)
      setZooming(false)
      setStep(2)
    } else if (step === 2) {
      setStep(1)
    } else if (step === 1) {
      if (new URLSearchParams(window.location.search).get('from') === 'mood-checkin') {
        // Return to the exact mood-checkin page the user left, not the intro.
        router.push('/mood-checkin?resume=1')
      } else {
        router.push('/mood-checkin')
      }
    }
  }

  const goToCheckpoint = () => {
    // Snapshot exactly where we are so the checkpoint's back button
    // can bring the user right back here instead of restarting.
    const outroIndex = randomOutro ? bottleOutros.indexOf(randomOutro) : null
    saveResumeState({ step, selectedId, outroIndex })
    router.push('/chapter-checkpoint?from=mood-checkin')
  }

  return (
    <MobileFrame>
      <div className="relative flex flex-1 flex-col min-h-dvh bg-[#0a1a24] text-white">
        {/* Background layer */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

        {/* Back button — visible on every step, hidden only mid-zoom transition so it can't be tapped during the animation. */}
        {!(step === 2 && zooming) && (
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

        {/* Step 1: Intro Text */}
        {step === 1 && (
          <div
            className="relative z-10 flex flex-1 flex-col items-center justify-center p-8 cursor-pointer"
            onClick={() => setStep(2)}
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-lg text-center font-serif leading-relaxed text-balance">
                {bottleIntro.text}
              </p>
              <p className="text-base font-serif text-white/50 text-center mt-12">Tap anywhere to continue</p>
            </motion.div>
          </div>
        )}

        {/* Step 2: Questions */}
        {step === 2 && (
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-6 gap-10">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: zooming ? 0 : 1, y: zooming ? -20 : 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl font-serif text-center text-balance"
            >
              {bottleQuestion.question}
            </motion.h1>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {bottleQuestion.options.map((option) => {
                const isSelected = selectedId === option.id
                const isOther = selectedId && !isSelected

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => !selectedId && handleSelect(option.id)}
                    animate={
                      zooming && isSelected
                        ? { scale: 1.15, opacity: 0 } // Slight zoom then fade out, handing over to BottleFold
                        : zooming && isOther
                          ? { opacity: 0, scale: 0.95 }
                          : { scale: 1, opacity: 1 }
                    }
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`p-4 rounded-xl text-base font-serif font-medium border transition-colors ${isSelected ? 'bg-white/20 border-white/40' : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    disabled={!!selectedId}
                  >
                    {option.label}
                  </motion.button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 3: Paper Fold Animation */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex flex-1 flex-col items-center justify-center"
          >
            <FoldAnimation
              width={280}
              height={400}
              onComplete={(foldStep) => {
                if (foldStep === 3) {
                  // When folding is fully complete, transition to the bottle toss
                  setTimeout(() => setStep(4), 500)
                }
              }}
            >
              <div className="p-8 flex flex-col items-center justify-center text-center text-slate-800 font-serif text-2xl h-full w-full">
                {selectedText}
              </div>
            </FoldAnimation>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-base font-serif text-white/50 text-center mt-12"
            >
              Tap the paper to fold it
            </motion.p>
          </motion.div>
        )}

        {/* Step 4: Bottle Toss (skips the CSS fold phase) */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex flex-1 flex-col items-center justify-center"
          >
            <BottleFold
              answer={selectedText}
              skipFold={true}
              onComplete={handleBottleComplete}
              backgroundImage="/background/mood-checkin/bottle/star.webp"
              bottleImage="/background/mood-checkin/bottle/bottle.webp"
            />
          </motion.div>
        )}

        {/* Step 5: Outro Text (Random) */}
        {step === 5 && randomOutro && (
          <div
            className="relative z-10 flex flex-1 flex-col items-center justify-center p-8 cursor-pointer bg-cover bg-center"
            style={{ backgroundImage: `url(/${randomOutro.background})` }}
            onClick={goToCheckpoint}
          >
            {/* optional dark overlay so text stays readable over the image */}
            <div aria-hidden className="absolute inset-0 bg-black/40" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative z-10"
            >
              <p className="text-lg text-center font-serif leading-relaxed text-balance">
                {randomOutro.text}
              </p>
              <p className="text-base font-serif text-white/50 text-center mt-12">Tap anywhere to finish</p>
            </motion.div>
          </div>
        )}
      </div>
    </MobileFrame>
  )
}

export default function BottlePage() {
  return (
    <Suspense fallback={null}>
      <BottlePageInner />
    </Suspense>
  )
}