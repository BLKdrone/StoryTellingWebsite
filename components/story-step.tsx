'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { pages } from '@/data/pages'
import { StoryPage } from '@/components/story-page'

export function StoryStep({ index }: { index: number }) {
  const router = useRouter()
  const page = pages[index]
  const isLast = index === pages.length - 1

  const onAdvance = useCallback(
    (_answer?: string) => {
      if (isLast) {
        router.push('/')
        return
      }
      const next = pages[index + 1]
      router.push(`/${next.id}`)
    },
    [index, isLast, router],
  )

  if (!page) return null

  return <StoryPage page={page} onAdvance={onAdvance} isLast={isLast} />
}
