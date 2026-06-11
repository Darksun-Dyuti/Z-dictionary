import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background/40 backdrop-blur-sm mt-10">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-primary to-primary/60 text-primary-foreground font-bold text-lg">
                A
              </div>
              <span className="font-bold text-xl tracking-tight text-transparent bg-clip-text bg-linear-to-r from-foreground to-foreground/70">
                Arcanaz
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Explore the meaning, pronunciation, and origins of any word in a modern, elegant knowledge platform.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Dictionary</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Encyclopedia</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Word of the Day</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Community</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">API Documentation</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Arcanaz. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">GitHub</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Discord</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
