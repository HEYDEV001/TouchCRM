'use client'
import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle, Sparkles, Star } from 'lucide-react'
import { CustomCursor } from '@/components/wove/cursor'
import { Aurora } from '@/components/wove/aurora'
import { FloatingNav } from '@/components/wove/nav'
import { LiquidButton, LiquidGlassFilter, GlassBadge } from '@/components/wove/liquid-glass'
import { LiveDashboard } from '@/components/wove/live-dashboard'

const TRUST = ['Ripple', 'Northwind', 'Kite Labs', 'Orbit', 'Helios', 'Vellum']

const App = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden noise">
      <LiquidGlassFilter />
      <Aurora />
      <CustomCursor />
      <FloatingNav />

      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* LEFT */}
            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassBadge>
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#44F08A] opacity-70 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#44F08A]" />
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-white/80" />
                  AI Powered Revenue Operating System
                </GlassBadge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 md:mt-8 text-[42px] leading-[1.02] md:text-[62px] md:leading-[1.02] lg:text-[72px] lg:leading-[1.01] tracking-[-0.03em] font-medium text-gradient-wove"
              >
                The <span className="font-serif-display italic text-white/95">Autonomous</span> Revenue
                <br className="hidden md:block" /> Operating System for
                <br className="hidden md:block" /> <span className="text-gradient-green">D2C &amp; B2B</span> Enterprises.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45 }}
                className="mt-6 md:mt-7 text-[15.5px] md:text-[17px] leading-[1.6] text-white/60 max-w-[520px]"
              >
                Wove unifies your CRM, WhatsApp, ads, automation and analytics — supercharged by AI agents that qualify leads, close deals and run campaigns while your team sleeps.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="mt-8 md:mt-10 flex flex-wrap items-center gap-3"
              >
                <LiquidButton size="lg" variant="primary" data-cursor="book demo">
                  Book Demo <ArrowRight className="w-4 h-4" />
                </LiquidButton>
                <LiquidButton size="lg" variant="ghost" data-cursor="try free">
                  <PlayCircle className="w-4 h-4" /> Start Free Trial
                </LiquidButton>
              </motion.div>

              {/* Trust row */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="mt-12 md:mt-14"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex -space-x-1.5">
                    {[0,1,2,3,4].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#44F08A] text-[#44F08A]" />
                    ))}
                  </div>
                  <span className="text-[12.5px] text-white/60">4.9 · Trusted by 2,400+ growth teams</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                  {TRUST.map((t) => (
                    <span key={t} className="text-[13px] tracking-[0.12em] uppercase text-white/35 hover:text-white/70 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT — Live Dashboard */}
            <div className="lg:col-span-6 relative">
              <div className="relative" style={{ perspective: '1400px' }}>
                <motion.div
                  initial={{ opacity: 0, rotateY: 12, rotateX: 6, y: 40 }}
                  animate={{ opacity: 1, rotateY: -4, rotateX: 2, y: 0 }}
                  transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <LiveDashboard />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* subtle bottom fade separator */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{ background: 'linear-gradient(180deg, rgba(7,7,7,0) 0%, #070707 100%)' }} />
      </section>

      {/* Teaser bottom band — hints at more sections coming in Phase 2 */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <GlassBadge>Coming next</GlassBadge>
              <h2 className="mt-5 text-[32px] md:text-[46px] leading-[1.05] tracking-[-0.03em] font-medium text-gradient-wove max-w-[720px]">
                Built on <span className="font-serif-display italic text-white/95">seven</span> systems that fuse into one revenue operating system.
              </h2>
            </div>
            <p className="text-white/55 text-[15px] max-w-[380px]">
              AI Agents · Unified CRM · Omnichannel Inbox · Automation Builder · Real-time Analytics · Enterprise Workflows · Copilot.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { k: 'AI Agents', v: 'Close deals 24/7' },
              { k: 'Omnichannel', v: 'WhatsApp · Email · Web' },
              { k: 'Automation', v: 'Drag-drop workflows' },
              { k: 'Analytics', v: 'Live revenue insight' },
            ].map((f, i) => (
              <motion.div
                key={f.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="relative rounded-[24px] p-5 md:p-6 glass-thick group overflow-hidden"
                data-magnetic
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(80% 60% at 30% 0%, rgba(68,240,138,0.14), transparent 60%)' }} />
                <div className="relative">
                  <div className="text-[11px] text-white/50 uppercase tracking-wider">Module 0{i+1}</div>
                  <div className="mt-2 text-[18px] text-white font-medium tracking-tight">{f.k}</div>
                  <div className="mt-1 text-[13px] text-white/55">{f.v}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative pt-10 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-[1320px] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/50 text-[13px]">
            <span className="w-5 h-5 rounded-full" style={{ background: 'linear-gradient(135deg,#44F08A,#25D366)' }} />
            <span className="font-serif-display text-[16px] text-white/80">Wove</span>
            <span>© 2025 — Autonomous revenue for modern enterprises.</span>
          </div>
          <div className="text-[12.5px] text-white/40 tracking-wide">Phase 1 preview · more coming.</div>
        </div>
      </footer>
    </div>
  )
}

export default App
