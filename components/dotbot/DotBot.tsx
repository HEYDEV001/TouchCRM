"use client"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ParticleField from "./ParticleField"
import Eyes from "./Eyes"
import Face, { BotExpression } from "./Face"
import RadialMenu, { MenuItem } from "./RadialMenu"
import { useMousePosition } from "./hooks/useMousePosition"
import { useOutsideClick } from "./hooks/useOutsideClick"

/** Section → (expression, label). Order defines menu order. */
interface SectionSpec {
  id: string
  label: string
  expression: BotExpression
  emoji: string
  isPrimary?: boolean
}

const SECTIONS: SectionSpec[] = [
  { id: "home", label: "Home", expression: "happy", emoji: "😊" },
  { id: "features", label: "Platform", expression: "robot", emoji: "🤖" },
  { id: "ai-agents", label: "AI Agents", expression: "thinking", emoji: "🧠" },
  { id: "testimonials", label: "Customers", expression: "laughing", emoji: "😄" },
  { id: "pricing", label: "Pricing", expression: "excited", emoji: "💰" },
  { id: "faq", label: "Docs", expression: "studious", emoji: "📚" },
  { id: "cta", label: "Contact", expression: "waving", emoji: "👋" },
  { id: "cta", label: "Book Demo", expression: "waving", emoji: "✨", isPrimary: true },
]

export interface DotBotProps {
  /** Override desktop size; default 76px. */
  size?: number
}

/** Breakpoint-aware body size. */
function useResponsiveSize(base = 76) {
  const [size, setSize] = useState(base)
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      if (w < 640) setSize(56)
      else if (w < 1024) setSize(60)
      else setSize(base)
    }
    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [base])
  return size
}

/** Detect the most-visible section using IntersectionObserver. */
function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    if (typeof window === "undefined") return
    const unique = Array.from(new Set(sectionIds))
    const els = unique
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e)
    if (!els.length) return

    const ratios = new Map<string, number>()
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.intersectionRatio))
        let bestId: string | null = null
        let bestR = 0
        ratios.forEach((r, id) => { if (r > bestR) { bestR = r; bestId = id } })
        if (bestId && bestR > 0) setActive(bestId)
      },
      { threshold: [0, 0.15, 0.35, 0.55, 0.75] },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [sectionIds])
  return active
}

export default function DotBot({ size: sizeProp = 76 }: DotBotProps) {
  const size = useResponsiveSize(sizeProp)
  const mouse = useMousePosition()
  const [hover, setHover] = useState(false)
  const [open, setOpen] = useState(false)
  const [wiggleKey, setWiggleKey] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), [])
  const activeId = useActiveSection(sectionIds)

  // Current expression follows the active section (default = happy).
  const expression: BotExpression = useMemo(() => {
    if (hover) return "laughing"
    const s = SECTIONS.find((x) => x.id === activeId)
    return s?.expression ?? "happy"
  }, [activeId, hover])

  // Slight rotation toward cursor when it’s near the bot (adds “aliveness”).
  const [tilt, setTilt] = useState(0)
  useEffect(() => {
    if (!containerRef.current || !mouse.active) { setTilt(0); return }
    const r = containerRef.current.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = mouse.x - cx
    const dy = mouse.y - cy
    const dist = Math.hypot(dx, dy)
    if (dist > 260) { setTilt(0); return }
    // Rotate up to ±6deg toward cursor (based on horizontal offset)
    const t = Math.max(-1, Math.min(1, dx / 200))
    setTilt(t * 6)
  }, [mouse.x, mouse.y, mouse.active])

  // Occasional wiggle for personality (every 8–14s)
  useEffect(() => {
    let cancelled = false
    const loop = () => {
      const wait = 8000 + Math.random() * 6000
      setTimeout(() => { if (!cancelled) { setWiggleKey((k) => k + 1); loop() } }, wait)
    }
    loop()
    return () => { cancelled = true }
  }, [])

  useOutsideClick(containerRef, () => setOpen(false), open)

  const scrollToSection = useCallback((id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const menuItems: MenuItem[] = useMemo(
    () => SECTIONS.map((s) => ({ id: s.id, label: s.label, emoji: s.emoji, isPrimary: s.isPrimary })),
    [],
  )

  const radius = size * 3.4 // radial menu spread

  return (
    <div
      ref={containerRef}
      className="fixed z-[999] pointer-events-none"
      style={{ right: 32, bottom: 32, width: size, height: size }}
      role="complementary"
      aria-label="Dot Bot — navigation assistant"
    >
      {/* Radial menu is rendered OUTSIDE the pointer-events-none via its own children */}
      <div className="absolute inset-0">
        <RadialMenu
          open={open}
          items={menuItems}
          activeId={activeId}
          onSelect={scrollToSection}
          botSize={size}
          radius={radius}
        />
      </div>

      {/* The bot itself */}
      <motion.button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        onClick={() => setOpen((o) => !o)}
        data-magnetic
        data-cursor="hey"
        className="absolute inset-0 pointer-events-auto outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full"
        style={{ cursor: "pointer" }}
        // Idle breathing + float + hover scale + tilt
        animate={{
          scale: hover ? 1.08 : [1, 1.03, 1],
          y: hover ? -6 : [0, -4, 0],
          rotate: tilt,
        }}
        transition={{
          scale: hover ? { duration: 0.25 } : { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
          y: hover ? { duration: 0.25 } : { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
          rotate: { type: "spring", stiffness: 120, damping: 14 },
        }}
      >
        {/* Wiggle layer — remounts to trigger tiny playful animation */}
        <motion.div
          key={wiggleKey}
          animate={{ rotate: [0, -6, 6, -3, 0] }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <BotBody size={size} expression={expression} mouse={mouse} hover={hover} open={open} />
        </motion.div>

        {/* Glow halo intensifies on hover */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          animate={{ opacity: hover ? 1 : 0.55, scale: hover ? 1.35 : 1.15 }}
          transition={{ duration: 0.35 }}
          style={{
            zIndex: -1,
            background: "radial-gradient(circle, rgba(255,245,157,0.65), rgba(255,245,157,0) 60%)",
            filter: "blur(10px)",
          }}
        />
      </motion.button>
    </div>
  )
}

interface BotBodyProps {
  size: number
  expression: BotExpression
  mouse: ReturnType<typeof useMousePosition>
  hover: boolean
  open: boolean
}

/** Composed SVG body: particles + eyes + face. Kept as pure presentational. */
function BotBody({ size, expression, mouse, hover, open }: BotBodyProps) {
  return (
    <div
      className="relative rounded-full"
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle at 35% 30%, #FFFFFF 0%, #FFF9A6 30%, #FFF59D 65%, #F4D33A 100%)",
        boxShadow: "0 12px 30px -8px rgba(244,197,24,0.55), 0 2px 0 rgba(255,255,255,0.7) inset, 0 -6px 14px rgba(180,140,0,0.15) inset",
      }}
    >
      {/* Ambient orbiting particles (SVG) */}
      <ParticleField size={size} count={70} active={hover || open} />

      {/* SVG features overlay */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
        aria-hidden
      >
        <Eyes
          botSize={size}
          mouse={mouse}
          winkRight={expression === "waving"}
          closed={expression === "laughing"}
        />
        <Face size={size} expression={expression} />
      </svg>

      {/* Specular highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          width: size * 0.35,
          height: size * 0.22,
          left: size * 0.16,
          top: size * 0.08,
          background: "radial-gradient(ellipse, rgba(255,255,255,0.85), rgba(255,255,255,0) 60%)",
          filter: "blur(2px)",
        }}
      />
    </div>
  )
}

export { DotBot }
