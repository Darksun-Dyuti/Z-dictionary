import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "./ThemeToggle"
import UserMenu from "./UserMenu"
import { CommandPalette } from "./CommandPalette"
import { NavbarScrollWrapper } from "./NavbarScrollWrapper"

export default function Navbar() {
  return (
    <NavbarScrollWrapper>
      <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between gap-6">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative">
            <Image
              src="/logo-latest.png"
              alt="Arcanaz"
              width={28}
              height={28}
              className="w-7 h-7 rounded-lg object-cover transition-all duration-300 group-hover:opacity-90"
            />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10 group-hover:ring-(--gold)/40 transition-all duration-300" />
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-foreground/90 group-hover:text-foreground transition-colors duration-200 hidden sm:inline-block">
            Arcanaz
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "Explore", href: "/topic/Knowledge" },
            { label: "Dictionary", href: "/word/serendipity" },
            { label: "Encyclopedia", href: "/topic/Artificial%20Intelligence" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/60 transition-all duration-200 font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>

      {/* Global search dialog */}
      <CommandPalette />
    </NavbarScrollWrapper>
  )
}
