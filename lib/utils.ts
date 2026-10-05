import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function wrapTextAtLength(text: string, maxLength = 40) {
  if (maxLength < 1) return text

  return text
    .split('\n')
    .map((line) => {
      const graphemes = line.match(/\P{M}\p{M}*/gu) ?? []
      const wrappedLines: string[] = []

      for (let index = 0; index < graphemes.length; index += maxLength) {
        wrappedLines.push(graphemes.slice(index, index + maxLength).join(''))
      }

      return wrappedLines.join('\n')
    })
    .join('\n')
}
