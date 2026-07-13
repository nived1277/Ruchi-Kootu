// RUCHI KOOTU - Google Gemini API Integration Service

const SYSTEM_PROMPT = `You are the parsing core of the RUCHI KOOTU restaurant recommendation assistant.
Your task is to analyze the user's natural language search query and output a strict JSON object mapping their search intent.
Do not output any explanation, notes, or markdown. Output ONLY valid JSON.

Choose cuisine strictly from: ["Contemporary French", "Royal Awadhi", "Artisanal Japanese", "Modern South Indian", "New Nordic & Botanical"].
Choose category strictly from: ["Cafe", "Restaurant", "Bakery", "Fast Food", "Food Court"].

JSON Schema:
{
  "category": string | null,
  "cuisine": string | null,
  "budget": number | null,
  "distance": number | null,
  "openNow": boolean,
  "mood": string | null,
  "family": boolean,
  "romantic": boolean,
  "keywords": string[]
}`;

/**
 * Sends a search query to the Gemini API and returns the parsed structured intent.
 * @param {string} query - The natural language search query.
 * @param {object} preferences - The user's preferences context.
 * @returns {Promise<object>} - The raw JSON parsed object.
 */
export async function queryGemini(query, preferences = null) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing Gemini API Key (VITE_GEMINI_API_KEY).");
  }

  let prefsContext = "";
  if (preferences) {
    const favCuisine = Object.entries(preferences.cuisines || {}).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";
    const favCategory = Object.entries(preferences.categories || {}).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";
    const favDiningTime = Object.entries(preferences.diningTimes || {}).sort((a, b) => b[1] - a[1])[0]?.[0] || "Dinner";
    prefsContext = `\nUser Preference Profile context (prioritize matches): Favorite Cuisine is ${favCuisine}, Favorite Category is ${favCategory}, Favorite Dining Time is ${favDiningTime}.`;
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `${SYSTEM_PROMPT}${prefsContext}\n\nUser Query: "${query}"`
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errorDetails}`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!rawText) {
    throw new Error("Empty response received from Gemini model.");
  }

  return JSON.parse(rawText.trim());
}
export default queryGemini;
