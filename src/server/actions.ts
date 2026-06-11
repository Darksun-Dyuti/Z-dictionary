"use server"

import { auth } from "@/lib/auth"
// import connectToDatabase from "@/lib/db-mongoose"
// import SavedWord from "@/models/SavedWord"
// import ReadingHistory from "@/models/ReadingHistory"
// import UserStats from "@/models/UserStats"
// import { revalidatePath } from "next/cache"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function saveItem(word: string, _type: "dictionary" | "encyclopedia") {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("You must be logged in to save items.")
  }

  // TEMPORARY BYPASS: Since your local Wi-Fi is blocking port 27017, 
  // we are bypassing database saves so the app doesn't crash.
  console.log(`[Database Bypassed] Mock saved ${word}`)
  return { saved: true }

  /*
  await connectToDatabase()

  try {
    const existing = await SavedWord.findOne({ userId: session.user.id, word, type })
    if (existing) {
      await SavedWord.deleteOne({ _id: existing._id })
      revalidatePath(`/word/${word}`)
      revalidatePath(`/topic/${word}`)
      return { saved: false }
    } else {
      await SavedWord.create({ userId: session.user.id, word, type })
      revalidatePath(`/word/${word}`)
      revalidatePath(`/topic/${word}`)
      return { saved: true }
    }
  } catch (error) {
    console.error(error)
    throw new Error("Failed to save item")
  }
  */
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function checkIsSaved(_word: string, _type: "dictionary" | "encyclopedia") {
  const session = await auth()
  if (!session?.user?.id) return false

  // TEMPORARY BYPASS
  return false

  /*
  await connectToDatabase()
  const existing = await SavedWord.findOne({ userId: session.user.id, word, type })
  return !!existing
  */
}

export async function explainWithAI(query: string, type: "dictionary" | "encyclopedia", mode: "simple" | "eli10" | "summarize") {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("AI features are not configured.")
  }

  let prompt = ""
  if (type === "dictionary") {
    if (mode === "eli10") {
      prompt = `Explain the meaning of the word "${query}" as if I am 10 years old. Give a couple of fun examples.`
    } else {
      prompt = `Explain the meaning, origin, and nuance of the word "${query}" simply and clearly.`
    }
  } else {
    if (mode === "eli10") {
      prompt = `Explain the concept or topic "${query}" as if I am 10 years old. Use simple analogies.`
    } else {
      prompt = `Summarize the key points about the topic "${query}" in 3-4 concise paragraphs.`
    }
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
      })
    })

    if (!response.ok) {
      throw new Error("Failed to fetch AI explanation")
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No explanation available."
    return text
  } catch (error) {
    console.error(error)
    throw new Error("An error occurred while generating the explanation.")
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function trackReadingHistory(query: string, _type: "dictionary" | "encyclopedia") {
  const session = await auth()
  if (!session?.user?.id) return

  // TEMPORARY BYPASS
  console.log(`[Database Bypassed] Mock tracked history for ${query}`)
  return

  /*
  await connectToDatabase()

  try {
    // Log history
    await ReadingHistory.create({ userId: session.user.id, query, type })

    // Update stats
    let stats = await UserStats.findOne({ userId: session.user.id })
    if (!stats) {
      stats = new UserStats({ userId: session.user.id, currentStreak: 1, longestStreak: 1, totalWordsLearned: 1 })
    } else {
      stats.totalWordsLearned += 1
      
      const now = new Date()
      const lastActive = new Date(stats.lastActive)
      const diffTime = Math.abs(now.getTime() - lastActive.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 1) {
        stats.currentStreak += 1
        if (stats.currentStreak > stats.longestStreak) {
          stats.longestStreak = stats.currentStreak
        }
      } else if (diffDays > 1) {
        stats.currentStreak = 1
      }
      
      stats.lastActive = now
    }
    
    await stats.save()
  } catch (error) {
    console.error("Failed to track reading history:", error)
  }
  */
}
