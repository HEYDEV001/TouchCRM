'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { ArrowRight, PlayCircle, Sparkles, Star } from 'lucide-react'
import { CustomCursor } from '@/components/wove/cursor'
import { Aurora } from '@/components/wove/aurora'
import { FloatingNav } from '@/components/wove/nav'
import { LimeCTA, GhostCTA, GlassBadge } from '@/components/wove/liquid-glass'
import { LiveDashboard } from '@/components/wove/live-dashboard'
import { Reveal } from '@/components/wove/effects'
const DotBot = dynamic(() => import('@/components/dotbot/DotBot'), { ssr: false })
import {
  TrustedSection, ProblemSection, FeaturesSection, AIAgentsSection, CRMSection,
  OmniSection, AutomationSection, AnalyticsSection, PricingSection,
  TestimonialsSection, FAQSection, CTASection, FooterSection
} from '@/components/wove/sections'

const TRUST = ['Ripple', 'Northwind', 'Kite Labs', 'Orbit', 'Helios', 'Vellum']

const App = () => {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const dashY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.4])

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden noise">
      <Aurora />
      <CustomCursor />
      <FloatingNav />
      <DotBot />

      {/* HERO */}
      <section ref={heroRef} id="home" className="relative pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            <motion.div className="lg:col-span-6 relative" style={{ y: heroTextY, opacity: heroOpacity }}>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
                <GlassBadge>
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#FEF48D] opacity-80 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FEF48D]" />
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-black/80" />
                  AI Powered Revenue Operating System
                </GlassBadge>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 md:mt-8 text-[42px] leading-[1.02] md:text-[62px] md:leading-[1.02] lg:text-[72px] lg:leading-[1.01] tracking-[-0.03em] font-medium text-gradient-wove">
                The <span className="font-serif-display italic text-black">Autonomous</span> Revenue
                <br className="hidden md:block" /> Operating System for
                <br className="hidden md:block" /> <span className="text-gradient-lime font-serif-display italic">D2C &amp; B2B</span> Enterprises.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45 }}
                className="mt-6 md:mt-7 text-[15.5px] md:text-[17px] leading-[1.6] text-black/65 max-w-[520px]">
                Wove unifies your CRM, WhatsApp, ads, automation and analytics — supercharged by AI agents that qualify leads, close deals and run campaigns while your team sleeps.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}
                className="mt-8 md:mt-10 flex flex-wrap items-center gap-3">
                <LimeCTA size="lg" data-cursor="book demo">Book Demo <ArrowRight className="w-4 h-4" /></LimeCTA>
                <GhostCTA size="lg" data-cursor="try free"><PlayCircle className="w-4 h-4" /> Start Free Trial</GhostCTA>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }} className="mt-12 md:mt-14">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex -space-x-1.5">{[0,1,2,3,4].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />)}</div>
                  <span className="text-[12.5px] text-black/60">4.9 · Trusted by 2,400+ growth teams</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                  {TRUST.map((t) => <span key={t} className="text-[13px] tracking-[0.12em] uppercase text-black/40 hover:text-black transition-colors">{t}</span>)}
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="lg:col-span-6 relative" style={{ y: dashY }}>
              <div className="relative" style={{ perspective: '1400px' }}>
                <motion.div initial={{ opacity: 0, rotateY: 12, rotateX: 6, y: 40 }} animate={{ opacity: 1, rotateY: -4, rotateX: 2, y: 0 }}
                  transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }} style={{ transformStyle: 'preserve-3d' }}>
                  <LiveDashboard />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TrustedSection />
      <ProblemSection />
      <AIAgentsSection />
      <FeaturesSection />
      <CRMSection />
      <OmniSection />
      <AnalyticsSection />
      <TestimonialsSection />
      <AutomationSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </div>
  )
}

export default App
