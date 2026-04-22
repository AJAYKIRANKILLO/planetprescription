
import { MedicineAnalysis, RiskLevel } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${API_KEY}`;

// Helper to convert File to Base64
async function fileToGenerativePart(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Main function for Batch Scanning & Scientific Research using direct fetch
 */
export const analyzeMultipleMedicines = async (imageFile: File): Promise<MedicineAnalysis[]> => {
  try {
    const base64Data = await fileToGenerativePart(imageFile);

    const prompt = `
      Analyze this image of medicine packaging and identify EVERY distinct medicine item visible (tablets, capsules, syrups, creams, etc.).
      
      For EACH medicine found, provide detailed identification:
      1. Name: Exact brand name or generic name from the packaging
      2. Type: Form (tablet, capsule, syrup, injection, cream, etc.)
      3. Usage: Primary medical use (e.g., 'Pain relief', 'Antibiotic for infections', 'Blood pressure control', 'Diabetes management')
      4. Risk Level: HIGH (antibiotics, hormones, chemotherapy), MEDIUM (painkillers, steroids), LOW (vitamins, basic supplements)
      5. User Disposal: Simple safe disposal instruction
      6. Eco Tip: Environmentally friendly disposal suggestion
      7. Industrial Method: Technical disposal method for professionals

      Output as JSON array only. Each object must have:
      - id: unique string
      - name: string
      - usage: string
      - type: string
      - riskLevel: "HIGH"|"MEDIUM"|"LOW"
      - userDisposal: string
      - userEcoTip: string
      - adminIndustrialMethod: string

      If unsure about any field, use "Unknown" but try to identify from visible text and packaging.
      - adminIndustrialMethod: string

      If unsure about any field, use "Unknown" but try to identify from visible text and packaging.
    `;

    const requestBody = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: imageFile.type || 'image/jpeg',
                data: base64Data
              }
            }
          ]
        }
      ]
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Response Error Body:", errorBody);
        throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let rawData: any[] = [];
    try {
        rawData = JSON.parse(cleanText);
        if (!Array.isArray(rawData)) {
            rawData = [rawData];
        }
    } catch (e) {
        console.warn("JSON Parse Error, attempting fallback", e);
        return createFallback();
    }

    // Map to application's MedicineAnalysis interface
    return rawData.map((item: any) => ({
      id: item.id || `item_${Math.random().toString(36).substr(2, 9)}`,
      name: item.name || "Unknown Medicine",
      composition: item.usage || item.type || "Standard Medicine",
      expiryDate: "Check Packaging",
      riskLevel: normalizeRisk(item.riskLevel),
      riskReason: `${item.usage} (${item.type}) identified as ${item.riskLevel} Risk`,
      disposalRecommendation: item.userDisposal || "Dispose safely via agent",
      userEcoTip: item.userEcoTip,
      adminIndustrialMethod: item.adminIndustrialMethod
    }));

  } catch (error) {
    console.error("Gemini API Direct Fetch Error:", error);
    return createFallback();
  }
};

/**
 * Backward Compatibility Wrapper
 */
export const analyzeMedicineImage = async (base64Data: string): Promise<MedicineAnalysis> => {
  try {
    const res = await fetch(`data:image/jpeg;base64,${base64Data}`);
    const blob = await res.blob();
    const file = new File([blob], "single_scan_capture.jpg", { type: "image/jpeg" });
    
    const results = await analyzeMultipleMedicines(file);
    return results[0] || createFallback()[0];
  } catch (error) {
    console.error("Single Scan Wrapper Error:", error);
    return createFallback()[0];
  }
};

// Helper to normalize Risk Level strings to Enum
const normalizeRisk = (level: string): RiskLevel => {
  const up = (level || '').toUpperCase();
  if (up.includes('HIGH')) return RiskLevel.HIGH;
  if (up.includes('MEDIUM')) return RiskLevel.MEDIUM;
  if (up.includes('LOW')) return RiskLevel.LOW;
  return RiskLevel.UNKNOWN;
};

// Fallback logic for errors
const createFallback = (): MedicineAnalysis[] => {
  return [{
    name: "Unidentified Item",
    composition: "Unknown Usage",
    expiryDate: "N/A",
    riskLevel: RiskLevel.UNKNOWN,
    riskReason: "Could not identify distinct items in image.",
    disposalRecommendation: "Please consult a pharmacist.",
    userEcoTip: "Handle with care.",
    adminIndustrialMethod: "Manual Sorting Required"
  }];
};
