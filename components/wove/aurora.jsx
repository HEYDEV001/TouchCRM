'use client'

export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0" style={{ background: '#070707' }} />
      {/* Green blob top-left */}
      <div
        className="absolute -top-40 -left-40 w-[720px] h-[720px] rounded-full blur-[120px] anim-drift anim-pulse-soft"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(37,211,102,0.35), rgba(37,211,102,0) 60%)',
        }}
      />
      {/* Cyan blob right */}
      <div
        className="absolute top-1/4 -right-32 w-[640px] h-[640px] rounded-full blur-[130px] anim-float-slow"
        style={{
          background: 'radial-gradient(circle at 60% 40%, rgba(56,189,248,0.28), rgba(56,189,248,0) 60%)',
        }}
      />
      {/* Neon accent bottom */}
      <div
        className="absolute -bottom-52 left-1/3 w-[900px] h-[600px] rounded-full blur-[140px] anim-drift"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(68,240,138,0.22), rgba(0,0,0,0) 70%)',
        }}
      />
      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, black 30%, transparent 75%)',
      }} />
      {/* vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 0%, transparent 40%, rgba(7,7,7,0.7) 100%)' }} />
    </div>
  )
}
