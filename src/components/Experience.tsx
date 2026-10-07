'use client'

import { AnimateOnScroll } from './AnimateOnScroll'
import { SectionHeader } from './SectionHeader'

const experiences = [
  {
    role: 'Co-Founder | Software Developer, Web Designer & Graphic Designer',
    company: 'Azytion - Digital Solutions Company',
    period: '2025 – Present',
    highlights: [
      'Contribute to the development of software and digital solutions for business and organizational requirements.',
      'Design and develop responsive websites and user-focused digital interfaces.',
      'Develop web-based business applications and explore solutions for ERP, POS, inventory, and business management requirements.',
      'Create brand identities, marketing materials, social media graphics, and other visual content.',
      'Apply AI-assisted development and automation tools to improve software development and creative workflows.',
      'Work across software development, web design, graphic design, and digital solution planning.',
      'Collaborate on project planning, requirements analysis, design, development, testing, and implementation.',
    ],
  },
  {
    role: 'Freelance Graphic & Web Designer',
    company: 'Self-Employed',
    period: '2023 – 2024',
    highlights: [
      'Designed websites, promotional graphics, social media content, logos, and marketing materials for clients.',
      'Created visual identities and branded materials based on client requirements.',
      'Developed and customized websites using WordPress, HTML, CSS, and modern web design practices.',
      'Designed user interfaces and layouts with a focus on usability, visual consistency, and responsive design.',
      'Used Adobe Photoshop, Adobe Illustrator, Canva, and Figma for professional design work.',
      'Communicated directly with clients to understand requirements and deliver design solutions.',
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
