'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { SocialSidebar } from '@/components/SocialSidebar'
import { EmailSidebar } from '@/components/EmailSidebar'
import { CustomCursor } from '@/components/CustomCursor'
import { useEffect } from 'react'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  useEffect(() => {
    if (!isAdmin) {
      document.body.classList.add('custom-cursor-active')
    } else {
      document.body.classList.remove('custom-cursor-active')
    }
    
    return () => {
      document.body.classList.remove('custom-cursor-active')
    }
  }, [isAdmin])

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <SocialSidebar />
      <EmailSidebar />
      {children}
    </>
  )
}
