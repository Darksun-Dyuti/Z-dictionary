import Link from "next/link"
import Image from "next/image"

const links = {
  Product: [
    { label: "Dictionary", href: "/word/serendipity" },
    { label: "Encyclopedia", href: "/topic/Knowledge" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Word of the Day", href: "/word/serendipity" },
  ],
  Explore: [
    { label: "Philosophy", href: "/topic/Philosophy" },
    { label: "Science", href: "/topic/Science" },
    { label: "Technology", href: "/topic/Technology" },
    { label: "History", href: "/topic/History" },
  ],
  Company: [
    { label: "About", href: "/" },
    { label: "Privacy Policy", href: "/" },
    { label: "Terms of Service", href: "/" },
    { label: "API", href: "/" },
  ],
}

export default function Footer() {
  return (
    <footer
      className="mt-0 relative"
      style={{ borderTop: "1px solid oklch(from var(--border) l c h / 0.4)" }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">

        {/* Top: tagline */}
        <div className="mb-16">
          <p
            className="text-editorial text-[clamp(2rem,4vw,3.5rem)] text-foreground/90 max-w-md leading-tight"
          >
            Knowledge Beyond Definitions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">

          {/* Brand col */}
          <div className="col-span-2 lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <Image
                  src="/logo-latest.png"
                  alt="Arcanaz"
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-lg object-cover"
                />
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10 group-hover:ring-(--gold)/30 transition-all" />
              </div>
              <span className="font-semibold text-[15px] tracking-tight text-foreground/80 group-hover:text-foreground transition-colors">
                Arcanaz
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The modern knowledge platform. Explore definitions, encyclopedia articles, and AI-guided learning journeys.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground/60">
              {["Twitter", "GitHub", "Discord"].map((social) => (
                <span
                  key={social}
                  className="hover:text-foreground cursor-pointer transition-colors duration-200"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground/50">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/50"
          style={{ borderTop: "1px solid oklch(from var(--border) l c h / 0.3)" }}
        >
          <p>© {new Date().getFullYear()} Arcanaz. All rights reserved.</p>
          <p
            className="text-editorial text-sm"
            style={{ color: "oklch(0.76 0.13 72 / 0.5)" }}
          >
            Explore Ideas. Discover Wisdom.
          </p>
        </div>
      </div>
    </footer>
  )
}
