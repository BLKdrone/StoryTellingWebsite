import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Bai_Jamjuree } from 'next/font/google'
import AuthProvider from '@/components/auth-provider'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
})

const baiJamjuree = Bai_Jamjuree({
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bai-jamjuree',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'A Quiet Journey · Mentalhealthwebsite',
  description:
    'A gentle, whale-guided storytelling experience to help you slow down, breathe, and reflect.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${baiJamjuree.variable}`}
      style={{ backgroundColor: '#1a1a1a' }}
    >
      <body className="antialiased font-sans" style={{ backgroundColor: '#1a1a1a' }}>
        <AuthProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </AuthProvider>
      </body>
    </html>
  )
}