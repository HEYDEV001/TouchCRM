"use client"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import DotSphere from "./DotSphere"
import OrbitalMenu, { OrbitalItem } from "./OrbitalMenu"
import { useMousePosition } from "./hooks/useMousePosition"
import { useOutsideClick } from "./hooks/useOutsideClick"
import { useShyFollow } from "./hooks/useShyFollow"

interface SectionSpec {
  id: string
  label: string
  accent: string
  isPrimary?: boolean
}

const SECTIONS: SectionSpec[] = [
  { id: "home", label: "Attention", accent: "#FEF48D" },
  { id: "trusted", label: "Trust", accent: "#FEF48D" },
  { id: "problem", label: "Problem", accent: "#FF9AA0" },
  { id: "ai-agents", label: "Solution", accent: "#97BAFF" },
  { id: "features", label: "Features", accent: "#FEF48D" },
  { id: "testimonials", label: "Proof", accent: "#97BAFF" },
  { id: "automation", label: "Ease of Use", accent: "#FEF48D" },
  { id: "pricing", label: "Pricing", accent: "#000000" },
  { id: "faq", label: "FAQ", accent: "#000000" },
  { id: "cta", label: "Book Demo", accent: "#FEF48D", isPrimary: true },
]

function useResponsiveSize(base = 72) {
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

function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    if (typeof window === "undefined") return
    const unique = Array.from(new Set(sectionIds))
    const els = unique.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e)
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

export interface DotBotProps {
  size?: number
}

export default function DotBot({ size: sizeProp = 72 }: DotBotProps) {
  const size = useResponsiveSize(sizeProp)
  const mouse = useMousePosition()
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), [])
  const activeId = useActiveSection(sectionIds)

  // Shy following behaviour with resting position bottom-right
  const [rest, setRest] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const compute = () => setRest({ x: window.innerWidth - 100, y: window.innerHeight - 100 })
    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [])

  const { x, y, frozen } = useShyFollow(
    open ? { x: 0, y: 0, active: false } : mouse,
    {
      offset: 150,
      freezeInside: 130,
      unfreezeOutside: 210,
      restingX: rest.x,
      restingY: rest.y,
    },
  )

  useOutsideClick(containerRef, () => setOpen(false), open)

  // Accent colour reflects current section (subtle context awareness)
  const accent = useMemo(() => {
    const s = SECTIONS.find((x) => x.id === activeId)
    return s?.accent ?? "#FEF48D"
  }, [activeId])

  const scrollToSection = useCallback((id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const menuItems: OrbitalItem[] = useMemo(
    () => SECTIONS.map((s) => ({ id: s.id, label: s.label, isPrimary: s.isPrimary })),
    [],
  )

  // When menu is open, park the bot at viewport center so all orbits fit comfortably inside the viewport.
  const [parked, setParked] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const compute = () => setParked({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [])

  const displayX = open ? parked.x : x
  const displayY = open ? parked.y : y

  return (
    <motion.div
      ref={containerRef}
      role="complementary"
      aria-label="Dot Bot — navigation companion"
      className="fixed z-[999] pointer-events-none"
      style={{
        top: 0,
        left: 0,
        width: size,
        height: size,
        x: displayX,
        y: displayY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Orbital menu — rendered above bot so orbits pass in front/behind (via z-index per ball) */}
      <div className="absolute inset-0">
        <OrbitalMenu
          open={open}
          items={menuItems}
          activeId={activeId}
          onSelect={scrollToSection}
          botSize={size}
        />
      </div>

      {/* Frozen indicator ring — hint that you can click the bot */}
      {frozen && !open && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: [1, 1.15, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            inset: -10,
            border: "1px dashed rgba(0,0,0,0.35)",
          }}
        />
      )}

      {/* The dot-sphere bot */}
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
        data-cursor={frozen ? "click me" : "hey"}
        className="absolute inset-0 pointer-events-auto outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-full"
        style={{ cursor: "pointer", background: "transparent" }}
        animate={{
          scale: hover || open ? 1.1 : frozen ? 1.05 : [1, 1.03, 1],
        }}
        transition={{
          scale: hover || open || frozen
            ? { duration: 0.3 }
            : { duration: 4.6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <DotSphere
          size={size}
          count={90}
          color="#000000"
          accentColor={accent}
          rotationSpeed={open ? 0.014 : hover ? 0.011 : 0.006}
          active={open || hover}
          wobble
        />

        {/* Subtle halo */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          animate={{
            opacity: hover || open ? 0.95 : 0.5,
            scale: hover || open ? 1.4 : 1.15,
          }}
          transition={{ duration: 0.4 }}
          style={{
            zIndex: -1,
            background: `radial-gradient(circle, ${accent}66, ${accent}00 60%)`,
            filter: "blur(10px)",
          }}
        />
      </motion.button>
    </motion.div>
  )
}

export { DotBot }
