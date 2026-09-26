'use client'

import { useEffect } from 'react'

const globalAudioState: {
    audio: HTMLAudioElement | null
    currentSound: string | null
} = {
    audio: null,
    currentSound: null,
}

export function usePageAudio(sound: string) {
    useEffect(() => {
        if (!sound) {
            if (globalAudioState.audio) {
                globalAudioState.audio.pause()
                globalAudioState.audio = null
                globalAudioState.currentSound = null
            }
            return
        }

        if (globalAudioState.currentSound !== sound) {
            if (globalAudioState.audio) {
                globalAudioState.audio.pause()
            }
            const audio = new Audio(sound)
            audio.loop = true
            globalAudioState.audio = audio
            globalAudioState.currentSound = sound
        }

        const audio = globalAudioState.audio!

        const tryPlay = () => {
            if (audio.paused) {
                void audio.play().catch(() => {
                    // Browsers may block autoplay until the user interacts.
                })
            }
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
            // We intentionally do not pause the audio here so it continues playing
            // seamlessly when navigating between pages with the same sound.
        }
    }, [sound])
}