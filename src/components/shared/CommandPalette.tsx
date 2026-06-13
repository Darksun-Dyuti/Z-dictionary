"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Book, Globe, Loader2, ArrowRight } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

const HISTORY_KEY = "arcanaz-search-history"
const MAX_HISTORY = 8

function getHistory(): { term: string; type: "word" | "topic"; href: string }[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]")
  } catch {
    return []
  }
}

function addToHistory(term: string, type: "word" | "topic", href: string) {
  const history = getHistory()
  const filtered = history.filter((h) => h.term !== term)
  filtered.unshift({ term, type, href })
  localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered.slice(0, MAX_HISTORY)))
}

const trendingSuggestions = [
  { term: "Serendipity", type: "word" as const, href: "/word/serendipity" },
  { term: "Artificial Intelligence", type: "topic" as const, href: "/topic/Artificial%20Intelligence" },
  { term: "Consciousness", type: "topic" as const, href: "/topic/Consciousness" },
  { term: "Stoicism", type: "topic" as const, href: "/topic/Stoicism" },
  { term: "Ephemeral", type: "word" as const, href: "/word/ephemeral" },
  { term: "Quantum Computing", type: "topic" as const, href: "/topic/Quantum%20Computing" },
]

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [dictSuggestions, setDictSuggestions] = React.useState<string[]>([])
  const [encycSuggestions, setEncycSuggestions] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  // Derive history directly from localStorage when dialog opens — no setState needed
  const history = React.useMemo(() => (open ? getHistory() : []), [open])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    const handleCustomOpen = () => setOpen(true)

    document.addEventListener("keydown", down)
    document.addEventListener("open-command-palette", handleCustomOpen)

    return () => {
      document.removeEventListener("keydown", down)
      document.removeEventListener("open-command-palette", handleCustomOpen)
    }
  }, [])

  React.useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setDictSuggestions([])
        setEncycSuggestions([])
        return
      }
      setLoading(true)
      try {
        const [dictRes, encycRes] = await Promise.all([
          fetch(`https://api.datamuse.com/sug?s=${query}`),
          fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=5&origin=*&format=json`),
        ])
        const dictData = await dictRes.json()
        const encycData = await encycRes.json()

        setDictSuggestions(dictData.map((item: { word: string }) => item.word).slice(0, 5))
        setEncycSuggestions(encycData[1] || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    const timeoutId = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  const runCommand = React.useCallback(
    (command: () => unknown, term: string, type: "word" | "topic", href: string) => {
      setOpen(false)
      addToHistory(term, type, href)
      command()
    },
    []
  )

  const isEmpty = query.trim().length === 0

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search words, topics, ideas..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          {loading ? (
            <div className="flex items-center justify-center p-8 text-sm text-muted-foreground gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching...
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 p-8 text-sm text-muted-foreground">
              <p>No results found for &ldquo;{query}&rdquo;</p>
            </div>
          )}
        </CommandEmpty>

        {/* Recent searches */}
        {isEmpty && history.length > 0 && (
          <>
            <CommandGroup heading="Recent">
              {history.slice(0, 5).map((item) => (
                <CommandItem
                  key={`hist-${item.term}`}
                  value={`hist-${item.term}`}
                  onSelect={() => runCommand(() => router.push(item.href), item.term, item.type, item.href)}
                  className="gap-3"
                >
                  {item.type === "word"
                    ? <Book className="h-3.5 w-3.5 text-muted-foreground" />
                    : <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  }
                  <span>{item.term}</span>
                  <ArrowRight className="ml-auto h-3 w-3 text-muted-foreground/40" />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {/* Trending when empty */}
        {isEmpty && (
          <CommandGroup heading="Trending">
            {trendingSuggestions.map((item) => (
              <CommandItem
                key={`trend-${item.term}`}
                value={`trend-${item.term}`}
                onSelect={() => runCommand(() => router.push(item.href), item.term, item.type, item.href)}
                className="gap-3"
              >
                {item.type === "word"
                  ? <Book className="h-3.5 w-3.5 text-gold" />
                  : <Globe className="h-3.5 w-3.5 text-gold" />
                }
                <span>{item.term}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Dictionary results */}
        {!isEmpty && dictSuggestions.length > 0 && (
          <CommandGroup heading="Dictionary">
            {dictSuggestions.map((word) => (
              <CommandItem
                key={`dict-${word}`}
                value={`dict-${word}`}
                onSelect={() => runCommand(
                  () => router.push(`/word/${encodeURIComponent(word)}`),
                  word, "word", `/word/${encodeURIComponent(word)}`
                )}
                className="gap-3"
              >
                <Book className="h-3.5 w-3.5 text-gold" />
                <span>{word}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Encyclopedia results */}
        {!isEmpty && encycSuggestions.length > 0 && (
          <CommandGroup heading="Encyclopedia">
            {encycSuggestions.map((topic) => (
              <CommandItem
                key={`encyc-${topic}`}
                value={`encyc-${topic}`}
                onSelect={() => runCommand(
                  () => router.push(`/topic/${encodeURIComponent(topic)}`),
                  topic, "topic", `/topic/${encodeURIComponent(topic)}`
                )}
                className="gap-3"
              >
                <Globe className="h-3.5 w-3.5 text-blue-400" />
                <span>{topic}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}
