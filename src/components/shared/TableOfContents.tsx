"use client"

import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

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
          el.id = el.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || Math.random().toString(36).slice(2)
        }
        return {
          id: el.id,
          text: el.textContent || "",
          level: Number(el.tagName.charAt(1))
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
    <div className="sticky top-24 hidden lg:block w-64 shrink-0">
      <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">On this page</h4>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <ul className="space-y-3 text-sm">
          {headings.map((heading) => (
            <li key={heading.id} className={heading.level === 3 ? "ml-4" : ""}>
              <a
                href={`#${heading.id}`}
                className={`block transition-all hover:text-primary ${
                  activeId === heading.id ? "text-primary font-medium translate-x-1" : "text-muted-foreground"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
