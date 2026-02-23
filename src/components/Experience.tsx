'use client'

import { AnimateOnScroll } from './AnimateOnScroll'
import { SectionHeader } from './SectionHeader'

const experiences = [
  {
    role: 'Founder & Software Developer',
    company: 'ZATION - Software Development & Digital Solutions',
    period: '2024 - Present',
    highlights: [
      'Founded and manage a digital solutions business providing software, web, and design services',
      'Design and develop web applications and business software tailored to client needs',
      'Integrated AI tools into software and digital solutions to improve productivity',
      'Built AI-assisted business solutions to reduce manual processes for clients',
      'Develop POS and inventory systems for small and medium businesses',
      'Create responsive business websites and brand assets',
      'Manage project planning, client communication, and delivery of digital solutions',
    ],
  },
  {
    role: 'Freelance Graphic & Web Designer',
    company: 'Self-Employed',
    period: '2023 - Present',
    highlights: [
      'Designed websites, logos, and marketing materials for various clients',
      'Built responsive websites using WordPress, HTML, CSS, and JavaScript',
      'Created social media graphics and brand identity packages',
      'Collaborated with clients to understand business goals and deliver tailored solutions',
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-slate-900/20">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll effect="scale">
          <SectionHeader number="03" title="Professional" accent="Experience" />
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative pl-10 border-l-2 border-slate-700/80 hover:border-amber-500/30 transition-colors duration-500 group"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-500 group-hover:scale-125 group-hover:shadow-glow group-hover:animate-ping-once transition-all duration-300" />
                <div className="mb-6">
                  <h3 className="font-display text-xl font-semibold text-white tracking-tight">
                    {exp.role}
                  </h3>
                  <p className="text-amber-400/90 font-medium mt-1">{exp.company}</p>
                  <p className="text-slate-500/80 text-sm mt-1 tracking-premium">{exp.period}</p>
                </div>
                <ul className="space-y-3 list-none">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-slate-400/90 flex gap-3 before:content-['▹'] before:text-amber-500/80 before:font-bold before:shrink-0 leading-relaxed"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
