'use client'

import { useEffect, useRef, useState } from 'react'

interface SectionHeaderProps {
  number: string
  title: string
  accent?: string
}

export function SectionHeader({ number, title, accent }: SectionHeaderProps) {
  const lineRef = useRef<HTMLDivElement>(null)
  const [lineVisible, setLineVisible] = useState(false)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setLineVisible((v) => v || true) },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="mb-12" ref={lineRef}>
      <p className="text-amber-500/70 text-xs font-semibold tracking-premium-wider mb-4 uppercase">
        {number}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
        {title}
        {accent ? <>{' '}<span className="gradient-text">{accent}</span></> : null}
      </h2>
      <div className="mt-5 w-20 overflow-hidden">
        <div 
          className="h-px w-full bg-gradient-to-r from-amber-500/80 via-amber-400/40 to-transparent origin-left"
          style={{ 
            transform: lineVisible ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>
    </div>
  )
}
