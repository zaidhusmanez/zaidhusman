'use client'

import { useEffect, useState } from 'react'
import { MagneticButton } from './MagneticButton'
import { HeroBottom } from './HeroBottom'

export function Hero() {
  const [mounted, setMounted] = useState(true)
  const [typedText, setTypedText] = useState('')
  const [scrollY, setScrollY] = useState(0)
  const fullText = 'Software Developer · Web & Graphic Designer · Tech Enthusiast'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mounted) return
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [mounted])

  const parallax1 = scrollY * 0.05
  const parallax2 = scrollY * -0.03

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-x-hidden pt-20 pb-28"
    >
      {/* Premium gradient mesh background - parallax */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.04] via-transparent to-transparent" />
      <div 
        className="absolute top-0 left-1/2 w-[800px] h-[600px] bg-amber-500/[0.05] rounded-full blur-[180px] pointer-events-none transition-transform duration-100"
        style={{ transform: `translate(-50%, ${parallax1}px)` }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-400/[0.03] rounded-full blur-[150px] pointer-events-none transition-transform duration-100"
        style={{ transform: `translateY(${parallax2}px)` }}
      />
      
      {/* Floating dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-amber-500/20"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${15 + (i * 11) % 70}%`,
              animation: `floatDot ${4 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Animated grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          animation: 'gridMove 25s linear infinite',
        }}
      />

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Availability badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 mb-10"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
            transition: 'opacity 0.6s ease-out 0.1s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="text-amber-400/90 text-sm font-medium tracking-premium">Available for projects</span>
        </div>

        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-10 leading-[1.1] tracking-tight"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          Hi, I&apos;m <br className="sm:hidden" />
          <span className="gradient-text animate-gradient tracking-tight">ZAIDH USMAN</span>
        </h1>

        <p
          className="text-amber-400/90 font-medium mb-12 min-h-[2rem] text-lg tracking-premium"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s',
          }}
        >
          {typedText}
          {typedText.length < fullText.length && <span className="animate-pulse">|</span>}
        </p>

        <p
          className="text-xl text-slate-400/90 max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease-out 0.5s, transform 0.7s ease-out 0.5s',
          }}
        >
          Building AI-integrated software, scalable web applications, and impactful digital
          experiences. Founder of <span className="text-amber-400 font-semibold">ZATION</span> — delivering
          intelligent POS systems, websites, and branding solutions.
        </p>

        <div
          className="flex flex-wrap gap-5 justify-center"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease-out 0.7s, transform 0.7s ease-out 0.7s',
          }}
        >
          <MagneticButton href="#projects" strength={0.25} className="inline-block">
            <span className="group btn-shine flex items-center px-10 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-full transition-all duration-500 hover:shadow-glow tracking-premium relative overflow-hidden">
              View My Work
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </MagneticButton>
          <MagneticButton href="#contact" strength={0.2} className="inline-block">
            <span className="btn-shine block px-10 py-4 rounded-full border border-slate-600/80 hover:border-amber-500/40 text-slate-300 hover:text-white font-medium transition-all duration-500 hover:bg-slate-800/60 tracking-premium relative overflow-hidden">
              Contact Me
            </span>
          </MagneticButton>
          {process.env.NEXT_PUBLIC_CV_URL && (
            <a
              href={process.env.NEXT_PUBLIC_CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 px-10 py-4 rounded-full border border-slate-600/80 hover:border-amber-500/40 text-slate-300 hover:text-white font-medium transition-all duration-500 hover:bg-slate-800/60 tracking-premium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </a>
          )}
        </div>
      </div>

      {/* Bottom transition & scroll cue */}
      <HeroBottom />
    </section>
  )
}
