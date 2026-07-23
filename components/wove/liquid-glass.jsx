'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

/**
 * Global SVG filter for Apple-style liquid glass distortion.
 * Mount once (in the page root). Buttons reference it via filter: url(#liquid-glass).
 */
export function LiquidGlassFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="turb" />
          <feGaussianBlur in="turb" stdDeviation="1.2" result="softTurb" />
          <feDisplacementMap in="SourceGraphic" in2="softTurb" scale="22" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-glass-strong" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.014" numOctaves="2" seed="3" result="turb" />
          <feGaussianBlur in="turb" stdDeviation="2" result="softTurb" />
          <feDisplacementMap in="SourceGraphic" in2="softTurb" scale="40" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}

const liquidBtn = cva(
  "relative inline-flex items-center justify-center gap-2 select-none font-medium tracking-tight overflow-hidden transition-[transform,box-shadow] duration-300 ease-out group",
  {
    variants: {
      variant: {
        primary: 'text-[#031B0A]',
        ghost: 'text-white',
        metal: 'text-white',
      },
      size: {
        sm: 'h-10 px-5 text-sm rounded-full',
        md: 'h-12 px-7 text-[15px] rounded-full',
        lg: 'h-14 px-8 text-[15px] rounded-full',
      }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
)

export const LiquidButton = React.forwardRef(function LiquidButton(
  { className, variant = 'primary', size = 'md', children, ...props }, ref
) {
  const isPrimary = variant === 'primary'
  const isMetal = variant === 'metal'
  return (
    <button ref={ref} data-magnetic className={cn(liquidBtn({ variant, size }), className)} {...props}>
      {/* Distortion glass layer */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          filter: 'url(#liquid-glass)',
          background: isPrimary
            ? 'linear-gradient(180deg, rgba(68,240,138,0.98) 0%, rgba(37,211,102,0.98) 100%)'
            : isMetal
              ? 'linear-gradient(180deg, rgba(80,80,90,0.7), rgba(20,20,25,0.7))'
              : 'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))',
        }}
      />
      {/* Inner highlight ring */}
      <span aria-hidden className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: isPrimary
            ? 'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -12px 20px rgba(0,80,30,0.35), 0 20px 40px -12px rgba(37,211,102,0.55), 0 0 0 1px rgba(255,255,255,0.15)'
            : 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -8px 20px rgba(0,0,0,0.4), 0 20px 40px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      />
      {/* Specular light streak */}
      <span aria-hidden
        className="absolute inset-x-2 top-0 h-1/2 rounded-t-full pointer-events-none opacity-70 mix-blend-screen"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 100%)' }}
      />
      {/* Refraction hover glow */}
      <span aria-hidden
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(120% 80% at 30% 0%, rgba(255,255,255,0.35), transparent 60%)' }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  )
})

export function GlassCard({ className, children, ...props }) {
  return (
    <div className={cn("relative rounded-[28px] glass-thick overflow-hidden", className)} {...props}>
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[28px]"
        style={{ background: 'radial-gradient(120% 60% at 20% 0%, rgba(255,255,255,0.06), transparent 60%)' }} />
      {children}
    </div>
  )
}

export function GlassBadge({ children, className }) {
  return (
    <span className={cn("inline-flex items-center gap-2 h-8 px-3.5 rounded-full text-[12.5px] tracking-tight glass-thin text-white/85", className)}>
      {children}
    </span>
  )
}
