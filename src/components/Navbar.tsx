'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-20% 0px -70% 0px' }
    )
    navLinks.forEach(({ href }) => {
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-xl text-white hover:text-amber-400 transition-colors duration-300 tracking-tight">
          ZAIDH USMAN
        </a>

        <button
          className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors duration-300 hover:scale-110"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <ul
          className={`absolute lg:static top-full left-0 right-0 lg:flex gap-8 bg-slate-950 lg:bg-transparent border-b lg:border-0 border-slate-800 lg:py-0 py-4 px-6 transition-all duration-300 ${
            isMobileMenuOpen ? 'block animate-nav-slide' : 'hidden'
          }`}
        >
          {navLinks.map((link) => {
            const id = link.href.slice(1)
            const isActive = activeSection === id
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link-underline transition-all duration-300 py-2 block hover:translate-x-1 ${
                    isActive ? 'text-amber-400 font-medium nav-link-active' : 'text-slate-400 hover:text-amber-400'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <a
          href="#contact"
          className="hidden lg:inline-flex btn-shine px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-full transition-all duration-500 hover:shadow-glow hover:shadow-amber-500/25 tracking-premium hover:scale-105"
        >
          Get in Touch
        </a>
      </nav>
    </header>
  )
}
