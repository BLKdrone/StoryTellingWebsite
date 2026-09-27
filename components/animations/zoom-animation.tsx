'use client'

import { type ReactNode } from 'react'
import { motion } from 'motion/react'

/**
 * ZoomAnimation — zooms toward a configurable focal point on page enter.
 * scale: 1 → `peakScale` over `duration`, anchored at `focalPoint`
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
  /** Seconds to reach the final zoom scale. Defaults to 1. */
  duration?: number
  className?: string
  onComplete?: () => void
}) {
  return (
    <motion.div
      className={className}
      style={{ transformOrigin: focalPoint }}
      initial={{ scale: 1 }}
      animate={{ scale: peakScale }}
      transition={{ duration, ease: 'easeInOut' }}
      onAnimationComplete={() => onComplete?.()}
    >
      {children}
    </motion.div>
  )
}
