import type { ReactNode } from 'react'

/**
 * MobileFrame
 * - On screens >= 768px: content is constrained to max-width 480px and centered,
 *   with a dark (#1a1a1a) background filling the sides.
 * - On screens < 768px: content fills the full width with no frame.
 */
export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex min-h-dvh w-full justify-center"
      style={{ backgroundColor: '#1a1a1a' }}
    >
      <div className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-background md:max-w-[480px] md:shadow-2xl md:shadow-black/50">
        {children}
      </div>
    </div>
  )
}
