"use client"

import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const placeholders = [
  "Search for any word...",
  "Look up 'Artificial Intelligence'...",
  "Discover the meaning of 'Serendipity'...",
  "Explore science topics...",
  "Find synonyms and origins...",
]

export function HomeSearchButton() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % placeholders.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <button
      onClick={() => document.dispatchEvent(new CustomEvent("open-command-palette"))}
      className="inline-flex items-center gap-4 transition-all duration-300 border border-white/10 hover:border-white/20 hover:bg-white/5 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] px-6 py-4 relative h-16 w-full max-w-2xl justify-start rounded-full bg-background/60 text-lg font-normal text-muted-foreground shadow-2xl backdrop-blur-xl group overflow-hidden"
    >
      <Search className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
      <div className="relative flex-1 flex items-center h-full text-left overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 right-0 truncate text-base md:text-lg"
          >
            {placeholders[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      <kbd className="pointer-events-none absolute right-4 top-4.5 hidden h-7 select-none items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 font-mono text-[13px] font-medium opacity-100 sm:flex shrink-0">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  )
}
