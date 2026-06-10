"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Loader2, BookOpen, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [mode, setMode] = useState<"dictionary" | "encyclopedia">("dictionary")
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([])
        return
      }

      setLoading(true)
      try {
        if (mode === "dictionary") {
          const res = await fetch(`https://api.datamuse.com/sug?s=${query}`)
          const data = await res.json()
          setSuggestions(data.map((item: any) => item.word).slice(0, 5))
        } else {
          const res = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=5&origin=*&format=json`)
          const data = await res.json()
          setSuggestions(data[1] || [])
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      fetchSuggestions()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, mode])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return
    setShowSuggestions(false)
    if (mode === "dictionary") {
      router.push(`/word/${encodeURIComponent(searchQuery)}`)
    } else {
      router.push(`/topic/${encodeURIComponent(searchQuery)}`)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(query)
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center gap-4" ref={wrapperRef}>
      <div className="flex bg-muted p-1 rounded-full w-max mx-auto shadow-sm">
        <Button
          variant={mode === "dictionary" ? "default" : "ghost"}
          className="rounded-full px-6"
          onClick={() => {
            setMode("dictionary")
            setQuery("")
          }}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Dictionary
        </Button>
        <Button
          variant={mode === "encyclopedia" ? "default" : "ghost"}
          className="rounded-full px-6"
          onClick={() => {
            setMode("encyclopedia")
            setQuery("")
          }}
        >
          <Globe className="w-4 h-4 mr-2" />
          Encyclopedia
        </Button>
      </div>

      <div className="relative flex items-center w-full">
        <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={mode === "dictionary" ? "Search for a word..." : "Search for a topic..."}
          className="w-full pl-12 pr-12 py-6 text-lg rounded-full shadow-sm"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowSuggestions(true)
          }}
          onKeyDown={onKeyDown}
          onFocus={() => setShowSuggestions(true)}
        />
        <div className="absolute right-4 flex items-center">
          {loading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
        </div>
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full z-50"
          >
            <Card className="overflow-hidden rounded-xl shadow-lg border">
              <ul>
                {suggestions.map((word, idx) => (
                  <li key={idx}>
                    <button
                      className="w-full text-left px-6 py-3 hover:bg-muted transition-colors text-lg"
                      onClick={() => {
                        setQuery(word)
                        handleSearch(word)
                      }}
                    >
                      {word}
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
