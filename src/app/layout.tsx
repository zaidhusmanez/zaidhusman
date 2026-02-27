import type { Metadata } from 'next'
import { Outfit, Syne } from 'next/font/google'
import './globals.css'
import { LayoutWrapper } from '@/components/LayoutWrapper'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ZAIDH USMAN | Software Developer & Designer',
  description:
    'Software Developer, Web & Graphic Designer. Building AI-integrated solutions, POS systems, and impactful digital experiences. Founder of ZATION.',
  keywords: [
    'Software Developer',
    'Web Developer',
    'Graphic Designer',
    'React',
    'Next.js',
    'AI Integration',
    'POS System',
    'Kandy Sri Lanka',
  ],
  openGraph: {
    title: 'ZAIDH USMAN | Software Developer & Designer',
    description: 'Building scalable systems and impactful digital experiences.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable}`}>
      <body className="font-sans">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}
