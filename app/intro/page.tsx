// 'use client'

// import { Suspense } from 'react'
// import { useSearchParams } from 'next/navigation'
// import { MobileFrame } from '@/components/mobile-frame'
// import { MoodFlow } from '@/components/mood-checkin/mood-flow'
// import { QuizFlow } from '@/components/quiz/quiz-flow'
// import { SelfWorthFlow } from '@/components/self-worth/self-worth-flow'
// import { BurnoutFlow } from '@/components/burnout/burnout-flow'
// import { Button } from '@/components/ui/button'
// import { cn } from '@/lib/utils'

// type TabKey = 'quiz' | 'mood-checkin' | 'self-worth' | 'burnout'

// const tabs: Array<{ id: TabKey; label: string }> = [
//   { id: 'quiz', label: 'Quiz' },
//   { id: 'mood-checkin', label: 'Mood Check-in' },
//   { id: 'self-worth', label: 'Self-worth' },
//   { id: 'burnout', label: 'Burnout' },
// ]

// function TabContent({ tab }: { tab: TabKey }) {
//   switch (tab) {
//     case 'quiz':
//       return <QuizFlow />
//     case 'mood-checkin':
//       return <MoodFlow />
//     case 'self-worth':
//       return <SelfWorthFlow />
//     case 'burnout':
//       return <BurnoutFlow />
//     default:
//       return <QuizFlow />
//   }
// }

// function TabsClient() {
//   const searchParams = useSearchParams()
//   const currentTab = (searchParams.get('tab') || 'quiz') as TabKey

//   const createTabUrl = (tab: TabKey) => {
//     const params = new URLSearchParams(searchParams)
//     params.set('tab', tab)
//     return `?${params.toString()}`
//   }

//   return (
//     <MobileFrame>
//       <div className="relative flex min-h-dvh w-full flex-col">
//         {/* Tab Navigation */}
//         <div className="sticky top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur-sm">
//           <div className="flex overflow-x-auto">
//             {tabs.map((tab) => (
//               <a
//                 key={tab.id}
//                 href={createTabUrl(tab.id)}
//                 className={cn(
//                   'flex-1 border-b-2 px-4 py-3 text-sm font-medium transition-colors min-w-max',
//                   currentTab === tab.id
//                     ? 'border-white text-white'
//                     : 'border-transparent text-white/60 hover:text-white/80',
//                 )}
//               >
//                 {tab.label}
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* Tab Content */}
//         <div className="flex-1">
//           <TabContent tab={currentTab} />
//         </div>
//       </div>
//     </MobileFrame>
//   )
// }

// export default function ChaptersPage() {
//   return (
//     <Suspense fallback={<MobileFrame><div>Loading...</div></MobileFrame>}>
//       <TabsClient />
//     </Suspense>
//   )
// }
