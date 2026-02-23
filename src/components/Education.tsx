'use client'

import { AnimateOnScroll } from './AnimateOnScroll'
import { SectionHeader } from './SectionHeader'

const education = [
  {
    degree: 'Diploma & Advanced Diploma in Computer Science',
    institution: 'Australian College of Business and Technology',
    period: 'Ongoing · Expected 2026',
  },
  {
    degree: 'International University Foundation in Computing',
    institution: 'Australian College of Business and Technology',
    period: '2024',
  },
  {
    degree: 'GCE Ordinary Level',
    institution: 'Siddi Lebbe College',
    period: '2022',
  },
]

export function Education() {
  return (
    <section id="education" className="py-20 bg-slate-900/20">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll effect="scale">
          <SectionHeader number="05" title="Education" />
          <div className="space-y-4 stagger-children">
            {education.map((item, index) => (
              <div
                key={index}
                className="p-8 glass-card rounded-2xl hover:border-slate-600/80 hover:-translate-y-0.5 transition-all duration-500 group"
              >
                <h3 className="font-display text-lg font-semibold text-white tracking-tight">
                  {item.degree}
                </h3>
                <p className="text-amber-400/90 font-medium mt-2">{item.institution}</p>
                <p className="text-slate-500/80 text-sm mt-1 tracking-premium">{item.period}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
