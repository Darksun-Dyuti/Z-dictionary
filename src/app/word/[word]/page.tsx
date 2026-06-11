import { notFound } from "next/navigation"

import AudioButton from "@/components/shared/AudioButton"
import { Badge } from "@/components/ui/badge"
import SaveButton from "@/components/shared/SaveButton"
import AiExplanationCard from "@/components/shared/AiExplanationCard"
import { checkIsSaved, trackReadingHistory } from "@/server/actions"
import ReadingProgress from "@/components/shared/ReadingProgress"

async function getWordData(word: string) {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
    next: { revalidate: 86400 } // Cache for 1 day
  })
  if (!res.ok) {
    if (res.status === 404) return null
    console.error("Failed to fetch word data from Dictionary API")
    return null
  }
  return res.json()
}

type Props = { params: Promise<{ word: string }> }

export async function generateMetadata({ params }: Props) {
  const { word } = await params
  const decodedWord = decodeURIComponent(word)
  return {
    title: `${decodedWord} - Arcanaz`,
    description: `Definition, meaning, and pronunciation of ${decodedWord}.`,
  }
}

export default async function WordPage({ params }: Props) {
  const { word } = await params
  const decodedWord = decodeURIComponent(word)
  const data = await getWordData(decodedWord)

  if (!data || data.length === 0) {
    notFound()
  }

  await trackReadingHistory(decodedWord, "dictionary")

  const isSaved = await checkIsSaved(decodedWord, "dictionary")

  const wordData = data[0]

  // Find a valid audio source if available
  const audioObj = wordData.phonetics.find((p: { audio?: string }) => p.audio && p.audio.length > 0)
  const audioSrc = audioObj?.audio
  const phoneticText = wordData.phonetic || wordData.phonetics.find((p: { text?: string }) => p.text)?.text

  return (
    <>
      <ReadingProgress />
      <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-foreground to-foreground/70">{wordData.word}</h1>
            {phoneticText && (
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl text-muted-foreground font-mono bg-muted px-3 py-1 rounded-md">{phoneticText}</span>
                {audioSrc && <AudioButton src={audioSrc} />}
              </div>
            )}
          </div>
          <SaveButton word={decodedWord} type="dictionary" initialSaved={isSaved} />
        </div>

        <AiExplanationCard query={decodedWord} type="dictionary" />

        <div className="space-y-12 mt-12">
          {wordData.meanings.map((meaning: { partOfSpeech: string, definitions: { definition: string, example?: string }[], synonyms?: string[], antonyms?: string[] }, index: number) => (
            <div key={index} className="space-y-6">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-semibold italic text-primary">{meaning.partOfSpeech}</h3>
                <div className="h-px flex-1 bg-border/50"></div>
              </div>
              
              <ul className="space-y-6 list-none pl-0">
                {meaning.definitions.map((def: { definition: string, example?: string }, idx: number) => (
                  <li key={idx} className="relative pl-6">
                    <span className="absolute left-0 top-3 w-2 h-2 rounded-full bg-primary/50"></span>
                    <p className="text-lg leading-relaxed">{def.definition}</p>
                    {def.example && (
                      <p className="text-muted-foreground mt-2 pl-4 border-l-2 border-primary/20 italic">
                        &quot;{def.example}&quot;
                      </p>
                    )}
                  </li>
                ))}
              </ul>

              {meaning.synonyms && meaning.synonyms.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Synonyms:</span>
                  {meaning.synonyms.map((syn, idx) => (
                    <Badge key={idx} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
                      {syn}
                    </Badge>
                  ))}
                </div>
              )}

              {meaning.antonyms && meaning.antonyms.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Antonyms:</span>
                  {meaning.antonyms.map((ant, idx) => (
                    <Badge key={idx} variant="outline" className="cursor-default">
                      {ant}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {wordData.sourceUrls && wordData.sourceUrls.length > 0 && (
          <div className="pt-8 border-t border-border/50">
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
    </>
  )
}
