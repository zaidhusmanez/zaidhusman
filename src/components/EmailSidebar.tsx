'use client'

export function EmailSidebar() {
  return (
    <aside
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center"
      aria-label="Email"
    >
      <a
        href="mailto:zaidhusman2005@gmail.com"
        className="text-slate-500/80 hover:text-amber-400 transition-all duration-300 text-sm tracking-premium py-4"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        zaidhusman2005@gmail.com
      </a>
      <div className="w-px h-20 bg-slate-700 mt-6" />
    </aside>
  )
}
