'use client'

import { useState, type ReactNode } from 'react'
import { motion, useAnimationControls } from 'motion/react'

type FoldAxis = 'horizontal' | 'vertical'

const MAX_FOLDS = 4

/**
 * FoldAnimation — a rectangle that folds like paper, one fold per tap/click.
 * Each fold splits the CURRENT visible sheet into two equal, side-by-side
 * panels that meet at a center crease, then rotates the second panel
 * (right, for horizontal folds; bottom, for vertical folds) back around
 * that shared crease edge until it lands flat on top of the first panel —
 * a true "fold in half," not an offset flap swinging out to the side.
 * Horizontal folds (right-over-left) happen first, then vertical folds
 * (bottom-over-top). Capped at 4 folds total. White paper, brown crease
 * lines left behind at every fold. CSS/Framer Motion only, no images.
 */
export function FoldAnimation({
  children,
  horizontalFolds = 2,
  verticalFolds = 2,
  foldDuration = 0.3,
  width = 256,
  height = 160,
  className,
  onComplete,
}: {
  children?: ReactNode
  /** How many horizontal folds (right-over-left) to perform first. Defaults to 2. */
  horizontalFolds?: number
  /** How many vertical folds (bottom-over-top) to perform after. Defaults to 2. */
  verticalFolds?: number
  /** Total folds are capped at 4 regardless of the two counts above. */
  foldDuration?: number
  width?: number
  height?: number
  className?: string
  onComplete?: () => void
}) {
  const flap = useAnimationControls()

  const foldSequence: FoldAxis[] = [
    ...Array(Math.max(0, horizontalFolds)).fill('horizontal' as const),
    ...Array(Math.max(0, verticalFolds)).fill('vertical' as const),
  ].slice(0, MAX_FOLDS)

  // Size of the flat, folded-so-far sheet (before the fold currently in progress, if any).
  const [currentWidth, setCurrentWidth] = useState(width)
  const [currentHeight, setCurrentHeight] = useState(height)
  const [foldIndex, setFoldIndex] = useState(0)
  const [running, setRunning] = useState(false)
  // Crease lines left behind by completed folds.
  const [creases, setCreases] = useState({ right: false, bottom: false })

  const isComplete = foldIndex >= foldSequence.length
  const activeAxis: FoldAxis | null = running ? foldSequence[foldIndex] : null

  // Performs exactly ONE fold per call/tap.
  const run = async () => {
    if (running || isComplete) return
    const axis = foldSequence[foldIndex]
    setRunning(true)

    if (axis === 'horizontal') {
      await flap.start({
        rotateY: -180,
        transition: { duration: foldDuration, ease: 'easeInOut' },
      })
      setCurrentWidth((w) => w / 2)
      setCreases((c) => ({ ...c, right: true }))
    } else {
      await flap.start({
        rotateX: 180,
        transition: { duration: foldDuration, ease: 'easeInOut' },
      })
      setCurrentHeight((h) => h / 2)
      setCreases((c) => ({ ...c, bottom: true }))
    }

    flap.set(axis === 'horizontal' ? { rotateY: 0 } : { rotateX: 0 })
    setRunning(false)

    const nextIndex = foldIndex + 1
    setFoldIndex(nextIndex)
    if (nextIndex >= foldSequence.length) {
      onComplete?.()
    }
  }

  const sheetClasses = `overflow-hidden bg-white shadow-lg ${className ?? ''}`
  const creaseColor = '#8b5a2b'
  const creaseLine = `1.5px solid ${creaseColor}`

  // Half-dimensions for the fold currently in progress (measured from the
  // sheet's size *before* this fold, i.e. currentWidth/currentHeight).
  const halfW = currentWidth / 2
  const halfH = currentHeight / 2

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={isComplete ? 'Fully folded' : 'Tap to fold'}
      aria-disabled={isComplete}
      onClick={run}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          run()
        }
      }}
      className={`flex items-center justify-center outline-none ${
        isComplete || running ? 'cursor-default' : 'cursor-pointer'
      }`}
      style={{ perspective: 1200 }}
    >
      {activeAxis === 'horizontal' ? (
        // Mid-fold: two half-width panels meeting at a center crease.
        <div
          className="relative rounded-md"
          style={{ width: currentWidth, height: currentHeight, transformStyle: 'preserve-3d' }}
        >
          {/* Left (static) panel */}
          <div
            className={`absolute left-0 top-0 h-full rounded-l-md ${sheetClasses}`}
            style={{ width: halfW, borderRight: creaseLine }}
          >
            <div className="flex h-full w-full items-center justify-center">{children}</div>
          </div>

          {/* Right panel — hinges at the shared crease (its own left edge). */}
          <motion.div
            className={`absolute top-0 h-full rounded-r-md ${sheetClasses}`}
            style={{
              left: halfW,
              width: halfW,
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              borderLeft: creaseLine,
            }}
            initial={{ rotateY: 0 }}
            animate={flap}
          >
            <div className="flex h-full w-full items-center justify-center">{children}</div>
          </motion.div>
        </div>
      ) : activeAxis === 'vertical' ? (
        // Mid-fold: two half-height panels meeting at a center crease.
        <div
          className="relative rounded-md"
          style={{ width: currentWidth, height: currentHeight, transformStyle: 'preserve-3d' }}
        >
          {/* Top (static) panel */}
          <div
            className={`absolute left-0 top-0 w-full rounded-t-md ${sheetClasses}`}
            style={{ height: halfH, borderBottom: creaseLine }}
          >
            <div className="flex h-full w-full items-center justify-center">{children}</div>
          </div>

          {/* Bottom panel — hinges at the shared crease (its own top edge). */}
          <motion.div
            className={`absolute w-full rounded-b-md ${sheetClasses}`}
            style={{
              top: halfH,
              height: halfH,
              transformOrigin: 'center top',
              transformStyle: 'preserve-3d',
              borderTop: creaseLine,
            }}
            initial={{ rotateX: 0 }}
            animate={flap}
          >
            <div className="flex h-full w-full items-center justify-center">{children}</div>
          </motion.div>
        </div>
      ) : (
        // Idle: flat, already-folded sheet with any crease lines left behind.
        <div
          className={`rounded-md ${sheetClasses}`}
          style={{
            width: currentWidth,
            height: currentHeight,
            borderRight: creases.right ? creaseLine : undefined,
            borderBottom: creases.bottom ? creaseLine : undefined,
          }}
        >
          <div className="flex h-full w-full items-center justify-center">{children}</div>
        </div>
      )}
    </div>
  )
}