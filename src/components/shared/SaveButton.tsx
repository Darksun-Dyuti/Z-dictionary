"use client"

import { useState, useTransition } from "react"
import { Bookmark, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { saveItem } from "@/server/actions"

interface SaveButtonProps {
  word: string
  type: "dictionary" | "encyclopedia"
  initialSaved: boolean
}

export default function SaveButton({ word, type, initialSaved }: SaveButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(initialSaved)

  const handleSave = () => {
    startTransition(async () => {
      try {
        const result = await saveItem(word, type)
        setSaved(result.saved)
      } catch (_error) {
        alert("You must be logged in to save items.")
      }
    })
  }

  return (
    <Button 
      variant={saved ? "default" : "outline"} 
      onClick={handleSave} 
      disabled={isPending}
      className="gap-2"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
      )}
      {saved ? "Saved" : "Save"}
    </Button>
  )
}
