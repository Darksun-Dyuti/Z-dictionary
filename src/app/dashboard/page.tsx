import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import connectToDatabase from "@/lib/db-mongoose"
import SavedWord from "@/models/SavedWord"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, Globe } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/")
  }

  await connectToDatabase()
  const savedItems = await SavedWord.find({ userId: session.user.id }).sort({ createdAt: -1 })

  const savedWords = savedItems.filter(item => item.type === "dictionary")
  const savedTopics = savedItems.filter(item => item.type === "encyclopedia")

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold border-b pb-2">
            <BookOpen className="w-5 h-5" />
            <h2>Saved Words</h2>
          </div>
          
          {savedWords.length === 0 ? (
            <p className="text-muted-foreground">You haven&apos;t saved any words yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedWords.map((item) => (
                <Link key={item._id.toString()} href={`/word/${encodeURIComponent(item.word)}`}>
                  <Card className="hover:bg-muted transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.word}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold border-b pb-2">
            <Globe className="w-5 h-5" />
            <h2>Saved Topics</h2>
          </div>
          
          {savedTopics.length === 0 ? (
            <p className="text-muted-foreground">You haven&apos;t saved any topics yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedTopics.map((item) => (
                <Link key={item._id.toString()} href={`/topic/${encodeURIComponent(item.word)}`}>
                  <Card className="hover:bg-muted transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.word}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
