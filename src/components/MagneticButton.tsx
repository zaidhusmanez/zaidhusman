'use client'

import { useRef, useState } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  strength?: number
}

export function MagneticButton({ children, className = '', href, strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    setPosition({ x, y })
  }

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 })

  const Component = href ? 'a' : 'button'
  const props = href ? { href } : {}

  return (
    <Component
      ref={ref as React.RefObject<HTMLAnchorElement & HTMLButtonElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className}`.trim()}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.1s ease-out',
      }}
      {...props}
    >
      {children}
    </Component>
  )
}
