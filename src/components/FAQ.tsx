'use client'

import { useState } from 'react'
import { AnimateOnScroll } from './AnimateOnScroll'
import { SectionHeader } from './SectionHeader'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: 'What services do you offer?',
    answer: 'I specialize in full-stack web development (React, Next.js), AI-integrated software solutions, POS systems, inventory management, and creative branding including UI/UX design and social media graphics.'
  },
  {
    question: 'How long does a typical project take?',
    answer: 'The timeline varies depending on the complexity of the project. A standard business website usually takes 2-4 weeks, while more complex software or AI-integrated solutions may take 6-12 weeks.'
  },
  {
    question: 'Do you offer ongoing maintenance and support?',
    answer: 'Yes, I provide post-launch support and maintenance packages to ensure your software or website remains secure, up-to-date, and optimized for performance.'
  },
  {
    question: 'How do you integrate AI into software?',
    answer: 'I use advanced AI tools and APIs to automate repetitive tasks, improve business processes, and create intelligent features like predictive analytics, natural language processing, and smart automation workflows.'
  },
  {
    question: 'What is your pricing model?',
    answer: 'Pricing is project-based and depends on the specific requirements and scope. I offer transparent pricing with clear milestones and no hidden costs. Contact me for a detailed quote.'
  }
]

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-slate-900/10">
      <div className="max-w-4xl mx-auto px-6">
        <AnimateOnScroll effect="blur">
          <SectionHeader number="09" title="Common" accent="Questions" />
          <p className="text-slate-400 max-w-2xl mb-16 leading-relaxed text-lg">
            Answers to some of the most frequent questions I get from clients.
          </p>
        </AnimateOnScroll>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index
            return (
              <AnimateOnScroll key={index} delay={index * 50} effect="slide">
                <div 
                  className={`glass-card rounded-[2rem] overflow-hidden transition-all duration-500 border border-slate-800/60 ${
                    isActive ? 'border-amber-500/30 bg-slate-900/60 shadow-lg' : 'hover:border-slate-700/80 hover:bg-slate-900/40'
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="w-full p-8 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`p-3 rounded-2xl transition-all duration-500 ${
                        isActive ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-800/60 text-slate-500 group-hover:text-amber-400'
                      }`}>
                        <HelpCircle className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                      <span className={`text-lg font-display font-semibold transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-slate-500 transition-transform duration-500 ${
                      isActive ? 'rotate-180 text-amber-500' : 'group-hover:text-amber-400'
                    }`} />
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-8 pb-8 pl-[5.5rem] text-slate-400/90 leading-relaxed text-base">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
