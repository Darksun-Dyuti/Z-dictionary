"use client"

import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const placeholders = [
  "Search for any word...",
  "What is consciousness?",
  "Explore Artificial Intelligence...",
  "Define serendipity...",
  "Discover the Renaissance...",
  "What is quantum entanglement?",
]

export function HomeSearchButton() {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % placeholders.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.button
      id="hero-search-btn"
      whileHover={{ scale: 1.015 }}
      whileFocus={{ scale: 1.015 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => document.dispatchEvent(new CustomEvent("open-command-palette"))}
      className="relative inline-flex items-center gap-4 w-full max-w-2xl h-16 px-6 rounded-2xl border text-left cursor-pointer overflow-hidden"
      style={{
        background: "oklch(from var(--card) l c h / 0.7)",
        backdropFilter: "blur(24px) saturate(180%)",
        borderColor: hovered
          ? "oklch(0.76 0.13 72 / 0.4)"
          : "oklch(from var(--border) l c h / 0.7)",
        boxShadow: hovered
          ? "0 0 0 1px oklch(0.76 0.13 72 / 0.15), 0 8px 40px oklch(0 0 0 / 0.15), 0 1px 0 oklch(1 0 0 / 0.06) inset"
          : "0 4px 24px oklch(0 0 0 / 0.08), 0 1px 0 oklch(1 0 0 / 0.05) inset",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Icon */}
      <Search
        className="w-5 h-5 shrink-0 transition-colors duration-300"
        style={{ color: hovered ? "var(--gold)" : "oklch(from var(--muted-foreground) l c h / 0.6)" }}
      />

      {/* Animated placeholder */}
      <div className="relative flex-1 overflow-hidden h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center text-[15px] text-muted-foreground/70 font-normal truncate"
          >
            {placeholders[index]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Kbd shortcut */}
      <div className="shrink-0 flex items-center gap-1 ml-2">
        <kbd className="hidden sm:inline-flex h-7 items-center gap-0.5 rounded-lg border border-border/50 bg-muted/50 px-2 font-mono text-[11px] font-medium text-muted-foreground/70">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      {/* Subtle inner glow on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 80% at 0% 50%, oklch(0.76 0.13 72 / 0.06), transparent)",
            }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}
