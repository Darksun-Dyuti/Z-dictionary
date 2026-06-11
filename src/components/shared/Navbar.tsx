import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "./ThemeToggle"
import UserMenu from "./UserMenu"
import { CommandPalette } from "./CommandPalette"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex-1 md:flex-none flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo-latest.png"
              alt="Arcanaz Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg shadow-lg shadow-blue-300 dark:shadow-white/40 group-hover:shadow-primary/50 transition-all object-cover"
            />
            <span className="font-bold text-xl tracking-tight text-transparent bg-clip-text bg-linear-to-r from-foreground to-foreground/70 hidden sm:inline-block">
              Arcanaz
            </span>
          </Link>
        </div>



        {/* Global Hidden Search Dialog */}
        <CommandPalette />

        {/* Actions */}
        <div className="flex-1 md:flex-none flex justify-end items-center gap-4">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
