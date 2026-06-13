"use client"

import { useState } from "react"
import { Sparkles, Loader2, ChevronDown } from "lucide-react"
import { explainWithAI } from "@/server/actions"
import { motion, AnimatePresence } from "framer-motion"

interface AiExplanationCardProps {
  query: string
  type: "dictionary" | "encyclopedia"
}

export default function AiExplanationCard({ query, type }: AiExplanationCardProps) {
  const [explanation, setExplanation] = useState<string | null>(null)
  const [loadingMode, setLoadingMode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(true)

  const handleExplain = async (mode: "simple" | "eli10" | "summarize") => {
    setLoadingMode(mode)
    setError(null)
    try {
      const result = await explainWithAI(query, type, mode)
      if (result.success) {
        setExplanation(result.text as string)
        setExpanded(true)
      } else {
        setError(result.error as string)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to get AI explanation")
    } finally {
      setLoadingMode(null)
    }
  }

  const modes =
    type === "dictionary"
      ? [
          { key: "simple" as const, label: "Explain Simply" },
          { key: "eli10" as const, label: "Explain Like I'm 10" },
        ]
      : [
          { key: "summarize" as const, label: "Summarize" },
          { key: "eli10" as const, label: "Explain Like I'm 10" },
        ]

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        background: "oklch(from var(--card) l c h / 0.6)",
        backdropFilter: "blur(20px)",
        borderColor: "oklch(0.76 0.13 72 / 0.2)",
        boxShadow: "0 0 0 1px oklch(0.76 0.13 72 / 0.08) inset, 0 4px 24px oklch(0 0 0 / 0.08)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "oklch(0.76 0.13 72 / 0.12)" }}>
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg" style={{ background: "oklch(0.76 0.13 72 / 0.12)" }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--gold)" }} />
          </div>
          <span className="text-sm font-semibold text-foreground">AI Assistant</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">· Powered by Gemini</span>
        </div>
        {explanation && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="p-1.5 rounded-lg hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground"
          >
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "" : "-rotate-90"}`} />
          </button>
        )}
      </div>

      {/* Action buttons */}
      <div className="px-6 py-4 flex flex-wrap gap-2">
        {modes.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleExplain(key)}
            disabled={loadingMode !== null}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 disabled:opacity-50"
            style={{
              borderColor: loadingMode === key ? "oklch(0.76 0.13 72 / 0.5)" : "oklch(from var(--border) l c h / 0.7)",
              background: loadingMode === key ? "oklch(0.76 0.13 72 / 0.12)" : "oklch(from var(--muted) l c h / 0.4)",
              color: loadingMode === key ? "var(--gold)" : "oklch(from var(--foreground) l c h / 0.8)",
            }}
          >
            {loadingMode === key ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Sparkles className="h-3 w-3 opacity-60" />
            )}
            {label}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mx-6 mb-4 p-4 rounded-xl border border-destructive/20 bg-destructive/5 text-sm">
          <p className="font-medium text-destructive mb-1">Unavailable</p>
          <p className="text-muted-foreground text-xs">{error}</p>
        </div>
      )}

      {/* Result */}
      <AnimatePresence>
        {explanation && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div
              className="mx-6 mb-6 p-5 rounded-xl text-sm leading-[1.85] text-foreground/90"
              style={{
                background: "oklch(from var(--muted) l c h / 0.3)",
                border: "1px solid oklch(from var(--border) l c h / 0.5)",
              }}
            >
              {explanation.split("\n").map((paragraph, idx) => {
                if (!paragraph.trim()) return <br key={idx} />
                const parts = paragraph.split(/(\*\*.*?\*\*)/g)
                return (
                  <p key={idx} className="mb-2 last:mb-0">
                    {parts.map((part, i) => {
                      if (part.startsWith("**") && part.endsWith("**")) {
                        return (
                          <strong key={i} className="font-semibold" style={{ color: "var(--gold)" }}>
                            {part.slice(2, -2)}
                          </strong>
                        )
                      }
                      return part
                    })}
                  </p>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
