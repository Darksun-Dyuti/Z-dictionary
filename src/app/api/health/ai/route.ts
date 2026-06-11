import { NextResponse } from "next/server";
import { AI_CONFIG, getGeminiApiKey } from "@/lib/ai-config";

export async function GET() {
  let apiKey: string;
  try {
    apiKey = getGeminiApiKey();
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json(
      { status: "error", error: "GEMINI_API_KEY is missing or invalid." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${AI_CONFIG.baseUrl}/${AI_CONFIG.defaultModel}:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Respond with the word OK" }] }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 10 }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { status: "error", error: "Gemini API request failed", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ 
      status: "ok", 
      message: "Gemini API is healthy", 
      model: AI_CONFIG.defaultModel,
      data
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", error: "Unexpected error during AI health check", details: String(error) },
      { status: 500 }
    );
  }
}
