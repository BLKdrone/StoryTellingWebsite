import Link from 'next/link'
import { MobileFrame } from '@/components/mobile-frame'
import { BackgroundSlideshow } from '@/components/animations/background-slideshow'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
// import { pages } from '@/data/pages'

const heroImages = [
  '/background/intro/background1.PNG',
  '/background/intro/background2.PNG',
  '/background/intro/background3.PNG',
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
          {/* <div className="animate-float h-24 w-40 relative" aria-hidden>
            <div className="absolute inset-0 rounded-[50%] bg-primary/70" />
            <div className="absolute -right-5 top-1/2 h-8 w-12 -translate-y-1/2 rounded-[50%] bg-primary/70" />
          </div> */}

          <div className="flex flex-col gap-3">
            <h1 className="text-balance font-serif text-4xl leading-tight text-foreground">
              Where our (heavy) hearts float
              (ลายมือ หัวฟีลสีน้ำ/เทียน)
            </h1>
            {/* <p className="text-pretty leading-relaxed text-muted-foreground">
             หห
            </p> */}
          </div>

          <div className="flex w-full max-w-xs flex-col mt-32 gap-3">
            <Link
              href="/intro"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-14 w-full rounded-2xl text-base',
              )}
            >
              เริ่มต้น
            </Link>
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
          </div>
          <p className="border-2 border-white text-pretty leading-relaxed text-muted-foreground pl-4">
            banner ขึ้น ประมาณ 15 วินาที ค่อยๆ งาง
            คำชี้แจง: นี่เป็นแบบทดสอบเพื่อพาคุณสำรวจความรู้สึกในช่วงนี้
            ไม่ใช่แบบทดสอบเพอการวินิจฉัยโรค หากทำแบบทดสอบแล้วเกิด
            ความรู้สึกไม่สบายใจ สามารถหยุดทำได้ทันที และหากต้องการความ
            ช่วยเหลือทันที ติดต่อ 1323 สายด่วนสุขภาพจิตได้ตลอด 24 ชม.
          </p>
        </main>
      </div>
    </MobileFrame>
  )
}