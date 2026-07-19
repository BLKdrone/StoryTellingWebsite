'use client'

import { type ReactNode } from 'react'
import { motion } from 'motion/react'

/**
 * ResizeAnimation — a square element that grows while pressed and shrinks back
 * on release. scale: 1 → `maxScale` on tap/hold, back to 1 on release.
 * CSS/Framer Motion only, no image assets.
 */
export function ResizeAnimation({
  children,
  size = 160,
  maxScale = 1.5,
  duration = 0.35,
  className,
}: {
  children?: ReactNode
  /** Side length of the square in px. */
  size?: number
  /** Scale reached while held. Defaults to 1.5. */
  maxScale?: number
  /** Seconds for the grow/shrink transition. */
  duration?: number
  className?: string
}) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Press and hold to resize"
      className={`flex select-none items-center justify-center rounded-2xl border border-primary/40 bg-card shadow-lg outline-none ${className ?? ''}`}
      style={{ width: size, height: size }}
      initial={{ scale: 1 }}
      // Grow while pressed (pointer or keyboard), shrink back otherwise.
      whileTap={{ scale: maxScale }}
      whileFocus={{ scale: 1 }}
      transition={{ duration, ease: 'easeOut' }}
      // Pointer-based hold for mouse/touch.
      onPointerDown={(e) => e.currentTarget.setPointerCapture(e.pointerId)}
    >
      {children}
    </motion.div>
  )
}
