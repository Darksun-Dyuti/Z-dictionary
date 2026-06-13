"use client"

import { Search } from "lucide-react"

export function NavbarSearchTrigger() {
  return (
    <button
      id="navbar-search-btn"
      onClick={() => document.dispatchEvent(new CustomEvent("open-command-palette"))}
      className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-lg border border-border/60 bg-muted/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200 text-sm group"
    >
      <Search className="w-3.5 h-3.5" />
      <span className="text-xs hidden lg:inline">Search...</span>
      <kbd className="ml-1 hidden lg:inline-flex h-4 items-center gap-0.5 rounded border border-border/60 bg-background/60 px-1.5 font-mono text-[10px] font-medium opacity-70">
        ⌘K
      </kbd>
    </button>
  )
}
