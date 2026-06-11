import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
// import connectToDatabase from "@/lib/db-mongoose"
// import SavedWord from "@/models/SavedWord"
// import ReadingHistory from "@/models/ReadingHistory"
// import UserStats from "@/models/UserStats"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, Globe, Flame, Award, History, TrendingUp } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/")
  }

  // TEMPORARY BYPASS: Local Wi-Fi blocks MongoDB port 27017
  /*
  await connectToDatabase()
  
  const [savedItems, readingHistory, stats] = await Promise.all([
    SavedWord.find({ userId: session.user.id }).sort({ createdAt: -1 }),
    ReadingHistory.find({ userId: session.user.id }).sort({ viewedAt: -1 }).limit(10),
    UserStats.findOne({ userId: session.user.id })
  ])
  */

  // MOCK DATA for local testing
  type MockSavedItem = { _id: string; word: string; type: string };
  type MockReadingHistory = { _id: string; query: string; type: string; viewedAt: Date | string };
  
  const savedItems: MockSavedItem[] = []
  const readingHistory: MockReadingHistory[] = []
  const stats = { currentStreak: 0, longestStreak: 0, totalWordsLearned: 0 }

  const savedWords = savedItems.filter(item => item.type === "dictionary")
  const savedTopics = savedItems.filter(item => item.type === "encyclopedia")

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="flex items-center justify-between border-b border-border/50 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Your Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">Track your learning journey and vocabulary growth.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats?.currentStreak || 0}</div>
            <p className="text-sm text-muted-foreground mt-1">Days active in a row</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" />
              Longest Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats?.longestStreak || 0}</div>
            <p className="text-sm text-muted-foreground mt-1">Your personal best</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Words Learned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats?.totalWordsLearned || 0}</div>
            <p className="text-sm text-muted-foreground mt-1">Total reading sessions</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Saved Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{savedItems.length}</div>
            <p className="text-sm text-muted-foreground mt-1">Words and topics saved</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Saved Items */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-2xl font-semibold border-b border-border/50 pb-2">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2>Saved Words</h2>
            </div>
            
            {savedWords.length === 0 ? (
              <div className="text-muted-foreground">You haven&apos;t saved any words yet.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedWords.map((item) => (
                  <Link key={item._id.toString()} href={`/word/${encodeURIComponent(item.word)}`}>
                    <Card className="glass-card hover:bg-muted/50 transition-colors cursor-pointer group h-full">
                      <CardHeader>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">{item.word}</CardTitle>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-2 text-2xl font-semibold border-b border-border/50 pb-2">
              <Globe className="w-6 h-6 text-blue-500" />
              <h2>Saved Topics</h2>
            </div>
            
            {savedTopics.length === 0 ? (
              <div className="text-muted-foreground">You haven&apos;t saved any topics yet.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedTopics.map((item) => (
                  <Link key={item._id.toString()} href={`/topic/${encodeURIComponent(item.word)}`}>
                    <Card className="glass-card hover:bg-muted/50 transition-colors cursor-pointer group h-full">
                      <CardHeader>
                        <CardTitle className="text-lg group-hover:text-blue-500 transition-colors">{item.word}</CardTitle>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Reading History */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-2xl font-semibold border-b border-border/50 pb-2">
            <History className="w-6 h-6 text-muted-foreground" />
            <h2>Recent History</h2>
          </div>
          
          {readingHistory.length === 0 ? (
            <div className="text-muted-foreground">No recent reading history.</div>
          ) : (
            <div className="space-y-4">
              {readingHistory.map((item) => (
                <Link 
                  key={item._id.toString()} 
                  href={`/${item.type === "dictionary" ? "word" : "topic"}/${encodeURIComponent(item.query)}`}
                  className="block"
                >
                  <Card className="glass-card hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className={`font-semibold ${item.type === "dictionary" ? "text-primary" : "text-blue-500"}`}>
                          {item.query}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 capitalize">{item.type}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(item.viewedAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
