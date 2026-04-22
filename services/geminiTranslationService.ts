
const API_KEY = import.meta.env.VITE_TRANSLATE_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  const prompt = `Translate the following text to ${targetLanguage}: ${text}`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`API request failed with status ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    const translatedText = data.candidates[0].content.parts[0].text;
    return translatedText.trim();
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Fallback to original text
  }
}
