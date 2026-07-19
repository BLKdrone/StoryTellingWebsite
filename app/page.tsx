import Link from 'next/link'
import { MobileFrame } from '@/components/mobile-frame'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { pages } from '@/data/pages'

export default function HomePage() {
  const first = pages[0]

  return (
    <MobileFrame>
      <main className="animate-fade-in flex min-h-dvh flex-1 flex-col items-center justify-center gap-10 p-8 text-center">
        <div className="animate-float h-24 w-40 relative" aria-hidden>
          <div className="absolute inset-0 rounded-[50%] bg-primary/70" />
          <div className="absolute -right-5 top-1/2 h-8 w-12 -translate-y-1/2 rounded-[50%] bg-primary/70" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-balance font-serif text-4xl leading-tight text-foreground">
            A Quiet Journey
          </h1>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            A gentle, whale-guided moment to slow down, breathe, and check in
            with yourself.
          </p>
        </div>

        <Link
          href={`/${first.id}`}
          className={cn(
            buttonVariants({ size: 'lg' }),
            'h-14 w-full max-w-xs rounded-2xl text-base',
          )}
        >
          Begin
        </Link>
      </main>
    </MobileFrame>
  )
}
