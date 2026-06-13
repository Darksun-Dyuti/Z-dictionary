"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { HomeSearchButton } from "@/components/shared/HomeSearchButton"
import {
  ArrowRight,
  Atom,
  Brain,
  Clock,
  Cpu,
  Feather,
  Palette,
  Sparkles,
  TrendingUp,
} from "lucide-react"

/* ─── Animation helpers ─────────────────────────────────────────── */
const stagger = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay,
    },
  },
})

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={stagger(delay)}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Data ──────────────────────────────────────────────────────── */
const domains = [
  { title: "Philosophy", subtitle: "Explore timeless questions", icon: Feather, href: "/topic/Philosophy", accent: "from-amber-900/20 to-amber-800/5" },
  { title: "Science", subtitle: "Understand the natural world", icon: Atom, href: "/topic/Science", accent: "from-blue-900/20 to-blue-800/5" },
  { title: "History", subtitle: "Trace the arc of civilization", icon: Clock, href: "/topic/History", accent: "from-rose-900/20 to-rose-800/5" },
  { title: "Technology", subtitle: "Navigate the digital frontier", icon: Cpu, href: "/topic/Technology", accent: "from-emerald-900/20 to-emerald-800/5" },
  { title: "Psychology", subtitle: "Understand the human mind", icon: Brain, href: "/topic/Psychology", accent: "from-violet-900/20 to-violet-800/5" },
  { title: "Art", subtitle: "Discover creative expression", icon: Palette, href: "/topic/Art", accent: "from-pink-900/20 to-pink-800/5" },
]

const trending = [
  "Serendipity", "Quantum Computing", "Stoicism", "Renaissance",
  "Consciousness", "Entropy", "Epistemology", "Metamorphosis",
]

const journeys = [
  {
    chain: ["Artificial Intelligence", "Machine Learning", "Neural Networks", "Deep Learning", "Robotics"],
  },
  {
    chain: ["Philosophy", "Epistemology", "Consciousness", "Free Will", "Ethics"],
  },
  {
    chain: ["History", "Renaissance", "Enlightenment", "Industrial Revolution", "Modernity"],
  },
]

const featured = [
  {
    title: "Artificial Intelligence",
    category: "Technology",
    description: "The simulation of human intelligence processes by machines — reshaping civilization in real time.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1400&auto=format&fit=crop",
    href: "/topic/Artificial%20Intelligence",
    span: "md:col-span-2",
  },
  {
    title: "Consciousness",
    category: "Philosophy · Psychology",
    description: "The most profound mystery in science. What does it mean to be aware?",
    image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=800&auto=format&fit=crop",
    href: "/topic/Consciousness",
    span: "md:col-span-1",
  },
]

