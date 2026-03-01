'use client'

import { AnimateOnScroll } from './AnimateOnScroll'
import { SectionHeader } from './SectionHeader'
import { ContactForm } from './ContactForm'
import { Mail, Phone, Linkedin, Github, Facebook, Instagram, Youtube, Music2 } from 'lucide-react'

export function Contact() {
  const socials = [
    { href: "https://linkedin.com/in/zaidhusman", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-500" },
    { href: "https://github.com/zaidhusmanez", icon: Github, label: "GitHub", color: "hover:text-white" },
    { href: "https://facebook.com/zaidhusman", icon: Facebook, label: "Facebook", color: "hover:text-blue-600" },
    { href: "https://www.instagram.com/zaidhusman", icon: Instagram, label: "Instagram", color: "hover:text-pink-500" },
    { href: "https://www.youtube.com/@zaidhusman", icon: Youtube, label: "YouTube", color: "hover:text-red-600" },
    { href: "https://www.tiktok.com/@zaidhusman", icon: Music2, label: "TikTok", color: "hover:text-emerald-400" },
  ]

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll effect="scale">
          <SectionHeader number="07" title="Get in" accent="Touch" />
          <p className="text-slate-400/90 text-lg mb-10 max-w-2xl leading-relaxed">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities
            to be part of your vision. Feel free to reach out!
          </p>
          
          <div className="grid lg:grid-cols-5 gap-10 mb-10">
            {/* Left side: Contact Info */}
            <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
              {/* Mail & Phone */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-5">
                <a
                  href="mailto:zaidhusman2005@gmail.com"
                  className="flex items-center gap-5 p-8 glass-card card-glow rounded-2xl hover:border-slate-600/80 hover:scale-[1.02] transition-all duration-500 group"
                >
                  <div className="p-4 bg-amber-500/10 rounded-2xl group-hover:bg-amber-500/20 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-amber-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-slate-500/80 text-xs font-semibold uppercase tracking-premium-wider">Email</p>
                    <p className="text-white font-medium mt-1.5">zaidhusman2005@gmail.com</p>
                  </div>
                </a>
                
                <a
                  href="tel:+94752723544"
                  className="flex items-center gap-5 p-8 glass-card card-glow rounded-2xl hover:border-slate-600/80 hover:scale-[1.02] transition-all duration-500 group"
                >
                  <div className="p-4 bg-amber-500/10 rounded-2xl group-hover:bg-amber-500/20 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-amber-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-slate-500/80 text-xs font-semibold uppercase tracking-premium-wider">Phone</p>
                    <p className="text-white font-medium mt-1.5">+94 75 272 3544</p>
                  </div>
                </a>
              </div>

              {/* Socials */}
              <div className="flex flex-wrap gap-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-5 py-4 glass-card btn-shine rounded-2xl hover:border-amber-500/30 hover:bg-amber-500/10 text-slate-300 ${social.color} font-medium transition-all duration-500 flex items-center gap-3`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" strokeWidth={1.5} />
                    <span className="text-sm">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right side: Contact Form */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <ContactForm />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
