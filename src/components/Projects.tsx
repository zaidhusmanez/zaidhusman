'use client'

import { AnimateOnScroll } from './AnimateOnScroll'
import { SectionHeader } from './SectionHeader'
import { TiltCard } from './TiltCard'

const projects = [
  {
    title: 'AI-Integrated Multi-Industry POS System',
    description:
      'Designed and developed an AI-enabled cloud POS system for retail and service businesses. Integrated smart automation for sales tracking, reporting, and workflow optimization.',
    tech: ['React', 'Next.js', 'AI Integration', 'Cloud', 'Analytics'],
  },
  {
    title: 'Gemstone POS & Inventory Management',
    description:
      'Developed a specialized AI-powered POS solution for gemstone and jewelry businesses. Intelligent inventory tracking, automated sales reporting, and streamlined operational workflows.',
    tech: ['Python', 'AI', 'Inventory', 'Billing'],
  },
  {
    title: 'Business Website Development',
    description:
      'Designed and developed responsive business websites with modern UI/UX and SEO-friendly structures for various clients.',
    tech: ['WordPress', 'HTML', 'CSS', 'JavaScript', 'SEO'],
  },
  {
    title: 'Graphic Design Portfolio',
    description:
      'Created branding, social media designs, and promotional materials. Delivered visual assets aligned with client brand identity.',
    tech: ['Photoshop', 'Illustrator', 'Canva', 'Branding'],
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll effect="blur">
          <SectionHeader number="04" title="Featured" accent="Projects" />
        </AnimateOnScroll>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <AnimateOnScroll key={index} delay={index * 80}>
              <TiltCard className="h-full">
              <div className="group relative p-10 glass-card card-glow rounded-2xl hover:border-amber-500/20 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.12)] transition-all duration-500 overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors duration-500" />
                <span className="text-amber-500/40 text-xs font-bold tracking-premium-wider mb-4 block">
                  0{index + 1}
                </span>
                <h3 className="font-display text-xl font-semibold text-white mb-4 group-hover:text-amber-400/90 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400/90 mb-8 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 stagger-children">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3.5 py-1.5 bg-slate-800/80 text-slate-400 text-xs rounded-lg border border-slate-700/50 hover:border-amber-500/30 hover:text-amber-400/90 transition-all duration-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              </TiltCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
