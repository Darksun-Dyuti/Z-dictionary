import { notFound } from "next/navigation"

import AudioButton from "@/components/shared/AudioButton"
import { Badge } from "@/components/ui/badge"
import SaveButton from "@/components/shared/SaveButton"
import AiExplanationCard from "@/components/shared/AiExplanationCard"
import { checkIsSaved } from "@/server/actions"

async function getWordData(word: string) {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
    next: { revalidate: 86400 } // Cache for 1 day
  })
  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error("Failed to fetch word data")
  }
  return res.json()
}

export async function generateMetadata({ params }: { params: { word: string } }) {
  const decodedWord = decodeURIComponent(params.word)
  return {
    title: `${decodedWord} - Z-Dictionary`,
    description: `Definition, meaning, and pronunciation of ${decodedWord}.`,
  }
}

export default async function WordPage({ params }: { params: { word: string } }) {
  const decodedWord = decodeURIComponent(params.word)
  const data = await getWordData(decodedWord)

  if (!data || data.length === 0) {
    notFound()
  }

  const isSaved = await checkIsSaved(decodedWord, "dictionary")

  const wordData = data[0]

  // Find a valid audio source if available
  const audioObj = wordData.phonetics.find((p: { audio?: string }) => p.audio && p.audio.length > 0)
  const audioSrc = audioObj?.audio
  const phoneticText = wordData.phonetic || wordData.phonetics.find((p: { text?: string }) => p.text)?.text

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold mb-2">{wordData.word}</h1>
          <div className="flex items-center gap-4 text-xl text-muted-foreground">
            {phoneticText && <span>{phoneticText}</span>}
            {audioSrc && <AudioButton src={audioSrc} />}
          </div>
        </div>
        <SaveButton word={decodedWord} type="dictionary" initialSaved={isSaved} />
      </div>

      <AiExplanationCard query={decodedWord} type="dictionary" />

      <div className="space-y-8">
        {wordData.meanings.map((meaning: { partOfSpeech: string, definitions: { definition: string, example?: string }[], synonyms?: string[], antonyms?: string[] }, index: number) => (
          <section key={index} className="space-y-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold italic">{meaning.partOfSpeech}</h2>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg text-muted-foreground mb-3">Meaning</h3>
                <ul className="list-disc pl-6 space-y-4">
                  {meaning.definitions.map((def: { definition: string, example?: string }, idx: number) => (
                    <li key={idx} className="text-lg">
                      {def.definition}
                      {def.example && (
                        <p className="mt-2 text-muted-foreground italic">
                          &quot;{def.example}&quot;
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {meaning.synonyms && meaning.synonyms.length > 0 && (
                <div className="flex gap-2 items-start">
                  <h3 className="text-lg text-muted-foreground w-24 shrink-0">Synonyms</h3>
                  <div className="flex flex-wrap gap-2">
                    {meaning.synonyms.map((syn: string) => (
                      <Badge key={syn} variant="secondary" className="text-sm">
                        {syn}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {meaning.antonyms && meaning.antonyms.length > 0 && (
                <div className="flex gap-2 items-start">
                  <h3 className="text-lg text-muted-foreground w-24 shrink-0">Antonyms</h3>
                  <div className="flex flex-wrap gap-2">
                    {meaning.antonyms.map((ant: string) => (
                      <Badge key={ant} variant="outline" className="text-sm">
                        {ant}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {wordData.sourceUrls && wordData.sourceUrls.length > 0 && (
        <div className="pt-8 border-t">
          <h3 className="text-sm text-muted-foreground mb-2">Sources</h3>
          <ul className="text-sm">
            {wordData.sourceUrls.map((url: string) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
