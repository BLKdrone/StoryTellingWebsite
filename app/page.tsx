import Link from 'next/link'
import { MobileFrame } from '@/components/mobile-frame'
import { BackgroundSlideshow } from '@/components/animations/background-slideshow'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LoginButton } from '@/components/login-button'
import { SwappingLogo } from '@/components/swapping-logo'

// import { pages } from '@/data/pages'

const heroImages = [
  '/background/intro/background1.webp',
  '/background/intro/background2.webp',
  '/background/intro/background3.webp',
]

export default function HomePage() {
  return (
    <MobileFrame>
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
        <SwappingLogo />
      </div>
      <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
        <BackgroundSlideshow images={heroImages} />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none bg-gradient-to-b via-transparent"
        />

        <main className="relative z-10 flex min-h-dvh flex-1 flex-col items-center justify-center gap-10 p-8 text-center">
          <div className="flex w-full max-w-xs flex-col mt-32 gap-3">
            <Link
              href="/quiz"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-14 w-full rounded-2xl text-base font-medium tracking-wide shadow-md transition-transform active:scale-[0.98]',
              )}
            >
              เริ่มต้น
            </Link>
          </div>

          <p className="rounded-2xl border border-white/40 bg-black/20 px-4 py-3 text-pretty font-body text-sm leading-relaxed text-muted-foreground backdrop-blur-sm">
            คำชี้แจง: นี่เป็นแบบทดสอบเพื่อพาคุณสำรวจความรู้สึกในช่วงนี้
            ไม่ใช่แบบทดสอบเพื่อการวินิจฉัยโรค หากทำแบบทดสอบแล้วเกิด
            ความรู้สึกไม่สบายใจ สามารถหยุดทำได้ทันที และหากต้องการความ
            ช่วยเหลือทันที ติดต่อ 1323 สายด่วนสุขภาพจิตได้ตลอด 24 ชม.
          </p>
          <LoginButton />
        </main>
      </div>
    </MobileFrame>
  )
}