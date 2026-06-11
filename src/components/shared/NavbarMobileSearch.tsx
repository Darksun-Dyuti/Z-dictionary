"use client"

import { Search } from "lucide-react"

export function NavbarMobileSearch() {
  return (
    <button 
      onClick={() => document.dispatchEvent(new CustomEvent("open-command-palette"))}
      className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
    >
      <Search className="w-5 h-5" />
    </button>
  )
}
