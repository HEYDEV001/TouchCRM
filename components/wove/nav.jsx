'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LiquidButton } from './liquid-glass'
import { Sparkles } from 'lucide-react'

const NAV = [
  { label: 'Platform', href: '#platform' },
  { label: 'AI Agents', href: '#ai-agents' },
  { label: 'Customers', href: '#customers' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
]

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4"
    >
      <div
        className={`relative flex items-center gap-2 md:gap-6 px-2 md:px-3 h-14 md:h-16 rounded-full transition-all duration-500 glass-thick ${
          scrolled ? 'w-[min(920px,100%)] shadow-black/40' : 'w-[min(980px,100%)]'
        }`}
      >
        {/* Refraction highlight */}
        <span aria-hidden className="absolute inset-x-4 top-0 h-1/2 rounded-t-full opacity-40 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.35), transparent)' }} />

        {/* Logo */}
        <a href="#" data-magnetic data-cursor="home" className="relative flex items-center gap-2 pl-3 md:pl-4">
          <span className="w-7 h-7 rounded-full grid place-items-center"
            style={{ background: 'linear-gradient(135deg,#44F08A,#25D366)', boxShadow: '0 6px 16px -4px rgba(37,211,102,0.6), inset 0 1px 0 rgba(255,255,255,0.5)' }}>
            <Sparkles className="w-3.5 h-3.5 text-[#062010]" strokeWidth={2.5} />
          </span>
          <span className="font-serif-display text-[22px] leading-none text-white">Wove</span>
        </a>

        {/* Center links */}
        <nav className="relative hidden md:flex items-center gap-1 mx-auto">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-magnetic
              className="relative px-3.5 py-2 rounded-full text-[13.5px] text-white/70 hover:text-white transition-colors"
            >
              <span className="relative z-10">{n.label}</span>
              <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(255,255,255,0.06)' }} />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="relative ml-auto flex items-center gap-2 pr-1.5">
          <a href="#login" data-magnetic className="hidden sm:inline-flex text-[13.5px] text-white/75 hover:text-white px-3.5 h-9 items-center rounded-full">
            Sign in
          </a>
          <LiquidButton size="sm" variant="primary" data-cursor="book">
            Book Demo
          </LiquidButton>
        </div>
      </div>
    </motion.header>
  )
}
