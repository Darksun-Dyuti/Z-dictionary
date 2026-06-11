import 'dotenv/config';
import fs from 'fs';
import dotenv from 'dotenv';

const envConfig = dotenv.parse(fs.readFileSync('.env.local'))
for (const k in envConfig) {
  process.env[k] = envConfig[k]
}

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  const prompt = `Explain the meaning, origin, and nuance of the word "rainmaker" simply and clearly.`;
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
    })
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

run();
