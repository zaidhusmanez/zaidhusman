'use client'

import { AnimateOnScroll } from './AnimateOnScroll'
import { SectionHeader } from './SectionHeader'
import { CountUp } from './CountUp'

export function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll effect="scale">
          <SectionHeader number="01" title="About" accent="Me" />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-slate-400/90 text-lg leading-relaxed mb-6">
                I&apos;m a motivated Software and Web Developer with hands-on experience in
                AI-integrated software, web applications, and digital solutions. As the founder
                of ZATION, I lead a software and design startup that delivers intelligent POS
                systems, business websites, and branding solutions.
              </p>
              <p className="text-slate-400/90 text-lg leading-relaxed mb-8">
                I&apos;m skilled in modern web technologies, automation, and AI-powered tools to
                improve business efficiency. I&apos;m passionate about building scalable systems
                and creating impactful digital experiences. As a strong communicator, problem
                solver, and fast learner, I&apos;m always seeking opportunities in Software
                Development or Web Development.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-4 glass-card rounded-2xl hover:border-slate-600/80 transition-colors duration-300">
                  <span className="text-slate-500/80 text-xs font-semibold uppercase tracking-premium-wider">Location</span>
                  <p className="text-white font-medium mt-1.5">Kandy, Sri Lanka</p>
                </div>
                <div className="px-6 py-4 glass-card rounded-2xl hover:border-slate-600/80 transition-colors duration-300">
                  <span className="text-slate-500/80 text-xs font-semibold uppercase tracking-premium-wider">Languages</span>
                  <p className="text-white font-medium mt-1.5">English, Tamil, Sinhala</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="p-8 glass-card card-glow rounded-2xl hover:border-slate-600/80 transition-all duration-500 group">
                <p className="font-display text-4xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
                  <CountUp end={2} suffix="+" duration={1200} />
                </p>
                <p className="text-slate-500/80 text-sm mt-2 tracking-premium">Years Experience</p>
              </div>
              <div className="p-8 glass-card card-glow rounded-2xl hover:border-slate-600/80 transition-all duration-500 group">
                <p className="font-display text-4xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
                  <CountUp end={50} suffix="+" duration={1800} />
                </p>
                <p className="text-slate-500/80 text-sm mt-2 tracking-premium">Projects Delivered</p>
              </div>
              <div className="p-8 glass-card card-glow rounded-2xl hover:border-slate-600/80 transition-all duration-500 group">
                <p className="font-display text-4xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">AI</p>
                <p className="text-slate-500/80 text-sm mt-2 tracking-premium">Integrated Solutions</p>
              </div>
              <div className="p-8 glass-card card-glow rounded-2xl hover:border-slate-600/80 transition-all duration-500 group">
                <p className="font-display text-4xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
                  <CountUp end={100} suffix="%" duration={1000} />
                </p>
                <p className="text-slate-500/80 text-sm mt-2 tracking-premium">Client Focused</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
