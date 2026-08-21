'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { MobileFrame } from '@/components/mobile-frame'
import { introPages, type IntroPage } from '@/data/intro'

const NAME_TOKEN = '{{name}}'

export default function IntroPage() {
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [name, setName] = useState('')
    const [inputValue, setInputValue] = useState('')

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const handleAdvance = () => {
        if (currentIndex < introPages.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else {
            router.push('/quiz')
        }
    }

    const handleNameSubmit = () => {
        const trimmed = inputValue.trim()
        if (!trimmed) return
        setName(trimmed)
        handleAdvance()
    }

    const page: IntroPage = introPages[currentIndex]
    const resolvedText = page.text.includes(NAME_TOKEN)
        ? page.text.replace(NAME_TOKEN, name)
        : page.text
    const bg = Array.isArray(page.background) ? page.background[0] : page.background

    return (
        <MobileFrame>
            <div className="relative flex flex-col flex-1 min-h-dvh w-full">
                {/* Background sits first in the DOM, no z-index tricks needed */}
                <Image src={bg} alt="" fill className="object-cover" priority />

                {currentIndex > 0 && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleBack()
                        }}
                        className="absolute top-6 left-6 z-50 rounded-full bg-black/20 p-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-black/40 hover:text-white"
                        aria-label="Go back"
                    >
                        ← Back
                    </button>
                )}

                {page.navigation === 'text-input' ? (
                    <div className="relative z-10 flex flex-1 flex-col items-center justify-end gap-4 p-6 pb-16">
                        <p className="text-center text-lg font-medium text-black [text-shadow:0_1px_4px_rgba(255,255,255,0.6)]">
                            {resolvedText}
                        </p>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleNameSubmit()
                            }}
                            placeholder={page.placeholder}
                            className="w-full max-w-xs rounded-full bg-white/90 px-5 py-3 text-center text-base text-black outline-none placeholder:text-black/40"
                            autoFocus
                        />
                        <button
                            onClick={handleNameSubmit}
                            disabled={!inputValue.trim()}
                            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-opacity disabled:opacity-40"
                        >
                            {page.buttonLabel ?? 'ต่อไป'}
                        </button>
                    </div>
                ) : (
                    <div
                        className="relative z-10 flex flex-1 flex-col items-end justify-end p-6 pb-16 cursor-pointer"
                        onClick={handleAdvance}
                    >
                        <p className="text-center text-lg font-medium text-black [text-shadow:0_1px_4px_rgba(255,255,255,0.6)]">
                            {resolvedText}
                        </p>
                    </div>
                )}
            </div>
        </MobileFrame>
    )
}