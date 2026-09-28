'use client'

import { useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { motion, useAnimationControls } from 'motion/react'

type FoldAxis = 'vertical' | 'horizontal'
const FOLD_SEQUENCE: FoldAxis[] = ['vertical', 'horizontal', 'vertical']

type FlapRect = {
  top: number
  left: number
  w: number
  h: number
  axis: FoldAxis
}

export function FoldAnimation({
  children,
  foldDuration = 0.5,
  width = 300,
  height = 420,
  className,
  onCompleteAction,
  finalImage,
}: {
  children?: ReactNode
  foldDuration?: number
  width?: number
  height?: number
  className?: string
  onCompleteAction?: (step: number) => void
  finalImage?: string
}) {
  const [visW, setVisW] = useState(width)
  const [visH, setVisH] = useState(height)
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const [showFinalImage, setShowFinalImage] = useState(false)
  const [flapRect, setFlapRect] = useState<FlapRect | null>(null)
  const flap = useAnimationControls()

  const isComplete = step >= FOLD_SEQUENCE.length
  const easeCurve = [0.4, 0, 0.2, 1] as const

  const handleTap = async () => {
    if (running) return
    setRunning(true)

    if (!isComplete) {
      const axis = FOLD_SEQUENCE[step]

      if (axis === 'vertical') {
        const halfH = visH / 2
        // flushSync forces React to commit + paint the flap BEFORE we touch its
        // animation controls, so .start() has something real to animate.
        flushSync(() => {
          setFlapRect({ top: halfH, left: 0, w: visW, h: halfH, axis })
          setVisH(halfH)
        })
        flap.set({ rotateX: 0 })
        await flap.start({ rotateX: 180, transition: { duration: foldDuration, ease: easeCurve } })
      } else {
        const halfW = visW / 2
        flushSync(() => {
          setFlapRect({ top: 0, left: halfW, w: halfW, h: visH, axis })
          setVisW(halfW)
        })
        flap.set({ rotateY: 0 })
        await flap.start({ rotateY: -180, transition: { duration: foldDuration, ease: easeCurve } })
      }

      setFlapRect(null)
      const next = step + 1
      setStep(next)
      onCompleteAction?.(next)
    } else if (finalImage && !showFinalImage) {
      setShowFinalImage(true)
      onCompleteAction?.(FOLD_SEQUENCE.length + 1)
    } else {
      setVisW(width)
      setVisH(height)
      setStep(0)
      setShowFinalImage(false)
      onCompleteAction?.(0)
    }

    setRunning(false)
  }

  const paperClasses = `overflow-hidden border border-slate-300 bg-white shadow-md ${className ?? ''}`

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={showFinalImage ? 'Star revealed' : finalImage && isComplete ? 'Tap to reveal the star' : isComplete ? 'Tap to unfold' : 'Tap to fold'}
      onClick={handleTap}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleTap()
        }
      }}
      className="inline-flex cursor-pointer select-none items-center justify-center p-8 outline-none"
      style={{ perspective: 1600 }}
    >
      <div className="relative" style={{ width, height, transformStyle: 'preserve-3d' }}>
        {showFinalImage && finalImage ? (
          <motion.img
            src={finalImage}
            alt=""
            initial={{ opacity: 0, scale: 0.45, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute object-contain"
            style={{
              width: visW * 5,
              height: visH * 5,
              left: -visW * 0.9,
              top: -visH * 2,

            }}
          />
        ) : (
          <div
            className={`absolute left-0 top-0 ${paperClasses}`}
            style={{
              width: visW,
              height: visH,
              backgroundImage: `url(/background/mood-checkin/bottle/paper.webp)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex items-center justify-center" style={{ width, height }}>
              {children}
            </div>
          </div>
        )}

        {flapRect && !showFinalImage && (
          <motion.div
            className={paperClasses}
            style={{
              position: 'absolute',
              top: flapRect.top,
              left: flapRect.left,
              width: flapRect.w,
              height: flapRect.h,
              transformOrigin: flapRect.axis === 'vertical' ? 'top center' : 'left center',
              transformStyle: 'preserve-3d',
              backgroundImage: `url(/background/mood-checkin/bottle/paper.webp)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              ...(flapRect.axis === 'vertical'
                ? { borderTop: '1.5px solid #8b5a2b' }
                : { borderLeft: '1.5px solid #8b5a2b' }),
            }}
            animate={flap}
          >
            <div
              className="absolute inset-0 bg-black/5"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}