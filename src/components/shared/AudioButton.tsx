"use client"

import { Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AudioButton({ src }: { src: string }) {
  const playAudio = () => {
    const audio = new Audio(src)
    audio.play()
  }

  return (
    <Button variant="outline" size="icon" className="rounded-full" onClick={playAudio} title="Play pronunciation">
      <Volume2 className="h-4 w-4" />
    </Button>
  )
}
