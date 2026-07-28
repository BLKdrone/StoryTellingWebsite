'use client'

import { useState, type ReactNode } from 'react'
import { motion, useAnimationControls } from 'motion/react'

export function FoldAnimation({
  children,
  foldDuration = 0.5,
  width = 595,
  height = 842,
  className,
  onComplete,
}: {
  children?: ReactNode
  foldDuration?: number
  width?: number
  height?: number
  className?: string
  onComplete?: (step: number) => void
}) {
  const [step, setStep] = useState<number>(0)
  const [running, setRunning] = useState<boolean>(false)

  const step1Controls = useAnimationControls()
  const step2Controls = useAnimationControls()
  const step3Controls = useAnimationControls()

  const handleNextFold = async () => {
    if (running) return
    setRunning(true)

    const easeCurve = [0.4, 0.0, 0.2, 1] as const

    if (step === 0) {
      await step1Controls.start({
        rotateX: 180,
        transition: { duration: foldDuration, ease: easeCurve },
      })
      setStep(1)
    } else if (step === 1) {
      await step2Controls.start({
        rotateY: -180,
        transition: { duration: foldDuration, ease: easeCurve },
      })
      setStep(2)
    } else if (step === 2) {
      await step3Controls.start({
        rotateX: 180,
        transition: { duration: foldDuration, ease: easeCurve },
      })
      setStep(3)
    } else {
      await Promise.all([
        step3Controls.start({ rotateX: 0, transition: { duration: foldDuration } }),
        step2Controls.start({ rotateY: 0, transition: { duration: foldDuration } }),
        step1Controls.start({ rotateX: 0, transition: { duration: foldDuration } }),
      ])
      setStep(0)
    }

    setRunning(false)
    onComplete?.(step === 3 ? 0 : step + 1)
  }

  const baseSheet = `overflow-hidden border border-slate-300 bg-white shadow-md ${className ?? ''}`

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Click to fold sheet"
      onClick={handleNextFold}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleNextFold()
        }
      }}
      className="inline-flex cursor-pointer select-none items-center justify-center p-8 outline-none"
      style={{ perspective: 2000 }}
    >
      <div className="relative" style={{ width, height, transformStyle: 'preserve-3d' }}>
        {/* z-0: TOP-LEFT BASE QUADRANT (bottom of the stack, stays put) */}
        <div
          className={`absolute left-0 top-0 ${baseSheet}`}
          style={{ width: width / 2, height: height / 2, zIndex: 0 }}
        >
          <div className="flex items-center justify-center pointer-events-none" style={{ width, height }}>
            {children}
          </div>
        </div>

        {/* z-10: TOP-RIGHT QUADRANT (folds left onto base in step 2) */}
        <motion.div
          className={`absolute right-0 top-0 ${baseSheet}`}
          style={{
            width: width / 2,
            height: height / 2,
            zIndex: 10,
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
          }}
          initial={{ rotateY: 0 }}
          animate={step2Controls}
        >
          <div
            className="flex items-center justify-center pointer-events-none"
            style={{ width, height, marginLeft: -width / 2 }}
          >
            {children}
          </div>
          <div
            className="absolute inset-0 bg-black/5"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          />
        </motion.div>

        {/* z-20: BOTTOM HALF (folds up in step 1; its own right side also folds in step 2) */}
        <motion.div
          className="absolute left-0 top-1/2 w-full"
          style={{ height: height / 2, zIndex: 20, transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
          initial={{ rotateX: 0 }}
          animate={step1Controls}
        >
          <div className={`absolute left-0 top-0 ${baseSheet}`} style={{ width: width / 2, height: height / 2 }}>
            <div
              className="flex items-center justify-center pointer-events-none"
              style={{ width, height, marginTop: -height / 2 }}
            >
              {children}
            </div>
          </div>

          <motion.div
            className={`absolute right-0 top-0 ${baseSheet}`}
            style={{
              width: width / 2,
              height: height / 2,
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
            }}
            initial={{ rotateY: 0 }}
            animate={step2Controls}
          >
            <div
              className="flex items-center justify-center pointer-events-none"
              style={{ width, height, marginLeft: -width / 2, marginTop: -height / 2 }}
            >
              {children}
            </div>
            <div
              className="absolute inset-0 bg-black/5"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            />
          </motion.div>

          <div
            className="absolute inset-0 bg-black/10"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
          />
        </motion.div>

        {/* z-30: QUARTER FLAP — the currently-topmost quarter, rendered LAST so it always
            paints above the other two layers. It shows the same content the top-right
            layer shows once folded (that's what's visually on top after step 2). */}
        <motion.div
          className={`absolute left-0 ${baseSheet}`}
          style={{
            top: height / 4,
            width: width / 2,
            height: height / 4,
            zIndex: 30,
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
          }}
          initial={{ rotateX: 0 }}
          animate={step3Controls}
        >
          <div
            className="flex items-center justify-center pointer-events-none"
            style={{ width, height, marginLeft: -width / 2, marginTop: -(height / 4) }}
          >
            {children}
          </div>
          <div
            className="absolute inset-0 bg-black/10"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
          />
        </motion.div>
      </div>
    </div>
  )
}