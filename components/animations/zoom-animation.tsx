'use client'

import { type ReactNode } from 'react'
import { motion } from 'motion/react'

/**
 * ZoomAnimation — zooms toward a configurable focal point on page enter.
 * scale: 1 → `peakScale` → 1 over `duration`, anchored at `focalPoint`
 * (a CSS transform-origin string, e.g. "30% 40%"). CSS/Framer Motion only.
 *
 * Runs once on mount (page enter). Set a unique `key` if you need to replay it.
 */
export function ZoomAnimation({
  children,
  focalPoint = '50% 50%',
  peakScale = 1.2,
  duration = 1,
  className,
  onComplete,
}: {
  children?: ReactNode
  /** transform-origin / focal point, e.g. "30% 40%". */
  focalPoint?: string
  /** Peak zoom scale. Defaults to 1.2. */
  peakScale?: number
  /** Total seconds for the zoom in-and-out. Defaults to 1. */
  duration?: number
  className?: string
  onComplete?: () => void
}) {
  return (
    <motion.div
      className={className}
      style={{ transformOrigin: focalPoint }}
      initial={{ scale: 1 }}
      animate={{ scale: [1, peakScale, 1] }}
      transition={{ duration, ease: 'easeInOut', times: [0, 0.5, 1] }}
      onAnimationComplete={() => onComplete?.()}
    >
      {children}
    </motion.div>
  )
}
