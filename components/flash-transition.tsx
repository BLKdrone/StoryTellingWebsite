'use client'

import { AnimatePresence, motion } from 'motion/react'

interface SlideNextProps {
    pageKey: string
    color?: 'black' | 'white'
}

export function SlideNext({ pageKey, color }: SlideNextProps) {
    return (
        <AnimatePresence>
            {color && (
                <motion.div
                    key={pageKey}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-50"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 5, ease: 'easeInOut' }}
                    style={{ backgroundColor: color }}
                />
            )}
        </AnimatePresence>
    )
}