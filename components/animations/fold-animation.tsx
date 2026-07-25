'use client'

import { useState, type ReactNode } from 'react'
import { motion, useAnimationControls } from 'motion/react'

/**
 * FoldAnimation — a rectangle that folds like paper `folds` times, sequentially.
 * Each fold rotates the right half around its left edge
 * (rotateY: 0 → -180deg, transform-origin: left center) with `perspective` on
 * the parent, then the visible width collapses by half. ~300ms per fold.
 * CSS/Framer Motion only, no image assets. Triggered on click/tap.
 */
export function FoldAnimation({
  children,
  folds = 3,
  foldDuration = 0.3,
  width = 256,
  height = 160,
  className,
  onComplete,
}: {
  children?: ReactNode
  /** How many sequential folds to perform. Defaults to 3. */
  folds?: number
  /** Seconds per fold. Defaults to 0.3 (~300ms). */
  foldDuration?: number
  /** Starting width of the sheet in px. */
  width?: number
  /** Height of the sheet in px. */
  height?: number
  className?: string
  onComplete?: () => void
}) {
  const flap = useAnimationControls()
  // Visible width of the sheet, halved after each completed fold.
  const [visibleWidth, setVisibleWidth] = useState(width)
  const [running, setRunning] = useState(false)

  const run = async () => {
    if (running) return
    setRunning(true)
    let w = width
    for (let i = 0; i < folds; i++) {
      // Fold the right half over onto the left half.
      await flap.start({
        rotateY: -180,
        transition: { duration: foldDuration, ease: 'easeInOut' },
      })
      // The sheet is now half as wide; snap the flap back for the next fold.
      w = w / 2
      setVisibleWidth(w)
      flap.set({ rotateY: 0 })
    }
    setRunning(false)
    onComplete?.()
  }

  const sheetClasses = `overflow-hidden rounded-md bg-card shadow-lg ${className ?? ''}`

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Tap to fold"
      onClick={run}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          run()
        }
      }}
      className="flex items-center justify-center outline-none"
      // `perspective` on the parent gives the fold real depth.
      style={{ perspective: 1200 }}
    >
      <div
        className="relative"
        style={{ width: visibleWidth, height, transformStyle: 'preserve-3d' }}
      >
        {/* Left (static) half — shows the left portion of the sheet. */}
        <div
          className={`absolute left-0 top-0 h-full ${sheetClasses}`}
          style={{ width: visibleWidth }}
        >
          <div
            className="flex h-full items-center justify-center"
            style={{ width, height }}
          >
            {children}
          </div>
        </div>

        {/* Right (folding) half — rotates around the shared left edge. */}
        <motion.div
          className={`absolute left-0 top-0 h-full ${sheetClasses}`}
          style={{
            width: visibleWidth,
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
          }}
          initial={{ rotateY: 0 }}
          animate={flap}
        >
          {/* Right portion of the sheet, offset so the halves line up. */}
          <div
            className="flex h-full items-center justify-center"
            style={{ width, height, marginLeft: -visibleWidth }}
          >
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
