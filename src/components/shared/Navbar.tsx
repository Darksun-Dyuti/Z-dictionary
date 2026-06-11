import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import UserMenu from "./UserMenu"
import { CommandPalette } from "./CommandPalette"
import { NavbarMobileSearch } from "./NavbarMobileSearch"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex-1 md:flex-none flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-primary to-primary/60 text-primary-foreground font-bold text-lg shadow-lg group-hover:shadow-primary/25 transition-all">
              A
            </div>
            <span className="font-bold text-xl tracking-tight text-transparent bg-clip-text bg-linear-to-r from-foreground to-foreground/70 hidden sm:inline-block">
              Arcanaz
            </span>
          </Link>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/topic/Artificial%20intelligence" className="text-muted-foreground hover:text-foreground transition-colors">
            Topics
          </Link>
        </nav>

        {/* Global Hidden Search Dialog */}
        <CommandPalette />

        {/* Actions */}
        <div className="flex-1 md:flex-none flex justify-end items-center gap-4">
          <NavbarMobileSearch />
          
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
