'use client'

import { AnimateOnScroll } from './AnimateOnScroll'
import { SectionHeader } from './SectionHeader'
import { Search, PenTool, Code, Rocket, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    title: 'Discovery & Strategy',
    description: 'We start by understanding your goals, target audience, and project requirements to create a solid roadmap.',
    icon: Search,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Design & Prototyping',
    description: 'Creating high-fidelity designs and interactive prototypes to visualize the user experience and interface.',
    icon: PenTool,
    color: 'text-pink-500',
    bg: 'bg-pink-500/10'
  },
  {
    title: 'Development & AI Integration',
    description: 'Building scalable software and websites using modern frameworks with a focus on performance and AI-powered automation.',
    icon: Code,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  },
  {
    title: 'Testing & QA',
    description: 'Rigorous testing across devices and browsers to ensure everything is bug-free and optimized for the best performance.',
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    title: 'Launch & Support',
    description: 'Deploying your project to production and providing ongoing support and optimization to ensure continued success.',
    icon: Rocket,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  }
]

export function Process() {
  return (
    <section id="process" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll effect="blur">
          <SectionHeader number="08" title="My" accent="Process" />
          <p className="text-slate-400 max-w-2xl mb-16 leading-relaxed text-lg">
            A structured approach to bringing your digital vision to life, from initial concept to final delivery.
          </p>
        </AnimateOnScroll>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-slate-800 to-transparent hidden md:block" />

          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <AnimateOnScroll key={step.title} delay={index * 100} effect="slide">
                <div className="group relative flex flex-col md:flex-row gap-8 items-start">
                  {/* Step number and icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-18 h-18 rounded-2xl ${step.bg} flex items-center justify-center border border-white/5 group-hover:border-amber-500/30 transition-all duration-500 group-hover:scale-110 shadow-lg`}>
                      <step.icon className={`w-8 h-8 ${step.color}`} strokeWidth={1.5} />
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-xs font-bold text-amber-500 shadow-xl">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow pt-2">
                    <div className="p-8 glass-card card-glow rounded-[2rem] hover:border-slate-600/80 transition-all duration-500">
                      <h3 className="text-xl font-display font-bold text-white mb-4 tracking-tight group-hover:text-amber-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-slate-400/90 leading-relaxed text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
