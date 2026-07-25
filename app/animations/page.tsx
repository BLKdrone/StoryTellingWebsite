'use client'

import { useState } from 'react'
import { MobileFrame } from '@/components/mobile-frame'
import { FoldAnimation } from '@/components/animations/fold-animation'
import { ResizeAnimation } from '@/components/animations/resize-animation'
import { ZoomAnimation } from '@/components/animations/zoom-animation'
import { Button } from '@/components/ui/button'

export default function AnimationsDemoPage() {
  // Bump this key to replay the zoom-on-enter animation.
  const [zoomKey, setZoomKey] = useState(0)

  return (
    <MobileFrame>
      <main className="flex min-h-dvh flex-col gap-10 px-6 py-10">
        <header className="flex flex-col gap-1">
          <h1 className="font-serif text-2xl text-foreground">Animation studio</h1>
          <p className="text-sm text-muted-foreground">
            Reusable Framer Motion pieces — shapes only, no images.
          </p>
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-foreground">Fold in half (tap)</h2>
          <p className="text-xs text-muted-foreground">
            fold it 3 times, 
          </p>
          <div className="flex justify-center py-4">
            <FoldAnimation folds={3}>
              <span className="px-4 text-center text-sm text-foreground/80">
                A quiet note
              </span>
            </FoldAnimation>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-foreground">Resize (press &amp; hold)</h2>
          <p className="text-xs text-muted-foreground">
            กดค้างเพื่อให้น้อลโต
          </p>
          <div className="flex justify-center py-4">
            <ResizeAnimation>
              <span className="text-sm text-foreground/80">Hold me</span>
            </ResizeAnimation>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-foreground">Zoom (on enter)</h2>
          <p className="text-xs text-muted-foreground">
            Zooms เข้า 30% 40% 
          </p>
          <div className="flex flex-col items-center gap-4 py-4">
            <ZoomAnimation key={zoomKey} focalPoint="30% 40%">
              <div className="flex h-40 w-64 items-center justify-center overflow-hidden rounded-xl border border-primary/40 bg-secondary">
                <span className="text-sm text-secondary-foreground">Focal 30% 40%</span>
              </div>
            </ZoomAnimation>
            <Button variant="secondary" onClick={() => setZoomKey((k) => k + 1)}>
              Replay zoom
            </Button>
          </div>
        </section>
      </main>
    </MobileFrame>
  )
}
