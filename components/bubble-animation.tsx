'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

const bubbles = [
    { left: '8%', size: 52, duration: 10, delay: -4, opacity: 0.55 },
    { left: '23%', size: 38, duration: 8, delay: -6, opacity: 0.4 },
    { left: '41%', size: 64, duration: 12, delay: -2, opacity: 0.5 },
    { left: '59%', size: 42, duration: 9, delay: -7, opacity: 0.45 },
    { left: '76%', size: 56, duration: 11, delay: -5, opacity: 0.55 },
    { left: '92%', size: 36, duration: 8, delay: -3, opacity: 0.4 },
]

export function BubbleAnimation() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[8] overflow-hidden">
            {bubbles.map((bubble, index) => (
                <motion.div
                    key={index}
                    className="absolute top-0"
                    style={{ left: bubble.left, width: bubble.size, height: bubble.size }}
                    initial={{ y: '110vh', opacity: 0 }}
                    animate={{ y: '-20vh', opacity: [0, bubble.opacity, bubble.opacity, 0] }}
                    transition={{
                        duration: bubble.duration,
                        delay: bubble.delay,
                        ease: 'linear',
                        repeat: Infinity,
                    }}
                >
                    <Image
                        src="/background/burnout/bubble.webp"
                        alt=""
                        fill
                        sizes={`${bubble.size}px`}
                        className="object-contain"
                    />
                </motion.div>
            ))}
        </div>
    )
}