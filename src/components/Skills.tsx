'use client'

import { AnimateOnScroll } from './AnimateOnScroll'
import { SectionHeader } from './SectionHeader'

const skillCategories = [
  {
    title: 'Programming & Web Development',
    skills: ['Python', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Node.js', 'HTML', 'CSS', 'REST API Integration', 'SDLC'],
    icon: '💻',
  },
  {
    title: 'Database & Backend',
    skills: ['MySQL', 'SQL Server', 'Database Design', 'CRUD Operations', 'Data Management'],
    icon: '🗄️',
  },
  {
    title: 'AI & Automation',
    skills: [
      'Prompt Engineering',
      'AI-Assisted Development',
      'AI Automation Workflows',
      'Business Process Automation',
      'AI Productivity Tools',
      'AI Image & Video Generation',
    ],
    icon: '🤖',
  },
  {
    title: 'Web & UI/UX Design',
    skills: ['WordPress', 'UI/UX Design', 'Figma', 'Responsive Web Design', 'SEO Optimization', 'Website Performance Optimization'],
    icon: '🎨',
  },
  {
    title: 'Graphic Design',
    skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Logo Design', 'Brand Identity Design', 'Marketing Materials', 'Social Media Design', 'Print Design'],
    icon: '✏️',
  },
  {
    title: 'Professional Skills',
    skills: ['Problem Solving', 'Creativity', 'Communication', 'Teamwork', 'Leadership', 'Presentation Skills', 'Organizational Skills', 'Project Coordination'],
    icon: '⭐',
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-slate-900/20">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll effect="scale">
          <SectionHeader number="02" title="Core" accent="Skills" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="p-10 glass-card card-glow rounded-2xl hover:border-slate-600/80 transition-all duration-500 group"
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl opacity-80 group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                  <h3 className="font-display text-xl font-semibold text-white tracking-tight">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3 stagger-children">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2.5 bg-slate-800/60 text-slate-300 rounded-xl text-sm border border-slate-700/40 hover:border-amber-500/20 hover:text-amber-400/90 hover:scale-105 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