/* ─── Component ─────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="flex flex-col">

      {/* ══ HERO ════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center justify-center min-h-[92vh] px-6 pb-24 text-center overflow-hidden hero-ambient">
        {/* Ambient orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-150 pointer-events-none -z-10">
          <div className="absolute inset-0 bg-radial-[ellipse_60%_50%_at_50%_40%] from-[oklch(0.76_0.13_72/0.07)] to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-125 h-75 bg-radial-[ellipse_at_center] from-[oklch(0.70_0.08_240/0.04)] to-transparent blur-3xl" />
        </div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <span className="section-eyebrow tracking-[0.18em]">The Modern Knowledge Platform</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-editorial text-[clamp(3rem,9vw,7.5rem)] text-foreground max-w-5xl mx-auto mb-4 leading-[1.02]"
        >
          Knowledge Beyond
          <br />
          <span className="text-display" style={{ color: "var(--gold)" }}>
            Definitions.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Explore ideas. Discover wisdom. AI-powered search across dictionaries, 
          encyclopedias, and curated learning paths.
        </motion.p>

        {/* Search — the centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl mx-auto"
        >
          <HomeSearchButton />
        </motion.div>

        {/* Trending pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto"
        >
          <span className="text-xs text-muted-foreground/60 font-medium mr-1 flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3" /> Trending
          </span>
          {trending.map((tag, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.85 + i * 0.05 }}
            >
              <Link
                href={tag.includes(" ") ? `/topic/${encodeURIComponent(tag)}` : `/word/${tag.toLowerCase()}`}
                className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-muted/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-(--gold)/40 hover:bg-(--gold-muted)/30 transition-all duration-200"
              >
                {tag}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40"
        >
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase">Explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-linear-to-b from-(--gold)/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ══ FEATURED KNOWLEDGE ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeIn className="mb-12">
          <div className="flex items-end justify-between">
            <div>
              <p className="section-eyebrow mb-3">Today&apos;s Spotlight</p>
              <h2 className="text-editorial text-4xl md:text-5xl text-foreground">
                Featured Knowledge
              </h2>
            </div>
            <Link
              href="/topic/Knowledge"
              className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors duration-200 group"
            >
              View all <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-4">
          {featured.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1} className={item.span}>
              <Link href={item.href} className="group block h-full">
                <article className="editorial-card rounded-2xl overflow-hidden h-full min-h-80 relative flex flex-col justify-end">
                  {/* Background image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      unoptimized
                      fill
                      src={item.image}
                      alt={item.title}
                      className="object-cover opacity-30 group-hover:opacity-45 group-hover:scale-[1.03] transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-transparent" />
                  </div>
                  {/* Content */}
                  <div className="relative z-10 p-7">
                    <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-gold mb-3">
                      {item.category}
                    </p>
                    <h3 className="text-editorial text-3xl md:text-4xl text-foreground mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-sm">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold group-hover:gap-2.5 transition-all duration-200">
                      Read article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══ DIVIDER ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="divider-editorial" />
      </div>

      {/* ══ DOMAINS ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeIn className="mb-12">
          <p className="section-eyebrow mb-3">Explore by Domain</p>
          <h2 className="text-editorial text-4xl md:text-5xl text-foreground">
            Where will you explore today?
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {domains.map((domain, i) => {
            const Icon = domain.icon
            return (
              <FadeIn key={domain.title} delay={i * 0.07}>
                <Link href={domain.href} className="group block">
                  <article className="editorial-card rounded-2xl p-6 h-full flex flex-col justify-between min-h-40">
                    <div className={`self-start p-2.5 rounded-xl bg-linear-to-br ${domain.accent} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-5 h-5 text-foreground/70" />
                    </div>
                    <div>
                      <h3 className="text-editorial text-2xl text-foreground mb-1 leading-tight">
                        {domain.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {domain.subtitle}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-gold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0">
                      <span className="text-xs font-medium">Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </article>
                </Link>
              </FadeIn>
            )
          })}
        </div>
      </section>

      {/* ══ DIVIDER ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="divider-editorial" />
      </div>

      {/* ══ LEARNING JOURNEYS ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeIn className="mb-12">
          <p className="section-eyebrow mb-3">Knowledge Pathways</p>
          <h2 className="text-editorial text-4xl md:text-5xl text-foreground">
            Follow the thread
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-base leading-relaxed">
            Every concept connects to another. Explore curated learning journeys designed to guide your curiosity.
          </p>
        </FadeIn>

        <div className="space-y-4">
          {journeys.map((journey, ji) => (
            <FadeIn key={ji} delay={ji * 0.12}>
              <div className="editorial-card rounded-2xl p-6">
                <div className="flex flex-wrap items-center gap-2">
                  {journey.chain.map((topic, ti) => (
                    <div key={topic} className="flex items-center gap-2">
                      <Link
                        href={`/topic/${encodeURIComponent(topic)}`}
                        className="px-4 py-2 rounded-full text-sm font-medium border border-border/60 bg-muted/30 hover:border-(--gold)/50 hover:bg-(--gold-muted)/40 hover:text-foreground text-muted-foreground transition-all duration-200"
                      >
                        {topic}
                      </Link>
                      {ti < journey.chain.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══ DIVIDER ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="divider-editorial" />
      </div>

      {/* ══ WORD OF THE DAY ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeIn className="mb-12">
          <p className="section-eyebrow mb-3">Word of the Day</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Link href="/word/serendipity" className="group block">
            <article className="editorial-card rounded-2xl p-10 md:p-14 relative overflow-hidden">
              {/* Ambient */}
              <div className="absolute top-0 right-0 w-100 h-75 bg-radial-[ellipse_at_top_right] from-[oklch(0.76_0.13_72/0.08)] to-transparent pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-xs text-gold font-medium tracking-[0.12em] uppercase">Today&apos;s Word</span>
                  </div>
                  <h2 className="text-editorial text-[clamp(3rem,7vw,6rem)] text-foreground mb-5 leading-none">
                    serendipity
                  </h2>
                  <p className="text-sm font-mono text-muted-foreground mb-6">/ˌser.ənˈdɪp.ɪ.ti/</p>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                    The occurrence of events by chance in a happy or beneficial way. 
                    The art of finding beautiful things you weren&apos;t looking for.
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2 text-gold font-medium group-hover:gap-3 transition-all duration-300">
                  <span className="text-sm">Read full definition</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          </Link>
        </FadeIn>
      </section>

    </div>
  )
}
