'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { StoryPage } from '@/components/story-page'

export function StoryStep({ 
  index, 
  pages,
  chapter 
}: { 
  index: number
  pages: StoryPageData[]
  chapter: string
}) {
  const router = useRouter()
  const page = pages[index]
  const isLast = index === pages.length - 1

  const onAdvance = useCallback(
    (_answer?: string) => {
      if (isLast) {
        router.push('/') // or next chapter
        return
      }
      const next = pages[index + 1]
      router.push(`/${chapter}/${next.id}`)
    },
    [index, isLast, router, chapter, pages],
  )

  if (!page) return null

  return <StoryPage page={page} onAdvance={onAdvance} isLast={isLast} />
}