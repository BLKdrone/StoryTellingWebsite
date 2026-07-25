// import { notFound } from 'next/navigation'
// import { MobileFrame } from '@/components/mobile-frame'
// import { StoryStep } from '@/components/story-step'
// import { pages, getPageIndexById } from '@/data/pages'

// export function generateStaticParams() {
//   return pages.map((p) => ({ step: p.id }))
// }
// // 
// export default async function StoryRoute({
//   params,
// }: {
//   params: Promise<{ step: string }>
// }) {
//   const { step } = await params
//   const index = getPageIndexById(step)

//   if (index === -1) notFound()

//   return (
//     <MobileFrame>
//       <StoryStep index={index} />
//     </MobileFrame>
//   )
// }
