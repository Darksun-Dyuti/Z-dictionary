import { notFound } from "next/navigation"
import Link from "next/link"
import AudioButton from "@/components/shared/AudioButton"
import { Badge } from "@/components/ui/badge"
import SaveButton from "@/components/shared/SaveButton"
import AiExplanationCard from "@/components/shared/AiExplanationCard"
import { checkIsSaved, trackReadingHistory } from "@/server/actions"
import ReadingProgress from "@/components/shared/ReadingProgress"
import { Book, ExternalLink } from "lucide-react"

async function getWordData(word: string) {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
    next: { revalidate: 86400 },
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
    title: decodedWord,
    description: `Definition, meaning, and pronunciation of "${decodedWord}" — Arcanaz dictionary.`,
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

  const audioObj = wordData.phonetics.find(
    (p: { audio?: string }) => p.audio && p.audio.length > 0
  )
  const audioSrc = audioObj?.audio
  const phoneticText =
    wordData.phonetic ||
    wordData.phonetics.find((p: { text?: string }) => p.text)?.text

  return (
    <>
      <ReadingProgress />

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">

        {/* ── Word header ─────────────────────────────────────── */}
        <header className="space-y-6">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-3">
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <Book className="w-3.5 h-3.5" style={{ color: "var(--gold)" }} />
                <span
                  className="text-[10px] font-medium tracking-[0.14em] uppercase"
                  style={{ color: "var(--gold)" }}
                >
                  Dictionary
                </span>
              </div>

              {/* Word */}
              <h1 className="text-editorial text-[clamp(3rem,7vw,6rem)] text-foreground leading-none tracking-[-0.02em]">
                {wordData.word}
              </h1>

              {/* Phonetic */}
              {phoneticText && (
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-lg text-muted-foreground px-3 py-1 rounded-lg"
                    style={{
                      background: "oklch(from var(--muted) l c h / 0.5)",
                      border: "1px solid oklch(from var(--border) l c h / 0.5)",
                    }}
                  >
                    {phoneticText}
                  </span>
                  {audioSrc && <AudioButton src={audioSrc} />}
                </div>
              )}
            </div>
            <SaveButton word={decodedWord} type="dictionary" initialSaved={isSaved} />
          </div>

          {/* Divider */}
          <div className="divider-editorial" />
        </header>

        {/* ── AI Assistant ─────────────────────────────────── */}
        <AiExplanationCard query={decodedWord} type="dictionary" />

        {/* ── Meanings ─────────────────────────────────────── */}
        <div className="space-y-14">
          {wordData.meanings.map(
            (
              meaning: {
                partOfSpeech: string
                definitions: { definition: string; example?: string }[]
                synonyms?: string[]
                antonyms?: string[]
              },
              index: number
            ) => (
              <section key={index} className="space-y-6">
                {/* Part of speech header */}
                <div className="flex items-center gap-4">
                  <h2
                    className="text-base font-semibold italic shrink-0"
                    style={{ color: "var(--gold)" }}
                  >
                    {meaning.partOfSpeech}
                  </h2>
                  <div
                    className="h-px flex-1"
                    style={{
                      background:
                        "linear-gradient(to right, oklch(0.76 0.13 72 / 0.3), oklch(from var(--border) l c h / 0.3))",
                    }}
                  />
                </div>

                {/* Definitions */}
                <ol className="space-y-7 list-none pl-0">
                  {meaning.definitions.map(
                    (def: { definition: string; example?: string }, idx: number) => (
                      <li key={idx} className="flex gap-5">
                        <span
                          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold mt-0.5"
                          style={{
                            background: "oklch(0.76 0.13 72 / 0.10)",
                            color: "var(--gold)",
                            border: "1px solid oklch(0.76 0.13 72 / 0.2)",
                          }}
                        >
                          {idx + 1}
                        </span>
                        <div className="flex-1 space-y-3">
                          <p className="text-[15px] leading-[1.8] text-foreground/90">
                            {def.definition}
                          </p>
                          {def.example && (
                            <p
                              className="text-sm italic leading-relaxed pl-4 text-muted-foreground"
                              style={{
                                borderLeft: "2px solid oklch(0.76 0.13 72 / 0.3)",
                              }}
                            >
                              &ldquo;{def.example}&rdquo;
                            </p>
                          )}
                        </div>
                      </li>
                    )
                  )}
                </ol>

                {/* Synonyms */}
                {meaning.synonyms && meaning.synonyms.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-muted-foreground/60 mr-1">
                      Synonyms
                    </span>
                    {meaning.synonyms.map((syn, idx) => (
                      <Link
                        key={idx}
                        href={`/word/${encodeURIComponent(syn)}`}
                        className="inline-flex px-3 py-1 rounded-full text-xs font-medium transition-all duration-200"
                        style={{
                          background: "oklch(from var(--muted) l c h / 0.5)",
                          border: "1px solid oklch(from var(--border) l c h / 0.6)",
                          color: "oklch(from var(--foreground) l c h / 0.7)",
                        }}
                      >
                        {syn}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Antonyms */}
                {meaning.antonyms && meaning.antonyms.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-muted-foreground/60 mr-1">
                      Antonyms
                    </span>
                    {meaning.antonyms.map((ant, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="cursor-default text-xs rounded-full"
                      >
                        {ant}
                      </Badge>
                    ))}
                  </div>
                )}
              </section>
            )
          )}
        </div>

        {/* ── Sources ──────────────────────────────────────── */}
        {wordData.sourceUrls && wordData.sourceUrls.length > 0 && (
          <footer
            className="pt-8 border-t text-sm text-muted-foreground/60 space-y-2"
            style={{ borderColor: "oklch(from var(--border) l c h / 0.4)" }}
          >
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase mb-3">Sources</p>
            {wordData.sourceUrls.map((url: string) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                style={{ color: "var(--gold)" }}
              >
                <ExternalLink className="w-3 h-3 shrink-0" />
                <span className="text-xs truncate">{url}</span>
              </a>
            ))}
          </footer>
        )}
      </div>
    </>
  )
}
