import { notFound } from "next/navigation"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import SaveButton from "@/components/shared/SaveButton"
import AiExplanationCard from "@/components/shared/AiExplanationCard"
import { checkIsSaved, trackReadingHistory } from "@/server/actions"
import { TableOfContents } from "@/components/shared/TableOfContents"
import ReadingProgress from "@/components/shared/ReadingProgress"

async function getTopicData(topic: string) {
  const encodedTopic = encodeURIComponent(topic)
  const res = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&titles=${encodedTopic}&format=json&pithumbsize=1000`,
    { next: { revalidate: 86400 } }
  )
  if (!res.ok) {
    console.error("Failed to fetch topic data from Wikipedia")
    return null
  }
  const data = await res.json()
  const pages = data.query.pages
  const pageId = Object.keys(pages)[0]

  if (pageId === "-1") return null

  return pages[pageId]
}

type Props = { params: Promise<{ topic: string }> }

export async function generateMetadata({ params }: Props) {
  const { topic } = await params
  const decodedTopic = decodeURIComponent(topic)
  return {
    title: `${decodedTopic} - Arcanaz`,
    description: `Read about ${decodedTopic} on Arcanaz.`,
  }
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params
  const decodedTopic = decodeURIComponent(topic)
  const data = await getTopicData(decodedTopic)

  if (!data) {
    notFound()
  }

  await trackReadingHistory(decodedTopic, "encyclopedia")

  const isSaved = await checkIsSaved(decodedTopic, "encyclopedia")

  return (
    <>
      <ReadingProgress />
      <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto items-start relative animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="flex-1 w-full max-w-4xl space-y-8">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-2 tracking-tight text-transparent bg-clip-text bg-linear-to-r from-foreground to-foreground/70">{data.title}</h1>
            </div>
            <SaveButton word={decodedTopic} type="encyclopedia" initialSaved={isSaved} />
          </div>

          <AiExplanationCard query={decodedTopic} type="encyclopedia" />

          {data.thumbnail && (
            <Card className="glass-card overflow-hidden border-none shadow-2xl">
              <div className="relative w-full h-[400px] md:h-[500px]">
                <Image
                  src={data.thumbnail.source}
                  alt={data.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>
            </Card>
          )}

          {/* Render HTML content from Wikipedia */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-a:text-primary prose-headings:font-bold prose-headings:tracking-tight prose-h2:border-b prose-h2:pb-2 prose-h2:mt-10"
            dangerouslySetInnerHTML={{ __html: data.extract }}
          />
          
          <div className="pt-8 border-t border-white/10">
            <p className="text-sm text-muted-foreground">
              Content sourced from{" "}
              <a
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Wikipedia
              </a>.
            </p>
          </div>
        </div>

        <TableOfContents />

      </div>
    </>
  )
}
