'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

type Phase = 'fold' | 'toss' | 'settle'

/**
 * "Fold into bottle" animation — CSS/Framer Motion only, no image assets.
 * A note (the user's answer) folds (scaleX + rotate), then arcs down into a
 * simple SVG bottle outline. Calls `onComplete` once it settles.
 */
export function BottleFold({
  answer,
  onComplete,
  skipFold = false,
}: {
  answer: string
  onComplete: () => void
  skipFold?: boolean
}) {
  const [phase, setPhase] = useState<Phase>(skipFold ? 'toss' : 'fold')

  return (
    <div className="relative flex flex-1 flex-col items-center justify-between py-8">
      <p className="text-balance text-center text-sm text-muted-foreground">
        ปล่อยมันไป
      </p>

      {/* The note that folds and flies */}
      <div className="relative flex flex-1 items-center justify-center">
        <motion.div
          initial={{ scaleX: 1, rotate: 0, x: 0, y: 0, opacity: 1 }}
          animate={
            phase === 'fold'
              ? { scaleX: [1, 0.55, 0.14], rotate: [0, -4, 3] }
              : phase === 'toss'
                ? {
                    // Arc: up and over, then down into the bottle neck below.
                    x: [0, 20, 0],
                    y: [0, -90, 150],
                    scale: [1, 0.9, 0.35],
                    rotate: [3, 24, 70],
                    opacity: [1, 1, 0],
                  }
                : { opacity: 0 }
          }
          transition={
            phase === 'fold'
              ? { duration: 0.9, ease: 'easeInOut' }
              : { duration: 1.1, ease: 'easeIn', times: [0, 0.45, 1] }
          }
          onAnimationComplete={() => {
            if (phase === 'fold') setPhase('toss')
            else if (phase === 'toss') setPhase('settle')
          }}
          style={{ transformOrigin: 'center' }}
          className="flex h-16 w-64 items-center justify-center rounded-md  bg-card px-4 shadow-lg"
        >
          <span className="line-clamp-2 text-center text-sm text-foreground/80">
            {answer || 'your words'}
          </span>
        </motion.div>
      </div>

      {/* Simple SVG bottle outline (stroke only, no illustration/fill art) */}
      <motion.div
        animate={
          phase === 'settle'
            ? { scale: [1, 1.08, 1] }
            : { scale: 1 }
        }
        transition={{ duration: 0.6, ease: 'easeOut' }}
        onAnimationComplete={() => {
          if (phase === 'settle') {
            // brief pause so the "settle" pop reads, then advance
            setTimeout(onComplete, 500)
          }
        }}
      >
        <BottleOutline sealed={phase === 'settle'} />
      </motion.div>
    </div>
  )
}

function BottleOutline({ sealed }: { sealed: boolean }) {
  return (
    <svg
      width="96"
      height="150"
      viewBox="0 0 96 150"
      fill="none"
      aria-hidden
      className="text-primary"
    >
      {/* cork */}
      <rect
        x="38"
        y="4"
        width="20"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* neck + body outline */}
      <path
        d="M40 20 V40 C40 46 30 50 26 60 C22 70 22 120 30 134 C36 144 60 144 66 134 C74 120 74 70 70 60 C66 50 56 46 56 40 V20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* rolled note resting inside, revealed once sealed */}
      <motion.rect
        x="36"
        y="112"
        width="24"
        height="18"
        rx="2"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{ opacity: sealed ? 0.45 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  )
}
