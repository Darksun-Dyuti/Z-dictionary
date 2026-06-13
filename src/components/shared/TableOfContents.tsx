"use client"

import { useEffect, useState } from "react"

interface TOCItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll(".prose h2, .prose h3"))
      const items: TOCItem[] = elements.map((el) => {
        if (!el.id) {
          el.id =
            el.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
            Math.random().toString(36).slice(2)
        }
        return {
          id: el.id,
          text: el.textContent || "",
          level: Number(el.tagName.charAt(1)),
        }
      })
      setHeadings(items)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <aside className="sticky top-24 hidden lg:block w-56 shrink-0">
      <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-muted-foreground/60 mb-4">
        On this page
      </p>
      <nav className="space-y-0.5">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`
              block py-1.5 text-[13px] leading-snug transition-all duration-200 rounded-md
              ${heading.level === 3 ? "pl-3" : ""}
              ${
                activeId === heading.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground/60 hover:text-muted-foreground"
              }
            `}
            style={
              activeId === heading.id
                ? { color: "var(--gold)" }
                : undefined
            }
          >
            <span className={`inline-flex items-center gap-1.5 ${activeId === heading.id ? "translate-x-1" : ""} transition-transform duration-200`}>
              {activeId === heading.id && (
                <span className="w-1 h-1 rounded-full inline-block" style={{ background: "var(--gold)" }} />
              )}
              {heading.text}
            </span>
          </a>
        ))}
      </nav>
    </aside>
  )
}
