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
  OmniSection, AutomationSection, AnalyticsSection,
  TestimonialsSection, CTASection, FooterSection,
  JourneySection, IntegrationsSection
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
                  AI Customer Engagement Suite
                </GlassBadge>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 md:mt-8 text-[42px] leading-[1.02] md:text-[60px] md:leading-[1.03] lg:text-[68px] lg:leading-[1.02] tracking-[-0.03em] font-medium text-gradient-wove">
                Turn Every <span className="font-serif-display italic text-black">Customer</span>
                <br className="hidden md:block" /> Into a <span className="text-gradient-lime font-serif-display italic">Repeat</span> Customer.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45 }}
                className="mt-6 md:mt-7 text-[15.5px] md:text-[17px] leading-[1.6] text-black/65 max-w-[540px]">
                The AI-powered Customer Engagement Suite for D2C brands to acquire customers, recover abandoned carts, automate conversations, and maximize Customer Lifetime Value — all from one platform.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}
                className="mt-8 md:mt-10 flex flex-wrap items-center gap-3">
                <LimeCTA size="lg" data-cursor="book demo">Book Demo <ArrowRight className="w-4 h-4" /></LimeCTA>
                <GhostCTA size="lg" data-cursor="try free"><PlayCircle className="w-4 h-4" /> Watch Product Tour</GhostCTA>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }} className="mt-12 md:mt-14">
                <div className="flex items-center gap-2 mb-4 text-[12px] tracking-[0.16em] uppercase text-black/45">
                  Trusted by fast-growing D2C brands
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
      <JourneySection />
      <CRMSection />
      <OmniSection />
      <AnalyticsSection />
      <TestimonialsSection />
      <AutomationSection />
      <IntegrationsSection />
      <CTASection />
      <FooterSection />
    </div>
  )
}

export default App
