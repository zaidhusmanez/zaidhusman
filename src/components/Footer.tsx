import { Linkedin, Github, Facebook, Instagram, Youtube, Music2 } from 'lucide-react'

export function Footer() {
  const socials = [
    { href: "https://linkedin.com/in/zaidhusman", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-500" },
    { href: "https://github.com/zaidhusmanez", icon: Github, label: "GitHub", color: "hover:text-white" },
    { href: "https://facebook.com/zaidhusman", icon: Facebook, label: "Facebook", color: "hover:text-blue-600" },
    { href: "https://www.instagram.com/zaidhusman", icon: Instagram, label: "Instagram", color: "hover:text-pink-500" },
    { href: "https://www.youtube.com/@zaidhusman", icon: Youtube, label: "YouTube", color: "hover:text-red-600" },
    { href: "https://www.tiktok.com/@zaidhusman", icon: Music2, label: "TikTok", color: "hover:text-emerald-400" },
  ]

  return (
    <footer className="py-12 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-white text-xl tracking-tight">ZAIDH USMAN</p>
            <p className="text-slate-500/80 text-sm mt-1.5 tracking-premium">Software Developer & Designer</p>
          </div>
          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-slate-500/60 ${social.color} hover:scale-110 hover:-translate-y-0.5 transition-all duration-300`}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm tracking-premium">
            © {new Date().getFullYear()} ZAIDH USMAN. All rights reserved.
          </p>
          <p className="text-slate-600/80 text-sm tracking-premium">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
