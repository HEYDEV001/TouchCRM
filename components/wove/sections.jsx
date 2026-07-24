'use client'
import { motion } from 'framer-motion'
import {
  Bot, Users, MessageCircle, Workflow, LineChart as LineIcon, ShieldCheck, Zap, Mail, Phone, Instagram,
  Sparkles, ArrowRight, Check, Star, Plus, Minus, Globe, Layers, Send
} from 'lucide-react'
import { useState } from 'react'
import { GlassCard, GlassBadge, LimeCTA, GhostCTA, DarkCTA } from './liquid-glass'
import { CountUp, Reveal } from './effects'

/* ---------------- 2. Trusted Companies ---------------- */
const LOGOS = ['Ripple', 'Northwind', 'Kite Labs', 'Orbit', 'Helios', 'Vellum', 'Aster', 'Meridian', 'Loop', 'Corvus']
export function TrustedSection() {
  return (
    <section id="trusted" className="relative py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <Reveal>
          <p className="text-center text-[12.5px] uppercase tracking-[0.2em] text-black/50 mb-8">Step 02 · Trusted by 2,400+ growth teams across 40+ countries</p>
        </Reveal>
        <div className="relative overflow-hidden mask-fade" style={{ maskImage: 'linear-gradient(90deg,transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(90deg,transparent, black 12%, black 88%, transparent)' }}>
          <div className="flex gap-14 anim-marquee w-max">
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <span key={i} className="text-[24px] md:text-[28px] font-serif-display text-black/55 hover:text-black transition-colors shrink-0">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- 3. Problem ---------------- */
export function ProblemSection() {
  const pains = [
    { k: '7+', l: 'Disconnected tools per revenue team', d: 'CRM, spreadsheets, WhatsApp, ads dashboards, emails — all speaking different languages.' },
    { k: '68%', l: 'Of leads never followed up', d: 'By the time an SDR replies, the intent has decayed. Speed to lead is broken.' },
    { k: '$1.2M', l: 'Wasted per 100 reps annually', d: 'On admin, data entry and context-switching that AI should handle in the background.' },
  ]
  return (
    <section id="problem" className="relative py-24 md:py-36">
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <Reveal>
          <GlassBadge>Step 03 · Problem</GlassBadge>
          <h2 className="mt-6 max-w-[900px] text-[40px] leading-[1.05] md:text-[64px] md:leading-[1.03] tracking-[-0.03em] font-medium text-gradient-wove">
            Revenue teams are drowning in <span className="font-serif-display italic">tools</span>, not
            <br className="hidden md:block" /> closing deals.
          </h2>
        </Reveal>
        <div className="mt-14 md:mt-20 grid md:grid-cols-3 gap-5">
          {pains.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.08}>
              <GlassCard className="p-8 h-full">
                <div className="text-[54px] md:text-[64px] leading-none font-serif-display text-black">{p.k}</div>
                <div className="mt-4 text-[16px] md:text-[17px] text-black font-medium tracking-tight">{p.l}</div>
                <div className="mt-2 text-[14px] text-black/60 leading-relaxed">{p.d}</div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- 4. Features (tilt cards) ---------------- */
function TiltCard({ children, className = '' }) {
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 50 })
  return (
    <motion.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        setT({ rx: (py - 0.5) * -8, ry: (px - 0.5) * 8, mx: px * 100, my: py * 100 })
      }}
      onMouseLeave={() => setT({ rx: 0, ry: 0, mx: 50, my: 50 })}
      style={{ transformStyle: 'preserve-3d', transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`relative rounded-[28px] glass-light overflow-hidden group ${className}`}
    >
      <div aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(400px at ${t.mx}% ${t.my}%, rgba(225,254,3,0.35), transparent 60%)` }} />
      {children}
    </motion.div>
  )
}
export function FeaturesSection() {
  const feats = [
    { icon: Bot, title: 'Autonomous AI Agents', desc: 'Agents that qualify, follow up, book demos and close low-touch deals — 24/7 in your voice.', color: 'lime' },
    { icon: Users, title: 'Unified CRM', desc: 'One source of truth for contacts, deals, accounts — auto-enriched from every touchpoint.', color: 'blue' },
    { icon: MessageCircle, title: 'Omnichannel Inbox', desc: 'WhatsApp, email, web-chat, IG, SMS — one thread per customer, AI-drafted replies.', color: 'lime' },
    { icon: Workflow, title: 'Automation Builder', desc: 'Drag-and-drop workflows with AI steps. Trigger anything from anywhere.', color: 'blue' },
    { icon: LineIcon, title: 'Realtime Analytics', desc: 'Revenue, funnel, cohort and forecasts — live, explainable, exportable.', color: 'lime' },
    { icon: ShieldCheck, title: 'Enterprise Security', desc: 'SOC 2, GDPR, SSO, RBAC, data residency — built for regulated industries.', color: 'blue' },
  ]
  return (
    <section id="features" className="relative py-24 md:py-36">
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <GlassBadge>Step 05 · Features</GlassBadge>
              <h2 className="mt-5 text-[40px] leading-[1.05] md:text-[64px] md:leading-[1.03] tracking-[-0.03em] font-medium text-gradient-wove max-w-[820px]">
                One platform. <span className="font-serif-display italic">Seven</span> systems. Zero silos.
              </h2>
            </div>
            <p className="text-black/60 text-[16px] max-w-[380px]">Everything a modern revenue team needs, deeply integrated and orchestrated by AI.</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {feats.map((f, i) => {
            const Icon = f.icon
            const iconBg = f.color === 'lime' ? 'bg-[#FEF48D]' : 'bg-[#97BAFF]'
            return (
              <Reveal key={f.title} delay={i * 0.06}>
                <TiltCard className="p-7 h-full">
                  <div className={`w-11 h-11 rounded-2xl grid place-items-center ${iconBg} border border-black/10`}>
                    <Icon className="w-5 h-5 text-black" strokeWidth={1.8} />
                  </div>
                  <div className="mt-5 text-[19px] text-black font-medium tracking-tight">{f.title}</div>
                  <div className="mt-2 text-[14px] text-black/60 leading-relaxed">{f.desc}</div>
                  <div className="mt-6 inline-flex items-center gap-1 text-[13px] text-black/70 group-hover:text-black transition-colors">Explore <ArrowRight className="w-3.5 h-3.5" /></div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- 5. AI Agents ---------------- */
export function AIAgentsSection() {
  const agents = [
    { name: 'Atlas', role: 'SDR Agent', task: 'Qualifying 428 inbound leads', color: '#FEF48D' },
    { name: 'Nova', role: 'Success Agent', task: 'Onboarding 12 new accounts', color: '#97BAFF' },
    { name: 'Orion', role: 'RevOps Agent', task: 'Cleaning duplicate records', color: '#FEF48D' },
    { name: 'Vega', role: 'Marketing Agent', task: 'Running 3 A/B campaigns', color: '#97BAFF' },
  ]
  return (
    <section id="ai-agents" className="relative py-24 md:py-36">
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <GlassBadge><Sparkles className="w-3.5 h-3.5" /> Step 04 · Solution</GlassBadge>
              <h2 className="mt-6 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.03] tracking-[-0.03em] font-medium text-gradient-wove">
                A team of <span className="font-serif-display italic">agents</span> that never sleep.
              </h2>
              <p className="mt-5 text-[16px] text-black/60 leading-relaxed">Each Wove agent is a purpose-built AI that takes ownership of a job — not just a chatbot. Trained on your data, guardrailed by your rules, measured by revenue.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LimeCTA size="md">See Agents <ArrowRight className="w-4 h-4" /></LimeCTA>
                <GhostCTA size="md">Read the docs</GhostCTA>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <GlassCard className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FEF48D] animate-pulse" />
                    <span className="text-[12.5px] text-black/70">4 agents working · last update 2s ago</span>
                  </div>
                  <GlassBadge>Live</GlassBadge>
                </div>
                <div className="space-y-3">
                  {agents.map((a, i) => (
                    <motion.div key={a.name}
                      initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 border border-black/5">
                      <div className="w-11 h-11 rounded-full grid place-items-center font-serif-display text-[20px] text-black"
                        style={{ background: `radial-gradient(circle at 30% 30%, #fff, ${a.color})` }}>{a.name[0]}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2"><span className="text-[15px] text-black font-medium">{a.name}</span><span className="text-[12px] text-black/50">{a.role}</span></div>
                        <div className="text-[13px] text-black/60">{a.task}</div>
                      </div>
                      <div className="relative w-24 h-1 rounded-full bg-black/10 overflow-hidden">
                        <motion.div initial={{ x: '-100%' }} whileInView={{ x: '0%' }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.3, duration: 1.6, ease: 'easeOut' }}
                          className="absolute inset-y-0 left-0 w-full" style={{ background: a.color }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- 6. CRM ---------------- */
export function CRMSection() {
  const cols = [
    { stage: 'New', deals: ['Acme · $84K', 'Loop · $22K', 'Corvus · $110K'] },
    { stage: 'Qualified', deals: ['Meridian · $56K', 'Aster · $180K'] },
    { stage: 'Negotiation', deals: ['Vellum · $240K', 'Helios · $92K', 'Orbit · $65K'] },
    { stage: 'Won', deals: ['Ripple · $310K', 'Kite · $148K'] },
  ]
  return (
    <section id="crm" className="relative py-24 md:py-36">
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <GlassBadge>Unified CRM</GlassBadge>
              <h2 className="mt-5 text-[40px] leading-[1.05] md:text-[60px] md:leading-[1.03] tracking-[-0.03em] font-medium text-gradient-wove max-w-[820px]">
                Your CRM, <span className="font-serif-display italic">alive</span> for the first time.
              </h2>
            </div>
            <p className="text-black/60 text-[16px] max-w-[420px]">Every conversation, click, and deal — auto-logged. No more “did you update Salesforce?”</p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <GlassCard className="p-4 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {cols.map((c, ci) => (
                <div key={c.stage} className="rounded-2xl bg-white/50 border border-black/5 p-3">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[12px] text-black/60">{c.stage}</span>
                    <span className="text-[11px] text-black/40">{c.deals.length}</span>
                  </div>
                  <div className="space-y-2">
                    {c.deals.map((d, i) => (
                      <motion.div key={d} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.08 + i * 0.05, duration: 0.5 }}
                        className={`rounded-xl px-3 py-2.5 text-[12.5px] border border-black/10 ${ci === 3 ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        {d}
                        <div className={`text-[10.5px] mt-1 ${ci === 3 ? 'text-white/60' : 'text-black/50'}`}>updated 2h ago</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- 7. Omnichannel ---------------- */
export function OmniSection() {
  const channels = [
    { icon: MessageCircle, name: 'WhatsApp', volume: '128K', color: '#FEF48D' },
    { icon: Mail, name: 'Email', volume: '82K', color: '#97BAFF' },
    { icon: Instagram, name: 'Instagram', volume: '34K', color: '#FEF48D' },
    { icon: Phone, name: 'Voice', volume: '12K', color: '#97BAFF' },
    { icon: Globe, name: 'Web Chat', volume: '58K', color: '#FEF48D' },
    { icon: Send, name: 'SMS', volume: '19K', color: '#97BAFF' },
  ]
  return (
    <section id="omnichannel" className="relative py-24 md:py-36">
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <Reveal>
          <div className="text-center max-w-[820px] mx-auto">
            <GlassBadge>Omnichannel</GlassBadge>
            <h2 className="mt-5 text-[40px] leading-[1.05] md:text-[60px] md:leading-[1.03] tracking-[-0.03em] font-medium text-gradient-wove">
              Every channel. <span className="font-serif-display italic">One</span> inbox.
            </h2>
            <p className="mt-5 text-[16px] text-black/60">Customers don’t care about your channel silos. Neither should you. Wove unifies conversations across every touchpoint.</p>
          </div>
        </Reveal>
        <div className="mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {channels.map((c, i) => {
            const Icon = c.icon
            return (
              <Reveal key={c.name} delay={i * 0.05}>
                <div className="rounded-3xl p-6 glass-light hover:-translate-y-1 transition-transform duration-500" data-magnetic>
                  <div className="w-11 h-11 rounded-2xl grid place-items-center" style={{ background: c.color }}>
                    <Icon className="w-5 h-5 text-black" strokeWidth={1.8} />
                  </div>
                  <div className="mt-4 text-[15px] text-black font-medium">{c.name}</div>
                  <div className="text-[12px] text-black/55">{c.volume} threads / mo</div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- 8. Automation Builder ---------------- */
export function AutomationSection() {
  const nodes = [
    { label: 'Trigger', desc: 'New WhatsApp lead', color: '#97BAFF', icon: MessageCircle },
    { label: 'AI Step', desc: 'Qualify + enrich', color: '#FEF48D', icon: Bot },
    { label: 'Action', desc: 'Create deal in CRM', color: '#fff', icon: Layers },
    { label: 'Notify', desc: 'Slack + SDR ping', color: '#000', icon: Zap },
  ]
  return (
    <section id="automation" className="relative py-24 md:py-36">
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <Reveal delay={0.1}>
              <GlassCard className="p-5 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[13px] text-black font-medium">Flow: Speed to Lead · v3.2</div>
                  <GlassBadge>Deployed</GlassBadge>
                </div>
                <div className="space-y-2">
                  {nodes.map((n, i) => {
                    const Icon = n.icon
                    const isDark = n.color === '#000'
                    return (
                      <div key={n.label} className="relative">
                        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
                          className={`flex items-center gap-3 p-3 rounded-2xl border border-black/10 ${isDark ? 'bg-black text-white' : 'bg-white/70 text-black'}`}>
                          <div className="w-9 h-9 rounded-xl grid place-items-center shrink-0" style={{ background: n.color, boxShadow: isDark ? '0 0 0 1px rgba(255,255,255,0.15)' : '0 0 0 1px rgba(0,0,0,0.06)' }}>
                            <Icon className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'}`} strokeWidth={1.8} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[11px] uppercase tracking-wider opacity-60">{n.label}</div>
                            <div className="text-[14px] font-medium">{n.desc}</div>
                          </div>
                        </motion.div>
                        {i < nodes.length - 1 && (
                          <div className="flex justify-center py-1"><div className="w-px h-4 bg-black/20" /></div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </GlassCard>
            </Reveal>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <Reveal>
              <GlassBadge>Step 07 · Ease of Use</GlassBadge>
              <h2 className="mt-5 text-[40px] leading-[1.05] md:text-[60px] md:leading-[1.03] tracking-[-0.03em] font-medium text-gradient-wove">
                Automate anything. <span className="font-serif-display italic">In minutes.</span>
              </h2>
              <p className="mt-5 text-[16px] text-black/60 max-w-[540px] leading-relaxed">Drag-and-drop workflows with native AI steps. Trigger from any event. Branch on any condition. Ship in an afternoon what used to take a quarter of engineering time.</p>
              <div className="mt-8 grid grid-cols-2 gap-4 max-w-[440px]">
                <Stat n={<CountUp to={94} suffix="%" />} l="Fewer manual tasks" />
                <Stat n={<CountUp to={12} suffix="x" />} l="Faster to launch" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ n, l }) {
  return (
    <div className="rounded-2xl p-5 glass-light">
      <div className="font-serif-display text-[44px] leading-none text-black">{n}</div>
      <div className="mt-2 text-[13px] text-black/60">{l}</div>
    </div>
  )
}

/* ---------------- 9. Analytics ---------------- */
export function AnalyticsSection() {
  return (
    <section id="analytics" className="relative py-24 md:py-36">
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <Reveal>
          <div className="text-center max-w-[820px] mx-auto">
            <GlassBadge>Step 06 · Proof · Numbers</GlassBadge>
            <h2 className="mt-5 text-[40px] leading-[1.05] md:text-[60px] md:leading-[1.03] tracking-[-0.03em] font-medium text-gradient-wove">
              The <span className="font-serif-display italic">numbers</span>, live.
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-4 gap-4">
          {[
            { n: <CountUp to={4.82} decimals={2} prefix="$" suffix="M" />, l: 'Pipeline created', t: '+23.7%' },
            { n: <CountUp to={38.2} decimals={1} suffix="%" />, l: 'Win rate', t: '+3.1%' },
            { n: <CountUp to={7204} suffix="" />, l: 'AI touches', t: '+42%' },
            { n: <CountUp to={128} suffix="K" />, l: 'Msgs handled', t: '+18%' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <GlassCard className="p-6">
                <div className="text-[11px] uppercase tracking-wider text-black/50">{s.l}</div>
                <div className="mt-2 font-serif-display text-[42px] leading-none text-black">{s.n}</div>
                <div className="mt-2 inline-flex items-center text-[12px] px-2 py-0.5 bg-[#FEF48D] rounded-full font-medium">{s.t}</div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- 10. Pricing ---------------- */
export function PricingSection() {
  const tiers = [
    { name: 'Starter', price: '$0', per: '/user/mo', desc: 'For teams getting started', feats: ['Unified CRM', 'WhatsApp inbox', '2 AI agents', 'Basic analytics'], cta: 'Start free', highlight: false },
    { name: 'Growth', price: '$79', per: '/user/mo', desc: 'For scaling revenue teams', feats: ['Everything in Starter', 'All omnichannel', '10 AI agents', 'Automation builder', 'Realtime analytics'], cta: 'Start free trial', highlight: true },
    { name: 'Enterprise', price: 'Custom', per: '', desc: 'For 100+ seat orgs', feats: ['Unlimited agents', 'SSO + RBAC', 'Data residency', 'Dedicated CSM', '99.99% SLA'], cta: 'Talk to sales', highlight: false },
  ]
  return (
    <section id="pricing" className="relative py-24 md:py-36">
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <Reveal>
          <div className="text-center max-w-[820px] mx-auto">
            <GlassBadge>Pricing</GlassBadge>
            <h2 className="mt-5 text-[40px] leading-[1.05] md:text-[60px] md:leading-[1.03] tracking-[-0.03em] font-medium text-gradient-wove">
              Priced per <span className="font-serif-display italic">seat</span>. Value per hour.
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className={`relative rounded-[28px] p-8 h-full flex flex-col ${t.highlight ? 'glass-dark text-white' : 'glass-light text-black'}`}>
                {t.highlight && (
                  <span className="absolute -top-3 left-8 h-6 px-2.5 rounded-full text-[11px] font-medium grid place-items-center bg-[#FEF48D] text-black">Most popular</span>
                )}
                <div className={`text-[13px] ${t.highlight ? 'text-white/70' : 'text-black/60'}`}>{t.name}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-serif-display text-[54px] leading-none">{t.price}</span>
                  <span className={`text-[13px] ${t.highlight ? 'text-white/60' : 'text-black/50'}`}>{t.per}</span>
                </div>
                <p className={`mt-2 text-[14px] ${t.highlight ? 'text-white/70' : 'text-black/60'}`}>{t.desc}</p>
                <ul className="mt-6 space-y-3 flex-1">
                  {t.feats.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[14px]">
                      <span className={`w-5 h-5 rounded-full grid place-items-center shrink-0 ${t.highlight ? 'bg-white/10' : 'bg-black/5'}`}>
                        <Check className={`w-3 h-3 ${t.highlight ? 'text-[#FEF48D]' : 'text-black'}`} strokeWidth={3} />
                      </span>
                      <span className={t.highlight ? 'text-white/90' : 'text-black/80'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {t.highlight ? <LimeCTA size="md" className="w-full">{t.cta} <ArrowRight className="w-4 h-4" /></LimeCTA> : <DarkCTA size="md" className="w-full">{t.cta} <ArrowRight className="w-4 h-4" /></DarkCTA>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- 11. Testimonials ---------------- */
export function TestimonialsSection() {
  const quotes = [
    { q: 'Wove replaced 6 tools and gave our RevOps team back 30 hours a week. The AI agents alone paid for the platform in month one.', a: 'Priya Shah', r: 'VP Revenue, Meridian' },
    { q: 'We closed 41% more D2C deals in the first quarter. The unified WhatsApp inbox with AI drafts is genuinely magical.', a: 'Aarav Mehta', r: 'CEO, Kite Labs' },
    { q: 'Finally a platform that treats AI as an operating system, not a chatbot bolted onto a CRM. Our board asked which company built this.', a: 'Sofia Alvarez', r: 'CRO, Orbit' },
  ]
  return (
    <section id="testimonials" className="relative py-24 md:py-36">
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <Reveal>
          <div className="flex items-end justify-between mb-14">
            <div>
              <GlassBadge>Step 06 · Proof · Voices</GlassBadge>
              <h2 className="mt-5 text-[40px] leading-[1.05] md:text-[60px] md:leading-[1.03] tracking-[-0.03em] font-medium text-gradient-wove max-w-[720px]">
                Loved by <span className="font-serif-display italic">operators</span>.
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-1">{[0,1,2,3,4].map(i => <Star key={i} className="w-4 h-4 fill-black text-black" />)}<span className="ml-2 text-[13px] text-black/60">4.9 / 5 avg</span></div>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((q, i) => (
            <Reveal key={q.a} delay={i * 0.1}>
              <GlassCard className="p-7 h-full flex flex-col">
                <div className="font-serif-display text-[52px] leading-none text-black/20">“</div>
                <p className="mt-2 text-[15.5px] leading-[1.55] text-black/85">{q.q}</p>
                <div className="mt-8 pt-5 border-t border-black/5">
                  <div className="text-[14px] text-black font-medium">{q.a}</div>
                  <div className="text-[12.5px] text-black/55">{q.r}</div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- 12. FAQ ---------------- */
export function FAQSection() {
  const faqs = [
    { q: 'How is Wove different from a normal CRM + chatbot?', a: 'Wove is a full operating system: unified CRM, omnichannel inbox, automation and analytics — with autonomous AI agents that own outcomes, not scripts. It replaces 6-8 tools, not just one.' },
    { q: 'Can Wove work with our existing stack?', a: 'Yes. Wove has 200+ native integrations (HubSpot, Salesforce, Shopify, WhatsApp Business, Stripe, and more) plus an open API and webhooks. Most teams switch fully in 4-6 weeks.' },
    { q: 'How secure is Wove for enterprises?', a: 'SOC 2 Type II, ISO 27001, GDPR compliant. Data residency in US, EU, IN, SG. SSO/SAML, RBAC, audit logs, and per-tenant encryption keys are standard.' },
    { q: 'How do the AI agents stay on-brand?', a: 'Every agent is trained on your tone, product docs, and playbooks, and guardrailed by your policies. You can review, approve, or fully autonomize on a per-agent basis.' },
    { q: 'What does implementation look like?', a: 'A dedicated onboarding specialist migrates your CRM, connects channels, and configures your first 3 agents — typically live in 14 days for growth teams, 4-6 weeks for enterprise.' },
  ]
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="relative py-24 md:py-36">
      <div className="container mx-auto px-4 md:px-6 max-w-[1080px]">
        <Reveal>
          <div className="text-center mb-14">
            <GlassBadge>Step 08 · FAQ</GlassBadge>
            <h2 className="mt-5 text-[40px] leading-[1.05] md:text-[60px] md:leading-[1.03] tracking-[-0.03em] font-medium text-gradient-wove">
              Answers, <span className="font-serif-display italic">not fluff.</span>
            </h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className="rounded-[24px] glass-light overflow-hidden">
                <button onClick={() => setOpen(open === i ? -1 : i)} data-magnetic className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left">
                  <span className="text-[16px] md:text-[17px] text-black font-medium">{f.q}</span>
                  <span className="w-8 h-8 rounded-full grid place-items-center bg-black/5 shrink-0">
                    {open === i ? <Minus className="w-4 h-4 text-black" /> : <Plus className="w-4 h-4 text-black" />}
                  </span>
                </button>
                <motion.div initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                  <p className="px-5 md:px-6 pb-6 text-[14.5px] text-black/65 leading-relaxed max-w-[720px]">{f.a}</p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- 13. Final CTA ---------------- */
export function CTASection() {
  return (
    <section id="cta" className="relative py-24 md:py-36">
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <Reveal>
          <div className="relative rounded-[36px] overflow-hidden p-10 md:p-16 glass-dark text-white">
            <div aria-hidden className="absolute inset-0 opacity-70"
              style={{ background: 'radial-gradient(60% 100% at 90% 10%, rgba(225,254,3,0.35), transparent 60%), radial-gradient(60% 100% at 10% 90%, rgba(151,186,255,0.28), transparent 60%)' }} />
            <div aria-hidden className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 80%)' }} />
            <div className="relative grid md:grid-cols-2 gap-10 items-end">
              <div>
                <span className="inline-flex items-center gap-2 h-8 px-3.5 rounded-full text-[12.5px] bg-white/10 text-white/85 border border-white/10"><Sparkles className="w-3.5 h-3.5 text-[#FEF48D]" /> Ready in 14 days</span>
                <h2 className="mt-6 text-[40px] leading-[1.05] md:text-[68px] md:leading-[1.02] tracking-[-0.03em] font-medium text-white">
                  Start closing more.<br /><span className="font-serif-display italic text-white/95">Autonomously.</span>
                </h2>
                <p className="mt-5 text-[16px] text-white/70 max-w-[420px]">Join 2,400+ growth teams who replaced their revenue stack with Wove.</p>
              </div>
              <div className="flex flex-col sm:flex-row md:justify-end gap-3">
                <LimeCTA size="lg">Book Demo <ArrowRight className="w-4 h-4" /></LimeCTA>
                <button data-magnetic className="relative h-14 px-8 text-[15px] rounded-full font-medium text-white overflow-hidden border border-white/15 hover:bg-white/5 transition-colors">Start Free Trial</button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- 14. Footer ---------------- */
export function FooterSection() {
  const cols = [
    { h: 'Product', l: ['AI Agents', 'CRM', 'Omnichannel', 'Automation', 'Analytics', 'Integrations'] },
    { h: 'Solutions', l: ['D2C', 'B2B SaaS', 'Financial Services', 'Healthcare', 'Enterprise'] },
    { h: 'Company', l: ['About', 'Customers', 'Careers', 'Press', 'Security'] },
    { h: 'Resources', l: ['Docs', 'Blog', 'Changelog', 'API', 'Status'] },
  ]
  return (
    <footer className="relative pt-20 pb-14">
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <div className="grid md:grid-cols-6 gap-10 md:gap-8">
          <div className="md:col-span-2">
            <a href="#" className="inline-flex items-center gap-2">
              <span className="w-8 h-8 rounded-full grid place-items-center bg-black"><Sparkles className="w-4 h-4 text-[#FEF48D]" strokeWidth={2.5} /></span>
              <span className="font-serif-display text-[28px] text-black">Wove</span>
            </a>
            <p className="mt-4 text-[14px] text-black/60 max-w-[280px] leading-relaxed">The autonomous revenue operating system for D2C and B2B enterprises.</p>
            <div className="mt-6"><GlassBadge><span className="w-1.5 h-1.5 rounded-full bg-[#FEF48D]" /> All systems normal</GlassBadge></div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div className="text-[12px] uppercase tracking-wider text-black/45">{c.h}</div>
              <ul className="mt-4 space-y-2.5">
                {c.l.map((it) => <li key={it}><a href="#" className="text-[14px] text-black/70 hover:text-black transition-colors">{it}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 hair-divider" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <div className="text-[12.5px] text-black/50">© 2025 Wove Technologies. All rights reserved.</div>
          <div className="flex items-center gap-6 text-[12.5px] text-black/50">
            <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Security</a><a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
