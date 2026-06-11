export const AI_CONFIG = {
  defaultModel: "gemini-2.5-flash",
  baseUrl: "https://generativelanguage.googleapis.com/v1beta/models",
}

export function getGeminiApiKey() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.")
  }
  return apiKey
}
