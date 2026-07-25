'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MobileFrame } from '@/components/mobile-frame'
import { StoryPage } from '@/components/story-page'
import { introPages } from '@/data/intro'

export default function IntroPage() {
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const handleAdvance = () => {
        if (currentIndex < introPages.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else {
            // Intro complete — go to quiz
            router.push('/quiz')
        }
    }

    const page = introPages[currentIndex]

    return (
        <MobileFrame>
            <div className="relative flex flex-col flex-1 min-h-dvh w-full">
                {currentIndex > 0 && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleBack()
                        }}
                        className="absolute top-6 left-6 z-50 rounded-full bg-black/20 p-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-black/40 hover:text-white"
                        aria-label="Go back"
                    >
                        ← Back
                    </button>
                )}
                <StoryPage page={page} onAdvance={handleAdvance} />
            </div>
        </MobileFrame>
    )
}

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
