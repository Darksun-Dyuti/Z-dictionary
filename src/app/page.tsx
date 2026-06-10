import SearchBar from "@/components/shared/SearchBar"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Z-Dictionary
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore the meaning, pronunciation, and origins of any word in a modern, elegant knowledge platform.
        </p>
      </div>
      
      <div className="w-full mt-8">
        <SearchBar />
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl text-center">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Rich Definitions</h3>
          <p className="text-muted-foreground">Comprehensive meanings, synonyms, and phonetics.</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">AI Explanations</h3>
          <p className="text-muted-foreground">Get simplified explanations or "Explain like I'm 10".</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Encyclopedia Mode</h3>
          <p className="text-muted-foreground">Dive deep into topics with Wikipedia integrations.</p>
        </div>
      </div>
    </div>
  )
}
