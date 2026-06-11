"use client"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { explainWithAI } from "@/server/actions"

interface AiExplanationCardProps {
  query: string
  type: "dictionary" | "encyclopedia"
}

export default function AiExplanationCard({ query, type }: AiExplanationCardProps) {
  const [explanation, setExplanation] = useState<string | null>(null)
  const [loadingMode, setLoadingMode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleExplain = async (mode: "simple" | "eli10" | "summarize") => {
    setLoadingMode(mode)
    setError(null)
    try {
      const result = await explainWithAI(query, type, mode)
      if (result.success) {
        setExplanation(result.text as string)
      } else {
        setError(result.error as string)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to get AI explanation")
    } finally {
      setLoadingMode(null)
    }
  }

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Sparkles className="w-5 h-5" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {type === "dictionary" ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExplain("simple")}
                disabled={loadingMode !== null}
              >
                {loadingMode === "simple" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Explain Simply
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExplain("eli10")}
                disabled={loadingMode !== null}
              >
                {loadingMode === "eli10" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Explain Like I&apos;m 10
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExplain("summarize")}
                disabled={loadingMode !== null}
              >
                {loadingMode === "summarize" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Summarize
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExplain("eli10")}
                disabled={loadingMode !== null}
              >
                {loadingMode === "eli10" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Explain Like I&apos;m 10
              </Button>
            </>
          )}
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-md text-sm mt-4">
            <p className="font-semibold mb-1">AI Assistant Unavailable</p>
            <p>{error}</p>
          </div>
        )}

        {explanation && (
          <div className="prose prose-sm dark:prose-invert max-w-none p-4 rounded-md bg-background border mt-4">
            {/* Simple Markdown rendering by splitting paragraphs */}
            {explanation.split('\n').map((paragraph, idx) => (
              paragraph.trim() ? <p key={idx}>{paragraph}</p> : <br key={idx} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
