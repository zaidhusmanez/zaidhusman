'use client'

import { Linkedin, Github, Facebook, Instagram, Youtube, Music2 } from 'lucide-react'

export function SocialSidebar() {
  const socials = [
    { 
      href: "https://linkedin.com/in/zaidhusman", 
      icon: Linkedin, 
      label: "LinkedIn",
      color: "hover:text-blue-500"
    },
    { 
      href: "https://github.com/zaidhusmanez", 
      icon: Github, 
      label: "GitHub",
      color: "hover:text-white"
    },
    { 
      href: "https://facebook.com/zaidhusman", 
      icon: Facebook, 
      label: "Facebook",
      color: "hover:text-blue-600"
    },
    { 
      href: "https://www.instagram.com/zaidhusman", 
      icon: Instagram, 
      label: "Instagram",
      color: "hover:text-pink-500"
    },
    { 
      href: "https://www.youtube.com/@zaidhusman", 
      icon: Youtube, 
      label: "YouTube",
      color: "hover:text-red-600"
    },
    { 
      href: "https://www.tiktok.com/@zaidhusman", 
      icon: Music2, 
      label: "TikTok",
      color: "hover:text-emerald-400"
    },
  ]

  return (
    <aside
      className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-8"
      aria-label="Social links"
    >
      <div className="flex flex-col gap-8">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-slate-500/60 ${social.color} transition-all duration-500 hover:scale-125 hover:-translate-y-1 block`}
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5" strokeWidth={1.5} />
          </a>
        ))}
      </div>
      <div className="w-px h-24 bg-gradient-to-b from-slate-700 to-transparent" />
    </aside>
  )
}
