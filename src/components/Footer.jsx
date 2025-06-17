import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const socials = [
  { icon: Github, href: 'https://github.com/abdu128', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abdulaziz-nejib-7a0700354', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/abdulaziznejib', label: 'Twitter' },
  { icon: Mail, href: 'mailto:abdulaziznejo1281@gmail.com', label: 'Email' }
]

const Footer = () => (
  <footer className="mt-24 py-8 text-center text-white/60 text-sm">
    <div className="flex justify-center gap-6 mb-4">
      {socials.map(s => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neon-blue transition-colors duration-300"
          aria-label={s.label}
        >
          <s.icon size={20} />
        </a>
      ))}
    </div>
    <div className="mb-2">
      <span className="gradient-text font-bold">Abdulaziz Nejib</span> &copy; {new Date().getFullYear()} &mdash; All rights reserved.
    </div>
    <div className="text-xs text-white/40">
      Built with <span className="text-neon-blue">React</span> &amp; <span className="text-neon-emerald">Vite</span>.
    </div>
  </footer>
)

export default Footer 