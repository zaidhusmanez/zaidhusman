'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { SocialSidebar } from '@/components/SocialSidebar'
import { EmailSidebar } from '@/components/EmailSidebar'
import { MouseGlow } from '@/components/MouseGlow'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <MouseGlow />
      <Navbar />
      <SocialSidebar />
      <EmailSidebar />
      {children}
    </>
  )
}
