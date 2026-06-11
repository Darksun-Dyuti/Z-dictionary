import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Sparkles, Flame, Award, Globe, Code, Microscope, BookMarked, Palette, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { HomeSearchButton } from "@/components/shared/HomeSearchButton"

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Compressed Hero Section */}
      <section className="flex flex-col items-center justify-center pt-10 pb-6 text-center space-y-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-foreground to-foreground/50 pb-2">
          Knowledge Beyond Definitions
        </h1>
        <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-2xl mx-auto mb-4 tracking-tight">
          The Modern Knowledge Platform
        </p>
        
        <div className="w-full max-w-2xl mx-auto pt-4 flex justify-center">
          <HomeSearchButton />
        </div>
      </section>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Word of the Day */}
        <Link href="/word/serendipity" className="md:col-span-2 group">
          <Card className="glass-card h-full transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="w-5 h-5" />
                Word of the Day
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">serendipity</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-lg">
                The occurrence and development of events by chance in a happy or beneficial way.
              </p>
              <div className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:underline">
                Read full definition <ChevronRight className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Learning Progress */}
        <Card className="glass-card flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:shadow-foreground/5 hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Award className="w-5 h-5 text-primary" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">Weekly Goal</span>
                <span className="font-bold">12 / 20 Words</span>
              </div>
              <Progress value={60} className="h-2 bg-muted/50" />
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="p-3 bg-orange-500/20 text-orange-500 rounded-xl">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg">3 Day Streak!</p>
                <p className="text-sm text-muted-foreground">Keep it up.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories Section (New) */}
        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {[
            { title: "Science", icon: Microscope, color: "text-blue-500", bg: "bg-blue-500/10" },
            { title: "Technology", icon: Code, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { title: "Arts", icon: Palette, color: "text-purple-500", bg: "bg-purple-500/10" },
            { title: "History", icon: BookMarked, color: "text-amber-500", bg: "bg-amber-500/10" },
          ].map((cat) => (
            <Link key={cat.title} href={`/topic/${cat.title}`} className="group">
              <Card className="glass-card flex items-center gap-3 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-white/20">
                <div className={`p-2 rounded-lg ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-5 h-5" />
                </div>
                <span className="font-semibold">{cat.title}</span>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Topic with Thumbnail */}
        <Link href="/topic/Artificial%20intelligence" className="md:col-span-2 group">
          <Card className="glass-card h-full transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 hover:border-blue-500/40 relative overflow-hidden min-h-[300px] flex flex-col justify-end border-white/10">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 bg-zinc-900">
              <Image 
                unoptimized
                fill
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop" 
                alt="AI Background" 
                className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 group-hover:scale-105 transform"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
            </div>

            <div className="relative z-10 p-6 flex flex-col h-full justify-between">
              <CardTitle className="flex items-center gap-2 text-blue-400 mb-8">
                <Globe className="w-5 h-5" />
                Featured Topic
              </CardTitle>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Artificial Intelligence</h2>
                <p className="text-lg text-muted-foreground mb-4 max-w-lg line-clamp-2">
                  The simulation of human intelligence processes by machines, especially computer systems.
                </p>
                <div className="text-sm font-semibold text-blue-400 flex items-center gap-1 group-hover:underline">
                  Read encyclopedia article <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Card>
        </Link>

        {/* Trending Searches */}
        <Card className="glass-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
              Trending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["Ephemeral", "Quantum Computing", "Obfuscation", "Renaissance", "Stoicism"].map((tag) => (
                <Link 
                  key={tag} 
                  href={tag.includes(" ") ? `/topic/${tag}` : `/word/${tag}`}
                  className="px-3 py-1.5 bg-white/5 hover:bg-primary hover:text-primary-foreground border border-white/5 transition-all duration-200 rounded-lg text-sm font-medium"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
