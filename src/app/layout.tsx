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
  metadataBase: new URL('https://zaidhusman.com'), // Replace with your actual domain
  title: {
    default: 'ZAIDH USMAN | Software Developer & Designer',
    template: '%s | ZAIDH USMAN',
  },
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
    'Zaid Osman',
    'Zation Solutions',
  ],
  authors: [{ name: 'ZAIDH USMAN' }],
  creator: 'ZAIDH USMAN',
  publisher: 'ZAIDH USMAN',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'ZAIDH USMAN | Software Developer & Designer',
    description: 'Building scalable systems and impactful digital experiences.',
    url: 'https://zaidhusman.com',
    siteName: 'ZAIDH USMAN Portfolio',
    images: [
      {
        url: '/og-image.jpg', // You should add a high-quality OG image to your public folder
        width: 1200,
        height: 630,
        alt: 'ZAIDH USMAN Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZAIDH USMAN | Software Developer & Designer',
    description: 'Building scalable systems and impactful digital experiences.',
    creator: '@zaidhusman', // Replace with your Twitter handle
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
