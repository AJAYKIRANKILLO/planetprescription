
import { geminiService } from './geminiService';

const translations: { [key: string]: { [key: string]: string } } = {
  en: {
    'navbar.how_it_works': 'How It Works',
    'navbar.impact': 'Impact',
    'navbar.reviews': 'Reviews',
  },
  fr: {
    'navbar.how_it_works': 'Comment Ça Marche',
    'navbar.impact': 'Impact',
    'navbar.reviews': 'Avis',
  },
  hi: {
    'navbar.how_it_works': 'यह कैसे काम करता है',
    'navbar.impact': 'प्रभाव',
    'navbar.reviews': 'समीक्षाएं',
  },
};

export const translate = async (key: string, targetLanguage: string): Promise<string> => {
  if (translations[targetLanguage] && translations[targetLanguage][key]) {
    return translations[targetLanguage][key];
  }

  // If translation not found, use Gemini API
  try {
    const englishText = translations['en'][key];
    const prompt = `Translate the following text from English to ${targetLanguage}: "${englishText}"`;
    const translatedText = await geminiService.generateContent(prompt);
    return translatedText;
  } catch (error) {
    console.error('Error translating with Gemini:', error);
    return key; // Fallback to key if translation fails
  }
};
