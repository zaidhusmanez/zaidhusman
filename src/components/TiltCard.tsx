'use client'

import { useRef, useState } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const tiltX = y * 8
    const tiltY = -x * 8
    setTransform(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`)
  }

  const handleMouseLeave = () => setTransform('')

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: transform || undefined,
        transition: transform ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
      }}
    >
      {children}
    </div>
  )
}
