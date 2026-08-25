'use client'

import { useEffect, useRef } from 'react'

export function usePageAudio(sound: string) {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        if (!sound) {
            audioRef.current?.pause()
            audioRef.current = null
            return
        }

        const audio = new Audio(sound)
        audio.loop = true
        audioRef.current = audio

        const tryPlay = () => {
            void audio.play().catch(() => {
                // Browsers may block autoplay until the user interacts.
            })
        }

        tryPlay()

        const resumeOnInteraction = () => {
            if (audio.paused) tryPlay()
        }

        window.addEventListener('pointerdown', resumeOnInteraction, { once: true })
        window.addEventListener('keydown', resumeOnInteraction, { once: true })

        return () => {
            window.removeEventListener('pointerdown', resumeOnInteraction)
            window.removeEventListener('keydown', resumeOnInteraction)
            audio.pause()
            audio.currentTime = 0
            if (audioRef.current === audio) audioRef.current = null
        }
    }, [sound])
}