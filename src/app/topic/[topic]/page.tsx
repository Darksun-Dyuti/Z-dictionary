import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import SaveButton from "@/components/shared/SaveButton"
import AiExplanationCard from "@/components/shared/AiExplanationCard"
import { checkIsSaved, trackReadingHistory } from "@/server/actions"
import { TableOfContents } from "@/components/shared/TableOfContents"
import ReadingProgress from "@/components/shared/ReadingProgress"
import { ArrowRight, Globe } from "lucide-react"

async function getTopicData(topic: string) {
  const encodedTopic = encodeURIComponent(topic)
  const res = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&titles=${encodedTopic}&format=json&pithumbsize=1200`,
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
    title: decodedTopic,
    description: `Explore ${decodedTopic} — read the full encyclopedia article on Arcanaz.`,
  }
}

// Related topics suggestions based on slug
const getRelatedTopics = (topic: string): string[] => {
  const lower = topic.toLowerCase()
  if (lower.includes("artificial") || lower.includes("ai")) {
    return ["Machine Learning", "Neural Networks", "Deep Learning", "Robotics", "Data Science"]
  }
  if (lower.includes("philosophy") || lower.includes("consciousness")) {
    return ["Epistemology", "Ethics", "Free Will", "Metaphysics", "Logic"]
  }
  if (lower.includes("science")) {
    return ["Physics", "Chemistry", "Biology", "Mathematics", "Astronomy"]
  }
  return ["Philosophy", "Science", "History", "Technology", "Psychology"]
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
  const relatedTopics = getRelatedTopics(decodedTopic)

  return (
    <>
      <ReadingProgress />

      {/* Hero */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: "38vh" }}>
        {data.thumbnail ? (
          <>
            <Image
              src={data.thumbnail.source}
              alt={data.title}
              fill
              priority
              className="object-cover opacity-25"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/60 to-background" />
          </>
        ) : (
          <div className="absolute inset-0 hero-ambient" />
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-5">
                <Globe className="w-3.5 h-3.5" style={{ color: "var(--gold)" }} />
                <span className="text-[10px] font-medium tracking-[0.14em] uppercase" style={{ color: "var(--gold)" }}>
                  Encyclopedia
                </span>
              </div>
              <h1 className="text-editorial text-[clamp(2.8rem,6vw,5.5rem)] text-foreground leading-[1.02] mb-4">
                {data.title}
              </h1>
            </div>
            <div className="pt-2 shrink-0">
              <SaveButton word={decodedTopic} type="encyclopedia" initialSaved={isSaved} />
            </div>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-12 items-start">

          {/* TOC — left sticky */}
          <TableOfContents />

          {/* Article — center */}
          <article className="flex-1 min-w-0 space-y-10">

            {/* AI card */}
            <AiExplanationCard query={decodedTopic} type="encyclopedia" />

            {/* Article content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none prose-editorial prose-a:text-gold prose-headings:tracking-tight"
              dangerouslySetInnerHTML={{ __html: data.extract }}
            />

            {/* Source attribution */}
            <div
              className="flex items-center gap-3 pt-8 border-t text-sm text-muted-foreground/60"
              style={{ borderColor: "oklch(from var(--border) l c h / 0.4)" }}
            >
              <Globe className="w-4 h-4 shrink-0" />
              <p>
                Content sourced from{" "}
                <a
                  href={`https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium transition-colors"
                  style={{ color: "var(--gold)" }}
                >
                  Wikipedia
                </a>
                . Content may be modified or summarized.
              </p>
            </div>
          </article>

          {/* Right sidebar */}
          <aside className="hidden xl:flex flex-col gap-6 w-56 shrink-0 sticky top-24">

            {/* Related topics */}
            <div
              className="rounded-2xl p-5 border"
              style={{
                background: "oklch(from var(--card) l c h / 0.5)",
                backdropFilter: "blur(16px)",
                borderColor: "oklch(from var(--border) l c h / 0.5)",
              }}
            >
              <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-muted-foreground/60 mb-4">
                Explore Related
              </p>
              <div className="space-y-1">
                {relatedTopics.map((t) => (
                  <Link
                    key={t}
                    href={`/topic/${encodeURIComponent(t)}`}
                    className="flex items-center justify-between py-2 px-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150 group"
                  >
                    {t}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--gold)" }} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Knowledge path */}
            <div
              className="rounded-2xl p-5 border"
              style={{
                background: "oklch(0.76 0.13 72 / 0.04)",
                borderColor: "oklch(0.76 0.13 72 / 0.18)",
              }}
            >
              <p className="text-[10px] font-semibold tracking-[0.14em] uppercase mb-3" style={{ color: "var(--gold)" }}>
                AI Actions
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Use the AI assistant above to summarize, simplify, or get a beginner-friendly explanation of this topic.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
