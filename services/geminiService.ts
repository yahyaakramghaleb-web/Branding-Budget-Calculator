
import { GoogleGenAI } from "@google/genai";
import { FormData, Source } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePrompt = (data: FormData): string => {
  const selectedScopes = Object.entries(data.scope)
    .filter(([, value]) => value)
    .map(([key]) => {
        switch (key) {
            case 'logo': return 'Logo Design';
            case 'guidelines': return 'Brand Guidelines';
            case 'stationery': return 'Business Stationery (business cards, letterhead)';
            case 'social': return 'Social Media Kit (profile pictures, banners)';
            case 'website': return 'Website / Landing Page Design';
            default: return '';
        }
    })
    .join(', ');

  return `
    You are an expert financial consultant specializing in the creative industry in the Middle East and North Africa (MENA) region, with a strong focus on ${data.region}.
    Your task is to provide a realistic budget estimate for a freelance branding project based on the following parameters.
    Use your Google Search capabilities to find up-to-date, real-world pricing information for this region to ensure the estimate is accurate and reflects current market rates, not generic global standards.

    Project Parameters:
    - Scope of Work: ${selectedScopes || 'Not specified'}
    - Business Size: ${data.businessSize}
    - Project Complexity: ${data.complexity}
    - Project Timeline: ${data.timeline}
    - Designer's Experience Level: ${data.experience}
    - Target Country/Region: ${data.region}

    Please provide the following in your response, formatted as Markdown:
    1.  Start with a headline for the estimated budget range. The range should be in the local currency (e.g., EGP for Egypt, AED for UAE, SAR for Saudi Arabia) and also in USD. For "Other MENA", use USD as the primary currency.
    2.  Follow with a bulleted list providing a brief, clear breakdown and justification for this price range. Explain how each parameter (scope, complexity, etc.) influences the final cost.
    3.  Conclude with a short, encouraging sentence for the user.
    
    Keep the tone professional, insightful, and helpful for both freelance designers and business owners.
  `;
};

export const calculateBrandingBudget = async (
  formData: FormData
): Promise<{ text: string; sources: Source[] }> => {
  const prompt = generatePrompt(formData);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No estimate could be generated at this time.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Process sources and extract URLs
    const sources: Source[] = groundingChunks
      .filter((chunk: any) => chunk.web && chunk.web.uri && chunk.web.title)
      .map((chunk: any) => ({
        web: {
          uri: chunk.web.uri,
          title: chunk.web.title
        }
      }));

    return { text, sources };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch budget estimate from the AI model.");
  }
};
