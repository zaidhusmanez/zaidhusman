import type { Metadata } from 'next'
import { Outfit, Syne } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { SocialSidebar } from '@/components/SocialSidebar'
import { EmailSidebar } from '@/components/EmailSidebar'

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
        <Navbar />
        <SocialSidebar />
        <EmailSidebar />
        {children}
      </body>
    </html>
  )
}
