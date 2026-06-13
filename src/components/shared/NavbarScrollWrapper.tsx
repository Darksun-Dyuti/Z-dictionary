"use client"

import { useEffect, useState } from "react"

export function NavbarScrollWrapper({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-2xl shadow-[0_1px_0_oklch(from_var(--border)_l_c_h/0.6)]"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      {children}
    </header>
  )
}
