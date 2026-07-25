// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { ChapterCheckpoint } from '@/components/chapter-checkpoint'

// export function BurnoutFlow() {
//     const [completed, setCompleted] = useState(false)

//     if (completed) {
//         return <ChapterCheckpoint currentChapter="burnout" onRestart={() => setCompleted(false)} />
//     }

//     return (
//         <div className="animate-fade-in relative flex min-h-dvh flex-1 flex-col">
//             <div aria-hidden className="absolute inset-0" style={{ backgroundColor: '#142f3d' }} />
//             <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

//             <div className="relative z-10 flex min-h-dvh flex-1 flex-col justify-center gap-8 p-6 text-center">
//                 <div className="space-y-3">
//                     <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Chapter four</p>
//                     <h1 className="font-serif text-3xl leading-snug text-foreground">
//                         When everything feels heavy, your body may be asking for a gentler pace.
//                     </h1>
//                     <p className="text-balance text-lg leading-relaxed text-muted-foreground">
//                         Burnout is not weakness. It is a sign that care needs to be returned inward.
//                     </p>
//                 </div>

//                 <div className="rounded-2xl border border-border/70 bg-card/60 p-5 text-left shadow-sm">
//                     <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Practice</p>
//                     <p className="mt-3 text-balance text-base leading-relaxed text-foreground">
//                         Name one thing you can postpone, delegate, or let be enough for today.
//                     </p>
//                 </div>

//                 <Button
//                     size="lg"
//                     className="h-14 w-full rounded-2xl text-base"
//                     onClick={() => setCompleted(true)}
//                 >
//                     Finish this chapter
//                 </Button>
//             </div>
//         </div>
//     )
// }
