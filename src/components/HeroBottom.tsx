'use client'

export function HeroBottom() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
      {/* Smooth gradient fade into next section */}
      <div 
        className="h-32 w-full"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.5) 60%, rgb(15, 23, 42) 100%)',
        }}
      />
      {/* Subtle scroll indicator with pulse */}
      <a 
        href="#about" 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full border border-slate-600/40 flex items-center justify-center text-slate-500/50 hover:text-amber-500/80 hover:border-amber-500/30 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 pointer-events-auto animate-subtle-pulse"
        aria-label="Scroll to content"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </div>
  )
}
