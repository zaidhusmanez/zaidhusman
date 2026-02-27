'use client'

import { useState, useEffect } from 'react'

export function MouseGlow() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setOpacity(1)
    }

    const handleMouseLeave = () => {
      setOpacity(0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      className="mouse-glow"
      style={{
        left: `${mousePos.x}px`,
        top: `${mousePos.y}px`,
        opacity: opacity,
      }}
    />
  )
}
