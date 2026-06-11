"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Book, Globe, Loader2 } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [dictSuggestions, setDictSuggestions] = React.useState<string[]>([])
  const [encycSuggestions, setEncycSuggestions] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

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
          fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=5&origin=*&format=json`)
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

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Type a word or topic..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>
            {loading ? (
              <div className="flex items-center justify-center p-6 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </div>
            ) : "No results found."}
          </CommandEmpty>
          
          {query.trim().length > 0 && (
            <>
              {dictSuggestions.length > 0 && (
                <CommandGroup heading="Dictionary">
                  {dictSuggestions.map((word) => (
                    <CommandItem
                      key={`dict-${word}`}
                      value={`dict-${word}`}
                      onSelect={() => {
                        runCommand(() => router.push(`/word/${encodeURIComponent(word)}`))
                      }}
                    >
                      <Book className="mr-2 h-4 w-4 text-primary" />
                      <span>{word}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {encycSuggestions.length > 0 && (
                <CommandGroup heading="Encyclopedia">
                  {encycSuggestions.map((topic) => (
                    <CommandItem
                      key={`encyc-${topic}`}
                      value={`encyc-${topic}`}
                      onSelect={() => {
                        runCommand(() => router.push(`/topic/${encodeURIComponent(topic)}`))
                      }}
                    >
                      <Globe className="mr-2 h-4 w-4 text-blue-500" />
                      <span>{topic}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}

          {query.trim().length === 0 && (
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => runCommand(() => router.push("/word/serendipity"))}>
                <Book className="mr-2 h-4 w-4 text-primary" />
                <span>serendipity</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/topic/Artificial%20Intelligence"))}>
                <Globe className="mr-2 h-4 w-4 text-blue-500" />
                <span>Artificial Intelligence</span>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
  )
}
