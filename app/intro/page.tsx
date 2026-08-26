'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { MobileFrame } from '@/components/mobile-frame'
import { introPages, type IntroPage } from '@/data/intro'
import { BackgroundSlideshow } from '@/components/animations/background-slideshow'
import { usePageAudio } from '@/components/page-audio'
import { SlideNext } from '@/components/flash-transition'
import { cn } from '@/lib/utils'

const NAME_TOKEN = '{{name}}'

// Matches the quiz page's chip style: white rounded background behind the text
const textChip = 'inline-block rounded-[5px] bg-white px-3 py-1 text-black'

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
    usePageAudio(page.sound)
    const resolvedText = page.text.includes(NAME_TOKEN)
        ? page.text.replace(NAME_TOKEN, name)
        : page.text

    return (
        <MobileFrame>
            <div className="relative flex flex-col flex-1 min-h-dvh w-full">
                <BackgroundSlideshow
                    images={page.background}
                    intervalMs={500}
                    key={page.id}
                />

                {currentIndex > 0 && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleBack()
                        }}
                        className="absolute top-6 left-6 z-50 rounded-full bg-black/20 p-2 text-sm text-white/80 backdrop-blur-md transition-colors hover:bg-black/40 hover:text-white"
                        aria-label="Go back"
                    >
                        ← Back
                    </button>
                )}

                {page.navigation === 'text-input' ? (
                    <div className="relative z-10 flex flex-1 flex-col items-center justify-end gap-4 p-6 pb-16">
                        <p className="text-center text-lg leading-relaxed">
                            <span className={cn(textChip, 'leading-relaxed')}>{resolvedText}</span>
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
                        className="relative z-10 flex flex-1 flex-col items-center justify-end p-6 pb-16 cursor-pointer"
                        onClick={handleAdvance}
                    >
                        <p className="text-center text-lg leading-relaxed">
                            <span className={cn(textChip, 'leading-relaxed')}>{resolvedText}</span>
                        </p>
                    </div>
                )}

                <SlideNext
                    pageKey={page.id}
                    color={page.transition === 'dive' ? 'black' : page.transition ? 'white' : undefined}
                />
            </div>
        </MobileFrame>
    )
}