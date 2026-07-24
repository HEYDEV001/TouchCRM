'use client'
import React from 'react'
import { cn } from '@/lib/utils'

/** Light-theme glass primitives + CTA wrappers using shadcn LiquidButton from ui/. */
export function GlassCard({ className, children, ...props }) {
  return (
    <div className={cn("relative rounded-[28px] glass-light overflow-hidden", className)} {...props}>
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[28px]"
        style={{ background: 'radial-gradient(120% 60% at 20% 0%, rgba(255,255,255,0.7), transparent 60%)' }} />
      {children}
    </div>
  )
}

export function GlassBadge({ children, className }) {
  return (
    <span className={cn("inline-flex items-center gap-2 h-8 px-3.5 rounded-full text-[12.5px] tracking-tight glass-light text-black/80", className)}>
      {children}
    </span>
  )
}

/** Primary CTA: lime-filled, black text. Uses LiquidButton for shadow/refraction, adds pop color. */
export function LimeCTA({ children, className, size = 'lg', ...props }) {
  const sizeCls = size === 'sm' ? 'h-10 px-5 text-sm' : size === 'md' ? 'h-12 px-6 text-[15px]' : 'h-14 px-8 text-[15px]'
  return (
    <button
      data-magnetic
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight overflow-hidden group transition-transform duration-300 hover:scale-[1.03]",
        sizeCls, className
      )}
      style={{ background: '#E1FE03', color: '#000', boxShadow: '0 10px 30px -10px rgba(225,254,3,0.7), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -12px 24px rgba(0,0,0,0.08)' }}
      {...props}
    >
      <span aria-hidden className="absolute inset-x-2 top-0 h-1/2 rounded-t-full pointer-events-none opacity-70 mix-blend-screen"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)' }} />
      <span aria-hidden className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(120% 80% at 30% 0%, rgba(255,255,255,0.7), transparent 60%)' }} />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  )
}

/** Ghost / secondary glass CTA (light, translucent). */
export function GhostCTA({ children, className, size = 'lg', ...props }) {
  const sizeCls = size === 'sm' ? 'h-10 px-5 text-sm' : size === 'md' ? 'h-12 px-6 text-[15px]' : 'h-14 px-8 text-[15px]'
  return (
    <button
      data-magnetic
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight overflow-hidden group transition-transform duration-300 hover:scale-[1.03] text-black",
        sizeCls, className
      )}
      style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)', border: '1px solid rgba(0,0,0,0.08)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 6px 20px -10px rgba(0,0,0,0.15)' }}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  )
}

/** Dark inverse CTA — used on light backgrounds for high-contrast primary actions. */
export function DarkCTA({ children, className, size = 'lg', ...props }) {
  const sizeCls = size === 'sm' ? 'h-10 px-5 text-sm' : size === 'md' ? 'h-12 px-6 text-[15px]' : 'h-14 px-8 text-[15px]'
  return (
    <button
      data-magnetic
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight overflow-hidden group transition-transform duration-300 hover:scale-[1.03] text-white",
        sizeCls, className
      )}
      style={{ background: '#000', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -12px 24px rgba(0,0,0,0.4)' }}
      {...props}
    >
      <span aria-hidden className="absolute inset-x-2 top-0 h-1/2 rounded-t-full pointer-events-none opacity-40 mix-blend-screen"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)' }} />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  )
}
