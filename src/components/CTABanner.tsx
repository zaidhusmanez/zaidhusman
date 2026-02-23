'use client'

import { AnimateOnScroll } from './AnimateOnScroll'

export function CTABanner() {
  return (
    <section className="py-20 relative">
      <AnimateOnScroll effect="blur">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-900/80 to-amber-500/5 border border-amber-500/20 p-12 sm:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08)_0%,transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                Let&apos;s build something <span className="gradient-text">great together</span>
              </h2>
              <p className="text-slate-400/90 max-w-xl mx-auto mb-8">
                Have a project in mind? I&apos;d love to hear about it. Whether it&apos;s a website, software solution, or creative design — let&apos;s talk.
              </p>
              <a
                href="#contact"
                className="btn-shine inline-flex items-center gap-2 px-10 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-full transition-all duration-500 hover:shadow-glow tracking-premium"
              >
                Start a Project
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  )
}
