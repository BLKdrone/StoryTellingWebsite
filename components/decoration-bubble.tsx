'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

const bubbles = [
    { left: '8%', size: 52, duration: 14, delay: -4, opacity: 0.55 },
    { left: '23%', size: 38, duration: 12, delay: -6, opacity: 0.4 },
    { left: '41%', size: 64, duration: 16, delay: -2, opacity: 0.5 },
    { left: '59%', size: 42, duration: 13, delay: -7, opacity: 0.45 },
    { left: '76%', size: 56, duration: 15, delay: -5, opacity: 0.55 },
    { left: '92%', size: 36, duration: 12, delay: -3, opacity: 0.4 },
]

const manyBubbleImage = '/background/burnout/manybubble.PNG'
const manyBubbleAspectRatio = '3600 / 6400'

type DecorationBubbleType = 'one' | 'many'

export function DecorationBubble({ type = 'many' }: { type?: DecorationBubbleType }) {
    if (type === 'many') {
        return (
            <div aria-hidden className="pointer-events-none absolute inset-0 z-[8] overflow-hidden">
                <div
                    className="scroll-up absolute left-0 top-0 w-full"
                    style={{ aspectRatio: manyBubbleAspectRatio }}
                >
                    <div className="absolute inset-0">
                        <Image
                            src={manyBubbleImage}
                            alt=""
                            width={3600}
                            height={6400}
                            sizes="(max-width: 480px) 100vw, 480px"
                            className="absolute inset-0 h-full w-full object-contain"
                        />
                    </div>
                    <div className="absolute inset-x-0 top-full aspect-[3600/6400]">
                        <Image
                            src={manyBubbleImage}
                            alt=""
                            width={3600}
                            height={6400}
                            sizes="(max-width: 480px) 100vw, 480px"
                            className="absolute inset-0 h-full w-full object-contain"
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[8] overflow-hidden">
            {bubbles.map((bubble) => (
                <motion.div
                    key={bubble.left}
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