import { notFound } from "next/navigation"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import SaveButton from "@/components/shared/SaveButton"
import AiExplanationCard from "@/components/shared/AiExplanationCard"
import { checkIsSaved } from "@/server/actions"

async function getTopicData(topic: string) {
  const encodedTopic = encodeURIComponent(topic)
  const res = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&titles=${encodedTopic}&format=json&pithumbsize=1000`,
    { next: { revalidate: 86400 } }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch topic data")
  }
  const data = await res.json()
  const pages = data.query.pages
  const pageId = Object.keys(pages)[0]

  if (pageId === "-1") return null

  return pages[pageId]
}

export async function generateMetadata({ params }: { params: { topic: string } }) {
  const decodedTopic = decodeURIComponent(params.topic)
  return {
    title: `${decodedTopic} - Z-Encyclopedia`,
    description: `Read about ${decodedTopic} on Z-Dictionary Encyclopedia.`,
  }
}

export default async function TopicPage({ params }: { params: { topic: string } }) {
  const decodedTopic = decodeURIComponent(params.topic)
  const data = await getTopicData(decodedTopic)

  if (!data) {
    notFound()
  }

  const isSaved = await checkIsSaved(decodedTopic, "encyclopedia")

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-2">{data.title}</h1>
        </div>
        <SaveButton word={decodedTopic} type="encyclopedia" initialSaved={isSaved} />
      </div>

      <AiExplanationCard query={decodedTopic} type="encyclopedia" />

      {data.thumbnail && (
        <Card className="overflow-hidden border-none shadow-md">
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
        className="prose prose-lg dark:prose-invert max-w-none prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: data.extract }}
      />

      <div className="pt-8 border-t">
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
  )
}
