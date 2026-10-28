'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { STAR_ASPECT, STAR_CROP, STAR_SRC, STAR_W } from './animations/star-crop'

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
  settled = false,
  startPoint,
  backgroundImage,
  bottleImage,
}: {
  answer: string
  onComplete: () => void
  skipFold?: boolean
  /** Show the finished state (star already in the bottle) with no animation. Tap to continue. */
  settled?: boolean
  /** Viewport centre where the star was left by the previous screen; the note starts exactly there. */
  startPoint?: { x: number; y: number }
  backgroundImage?: string
  bottleImage?: string
}) {
  const [phase, setPhase] = useState<Phase>(settled ? 'settle' : skipFold ? 'toss' : 'fold')
  // Distance (px) from the note's centre to the bottle's centre, measured once
  // the toss starts so the star always lands in the middle of the bottle.
  const [dropY, setDropY] = useState<number | null>(null)
  const noteRef = useRef<HTMLDivElement>(null)
  const bottleRef = useRef<HTMLDivElement>(null)

  // Shift (px) that moves the note from its natural spot to `startPoint`.
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useLayoutEffect(() => {
    if (phase !== 'toss' || dropY !== null) return
    const note = noteRef.current?.getBoundingClientRect()
    const bottle = bottleRef.current?.getBoundingClientRect()
    if (!note || !bottle) return
    const noteCx = note.left + note.width / 2
    const noteCy = note.top + note.height / 2
    const from = startPoint ?? { x: noteCx, y: noteCy }
    setOffset({ x: from.x - noteCx, y: from.y - noteCy })
    setDropY(bottle.top + bottle.height / 2 - from.y)
  }, [phase, dropY, startPoint])

  const useStarNote = !!bottleImage

  return (
    <div
      className={`relative flex flex-1 flex-col items-center justify-between py-8 ${settled ? 'cursor-pointer' : ''}`}
      onClick={settled ? onComplete : undefined}
    >
      <p className="text-balance text-center text-sm text-muted-foreground">
        ปล่อยมันไป
      </p>

      {/* The note that folds and flies */}
      <div className="relative z-30 flex flex-1 items-center justify-center">
        <div style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
        <motion.div
          ref={noteRef}
          initial={{ scaleX: 1, rotate: 0, x: 0, y: 0, opacity: settled ? 0 : 1 }}
          animate={
            phase === 'fold'
              ? { scaleX: [1, 0.55, 0.14], rotate: [0, -4, 3] }
              : phase === 'toss'
                ? dropY === null
                  ? {} // wait for measurement
                  : {
                    // Straight drop to the centre of the bottle.
                    x: 0,
                    y: [0, -20, dropY],
                    scale: useStarNote ? [1, 0.85, 0.43] : [1, 0.85, 0.2],
                    rotate: [0, 0, 8],
                    opacity: useStarNote ? [1, 1, 1] : [1, 1, 0],
                  }
                : { opacity: 0 }
          }
          transition={
            phase === 'fold'
              ? { duration: 2.5, ease: 'easeInOut' }
              : phase === 'toss'
                ? { duration: 1.8, ease: 'easeIn', times: [0, 0.3, 1] }
                : { duration: 0.2 }
          }
          onAnimationComplete={() => {
            if (phase === 'fold') setPhase('toss')
            else if (phase === 'toss' && dropY !== null) setPhase('settle')
          }}
          style={
            useStarNote
              ? { transformOrigin: 'center', width: STAR_W, aspectRatio: String(STAR_ASPECT), ...STAR_CROP }
              : {
                transformOrigin: 'center',
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
          }
          className={useStarNote ? '' : 'flex h-16 w-64 items-center justify-center px-4'}
        />
        </div>
      </div>

      {/* Simple SVG bottle outline (stroke only, no illustration/fill art) */}
      <motion.div
        style={{ position: 'relative' }}
        animate={phase === 'settle' && !settled ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        onAnimationComplete={() => {
          if (phase === 'settle' && !settled) {
            setTimeout(onComplete, 500)
          }
        }}
      >
        {bottleImage ? (
          <div ref={bottleRef} className="relative h-[250px] w-[150px]">
            <img
              src={bottleImage}
              alt=""
              width={150}
              height={250}
              className="relative z-10 h-full w-full"
            />
            {/* Same canvas as the bottle, star is baked in at its centre */}
            <motion.img
              src={STAR_SRC}
              alt=""
              initial={settled ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1 }}
              animate={
                phase === 'settle'
                  ? { opacity: 1, scale: settled ? 1 : [1, 1.2, 1] }
                  : { opacity: 0, scale: 1 }
              }
              transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.6, ease: 'easeOut' } }}
              className="pointer-events-none absolute inset-0 z-20 h-full w-full"
            />
          </div>
        ) : (
          <BottleOutline sealed={phase === 'settle'} />
        )}
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
