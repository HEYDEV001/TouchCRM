'use client'

export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#D7D7D7' }} />
      <div className="absolute -top-40 -left-40 w-[720px] h-[720px] rounded-full blur-[130px] anim-drift anim-pulse-soft"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(151,186,255,0.75), rgba(151,186,255,0) 60%)' }} />
      <div className="absolute top-1/4 -right-32 w-[680px] h-[680px] rounded-full blur-[140px] anim-float-slow"
        style={{ background: 'radial-gradient(circle at 60% 40%, rgba(225,254,3,0.35), rgba(225,254,3,0) 60%)' }} />
      <div className="absolute -bottom-52 left-1/3 w-[900px] h-[600px] rounded-full blur-[150px] anim-drift"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(151,186,255,0.4), transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 75%)',
      }} />
    </div>
  )
}
