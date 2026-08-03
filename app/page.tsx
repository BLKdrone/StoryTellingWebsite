import Link from 'next/link'
import { MobileFrame } from '@/components/mobile-frame'
import { BackgroundSlideshow } from '@/components/animations/background-slideshow'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LoginButton } from '@/components/login-button'

// import { pages } from '@/data/pages'

const heroImages = [
  '/background/intro/background1.webp',
  '/background/intro/background2.webp',
  '/background/intro/background3.webp',
]

export default function HomePage() {
  // const first = pages[0]

  return (
    <MobileFrame>
      <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
        <BackgroundSlideshow images={heroImages} />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b via-transparent "
        />

        <main className="relative z-10 flex min-h-dvh flex-1 flex-col items-center justify-center gap-10 p-8 text-center">
          <div className="flex flex-col gap-3">
            {/* font-storybook = your hand-lettered display face (e.g. Fraunces italic or Caveat), set in tailwind config */}
            <h1 className="text-balance font-storybook text-4xl leading-tight text-foreground drop-shadow-sm">
              Where our (heavy) hearts float
            </h1>
          </div>

          <div className="flex w-full max-w-xs flex-col mt-32 gap-3">
            <Link
              href="/intro"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-14 w-full rounded-2xl text-base font-medium tracking-wide shadow-md transition-transform active:scale-[0.98]',
              )}
            >
              เริ่มต้น
            </Link>
          </div>
          {/* <Link
              href="/mood-checkin"
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'lg' }),
                'h-14 w-full rounded-2xl text-base',
              )}
            >
              แบ่งอารมณ์
            </Link>
            <Link
              href="/quiz"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'lg' }),
                'h-12 w-full rounded-2xl text-base',
              )}
            >
              คำถามสัตว์
            </Link>
            <Link
              href="/animations"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'lg' }),
                'h-12 w-full rounded-2xl text-base',
              )}
            >
              ทำค้าง
            </Link> */}
          <p className="rounded-2xl border border-white/40 bg-black/20 px-4 py-3 text-pretty font-body text-sm leading-relaxed text-muted-foreground backdrop-blur-sm">
            คำชี้แจง: นี่เป็นแบบทดสอบเพื่อพาคุณสำรวจความรู้สึกในช่วงนี้
            ไม่ใช่แบบทดสอบเพื่อการวินิจฉัยโรค หากทำแบบทดสอบแล้วเกิด
            ความรู้สึกไม่สบายใจ สามารถหยุดทำได้ทันที และหากต้องการความ
            ช่วยเหลือทันที ติดต่อ 1323 สายด่วนสุขภาพจิตได้ตลอด 24 ชม.
          </p>
          <LoginButton />
        </main>
      </div >
    </MobileFrame >
  )
}