'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  effect?: 'slide' | 'scale' | 'fade' | 'blur'
}

export function AnimateOnScroll({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up',
  effect = 'slide'
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  const translateMap = {
    up: { from: 'translateY(32px)', to: 'translateY(0)' },
    down: { from: 'translateY(-32px)', to: 'translateY(0)' },
    left: { from: 'translateX(32px)', to: 'translateX(0)' },
    right: { from: 'translateX(-32px)', to: 'translateX(0)' },
  }

  const getInitialStyle = () => {
    switch (effect) {
      case 'scale':
        return {
          opacity: 0,
          transform: 'scale(0.96)',
        }
      case 'fade':
        return {
          opacity: 0,
          transform: 'none',
        }
      case 'blur':
        return {
          opacity: 0,
          transform: translateMap[direction].from,
          filter: 'blur(8px)',
        }
      default:
        return {
          opacity: 0,
          transform: translateMap[direction].from,
        }
    }
  }

  const getFinalStyle = () => {
    switch (effect) {
      case 'scale':
        return {
          opacity: 1,
          transform: 'scale(1)',
        }
      case 'fade':
        return {
          opacity: 1,
          transform: 'none',
        }
      case 'blur':
        return {
          opacity: 1,
          transform: translateMap[direction].to,
          filter: 'blur(0)',
        }
      default:
        return {
          opacity: 1,
          transform: translateMap[direction].to,
        }
    }
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const initial = getInitialStyle()
  const final = getFinalStyle()

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? 'has-entered' : ''}`}
      style={{
        opacity: isVisible ? final.opacity : initial.opacity,
        transform: isVisible ? final.transform : initial.transform,
        filter: effect === 'blur' ? (isVisible ? final.filter : initial.filter) : undefined,
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms${effect === 'blur' ? `, filter 0.7s ease ${delay}ms` : ''}`,
      }}
    >
      {children}
    </div>
  )
}
